import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    // Attempt to fetch leaderboard data from Supabase
    const { data: leaderboard, error } = await supabase
      .from('leaderboard')
      .select('*')
      .order('score', { ascending: false })
      .limit(10);

    if (error) throw error;
    
    // Return the fetched data if successful
    return NextResponse.json(leaderboard || []);
    
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    
    // Return mock data if there's an error or no data
    const mockLeaderboard = [
      { 
        id: 1, 
        player_name: 'John', 
        food_type: 'burrito', 
        score: 2, 
        timestamp: new Date().toISOString() 
      },
      { 
        id: 2, 
        player_name: 'Jane', 
        food_type: 'energy-drink', 
        score: 1, 
        timestamp: new Date(Date.now() - 3600000).toISOString() 
      },
    ];
    
    return NextResponse.json(mockLeaderboard);
  }
}
