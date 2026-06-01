import React from 'react';

/**
 * LoadingSpinner — a calm spinner shown while a lazy-loaded chunk is fetched.
 *
 * Two modes:
 *  • default  — a centered block that fills its container. Used as the Suspense
 *               fallback safety-net for genuine cold mounts (nothing to show yet).
 *  • overlay  — a fixed translucent veil with a centered spinner that sits ON TOP
 *               of the current page. Driven by `isPending` from useTransition, so
 *               the page you're leaving stays visible underneath while the next
 *               page's chunk loads — no blank screen.
 *
 * Anti-flash: the visible part fades in after a 220ms delay (`both` fill mode
 * holds it hidden during the delay). Chunks that resolve faster than that —
 * cached pages, fast connections — unmount the spinner before it ever appears,
 * so quick navigations show nothing flicker. The keyframe is time-based (not
 * scroll/intersection driven), so it runs reliably on iOS Safari.
 */
export default function LoadingSpinner({ overlay = false }) {
  const Spinner = (
    <div className="ls-wrap">
      <div className="ls-spinner" />
    </div>
  );

  const css = `
    @keyframes lsSpin    { to { transform: rotate(360deg); } }
    @keyframes lsFadeIn  { from { opacity: 0; } to { opacity: 1; } }
    .ls-spinner {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      border: 4px solid rgba(167, 139, 250, 0.22);
      border-top-color: #A78BFA;
      animation: lsSpin 0.8s linear infinite;
    }
    .ls-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ls-overlay {
      position: fixed;
      inset: 0;
      z-index: 9998;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(19, 11, 30, 0.42);
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
      /* Whole veil fades in after the delay so fast loads stay invisible */
      opacity: 0;
      animation: lsFadeIn 0.25s ease-out 0.22s both;
    }
    .ls-block {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      min-height: 60vh;
      opacity: 0;
      animation: lsFadeIn 0.25s ease-out 0.22s both;
    }
  `;

  if (overlay) {
    return (
      <div role="status" aria-label="Loading" className="ls-overlay">
        <style>{css}</style>
        {Spinner}
      </div>
    );
  }

  return (
    <div role="status" aria-label="Loading" className="ls-block">
      <style>{css}</style>
      {Spinner}
    </div>
  );
}
