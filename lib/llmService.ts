import OpenAI from 'openai';
import { supabase } from './supabaseClient';
import { foodData } from './foodData';

// Get Azure OpenAI configuration from environment variables
const azureApiKey = process.env.AZURE_OPENAI_API_KEY || process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY || '';
const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT || 'https://ai-info4892ai019484081803.services.ai.azure.com';
const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || '2024-11-20';

// Log configuration (without exposing sensitive data)
console.log('Azure OpenAI Configuration:', {
  endpoint: azureEndpoint,
  deployment: deploymentName,
  apiVersion: apiVersion,
  hasApiKey: !!azureApiKey
});

// Initialize OpenAI client with Azure configuration
let client: OpenAI | null = null;

try {
  if (!azureApiKey) {
    console.warn('Azure OpenAI API key not configured. LLM features will be disabled.');
  } else {
    client = new OpenAI({
      apiKey: azureApiKey,
      baseURL: `${azureEndpoint}/openai/deployments/${deploymentName}`,
      defaultQuery: { 'api-version': apiVersion },
      defaultHeaders: { 'api-key': azureApiKey },
    });
  }
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error);
  client = null;
}

// Cache TTL in seconds (1 hour)
const CACHE_TTL = 60 * 60;

export type FoodType = 'energy-drink' | 'mcnuggets' | 'protein-bar' | 'kombucha' | 'burrito' | 'kale-salmon-bowl';

interface OrganReaction {
  character: string;
  dialogue: string;
  timestamp: number;
  mood: 'panic' | 'excited' | 'confused' | 'angry' | 'happy';
  emoji: string;
}

interface LLMResponse {
  reactions: OrganReaction[];
  medical_context: string;
  humor_level: number;
}

// Helper function to get prompt for a food type
function getPromptForFoodType(foodType: string): string {
  const food = foodData.find(f => f.name.toLowerCase() === foodType.toLowerCase());
  return food?.llmPrompt || `Write a humorous reaction from the body's perspective about eating ${foodType}.`;
}

// Food type to system prompt mapping
const FOOD_PROMPTS: Record<FoodType, string> = {
  'energy-drink': `You are a satirical narrator for body organs reacting to energy drinks. 
  Create exactly 4 organ characters having a panicked conversation about processing caffeine and chemicals.
  
  Characters:
  - Liver Larry 🫘 (overworked, cynical office worker)
  - Heart Rate 💗 (hyperactive, dramatic DJ)
  - Kidney Karen 🫘 (stressed water management specialist)
  - Adrenal Andy ⚡ (fight-or-flight coordinator)
  `,
  'mcnuggets': `You are a satirical narrator for body organs reacting to fast food. 
  Create exactly 4 organ characters having a conversation about processing greasy food.
  
  Characters:
  - Stomach Stan 🍔 (overwhelmed food processor)
  - Artery Art 🩸 (plumbing specialist in crisis)
  - Liver Larry 🍺 (detox specialist)
  - Gut Guy 🦠 (microbiome manager)
  `,
  'protein-bar': `You are a satirical narrator for body organs reacting to protein bars. 
  Create exactly 4 organ characters having a conversation about processing processed protein.
  
  Characters:
  - Gut Guru 🧘 (yogi of digestion)
  - Sugar Sally 🍬 (energy manager)
  - Fiber Frank 🌾 (digestion specialist)
  - Label Reader 👓 (skeptical analyst)
  `,
  'kombucha': `You are a satirical narrator for body organs reacting to kombucha. 
  Create exactly 4 organ characters having a conversation about fermented drinks.
  
  Characters:
  - Gut Flora Fiona 🦠 (microbiome manager)
  - Taste Bud Tim 👅 (flavor analyst)
  - Liver Larry 🍵 (detox specialist)
  - Bloaty Bill 💨 (gas management)
  `,
  'burrito': `You are a satirical narrator for body organs reacting to a massive burrito. 
  Create exactly 4 organ characters having a conversation about the food coma to come.
  
  Characters:
  - Stretch Steve 🤰 (stomach expander)
  - Siesta Sam 😴 (energy manager)
  - Spice Master 🔥 (heat specialist)
  - Regret Randy 😫 (morning after specialist)
  `,
  'kale-salmon-bowl': `You are a satirical narrator for body organs reacting to a healthy kale salmon bowl. 
  Create exactly 4 organ characters having a suspiciously positive conversation.
  
  Characters:
  - Health Nut Hannah 🥗 (nutrition enthusiast)
  - Omega Ollie 🐟 (fat specialist)
  - Vitamin Vicky 💊 (micronutrient manager)
  - Skeptical Steve 🤨 (waiting for the catch)
  `
};

// Get reactions from cache or generate new ones
export async function getFoodReactions(foodType: FoodType, quantity: number): Promise<LLMResponse> {
  const cacheKey = `${foodType}_${quantity}`;
  
  try {
    // Check cache first
    const { data: cached } = await supabase
      .from('llm_cache')
      .select('*')
      .eq('key', cacheKey)
      .single();

    if (cached && (Date.now() - new Date(cached.created_at).getTime()) / 1000 < CACHE_TTL) {
      return cached.response as LLMResponse;
    }

    // Generate new response
    const response = await generateLLMResponse(foodType, quantity);
    
    // Cache the response
    await supabase
      .from('llm_cache')
      .upsert({
        key: cacheKey,
        response,
        created_at: new Date().toISOString()
      });

    return response;
  } catch (error) {
    console.error('Error getting food reactions:', error);
    throw error;
  }
}

