import React, { useState, useEffect, useRef } from 'react';
import { FONT_IMPORT } from '../_shared/arabic';
import { shuffle } from '../_shared/utils';
import BackButton from '../../BackButton';
import SpeechManager from '../../../services/SpeechManager';
import { playSound } from '../../../utils/soundManager';
import Celebration from '../_shared/Celebration';

const LETTERS = ['A', 'B', 'C', 'D'];

function shuffleOptions(q) {
  const opts = [...q.options];
  for (let i = opts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [opts[i], opts[j]] = [opts[j], opts[i]];
  }
  return { ...q, options: opts, correctIndex: opts.indexOf(q.answer) };
}

const DEFAULT_THEME = {
  pageGradient: 'linear-gradient(180deg,#FDEFF5 0%,#F7D6E3 50%,#F2C4D7 100%)',
  dark: '#46122E',
  accent: '#E8568A',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#FFE3EF 0%,#F58FB6 55%,#D94B86 100%)',
  pillGradient: 'linear-gradient(180deg,#F0709F,#E8568A)',
};

function QuizSection({
  quizStarted,
  pool,
  idx,
  score,
  answered,
  selected,
  correctIdx,
  totalRounds,
  language,
  accentColor,
  handleStart,
  handleChoose,
  handleNext,
  handleRestart,
  finished,
}) {
  if (!quizStarted) {
    return (
      <div style={{ textAlign: 'center', padding: '20px 0 40px' }}>
        <div className="quiz-card" style={{ padding: 'clamp(28px,5vw,40px)' }}>
          <span style={{ fontSize: 'clamp(44px,12vw,64px)', display: 'block', marginBottom: 10 }}>🎯</span>
          <h3 style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: 'clamp(20px,4vw,28px)', color: 'var(--scl-rose-deep)', margin: '0 0 6px',
          }}>
            {language === 'bm' ? 'Kuiz Pembelajaran' : 'Quiz'}
          </h3>
          <p style={{
            fontFamily: "'Fredoka', sans-serif", fontWeight: 500,
            fontSize: '15px', color: 'var(--scl-muted)', margin: '0 0 20px',
          }}>
            {language === 'bm'
              ? 'Uji kefahaman anda tentang adab yang telah dipelajari'
              : 'Test your understanding of the manners you have learned'}
          </p>
          <button className="scl-btn scl-btn-primary" onClick={handleStart}>
            <span className="scl-ico">🎯</span>
            {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'}
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / totalRounds) * 100);
    const stars = pct >= 80 ? '⭐⭐⭐' : pct >= 50 ? '⭐⭐' : '⭐';
    const msg = pct >= 80
      ? (language === 'bm' ? 'Hebat! Kamu sudah faham dengan baik!' : 'Excellent! You understand well!')
      : pct >= 50
      ? (language === 'bm' ? 'Bagus! Teruskan belajar ya.' : 'Good! Keep learning.')
      : (language === 'bm' ? 'Jangan risau — cuba sekali lagi!' : 'Don\'t worry — try again!');

    return (
      <div style={{ textAlign: 'center', padding: '20px 0 40px' }}>
        <div className="quiz-card" style={{ padding: 'clamp(28px,5vw,40px)' }}>
          <h3 style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: 'clamp(20px,4vw,28px)', color: 'var(--scl-rose-deep)', margin: '0 0 6px',
          }}>🎉 {language === 'bm' ? 'Keputusan Kuiz' : 'Quiz Result'}</h3>
          <div style={{ fontSize: 'clamp(32px,8vw,48px)', letterSpacing: 4, margin: '8px 0' }}>{stars}</div>
          <div className="scl-result-score">{score} / {totalRounds}</div>
          <p style={{
            fontFamily: "'Fredoka', sans-serif", fontWeight: 600,
            fontSize: '16px', color: 'var(--scl-muted)', margin: '0 0 22px',
          }}>{msg}</p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="scl-btn scl-btn-primary" onClick={handleRestart}>
              🔄 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!pool || !pool[idx]) return null;
  const q = pool[idx];

  return (
    <div style={{ padding: '20px 0 40px' }}>
      <div className="quiz-card" style={{ padding: 'clamp(24px,5vw,40px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span className="scl-qprog">
            {language === 'bm' ? 'Soalan' : 'Question'} {idx + 1} / {totalRounds}
          </span>
          <span style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: '14px', color: '#D4960A',
          }}>⭐ {score}</span>
        </div>
        <div style={{
          width: '100%', height: 8, borderRadius: 99,
          background: 'rgba(0,0,0,0.07)', overflow: 'hidden', marginBottom: 18,
        }}>
          <div style={{
            height: '100%', width: `${((idx + 1) / totalRounds) * 100}%`,
            background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
            borderRadius: 99, transition: 'width 0.4s ease',
          }} />
        </div>
        <p className="scl-qtext">{q.question}</p>
        <div className="scl-opts">
          {q.options.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrectChoice = answered && i === correctIdx;
            const isWrongChoice = isSelected && !(i === correctIdx);
            let cls = 'scl-opt';
            if (isCorrectChoice) cls += ' correct';
            if (isWrongChoice) cls += ' wrong';
            return (
              <button
                key={i}
                className={cls}
                onClick={() => handleChoose(i)}
                disabled={answered}
              >
                <span className="scl-mk">{LETTERS[i]}</span>
                <span>{opt}</span>
                <span style={{ marginLeft: 'auto', fontSize: '15px' }}>
                  {isCorrectChoice ? '✅' : isWrongChoice ? '❌' : ''}
                </span>
              </button>
            );
          })}
        </div>
        <p className="scl-feedback" id="feedback">
          {answered
            ? (selected === correctIdx
                ? '✅ Betul! Syabas!'
                : `❌ Jawapan betul: ${q.answer}`)
            : ''}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            className="scl-qbtn"
            hidden={!answered}
            onClick={handleNext}
          >
            {idx + 1 >= totalRounds
              ? (language === 'bm' ? 'Lihat Keputusan →' : 'See Results →')
              : (language === 'bm' ? 'Seterusnya →' : 'Next →')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Tahun1LessonScrollLayout({
  onBack,
  language = 'bm',
  breadcrumb = '',
  breadcrumbActive = '',
  title,
  lead,
  icon,
  theme = DEFAULT_THEME,
  topics,
  questions: allQuestions,
  totalRounds = 10,
  accentColor = '#E8568A',
}) {
  const learnRef = useRef(null);
  const quizRef = useRef(null);
  const [pool, setPool] = useState(() => shuffle(allQuestions).slice(0, totalRounds).map(shuffleOptions));
  const [showCelebration, setShowCelebration] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => () => SpeechManager.stopSpeaking(), []);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleChoose = (i) => {
    if (answered) return;
    setAnswered(true);
    setSelected(i);
    const correct = i === correctIdx;
    if (correct) { setScore(s => s + 1); playSound('correct'); }
    else { playSound('wrong'); }
  };

  const handleNext = () => {
    if (idx + 1 < totalRounds) {
      setIdx(i => i + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      setFinished(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2500);
    }
    setTimeout(() => scrollTo(quizRef), 50);
  };

  const handleRestart = () => {
    setQuizStarted(false);
    setIdx(0);
    setScore(0);
    setAnswered(false);
    setSelected(null);
    setFinished(false);
    setShowCelebration(false);
    setPool(shuffle(allQuestions).slice(0, totalRounds).map(shuffleOptions));
  };
  
  const currentQ = pool && pool[idx];
  const correctIdx = currentQ ? currentQ.correctIndex : -1;

  return (
    <>
      <style>{`
        ${FONT_IMPORT}
        :root {
          --scl-rose: ${accentColor};
          --scl-rose-deep: ${theme.dark};
          --scl-rose-soft: ${accentColor}18;
          --scl-gold: #E0A012;
          --scl-green: #2E9C57;
          --scl-ink: ${theme.dark};
          --scl-muted: #8A5670;
          --scl-card-radius: 24px;
        }
        .scl-wrapper { min-height: 100vh; flex-shrink: 0; }
        .scl-topbar {
          position: sticky; top: 0; z-index: 40;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px clamp(16px,4vw,40px);
          background: rgba(255,255,255,.85);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid ${accentColor}2E;
          box-shadow: 0 4px 18px ${theme.dark}12;
        }
        .scl-crumb {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; letter-spacing: .04em; color: var(--scl-muted);
        }
        .scl-hero {
          max-width: 760px; margin: 0 auto;
          padding: clamp(34px,6vw,64px) 24px 10px; text-align: center;
        }
        .scl-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
          color: #fff;
          background: linear-gradient(180deg,${accentColor}cc,${accentColor});
          padding: 7px 18px; border-radius: 999px;
          box-shadow: 0 4px 12px -4px ${theme.dark}80;
        }
        .scl-emoji {
          font-size: clamp(54px,11vw,80px); line-height: 1;
          margin: 18px 0 6px; display: block;
          filter: drop-shadow(0 8px 14px ${theme.dark}48);
          animation: scl-bob 3.4s ease-in-out infinite;
        }
        @keyframes scl-bob {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-9px) rotate(2deg); }
        }
        .scl-h1 {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(30px,6.5vw,48px); line-height: 1.08;
          color: var(--scl-rose-deep); margin: 0 0 14px;
          text-shadow: 0 2px 0 #fff;
        }
        .scl-lead {
          font-size: clamp(15px,2.4vw,18px); font-weight: 500;
          line-height: 1.6; color: var(--scl-muted);
          max-width: 600px; margin: 0 auto; text-wrap: pretty;
        }
        .scl-actions {
          display: flex; flex-wrap: wrap; gap: 14px;
          justify-content: center; margin: 30px auto 8px; padding: 0 24px;
        }
        .scl-btn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(16px,2.6vw,19px); cursor: pointer;
          border: none; border-radius: 999px; padding: 15px 34px;
          display: inline-flex; align-items: center; gap: 10px;
          min-height: 54px;
          transition: transform .18s cubic-bezier(.34,1.56,.64,1),box-shadow .18s ease;
        }
        .scl-btn .scl-ico { font-size: 1.25em; line-height: 1; }
        .scl-btn-primary {
          color: #fff;
          background: linear-gradient(180deg,${accentColor}cc 0%,${accentColor} 55%,${accentColor}99 100%);
          box-shadow: 0 6px 0 ${theme.dark},0 14px 26px -10px ${theme.dark}99;
        }
        .scl-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 9px 0 ${theme.dark},0 20px 32px -10px ${theme.dark}99; }
        .scl-btn-primary:active { transform: translateY(3px); box-shadow: 0 3px 0 ${theme.dark},0 8px 16px -8px ${theme.dark}99; }
        .scl-btn-secondary {
          color: var(--scl-rose-deep); background: #fff;
          box-shadow: 0 6px 0 ${accentColor}44,0 14px 26px -12px ${theme.dark}66;
        }
        .scl-btn-secondary:hover { transform: translateY(-3px); box-shadow: 0 9px 0 ${accentColor}44,0 20px 30px -12px ${theme.dark}66; }
        .scl-btn-secondary:active { transform: translateY(3px); box-shadow: 0 3px 0 ${accentColor}44; }
        .scl-progress {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin: 46px auto 6px;
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 14px; color: var(--scl-rose-deep);
        }
        .scl-progress .scl-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--scl-rose);
          box-shadow: 0 0 0 4px ${accentColor}2E;
        }
        .scl-sec-title {
          text-align: center; font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(22px,4vw,30px); color: var(--scl-rose-deep);
          margin: 4px 0 4px;
        }
        .scl-sec-sub {
          text-align: center; font-size: 13px; letter-spacing: .14em;
          text-transform: uppercase; font-weight: 600;
          color: var(--scl-muted); margin: 0 0 36px;
        }
        .scl-grid {
          max-width: 1080px; margin: 0 auto;
          padding: 0 clamp(16px,4vw,28px) 30px;
          display: flex; flex-wrap: wrap; justify-content: center;
          gap: 24px;
        }
        .scl-card {
          position: relative;
          background: linear-gradient(180deg,#fff,#FEF4F8);
          border-radius: var(--scl-card-radius);
          padding: 26px 22px 28px;
          border: 1px solid ${accentColor}28;
          box-shadow: 0 14px 34px -16px ${theme.dark}48,0 2px 6px ${theme.dark}0D;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          gap: 13px;
          transition: transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s ease;
          cursor: default;
          flex: 1 1 100%;
          min-width: 280px;
          max-width: 380px;
        }
        .scl-card:hover { transform: translateY(-8px); box-shadow: 0 26px 50px -18px ${theme.dark}66; }
        .scl-card:active { transform: translateY(-3px) scale(.99); }
        @media(min-width:600px){.scl-card{flex:1 1 calc((100% - 24px) / 2);max-width:none}}
        @media(min-width:980px){.scl-card{flex:1 1 calc((100% - 48px) / 3)}}
        .scl-num {
          position: absolute; top: 14px; left: 16px;
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 13px;
          color: #fff;
          background: linear-gradient(180deg,${accentColor}cc,${accentColor});
          width: 30px; height: 30px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 8px -2px ${theme.dark}80;
        }
        .scl-stage {
          width: 120px; height: 120px; border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          background: ${theme.stageGradient};
          box-shadow: inset 0 -7px 20px ${theme.dark}33,inset 0 2px 0 rgba(255,255,255,.5);
          margin-top: 6px;
        }
        .scl-stage svg { width: 78%; height: 78%; overflow: visible; }
        .scl-stage .scl-emoji-only { font-size: 3.2rem; line-height: 1; }
        .scl-ctitle {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: 19px; color: var(--scl-rose-deep); margin: 2px 0 0;
        }
        .scl-csub {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 24px; letter-spacing: .08em;
          text-transform: uppercase; color: var(--scl-rose); margin: 0;
        }
        .scl-cdesc {
          font-size: 13.5px; font-weight: 500; line-height: 1.55;
          color: var(--scl-muted); margin: 2px 0 0; text-wrap: pretty;
        }
        .scl-sound-btn {
          font-family: 'Fredoka', sans-serif; font-weight: 700;
          font-size: 0.72rem; color: var(--scl-rose-deep);
          background: rgba(255,255,255,0.45); border: none; border-radius: 999px;
          padding: 3px 12px; cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: background .15s;
        }
        .scl-sound-btn:hover { background: rgba(255,255,255,0.7); }
        .scl-quiz { max-width: 680px; margin: 20px auto 0; padding: 0 clamp(16px,4vw,28px) 60px; }
        .quiz-card {
          background: linear-gradient(180deg,#fff,#FEF4F8);
          border-radius: 28px; border: 1px solid ${accentColor}28;
          box-shadow: 0 18px 44px -18px ${theme.dark}4D;
        }
        .scl-qprog {
          font-family: 'Baloo 2', sans-serif; font-weight: 700;
          font-size: 13px; color: var(--scl-muted);
        }
        .scl-qtext {
          font-size: clamp(16px,2.6vw,19px); font-weight: 600;
          line-height: 1.5; margin: 0 0 20px; color: var(--scl-ink);
        }
        .scl-opts { display: flex; flex-direction: column; gap: 12px; }
        .scl-opt {
          font-family: 'Fredoka', sans-serif; font-weight: 600; font-size: 15px;
          text-align: left; cursor: pointer;
          background: #fff; border: 2px solid ${accentColor}40;
          border-radius: 16px; padding: 15px 18px; min-height: 52px;
          color: var(--scl-ink); display: flex; align-items: center; gap: 12px;
          transition: all .18s ease;
        }
        .scl-opt .scl-mk {
          width: 26px; height: 26px; border-radius: 50%;
          background: ${accentColor}18; color: var(--scl-rose-deep);
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 14px;
          display: flex; align-items: center; justify-content: center; flex: none;
        }
        .scl-opt:hover:not(:disabled) {
          border-color: var(--scl-rose); transform: translateX(3px);
          background: ${accentColor}18;
        }
        .scl-opt.correct {
          border-color: var(--scl-green); background: #E6F7EC; color: #1B6B38;
        }
        .scl-opt.correct .scl-mk { background: var(--scl-green); color: #fff; }
        .scl-opt.wrong {
          border-color: #E05A5A; background: #FCE9E9; color: #A32626;
        }
        .scl-opt.wrong .scl-mk { background: #E05A5A; color: #fff; }
        .scl-opt:disabled { cursor: default; }
        .scl-feedback {
          margin-top: 18px; font-family: 'Baloo 2', sans-serif;
          font-weight: 700; font-size: 15px; min-height: 24px; text-align: center;
        }
        .scl-qbtn {
          font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: 16px;
          cursor: pointer; border: none; border-radius: 999px; padding: 13px 30px;
          color: #fff;
          background: linear-gradient(180deg,${accentColor}cc,${accentColor}99);
          box-shadow: 0 5px 0 ${theme.dark};
          transition: transform .15s ease;
        }
        .scl-qbtn:hover { transform: translateY(-2px); }
        .scl-qbtn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${theme.dark}; }
        .scl-qbtn[hidden] { display: none; }
        .scl-result-score {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(34px,8vw,52px); color: var(--scl-rose-deep); margin: 6px 0;
        }
        .scl-foot { text-align: center; padding: 10px 20px 50px; color: var(--scl-muted); font-size: 12.5px; font-weight: 500; }

        .floatA { animation: scl-floatA 3.6s ease-in-out infinite; transform-origin: center; }
        @keyframes scl-floatA { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        .pulse { animation: scl-pulse 2.2s ease-in-out infinite; }
        @keyframes scl-pulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }

        @media(prefers-reduced-motion:reduce){*{animation:none!important;scroll-behavior:auto}}
      `}</style>

      <div className="scl-wrapper" style={{
        backgroundImage: theme.pageGradient,
        backgroundRepeat: 'no-repeat',
        backgroundColor: theme.pageColor || '#F2C4D7',
        fontFamily: "'Fredoka',system-ui,sans-serif",
        color: 'var(--scl-ink)',
      }}>
        <div className="scl-topbar" style={{ justifyContent: 'center', gap: '8px' }}>
          <div style={{ position: 'absolute', left: 'clamp(16px,4vw,40px)' }}>
            <BackButton onClick={onBack} />
          </div>
          {breadcrumbActive ? (
            <span className="scl-crumb" style={{ textAlign: 'center' }}>
              {breadcrumb}<span style={{ color: 'var(--scl-rose-deep)', fontWeight: 800 }}>{breadcrumbActive}</span>
            </span>
          ) : (
            <span className="scl-crumb" style={{ textAlign: 'center' }}>{breadcrumb}</span>
          )}
        </div>

        <header className="scl-hero">
          <span className="scl-badge">
            {language === 'bm' ? 'Pendidikan Islam · Tahun 1' : 'Islamic Education · Year 1'}
          </span>
          <span className="scl-emoji">{icon}</span>
          <h1 className="scl-h1">{title}</h1>
          <p className="scl-lead">{lead}</p>
        </header>

        <div className="scl-actions">
          <button className="scl-btn scl-btn-primary" onClick={() => scrollTo(learnRef)}>
            <span className="scl-ico">📖</span>
            {language === 'bm' ? 'Belajar' : 'Learn'}
          </button>
          <button className="scl-btn scl-btn-secondary" onClick={() => scrollTo(quizRef)}>
            <span className="scl-ico">🎯</span>
            {language === 'bm' ? 'Kuiz' : 'Quiz'}
          </button>
        </div>

        <section ref={learnRef} id="learn">
          <div className="scl-progress">
            <span className="scl-dot"></span>
            {topics.length} {language === 'bm' ? 'Topik Pembelajaran' : 'Learning Topics'}
          </div>
          <h2 className="scl-sec-title">
            {language === 'bm' ? 'Topik Pembelajaran' : 'Learning Topics'}
          </h2>
          <p className="scl-sec-sub">
            {language === 'bm' ? 'Ketuk setiap kad untuk belajar' : 'Tap each card to learn'}
          </p>

          <div className="scl-grid">
            {topics.map((t, i) => (
              <article className="scl-card" key={i}>
                <span className="scl-num">{i + 1}</span>
                <div className="scl-stage">
                  {t.visual}
                </div>
                <p className="scl-csub">{t.sublabel}</p>
                <h3 className="scl-ctitle">{t.title}</h3>
                <p className="scl-cdesc">{t.desc}</p>
                <button
                  className="scl-sound-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    SpeechManager.stopSpeaking();
                    SpeechManager.speak(t.desc, 'ms-MY', { rate: 0.8 });
                  }}
                >
                  🔊 Dengar
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="scl-quiz" ref={quizRef} id="quiz" style={{ position: 'relative' }}>
          {showCelebration && <Celebration count={20} />}
          <QuizSection
            quizStarted={quizStarted}
            pool={pool}
            idx={idx}
            score={score}
            answered={answered}
            selected={selected}
            correctIdx={correctIdx}
            totalRounds={totalRounds}
            language={language}
            accentColor={accentColor}
            handleStart={() => setQuizStarted(true)}
            handleChoose={handleChoose}
            handleNext={handleNext}
            handleRestart={handleRestart}
            finished={finished}
          />
        </section>

        <p className="scl-foot">ImanGenius · Pendidikan Islam</p>
      </div>
    </>
  );
}
