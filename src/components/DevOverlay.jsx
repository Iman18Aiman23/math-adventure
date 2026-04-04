import React from 'react';

/**
 * DevOverlay — Parent/Dev debug overlay.
 *
 * Displays real-time SpeechRecognition data:
 *  - Raw transcript string
 *  - Confidence score
 *  - Active language
 *  - Match status
 */
export default function DevOverlay({ visible, transcriptData, onClose }) {
  if (!visible) return null;

  const data = transcriptData || {};

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

      <div className="dev-overlay-row">
        <span className="dev-label">Raw:</span>
        <span className="dev-value dev-transcript">
          {data.transcript || '(waiting...)'}
        </span>
      </div>

      <div className="dev-overlay-row">
        <span className="dev-label">Confidence:</span>
        <span className="dev-value">
          {data.confidence != null
            ? `${(data.confidence * 100).toFixed(1)}%`
            : '—'}
        </span>
      </div>

      {data.alternatives && (
        <div className="dev-overlay-row">
          <span className="dev-label">Alts:</span>
          <span className="dev-value" style={{ fontSize: '0.6rem' }}>
            {data.alternatives}
          </span>
        </div>
      )}

      <div className="dev-overlay-row">
        <span className="dev-label">Final:</span>
        <span className="dev-value">
          {data.isFinal ? '✅ Yes' : '⏳ No'}
        </span>
      </div>

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
    </div>
  );
}
