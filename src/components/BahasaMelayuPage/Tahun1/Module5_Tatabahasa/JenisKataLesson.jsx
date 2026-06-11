import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '1-5-1-morfologi-kata';
const ACCENT = '#159E96';

const CATEGORIES = [
  {
    title: 'Kata Nama Am',
    titleEn: 'Common Noun',
    desc: 'Nama benda, haiwan, tempat, atau orang secara umum.',
    descEn: 'General name for things, animals, places or people.',
    emoji: '🐱',
    examples: ['kucing', 'sekolah', 'buku', 'meja'],
  },
  {
    title: 'Kata Nama Khas',
    titleEn: 'Proper Noun',
    desc: 'Nama khas untuk orang, haiwan, tempat, atau benda.',
    descEn: 'Specific name for a person, animal, place or thing.',
    emoji: '👦',
    examples: ['Ahmad', 'Malaysia', 'Siti', 'Pulau Pinang'],
  },
  {
    title: 'Kata Kerja',
    titleEn: 'Verb',
    desc: 'Perbuatan atau aktiviti yang dilakukan.',
    descEn: 'Action or activity being performed.',
    emoji: '🏃',
    examples: ['berlari', 'membaca', 'memasak', 'menulis'],
  },
  {
    title: 'Kata Adjektif',
    titleEn: 'Adjective',
    desc: 'Kata yang menerangkan sifat, warna, ukuran, atau bentuk.',
    descEn: 'Word that describes quality, colour, size or shape.',
    emoji: '🌸',
    examples: ['cantik', 'besar', 'merah', 'bulat'],
  },
  {
    title: 'Kata Hubung',
    titleEn: 'Conjunction',
    desc: 'Kata yang menghubungkan perkataan atau ayat.',
    descEn: 'Word that connects words or sentences.',
    emoji: '🔗',
    examples: ['dan', 'atau', 'tetapi'],
  },
  {
    title: 'Kata Sendi Nama',
    titleEn: 'Preposition',
    desc: 'Kata yang digunakan di hadapan kata nama.',
    descEn: 'Word used before a noun to show location or direction.',
    emoji: '📍',
    examples: ['di', 'ke', 'dari', 'daripada'],
  },
  {
    title: 'Kata Tanya',
    titleEn: 'Question Word',
    desc: 'Kata yang digunakan untuk bertanya.',
    descEn: 'Word used to ask questions.',
    emoji: '❓',
    examples: ['apa', 'siapa', 'bila', 'di mana', 'mengapa', 'bagaimana'],
  },
  {
    title: 'Kata Ganti Nama Diri',
    titleEn: 'Personal Pronoun',
    desc: 'Kata yang menggantikan nama orang.',
    descEn: 'Word that replaces a person\'s name.',
    emoji: '👤',
    examples: ['saya', 'kamu', 'dia', 'kami', 'mereka'],
  },
];

function JenisKataLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <>
      <style>{`
        .jk-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #E6F6F4 0%, #C6E9E5 50%, #A5DCD5 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .jk-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .jk-learn-topbar::after { content: ''; flex: 0 1 88px; }
        .jk-learn-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .jk-learn-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .jk-back-label { display: none; }
          .jk-learn-topbar::after { flex-basis: 42px; }
        }
        .jk-learn-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .jk-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(8px, 1.8vh, 18px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .jk-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-bottom: clamp(6px, 1.4vh, 14px);
        }
        .jk-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 26px);
          color: #1E293B; margin: 0;
        }
        .jk-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .jk-cat-list {
          flex: 1; min-height: 0; width: 100%; max-width: 540px;
          display: flex; flex-direction: column;
          gap: clamp(6px, 1vh, 10px);
          overflow-y: auto;
          padding: 2px 4px;
        }
        .jk-cat-card {
          flex-shrink: 0;
          background: #fff; border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(10px, 1.4vh, 14px) clamp(14px, 2vw, 20px);
          border: 2px solid ${ACCENT}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
          cursor: pointer;
          transition: all .2s ease;
        }
        .jk-cat-card:hover { border-color: ${ACCENT}44; }
        .jk-cat-card.expanded { border-color: ${ACCENT}; }
        .jk-cat-header {
          display: flex; align-items: center; gap: 10px;
        }
        .jk-cat-emoji {
          font-size: clamp(24px, 5vw, 32px);
          flex-shrink: 0;
        }
        .jk-cat-info {
          flex: 1; min-width: 0;
        }
        .jk-cat-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, min(3.2vw, 2.6vh), 16px);
          color: #1E293B;
        }
        .jk-cat-desc {
          font-size: clamp(10px, min(2.4vw, 1.8vh), 12px);
          font-weight: 500; color: #64748B;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .jk-cat-toggle {
          flex-shrink: 0;
          font-size: 16px; color: ${ACCENT};
          transition: transform .2s ease;
        }
        .jk-cat-toggle.open { transform: rotate(180deg); }
        .jk-cat-content {
          overflow: hidden;
          max-height: 0;
          transition: max-height .3s ease;
        }
        .jk-cat-content.open { max-height: 200px; }
        .jk-cat-examples {
          margin-top: 10px;
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .jk-cat-example-chip {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 15px);
          padding: clamp(4px, .7vh, 6px) clamp(10px, 2vw, 14px);
          border-radius: 999px;
          background: ${ACCENT}14;
          color: ${ACCENT};
        }
        .jk-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(6px, 1.2vh, 12px);
        }
        .jk-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .jk-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .jk-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .jk-learn-heading p, .jk-learn-footer { display: none; }
        }
      `}</style>

      <div className="jk-learn-root">
        <div className="jk-learn-topbar">
          <button className="jk-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="jk-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="jk-learn-title">{topicTitle}</span>
        </div>

        <div className="jk-learn-body">
          <div className="jk-learn-heading">
            <h1>
              {language === 'bm' ? 'Mari Kenal Golongan Kata 📚' : 'Let\'s Learn Word Classes 📚'}
            </h1>
            <p>
              {language === 'bm'
                ? 'Tekan pada kategori untuk lihat contoh perkataan'
                : 'Tap a category to see example words'}
            </p>
          </div>

          <div className="jk-cat-list">
            {CATEGORIES.map((cat, i) => (
              <div key={i}
                className={`jk-cat-card${expandedIdx === i ? ' expanded' : ''}`}
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              >
                <div className="jk-cat-header">
                  <span className="jk-cat-emoji">{cat.emoji}</span>
                  <div className="jk-cat-info">
                    <div className="jk-cat-title">{language === 'bm' ? cat.title : cat.titleEn}</div>
                    <div className="jk-cat-desc">{language === 'bm' ? cat.desc : cat.descEn}</div>
                  </div>
                  <span className={`jk-cat-toggle${expandedIdx === i ? ' open' : ''}`}>▼</span>
                </div>
                <div className={`jk-cat-content${expandedIdx === i ? ' open' : ''}`}>
                  <div className="jk-cat-examples">
                    {cat.examples.map((ex, j) => (
                      <span key={j} className="jk-cat-example-chip">{ex}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="jk-learn-cta">
            <button className="jk-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>

        <div className="jk-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

export default function JenisKataLesson({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Golongan Kata' : 'Word Classes';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <JenisKataLearnPage
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
