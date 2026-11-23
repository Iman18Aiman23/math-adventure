import React from 'react';

export default function CrownDisplay({ level = 0, size = 'sm', loading = false }) {
  return (
    <>
      <style>{`
        .cd-root {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
          line-height: 1;
          min-height: 18px;
        }
        .cd-star {
          display: inline-block;
          line-height: 1;
        }
        .cd-star.earned {
          color: #F59E0B;
          text-shadow: 0 1px 0 #B45309;
        }
        .cd-star.empty {
          color: #94A3B8;
          opacity: 1;
        }
        .cd-lock {
          display: inline-block;
          line-height: 1;
          opacity: 0.55;
        }
        .cd-loading-placeholder {
          display: inline-block;
        }

        @media (prefers-color-scheme: dark) {
          .cd-star.empty { color: #64748B; opacity: 1; }
          .cd-lock { opacity: 0.45; }
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
            style={{ width: size === 'sm' ? '52px' : '80px', height: size === 'sm' ? '15px' : '20px' }}
          />
        ) : level === 0 ? (
          <span className="cd-lock" aria-hidden="true" style={{ fontSize: size === 'sm' ? '13px' : '18px' }}>🔒</span>
        ) : (
          Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`cd-star${i < level ? ' earned' : ' empty'}`}
              aria-hidden="true"
              style={{ fontSize: size === 'sm' ? '14px' : '19px' }}
            >
              {i < level ? '⭐' : '☆'}
            </span>
          ))
        )}
      </span>
    </>
  );
}
