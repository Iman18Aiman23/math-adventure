import React, { useEffect, useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import SpeechManager from '../../../../services/SpeechManager';

const TOPIC_ID = '2-3-1-menulis-mekanis';
const ACCENT = '#7A4FD0';

const CATEGORIES = [
  {
    title: 'Perkataan KV+KV',
    desc: 'Dua suku kata terbuka',
    words: ['bapa', 'ibu', 'kakak', 'meja', 'kerusi', 'saya'],
  },
  {
    title: 'Perkataan KV+KVK',
    desc: 'Suku kata terbuka + tertutup',
    words: ['buku', 'pensel', 'beg', 'botol', 'gambar', 'makan'],
  },
  {
    title: 'Perkataan Dengan Digraf',
    desc: 'Mengandungi ng, ny, kh',
    words: ['bangku', 'banyak', 'langit', 'pinggan', 'khas', 'akhir'],
  },
  {
    title: 'Frasa Biasa',
    desc: 'Gabungan dua perkataan',
    words: ['baju biru', 'makan nasi', 'buku baru', 'rumah besar', 'bola merah'],
  },
  {
    title: 'Ayat Tunggal',
    desc: 'Satu ayat lengkap',
    words: [
      'Saya membaca buku.',
      'Emak memasak nasi.',
      'Ayah pergi kerja.',
      'Kakak menulis surat.',
    ],
  },
];

function MenulisLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [playingWord, setPlayingWord] = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handleListen = (word) => {
    SpeechManager.stopSpeaking();
    setPlayingWord(word);
    SpeechManager.speak(word, 'ms-MY', { rate: 0.65, pitch: 1.1 });
  };

  return (
    <>
      <style>{`
        .mmk2-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .mmk2-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .mmk2-learn-topbar::after { content: ''; flex: 0 1 88px; }
        .mmk2-learn-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .mmk2-learn-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .mmk2-back-label { display: none; }
          .mmk2-learn-topbar::after { flex-basis: 42px; }
        }
        .mmk2-learn-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .mmk2-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(6px, 1.6vh, 16px) 16px clamp(4px, 1.2vh, 12px);
          overflow: hidden;
        }
        .mmk2-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-bottom: clamp(8px, 2vh, 18px);
        }
        .mmk2-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, min(4.4vw, 4.2vh), 24px);
          color: #1E293B; margin: 0;
        }
        .mmk2-learn-heading p {
          font-size: clamp(10px, min(2.6vw, 1.8vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .mmk2-cats-scroll {
          flex: 1; min-height: 0; width: 100%; max-width: 560px;
          overflow-y: auto;
          padding: 2px 4px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.4vh, 14px);
        }
        .mmk2-cat-card {
          flex-shrink: 0;
          background: #fff;
          border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(10px, 1.4vh, 16px) clamp(12px, 1.8vw, 18px);
          border: 2px solid ${ACCENT}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
        }
        .mmk2-cat-header {
          display: flex; align-items: baseline; gap: 8px;
          margin-bottom: 8px;
        }
        .mmk2-cat-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, min(3.2vw, 2.8vh), 17px);
          color: ${ACCENT};
        }
        .mmk2-cat-desc {
          font-size: clamp(9px, min(2vw, 1.4vh), 11px);
          color: #94A3B8; font-weight: 500;
        }
        .mmk2-word-grid {
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .mmk2-word-item {
          display: flex; align-items: center; gap: 4px;
          font-family: 'Fredoka', sans-serif; font-weight: 600;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 16px);
          color: #334155;
          background: #F1F5F9;
          border-radius: 10px;
          padding: 4px 12px 4px 14px;
          cursor: pointer;
          transition: all .15s ease;
          border: 1.5px solid transparent;
          letter-spacing: .3px;
        }
        .mmk2-word-item:hover { background: #EDE9FE; border-color: ${ACCENT}44; }
        .mmk2-word-item.playing { background: #DCFCE7; border-color: #16A34A; }
        .mmk2-word-item .mmk2-icon {
          flex-shrink: 0;
          font-size: clamp(10px, 2.2vw, 12px);
        }
        .mmk2-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(6px, 1.4vh, 14px);
        }
        .mmk2-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .mmk2-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .mmk2-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .mmk2-learn-heading p, .mmk2-learn-footer { display: none; }
        }
      `}</style>

      <div className="mmk2-learn-root">
        <div className="mmk2-learn-topbar">
          <button className="mmk2-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="mmk2-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="mmk2-learn-title">{topicTitle}</span>
        </div>

        <div className="mmk2-learn-body">
          <div className="mmk2-learn-heading">
            <h1>
              {language === 'bm' ? 'Menulis Secara Mekanis ✍️' : 'Mechanical Writing ✍️'}
            </h1>
            <p>
              {language === 'bm'
                ? 'Lihat contoh perkataan dan ayat yang ditulis dengan betul. Ketuk untuk dengar.'
                : 'See examples of correctly written words and sentences. Tap to listen.'}
            </p>
          </div>

          <div className="mmk2-cats-scroll">
            {CATEGORIES.map((cat, ci) => (
              <div key={ci} className="mmk2-cat-card">
                <div className="mmk2-cat-header">
                  <span className="mmk2-cat-title">{cat.title}</span>
                  <span className="mmk2-cat-desc">{cat.desc}</span>
                </div>
                <div className="mmk2-word-grid">
                  {cat.words.map((w, wi) => (
                    <div key={wi}
                      className={`mmk2-word-item${playingWord === w ? ' playing' : ''}`}
                      onClick={() => handleListen(w)}
                    >
                      {w}
                      <span className="mmk2-icon">
                        {playingWord === w ? '🔊' : '🔈'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mmk2-learn-cta">
            <button className="mmk2-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>

        <div className="mmk2-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

export default function MenulisMekanis({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Menulis secara Mekanis' : 'Mechanical Writing';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <MenulisLearnPage
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
