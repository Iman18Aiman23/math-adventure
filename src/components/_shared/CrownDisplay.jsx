import React from 'react';

export default function CrownDisplay({ level = 0, size = 'sm', loading = false }) {
  return (
    <>
      <style>{`
        .cd-root {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1px;
          line-height: 1;
          min-height: 14px;
        }
        .cd-star {
          display: inline-block;
          line-height: 1;
        }
        .cd-star.empty {
          opacity: 0.3;
        }
        .cd-lock {
          display: inline-block;
          line-height: 1;
          opacity: 0.45;
        }
        .cd-loading-placeholder {
          display: inline-block;
        }

        @media (prefers-color-scheme: dark) {
          .cd-star.empty { opacity: 0.2; }
          .cd-lock { opacity: 0.35; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cd-root { animation: none; }
        }
      `}</style>

      <span
        className="cd-root"
        role="img"
        aria-label={loading ? 'Loading' : level === 0 ? 'Not started' : `Crown level ${level} of 5`}
      >
        {loading ? (
          <span
            className="cd-loading-placeholder"
            aria-hidden="true"
            style={{ width: size === 'sm' ? '40px' : '64px', height: size === 'sm' ? '11px' : '15px' }}
          />
        ) : level === 0 ? (
          <span className="cd-lock" aria-hidden="true" style={{ fontSize: size === 'sm' ? '11px' : '16px' }}>🔒</span>
        ) : (
          Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`cd-star${i < level ? '' : ' empty'}`}
              aria-hidden="true"
              style={{ fontSize: size === 'sm' ? '11px' : '15px' }}
            >
              {i < level ? '⭐' : '☆'}
            </span>
          ))
        )}
      </span>
    </>
  );
}
