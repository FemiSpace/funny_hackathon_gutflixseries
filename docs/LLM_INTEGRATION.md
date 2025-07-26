# LLM Integration Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Environment Setup](#environment-setup)
3. [API Endpoints](#api-endpoints)
4. [Data Flow](#data-flow)
5. [Prompt Engineering](#prompt-engineering)
6. [Caching Strategy](#caching-strategy)
7. [Error Handling](#error-handling)
8. [Testing](#testing)

## Architecture Overview

The LLM integration follows a client-server architecture:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Frontend   │    │  Next.js    │    │  Azure      │
│  (React)    │───▶│  API Routes │───▶│  OpenAI     │
└──────┬──────┘    └──────┬──────┘    └─────────────┘
       │                  │
       │                  │
       ▼                  ▼
┌─────────────┐    ┌─────────────┐
│  Supabase   │    │  Vercel     │
│  (Database) │    │  (Hosting)  │
└─────────────┘    └─────────────┘
```

## Environment Setup

Create a `.env.local` file in the project root with the following variables:

```env
# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://ai-info4892ai019484081803.services.ai.azure.com
AZURE_OPENAI_API_KEY=your-azure-openai-api-key-here
AZURE_OPENAI_DEPLOYMENT=ai-info4892ai019484081803
AZURE_OPENAI_API_VERSION=2024-02-15-preview

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ijzarhlozavzipyyehav.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqemFyaGxvemF2emlweXllaHYiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1MzU0NDA4OSwiZXhwIjoyMDY5MTIwMDg5fQ.cJlo167ggambqnqvzMfaRGry6zUgbe4BNcv0ij5QFX8

# Development
NODE_ENV=development
```

## API Endpoints

### `POST /api/generate-reaction`

**Request Body:**
```typescript
{
  foodItemId: number;    // ID of the selected food item
  quantity: number;      // Quantity of the food item
  playerName: string;    // Name of the player (optional)
}
```

**Success Response (200 OK):**
```typescript
{
  success: boolean;
  foodItem: FoodItem;
  llmResponse: LLMResponse;
  logEntry: GutLogEntry;
  cached: boolean;
}
```

**Error Response (4xx/5xx):**
```typescript
{
  error: string;
  fallback?: {
    reactions: Array<{
      character: string;
      dialogue: string;
      timestamp: number;
      mood: string;
      emoji: string;
    }>;
  };
}
```

## Data Flow

1. User selects a food item in the UI
2. Frontend calls `/api/generate-reaction` with food details
3. API checks for cached response in Supabase
4. If not cached, calls Azure OpenAI with appropriate prompt
5. Saves response to Supabase cache
6. Logs the interaction to `gut_logs`
7. Returns the response to the frontend
8. Frontend displays the animated reaction sequence

## Prompt Engineering

### Prompt Structure
Each food type has a custom prompt with:
- System message defining the scenario and characters
- User message with food-specific context

### Example Prompt (Energy Drink)
```
You are a satirical narrator for body organs reacting to energy drinks. 
Create exactly 4 organ characters having a panicked conversation about processing caffeine and chemicals.

Characters:
- Liver Larry 🫘 (overworked, cynical office worker)
- Heart Rate 💗 (hyperactive, dramatic DJ)
- Kidney Karen 🫘 (stressed water management specialist)
- Adrenal Andy ⚡ (fight-or-flight coordinator)

Return ONLY valid JSON in this exact format:
{
  "reactions": [
    {
      "character": "string",
      "dialogue": "string",
      "timestamp": number,
      "mood": "panic" | "excited" | "confused" | "angry" | "happy",
      "emoji": "string"
    }
  ],
  "medical_context": "string",
  "humor_level": number
}
```

## Caching Strategy

Responses are cached in Supabase using a composite key:
```typescript
const cacheKey = `${foodItem.type}_${quantity}`;
```

Cached responses include:
- Raw LLM response
- Medical context
- Humor rating
- Timestamp

## Error Handling

### Fallback Responses
If the LLM call fails, a fallback response is returned:
```typescript
{
  "error": "LLM generation failed",
  "fallback": {
    "reactions": [
      {
        "character": "System Error 🤖",
        "dialogue": "Organs are currently offline for maintenance. Please try again!",
        "timestamp": 0,
        "mood": "confused",
        "emoji": "🤖"
      }
    ]
  }
}
```

### Error Logging
All errors are logged to the console with appropriate severity levels:
- `console.error` for critical errors
- `console.warn` for non-critical issues
- `console.log` for debugging information

## Testing

### Unit Tests
```typescript
describe('LLM Integration', () => {
  it('should generate valid response for energy drink', async () => {
    const response = await generateReaction({
      foodItemId: 1,
      quantity: 1,
      playerName: 'Test User'
    });
    expect(response).toHaveProperty('reactions');
    expect(response.reactions).toHaveLength(4);
  });
});
```

### Integration Tests
1. Test API endpoint with valid/invalid inputs
2. Verify caching behavior
3. Test error handling and fallback responses
4. Verify database logging

## Deployment

### Vercel
1. Set up environment variables in Vercel dashboard
2. Connect GitHub repository
3. Deploy main branch
4. Verify API endpoints are accessible

### Monitoring
- Check Vercel logs for errors
- Monitor Azure OpenAI usage
- Track Supabase query performance
