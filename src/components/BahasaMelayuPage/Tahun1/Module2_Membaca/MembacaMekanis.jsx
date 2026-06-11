import React, { useEffect, useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMHeader from '../../_shared/BMHeader';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import SpeechManager from '../../../../services/SpeechManager';

const TOPIC_ID = '1-2-2-membaca-mekanis';
const ACCENT = '#1E7AC9';

const SENTENCES = [
  { text: 'Saya suka bola.', hint: 'Sa-ya su-ka bo-la' },
  { text: 'Emak pergi pasar.', hint: 'E-mak per-gi pa-sar' },
  { text: 'Adik tidur nyenyak.', hint: 'A-dik ti-dur nye-nyak' },
  { text: 'Ayah membaca surat khabar.', hint: 'A-yah mem-ba-ca su-rat kha-bar' },
  { text: 'Kakak dan abang pergi ke sekolah.', hint: 'Ka-kak dan a-bang per-gi ke se-ko-lah' },
];

function MembacaLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [playingIdx, setPlayingIdx] = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handleListen = (sentence, idx) => {
    SpeechManager.stopSpeaking();
    setPlayingIdx(idx);
    SpeechManager.speak(sentence, 'ms-MY', { rate: 0.7, pitch: 1.2 });
  };

  return (
    <>
      <style>{`
        .mmk-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #EBF5FF 0%, #D5E9FA 50%, #B7D9F5 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }

        .mmk-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(10px, 2.2vh, 22px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .mmk-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-top: 12px;
          margin-bottom: clamp(14px, 4vh, 36px);
        }
        .mmk-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 26px);
          color: #1E293B; margin: 0;
        }
        .mmk-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .mmk-learn-list {
          flex: 1; min-height: 0; width: 100%; max-width: 520px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.6vh, 14px);
          overflow-y: auto;
          padding: 2px 4px;
        }
        .mmk-learn-card {
          flex-shrink: 0;
          background: #fff; border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(12px, 1.8vh, 18px) clamp(14px, 2vw, 20px);
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px;
          border: 2px solid ${ACCENT}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
        }
        .mmk-card-text {
          display: flex; flex-direction: column; gap: 2px;
          flex: 1; min-width: 0;
        }
        .mmk-card-sentence {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(15px, min(3.6vw, 3.2vh), 20px);
          color: #1E293B; line-height: 1.3;
        }
        .mmk-card-hint {
          font-size: clamp(10px, min(2.2vw, 1.6vh), 12px);
          color: #94A3B8; font-weight: 500;
        }
        .mmk-card-btn {
          flex-shrink: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(11px, min(2.4vw, 1.8vh), 13px);
          color: #fff;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          border: none; border-radius: 999px;
          padding: clamp(5px, 1vh, 7px) clamp(12px, 2.6vw, 18px);
          cursor: pointer;
          display: flex; align-items: center; gap: 4px;
          white-space: nowrap;
          min-height: 34px;
        }
        .mmk-card-btn.playing {
          background: linear-gradient(180deg, #16A34A, #15803D);
        }
        .mmk-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(10px, 2vh, 20px);
        }
        .mmk-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .mmk-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .mmk-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .mmk-learn-heading p, .mmk-learn-footer { display: none; }
        }
      `}</style>

      <div className="mmk-learn-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="mmk-learn-body">
          <div className="mmk-learn-heading">
            <h1>
              {language === 'bm' ? 'Mari Membaca Ayat 📖' : "Let's Read Sentences 📖"}
            </h1>
            <p>
              {language === 'bm' ? 'Tekan 🔊 untuk dengar sebutan yang betul' : 'Tap 🔊 to hear correct pronunciation'}
            </p>
          </div>

          <div className="mmk-learn-list">
            {SENTENCES.map((s, i) => (
              <div key={i} className="mmk-learn-card">
                <div className="mmk-card-text">
                  <span className="mmk-card-sentence">{s.text}</span>
                  <span className="mmk-card-hint">{s.hint}</span>
                </div>
                <button
                  className={`mmk-card-btn${playingIdx === i ? ' playing' : ''}`}
                  onClick={() => handleListen(s.text, i)}
                  aria-label={`Dengar ${s.text}`}
                >
                  {playingIdx === i ? '🔊' : '🔈'} {language === 'bm' ? 'Dengar' : 'Listen'}
                </button>
              </div>
            ))}
          </div>

          <div className="mmk-learn-cta">
            <button className="mmk-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>

        <div className="mmk-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

export default function MembacaMekanis({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Membaca secara Mekanis' : 'Mechanical Reading';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <MembacaLearnPage
        onBack={handleBack}
        onStartQuiz={() => setPage('quiz')}
        topicTitle={topicTitle}
        language={language}
      />
    );
  }

  return (
    <BMLessonQuizLayout
      onBack={handleBack} topicId={TOPIC_ID} topicComplete={topicComplete} onNextTopic={onNextTopic}
      topicTitle={topicTitle}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
      onShowLearn={() => setPage('learn')}
    />
  );
}
