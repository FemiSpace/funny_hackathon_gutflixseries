import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`bg-white/90 rounded-2xl border-4 border-yellow-200 shadow-xl p-4 md:p-6 ${className}`}
    style={{
      boxShadow:
        '0 4px 24px 0 rgba(255, 200, 0, 0.10), 0 1.5px 6px 0 rgba(244, 114, 182, 0.10)',
      backdropFilter: 'blur(2px)',
    }}
  >
    {children}
  </div>
);

export default Card;
