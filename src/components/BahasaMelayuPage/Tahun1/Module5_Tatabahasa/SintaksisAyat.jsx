import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '1-5-2-sintaksis-ayat';
const ACCENT = '#159E96';

// KSSR T1 Topik 5.2: Memahami dan membina ayat tunggal serta ayat penyata asas.
// Ayat tunggal = satu subjek + satu predikat.
const EXAMPLES = [
  {
    sentence: 'Adik bermain bola.',
    subjek: 'Adik',
    predikat: 'bermain bola',
    emoji: '⚽',
  },
  {
    sentence: 'Ibu memasak nasi.',
    subjek: 'Ibu',
    predikat: 'memasak nasi',
    emoji: '🍚',
  },
  {
    sentence: 'Kucing itu comel.',
    subjek: 'Kucing itu',
    predikat: 'comel',
    emoji: '🐱',
  },
  {
    sentence: 'Ayah membaca surat khabar.',
    subjek: 'Ayah',
    predikat: 'membaca surat khabar',
    emoji: '📰',
  },
  {
    sentence: 'Murid-murid belajar di kelas.',
    subjek: 'Murid-murid',
    predikat: 'belajar di kelas',
    emoji: '🏫',
  },
];

function SintaksisLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <>
      <style>{`
        .sx-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #E6F6F4 0%, #C6E9E5 50%, #A5DCD5 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .sx-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .sx-learn-topbar::after { content: ''; flex: 0 1 88px; }
        .sx-learn-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .sx-learn-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .sx-back-label { display: none; }
          .sx-learn-topbar::after { flex-basis: 42px; }
        }
        .sx-learn-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .sx-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(10px, 2.2vh, 22px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .sx-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-top: 8px;
          margin-bottom: clamp(8px, 2vh, 18px);
        }
        .sx-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 26px);
          color: #1E293B; margin: 0;
        }
        .sx-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .sx-rule-card {
          flex-shrink: 0; width: 100%; max-width: 540px;
          background: #fff; border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(10px, 1.6vh, 14px) clamp(14px, 2vw, 20px);
          border: 2px solid ${ACCENT}33;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
          margin-bottom: clamp(8px, 1.4vh, 12px);
          text-align: center;
        }
        .sx-rule-formula {
          display: flex; align-items: center; justify-content: center;
          gap: clamp(6px, 1.6vw, 10px);
          flex-wrap: wrap;
        }
        .sx-rule-chip {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, min(3vw, 2.6vh), 16px);
          padding: clamp(4px, .9vh, 7px) clamp(10px, 2.4vw, 16px);
          border-radius: 999px;
        }
        .sx-rule-chip.subjek { background: #DBEAFE; color: #1D4ED8; }
        .sx-rule-chip.predikat { background: #FEF3C7; color: #B45309; }
        .sx-rule-plus {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 3vw, 18px); color: #64748B;
        }
        .sx-rule-note {
          margin-top: 6px;
          font-size: clamp(10px, min(2.6vw, 1.9vh), 13px);
          font-weight: 500; color: #64748B;
        }
        .sx-learn-list {
          flex: 1; min-height: 0; width: 100%; max-width: 540px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.4vh, 12px);
          overflow-y: auto;
          padding: 2px 4px;
        }
        .sx-sentence-card {
          flex-shrink: 0;
          background: #fff; border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(12px, 1.6vh, 16px) clamp(14px, 2vw, 20px);
          border: 2px solid ${ACCENT}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
          cursor: pointer;
          transition: all .2s ease;
        }
        .sx-sentence-card:hover { border-color: ${ACCENT}44; }
        .sx-sentence-card.expanded { border-color: ${ACCENT}; }
        .sx-sentence-header {
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px;
        }
        .sx-sentence-text {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.4vw, 3vh), 18px);
          color: #1E293B;
        }
        .sx-sentence-toggle {
          flex-shrink: 0;
          font-size: 18px; color: ${ACCENT};
          transition: transform .2s ease;
        }
        .sx-sentence-toggle.open { transform: rotate(180deg); }
        .sx-sentence-content {
          overflow: hidden;
          max-height: 0;
          transition: max-height .3s ease;
        }
        .sx-sentence-content.open { max-height: 300px; }
        .sx-split-row {
          margin-top: 12px;
          display: flex; gap: clamp(8px, 1.6vw, 12px);
          flex-wrap: wrap;
        }
        .sx-split-box {
          flex: 1; min-width: 130px;
          padding: clamp(8px, 1.4vh, 12px);
          border-radius: 12px;
        }
        .sx-split-box.subjek { background: #EFF6FF; border-left: 4px solid #3B82F6; }
        .sx-split-box.predikat { background: #FFFBEB; border-left: 4px solid #F59E0B; }
        .sx-split-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(9px, 2.2vw, 12px);
          margin-bottom: 4px;
        }
        .sx-split-box.subjek .sx-split-label { color: #1D4ED8; }
        .sx-split-box.predikat .sx-split-label { color: #B45309; }
        .sx-split-value {
          font-size: clamp(12px, min(3vw, 2.4vh), 15px);
          font-weight: 700; color: #334155;
        }
        .sx-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(8px, 1.6vh, 16px);
        }
        .sx-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .sx-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .sx-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .sx-learn-heading p, .sx-learn-footer, .sx-rule-note { display: none; }
        }
      `}</style>

      <div className="sx-learn-root">
        <div className="sx-learn-topbar">
          <button className="sx-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="sx-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="sx-learn-title">{topicTitle}</span>
        </div>

        <div className="sx-learn-body">
          <div className="sx-learn-heading">
            <h1>
              {language === 'bm' ? 'Mari Kenal Ayat Tunggal 🧩' : "Let's Learn Simple Sentences 🧩"}
            </h1>
            <p>
              {language === 'bm'
                ? 'Tekan pada ayat untuk lihat subjek dan predikat'
                : 'Tap a sentence to see the subject and predicate'}
            </p>
          </div>

          <div className="sx-rule-card">
            <div className="sx-rule-formula">
              <span className="sx-rule-chip subjek">{language === 'bm' ? 'SUBJEK' : 'SUBJECT'}</span>
              <span className="sx-rule-plus">+</span>
              <span className="sx-rule-chip predikat">{language === 'bm' ? 'PREDIKAT' : 'PREDICATE'}</span>
              <span className="sx-rule-plus">=</span>
              <span className="sx-sentence-text">{language === 'bm' ? 'Ayat Tunggal' : 'Simple Sentence'}</span>
            </div>
            <div className="sx-rule-note">
              {language === 'bm'
                ? 'Ayat penyata ialah ayat yang menyatakan sesuatu dan diakhiri dengan noktah (.)'
                : 'A statement sentence states something and ends with a full stop (.)'}
            </div>
          </div>

          <div className="sx-learn-list">
            {EXAMPLES.map((ex, i) => (
              <div key={i}
                className={`sx-sentence-card${expandedIdx === i ? ' expanded' : ''}`}
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              >
                <div className="sx-sentence-header">
                  <span className="sx-sentence-text">{ex.emoji} {ex.sentence}</span>
                  <span className={`sx-sentence-toggle${expandedIdx === i ? ' open' : ''}`}>
                    ▼
                  </span>
                </div>
                <div className={`sx-sentence-content${expandedIdx === i ? ' open' : ''}`}>
                  <div className="sx-split-row">
                    <div className="sx-split-box subjek">
                      <div className="sx-split-label">{language === 'bm' ? 'SUBJEK (siapa/apa)' : 'SUBJECT (who/what)'}</div>
                      <div className="sx-split-value">{ex.subjek}</div>
                    </div>
                    <div className="sx-split-box predikat">
                      <div className="sx-split-label">{language === 'bm' ? 'PREDIKAT (buat apa/bagaimana)' : 'PREDICATE (does what/how)'}</div>
                      <div className="sx-split-value">{ex.predikat}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="sx-learn-cta">
            <button className="sx-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>

        <div className="sx-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

export default function SintaksisAyat({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Sintaksis (Ayat Tunggal)' : 'Syntax (Simple Sentences)';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <SintaksisLearnPage
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
