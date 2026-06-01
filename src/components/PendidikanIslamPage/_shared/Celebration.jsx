import React from 'react';

// A burst of confetti shown on a correct answer / completion.
// Self-contained: ships its own keyframe so any topic can drop it in.
const CONFETTI = ['🎉', '⭐', '✨', '🌟', '🎊', '💫'];

export default function Celebration({ count = 14 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
      <style>{`
        @keyframes islam-confetti {
          0%   { transform: translateY(0) scale(0.4) rotate(0deg);   opacity: 0; }
          15%  { opacity: 1; }
          100% { transform: translateY(-90px) scale(1.2) rotate(45deg); opacity: 0; }
        }
      `}</style>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${5 + i * (90 / count)}%`,
            top: '52%',
            fontSize: `${0.9 + (i % 3) * 0.4}rem`,
            animation: `islam-confetti ${0.78 + (i % 4) * 0.12}s ease-out forwards`,
            animationDelay: `${(i % 5) * 0.04}s`,
          }}
        >
          {CONFETTI[i % CONFETTI.length]}
        </span>
      ))}
    </div>
  );
}
