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
            radial-gradient(ellipse 60% 40% at 80% 8%, ${accentColor}1f 0%, transparent 60%),
            radial-gradient(ellipse 55% 45% at 12% 96%, #7C3AED14 0%, transparent 62%),
            linear-gradient(180deg, #FFF9EC 0%, #F4EFE0 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          color: #1E293B;
          display: flex; flex-direction: column;
        }
        .nota-body {
          flex: 1; min-height: 0;
          max-width: 540px; width: 100%; margin: 0 auto;
          padding: clamp(18px, 3.4vh, 30px) clamp(16px, 4vw, 30px);
          display: flex; flex-direction: column; justify-content: center;
          overflow-y: auto;
        }
        /* ── Sticky note (post-it paper, tilted) ── */
        .nota-card {
          position: relative;
          background:
            radial-gradient(ellipse 120% 90% at 12% 0%, #FFFADB 0%, transparent 55%),
            repeating-linear-gradient(0deg, rgba(0,0,0,.014) 0 1px, transparent 1px 3px),
            linear-gradient(165deg, #FFF4A8 0%, #FFEA72 55%, #FBDF55 100%);
          border: none;
          border-radius: 4px 4px 18px 4px;
          padding: clamp(28px, 4.2vh, 40px) clamp(20px, 5vw, 30px) clamp(20px, 3vh, 28px);
          box-shadow:
            0 1px 1px rgba(124, 96, 0, .18),
            0 10px 20px -10px rgba(124, 96, 0, .35),
            14px 22px 34px -18px rgba(80, 62, 0, .45),
            inset 0 1px 0 rgba(255,255,255,.55);
          transform: rotate(-1.6deg);
        }
        /* peeling / curled bottom-right corner */
        .nota-fold {
          position: absolute; right: -1px; bottom: -1px;
          width: clamp(34px, 8vw, 46px); height: clamp(34px, 8vw, 46px);
          background: linear-gradient(135deg, #F4D94E 0%, #EFCF3A 48%, #E4C12B 100%);
          border-bottom-right-radius: 18px;
          box-shadow: -3px -3px 8px -2px rgba(90, 70, 0, .30);
          clip-path: polygon(100% 0, 0 100%, 100% 100%);
        }
        /* washi tape across the top */
        .nota-tape {
          position: absolute; top: clamp(-14px, -2.1vh, -11px); left: 50%;
          transform: translateX(-50%) rotate(-2.5deg);
          width: clamp(116px, 36vw, 156px); height: clamp(26px, 4vh, 30px);
          background:
            repeating-linear-gradient(90deg, #7C3AED33 0 7px, #EC489933 7px 14px),
            linear-gradient(180deg, rgba(255,255,255,.45), rgba(255,255,255,.15));
          border-left: 1px dashed rgba(124,58,237,.4);
          border-right: 1px dashed rgba(124,58,237,.4);
          box-shadow: 0 2px 7px -4px rgba(0,0,0,.35);
        }
        /* rocket sticker, peeking off the top-right corner */
        .nota-rocket {
          position: absolute; top: clamp(-18px, -2.6vh, -14px); right: clamp(-10px, -2vw, -6px);
          width: clamp(44px, 8vh, 56px); height: clamp(44px, 8vh, 56px);
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(24px, 4.4vh, 32px); line-height: 1;
          background: linear-gradient(160deg, #FFFFFF, #F3E8FF);
          border: 2.5px solid #C4B5FD;
          border-radius: 50%;
          transform: rotate(12deg);
          box-shadow: 0 6px 14px -6px rgba(124,58,237,.5);
        }
        .nota-badge {
          display: inline-flex; align-items: center; gap: 6px;
          align-self: flex-start;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 2.1vh, 14px); letter-spacing: .02em;
          color: #fff;
          background: linear-gradient(135deg, #F97316, #EC4899);
          border-radius: 999px; padding: 5px 16px;
          transform: rotate(-1.2deg);
          box-shadow: 0 3px 0 #C2410C66, 0 6px 12px -5px rgba(236,72,153,.6);
          margin-bottom: clamp(10px, 1.8vh, 14px);
        }
        .nota-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(21px, 4vh, 29px);
          color: #7C3AED;
          text-shadow: 1px 1px 0 #fff;
          margin: 0 0 clamp(8px, 1.4vh, 12px);
        }
        .nota-def {
          font-size: clamp(14px, 2.5vh, 17px); font-weight: 600;
          line-height: 1.6; color: #4A3F10; margin: 0 0 clamp(12px, 2vh, 16px);
        }
        .nota-contoh-label {
          display: inline-flex; align-items: center; gap: 5px;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, 2.3vh, 15px); color: #0E7490;
          margin-bottom: 6px;
        }
        .nota-contoh {
          background: rgba(255,255,255,.7);
          border: 2px dashed #38BDF8;
          border-radius: 14px;
          padding: clamp(10px, 1.8vh, 14px) clamp(12px, 3vw, 16px);
        }
        .nota-contoh p {
          margin: 0 0 6px; font-size: clamp(13px, 2.3vh, 16px);
          font-weight: 600; color: #3A3326; line-height: 1.5;
        }
        .nota-contoh p:last-child { margin-bottom: 0; }
        .nota-concl {
          display: flex; align-items: center; gap: 8px;
          margin-top: clamp(10px, 1.8vh, 14px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 2.5vh, 17px); color: #15803D;
          background: #DCFCE7; border: 2px solid #86EFAC; border-radius: 14px;
          padding: clamp(8px, 1.4vh, 12px) clamp(12px, 3vw, 16px); line-height: 1.4;
        }
        .nota-cta-wrap { text-align: center; margin-top: clamp(16px, 2.8vh, 24px); }
        .nota-cta {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, 3vh, 20px); color: #fff; cursor: pointer;
          border: none; border-radius: 999px;
          padding: clamp(12px, 2.2vh, 15px) clamp(32px, 8vw, 50px);
          background: linear-gradient(180deg, #8B5CF6, #7C3AED);
          box-shadow: 0 5px 0 #6D28D9, 0 14px 24px -12px #7C3AED;
          transition: transform .12s ease, box-shadow .12s;
        }
        .nota-cta:active { transform: translateY(3px); box-shadow: 0 2px 0 #6D28D9; }
        @media (hover: hover) { .nota-cta:hover { transform: translateY(-2px); box-shadow: 0 7px 0 #6D28D9, 0 16px 26px -12px #7C3AED; } }
      `}</style>

      <div className="nota-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} sticky />
        <div className="nota-body">
          <div className="nota-card">
            <div className="nota-tape" />
            <div className="nota-rocket">🚀</div>
            <div className="nota-fold" />
            <span className="nota-badge">📝 {language === 'bm' ? 'Nota Penting' : 'Important Note'}</span>
            <h2 className="nota-title">{topicTitle}</h2>
            {definition && <p className="nota-def">{definition}</p>}
            {examples.length > 0 && (
              <>
                <div className="nota-contoh-label">💡 {language === 'bm' ? 'Contoh:' : 'Example:'}</div>
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