async function getFoodReaction(foodType: string): Promise<string> {
  try {
    // Check cache first
    const { data: cachedResponse, error: cacheError } = await supabase
      .from('llm_cache')
      .select('response')
      .eq('prompt', foodType)
      .gt('created_at', new Date(Date.now() - CACHE_TTL * 1000).toISOString())
      .single();

    if (cachedResponse && !cacheError) {
      console.log('Cache hit for:', foodType);
      return cachedResponse.response;
    }

    console.log('Cache miss for:', foodType);

    // Get the appropriate prompt template
    const prompt = getPromptForFoodType(foodType);
    
    // Call Azure OpenAI using the standard client
    const completion = await client.chat.completions.create({
      model: deploymentName,
      messages: [
        { role: 'system', content: 'You are a helpful assistant that generates humorous organ reactions to different types of food.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const response = completion.choices[0]?.message?.content || 'No response from AI';

    // Cache the response
    await supabase
      .from('llm_cache')
      .insert([
        { 
          prompt: foodType, 
          response: response,
          model: deploymentName
        }
      ]);

    return response;
  } catch (error) {
    console.error('Error in getFoodReaction:', error);
    return 'Oops! Something went wrong while generating a response. Please try again later.';
  }
}

// Generate response using Azure OpenAI
async function generateLLMResponse(foodType: FoodType, quantity: number): Promise<LLMResponse> {
  // Fallback response in case of errors
  const fallbackResponse: LLMResponse = {
    reactions: [
      {
        character: 'System 🤖',
        dialogue: 'Our AI is currently experiencing technical difficulties. Please try again later!',
        timestamp: 0,
        mood: 'confused',
        emoji: '🤖'
      }
    ],
    medical_context: 'Even our AI needs a break sometimes!',
    humor_level: 3
  };

  // Check if client is initialized
  if (!client) {
    console.error('OpenAI client not initialized. Check environment variables:', {
      hasApiKey: !!azureApiKey,
      hasEndpoint: !!azureEndpoint,
      deployment: deploymentName,
      apiVersion: apiVersion,
      env: process.env.NODE_ENV,
      // Don't log the actual API key, just if it exists
      hasApiKeyLength: azureApiKey ? 'yes' : 'no'
    });
    return fallbackResponse;
  }

  const systemPrompt = FOOD_PROMPTS[foodType] || FOOD_PROMPTS['energy-drink'];
  
  const userPrompt = `A person just consumed ${quantity} ${foodType}${quantity > 1 ? 's' : ''}. 
  Generate a funny but educational conversation between the organs about this. 
  
  Requirements:
  - Exactly 4 reactions
  - Each reaction should be from a different character
  - Include emojis and mood indicators
  - Keep it lighthearted but informative
  - End with a brief medical context in a "The More You Know" style
  
  Format as JSON with this structure:
  {
    "reactions": [
      {
        "character": "string (character name and emoji)",
        "dialogue": "string (what they say)",
        "timestamp": number (seconds since start),
        "mood": "panic|excited|confused|angry|happy",
        "emoji": "string (emoji for mood)"
      }
    ],
    "medical_context": "string (brief educational note)",
    "humor_level": number (1-10)
  }`;

  try {
    console.log('Sending request to Azure OpenAI...');
    
    const response = await client.chat.completions.create({
      model: deploymentName,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 1000
    });

    console.log('Received response from Azure OpenAI');
    
    const content = response.choices[0]?.message?.content;
    if (!content) {
      console.error('No content in response from Azure OpenAI');
      return fallbackResponse;
    }

    try {
      const parsedResponse = JSON.parse(content) as LLMResponse;
      
      // Validate the response structure
      if (!parsedResponse.reactions || !Array.isArray(parsedResponse.reactions)) {
        console.error('Invalid response format from Azure OpenAI');
        return fallbackResponse;
      }
      
      return parsedResponse;
    } catch (parseError) {
      console.error('Error parsing Azure OpenAI response:', parseError);
      return fallbackResponse;
    }
  } catch (error) {
    console.error('Error generating LLM response:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      endpoint: azureEndpoint,
      deployment: deploymentName,
      apiVersion: apiVersion,
      hasApiKey: !!azureApiKey,
      // Add more debug info as needed
    });
    return fallbackResponse;
  }
}

// Log interaction to the database
export async function logInteraction(foodType: string, quantity: number, playerName?: string) {
  try {
    const { error } = await supabase
      .from('gut_logs')
      .insert([
        {
          food_type: foodType,
          quantity,
          player_name: playerName || 'Anonymous',
          timestamp: new Date().toISOString()
        }
      ]);

    if (error) throw error;
  } catch (error) {
    console.error('Error logging interaction:', error);
    // Don't fail the request if logging fails
  }
}

// Get leaderboard data
export async function getLeaderboard(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('gut_logs')
      .select('player_name, food_type, quantity, timestamp')
      .order('timestamp', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    return [];
  }
}
