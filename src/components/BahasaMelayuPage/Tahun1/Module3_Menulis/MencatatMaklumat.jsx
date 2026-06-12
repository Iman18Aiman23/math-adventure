import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Check, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMHeader from '../../_shared/BMHeader';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import SpeechManager from '../../../../services/SpeechManager';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '1-3-6-mencatat-maklumat';
const ACCENT = '#7A4FD0';
const PASS_PCT = 70;

const PASSAGES = [
  {
    title: 'Keluarga Saya',
    text: 'Nama saya Ali. Saya berumur tujuh tahun. Saya tinggal di Kuala Lumpur. Saya mempunyai seorang abang dan seorang kakak. Hobi saya ialah membaca buku.',
    notes: [
      'Nama: Ali',
      'Umur: 7 tahun',
      'Tempat tinggal: Kuala Lumpur',
      'Adik-beradik: seorang abang, seorang kakak',
      'Hobi: membaca buku',
    ],
  },
  {
    title: 'Haiwan Peliharaan',
    text: 'Cikgu Siti mempunyai seekor kucing bernama Comel. Comel berwarna putih dan kelabu. Comel suka makan ikan. Setiap hari, Cikgu Siti memberi Comel minum susu.',
    notes: [
      'Haiwan: kucing',
      'Nama: Comel',
      'Warna: putih dan kelabu',
      'Makanan kegemaran: ikan',
      'Minuman: susu',
    ],
  },
  {
    title: 'Lawatan ke Zoo',
    text: 'Pada hari Sabtu, murid Tahun 1 melawat ke Zoo Negara. Mereka naik bas. Di zoo, mereka melihat gajah, harimau, dan monyet. Mereka makan tengah hari di kantin zoo.',
    notes: [
      'Hari: Sabtu',
      'Tempat: Zoo Negara',
      'Kenderaan: bas',
      'Haiwan dilihat: gajah, harimau, monyet',
      'Makan tengah hari: di kantin zoo',
    ],
  },
  {
    title: 'Taman Permainan',
    text: 'Taman Permainan Aman Bestari sangat luas. Ada buaian, gelongsor, dan jongkang-jongket. Banyak pokok bunga ditanam di tepi taman. Setiap petang, kanak-kanak bermain di sana dengan gembira.',
    notes: [
      'Tempat: Taman Permainan Aman Bestari',
      'Kemudahan: buaian, gelongsor, jongkang-jongket',
      'Pokok: bunga di tepi taman',
      'Masa: setiap petang',
      'Suasana: gembira',
    ],
  },
];

function PerPassageQuiz({ passageIndex, language, onBack, onNextPassage, onPassagePassed, isLastPassage, topicTitle, subtitle, notes }) {
  const currentQs = (BM_QUESTIONS[TOPIC_ID] || []).filter(q => q.passageIndex === passageIndex);
  const totalRounds = Math.ceil(currentQs.length / 0.7);
  const quiz = useBMQuiz(currentQs, [], totalRounds);
  const markedRef = useRef(false);

  useEffect(() => {
    if (quiz.finished && !markedRef.current) {
      markedRef.current = true;
      const pct = quiz.totalRounds > 0 ? Math.round((quiz.score / quiz.totalRounds) * 100) : 0;
      if (pct >= PASS_PCT) onPassagePassed(passageIndex);
    }
  }, [quiz.finished, quiz.score, quiz.totalRounds, onPassagePassed, passageIndex]);

  useEffect(() => {
    if (!quiz.finished) markedRef.current = false;
  }, [quiz.finished]);

  const resultExtra = notes && notes.length > 0 ? (
    <div>
      <div className="bm-result-extra-label">
        📋 {language === 'bm' ? 'Nota Penting:' : 'Important Notes:'}
      </div>
      {notes.map((note, i) => (
        <div key={i} className="bm-result-extra-item">{note}</div>
      ))}
    </div>
  ) : null;

  return (
    <BMLessonQuizLayout
      onBack={onBack}
      topicId={TOPIC_ID}
      topicTitle={topicTitle}
      quiz={quiz}
      language={language}
      accentColor={ACCENT}
      onNextTopic={isLastPassage ? undefined : onNextPassage}
      passPct={PASS_PCT}
      subtitle={subtitle}
      resultExtra={resultExtra}
    />
  );
}

