'use client';

import React from 'react';

interface LLMResponseBoxProps {
  response: string;
  isLoading: boolean;
}

const LLMResponseBox: React.FC<LLMResponseBoxProps> = ({ response, isLoading }) => {
  return (
    <div className="w-full mt-6 p-4 bg-gray-800 rounded-2xl border-2 border-green-400/50 min-h-[100px] flex flex-col items-start justify-center shadow-lg transition-all duration-200 font-mono text-green-300">
      <div className="flex items-center gap-2">
        <span className="text-green-400">$&gt;</span>
        {isLoading ? (
          <span className="animate-pulse">_</span>
        ) : response ? (
          <p className="text-lg text-white font-medium whitespace-pre-wrap">{response}</p>
        ) : (
          <span className="text-gray-400">Awaiting transmission...</span>
        )}
      </div>
    </div>
  );
};

export default LLMResponseBox;
