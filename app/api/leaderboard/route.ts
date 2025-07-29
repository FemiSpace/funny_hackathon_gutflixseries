import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// Define the structure of a leaderboard entry
interface LeaderboardEntry {
  id: number;
  player_name: string;
  food_type: string;
  food_name: string;
  damage_score: number;
  timestamp: string;
}

// Define the structure of a Supabase response entry
interface SupabaseLogEntry {
  id?: number;
  player_name?: string | null;
  food_type?: string | null;
  food_name?: string | null;
  damage_score?: number | null;
  timestamp?: string | null;
  [key: string]: any; // For any additional fields that might be present
}

// Mock data for when Supabase is not available
const MOCK_LEADERBOARD = [
  { 
    id: 1, 
    player_name: 'John', 
    food_type: 'burrito', 
    food_name: 'Spicy Burrito',
    damage_score: 150, 
    timestamp: new Date().toISOString() 
  },
  { 
    id: 2, 
    player_name: 'Jane', 
    food_type: 'energy-drink',
    food_name: 'Energy Drink',
    damage_score: 120, 
    timestamp: new Date(Date.now() - 3600000).toISOString() 
  },
  { 
    id: 3, 
    player_name: 'Alex', 
    food_type: 'kale-salmon-bowl',
    food_name: 'Kale Salmon Bowl',
    damage_score: 300, 
    timestamp: new Date(Date.now() - 7200000).toISOString() 
  },
];

export async function GET() {
  try {
    if (!supabase) {
      console.warn('Supabase client not initialized, returning mock leaderboard data');
      return NextResponse.json(MOCK_LEADERBOARD);
    }

    // Attempt to fetch leaderboard data from Supabase
    const { data: leaderboard, error } = await supabase
      .from('gut_logs')  // Changed from 'leaderboard' to 'gut_logs'
      .select('*')
      .order('damage_score', { ascending: false })  // Changed from 'score' to 'damage_score'
      .limit(10);

    if (error) {
      console.error('Supabase error:', error);
      // Return mock data on error for better UX
      return NextResponse.json(MOCK_LEADERBOARD);
    }
    
    // Format the data to match the expected frontend structure
    const formattedData: LeaderboardEntry[] = (leaderboard as SupabaseLogEntry[])?.map((entry: SupabaseLogEntry, index: number) => ({
      id: entry.id || index + 1,
      player_name: entry.player_name || 'Anonymous',
      food_type: entry.food_type || 'unknown',
      food_name: entry.food_name || 'Unknown Food',
      damage_score: entry.damage_score || 0,
      timestamp: entry.timestamp || new Date().toISOString()
    })) || [];
    
    // Return the fetched data if successful, or mock data if empty
    return NextResponse.json(formattedData.length ? formattedData : MOCK_LEADERBOARD);
    
  } catch (error) {
    console.error('Error in leaderboard API:', error);
    
    // Return mock data if there's an error
    return NextResponse.json(MOCK_LEADERBOARD, {
      status: 200, // Still return 200 OK with mock data
      headers: {
        'X-Mock-Data': 'true', // Indicate this is mock data
      },
    });
  }
}
