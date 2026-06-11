import React, { useState } from 'react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '2-5-3-sintaksis-ayat-majmuk';
const ACCENT = '#159E96';

const CONJUNCTIONS = [
  {
    title: 'Kata Hubung "dan"',
    desc: 'Menggabungkan dua ayat yang sama penting',
    example: 'Ali suka bola. + Abu suka bola. = Ali dan Abu suka bola.',
    usage: 'Ayat 1 + dan + Ayat 2',
  },
  {
    title: 'Kata Hubung "sambil"',
    desc: 'Dua perbuatan yang berlaku serentak',
    example: 'Emak memasak. + Emak mendengar radio. = Emak memasak sambil mendengar radio.',
    usage: 'Ayat 1 + sambil + Ayat 2',
  },
  {
    title: 'Kata Hubung "kerana"',
    desc: 'Menunjukkan sebab atau alasan',
    example: 'Amin tidak hadir. + Amin demam. = Amin tidak hadir kerana demam.',
    usage: 'Sebab + kerana + akibat / Ayat 2 + kerana + Ayat 1',
  },
  {
    title: 'Kata Hubung "lalu"',
    desc: 'Dua perbuatan yang berlaku berturut-turut',
    example: 'Dia bangun. + Dia mandi. = Dia bangun lalu mandi.',
    usage: 'Perbuatan 1 + lalu + Perbuatan 2',
  },
  {
    title: 'Kata Hubung "serta"',
    desc: 'Menggabungkan ayat yang sama taraf (formal)',
    example: 'Murid membaca. + Murid menulis. = Murid membaca serta menulis.',
    usage: 'Ayat 1 + serta + Ayat 2',
  },
];

function AyatMajmukLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <>
      <style>{`
        .am-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #E6F6F4 0%, #C6E9E5 50%, #A0DBD4 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .am-learn-topbar {
          flex-shrink: 0; position: relative;
          display: flex; align-items: center; gap: 4px;
          padding: 10px 12px; min-height: 44px;
          background: rgba(255,255,255,.88);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,.06);
        }
        .am-learn-topbar::after { content: ''; flex: 0 1 88px; }
        .am-learn-back {
          flex-shrink: 0;
          display: flex; align-items: center; gap: 4px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: #64748B;
          background: none; border: none; cursor: pointer; padding: 6px 10px;
          border-radius: 10px;
        }
        .am-learn-back:hover { background: #F1F5F9; }
        @media (max-width: 480px) {
          .am-back-label { display: none; }
          .am-learn-topbar::after { flex-basis: 42px; }
        }
        .am-learn-title {
          flex: 1; min-width: 0;
          text-align: center;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 3.4vw, 14px); color: #1E293B;
        }
        .am-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(6px, 1.6vh, 16px) 16px clamp(4px, 1.2vh, 12px);
          overflow: hidden;
        }
        .am-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-bottom: clamp(8px, 2vh, 18px);
        }
        .am-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, min(4.4vw, 4.2vh), 24px);
          color: #1E293B; margin: 0;
        }
        .am-learn-heading p {
          font-size: clamp(10px, min(2.6vw, 1.8vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .am-cards-scroll {
          flex: 1; min-height: 0; width: 100%; max-width: 540px;
          overflow-y: auto;
          padding: 2px 4px;
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.4vh, 14px);
        }
        .am-card {
          flex-shrink: 0;
          background: #fff;
          border-radius: clamp(14px, 2.4vw, 18px);
          padding: clamp(10px, 1.4vh, 16px) clamp(12px, 1.8vw, 18px);
          border: 2px solid ${ACCENT}18;
          box-shadow: 0 4px 12px -6px rgba(0,0,0,.06);
          cursor: pointer;
          transition: all .2s ease;
        }
        .am-card:hover { border-color: ${ACCENT}44; }
        .am-card.expanded { border-color: ${ACCENT}; }
        .am-card-header {
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
        }
        .am-card-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(13px, min(3.2vw, 2.8vh), 17px);
          color: ${ACCENT};
        }
        .am-card-toggle {
          flex-shrink: 0; font-size: 16px; color: ${ACCENT};
          transition: transform .2s ease;
        }
        .am-card-toggle.open { transform: rotate(180deg); }
        .am-card-content {
          overflow: hidden; max-height: 0; transition: max-height .3s ease;
        }
        .am-card-content.open { max-height: 400px; }
        .am-card-desc {
          margin-top: 8px;
          font-size: clamp(10px, min(2.4vw, 1.8vh), 13px);
          color: #64748B; font-weight: 500;
          font-style: italic;
        }
        .am-card-example {
          margin-top: 8px;
          font-size: clamp(11px, min(2.6vw, 2vh), 14px);
          font-weight: 600; color: #334155; line-height: 1.6;
          padding: 8px 10px;
          background: #F0FDF9;
          border-radius: 10px;
          border-left: 4px solid ${ACCENT}55;
        }
        .am-card-usage {
          margin-top: 6px;
          font-size: clamp(10px, min(2.2vw, 1.6vh), 12px);
          color: ${ACCENT}; font-weight: 700;
        }
        .am-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 360px;
          margin-top: clamp(6px, 1.4vh, 14px);
        }
        .am-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(9px, 1.8vh, 13px) 28px; color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .am-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .am-learn-footer {
          flex-shrink: 0; text-align: center;
          padding: clamp(2px, .6vh, 6px) 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .am-learn-heading p, .am-learn-footer { display: none; }
        }
      `}</style>

      <div className="am-learn-root">
        <div className="am-learn-topbar">
          <button className="am-learn-back" onClick={onBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="am-back-label">{language === 'bm' ? 'Kembali' : 'Back'}</span>
          </button>
          <span className="am-learn-title">{topicTitle}</span>
        </div>

        <div className="am-learn-body">
          <div className="am-learn-heading">
            <h1>
              {language === 'bm' ? 'Ayat Majmuk 🔗' : 'Compound Sentences 🔗'}
            </h1>
            <p>
              {language === 'bm'
                ? 'Ketuk untuk lihat cara menggabungkan ayat menggunakan kata hubung'
                : 'Tap to see how to combine sentences using conjunctions'}
            </p>
          </div>

          <div className="am-cards-scroll">
            {CONJUNCTIONS.map((cj, i) => (
              <div key={i}
                className={`am-card${expandedIdx === i ? ' expanded' : ''}`}
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              >
                <div className="am-card-header">
                  <span className="am-card-title">{cj.title}</span>
                  <span className={`am-card-toggle${expandedIdx === i ? ' open' : ''}`}>▼</span>
                </div>
                <div className={`am-card-content${expandedIdx === i ? ' open' : ''}`}>
                  <div className="am-card-desc">{cj.desc}</div>
                  <div className="am-card-example">📖 {cj.example}</div>
                  <div className="am-card-usage">💡 Pola: {cj.usage}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="am-learn-cta">
            <button className="am-learn-cta-btn" onClick={onStartQuiz}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
          </div>
        </div>

        <div className="am-learn-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

export default function SintaksisAyatMajmuk({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  const reviewQs = [];

  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Sintaksis (Ayat Majmuk)' : 'Syntax (Compound Sentences)';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <AyatMajmukLearnPage
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
