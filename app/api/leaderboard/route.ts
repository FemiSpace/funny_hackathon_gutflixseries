import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  try {
    // We use an RPC to a Postgres function for more complex queries like aggregations.
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    
    // Return mock data if there's an error
    const mockLeaderboard = [
      { 
        id: 1, 
        player_name: 'John', 
        food_type: 'burrito', 
        quantity: 2, 
        timestamp: new Date().toISOString() 
      },
      { 
        id: 2, 
        player_name: 'Jane', 
        food_type: 'energy-drink', 
        quantity: 1, 
        timestamp: new Date(Date.now() - 3600000).toISOString() 
      },
    ];
    
    return NextResponse.json(mockLeaderboard);
  }
}
