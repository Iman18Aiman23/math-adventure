import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight } from 'lucide-react';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMHeader from '../../_shared/BMHeader';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import SpeechManager from '../../../../services/SpeechManager';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '1-2-5-fahami-cerita';
const ACCENT = '#1E7AC9';

const PASSAGES = [
  {
    title: 'Kucing Comel',
    text: 'Kucing comel itu berwarna hitam. Ia suka bermain di halaman rumah. Setiap hari kucing itu duduk di atas pagar.',
    idea: 'Kucing hitam yang suka bermain di halaman dan duduk di pagar.',
  },
  {
    title: 'Bas Sekolah',
    text: 'Bas sekolah berwarna kuning. Setiap pagi Ali menaiki bas sekolah. Ali duduk di sebelah kawan baiknya.',
    idea: 'Ali menaiki bas kuning ke sekolah dengan kawannya.',
  },
  {
    title: 'Pokok Rambutan',
    text: 'Pokok rambutan di belakang rumah sangat tinggi. Buahnya manis dan merah. Adik suka makan rambutan.',
    idea: 'Pokok rambutan tinggi dengan buah manis yang dimakan adik.',
  },
  {
    title: 'Taman Bunga',
    text: 'Ibu suka menanam bunga di taman. Ada bunga ros, bunga cempaka dan bunga matahari. Taman itu sungguh cantik.',
    idea: 'Ibu menanam banyak bunga cantik di taman.',
  },
];

