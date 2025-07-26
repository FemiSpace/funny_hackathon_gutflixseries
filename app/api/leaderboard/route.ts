import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET(request: Request) {
  try {
    // We use an RPC to a Postgres function for more complex queries like aggregations.
    // This is more efficient than pulling all logs and aggregating in JS.
    // You will need to create this function in your Supabase SQL editor.
    const { data, error } = await supabase.rpc('get_leaderboard');

    if (error) {
      console.error('Supabase RPC error:', error);
      return NextResponse.json({ error: `Supabase error: ${error.message}. Did you create the 'get_leaderboard' function in the Supabase SQL Editor?` }, { status: 500 });
    }

    return NextResponse.json({ leaderboard: data });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error fetching leaderboard:', errorMessage);
    return NextResponse.json({ error: 'Failed to fetch leaderboard', details: errorMessage }, { status: 500 });
  }
}
