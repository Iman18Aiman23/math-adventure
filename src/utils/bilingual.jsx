import React, { useState } from 'react';

export function BilingualText({ jawi, bm, style = {}, textAlign = 'center' }) {
  const [showBM, setShowBM] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowBM(true)}
      onMouseLeave={() => setShowBM(false)}
      style={{
        position: 'relative',
        textAlign: textAlign,
        direction: 'rtl',
        cursor: 'help',
        ...style
      }}
      title={`${bm}`}
    >
      <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1, fontSize: '1.1em', fontWeight: 700 }}>
        {jawi}
        {showBM && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#333',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.85em',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              zIndex: 1000,
              marginBottom: '8px',
              direction: 'ltr',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            {bm}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid #333'
              }}
            />
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-2px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export function BilingualHeading({ jawi, bm, level = 'h2', style = {} }) {
  const [showBM, setShowBM] = useState(false);
  const Tag = level;

  return (
    <Tag
      onMouseEnter={() => setShowBM(true)}
      onMouseLeave={() => setShowBM(false)}
      style={{
        textAlign: 'center',
        margin: '0 0 8px 0',
        position: 'relative',
        direction: 'rtl',
        cursor: 'help',
        ...style
      }}
      title={`${bm}`}
    >
      <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
        <div style={{ fontSize: '1.15em', fontWeight: 700, lineHeight: 1 }}>
          {jawi}
        </div>
        {showBM && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#333',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.8em',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              zIndex: 1000,
              marginBottom: '8px',
              direction: 'ltr',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            {bm}
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid #333'
              }}
            />
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-2px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </Tag>
  );
}

export function BilingualLabel({ jawi, bm, style = {} }) {
  const [showBM, setShowBM] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowBM(true)}
      onMouseLeave={() => setShowBM(false)}
      style={{
        textAlign: 'center',
        position: 'relative',
        direction: 'rtl',
        cursor: 'help',
        display: 'inline-block',
        ...style
      }}
      title={`${bm}`}
    >
      <div style={{ fontSize: '1.05em', fontWeight: 700, letterSpacing: '0.5px', lineHeight: 1 }}>
        {jawi}
      </div>
      {showBM && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#333',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '0.75em',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            zIndex: 1000,
            marginBottom: '6px',
            direction: 'ltr',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {bm}
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid #333'
            }}
          />
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-2px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
