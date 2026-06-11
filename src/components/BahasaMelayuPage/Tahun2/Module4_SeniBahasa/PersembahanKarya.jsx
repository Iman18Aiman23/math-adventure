import React, { useEffect, useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';
import SpeechManager from '../../../../services/SpeechManager';

const TOPIC_ID = '2-4-2-persembahan-karya';
const ACCENT = '#E8568A';

const SONGS = [
  {
    title: 'Bangun Pagi',
    lines: [
      'Bangun pagi, gosok gigi',
      'Basuh muka, pakai baju',
      'Sarapan pagi, jangan lupa',
      'Barulah kita pergi ke sekolah',
    ],
  },
  {
    title: 'Sayang Keluarga',
    lines: [
      'Ayah, emak, sayang saya',
      'Kakak, abang, mesra selalu',
      'Kita semua satu keluarga',
      'Hidup bahagia, penuh cinta',
    ],
  },
  {
    title: 'Kawan Baik',
    lines: [
      'Kawan baik, kawan setia',
      'Bersama kita bermain gembira',
      'Tolong-menolong setiap masa',
      'Itulah dia sahabat bersama',
    ],
  },
];

function PersembahanLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [playingSong, setPlayingSong] = useState(null);
  const [playingLine, setPlayingLine] = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handlePlayLine = (songIdx, line) => {
    SpeechManager.stopSpeaking();
    setPlayingSong(songIdx);
    setPlayingLine(line);
    SpeechManager.speak(line, 'ms-MY', { rate: 0.75, pitch: 1.3 });
  };

  return (
    <>
      <style>{`
        .pk-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #FCDCEA 0%, #F39BC0 50%, #E8568A 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .pk-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .pk-learn-topbar::after { content: ''; flex: 0 1 88px; }
        .pk-learn-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .pk-learn-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .pk-back-label { display: none; }
          .pk-learn-topbar::after { flex-basis: 42px; }
        }
        .pk-learn-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .pk-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(6px, 1.6vh, 16px) 16px clamp(4px, 1.2vh, 12px);
          overflow: hidden;
        }
        .pk-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-bottom: clamp(8px, 2vh, 18px);
        }
        .pk-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, min(4.4vw, 4.2vh), 24px);
          color: #1E293B; margin: 0;
        }
        .pk-learn-heading p {
          font-size: clamp(10px, min(2.6vw, 1.8vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .pk-songs-scroll {
          flex: 1; min-height: 0; width: 100%; max-width: 540px;
          overflow-y: auto;
          padding: 2px 4px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.4vh, 14px);
        }
        .pk-song-card {
          flex-shrink: 0;
          background: #fff;
          border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(12px, 1.6vh, 18px) clamp(14px, 2vw, 20px);
          border: 2px solid ${ACCENT}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
        }
        .pk-song-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.4vw, 3vh), 18px);
          color: ${ACCENT};
          margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .pk-line-row {
          display: flex; align-items: center; gap: 8px;
          padding: 4px 0;
          border-bottom: 1px solid #F1F5F9;
        }
        .pk-line-row:last-child { border-bottom: none; }
        .pk-line-text {
          flex: 1;
          font-family: 'Baloo 2', sans-serif; font-weight: 600;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 15px);
          color: #334155;
        }
        .pk-line-btn {
          flex-shrink: 0;
          font-size: 16px;
          background: none; border: none; cursor: pointer;
          padding: 4px 8px;
          border-radius: 8px;
          transition: background .15s;
        }
        .pk-line-btn:hover { background: #FCE7F3; }
        .pk-line-btn.playing { background: #DCFCE7; }
        .pk-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(6px, 1.4vh, 14px);
        }
        .pk-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px; color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .pk-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .pk-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .pk-learn-heading p, .pk-learn-footer { display: none; }
        }
      `}</style>

      <div className="pk-learn-root">
        <div className="pk-learn-topbar">
          <button className="pk-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="pk-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="pk-learn-title">{topicTitle}</span>
        </div>

        <div className="pk-learn-body">
          <div className="pk-learn-heading">
            <h1>
              {language === 'bm' ? 'Persembahan Karya 🎤' : 'Performance Arts 🎤'}
            </h1>
            <p>
              {language === 'bm'
                ? 'Baca dan lafazkan lagu kanak-kanak dengan intonasi yang betul'
                : 'Read and recite children songs with correct intonation'}
            </p>
          </div>

          <div className="pk-songs-scroll">
            {SONGS.map((song, si) => (
              <div key={si} className="pk-song-card">
                <div className="pk-song-title">
                  🎵 {song.title}
                </div>
                {song.lines.map((line, li) => (
                  <div key={li} className="pk-line-row">
                    <span className="pk-line-text">{line}</span>
                    <button
                      className={`pk-line-btn${playingSong === si && playingLine === line ? ' playing' : ''}`}
                      onClick={() => handlePlayLine(si, line)}
                    >
                      {playingSong === si && playingLine === line ? '🔊' : '🔈'}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="pk-learn-cta">
            <button className="pk-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>

        <div className="pk-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

export default function PersembahanKarya({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Persembahan Karya' : 'Performance Arts';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <PersembahanLearnPage
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
