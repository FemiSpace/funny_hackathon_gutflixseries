'use client';

import React from 'react';
import { useState } from 'react';
import { FoodItem } from '../lib/foodData';
import FoodSelector from './components/FoodSelector';
import ReactionScene from './components/ReactionScene';
import LLMResponseBox from './components/LLMResponseBox';
import Leaderboard from './components/Leaderboard';
import Card from './components/Card';

export default function Home() {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [llmResponse, setLlmResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSelectFood = async (food: FoodItem) => {
    setSelectedFood(food);
    setIsLoading(true);
    setLlmResponse('');

    try {
      // First, call the generate-dialogue endpoint
      const response = await fetch('/api/generate-dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          foodType: food.id, // Changed from prompt to foodType
          quantity: 1,
          playerName: 'Player One' 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get dialogue');
      }

      const llmData = await response.json();
      
      // Format the LLM response for display
      if (llmData.reactions && Array.isArray(llmData.reactions)) {
        const formattedResponse = llmData.reactions
          .map((r: any) => `${r.character}: ${r.dialogue}`)
          .join('\n\n');
        setLlmResponse(formattedResponse);
      } else {
        setLlmResponse('Received an unexpected response format from the server.');
      }

      // Log the meal interaction
      try {
        await fetch('/api/log-meal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            playerName: 'Player One',
            foodType: food.id,
            foodName: food.name,
            damageScore: food.damageScore,
            timestamp: new Date().toISOString()
          }),
        });
      } catch (logError) {
        console.error('Error logging meal:', logError);
        // Don't fail the entire operation if logging fails
      }

      // Refresh the leaderboard
      setRefreshTrigger(prev => prev + 1);

    } catch (error) {
      console.error(error);
      setLlmResponse('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto relative">
          {/* User badge top right */}
          <div className="absolute top-0 right-0 mt-4 mr-4 z-20">
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-green-100 border-2 border-green-300 text-green-700 font-bold shadow-md text-base gap-2 select-none">
              <span role="img" aria-label="User">😊</span> Player One
            </span>
          </div>
        
        <header className="flex flex-col items-center justify-center mb-12 select-none">
  <h1
    className="text-6xl sm:text-7xl font-extrabold font-outfit bg-gradient-to-r from-pink-500 via-yellow-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg tracking-widest mb-2 animate-fade-in"
    style={{ letterSpacing: '0.15em', textShadow: '0 4px 24px rgba(255, 200, 0, 0.25)' }}
  >
    GUTFLIX
  </h1>
  <div className="h-2 w-36 bg-gradient-to-r from-yellow-300 via-pink-300 to-green-300 rounded-full mb-3 animate-slide-in" />
  <p className="text-xl sm:text-2xl font-semibold text-pink-600 drop-shadow-md animate-fade-in-slow">
    An Original Series About Your Insides.
  </p>
</header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <Card>
              <FoodSelector onSelectFood={handleSelectFood} selectedFood={selectedFood} />
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Card className="flex flex-col gap-4 items-center justify-center">
              <ReactionScene food={selectedFood} />
              <LLMResponseBox food={selectedFood} isLoading={isLoading} />
            </Card>
            <Card>
              <Leaderboard refreshTrigger={refreshTrigger} />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
