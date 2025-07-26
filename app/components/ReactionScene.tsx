'use client';

import React from 'react';
import Image from 'next/image';
import { FoodItem } from '../../lib/foodData';
import Card from './Card';

interface ReactionSceneProps {
  food: FoodItem | null;
}

const ReactionScene: React.FC<ReactionSceneProps> = ({ food }) => {
  return (
    <div className="w-full max-w-5xl mx-auto mb-4">
      {food && (
        <div className="text-center mb-2">
          <h3 className="text-xl font-bold text-pink-600">{food.outsidePerception}</h3>
          <p className="text-yellow-800 font-semibold">{food.reactionLabel}</p>
        </div>
      )}
      <Card className="p-0 w-full mx-auto aspect-video flex items-center justify-center bg-black overflow-hidden border-4 border-yellow-300 shadow-2xl">
        {food ? (
          <Image
            src={`/gifs/${food.insideReactionGif}`}
            alt={`Reaction to ${food.name}`}
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center w-full h-full">
            <svg className="w-12 h-12 text-gray-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500">Select a food to see the drama unfold.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ReactionScene;
