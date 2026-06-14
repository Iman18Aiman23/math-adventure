import React from 'react';
import BMHeader from './BMHeader';

/**
 * Sticky-note intro shown when a child enters a topic, BEFORE the quiz.
 * Styled like the KSSR "Bijak Bahasa" yellow note boxes. Re-shown on every
 * entry (the parent gates it with a `showNote` state, no persistence).
 *
 * Props:
 *  - topicTitle   : e.g. "Merespons Soalan"  (heading)
 *  - definition   : main explanation paragraph
 *  - examples     : string[]  — lines under "Contoh:"
 *  - conclusion   : the highlighted "➜ ..." takeaway line (optional)
 *  - onStart      : () => void  — proceed into the quiz
 *  - onBack       : () => void  — back to trail
 *  - accentColor  : module accent (default M1 orange)
 */
export default function BMNotaCard({
  language = 'bm',
  accentColor = '#E8821A',
  topicTitle,
  definition,
  examples = [],
  conclusion,
  onStart,
  onBack,
}) {
  return (
    <>
      <style>{`
        .nota-root {
          height: 100dvh; overflow: hidden;
          background:
            radial-gradient(ellipse 75% 55% at 14% 0%, ${accentColor}1f 0%, transparent 58%),
            radial-gradient(ellipse 65% 48% at 90% 100%, ${accentColor}18 0%, transparent 62%),
            linear-gradient(180deg, #FDFEFF 0%, #F3F6FB 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          color: #1E293B;
          display: flex; flex-direction: column;
        }
        .nota-body {
          flex: 1; min-height: 0;
          max-width: 560px; width: 100%; margin: 0 auto;
          padding: clamp(10px, 2vh, 18px) clamp(14px, 4vw, 28px);
          display: flex; flex-direction: column; justify-content: center;
          overflow-y: auto;
        }
        /* ── Sticky note ── */
        .nota-card {
          position: relative;
          background: linear-gradient(170deg, #FFFCEF 0%, #FFF4CC 100%);
          border: 2px solid #F3D879;
          border-radius: 18px;
          padding: clamp(20px, 3.4vh, 30px) clamp(18px, 4.5vw, 28px) clamp(16px, 2.6vh, 22px);
          box-shadow: 0 10px 28px -12px rgba(120, 90, 0, .35), inset 0 1px 0 #FFFEF7;
          transform: rotate(-0.6deg);
        }
        /* tape on top */
        .nota-tape {
          position: absolute; top: -12px; left: 50%; transform: translateX(-50%) rotate(1.5deg);
          width: clamp(96px, 30vw, 130px); height: 22px;
          background: linear-gradient(180deg, ${accentColor}55, ${accentColor}33);
          border: 1px solid ${accentColor}55;
          border-radius: 4px;
          box-shadow: 0 2px 6px -3px rgba(0,0,0,.25);
        }
        .nota-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(11px, 2vh, 13px); letter-spacing: .04em;
          color: #fff; background: ${accentColor};
          border-radius: 999px; padding: 4px 14px;
          box-shadow: 0 3px 0 ${accentColor}66;
          margin-bottom: clamp(8px, 1.6vh, 12px);
        }
        .nota-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(19px, 3.6vh, 26px); color: #1E293B;
          margin: 0 0 clamp(8px, 1.4vh, 12px);
        }
        .nota-def {
          font-size: clamp(14px, 2.5vh, 17px); font-weight: 500;
          line-height: 1.6; color: #4A4030; margin: 0 0 clamp(12px, 2vh, 16px);
        }
        .nota-contoh-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.3vh, 15px); color: ${accentColor};
          margin-bottom: 6px;
        }
        .nota-contoh {
          background: rgba(255,255,255,.7);
          border: 1.5px dashed ${accentColor}66;
          border-radius: 12px;
          padding: clamp(10px, 1.8vh, 14px) clamp(12px, 3vw, 16px);
        }
        .nota-contoh p {
          margin: 0 0 6px; font-size: clamp(13px, 2.3vh, 16px);
          font-weight: 500; color: #3A3326; line-height: 1.5;
        }
        .nota-contoh p:last-child { margin-bottom: 0; }
        .nota-concl {
          margin-top: clamp(10px, 1.8vh, 14px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 2.5vh, 17px); color: #166534;
          background: #EAF7EA; border: 1.5px solid #BBE7BB; border-radius: 12px;
          padding: clamp(8px, 1.4vh, 12px) clamp(12px, 3vw, 16px); line-height: 1.45;
        }
        .nota-cta-wrap { text-align: center; margin-top: clamp(14px, 2.6vh, 22px); }
        .nota-cta {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, 2.8vh, 19px); color: #fff; cursor: pointer;
          border: none; border-radius: 999px;
          padding: clamp(11px, 2vh, 14px) clamp(30px, 8vw, 48px);
          background: linear-gradient(180deg, ${accentColor}, ${accentColor}cc);
          box-shadow: 0 5px 0 ${accentColor}88, 0 14px 24px -12px ${accentColor};
          transition: transform .12s ease, box-shadow .12s;
        }
        .nota-cta:active { transform: translateY(3px); box-shadow: 0 2px 0 ${accentColor}88; }
        @media (hover: hover) { .nota-cta:hover { transform: translateY(-2px); box-shadow: 0 7px 0 ${accentColor}88, 0 16px 26px -12px ${accentColor}; } }
      `}</style>

      <div className="nota-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} sticky />
        <div className="nota-body">
          <div className="nota-card">
            <div className="nota-tape" />
            <span className="nota-badge">📝 {language === 'bm' ? 'Nota Penting' : 'Important Note'}</span>
            <h2 className="nota-title">{topicTitle}</h2>
            {definition && <p className="nota-def">{definition}</p>}
            {examples.length > 0 && (
              <>
                <div className="nota-contoh-label">{language === 'bm' ? 'Contoh:' : 'Example:'}</div>
                <div className="nota-contoh">
                  {examples.map((line, i) => <p key={i}>{line}</p>)}
                </div>
              </>
            )}
            {conclusion && <div className="nota-concl">{conclusion}</div>}
            <div className="nota-cta-wrap">
              <button className="nota-cta" onClick={onStart}>
                {language === 'bm' ? 'Mula Kuiz →' : 'Start Quiz →'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
