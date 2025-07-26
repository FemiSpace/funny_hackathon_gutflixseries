'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface LeaderboardEntry {
  player_name: string;
  total_score: number;
}

interface LeaderboardProps {
  refreshTrigger: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ refreshTrigger }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/leaderboard');
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch leaderboard');
      }
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard, refreshTrigger]);

  return (
    <div className="w-full p-4 md:p-6 bg-white/90 rounded-2xl border-4 border-pink-200 shadow-xl mt-8">
      <h2 className="text-3xl font-extrabold mb-5 text-center text-yellow-500 drop-shadow-lg flex items-center justify-center gap-2">
        🏆 Leaderboard of Gut Damage
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-yellow-200">
              <th className="p-2 text-pink-600 font-bold">Rank</th>
              <th className="p-2 text-pink-600 font-bold">Player</th>
              <th className="p-2 text-right text-pink-600 font-bold">Damage Score</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center p-4 text-yellow-400">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={3} className="text-center p-4 text-red-500 bg-pink-50 rounded-lg font-semibold">
                  Error: {error}
                </td>
              </tr>
            ) : leaderboard.length > 0 ? (
              leaderboard.map((entry, index) => (
                <tr key={entry.player_name} className={`border-b border-yellow-100 last:border-b-0 ${index === 0 ? 'bg-yellow-50' : ''}`}>
                  <td className="p-2 font-bold text-yellow-500 text-lg">{index === 0 ? '👑' : index + 1}</td>
                  <td className="p-2 text-pink-700 font-semibold">{entry.player_name}</td>
                  <td className={`p-2 text-right font-mono ${entry.total_score > 0 ? 'text-green-500' : 'text-red-500'}`}>{entry.total_score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-4 text-green-500">No scores yet. Be the first!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