function MencatatLearnPage({ onBack, onStartQuiz, topicTitle, language, currentPassage, onGoToPassage, completed, allDone }) {
  const p = PASSAGES[currentPassage];
  const isFirst = currentPassage === 0;
  const isLast = currentPassage === PASSAGES.length - 1;
  const isCurrentCompleted = completed[currentPassage];
  const unlocked = currentPassage === 0 || completed.slice(0, currentPassage).every(Boolean);

  const goPrev = () => onGoToPassage(Math.max(0, currentPassage - 1));
  const goNext = () => onGoToPassage(Math.min(PASSAGES.length - 1, currentPassage + 1));

  const readAloud = () => SpeechManager.speak(p.text, 'ms');

  useEffect(() => {
    if (allDone) {
      const t = setTimeout(() => {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      }, 200);
      return () => clearTimeout(t);
    }
  }, [allDone]);

  return (
    <>
      <style>{`
        .mmt-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #F0EBFB 0%, #DCD2F4 50%, #C4B5ED 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .mmt-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(10px, 2.2vh, 22px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .mmt-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-top: 8px;
          margin-bottom: clamp(10px, 2.4vh, 20px);
        }
        .mmt-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 26px);
          color: #1E293B; margin: 0;
        }
        .mmt-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .mmt-stage {
          flex: 1; min-height: 0; width: 100%; max-width: 520px;
          display: flex; flex-direction: column;
        }
        .mmt-learn-card {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          background: #fff; border-radius: clamp(16px, 2.6vw, 22px);
          border: 2.5px solid ${ACCENT}33;
          box-shadow: 0 6px 18px -8px rgba(0,0,0,.12);
          overflow: hidden;
        }
        .mmt-card-head {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: clamp(12px, 1.8vh, 18px) clamp(14px, 2vw, 20px);
          border-bottom: 1px solid ${ACCENT}18;
        }
        .mmt-card-title-row {
          display: flex; align-items: center; gap: 8px;
          min-width: 0;
        }
        .mmt-card-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4vw, 3.4vh), 21px);
          color: #1E293B;
        }
        .mmt-card-badge {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 3px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(10px, min(2vw, 1.8vh), 12px);
          padding: 2px 8px;
          border-radius: 999px;
        }
        .mmt-card-badge.done {
          background: #F0FDF4; color: #16A34A;
          border: 1.5px solid #BBF7D0;
        }
        .mmt-read-btn {
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
        .mmt-read-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 ${ACCENT}66; }
        .mmt-card-scroll {
          flex: 1; min-height: 0; overflow-y: auto;
          padding: clamp(12px, 2vw, 18px);
          display: flex; flex-direction: column; gap: 12px;
        }
        .mmt-card-text {
          font-size: clamp(15px, min(3.6vw, 3vh), 19px);
          line-height: 1.85;
          color: #334155;
          font-weight: 500;
          padding: 14px 16px;
          background: #F8FAFC;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
        }
        .mmt-quiz-btn-wrap {
          flex-shrink: 0;
        }
        .mmt-quiz-btn {
          width: 100%;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.4vw, 2.6vh), 17px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 1.6vh, 13px) 20px;
          transition: transform .12s ease, box-shadow .12s;
        }
        .mmt-quiz-btn:active { transform: translateY(2px); }
        .mmt-quiz-btn.ready {
          color: #fff;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66;
        }
        .mmt-quiz-btn.done {
          color: #16A34A; background: #F0FDF4;
          border: 2px solid #BBF7D0;
          cursor: default;
        }
        .mmt-quiz-btn.locked {
          color: #94A3B8; background: #F1F5F9;
          border: 2px solid #E2E8F0;
          cursor: default;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .mmt-pager {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
          margin-top: clamp(10px, 1.8vh, 16px);
        }
        .mmt-arrow {
          flex-shrink: 0;
          width: clamp(44px, 8vh, 52px); height: clamp(44px, 8vh, 52px);
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: #fff; border: 2px solid ${ACCENT};
          color: ${ACCENT}; cursor: pointer;
          transition: transform .12s;
        }
        .mmt-arrow:active { transform: translateY(2px); }
        .mmt-arrow:disabled { opacity: .35; cursor: default; border-color: #CBD5E1; color: #CBD5E1; }
        .mmt-dots { display: flex; gap: 8px; }
        .mmt-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: ${ACCENT}33; transition: background .2s, transform .2s;
        }
        .mmt-dot.done { background: #16A34A; }
        .mmt-dot.active { background: ${ACCENT}; transform: scale(1.35); }
        .mmt-dot.locked { background: #CBD5E1; }
        .mmt-all-done {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 520px;
          margin-top: clamp(10px, 2vh, 18px);
        }
        .mmt-all-done-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 1.9vh, 14px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, #16A34Acc, #16A34A);
          box-shadow: 0 4px 0 #16A34A66, 0 10px 20px -10px #16A34A80;
        }
        .mmt-all-done-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #16A34A66; }
        .mmt-all-done-msg {
          font-size: clamp(12px, min(2.6vw, 2vh), 14px);
          font-weight: 600; color: #166534; margin: 6px 0 10px;
        }
        @media (max-height: 480px) {
          .mmt-learn-heading p { display: none; }
        }
      `}</style>

      <div className="mmt-learn-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="mmt-learn-body">
          <div className="mmt-learn-heading">
            <h1>
              {language === 'bm' ? 'Mari Mencatat Maklumat 📝' : "Let's Record Information 📝"}
            </h1>
            <p>
              {language === 'bm'
                ? 'Baca petikan, kemudian jawab kuiz setiap satu'
                : 'Read each passage, then answer its quiz'}
            </p>
          </div>

          <div className="mmt-stage">
            <div className="mmt-learn-card">
              <div className="mmt-card-head">
                <div className="mmt-card-title-row">
                  <span className="mmt-card-title">{p.title}</span>
                  {isCurrentCompleted && (
                    <span className="mmt-card-badge done">
                      <Check size={14} /> {language === 'bm' ? 'Selesai' : 'Done'}
                    </span>
                  )}
                </div>
                <button className="mmt-read-btn" onClick={readAloud}>
                  <Volume2 size={16} /> {language === 'bm' ? 'Dengar' : 'Listen'}
                </button>
              </div>
              <div className="mmt-card-scroll">
                <div className="mmt-card-text">{p.text}</div>
                <div className="mmt-quiz-btn-wrap">
                  {isCurrentCompleted ? (
                    <button className="mmt-quiz-btn done" disabled>
                      <Check size={18} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      {language === 'bm' ? 'Selesai' : 'Done'}
                    </button>
                  ) : unlocked ? (
                    <button className="mmt-quiz-btn ready" onClick={onStartQuiz}>
                      🎯 {language === 'bm' ? 'Mulakan Kuiz' : 'Start Quiz'}
                    </button>
                  ) : (
                    <button className="mmt-quiz-btn locked" disabled>
                      <Lock size={16} />
                      {language === 'bm' ? 'Selesaikan petikan sebelum ini' : 'Complete previous passage'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="mmt-pager">
              <button className="mmt-arrow" onClick={goPrev} disabled={isFirst}
                aria-label={language === 'bm' ? 'Petikan sebelum' : 'Previous passage'}>
                <ChevronLeft size={26} />
              </button>
              <div className="mmt-dots">
                {PASSAGES.map((_, i) => (
                  <span key={i} className={`mmt-dot${completed[i] ? ' done' : ''}${i === currentPassage ? ' active' : ''}${!completed[i] && i !== currentPassage ? ' locked' : ''}`} />
                ))}
              </div>
              <button className="mmt-arrow" onClick={goNext} disabled={isLast}
                aria-label={language === 'bm' ? 'Petikan seterusnya' : 'Next passage'}>
                <ChevronRight size={26} />
              </button>
            </div>
          </div>

          {allDone && (
            <div className="mmt-all-done">
              <p className="mmt-all-done-msg">
                🎉 {language === 'bm' ? 'Tahniah! Kamu telah melengkapkan semua petikan!' : 'Congratulations! You completed all passages!'}
              </p>
              <button className="mmt-all-done-btn" onClick={onBack}>
                {language === 'bm' ? '← Kembali ke Trail' : '← Back to Trail'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function MencatatMaklumat({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');
  const [currentPassage, setCurrentPassage] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false]);
  const [quizKey, setQuizKey] = useState(0);

  const allDone = completed.every(Boolean);
  const isLastPassage = currentPassage === PASSAGES.length - 1;

  const topicTitle = language === 'bm' ? 'Mencatat Maklumat' : 'Recording Information';

  const handleBack = useCallback(() => {
    onBack?.();
  }, [onBack]);

  const handlePassagePassed = useCallback((idx) => {
    setCompleted(prev => {
      if (prev[idx]) return prev;
      const next = [...prev];
      next[idx] = true;
      if (next.every(Boolean)) {
        setTimeout(() => topicComplete?.(TOPIC_ID), 0);
      }
      return next;
    });
  }, [topicComplete]);

  const handleNextPassage = useCallback(() => {
    setPage('learn');
    if (currentPassage + 1 < PASSAGES.length) {
      setCurrentPassage(currentPassage + 1);
    }
  }, [currentPassage]);

  const handleQuizBack = useCallback(() => {
    setPage('learn');
  }, []);

  const handleGoToPassage = useCallback((idx) => {
    setCurrentPassage(idx);
  }, []);

  const handleStartQuiz = useCallback(() => {
    setQuizKey(k => k + 1);
    setPage('quiz');
  }, []);

  if (page === 'quiz') {
    return (
      <PerPassageQuiz
        key={quizKey}
        passageIndex={currentPassage}
        language={language}
        onBack={handleQuizBack}
        onNextPassage={handleNextPassage}
        onPassagePassed={handlePassagePassed}
        isLastPassage={isLastPassage}
        topicTitle={PASSAGES[currentPassage].title}
        subtitle={language === 'bm' ? 'Mencatat Nota Penting' : 'Recording Important Notes'}
        notes={PASSAGES[currentPassage].notes}
      />
    );
  }

  return (
    <MencatatLearnPage
      onBack={handleBack}
      onStartQuiz={handleStartQuiz}
      topicTitle={topicTitle}
      language={language}
      currentPassage={currentPassage}
      onGoToPassage={handleGoToPassage}
      completed={completed}
      allDone={allDone}
    />
  );
}
