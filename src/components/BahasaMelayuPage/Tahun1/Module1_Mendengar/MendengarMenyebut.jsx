import React, { useEffect, useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import SpeechManager from '../../../../services/SpeechManager';

const TOPIC_ID = '1-1-1-mendengar-menyebut';
const ACCENT = '#E8821A';

const VOWELS = [
  { letter: 'A', lower: 'a', color: '#EF4444' },
  { letter: 'E', lower: 'e', color: '#F59E0B' },
  { letter: 'I', lower: 'i', color: '#10B981' },
  { letter: 'O', lower: 'o', color: '#3B82F6' },
  { letter: 'U', lower: 'u', color: '#8B5CF6' },
];

function MendengarLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
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
        .mm-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .mm-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; justify-content: center;
          padding: 10px 16px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .mm-learn-back {
          position: absolute; left: 12px;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .mm-learn-back:hover { background: #F1F5F9; }
        .mm-learn-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: 14px; color: #1E293B;
        }
        .mm-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(10px, 2.2vh, 22px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .mm-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-top: 16px;
          margin-bottom: clamp(18px, 5vh, 48px);
        }
        .mm-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 26px);
          color: #1E293B; margin: 0;
        }
        .mm-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #64748B; margin: 4px 0 0;
        }
        .mm-learn-grid {
          --mm-cols: 2;
          --mm-gap: clamp(10px, 2vh, 18px);
          --mm-letter: clamp(20px, min(7.4vw, 5.4vh), 30px);
          --mm-lower: clamp(12px, min(4.2vw, 3.2vh), 18px);
          --mm-btn-font: clamp(9px, min(2.4vw, 1.7vh), 12px);
          --mm-card-pad: clamp(8px, 1.6vh, 12px);
          flex-shrink: 0;
          display: flex; flex-wrap: wrap;
          align-items: stretch; align-content: center; justify-content: center;
          gap: var(--mm-gap);
          width: 100%; max-width: 480px;
        }
        .mm-learn-grid > .mm-learn-card {
          flex: 0 0 calc((100% - (var(--mm-cols) - 1) * var(--mm-gap)) / var(--mm-cols));
          max-width: calc((100% - (var(--mm-cols) - 1) * var(--mm-gap)) / var(--mm-cols));
        }
        @media (min-width: 600px) {
          .mm-learn-grid {
            --mm-cols: 3;
            --mm-letter: clamp(24px, min(6vw, 7vh), 38px);
            --mm-lower: clamp(14px, min(3.4vw, 4vh), 22px);
            --mm-btn-font: clamp(10px, min(2vw, 2vh), 13px);
            max-width: 640px;
          }
        }
        @media (min-width: 1024px) {
          .mm-learn-grid {
            --mm-cols: 5;
            --mm-letter: clamp(28px, min(4.6vw, 9vh), 46px);
            --mm-lower: clamp(16px, min(2.6vw, 5vh), 26px);
            --mm-btn-font: clamp(11px, min(1.6vw, 2.2vh), 14px);
            max-width: 900px;
          }
        }
        .mm-learn-grid-zone {
          flex: 1; min-height: 0; width: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .mm-learn-card {
          background: #fff; border-radius: clamp(12px, 2.4vw, 18px);
          padding: var(--mm-card-pad) clamp(4px, 1.6vw, 8px);
          display: flex; flex-direction: column;
          align-items: center; gap: clamp(2px, .8vh, 6px);
          border: 2px solid ${ACCENT}22;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
        }
        .mm-learn-letter {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: var(--mm-letter);
          line-height: 1; margin: 0;
        }
        .mm-learn-lower {
          font-size: var(--mm-lower);
          opacity: 0.5; line-height: 1;
        }
        .mm-learn-card-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: var(--mm-btn-font);
          color: #fff;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          border: none; border-radius: 999px;
          padding: clamp(3px, .9vh, 5px) clamp(8px, 2.6vw, 14px);
          cursor: pointer;
          display: flex; align-items: center; gap: 4px;
          white-space: nowrap;
        }
        .mm-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(14px, 3vh, 26px);
        }
        .mm-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .mm-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .mm-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .mm-learn-heading p, .mm-learn-footer { display: none; }
        }
      `}</style>

      <div className="mm-learn-root">
        <div className="mm-learn-topbar">
          <button className="mm-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
          <span className="mm-learn-title">{topicTitle}</span>
        </div>

        <div className="mm-learn-body">
          <div className="mm-learn-heading">
            <h1>
              {language === 'bm' ? 'Mari Belajar Huruf Vokal 📖' : "Let's Learn Vowels 📖"}
            </h1>
            <p>
              {language === 'bm' ? 'Tekan 🔊 untuk dengar bunyi' : 'Tap 🔊 to hear the sound'}
            </p>
          </div>

          <div className="mm-learn-grid-zone">
            <div className="mm-learn-grid">
              {VOWELS.map((v) => (
                <div key={v.letter} className="mm-learn-card">
                  <div className="mm-learn-letter" style={{ color: v.color }}>{v.letter}</div>
                  <div className="mm-learn-lower">{v.lower}</div>
                  <button
                    className="mm-learn-card-btn"
                    onClick={() => handleListen(v.letter)}
                    aria-label={`Dengar ${v.letter}`}
                  >
                    🔊 <span className="mm-btn-label">{language === 'bm' ? 'Dengar' : 'Listen'}</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="mm-learn-cta">
              <button className="mm-learn-cta-btn" onClick={onStartQuiz}>
                🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
              </button>
            </div>
          </div>
        </div>

        <div className="mm-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

export default function MendengarMenyebut({ onBack, language = 'bm', topicComplete }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Mendengar dan Menyebut' : 'Listening and Pronouncing';

  const handleBack = () => {
    topicComplete?.(TOPIC_ID);
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <MendengarLearnPage
        onBack={handleBack}
        onStartQuiz={() => setPage('quiz')}
        topicTitle={topicTitle}
        language={language}
      />
    );
  }

  return (
    <BMLessonQuizLayout
      onBack={handleBack}
      topicTitle={topicTitle}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
      onShowLearn={() => setPage('learn')}
    />
  );
}
