import React from 'react';

/**
 * Full-bleed galaxy / starfield background.
 * Self-contained (own gradient + 3 twinkling star layers + nebula glow).
 * Render it as an absolutely-positioned layer behind page chrome.
 */
export default function SpaceBackground() {
  return (
    <div className="mt-space" aria-hidden="true">
      <style>{`
        .mt-space {
          position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 50% at 22% 14%, rgba(99,102,241,.38), transparent 60%),
            radial-gradient(ellipse 55% 48% at 82% 76%, rgba(168,85,247,.32), transparent 60%),
            radial-gradient(ellipse 75% 55% at 50% 108%, rgba(56,189,248,.22), transparent 62%),
            linear-gradient(180deg,#0B1026 0%,#0A0A23 45%,#05030F 100%);
        }
        .mt-space-stars, .mt-space-stars-2, .mt-space-stars-3 { position: absolute; inset: 0; background-repeat: repeat; }
        .mt-space-stars {
          background-image:
            radial-gradient(1.5px 1.5px at 24px 18px, #fff, transparent),
            radial-gradient(1.5px 1.5px at 88px 62px, #fff, transparent),
            radial-gradient(1px 1px at 140px 30px, rgba(255,255,255,.85), transparent),
            radial-gradient(1.5px 1.5px at 180px 120px, #fff, transparent),
            radial-gradient(1px 1px at 56px 150px, rgba(255,255,255,.7), transparent);
          background-size: 200px 200px;
          animation: mt-space-tw 3.6s ease-in-out infinite;
        }
        .mt-space-stars-2 {
          background-image:
            radial-gradient(1px 1px at 60px 40px, rgba(255,255,255,.9), transparent),
            radial-gradient(2px 2px at 120px 92px, #fff, transparent),
            radial-gradient(1px 1px at 30px 110px, rgba(199,210,254,.9), transparent),
            radial-gradient(1.5px 1.5px at 172px 22px, #fff, transparent);
          background-size: 260px 260px;
          animation: mt-space-tw 5.2s ease-in-out infinite 1s;
        }
        .mt-space-stars-3 {
          background-image:
            radial-gradient(2.5px 2.5px at 100px 100px, #fff, transparent),
            radial-gradient(2px 2px at 220px 60px, rgba(186,230,253,.95), transparent),
            radial-gradient(2px 2px at 40px 240px, rgba(233,213,255,.9), transparent);
          background-size: 320px 320px;
          animation: mt-space-drift 120s linear infinite, mt-space-tw 6.5s ease-in-out infinite;
        }
        @keyframes mt-space-tw { 0%, 100% { opacity: .45; } 50% { opacity: 1; } }
        @keyframes mt-space-drift { from { background-position: 0 0; } to { background-position: 320px 240px; } }
        @media (prefers-reduced-motion: reduce) {
          .mt-space-stars, .mt-space-stars-2, .mt-space-stars-3 { animation: none; }
        }
      `}</style>
      <div className="mt-space-stars" />
      <div className="mt-space-stars-2" />
      <div className="mt-space-stars-3" />
    </div>
  );
}