function FahamiCeritaLearnPage({ onBack, onStartQuiz, topicTitle, language }) {
  const [current, setCurrent] = useState(0);
  const [maxSeen, setMaxSeen] = useState(0);

  const p = PASSAGES[current];
  const isLast = current === PASSAGES.length - 1;
  const allSeen = maxSeen >= PASSAGES.length - 1;

  const goPrev = () => setCurrent((i) => Math.max(0, i - 1));
  const goNext = () =>
    setCurrent((i) => {
      const ni = Math.min(PASSAGES.length - 1, i + 1);
      setMaxSeen((m) => Math.max(m, ni));
      return ni;
    });

  const readAloud = () => SpeechManager.speak(p.text, 'ms');

  return (
    <>
      <style>{`
        .fc-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #EBF5FF 0%, #D5E9FA 50%, #B7D9F5 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .fc-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(10px, 2.2vh, 22px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .fc-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-top: 8px;
          margin-bottom: clamp(10px, 2.4vh, 20px);
        }
        .fc-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 26px);
          color: #1E293B; margin: 0;
        }
        .fc-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .fc-stage {
          flex: 1; min-height: 0; width: 100%; max-width: 520px;
          display: flex; flex-direction: column;
        }
        .fc-learn-card {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          background: #fff; border-radius: clamp(16px, 2.6vw, 22px);
          border: 2.5px solid ${ACCENT}33;
          box-shadow: 0 6px 18px -8px rgba(0,0,0,.12);
          overflow: hidden;
        }
        .fc-card-head {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: clamp(12px, 1.8vh, 18px) clamp(14px, 2vw, 20px);
          border-bottom: 1px solid ${ACCENT}18;
        }
        .fc-card-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4vw, 3.4vh), 21px);
          color: #1E293B;
        }
        .fc-read-btn {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(12px, min(2.6vw, 2vh), 14px);
          color: #fff; background: ${ACCENT};
          border: none; border-radius: 999px;
          padding: clamp(6px, 1vh, 9px) clamp(12px, 2.2vw, 16px);
          cursor: pointer;
          box-shadow: 0 3px 0 ${ACCENT}66;
        }
        .fc-read-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 ${ACCENT}66; }
        .fc-card-scroll {
          flex: 1; min-height: 0; overflow-y: auto;
          padding: clamp(12px, 2vw, 18px);
          display: flex; flex-direction: column; gap: 10px;
        }
        .fc-card-text {
          font-size: clamp(15px, min(3.6vw, 3vh), 19px);
          line-height: 1.85;
          color: #334155;
          font-weight: 500;
          padding: 14px 16px;
          background: #F8FAFC;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
        }
        .fc-card-idea {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 15px);
          color: #475569;
          font-weight: 500;
          padding: 10px 14px;
          background: #FFFBEB;
          border-radius: 10px;
          border: 1px solid #FDE68A;
        }
        .fc-card-idea-label {
          color: #92400E; font-weight: 700; white-space: nowrap;
          font-family: 'Baloo 2', sans-serif; font-size: clamp(11px, min(2.4vw, 2vh), 13px);
        }
        .fc-pager {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
          margin-top: clamp(10px, 1.8vh, 16px);
        }
        .fc-arrow {
          flex-shrink: 0;
          width: clamp(44px, 8vh, 52px); height: clamp(44px, 8vh, 52px);
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: #fff; border: 2px solid ${ACCENT};
          color: ${ACCENT}; cursor: pointer;
          transition: transform .12s;
        }
        .fc-arrow:active { transform: translateY(2px); }
        .fc-arrow:disabled { opacity: .35; cursor: default; border-color: #CBD5E1; color: #CBD5E1; }
        .fc-dots { display: flex; gap: 8px; }
        .fc-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: ${ACCENT}33; transition: background .2s, transform .2s;
        }
        .fc-dot.seen { background: ${ACCENT}80; }
        .fc-dot.active { background: ${ACCENT}; transform: scale(1.35); }
        .fc-learn-cta {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 520px;
          margin-top: clamp(10px, 2vh, 18px);
        }
        .fc-learn-cta-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 1.9vh, 14px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .fc-learn-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${ACCENT}66; }
        .fc-learn-cta-btn:disabled {
          background: #CBD5E1; box-shadow: none; cursor: default;
          color: #fff;
        }
        .fc-learn-cta-hint {
          font-size: clamp(10px, min(2.4vw, 1.8vh), 12px);
          color: #64748B; font-weight: 600; margin: 6px 0 0;
        }
        @media (max-height: 480px) {
          .fc-learn-heading p { display: none; }
        }
      `}</style>

      <div className="fc-learn-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="fc-learn-body">
          <div className="fc-learn-heading">
            <h1>{language === 'bm' ? 'Mari Fahami Cerita 🔍' : "Let's Understand Stories 🔍"}</h1>
            <p>
              {language === 'bm'
                ? 'Baca setiap cerita, kemudian cuba kuiz'
                : 'Read each story, then try the quiz'}
            </p>
          </div>

          <div className="fc-stage">
            <div className="fc-learn-card">
              <div className="fc-card-head">
                <span className="fc-card-title">{p.title}</span>
                <button className="fc-read-btn" onClick={readAloud}>
                  <Volume2 size={16} /> {language === 'bm' ? 'Dengar' : 'Listen'}
                </button>
              </div>
              <div className="fc-card-scroll">
                <div className="fc-card-text">{p.text}</div>
                <div className="fc-card-idea">
                  <span className="fc-card-idea-label">{language === 'bm' ? 'Idea Utama:' : 'Main Idea:'}</span>
                  <span>{p.idea}</span>
                </div>
              </div>
            </div>

            <div className="fc-pager">
              <button className="fc-arrow" onClick={goPrev} disabled={current === 0}
                aria-label={language === 'bm' ? 'Cerita sebelum' : 'Previous story'}>
                <ChevronLeft size={26} />
              </button>
              <div className="fc-dots">
                {PASSAGES.map((_, i) => (
                  <span key={i} className={`fc-dot${i === current ? ' active' : ''}${i <= maxSeen ? ' seen' : ''}`} />
                ))}
              </div>
              <button className="fc-arrow" onClick={goNext} disabled={isLast}
                aria-label={language === 'bm' ? 'Cerita seterusnya' : 'Next story'}>
                <ChevronRight size={26} />
              </button>
            </div>
          </div>

          <div className="fc-learn-cta">
            <button className="fc-learn-cta-btn" onClick={onStartQuiz} disabled={!allSeen}>
              🎯 {language === 'bm' ? 'Sedia untuk Kuiz?' : 'Ready for Quiz?'}
            </button>
            {!allSeen && (
              <p className="fc-learn-cta-hint">
                {language === 'bm' ? 'Baca semua cerita dahulu ya 📖' : 'Read all the stories first 📖'}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function FahamiCerita({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');

  const currentQs = BM_QUESTIONS[TOPIC_ID] || [];
  // Review M1's "Dengar & Teka" vocabulary (1.1.6) — spaced repetition.
  const reviewQs = BM_QUESTIONS['1-1-6-dengar-teka'] || [];

  // Pass 15 (not 10) so all 10 items surface: useBMQuiz reserves ~30% of
  // totalRounds for review questions, so a value equal to the bank size
  // would drop ~3 items. pool.length still resolves to the 10 we have.
  const quiz = useBMQuiz(currentQs, reviewQs, 15);

  const topicTitle = language === 'bm' ? 'Fahami Cerita' : 'Understand Stories';

  const handleBack = () => {
    onBack?.();
  };

  if (page === 'learn') {
    return (
      <FahamiCeritaLearnPage
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
