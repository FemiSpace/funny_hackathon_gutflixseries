import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const { foodName, damageScore, playerName } = await request.json();

    if (!foodName || damageScore === undefined || !playerName) {
      return NextResponse.json({ error: 'Missing required fields: foodName, damageScore, playerName' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('gut_logs')
      .insert([
        { 
          player_name: playerName, 
          food_name: foodName, 
          damage_score: damageScore 
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      // Provide a more specific error message if possible
      return NextResponse.json({ error: `Supabase error: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({ message: 'Meal logged successfully!', data: data });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in log-meal:', errorMessage);
    return NextResponse.json({ error: 'Failed to log meal', details: errorMessage }, { status: 500 });
  }
}
