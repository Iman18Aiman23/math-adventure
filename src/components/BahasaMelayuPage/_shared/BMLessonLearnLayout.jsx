import React, { useEffect } from 'react';
import SpeechManager from '../../../services/SpeechManager';

const VOWELS = [
  { letter: 'A', lower: 'a', color: '#EF4444' },
  { letter: 'E', lower: 'e', color: '#F59E0B' },
  { letter: 'I', lower: 'i', color: '#10B981' },
  { letter: 'O', lower: 'o', color: '#3B82F6' },
  { letter: 'U', lower: 'u', color: '#8B5CF6' },
];

export default function BMLessonLearnLayout({ onBack, topicTitle, onStartQuiz, language = 'bm', accentColor = '#E8821A' }) {
  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handleListen = (letter) => {
    SpeechManager.stopSpeaking();
    SpeechManager.speak(letter.toLowerCase(), 'ms-MY', { rate: 0.7, pitch: 1.2 });
  };

  return (
    <>
      <style>{`
        .bm-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .bm-learn-topbar {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          padding: 10px 16px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .bm-learn-back {
          position: absolute; left: 12px;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .bm-learn-back:hover { background: #F1F5F9; }
        .bm-learn-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: 14px; color: #1E293B;
        }
        .bm-learn-body {
          flex: 1; display: flex; flex-direction: column;
          align-items: center;
          padding: 10px 16px 4px;
          overflow: hidden;
        }
        .bm-learn-heading {
          text-align: center; flex-shrink: 0;
        }
        .bm-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(18px, 4vw, 26px);
          color: #1E293B; margin: 0;
        }
        .bm-learn-heading p {
          font-size: 12px; font-weight: 500;
          color: #64748B; margin: 2px 0 0;
        }
        .bm-learn-grid {
          flex: 1; display: grid;
          grid-template-columns: repeat(2, 1fr);
          align-content: center; justify-items: center;
          gap: 8px;
          max-width: 360px; width: 100%;
          padding: 4px 0;
        }
        @media (min-width: 600px) {
          .bm-learn-grid {
            grid-template-columns: repeat(3, 1fr);
            max-width: 520px;
          }
        }
        @media (min-width: 1024px) {
          .bm-learn-grid {
            grid-template-columns: repeat(5, 1fr);
            max-width: 780px;
          }
        }
        .bm-learn-card {
          background: #fff; border-radius: 18px;
          padding: 10px 8px 8px;
          width: 100%; max-width: 140px;
          display: flex; flex-direction: column;
          align-items: center; gap: 4px;
          border: 2px solid ${accentColor}22;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
        }
        .bm-learn-letter {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(28px, 6vw, 44px);
          line-height: 1; margin: 0;
        }
        .bm-learn-lower {
          font-size: clamp(16px, 3.5vw, 24px);
          opacity: 0.5; line-height: 1;
        }
        .bm-learn-card-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(10px, 1.8vw, 13px);
          color: #fff;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          border: none; border-radius: 999px;
          padding: 4px 14px; cursor: pointer;
          display: flex; align-items: center; gap: 4px;
          white-space: nowrap;
        }
        .bm-learn-cta {
          flex-shrink: 0;
          text-align: center; width: 100%;
          max-width: 360px; padding: 6px 0 0;
        }
        .bm-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, 3vw, 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: 12px 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${accentColor}cc, ${accentColor});
          box-shadow: 0 4px 0 ${accentColor}66, 0 10px 20px -10px ${accentColor}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .bm-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${accentColor}66; }
        .bm-learn-cta-sub {
          font-size: 11px; font-weight: 500; color: #94A3B8;
          margin: 4px 0 0;
        }
        .bm-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: 6px 16px 10px;
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 640px) {
          .bm-learn-topbar { min-height: 36px; padding: 6px 16px; }
          .bm-learn-heading h1 { font-size: 16px; }
          .bm-learn-heading p { display: none; }
          .bm-learn-card { padding: 6px 6px 6px; }
          .bm-learn-letter { font-size: 28px; }
          .bm-learn-lower { font-size: 16px; }
          .bm-learn-card-btn { font-size: 10px; padding: 4px 12px; }
          .bm-learn-cta-btn { padding: 8px 20px; font-size: 14px; }
          .bm-learn-footer { display: none; }
        }
      `}</style>

      <div className="bm-lesson-root">
        <div className="bm-learn-topbar">
          <button className="bm-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
          <span className="bm-learn-title">{topicTitle}</span>
        </div>

        <div className="bm-learn-body">
          <div className="bm-learn-heading">
            <h1>
              {language === 'bm' ? 'Mari Belajar Huruf Vokal 📖' : "Let's Learn Vowels 📖"}
            </h1>
            <p>
              {language === 'bm' ? 'Tekan 🔊 untuk dengar bunyi' : 'Tap 🔊 to hear the sound'}
            </p>
          </div>

          <div className="bm-learn-grid">
            {VOWELS.map((v) => (
              <div key={v.letter} className="bm-learn-card">
                <div className="bm-learn-letter" style={{ color: v.color }}>{v.letter}</div>
                <div className="bm-learn-lower">{v.lower}</div>
                <button
                  className="bm-learn-card-btn"
                  onClick={() => handleListen(v.letter)}
                  aria-label={`Dengar ${v.letter}`}
                >
                  🔊 {language === 'bm' ? 'Dengar' : 'Listen'}
                </button>
              </div>
            ))}
          </div>

          <div className="bm-learn-cta">
            <button className="bm-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
            <p className="bm-learn-cta-sub">
              {language === 'bm' ? '15 soalan tentang huruf vokal' : '15 questions about vowels'}
            </p>
          </div>
        </div>

        <div className="bm-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}
