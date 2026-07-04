import React from 'react';

/**
 * Shared light learning backdrop for Matematik topic activities.
 * Keeps the galaxy-spacing feel with orbit lines, grid rhythm, and soft module
 * color washes, without scenic elements competing with the question content.
 */
function MatematikSceneBackground() {
  return (
    <div className="mt-scene" aria-hidden="true">
      <style>{`
        .mt-scene {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          background:
            radial-gradient(ellipse at 18% 10%, color-mix(in srgb, var(--mt-accent) 26%, transparent) 0, transparent 38%),
            radial-gradient(ellipse at 82% 18%, rgba(224, 231, 255, .82) 0, transparent 42%),
            radial-gradient(ellipse at 50% 98%, color-mix(in srgb, var(--mt-accent) 16%, transparent) 0, transparent 44%),
            linear-gradient(180deg, #F8FFFD 0%, #ECFEFF 54%, #E8F7F3 100%);
        }
        .mt-scene::before {
          content: '';
          position: absolute;
          inset: -12% -8%;
          background-image:
            linear-gradient(color-mix(in srgb, var(--mt-dark) 13%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in srgb, var(--mt-dark) 11%, transparent) 1px, transparent 1px);
          background-size: 48px 48px;
          opacity: .42;
          transform: rotate(-2deg);
          mask-image: linear-gradient(180deg, transparent 0%, rgba(0,0,0,.74) 18%, rgba(0,0,0,.62) 74%, transparent 100%);
        }
        .mt-scene::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at center, color-mix(in srgb, var(--mt-dark) 24%, transparent) 1px, transparent 1.4px),
            linear-gradient(120deg, transparent 0 40%, color-mix(in srgb, var(--mt-accent) 10%, transparent) 40.5%, transparent 42% 100%);
          background-size: 34px 34px, 100% 100%;
          opacity: .36;
          mask-image: linear-gradient(180deg, transparent 0%, black 24%, black 74%, transparent 100%);
        }
        .mt-scene-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(980px, 128vmin);
          aspect-ratio: 1;
          border-radius: 50%;
          transform: translate(-50%, -50%) rotate(var(--r));
          border: 1px solid color-mix(in srgb, var(--mt-dark) 14%, transparent);
          box-shadow:
            0 0 0 92px color-mix(in srgb, var(--mt-accent) 5%, transparent),
            0 0 0 184px rgba(63, 81, 181, .035);
        }
        .mt-scene-orbit.two {
          width: min(720px, 96vmin);
          --r: -18deg;
          border-color: rgba(63, 81, 181, .13);
          box-shadow: none;
        }
        .mt-scene-orbit.three {
          width: min(520px, 76vmin);
          --r: 22deg;
          border-style: dashed;
          border-color: color-mix(in srgb, var(--mt-accent) 24%, transparent);
          box-shadow: none;
        }
        .mt-scene-panel {
          position: absolute;
          border-radius: 20px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.78), rgba(255,255,255,.38)),
            linear-gradient(135deg, color-mix(in srgb, var(--mt-accent) 12%, transparent), rgba(255,255,255,.12));
          border: 1px solid rgba(255,255,255,.72);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.94),
            0 18px 48px rgba(15, 118, 110, .08);
          backdrop-filter: blur(8px);
          opacity: .72;
        }
        .mt-scene-panel::before {
          content: '';
          position: absolute;
          inset: 10px;
          border-radius: 14px;
          border: 1px dashed color-mix(in srgb, var(--mt-dark) 12%, transparent);
          opacity: .9;
        }
        .mt-scene-panel::after {
          content: attr(data-glyph);
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          font-family: 'Baloo 2', sans-serif;
          font-weight: 800;
          font-size: clamp(18px, 3.6vmin, 34px);
          color: color-mix(in srgb, var(--mt-dark) 28%, transparent);
          text-shadow: 0 1px 0 rgba(255,255,255,.6);
        }
        .mt-scene-panel.one {
          width: clamp(92px, 17vmin, 168px);
          height: clamp(64px, 11vmin, 112px);
          left: clamp(14px, 8vw, 108px);
          top: clamp(96px, 18vh, 176px);
          transform: rotate(-7deg);
        }
        .mt-scene-panel.two {
          width: clamp(82px, 15vmin, 146px);
          height: clamp(82px, 15vmin, 146px);
          right: clamp(12px, 9vw, 120px);
          top: clamp(128px, 24vh, 220px);
          transform: rotate(8deg);
        }
        .mt-scene-panel.three {
          width: clamp(110px, 20vmin, 190px);
          height: clamp(54px, 9vmin, 92px);
          right: clamp(20px, 12vw, 150px);
          bottom: clamp(34px, 12vh, 130px);
          transform: rotate(-4deg);
        }
        .mt-scene-mark {
          position: absolute;
          display: grid;
          place-items: center;
          width: clamp(34px, 6.6vmin, 56px);
          height: clamp(34px, 6.6vmin, 56px);
          border-radius: 16px;
          background: rgba(255, 255, 255, .64);
          border: 1px solid color-mix(in srgb, var(--mt-accent) 24%, rgba(255,255,255,.64));
          color: color-mix(in srgb, var(--mt-dark) 78%, #3F51B5);
          font-family: 'Baloo 2', sans-serif;
          font-weight: 900;
          font-size: clamp(20px, 4.6vmin, 38px);
          box-shadow: 0 12px 28px rgba(15, 118, 110, .10);
          transform: rotate(var(--r));
        }
        .mt-mark-1 { top: 17%; left: 27%; --r: -10deg; }
        .mt-mark-2 { top: 12%; right: 31%; --r: 8deg; }
        .mt-mark-3 { bottom: 15%; left: 10%; --r: 12deg; }
        .mt-mark-4 { bottom: 13%; right: 10%; --r: -7deg; }
        @media (max-width: 560px) {
          .mt-scene-panel.one { left: -44px; top: 124px; }
          .mt-scene-panel.two { right: -48px; top: 190px; }
          .mt-scene-panel.three { display: none; }
          .mt-mark-1, .mt-mark-2 { opacity: .46; }
        }
      `}</style>

      <div className="mt-scene-orbit" style={{ '--r': '8deg' }} />
      <div className="mt-scene-orbit two" />
      <div className="mt-scene-orbit three" />

      <div className="mt-scene-panel one" data-glyph="10" />
      <div className="mt-scene-panel two" data-glyph="+" />
      <div className="mt-scene-panel three" data-glyph="sa" />

      <div className="mt-scene-mark mt-mark-1">+</div>
      <div className="mt-scene-mark mt-mark-2">7</div>
      <div className="mt-scene-mark mt-mark-3">=</div>
      <div className="mt-scene-mark mt-mark-4">3</div>
    </div>
  );
}

export default React.memo(MatematikSceneBackground);
