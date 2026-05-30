import React from 'react';

/**
 * LoadingSkeleton — a pleasant placeholder shown while a lazy-loaded page chunk
 * is fetched. Mirrors the general page shape (back button · hero · tile grid)
 * with a shimmer sweep, so the wait reads as "content is arriving" instead of a
 * blank "Loading…". Matches the app's dark theme.
 */
export default function LoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: '100%',
        background: 'var(--bg-body, #130B1E)',
        padding: '2rem 1.25rem',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes skShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        .sk-block {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.05) 25%,
            rgba(255,255,255,0.14) 37%,
            rgba(255,255,255,0.05) 63%
          );
          background-size: 200% 100%;
          animation: skShimmer 1.4s ease-in-out infinite;
          border-radius: 14px;
        }
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.85rem;
          width: 100%;
          max-width: 640px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .sk-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      {/* Back button placeholder */}
      <div className="sk-block" style={{ width: 44, height: 44, borderRadius: '50%' }} />

      {/* Hero placeholder */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.9rem', margin: '1.75rem 0 2.25rem' }}>
        <div className="sk-block" style={{ width: 84, height: 84, borderRadius: 22 }} />
        <div className="sk-block" style={{ width: 220, height: 22 }} />
        <div className="sk-block" style={{ width: 300, height: 14, maxWidth: '80%' }} />
      </div>

      {/* Section label placeholder */}
      <div className="sk-block" style={{ width: 150, height: 16, margin: '0 auto 1.25rem' }} />

      {/* Tile grid placeholder */}
      <div className="sk-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="sk-block" style={{ height: 96 }} />
        ))}
      </div>
    </div>
  );
}
