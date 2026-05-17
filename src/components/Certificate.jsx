import React from 'react';
import MascotIcon from './icons/MascotIcon';

const Certificate = ({ assessment, score, onRetry, onBack, language = 'eng' }) => {

  const isPassed = score.score >= assessment.scoreTarget;
  const percentage = score.percentage;

  return (
    <div className={`cert-page ${isPassed ? 'cert-passed' : 'cert-failed'}`}>
      <style>{`
        .cert-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          overflow: hidden;
          padding: 1rem;
          font-family: var(--font-heading);
        }
        .cert-page.cert-passed {
          background: linear-gradient(135deg, #E8F5E9, #F1F8E9);
        }
        .cert-page.cert-failed {
          background: linear-gradient(135deg, #FFEBEE, #FCE4EC);
        }

        /* ── Card ── */
        .cert-card {
          background-color: white;
          border-radius: 16px;
          padding: 1.5rem 1.25rem;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-height: 95vh;
          overflow-y: auto;
        }

        /* ── Mascot ── */
        .cert-mascot {
          margin-bottom: 0.75rem;
        }

        /* ── Title ── */
        .cert-title {
          font-size: 1.5rem;
          font-weight: 900;
          margin: 0 0 0.4rem 0;
          letter-spacing: 1px;
        }
        .cert-passed .cert-title { color: #2E7D32; }
        .cert-failed .cert-title { color: #C62828; }

        /* ── Assessment Name ── */
        .cert-name {
          font-size: 0.9rem;
          color: #555;
          margin: 0.4rem 0;
          font-weight: 600;
        }

        /* ── Score Box ── */
        .cert-score-box {
          border-radius: 12px;
          padding: 1rem;
          margin: 0.75rem 0;
          width: 100%;
          box-sizing: border-box;
        }
        .cert-passed .cert-score-box {
          background-color: #E8F5E9;
          border: 3px solid #4CAF50;
        }
        .cert-failed .cert-score-box {
          background-color: #FFEBEE;
          border: 3px solid #F44336;
        }
        .cert-percentage {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 0.3rem;
        }
        .cert-passed .cert-percentage { color: #4CAF50; }
        .cert-failed .cert-percentage { color: #F44336; }
        .cert-correct {
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 0.5rem;
        }

        /* ── Progress Bar ── */
        .cert-progress-track {
          width: 100%;
          height: 10px;
          background-color: #E0E0E0;
          border-radius: 5px;
          overflow: hidden;
        }
        .cert-progress-fill {
          height: 100%;
          transition: width 1s ease-out;
        }
        .cert-passed .cert-progress-fill { background-color: #4CAF50; }
        .cert-failed .cert-progress-fill { background-color: #F44336; }

        /* ── Info Text ── */
        .cert-info {
          font-size: 0.78rem;
          color: #999;
          margin: 0.75rem 0;
          font-style: italic;
          line-height: 1.4;
        }

        /* ── Buttons ── */
        .cert-buttons {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }
        .cert-btn {
          padding: 0.65rem 1.25rem;
          font-size: 0.82rem;
          font-weight: 700;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .cert-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
        }
        .cert-btn-retry {
          background-color: #4A90E2;
          color: white;
        }
        .cert-btn-back {
          border: 2px solid #E0E0E0;
        }
        .cert-passed .cert-btn-back {
          background-color: #58CC02;
          color: white;
          border-color: #58CC02;
        }
        .cert-failed .cert-btn-back {
          background-color: #F5F5F5;
          color: #2D4059;
        }

        /* ═══════════════════════════════════════════
           Small (Landscape Phones): min-width 576px
           ═══════════════════════════════════════════ */
        @media (min-width: 576px) {
          .cert-page { padding: 1.5rem; }
          .cert-card { padding: 1.75rem 1.5rem; border-radius: 18px; }
          .cert-title { font-size: 1.75rem; }
          .cert-name { font-size: 1rem; }
          .cert-score-box { padding: 1.25rem; margin: 1rem 0; }
          .cert-percentage { font-size: 2.25rem; }
          .cert-correct { font-size: 0.9rem; }
          .cert-progress-track { height: 11px; }
          .cert-info { font-size: 0.82rem; }
          .cert-buttons { gap: 0.85rem; }
          .cert-btn { padding: 0.7rem 1.4rem; font-size: 0.88rem; }
        }

        /* ═══════════════════════════════════════
           Medium (Tablets): min-width 768px
           ═══════════════════════════════════════ */
        @media (min-width: 768px) {
          .cert-page { padding: 2rem; }
          .cert-card { padding: 2rem 1.75rem; max-width: 540px; border-radius: 20px; }
          .cert-mascot { margin-bottom: 1rem; }
          .cert-title { font-size: 2rem; margin-bottom: 0.6rem; }
          .cert-name { font-size: 1.1rem; }
          .cert-score-box { padding: 1.5rem; margin: 1.25rem 0; }
          .cert-percentage { font-size: 2.5rem; }
          .cert-correct { font-size: 0.95rem; }
          .cert-progress-track { height: 12px; }
          .cert-info { font-size: 0.88rem; margin: 1rem 0; }
          .cert-buttons { gap: 1rem; margin-top: 1rem; }
          .cert-btn { padding: 0.8rem 1.6rem; font-size: 0.92rem; }
        }

        /* ═══════════════════════════════════════════════
           Large (Laptops/Desktops): min-width 992px
           ═══════════════════════════════════════════════ */
        @media (min-width: 992px) {
          .cert-card { padding: 2.5rem 2rem; max-width: 580px; }
          .cert-mascot { margin-bottom: 1.25rem; }
          .cert-title { font-size: 2.25rem; }
          .cert-name { font-size: 1.15rem; }
          .cert-score-box { padding: 1.75rem; margin: 1.5rem 0; }
          .cert-percentage { font-size: 2.75rem; }
          .cert-correct { font-size: 1rem; }
          .cert-info { font-size: 0.92rem; margin: 1.25rem 0; }
          .cert-buttons { margin-top: 1.25rem; }
          .cert-btn { padding: 0.9rem 1.8rem; font-size: 0.95rem; }
        }

        /* ═══════════════════════════════════════════════
           Extra Large (Wide Desktops): min-width 1200px
           ═══════════════════════════════════════════════ */
        @media (min-width: 1200px) {
          .cert-card { padding: 3rem 2.5rem; max-width: 620px; }
          .cert-mascot { margin-bottom: 1.5rem; }
          .cert-title { font-size: 2.5rem; }
          .cert-name { font-size: 1.2rem; }
          .cert-score-box { padding: 2rem; margin: 1.75rem 0; }
          .cert-percentage { font-size: 3rem; }
          .cert-correct { font-size: 1.1rem; margin-bottom: 0.75rem; }
          .cert-info { font-size: 0.95rem; margin: 1.5rem 0; }
          .cert-buttons { gap: 1rem; margin-top: 1.5rem; }
          .cert-btn { padding: 1rem 2rem; font-size: 1rem; }
        }
      `}</style>

      <div className="cert-card">
        {/* Mascot */}
        <div className="cert-mascot">
          <MascotIcon size={80} />
        </div>

        {/* Result Title */}
        <h1 className="cert-title">
          {isPassed ? '🎉 Congratulations!' : '😊 Try Again!'}
        </h1>

        {/* Assessment Name */}
        <p className="cert-name">{assessment.name}</p>

        {/* Score Display */}
        <div className="cert-score-box">
          <div className="cert-percentage">{percentage}%</div>
          <div className="cert-correct">
            {score.correct} out of {score.total} correct
          </div>
          <div className="cert-progress-track">
            <div
              className="cert-progress-fill"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Target Score Info */}
        <p className="cert-info">
          {isPassed
            ? `You achieved the target score of ${assessment.scoreTarget}! Excellent work!`
            : `You need ${assessment.scoreTarget} points to pass. You got ${score.score} points. Keep practicing!`
          }
        </p>

        {/* Buttons */}
        <div className="cert-buttons">
          {!isPassed && (
            <button onClick={onRetry} className="cert-btn cert-btn-retry">
              🔄 Try Again
            </button>
          )}
          <button onClick={onBack} className="cert-btn cert-btn-back">
            {isPassed ? '✨ Continue' : '← Back'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
