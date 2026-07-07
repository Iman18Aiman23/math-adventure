import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

const FRACTIONS = [
  { num: 1, den: 2, label: '1/2' },
  { num: 1, den: 3, label: '1/3' },
  { num: 1, den: 4, label: '1/4' },
  { num: 2, den: 3, label: '2/3' },
  { num: 3, den: 4, label: '3/4' },
];

function CircleFraction({ num, den, size = 150, color = '#8B5CF6' }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.4;
  const slices = [];
  for (let i = 0; i < den; i++) {
    const startAngle = (i * 360) / den - 90;
    const endAngle = ((i + 1) * 360) / den - 90;
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = (endAngle - startAngle) > 180 ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    slices.push(
      <path key={i} d={path} fill={i < num ? color : '#FFF'} stroke="#6D28D9" strokeWidth="2" />
    );
  }
  return <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>{slices}</svg>;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

function generateQuestion(mechanic) {
  const pool = [...FRACTIONS];
  if (mechanic === 'kenali') {
    const f = pool[randInt(0, pool.length - 1)];
    const labels = pool.map(x => x.label);
    const options = shuffle([f.label, ...shuffle(labels.filter(x => x !== f.label)).slice(0, 3)]);
    return {
      type: 'kenali',
      question_bm: 'Apakah pecahan yang ditunjukkan?',
      question_eng: 'What fraction is shown?',
      fraction: f,
      options,
      answer: f.label,
    };
  } else if (mechanic === 'banding') {
    let a, b;
    do { a = pool[randInt(0, pool.length - 1)]; b = pool[randInt(0, pool.length - 1)]; } while (a.label === b.label);
    const askBigger = Math.random() < 0.5;
    const valA = a.num / a.den;
    const valB = b.num / b.den;
    const correctFrac = askBigger ? (valA > valB ? a : b) : (valA < valB ? a : b);
    const labels = pool.map(x => x.label);
    const distractorPool = shuffle(labels.filter(x => x !== a.label && x !== b.label));
    const options = shuffle([a.label, b.label, ...distractorPool.slice(0, 2)]);
    return {
      type: 'banding',
      question_bm: askBigger ? 'Mana lebih besar?' : 'Mana lebih kecil?',
      question_eng: askBigger ? 'Which is bigger?' : 'Which is smaller?',
      fractions: [a, b],
      options,
      answer: correctFrac.label,
    };
  } else {
    const f = pool[randInt(0, pool.length - 1)];
    const nums = [1, 2, 3, 4];
    const options = shuffle([String(f.num), ...shuffle(nums.filter(n => n !== f.num)).slice(0, 3)]);
    return {
      type: 'warna',
      question_bm: `Warnakan ${f.label}. Berapa bahagian perlu diwarnakan?`,
      question_eng: `Shade ${f.label}. How many parts need to be shaded?`,
      fraction: f,
      options,
      answer: String(f.num),
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function PecahanAsasT1({ onBack, language = 'bm' }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mechanicStats, setMechanicStats] = useState({
    kenali: { correct: 0, total: 0 },
    banding: { correct: 0, total: 0 },
    warna: { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['kenali', 'banding', 'warna'].forEach(mechanic => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) {
        qs.push(generateQuestion(mechanic));
      }
    });
    return shuffle(qs);
  }, []);

  const question = questions[qIdx];
  const isCorrect = selectedAnswer === question?.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered || !question) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === question.answer) {
      playSound('correct');
      setScore(s => s + 10);
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: { correct: prev[question.type].correct + 1, total: prev[question.type].total + 1 },
      }));
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: { correct: prev[question.type].correct, total: prev[question.type].total + 1 },
      }));
    }
    setIsAnswered(true);
  }, [isAnswered, question]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('correct');
      confetti({ particleCount: 120, spread: 70 });
      setIsDone(true);
    }
  }, [isAnswered, qIdx, questions.length]);

  const handleResetQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, []);

  const handleResetGame = useCallback(() => {
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
    setMechanicStats({ kenali: { correct: 0, total: 0 }, banding: { correct: 0, total: 0 }, warna: { correct: 0, total: 0 } });
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#fff', border: '#CBD5E1', color: '#1E293B' };
    if (option === question.answer) return { bg: '#22C55E', border: '#22C55E', color: 'white' };
    if (option === selectedAnswer) return { bg: '#EF4444', border: '#EF4444', color: 'white' };
    return { bg: '#fff', border: '#E2E8F0', color: '#94A3B8' };
  };

  if (!gameStarted) {
    return (
      <div style={{ minHeight: '100%', background: 'linear-gradient(135deg,#F3E8FF 0%,#C4B5FD 50%,#6D28D9 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔢</div>
        <h1 style={{ fontFamily: "'Baloo 2',sans-serif", color: '#FFF', fontSize: '2.8rem', marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.15)', textAlign: 'center' }}>
          {language === 'bm' ? 'Pecahan Asas' : 'Basic Fractions'}
        </h1>
        <p style={{ fontFamily: "'Fredoka',sans-serif", color: '#FFF', fontSize: '1.2rem', marginBottom: '2.5rem', textAlign: 'center', opacity: 0.9, maxWidth: '320px' }}>
          {language === 'bm' ? 'Belajar pecahan 1/2, 1/3, 1/4 dan banyak lagi!' : 'Learn fractions 1/2, 1/3, 1/4 and more!'}
        </p>
        <button onClick={() => setGameStarted(true)}
          style={{ padding: '1rem 3rem', background: '#FFF', color: '#6D28D9', border: 'none', borderRadius: '16px', fontSize: '1.5rem', cursor: 'pointer', fontWeight: 800, fontFamily: "'Baloo 2',sans-serif", boxShadow: '0 6px 20px rgba(109,40,217,0.3)', transition: 'transform 0.15s' }}>
          {language === 'bm' ? 'Mula 🎯' : 'Start 🎯'}
        </button>
      </div>
    );
  }

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: 'linear-gradient(135deg,#F3E8FF 0%,#C4B5FD 50%,#6D28D9 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏆</div>
        <h2 style={{ fontFamily: "'Baloo 2',sans-serif", color: '#FFF', fontSize: '2rem', marginBottom: '0.5rem', textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1.4rem', color: '#FFF', marginBottom: '1.5rem', textShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}
        </p>
        <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '16px', padding: '1.25rem', marginBottom: '2rem', maxWidth: '400px', width: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontFamily: "'Baloo 2',sans-serif", color: '#6D28D9', fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
          </h3>
          {['kenali', 'banding', 'warna'].map(type => {
            const labels = {
              kenali: '🔍 Kenali Pecahan',
              banding: '⚖️ Bandingkan',
              warna: '🎨 Warna',
            };
            const stats = mechanicStats[type];
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            return (
              <div key={type} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontFamily: "'Fredoka',sans-serif", fontWeight: 600, color: '#333' }}>{labels[type]}</span>
                  <span style={{ color: pct >= 75 ? '#4CAF50' : '#FF6B6B', fontWeight: 700, fontFamily: "'Fredoka',sans-serif" }}>
                    {stats.correct}/{stats.total} ({pct}%)
                  </span>
                </div>
                <div style={{ background: '#E0E0E0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: pct >= 75 ? '#4CAF50' : '#FF6B6B', height: '100%', width: `${pct}%`, transition: 'width 0.3s' }} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.8)', color: '#6D28D9', border: 'none', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 700, fontFamily: "'Baloo 2',sans-serif" }}>
            {language === 'bm' ? 'Cuba Lagi' : 'Play Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#FFF', color: '#6D28D9', border: 'none', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 700, fontFamily: "'Baloo 2',sans-serif" }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg,#F3E8FF 0%,#C4B5FD 50%,#6D28D9 100%)', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ fontFamily: "'Baloo 2',sans-serif", color: '#FFF', marginBottom: '0.25rem', fontSize: '1.6rem', textShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
            {language === 'bm' ? 'Pecahan Asas' : 'Basic Fractions'}
          </h1>
          <p style={{ fontFamily: "'Fredoka',sans-serif", color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Belajar pecahan 1/2, 1/3, 1/4 dan banyak lagi' : 'Learn fractions 1/2, 1/3, 1/4 and more'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '10px' }}>
          <span style={{ fontFamily: "'Fredoka',sans-serif", color: '#FFF', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}
          </span>
          <span style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, color: '#FFF' }}>⭐ {score}</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #8B5CF6', padding: '1.1rem 1.25rem', marginBottom: '1rem', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'inline-block', background: '#F3E8FF', color: '#6D28D9', padding: '0.3rem 0.7rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, fontFamily: "'Baloo 2',sans-serif", marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {question.type === 'kenali' && '🔍 Kenali Pecahan'}
            {question.type === 'banding' && '⚖️ Bandingkan'}
            {question.type === 'warna' && '🎨 Warna'}
          </div>

          {question.type === 'kenali' && (
            <div style={{ background: '#F5F3FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '0.5rem' }}>
              <CircleFraction num={question.fraction.num} den={question.fraction.den} color="#8B5CF6" />
              <div style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#6D28D9' }}>? / {question.fraction.den}</div>
            </div>
          )}

          {question.type === 'banding' && (
            <div style={{ background: '#F5F3FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <CircleFraction num={question.fractions[0].num} den={question.fractions[0].den} size={120} color="#8B5CF6" />
                  <div style={{ marginTop: '0.5rem', fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, color: '#6D28D9', fontSize: '1.5rem' }}>
                    {question.fractions[0].label}
                  </div>
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#6D28D9' }}>vs</div>
                <div style={{ textAlign: 'center' }}>
                  <CircleFraction num={question.fractions[1].num} den={question.fractions[1].den} size={120} color="#7C3AED" />
                  <div style={{ marginTop: '0.5rem', fontFamily: "'Baloo 2',sans-serif", fontWeight: 700, color: '#7C3AED', fontSize: '1.5rem' }}>
                    {question.fractions[1].label}
                  </div>
                </div>
              </div>
            </div>
          )}

          {question.type === 'warna' && (
            <div style={{ background: '#F5F3FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '0.5rem' }}>
              <CircleFraction num={0} den={question.fraction.den} color="#8B5CF6" />
              <div style={{ fontFamily: "'Baloo 2',sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#6D28D9' }}>0 / {question.fraction.den}</div>
            </div>
          )}

          <div style={{ background: '#F5F3FF', borderLeft: '4px solid #8B5CF6', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <p style={{ fontFamily: "'Fredoka',sans-serif", fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5 }}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>

          <style>{`
            .pf-opt-btn { transition: all 0.2s cubic-bezier(.34,1.56,.64,1); }
            .pf-opt-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(139, 92, 246, 0.2) !important; }
            .pf-opt-btn:active:not(:disabled) { transform: translateY(0); }
          `}</style>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              const optNum = String.fromCharCode(0x2460 + idx);
              return (
                <button key={idx} className="pf-opt-btn" onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 700, fontFamily: "'Fredoka',sans-serif", fontSize: '1.2rem', textAlign: 'center' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: '50%', background: bg === '#22C55E' ? '#22C55E' : bg === '#EF4444' ? '#EF4444' : '#E2E8F0', color: bg === '#22C55E' || bg === '#EF4444' ? '#fff' : '#94A3B8', fontSize: '0.75rem', fontWeight: 900, marginRight: 8, flexShrink: 0 }}>{optNum}</span>
                  {isAnswered && option === question.answer ? `${question.type === 'warna' ? `${option} bahagian` : option} ✓` : isAnswered && option === selectedAnswer ? `${question.type === 'warna' ? `${option} bahagian` : option} ✗` : question.type === 'warna' ? `${option} bahagian` : option}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '10px', fontWeight: 600, fontFamily: "'Fredoka',sans-serif", marginTop: '1rem' }}>
              {isCorrect
                ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
            </div>
          )}
        </div>
      </div>

      <div style={{ flexShrink: 0, background: 'linear-gradient(135deg,#F3E8FF 0%,#C4B5FD 50%,#6D28D9 100%)', borderTop: '2px solid rgba(255,255,255,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.8)', color: '#6D28D9', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontFamily: "'Baloo 2',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#FFF' : 'rgba(255,255,255,0.4)', color: isAnswered ? '#6D28D9' : 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '12px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 800, fontFamily: "'Baloo 2',sans-serif", fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 rgba(0,0,0,0.1)' : 'none', transition: 'background 0.2s' }}>
          {qIdx < TOTAL_QUESTIONS - 1
            ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
