import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Check, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';
import useBMQuiz from '../../_shared/useBMQuiz';
import BMHeader from '../../_shared/BMHeader';
import BMLessonQuizLayout from '../../_shared/BMLessonQuizLayout';
import SpeechManager from '../../../../services/SpeechManager';
import { playSound } from '../../../../utils/soundManager';
import { BM_QUESTIONS } from '../../_shared/ModuleData';

const TOPIC_ID = '1-4-2-pantun';
const ACCENT = '#EC4899';
const PASS_PCT = 70;

const PANTUNS = [
  {
    title: 'Pantun 1',
    lines: 'Banyak udang banyak garam,\nBanyak orang banyak ragam.',
    style: 'Pantun Dua Kerat',
    tema: 'Kepelbagaian Sikap',
    maksud: 'Setiap orang mempunyai sikap dan perangai yang berbeza-beza. Kita perlu bersabar dan menghormati perbezaan setiap orang.',
    notes: ['Tema: Kepelbagaian Sikap Manusia', 'Maksud: Setiap orang berbeza sikap dan perangai'],
  },
  {
    title: 'Pantun 2',
    lines: 'Gendang gendut tali kecapi,\nKenyang perut suka hati.',
    style: 'Pantun Dua Kerat',
    tema: 'Kesenangan',
    maksud: 'Apabila perut sudah kenyang, hati akan berasa gembira dan puas. Makanan yang cukup membawa kebahagiaan.',
    notes: ['Tema: Kesenangan', 'Maksud: Kenyang perut membawa kegembiraan'],
  },
  {
    title: 'Pantun 3',
    lines: 'Emas, perak, tembaga, suasa,\nMalas bergerak tidak merasa.',
    style: 'Pantun Dua Kerat',
    tema: 'Kerajinan',
    maksud: 'Orang yang malas tidak akan mendapat apa-apa hasil. Kita perlu rajin berusaha untuk mencapai kejayaan.',
    notes: ['Tema: Kerajinan', 'Maksud: Malas bergerak tidak akan merasa'],
  },
  {
    title: 'Pantun 4',
    lines: 'Pergi ke kedai membeli gula,\nJangan lupa beli sebuku roti.\nBelajar rajin di sekolah,\nSupaya pandai dan berbakti.',
    style: 'Pantun Empat Kerat',
    tema: 'Pendidikan',
    maksud: 'Kita perlu rajin belajar di sekolah supaya menjadi pandai dan dapat berbakti kepada keluarga, masyarakat, dan negara.',
    notes: ['Tema: Pendidikan', 'Maksud: Rajin belajar supaya pandai dan berbakti'],
  },
  {
    title: 'Pantun 5',
    lines: 'Tingkap papan kayu bersegi,\nSampan sakat di Pulau Angsa.\nIndah tampan kerana budi,\nTinggi bangsa kerana bahasa.',
    style: 'Pantun Empat Kerat',
    tema: 'Budi Bahasa',
    maksud: 'Seseorang itu dihargai kerana budi pekertinya, manakala bangsa dihormati kerana bahasanya. Jaga budi bahasa dan pertuturan.',
    notes: ['Tema: Budi Bahasa', 'Maksud: Indah kerana budi, tinggi kerana bahasa'],
  },
  {
    title: 'Pantun 6',
    lines: 'Pisang emas dibawa belayar,\nMasak sebiji di atas peti.\nHutang emas boleh dibayar,\nHutang budi dibawa mati.',
    style: 'Pantun Empat Kerat',
    tema: 'Budi Pekerti',
    maksud: 'Hutang wang boleh dibayar, tetapi budi baik orang lain tidak boleh dibalas dan akan dikenang sampai bila-bila. Hargailah budi baik orang.',
    notes: ['Tema: Budi Pekerti', 'Maksud: Budi baik dikenang selamanya'],
  },
];

