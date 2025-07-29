'use client';

import React, { useEffect, useState } from 'react';
import { FoodItem } from '../../lib/foodData';

interface OrganReaction {
  character: string;
  dialogue: string;
  mood: 'panic' | 'excited' | 'confused' | 'angry' | 'tired';
  emoji: string;
}

interface LLMResponseBoxProps {
  food: FoodItem | null;
  isLoading: boolean;
}

// Mock reactions for different food types
const MOCK_REACTIONS: Record<string, OrganReaction[]> = {
  'mcdonalds': [
    {
      character: 'Liver Larry 🫘',
      dialogue: 'Oh great, another grease bomb! My detox enzymes are on strike!',
      mood: 'angry',
      emoji: '🫘'
    },
    {
      character: 'Heart Rate 💗',
      dialogue: 'BEEP BOOP! Pulse spiking to rave levels! Who needs sleep anyway?',
      mood: 'excited',
      emoji: '💗'
    },
    {
      character: 'Kidney Karen 🫘',
      dialogue: 'I just cleaned this place! *sigh* Time to filter another ocean of salt...',
      mood: 'tired',
      emoji: '🫘'
    },
    {
      character: 'Adrenal Andy ⚡',
      dialogue: 'Is this a meal or a dare? My fight-or-flight is so confused right now!',
      mood: 'confused',
      emoji: '⚡'
    }
  ],
  'protein-bar': [
    {
      character: 'Liver Larry 🫘',
      dialogue: 'Ah yes, the "meal replacement" that looks like it was made in a lab. My enzymes are crying.',
      mood: 'angry',
      emoji: '🫘'
    },
    {
      character: 'Heart Rate 💗',
      dialogue: 'Why do I hear boss music? Is this a workout or a snack?',
      mood: 'confused',
      emoji: '💗'
    },
    {
      character: 'Kidney Karen 🫘',
      dialogue: 'So. Much. Protein. My filters are working overtime!',
      mood: 'panic',
      emoji: '🫘'
    },
    {
      character: 'Adrenal Andy ⚡',
      dialogue: 'I feel like I just chugged three espressos wrapped in a warning label!',
      mood: 'excited',
      emoji: '⚡'
    }
  ],
  'default': [
    {
      character: 'Liver Larry 🫘',
      dialogue: 'Hmm, not sure what this is, but I don\'t trust it...',
      mood: 'confused',
      emoji: '🫘'
    },
    {
      character: 'Heart Rate 💗',
      dialogue: 'I was promised drama! Give me something to work with!',
      mood: 'angry',
      emoji: '💗'
    },
    {
      character: 'Kidney Karen 🫘',
      dialogue: 'At least it\'s not another energy drink... right?',
      mood: 'tired',
      emoji: '🫘'
    },
    {
      character: 'Adrenal Andy ⚡',
      dialogue: 'I\'m ready for anything! Wait... is anything happening?',
      mood: 'confused',
      emoji: '⚡'
    }
  ]
};

const LLMResponseBox: React.FC<LLMResponseBoxProps> = ({ food, isLoading }) => {
  const [currentReaction, setCurrentReaction] = useState<number>(0);
  const [reactions, setReactions] = useState<OrganReaction[]>([]);

  useEffect(() => {
    if (!food) {
      setReactions([]);
      setCurrentReaction(0);
      return;
    }

    const foodReactions = MOCK_REACTIONS[food.id] || MOCK_REACTIONS['default'];
    setReactions(foodReactions);
    setCurrentReaction(0);

    // Auto-advance through reactions
    const timer = setInterval(() => {
      setCurrentReaction(prev => (prev < foodReactions.length - 1 ? prev + 1 : prev));
    }, 3000);

    return () => clearInterval(timer);
  }, [food]);

  const getMoodColor = (mood: string) => {
    switch(mood) {
      case 'angry': return 'text-red-400';
      case 'excited': return 'text-yellow-400';
      case 'confused': return 'text-blue-400';
      case 'tired': return 'text-purple-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="w-full mt-6 p-6 bg-gray-900/80 rounded-2xl border-2 border-pink-500/30 min-h-[200px] flex flex-col justify-start shadow-lg transition-all duration-200 font-mono text-green-300 overflow-hidden">
      <div className="flex items-center gap-2 mb-4 border-b border-pink-900/50 pb-2">
        <span className="text-pink-400 font-bold text-lg">Organ Reactions</span>
      </div>
      
      <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] pr-2">
        {!food ? (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500">Select a food to see organ reactions...</span>
          </div>
        ) : reactions.slice(0, currentReaction + 1).map((reaction, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg bg-gray-800/50 border-l-4 ${
              index === currentReaction ? 'border-pink-500' : 'border-transparent'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`text-xl ${getMoodColor(reaction.mood)}`}>
                {reaction.emoji}
              </span>
              <span className="font-bold text-pink-300">{reaction.character}</span>
              <span className="text-gray-500 text-sm">• {reaction.mood}</span>
            </div>
            <p className="mt-1 text-gray-200 pl-8">{reaction.dialogue}</p>
          </div>
        ))}
      </div>
      
      {isLoading && (
        <div className="mt-4 text-center text-pink-400">
          <span className="animate-pulse">Another organ is typing...</span>
        </div>
      )}
    </div>
  );
};

export default LLMResponseBox;
