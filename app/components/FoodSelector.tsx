'use client';

import React from 'react';
import { foodData, FoodItem } from '../../lib/foodData';
import Image from 'next/image';

interface FoodSelectorProps {
  onSelectFood: (food: FoodItem) => void;
  selectedFood: FoodItem | null;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({ onSelectFood, selectedFood }) => {
  return (
    <div className="card-style bg-white/90 border-yellow-300">
  <h2 className="text-3xl font-extrabold text-center mb-5 text-pink-600 tracking-tight font-outfit drop-shadow-lg">
    What did you just eat?
  </h2>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
    {foodData.map((food) => (
      <div key={food.id} className="flex flex-col items-center gap-2">
        <button
          onClick={() => onSelectFood(food)}
          className={`relative w-full h-32 rounded-2xl overflow-hidden border-4 shadow-md group transition-all duration-200 ease-out focus:outline-none focus:ring-4 focus:ring-yellow-300/60 ${selectedFood?.id === food.id ? 'border-pink-400 scale-105 ring-2 ring-pink-200' : 'border-yellow-200 hover:border-green-400 hover:scale-105'}`}>
          <Image
            src={food.image}
            alt={food.name}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
        </button>
        <p className="font-bold text-pink-600 text-center">
          {food.name}
        </p>
      </div>
    ))}
  </div>
  <div className="mt-6 text-center">
    <span className="text-lg font-semibold text-green-600 italic animate-bounce-slow">
      Select a food to see the drama unfold.
    </span>
  </div>
</div>
  );
};

export default FoodSelector;
