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

    // Get reactions from LLM
    const llmResponse = await getFoodReactions(typedFoodType, quantity);

    return NextResponse.json({
      success: true,
      foodType: typedFoodType,
      quantity,
      ...llmResponse
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('API error:', error);
    
    // Return a fallback response if the LLM fails
    return NextResponse.json({
      error: 'Failed to generate dialogue',
      details: errorMessage,
      fallback: {
        reactions: [
          {
            character: 'System Error 🤖',
            dialogue: 'Our organs are currently experiencing technical difficulties. Please try again later!',
            timestamp: 0,
            mood: 'confused',
            emoji: '🤖'
          }
        ],
        medical_context: 'Even our AI needs a break sometimes!',
        humor_level: 3
      }
    }, { 
      status: 500 
    });
  }
}
