import { NextResponse } from 'next/server';
import { getFoodReactions, logInteraction, type FoodType } from '@/lib/llmService';

type RequestBody = {
  foodType: string;
  quantity: number;
  playerName?: string;
};

const validFoodTypes = [
  'energy-drink', 
  'mcnuggets', 
  'protein-bar', 
  'kombucha', 
  'burrito', 
  'kale-salmon-bowl'
] as const;

type ValidFoodType = typeof validFoodTypes[number];

export async function POST(request: Request) {
  try {
    const { foodType, quantity = 1, playerName } = (await request.json()) as RequestBody;

    if (!foodType) {
      return NextResponse.json(
        { error: 'foodType is required' }, 
        { status: 400 }
      );
    }

    // Validate and type assert food type
    if (!validFoodTypes.includes(foodType as ValidFoodType)) {
      return NextResponse.json(
        { error: 'Invalid food type' }, 
        { status: 400 }
      );
    }

    // Type assertion is safe here because we've validated the foodType
    const typedFoodType = foodType as FoodType;

    // Log the interaction
    await logInteraction(typedFoodType, quantity, playerName);

    // Get reactions from LLM with detailed error handling
    try {
      console.log('Calling getFoodReactions with:', { typedFoodType, quantity });
      const llmResponse = await getFoodReactions(typedFoodType, quantity);
      
      if (!llmResponse) {
        throw new Error('Empty response from getFoodReactions');
      }

      console.log('Successfully received LLM response');
      return NextResponse.json({
        success: true,
        foodType: typedFoodType,
        quantity,
        ...llmResponse
      });
    } catch (llmError) {
      console.error('LLM Service Error:', {
        error: llmError instanceof Error ? llmError.message : 'Unknown error',
        stack: llmError instanceof Error ? llmError.stack : undefined,
        foodType: typedFoodType,
        quantity
      });
      
      // Re-throw to be caught by the outer catch block
      throw llmError;
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('API error:', {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      // Log environment variable presence (without values)
      envVars: {
        hasAzureEndpoint: !!process.env.AZURE_OPENAI_ENDPOINT,
        hasAzureApiKey: !!process.env.AZURE_OPENAI_API_KEY,
        hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      }
    });
    
    // Return a proper error response without mock data
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate dialogue',
        message: process.env.NODE_ENV === 'development' ? errorMessage : 'Service unavailable',
        requestId: Math.random().toString(36).substring(2, 9), // Simple request ID for tracking
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'X-Request-ID': Math.random().toString(36).substring(2, 9)
        }
      }
    );
  }
}
