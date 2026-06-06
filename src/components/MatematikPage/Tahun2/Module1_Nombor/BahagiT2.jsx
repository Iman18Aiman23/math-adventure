import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;
const ACCENT = '#14B8A6';
const DARK = '#0F766E';

function GroupVisual({ dividend, divisor }) {
  const fullGroups = Math.floor(dividend / divisor);
  const remaining = dividend % divisor;
  const items = [];
  for (let g = 0; g < fullGroups; g++) {
    const group = [];
    for (let i = 0; i < divisor; i++) group.push(true);
    items.push(group);
  }
  if (remaining > 0) {
    const group = [];
    for (let i = 0; i < remaining; i++) group.push(true);
    items.push(group);
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
      {items.map((group, gi) => (
        <div key={gi} style={{
          display: 'flex', gap: '6px', padding: '8px 14px',
          background: 'rgba(20, 184, 166, 0.07)',
          borderRadius: '12px', border: '2px dashed rgba(20, 184, 166, 0.25)',
        }}>
          {group.map((_, ci) => (
            <div key={ci} style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: 'linear-gradient(135deg,#2DD4BF,#0F766E)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '12px', fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}>
              ★
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function generateQuestion(mechanic) {
  if (mechanic === 'kumpul') {
    const divisor = randInt(2, 5);
    const maxQ = Math.min(Math.floor(30 / divisor), 8);
    const quotient = randInt(2, maxQ);
    const dividend = divisor * quotient;
    const wrongs = new Set();
    wrongs.add(quotient + 1);
    wrongs.add(Math.max(1, quotient - 1));
    while (wrongs.size < 3) wrongs.add(randInt(1, 10));
    wrongs.delete(quotient);
    const options = shuffle([quotient.toString(), ...Array.from(wrongs).slice(0, 3).map(n => n.toString())]);
    return {
      type: 'kumpul',
      question_bm: `Ada ${dividend} ★. Setiap kumpulan ada ${divisor} ★. Ada berapa kumpulan?`,
      question_eng: `There are ${dividend} ★. Each group has ${divisor} ★. How many groups?`,
      dividend, divisor, quotient,
      options,
      answer: quotient.toString(),
      explanation_bm: `${dividend} ÷ ${divisor} = ${quotient}. Ada ${quotient} kumpulan.`,
      explanation_eng: `${dividend} ÷ ${divisor} = ${quotient}. There are ${quotient} groups.`,
    };
  } else if (mechanic === 'kira') {
    const divisor = randInt(2, 10);
    const maxQ = Math.min(Math.floor(100 / divisor), 12);
    const quotient = randInt(2, maxQ);
    const dividend = divisor * quotient;
    const wrongs = new Set();
    for (let i = 0; i < 6; i++) {
      const offset = randInt(-5, 5);
      if (offset !== 0 && quotient + offset >= 1) wrongs.add(quotient + offset);
    }
    while (wrongs.size < 3) wrongs.add(randInt(1, 15));
    wrongs.delete(quotient);
    const options = shuffle([quotient.toString(), ...Array.from(wrongs).slice(0, 3).map(n => n.toString())]);
    return {
      type: 'kira',
      question_bm: `${dividend} ÷ ${divisor} = ?`,
      question_eng: `${dividend} ÷ ${divisor} = ?`,
      dividend, divisor, quotient,
      options,
      answer: quotient.toString(),
      explanation_bm: `${dividend} ÷ ${divisor} = ${quotient}.`,
      explanation_eng: `${dividend} ÷ ${divisor} = ${quotient}.`,
    };
  } else {
    const scenarios = [
      {
        bm: (d, q) => `Ada ${d} biji gula-gula. ${q} orang kawan nak kongsi sama banyak. Setiap orang dapat berapa?`,
        eng: (d, q) => `There are ${d} candies. ${q} friends share equally. How many does each get?`,
        emoji: '🍬',
        item: 'gula-gula',
      },
      {
        bm: (d, q) => `Cikgu ada ${d} biji pensel. ${q} orang murid nak kongsi sama banyak. Setiap murid dapat berapa?`,
        eng: (d, q) => `The teacher has ${d} pencils. ${q} students share equally. How many does each get?`,
        emoji: '✏️',
        item: 'pensel',
      },
      {
        bm: (d, q) => `Ada ${d} biji kek cawan. ${q} orang tetamu nak kongsi sama banyak. Setiap tetamu dapat berapa?`,
        eng: (d, q) => `There are ${d} cupcakes. ${q} guests share equally. How many does each get?`,
        emoji: '🧁',
        item: 'kek cawan',
      },
    ];
    const divisor = randInt(2, 6);
    const maxQ = Math.min(Math.floor(30 / divisor), 10);
    const quotient = randInt(2, maxQ);
    const dividend = divisor * quotient;
    const scenario = scenarios[randInt(0, scenarios.length - 1)];
    const wrongs = new Set();
    for (let i = 0; i < 6; i++) {
      const offset = randInt(-3, 3);
      if (offset !== 0 && quotient + offset >= 1) wrongs.add(quotient + offset);
    }
    while (wrongs.size < 3) wrongs.add(randInt(1, 10));
    wrongs.delete(quotient);
    const options = shuffle([quotient.toString(), ...Array.from(wrongs).slice(0, 3).map(n => n.toString())]);
    return {
      type: 'kongsikan',
      question_bm: scenario.bm(dividend, divisor),
      question_eng: scenario.eng(dividend, divisor),
      dividend, divisor, quotient, scenario,
      options,
      answer: quotient.toString(),
      explanation_bm: `${dividend} ÷ ${divisor} = ${quotient}. Setiap orang dapat ${quotient} ${scenario.item}.`,
      explanation_eng: `${dividend} ÷ ${divisor} = ${quotient}. Each person gets ${quotient} ${scenario.item}.`,
    };
  }
}

const styles = {
  container: {
    height: '100%', display: 'flex', flexDirection: 'column',
    background: 'linear-gradient(135deg,#CCFBF1 0%,#5EEAD4 50%,#0F766E 100%)',
    overflow: 'hidden',
  },
  header: {
    flexShrink: 0, padding: '3.5rem 1rem 0.75rem',
    maxWidth: '600px', width: '100%', alignSelf: 'center',
    boxSizing: 'border-box',
  },
  headerTitle: {
    textAlign: 'center', marginBottom: '0.85rem',
  },
  title: {
    color: DARK, marginBottom: '0.25rem', fontSize: '1.6rem',
    fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
  },
  subtitle: {
    color: '#115E59', fontSize: '0.9rem',
    fontFamily: "'Fredoka',sans-serif",
  },
  progressBar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '0.65rem 1rem', background: 'rgba(255,255,255,0.35)',
    borderRadius: '10px',
  },
  progressText: {
    color: '#115E59', fontSize: '0.9rem',
    fontFamily: "'Fredoka',sans-serif", fontWeight: 600,
  },
  scoreText: {
    fontWeight: 'bold', color: DARK,
    fontFamily: "'Baloo 2',sans-serif", fontSize: '1.1rem',
  },
  body: {
    flex: 1, overflowY: 'auto',
    padding: '0.75rem 1rem 1rem',
    maxWidth: '600px', width: '100%', alignSelf: 'center',
    boxSizing: 'border-box',
  },
  card: {
    background: '#FFF', borderRadius: '16px',
    border: `2px solid ${ACCENT}`, padding: '1.1rem 1.25rem',
    marginBottom: '1rem',
  },
  badge: {
    display: 'inline-block', background: '#CCFBF1',
    color: DARK, padding: '0.3rem 0.7rem',
    borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700,
    marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px',
    fontFamily: "'Fredoka',sans-serif",
  },
  visualBox: {
    background: '#CCFBF1', borderRadius: '12px',
    padding: '1.5rem 1rem', marginBottom: '1rem',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    flexDirection: 'column', gap: '0.5rem',
  },
  questionBox: {
    background: '#FFF9C4', borderLeft: '4px solid #F59E0B',
    padding: '0.9rem 1rem', marginBottom: '1rem',
    borderRadius: '6px',
  },
  questionText: {
    fontSize: '1rem', color: '#333', margin: '0',
    fontWeight: 600, lineHeight: 1.5,
    fontFamily: "'Fredoka',sans-serif",
  },
  optionsContainer: {
    display: 'flex', flexDirection: 'column', gap: '0.55rem',
  },
  optionBtn: (bg, border, color, anim) => ({
    padding: '0.8rem 1rem', background: bg, color,
    border: `2px solid ${border}`, borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center',
    transition: 'all 0.2s',
    fontFamily: "'Fredoka',sans-serif",
    animation: anim || 'none',
  }),
  feedbackBox: (correct) => ({
    padding: '0.85rem 1rem',
    background: correct ? '#D4EDDA' : '#F8D7DA',
    color: correct ? '#155724' : '#721C24',
    borderRadius: '10px', fontWeight: 'bold',
    marginTop: '1rem',
    fontFamily: "'Fredoka',sans-serif",
  }),
  feedbackExplanation: {
    fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9,
    marginTop: '0.3rem',
  },
  actionBar: {
    flexShrink: 0,
    background: 'linear-gradient(135deg,rgba(204,251,241,0.8),rgba(94,234,212,0.8))',
    borderTop: `2px solid rgba(15,118,110,0.2)`,
    padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem',
  },
  actionBtn: (bg, color, disabled) => ({
    flex: 1, padding: '0.75rem', background: bg, color,
    border: 'none', borderRadius: '12px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 'bold', fontSize: '1rem',
    fontFamily: "'Baloo 2',sans-serif",
    boxShadow: disabled ? 'none' : `0 4px 0 ${DARK}`,
    transition: 'background 0.2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
  }),
};

export default function BahagiT2({ onBack, language = 'bm' }) {
  const [started, setStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shakeIdx, setShakeIdx] = useState(null);
  const [mechanicStats, setMechanicStats] = useState({
    kumpul: { correct: 0, total: 0 },
    kira: { correct: 0, total: 0 },
    kongsikan: { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['kumpul', 'kira', 'kongsikan'].forEach(mechanic => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) {
        qs.push(generateQuestion(mechanic));
      }
    });
    return shuffle(qs);
  }, []);

  const question = questions[qIdx];
  const isCorrect = selectedAnswer === question.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    if (option === question.answer) {
      playSound('correct');
      setScore(s => s + 1);
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: { correct: prev[question.type].correct + 1, total: prev[question.type].total + 1 },
      }));
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
      const idx = question.options.indexOf(option);
      setShakeIdx(idx);
      setTimeout(() => setShakeIdx(null), 500);
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: { correct: prev[question.type].correct, total: prev[question.type].total + 1 },
      }));
    }
    setIsAnswered(true);
  }, [isAnswered, question.answer, question.type, question.options]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShakeIdx(null);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70 });
      setIsDone(true);
    }
  }, [isAnswered, qIdx, questions.length]);

  const handleResetQuestion = useCallback(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShakeIdx(null);
  }, []);

  const handleResetGame = useCallback(() => {
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
    setShakeIdx(null);
    setMechanicStats({
      kumpul: { correct: 0, total: 0 },
      kira: { correct: 0, total: 0 },
      kongsikan: { correct: 0, total: 0 },
    });
  }, []);

  const getOptionStyle = (option, idx) => {
    if (!isAnswered) return { bg: '#FFF', border: ACCENT, color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (!started) {
    return (
      <div style={{
        minHeight: '100%',
        background: 'linear-gradient(135deg,#CCFBF1 0%,#5EEAD4 50%,#0F766E 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '2rem',
      }}>
        <BackButton onClick={onBack} />
        <div style={{
          background: '#FFF', borderRadius: '24px', padding: '2.5rem 2rem',
          maxWidth: '400px', width: '100%', textAlign: 'center',
          boxShadow: '0 8px 32px rgba(15,118,110,0.2)',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>➗</div>
          <h1 style={{
            color: DARK, fontSize: '2.2rem', marginBottom: '0.5rem',
            fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
          }}>
            {language === 'bm' ? 'Bahagi' : 'Division'}
          </h1>
          <p style={{
            color: '#115E59', fontSize: '1.1rem', marginBottom: '2rem',
            fontFamily: "'Fredoka',sans-serif", fontWeight: 500,
          }}>
            {language === 'bm'
              ? 'Belajar asas pembahagian dengan seronok!'
              : 'Learn the basics of division the fun way!'}
          </p>
          <button onClick={() => setStarted(true)} style={{
            padding: '1rem 3rem', background: `linear-gradient(135deg,${ACCENT},${DARK})`,
            color: 'white', border: 'none', borderRadius: '16px',
            fontSize: '1.5rem', cursor: 'pointer', fontWeight: 800,
            fontFamily: "'Baloo 2',sans-serif",
            boxShadow: `0 6px 0 #0D5E52`,
            transition: 'transform 0.1s',
          }}
            onMouseDown={e => e.currentTarget.style.transform = 'translateY(3px)'}
            onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {language === 'bm' ? 'Mula!' : 'Start!'}
          </button>
        </div>
      </div>
    );
  }

  if (isDone) {
    return (
      <div style={{
        minHeight: '100%',
        background: 'linear-gradient(135deg,#CCFBF1 0%,#5EEAD4 50%,#0F766E 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '2rem',
      }}>
        <BackButton onClick={onBack} />
        <div style={{
          background: '#FFF', borderRadius: '24px', padding: '2rem',
          maxWidth: '420px', width: '100%', textAlign: 'center',
          boxShadow: '0 8px 32px rgba(15,118,110,0.2)',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{
            color: DARK, fontSize: '2rem', marginBottom: '0.5rem',
            fontFamily: "'Baloo 2',sans-serif", fontWeight: 800,
          }}>
            {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
          </h2>
          <p style={{
            fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem',
            fontFamily: "'Fredoka',sans-serif",
          }}>
            {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS}
          </p>
          <div style={{
            background: '#F0FDFA', borderRadius: '12px', padding: '1rem',
            marginBottom: '2rem', maxWidth: '400px', width: '100%',
          }}>
            <h3 style={{
              color: DARK, fontSize: '1rem', marginBottom: '0.8rem',
              textAlign: 'center', fontFamily: "'Baloo 2',sans-serif",
            }}>
              {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
            </h3>
            {[
              { key: 'kumpul', label: '📦 Kumpul' },
              { key: 'kira', label: '🧮 Kira' },
              { key: 'kongsikan', label: '🤝 Kongsikan' },
            ].map(({ key, label }) => {
              const stats = mechanicStats[key];
              const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
              return (
                <div key={key} style={{ marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 600, color: '#333', fontFamily: "'Fredoka',sans-serif" }}>{label}</span>
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
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={handleResetGame} style={{
              padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333',
              border: 'none', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer',
              fontWeight: 'bold', fontFamily: "'Baloo 2',sans-serif",
            }}>
              {language === 'bm' ? 'Cuba Lagi' : 'Play Again'}
            </button>
            <button onClick={onBack} style={{
              padding: '0.75rem 1.5rem', background: `linear-gradient(135deg,${ACCENT},${DARK})`,
              color: 'white', border: 'none', borderRadius: '12px', fontSize: '1rem',
              cursor: 'pointer', fontWeight: 'bold',
              fontFamily: "'Baloo 2',sans-serif",
            }}>
              {language === 'bm' ? 'Kembali' : 'Back'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
          20%, 40%, 60%, 80% { transform: translateX(6px); }
        }
      `}</style>
      <BackButton onClick={onBack} />
      <div style={styles.header}>
        <div style={styles.headerTitle}>
          <h1 style={styles.title}>
            {language === 'bm' ? 'Bahagi' : 'Division'}
          </h1>
          <p style={styles.subtitle}>
            {language === 'bm' ? 'Belajar asas pembahagian' : 'Learn division basics'}
          </p>
        </div>
        <div style={styles.progressBar}>
          <span style={styles.progressText}>
            {language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}
          </span>
          <span style={styles.scoreText}>⭐ {score}</span>
        </div>
      </div>
      <div style={styles.body}>
        <div style={styles.card}>
          <div style={styles.badge}>
            {question.type === 'kumpul' && '📦 Kumpul'}
            {question.type === 'kira' && '🧮 Kira'}
            {question.type === 'kongsikan' && '🤝 Kongsikan'}
          </div>
          {question.type === 'kumpul' && (
            <div style={styles.visualBox}>
              <GroupVisual dividend={question.dividend} divisor={question.divisor} />
            </div>
          )}
          {question.type === 'kira' && (
            <div style={{
              ...styles.visualBox,
              background: 'linear-gradient(135deg,#CCFBF1,#F0FDFA)',
            }}>
              <div style={{
                fontSize: '2.5rem', fontWeight: 800, color: DARK,
                fontFamily: "'Baloo 2',sans-serif",
                letterSpacing: '2px',
              }}>
                {question.dividend} ÷ {question.divisor} = ?
              </div>
            </div>
          )}
          {question.type === 'kongsikan' && (
            <div style={{
              ...styles.visualBox,
              background: 'linear-gradient(135deg,#CCFBF1,#F0FDFA)',
              fontSize: '2.5rem',
            }}>
              {question.scenario.emoji}
            </div>
          )}
          <div style={styles.questionBox}>
            <p style={styles.questionText}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>
          <div style={styles.optionsContainer}>
            {question.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option, idx);
              const anim = shakeIdx === idx ? 'shake 0.5s ease-in-out' : 'none';
              return (
                <button key={idx}
                  onClick={() => handleSelect(option)}
                  disabled={isAnswered}
                  style={styles.optionBtn(bg, border, color, anim)}
                >
                  {option}
                </button>
              );
            })}
          </div>
          {isAnswered && (
            <div style={styles.feedbackBox(isCorrect)}>
              <div>
                {isCorrect
                  ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                  : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
              </div>
              <div style={styles.feedbackExplanation}>
                {language === 'bm' ? question.explanation_bm : question.explanation_eng}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={styles.actionBar}>
        <button onClick={handleResetQuestion}
          style={styles.actionBtn('#E0E0E0', '#555', false)}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext}
          disabled={!isAnswered}
          style={styles.actionBtn(
            isAnswered ? ACCENT : '#A5B4FC',
            'white', !isAnswered
          )}>
          {qIdx < TOTAL_QUESTIONS - 1
            ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
