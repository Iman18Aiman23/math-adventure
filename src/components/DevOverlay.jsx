import React from 'react';

/**
 * DevOverlay — Parent/Dev debug overlay.
 *
 * Displays real-time SpeechRecognition data:
 *  - Target Word (what we're looking for)
 *  - AI Heard (raw transcript)
 *  - Confidence %
 *  - Match Method (direct / validMatch / phonetic / substring / none)
 *  - Match Status
 *  - Alternatives
 *  - Platform & Language
 */
export default function DevOverlay({ visible, transcriptData, onClose }) {
  if (!visible) return null;

  const data = transcriptData || {};

  // Format confidence as percentage
  const confidenceStr = data.confidence != null
    ? `${(data.confidence * 100).toFixed(1)}%`
    : '—';

  // Confidence color: green if high, yellow if medium, red if low
  const confidenceColor = data.confidence >= 0.7
    ? '#10b981'
    : data.confidence >= 0.45
    ? '#f59e0b'
    : data.confidence > 0
    ? '#ef4444'
    : '#94a3b8';

  // Method badge color
  const methodColors = {
    'direct': '#10b981',
    'validMatch': '#0ea5e9',
    'phonetic': '#7c3aed',
    'phonetic-word': '#7c3aed',
    'phonetic-alt': '#a78bfa',
    'phonetic-word-alt': '#a78bfa',
    'validMatch-alt': '#38bdf8',
    'substring': '#f59e0b',
    'substring-alt': '#fbbf24',
    'low-confidence': '#ef4444',
    'none': '#64748b',
  };

  const methodColor = methodColors[data.matchMethod] || '#94a3b8';

  return (
    <div className="dev-overlay">
      <div className="dev-overlay-header">
        <span>🔧 Dev Overlay</span>
        <button className="dev-overlay-close" onClick={onClose}>✕</button>
      </div>

      <div className="dev-overlay-row">
        <span className="dev-label">Platform:</span>
        <span className="dev-value">{/Mobile|Android|iPhone/i.test(navigator.userAgent) ? '📱 Mobile' : '💻 Desktop'}</span>
      </div>

      <div className="dev-overlay-row">
        <span className="dev-label">Lang:</span>
        <span className="dev-value">{data.lang || '—'}</span>
      </div>

      {/* TARGET WORD — what we're looking for */}
      <div className="dev-overlay-row" style={{ background: 'rgba(14,165,233,0.08)' }}>
        <span className="dev-label">🎯 Target:</span>
        <span className="dev-value" style={{ color: '#0ea5e9', fontWeight: 700, fontSize: '0.85rem' }}>
          {data.targetWord || '—'}
        </span>
      </div>

      {/* AI HEARD — raw transcript */}
      <div className="dev-overlay-row">
        <span className="dev-label">🤖 Heard:</span>
        <span className="dev-value dev-transcript">
          {data.transcript || '(waiting...)'}
        </span>
      </div>

      {/* CONFIDENCE % */}
      <div className="dev-overlay-row">
        <span className="dev-label">📊 Confidence:</span>
        <span className="dev-value" style={{ color: confidenceColor, fontWeight: 700 }}>
          {confidenceStr}
        </span>
      </div>

      {/* MATCH METHOD — how the match was found */}
      {data.matchMethod && (
        <div className="dev-overlay-row">
          <span className="dev-label">🔗 Method:</span>
          <span
            className="dev-value"
            style={{
              color: methodColor,
              fontWeight: 700,
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {data.matchMethod || '—'}
          </span>
        </div>
      )}

      {/* ALTERNATIVES */}
      {data.alternatives && (
        <div className="dev-overlay-row">
          <span className="dev-label">Alts:</span>
          <span className="dev-value" style={{ fontSize: '0.6rem' }}>
            {data.alternatives}
          </span>
        </div>
      )}

      {/* FINAL STATUS */}
      <div className="dev-overlay-row">
        <span className="dev-label">Status:</span>
        <span className={`dev-value ${data.matched ? 'dev-matched' : data.matched === false ? 'dev-unmatched' : ''}`}>
          {data.matched === true
            ? '✅ MATCHED'
            : data.matched === false
            ? '❌ NO MATCH'
            : '—'}
        </span>
      </div>

      {/* PHONETIC BRIDGE INFO */}
      {data.matchMethod && data.matchMethod.includes('phonetic') && (
        <div className="dev-overlay-row" style={{ background: 'rgba(124,58,237,0.08)' }}>
          <span className="dev-label">🌉 Bridge:</span>
          <span className="dev-value" style={{ color: '#7c3aed', fontWeight: 600, fontSize: '0.68rem' }}>
            "{data.transcript}" → "{data.targetWord}"
          </span>
        </div>
      )}
    </div>
  );
}