function PerPantunQuiz({ pantunIndex, language, onBack, onNextPantun, onPantunPassed, isLastPantun, topicTitle, notes }) {
  const currentQs = (BM_QUESTIONS[TOPIC_ID] || []).filter(q => q.pantunIndex === pantunIndex);
  const totalRounds = Math.ceil(Math.max(currentQs.length, 1) / 0.7);
  const quiz = useBMQuiz(currentQs, [], totalRounds);
  const markedRef = useRef(false);

  useEffect(() => {
    if (quiz.finished && !markedRef.current) {
      markedRef.current = true;
      const pct = quiz.totalRounds > 0 ? Math.round((quiz.score / quiz.totalRounds) * 100) : 0;
      if (pct >= PASS_PCT) onPantunPassed(pantunIndex);
    }
  }, [quiz.finished, quiz.score, quiz.totalRounds, onPantunPassed, pantunIndex]);

  useEffect(() => {
    if (!quiz.finished) markedRef.current = false;
  }, [quiz.finished]);

  const resultExtra = notes && notes.length > 0 ? (
    <div>
      <div className="pn-result-extra-label" style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 'clamp(13px, 2.6vw, 15px)', color: '#475569', marginBottom: 8 }}>
        📋 {language === 'bm' ? 'Nota Penting:' : 'Important Notes:'}
      </div>
      {notes.map((note, i) => (
        <div key={i} style={{ fontFamily: "'Fredoka', sans-serif", fontWeight: 500, fontSize: 'clamp(12px, 2.4vw, 14px)', color: '#334155', lineHeight: 1.7, padding: '3px 0' }}>{note}</div>
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
      onNextTopic={isLastPantun ? undefined : onNextPantun}
      passPct={PASS_PCT}
      subtitle={language === 'bm' ? 'Fahami Maksud Pantun' : 'Understand the Pantun'}
      resultExtra={resultExtra}
    />
  );
}

function PantunLearnPage({ onBack, onStartQuiz, topicTitle, language, currentPantun, onGoToPantun, completed, allDone }) {
  const p = PANTUNS[currentPantun];
  const isFirst = currentPantun === 0;
  const isLast = currentPantun === PANTUNS.length - 1;
  const isCurrentCompleted = completed[currentPantun];
  const unlocked = currentPantun === 0 || completed.slice(0, currentPantun).every(Boolean);

  const goPrev = () => onGoToPantun(Math.max(0, currentPantun - 1));
  const goNext = () => onGoToPantun(Math.min(PANTUNS.length - 1, currentPantun + 1));

  const readAloud = () => {
    SpeechManager.stopSpeaking();
    SpeechManager.speak(p.lines.replace(/\n/g, ' '), 'ms-MY', { rate: 0.7, pitch: 1.0 });
  };

  useEffect(() => {
    if (allDone) {
      playSound('streak');
      const t = setTimeout(() => {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      }, 300);
      return () => clearTimeout(t);
    }
  }, [allDone]);

  return (
    <>
      <style>{`
        .pn-learn-root {
          height: 100dvh; overflow: hidden;
          background: linear-gradient(180deg, #FEF1F7 0%, #FCE7F3 50%, #F9D5E7 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .pn-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%;
          padding: clamp(10px, 2.2vh, 22px) 16px clamp(8px, 1.8vh, 18px);
          overflow: hidden;
        }
        .pn-learn-heading {
          flex-shrink: 0; text-align: center; width: 100%;
          margin-top: 6px;
          margin-bottom: clamp(8px, 2vh, 16px);
        }
        .pn-learn-heading h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px, min(4.6vw, 4.4vh), 24px);
          color: #1E293B; margin: 0;
        }
        .pn-learn-heading p {
          font-size: clamp(10px, min(2.8vw, 2vh), 13px);
          font-weight: 500; color: #475569; margin: 4px 0 0;
        }
        .pn-stage {
          flex: 1; min-height: 0; width: 100%; max-width: 520px;
          display: flex; flex-direction: column;
        }
        .pn-learn-card {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          background: #fff; border-radius: clamp(16px, 2.6vw, 22px);
          border: 2.5px solid ${ACCENT}33;
          box-shadow: 0 6px 18px -8px rgba(0,0,0,.12);
          overflow: hidden;
        }
        .pn-card-head {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between; gap: 10px;
          padding: clamp(10px, 1.6vh, 16px) clamp(14px, 2vw, 20px);
          border-bottom: 1px solid ${ACCENT}18;
        }
        .pn-card-title-row {
          display: flex; align-items: center; gap: 8px;
          min-width: 0;
        }
        .pn-card-title {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, min(3.8vw, 3.2vh), 20px);
          color: #1E293B;
        }
        .pn-card-badge {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 3px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(10px, min(2vw, 1.8vh), 12px);
          padding: 2px 8px;
          border-radius: 999px;
        }
        .pn-card-badge.done {
          background: #F0FDF4; color: #16A34A;
          border: 1.5px solid #BBF7D0;
        }
        .pn-read-btn {
          flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(12px, min(2.6vw, 2vh), 14px);
          color: #fff; background: ${ACCENT};
          border: none; border-radius: 999px;
          padding: clamp(5px, 0.9vh, 8px) clamp(10px, 2vw, 14px);
          cursor: pointer;
          box-shadow: 0 3px 0 ${ACCENT}66;
        }
        .pn-read-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 ${ACCENT}66; }
        .pn-card-scroll {
          flex: 1; min-height: 0; overflow-y: auto;
          padding: clamp(10px, 1.8vw, 16px);
          display: flex; flex-direction: column; gap: 12px;
        }
        .pn-card-text {
          font-family: 'Baloo 2', sans-serif; font-style: italic;
          font-size: clamp(15px, min(3.6vw, 3vh), 19px);
          line-height: 1.9;
          color: #334155;
          font-weight: 600;
          white-space: pre-line;
          padding: 14px 16px;
          background: #FDF2F8;
          border-radius: 12px;
          border-left: 4px solid ${ACCENT}55;
        }
        .pn-card-style {
          font-size: clamp(11px, min(2.4vw, 2vh), 13px);
          font-weight: 600; color: ${ACCENT};
          text-align: center;
          background: #FEF1F7;
          border-radius: 999px;
          padding: 4px 14px;
          align-self: center;
        }
        .pn-maksud-box {
          background: #F8FAFC;
          border-radius: 12px;
          padding: 12px 14px;
          border: 1px solid #E2E8F0;
        }
        .pn-maksud-label {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, min(2.8vw, 2.2vh), 14px);
          color: ${ACCENT};
          margin-bottom: 4px;
        }
        .pn-maksud-text {
          font-size: clamp(12px, min(2.8vw, 2.4vh), 15px);
          line-height: 1.6;
          color: #475569;
          font-weight: 500;
        }
        .pn-quiz-btn-wrap {
          flex-shrink: 0;
        }
        .pn-quiz-btn {
          width: 100%;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.4vw, 2.6vh), 17px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 1.6vh, 13px) 20px;
          transition: transform .12s ease, box-shadow .12s;
        }
        .pn-quiz-btn:active { transform: translateY(2px); }
        .pn-quiz-btn.ready {
          color: #fff;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${ACCENT}66;
        }
        .pn-quiz-btn.done {
          color: #16A34A; background: #F0FDF4;
          border: 2px solid #BBF7D0;
          cursor: default;
        }
        .pn-quiz-btn.locked {
          color: #94A3B8; background: #F1F5F9;
          border: 2px solid #E2E8F0;
          cursor: default;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .pn-pager {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px;
          margin-top: clamp(10px, 1.6vh, 14px);
        }
        .pn-arrow {
          flex-shrink: 0;
          width: clamp(40px, 7vh, 48px); height: clamp(40px, 7vh, 48px);
          display: flex; align-items: center; justify-content: center;
          border-radius: 50%;
          background: #fff; border: 2px solid ${ACCENT};
          color: ${ACCENT}; cursor: pointer;
          transition: transform .12s;
        }
        .pn-arrow:active { transform: translateY(2px); }
        .pn-arrow:disabled { opacity: .35; cursor: default; border-color: #CBD5E1; color: #CBD5E1; }
        .pn-dots { display: flex; gap: 6px; }
        .pn-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: ${ACCENT}33; transition: background .2s, transform .2s;
        }
        .pn-dot.done { background: #16A34A; }
        .pn-dot.active { background: ${ACCENT}; transform: scale(1.35); }
        .pn-dot.locked { background: #CBD5E1; }
        .pn-all-done {
          flex-shrink: 0; text-align: center; width: 100%; max-width: 520px;
          margin-top: clamp(8px, 1.8vh, 16px);
        }
        .pn-all-done-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, min(3.8vw, 2.6vh), 18px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 1.9vh, 14px) 28px;
          color: #fff; width: 100%;
          background: linear-gradient(180deg, #16A34Acc, #16A34A);
          box-shadow: 0 4px 0 #16A34A66, 0 10px 20px -10px #16A34A80;
        }
        .pn-all-done-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #16A34A66; }
        .pn-all-done-msg {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: clamp(13px, min(2.8vw, 2.2vh), 15px);
          color: #166534; margin: 6px 0 10px;
        }
        @media (max-height: 480px) {
          .pn-learn-heading p { display: none; }
        }
      `}</style>

      <div className="pn-learn-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="pn-learn-body">
          <div className="pn-learn-heading">
            <h1>
              📜 {language === 'bm' ? 'Mari Belajar Pantun' : 'Let\'s Learn Pantun'}
            </h1>
            <p>
              {language === 'bm'
                ? 'Baca pantun, fahami tema dan maksudnya'
                : 'Read each pantun, understand its theme and meaning'}
            </p>
          </div>

          <div className="pn-stage">
            <div className="pn-learn-card">
              <div className="pn-card-head">
                <div className="pn-card-title-row">
                  <span className="pn-card-title">{p.title} · {p.style}</span>
                  {isCurrentCompleted && (
                    <span className="pn-card-badge done">
                      <Check size={14} /> {language === 'bm' ? 'Selesai' : 'Done'}
                    </span>
                  )}
                </div>
                <button className="pn-read-btn" onClick={readAloud}>
                  <Volume2 size={16} /> {language === 'bm' ? 'Dengar' : 'Listen'}
                </button>
              </div>
              <div className="pn-card-scroll">
                <div className="pn-card-text">{p.lines}</div>
                <div className="pn-maksud-box">
                  <div className="pn-maksud-label">
                    🎯 {language === 'bm' ? 'Tema:' : 'Theme:'} {p.tema}
                  </div>
                  <div className="pn-maksud-text">
                    {p.maksud}
                  </div>
                </div>
                <div className="pn-quiz-btn-wrap">
                  {isCurrentCompleted ? (
                    <button className="pn-quiz-btn done" disabled>
                      <Check size={18} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                      {language === 'bm' ? 'Selesai' : 'Done'}
                    </button>
                  ) : unlocked ? (
                    <button className="pn-quiz-btn ready" onClick={onStartQuiz}>
                      🎯 {language === 'bm' ? 'Mulakan Kuiz' : 'Start Quiz'}
                    </button>
                  ) : (
                    <button className="pn-quiz-btn locked" disabled>
                      <Lock size={16} />
                      {language === 'bm' ? 'Selesaikan pantun sebelum ini' : 'Complete previous pantun'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="pn-pager">
              <button className="pn-arrow" onClick={goPrev} disabled={isFirst}
                aria-label={language === 'bm' ? 'Pantun sebelum' : 'Previous pantun'}>
                <ChevronLeft size={24} />
              </button>
              <div className="pn-dots">
                {PANTUNS.map((_, i) => (
                  <span key={i} className={`pn-dot${completed[i] ? ' done' : ''}${i === currentPantun ? ' active' : ''}${!completed[i] && i !== currentPantun ? ' locked' : ''}`} />
                ))}
              </div>
              <button className="pn-arrow" onClick={goNext} disabled={isLast}
                aria-label={language === 'bm' ? 'Pantun seterusnya' : 'Next pantun'}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {allDone && (
            <div className="pn-all-done">
              <p className="pn-all-done-msg">
                🎉 {language === 'bm' ? 'Tahniah! Kamu telah melengkapkan semua pantun!' : 'Congratulations! You completed all pantuns!'}
              </p>
              <button className="pn-all-done-btn" onClick={onBack}>
                {language === 'bm' ? '← Kembali ke Trail' : '← Back to Trail'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Pantun({ onBack, language = 'bm', topicComplete, onNextTopic }) {
  const [page, setPage] = useState('learn');
  const [currentPantun, setCurrentPantun] = useState(0);
  const [completed, setCompleted] = useState([false, false, false, false, false, false]);
  const [quizKey, setQuizKey] = useState(0);

  const allDone = completed.every(Boolean);
  const isLastPantun = currentPantun === PANTUNS.length - 1;

  const topicTitle = language === 'bm' ? 'Pantun' : 'Pantun';

  const handleBack = useCallback(() => {
    onBack?.();
  }, [onBack]);

  const handlePantunPassed = useCallback((idx) => {
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

  const handleNextPantun = useCallback(() => {
    setPage('learn');
    if (currentPantun + 1 < PANTUNS.length) {
      setCurrentPantun(currentPantun + 1);
    }
  }, [currentPantun]);

  const handleQuizBack = useCallback(() => {
    setPage('learn');
  }, []);

  const handleGoToPantun = useCallback((idx) => {
    setCurrentPantun(idx);
  }, []);

  const handleStartQuiz = useCallback(() => {
    setQuizKey(k => k + 1);
    setPage('quiz');
  }, []);

  if (page === 'quiz') {
    return (
      <PerPantunQuiz
        key={quizKey}
        pantunIndex={currentPantun}
        language={language}
        onBack={handleQuizBack}
        onNextPantun={handleNextPantun}
        onPantunPassed={handlePantunPassed}
        isLastPantun={isLastPantun}
        topicTitle={PANTUNS[currentPantun].title + ' · ' + PANTUNS[currentPantun].style}
        notes={PANTUNS[currentPantun].notes}
      />
    );
  }

  return (
    <PantunLearnPage
      onBack={handleBack}
      onStartQuiz={handleStartQuiz}
      topicTitle={topicTitle}
      language={language}
      currentPantun={currentPantun}
      onGoToPantun={handleGoToPantun}
      completed={completed}
      allDone={allDone}
    />
  );
}
