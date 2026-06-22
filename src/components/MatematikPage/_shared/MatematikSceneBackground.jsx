import React from 'react';

/**
 * Shared decorative landscape behind every Matematik topic activity.
 * Self-contained (no cross-root <use>), visible at rest, clouds drift via GPU
 * transforms only. Sits behind content (z-index 0, pointer-events none).
 */
const CLOUDS = ['mt-cloud-1', 'mt-cloud-2', 'mt-cloud-3', 'mt-cloud-4'];

// Memoised: takes no props, so it never needs to re-render when the shell does
// (e.g. on the Belajar/Kuiz toggle). Keeps the scene fully isolated from gameplay.
function MatematikSceneBackground() {
  return (
    <div className="mt-scene" aria-hidden="true">
      <style>{`
        .mt-scene {
          position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
          background: linear-gradient(180deg, #BFE3F5 0%, #D2EBF8 40%, #E7F5FB 66%, #F1FAF3 100%);
        }
        /* soft wash so content on top stays readable */
        .mt-scene::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.10) 40%, rgba(255,255,255,0) 70%);
        }
        .mt-scene-sun {
          position: absolute; top: 7%; right: 12%;
          width: clamp(52px, 11vmin, 104px); height: clamp(52px, 11vmin, 104px); border-radius: 50%;
          background: radial-gradient(circle at 50% 50%, #FFE470 0%, #FFD23F 55%, #FBC02D 100%);
          box-shadow: 0 0 0 clamp(9px,2.6vmin,22px) rgba(255,221,87,.22),
                      0 0 0 clamp(18px,5.2vmin,46px) rgba(255,221,87,.10);
        }
        .mt-scene-cloud { position: absolute; will-change: transform; }
        .mt-scene-cloud svg { display: block; width: 100%; height: auto; filter: drop-shadow(0 4px 6px rgba(120,150,170,.12)); }
        @keyframes mtDrift1 { 0%,100% { transform: translateX(0); } 50% { transform: translateX(34px); } }
        @keyframes mtDrift2 { 0%,100% { transform: translateX(0); } 50% { transform: translateX(-28px); } }
        @keyframes mtDrift3 { 0%,100% { transform: translateX(0); } 50% { transform: translateX(22px); } }
        .mt-cloud-1 { top: 11%; left: 7%;  width: clamp(68px,15vmin,134px); animation: mtDrift1 27s ease-in-out infinite; }
        .mt-cloud-2 { top: 23%; left: 58%; width: clamp(88px,19vmin,172px); animation: mtDrift2 33s ease-in-out infinite; }
        .mt-cloud-3 { top: 5%;  left: 38%; width: clamp(58px,12vmin,116px); animation: mtDrift3 23s ease-in-out infinite; }
        .mt-cloud-4 { top: 33%; left: 20%; width: clamp(50px,11vmin,104px); animation: mtDrift1 31s ease-in-out infinite; opacity: .9; }
        .mt-scene-hills { position: absolute; left: 0; right: 0; bottom: 0; width: 100%; height: auto; display: block; }
        @media (prefers-reduced-motion: reduce) {
          .mt-scene-cloud { animation: none !important; }
        }
      `}</style>

      <div className="mt-scene-sun" />

      {CLOUDS.map((c) => (
        <div key={c} className={`mt-scene-cloud ${c}`}>
          <svg width="120" height="62" viewBox="0 0 120 62" fill="#ffffff">
            <ellipse cx="40" cy="40" rx="30" ry="20" />
            <ellipse cx="66" cy="31" rx="27" ry="23" />
            <ellipse cx="90" cy="42" rx="24" ry="18" />
            <rect x="34" y="40" width="62" height="20" rx="10" />
          </svg>
        </div>
      ))}

      <svg className="mt-scene-hills" width="800" height="210" viewBox="0 0 800 210" preserveAspectRatio="xMidYMax slice" fill="none">
        <path d="M0 118 Q200 64 400 104 T800 92 V210 H0 Z" fill="#9BD877" />
        <path d="M0 150 Q220 108 440 142 T800 134 V210 H0 Z" fill="#63B94D" />
        <path d="M0 182 Q260 150 520 174 T800 166 V210 H0 Z" fill="#3E9B3A" />
      </svg>
    </div>
  );
}

export default React.memo(MatematikSceneBackground);
