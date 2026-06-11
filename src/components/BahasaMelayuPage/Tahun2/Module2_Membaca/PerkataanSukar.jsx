import React, { useEffect, useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import SpeechManager from '../../../../services/SpeechManager';

const TOPIC_ID = '2-2-1-perkataan-sukar';
const ACCENT = '#1E7AC9';

const GROUPS = [
  {
    title: 'Digraf ng',
    desc: 'Bunyi "ng" pada akhir suku kata',
    examples: [
      { word: 'nganga', hint: 'nga-nga' },
      { word: 'bangku', hint: 'bang-ku' },
      { word: 'tongkat', hint: 'tong-kat' },
      { word: 'bungkus', hint: 'bung-kus' },
      { word: 'langit', hint: 'la-ngit' },
      { word: 'pinggan', hint: 'ping-gan' },
    ],
  },
  {
    title: 'Digraf ny',
    desc: 'Bunyi "ny" seperti dalam "nyanyi"',
    examples: [
      { word: 'nyanyi', hint: 'nya-nyi' },
      { word: 'banyak', hint: 'ba-nyak' },
      { word: 'punya', hint: 'pu-nya' },
      { word: 'menyapu', hint: 'me-nya-pu' },
      { word: 'sunyi', hint: 'su-nyi' },
    ],
  },
  {
    title: 'Digraf kh',
    desc: 'Bunyi "kh" seperti dalam "khas"',
    examples: [
      { word: 'khas', hint: 'khas' },
      { word: 'akhir', hint: 'a-khir' },
      { word: 'khabar', hint: 'kha-bar' },
      { word: 'ikhlas', hint: 'ikh-las' },
    ],
  },
  {
    title: 'Digraf sy',
    desc: 'Bunyi "sy" seperti dalam "syukur"',
    examples: [
      { word: 'syukur', hint: 'syu-kur' },
      { word: 'syarat', hint: 'sya-rat' },
      { word: 'musyawarah', hint: 'mu-sya-wa-rah' },
      { word: 'syarikat', hint: 'sya-ri-kat' },
    ],
  },
  {
    title: 'Diftong ai',
    desc: 'Gabungan "a" dan "i" — bunyi meluncur',
    examples: [
      { word: 'sungai', hint: 'su-ngai' },
      { word: 'pantai', hint: 'pan-tai' },
      { word: 'ramai', hint: 'ra-mai' },
      { word: 'kedai', hint: 'ke-dai' },
    ],
  },
  {
    title: 'Diftong au',
    desc: 'Gabungan "a" dan "u"',
    examples: [
      { word: 'pulau', hint: 'pu-lau' },
      { word: 'harimau', hint: 'ha-ri-mau' },
      { word: 'kerbau', hint: 'ker-bau' },
      { word: 'danau', hint: 'da-nau' },
    ],
  },
  {
    title: 'Diftong oi',
    desc: 'Gabungan "o" dan "i"',
    examples: [
      { word: 'baloi', hint: 'ba-loi' },
      { word: 'sekoi', hint: 'se-koi' },
      { word: 'amboi', hint: 'am-boi' },
    ],
  },
];

function PerkataanLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
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
        .psk-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #EBF5FF 0%, #D5E9FA 50%, #B7D9F5 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .psk-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .psk-learn-topbar::after { content: ''; flex: 0 1 88px; }
        .psk-learn-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .psk-learn-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .psk-back-label { display: none; }
          .psk-learn-topbar::after { flex-basis: 42px; }
        }
        .psk-learn-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .psk-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(6px, 1.6vh, 16px) 16px clamp(4px, 1.2vh, 12px);
          overflow: hidden;
        }
        .psk-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-bottom: clamp(8px, 2vh, 18px);
        }
        .psk-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, min(4.4vw, 4.2vh), 24px);
          color: #1E293B; margin: 0;
        }
        .psk-learn-heading p {
          font-size: clamp(10px, min(2.6vw, 1.8vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .psk-groups-scroll {
          flex: 1; min-height: 0; width: 100%; max-width: 560px;
          overflow-y: auto;
          padding: 2px 4px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.4vh, 14px);
        }
        .psk-group-card {
          flex-shrink: 0;
          background: #fff;
          border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(10px, 1.4vh, 16px) clamp(12px, 1.8vw, 18px);
          border: 2px solid ${ACCENT}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
        }
        .psk-group-header {
          display: flex; align-items: baseline; gap: 8px;
          margin-bottom: 8px;
        }
        .psk-group-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, min(3.2vw, 2.8vh), 17px);
          color: ${ACCENT};
        }
        .psk-group-desc {
          font-size: clamp(9px, min(2vw, 1.4vh), 11px);
          color: #94A3B8; font-weight: 500;
        }
        .psk-word-chips {
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .psk-word-chip {
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 15px);
          color: #334155;
          background: #F1F5F9;
          border-radius: 999px;
          padding: 3px 10px 3px 14px;
          cursor: pointer;
          transition: all .15s ease;
          border: 1.5px solid transparent;
        }
        .psk-word-chip:hover { background: #DBEAFE; border-color: ${ACCENT}44; }
        .psk-word-chip.playing { background: #DCFCE7; border-color: #16A34A; }
        .psk-word-chip .psk-chip-icon {
          flex-shrink: 0;
          font-size: clamp(10px, 2.4vw, 13px);
        }
        .psk-word-hint {
          font-size: clamp(8px, 1.6vw, 10px);
          color: #94A3B8; font-weight: 500;
          margin-left: 2px;
        }
        .psk-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(6px, 1.4vh, 14px);
        }
        .psk-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .psk-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .psk-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .psk-learn-heading p, .psk-learn-footer { display: none; }
        }
      `}</style>

      <div className="psk-learn-root">
        <div className="psk-learn-topbar">
          <button className="psk-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="psk-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="psk-learn-title">{topicTitle}</span>
        </div>

        <div className="psk-learn-body">
          <div className="psk-learn-heading">
            <h1>
              {language === 'bm' ? 'Belajar Perkataan Sukar 📖' : 'Learn Difficult Words 📖'}
            </h1>
            <p>
              {language === 'bm'
                ? 'Ketuk perkataan untuk dengar bunyi digraf dan diftong'
                : 'Tap words to hear digraph and diphthong sounds'}
            </p>
          </div>

          <div className="psk-groups-scroll">
            {GROUPS.map((g, gi) => (
              <div key={gi} className="psk-group-card">
                <div className="psk-group-header">
                  <span className="psk-group-title">{g.title}</span>
                  <span className="psk-group-desc">{g.desc}</span>
                </div>
                <div className="psk-word-chips">
                  {g.examples.map((ex, ei) => (
                    <div key={ei}
                      className={`psk-word-chip${playingWord === ex.word ? ' playing' : ''}`}
                      onClick={() => handleListen(ex.word)}
                    >
                      {ex.word}
                      <span className="psk-chip-icon">
                        {playingWord === ex.word ? '🔊' : '🔈'}
                      </span>
                      <span className="psk-word-hint">{ex.hint}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="psk-learn-cta">
            <button className="psk-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>

        <div className="psk-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

export default function PerkataanSukar({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Perkataan Sukar (Digraf & Diftong)' : 'Difficult Words (Digraphs & Diphthongs)';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <PerkataanLearnPage
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
