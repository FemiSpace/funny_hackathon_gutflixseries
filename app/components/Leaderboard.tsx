'use client';

import React, { useState, useEffect } from 'react';

interface LeaderboardEntry {
  id: number;
  player_name: string;
  food_type: string;
  food_name: string;
  damage_score: number;
  timestamp: string;
  isCurrentUser?: boolean;
}

const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 1,
    player_name: 'burritoBoy',
    food_type: 'burrito',
    food_name: 'Spicy Burrito',
    damage_score: 27,
    timestamp: new Date().toISOString(),
    isCurrentUser: false
  },
  {
    id: 2,
    player_name: 'crunchwrap',
    food_type: 'mcnuggets',
    food_name: 'McNuggets',
    damage_score: 22,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isCurrentUser: false
  },
  {
    id: 3,
    player_name: 'cleanQueen',
    food_type: 'kale-salmon-bowl',
    food_name: 'Kale Salmon Bowl',
    damage_score: 8,
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    isCurrentUser: false
  },
  {
    id: 4,
    player_name: 'snackAttack',
    food_type: 'burrito',
    food_name: 'Gas Station Burrito',
    damage_score: 35,
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    isCurrentUser: true
  },
  {
    id: 5,
    player_name: 'proteinPete',
    food_type: 'protein-bar',
    food_name: 'Protein Bar',
    damage_score: 15,
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    isCurrentUser: false
  },
  {
    id: 6,
    player_name: 'gutFeeling',
    food_type: 'kombucha',
    food_name: 'Homemade Kimchi',
    damage_score: -5,
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    isCurrentUser: false
  },
];

interface LeaderboardProps {
  refreshTrigger?: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ refreshTrigger = 0 }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(MOCK_LEADERBOARD);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        
        // Mark the current user if available
        const currentUser = 'Player One'; // This should come from user context in a real app
        const formattedData = data.map((entry: LeaderboardEntry) => ({
          ...entry,
          isCurrentUser: entry.player_name === currentUser
        }));
        
        setLeaderboard(formattedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard. Using sample data.');
        setLeaderboard(MOCK_LEADERBOARD);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [refreshTrigger]);

  if (isLoading) {
    return (
      <div className="card-style bg-white/90 border-blue-300 p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Gut Health Leaderboard</h2>
        <p>Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="card-style bg-white/90 border-blue-300">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Gut Health Leaderboard</h2>
      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          <p className="font-bold">Note</p>
          <p>{error}</p>
        </div>
      )}
      <div className="space-y-4">
        {leaderboard.map((entry, index) => (
          <div 
            key={`${entry.id}-${index}`}
            className={`p-4 rounded-lg border ${
              entry.isCurrentUser 
                ? 'bg-blue-50 border-blue-300 shadow-inner' 
                : 'bg-white border-gray-200'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3">
                <span className={`font-bold ${
                  index === 0 ? 'text-yellow-500 text-xl' : 'text-gray-700'
                }`}>
                  #{index + 1}
                </span>
                <span className={`font-semibold ${
                  entry.isCurrentUser ? 'text-blue-600' : 'text-gray-800'
                }`}>
                  {entry.player_name}
                </span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                entry.damage_score <= 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {entry.damage_score <= 0 ? '' : '+'}{entry.damage_score}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Last Meal:</span> {entry.food_name}
            </div>
            <div className="text-sm italic text-gray-500">
              {getMicrobiomeComment(entry.damage_score, entry.food_type)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to generate microbiome comments based on damage score and food type
function getMicrobiomeComment(score: number, foodType: string): string {
  const comments = {
    'energy-drink': [
      'Your gut bacteria are having a rave!',
      'Caffeine overload detected!',
      'Your microbiome is jittery.'
    ],
    'mcnuggets': [
      'Your gut is in shock!',
      'Processing... please wait...',
      'Microbiome overwhelmed!' 
    ],
    'protein-bar': [
      'Your gut is confused but trying its best.',
      'Processing protein...',
      'Your microbiome is working overtime!' 
    ],
    'kombucha': [
      'Your gut is happy!',
      'Probiotics activated!',
      'Your microbiome is thriving!' 
    ],
    'burrito': [
      'Your gut is working hard!',
      'Heavy lifting in progress...',
      'Your microbiome is on a break!' 
    ],
    'kale-salmon-bowl': [
      'Your gut is very happy!',
      'Nutrient absorption at peak!',
      'Your microbiome is celebrating!' 
    ],
    'default': [
      'Your gut is processing...',
      'Microbiome analysis in progress...',
      'Your gut is thinking about this...' 
    ]
  };

  const foodComments = comments[foodType as keyof typeof comments] || comments.default;
  const randomIndex = Math.floor(Math.random() * foodComments.length);
  return `"${foodComments[randomIndex]}"`;
}

export default Leaderboard;
