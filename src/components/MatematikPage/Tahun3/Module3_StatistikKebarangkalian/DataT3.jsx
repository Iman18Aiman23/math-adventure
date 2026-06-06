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

const LABELS_BM = ['Epal', 'Oren', 'Pisang', 'Anggur'];
const LABELS_EN = ['Apple', 'Orange', 'Banana', 'Grape'];
const BAR_COLORS = ['#7C3AED', '#A855F7', '#C084FC', '#D8B4FE'];

function BarChart({ data }) {
  const chartW = 300;
  const chartH = 170;
  const padL = 45;
  const padB = 30;
  const maxVal = Math.max(...data.map(d => d.value));
  const yMax = Math.ceil(maxVal / 2) * 2 || 2;
  const drawW = chartW - padL;
  const drawH = chartH - padB;
  const barCount = data.length;
  const barGap = 8;
  const barW = (drawW - barGap * (barCount - 1)) / barCount;

  return (
    <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: '100%', maxWidth: chartW, display: 'block' }}>
      {[0, Math.round(yMax / 2), yMax].map((v, vi) => {
        const y = drawH - (v / yMax) * drawH + 10;
        return (
          <g key={vi}>
            <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="10" fill="#888">{v}</text>
            <line x1={padL} y1={y} x2={chartW} y2={y} stroke="#E5E7EB" strokeWidth="0.5" />
          </g>
        );
      })}
      {data.map((d, i) => {
        const barH = (d.value / yMax) * drawH;
        const x = padL + i * (barW + barGap);
        const y = drawH - barH + 10;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx={6} fill={BAR_COLORS[i % BAR_COLORS.length]} />
            <text x={x + barW / 2} y={chartH - 6} textAnchor="middle" fontSize="10" fill="#6B7280" fontWeight="600">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function generateQuestion(mechanic) {
  const data = shuffle([0, 1, 2, 3]).map(i => ({
    label: LABELS_BM[i],
    labelEn: LABELS_EN[i],
    value: randInt(2, 9),
  }));

  if (mechanic === 'carta-palang') {
    const target = data[randInt(0, data.length - 1)];
    const wrongs = shuffle(
      [target.value - 1, target.value + 1, target.value - 2, target.value + 2, randInt(1, 4), randInt(6, 10)]
        .filter(n => n !== target.value && n >= 1 && n <= 10)
    ).slice(0, 3);
    const options = shuffle([target.value.toString(), ...wrongs.map(String)]);
    return {
      type: 'carta-palang',
      question_bm: 'Berapakah nilai bagi ' + target.label.toLowerCase() + '?',
      question_eng: 'What is the value of ' + target.labelEn.toLowerCase() + '?',
      data,
      options,
      answer: target.value.toString(),
      explanation_bm: target.label + ' mempunyai nilai ' + target.value + '.',
    };
  } else if (mechanic === 'tafsir') {
    const askMax = Math.random() < 0.5;
    const sorted = [...data].sort((a, b) => a.value - b.value);
    const correct = askMax ? sorted[sorted.length - 1] : sorted[0];
    const optionLabels = shuffle(data.map(d => d.label));
    return {
      type: 'tafsir',
      question_bm: askMax ? 'Nilai yang manakah paling tinggi?' : 'Nilai yang manakah paling rendah?',
      question_eng: askMax ? 'Which has the highest value?' : 'Which has the lowest value?',
      data,
      options: optionLabels,
      answer: correct.label,
      explanation_bm: correct.label + ' mempunyai nilai ' + correct.value + ', ' + (askMax ? 'paling tinggi' : 'paling rendah') + '.',
    };
  } else {
    const shuffled = shuffle([...data]);
    const a = shuffled[0];
    const b = shuffled[1];
    const diff = Math.abs(a.value - b.value);
    const wrongs = shuffle(
      [diff - 1, diff + 1, diff - 2, diff + 2, randInt(1, 3), randInt(5, 9)]
        .filter(n => n !== diff && n >= 0 && n <= 12)
    ).slice(0, 3);
    const options = shuffle([diff.toString(), ...wrongs.map(String)]);
    return {
      type: 'kira',
      question_bm: 'Berapa beza antara ' + a.label.toLowerCase() + ' dan ' + b.label.toLowerCase() + '?',
      question_eng: 'What is the difference between ' + a.labelEn.toLowerCase() + ' and ' + b.labelEn.toLowerCase() + '?',
      data,
      options,
      answer: diff.toString(),
      explanation_bm: 'Beza: ' + a.label + ' (' + a.value + ') - ' + b.label + ' (' + b.value + ') = ' + diff + '.',
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;
const MECHANICS = ['carta-palang', 'tafsir', 'kira'];

export default function DataT3({ onBack, language = 'bm' }) {
  const [isStarted, setIsStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mechanicStats, setMechanicStats] = useState({
    'carta-palang': { correct: 0, total: 0 },
    tafsir: { correct: 0, total: 0 },
    kira: { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    MECHANICS.forEach(mechanic => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) {
        qs.push(generateQuestion(mechanic));
      }
    });
    return shuffle(qs);
  }, []);

  const question = questions[qIdx];
  const isCorrect = selectedAnswer === question?.answer;

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
      playSound('wrong');
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: { correct: prev[question.type].correct, total: prev[question.type].total + 1 },
      }));
    }
    setIsAnswered(true);
  }, [isAnswered, qIdx]);

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
    setMechanicStats({
      'carta-palang': { correct: 0, total: 0 },
      tafsir: { correct: 0, total: 0 },
      kira: { correct: 0, total: 0 },
    });
  }, []);

  const handleStart = useCallback(() => setIsStarted(true), []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#D8B4FE', color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (!isStarted) {
    return (
      <div style={{ minHeight: '100%', background: 'linear-gradient(135deg,#F3E8FF 0%,#D8B4FE 50%,#7E22CE 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
        <BackButton onClick={onBack} />
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📈</div>
          <h1 style={{ color: '#FFF', fontSize: '2.2rem', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            {language === 'bm' ? 'Pengurusan Data' : 'Data Management'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            {language === 'bm' ? 'Belajar membaca carta palang, tafsir data, dan kira beza!' : 'Learn to read bar charts, interpret data, and find differences!'}
          </p>
          <button onClick={handleStart}
            style={{ padding: '1rem 3rem', background: '#FFF', color: '#7E22CE', border: 'none', borderRadius: '16px', fontSize: '1.4rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 6px 0 #6B21A8', transition: 'all 0.1s' }}>
            {language === 'bm' ? 'Mula!' : 'Start!'}
          </button>
        </div>
      </div>
    );
  }

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: 'linear-gradient(135deg,#F3E8FF 0%,#D8B4FE 50%,#7E22CE 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🏆</div>
        <h2 style={{ color: '#FFF', fontSize: '2rem', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.9)', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS}
        </p>
        <div style={{ background: '#FFF', borderRadius: '16px', padding: '1.2rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: '#7E22CE', fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
          </h3>
          {MECHANICS.map(type => {
            const label = { 'carta-palang': '📊 Carta Palang', 'tafsir': '🔍 Tafsir', 'kira': '🧮 Kira' }[type];
            const stats = mechanicStats[type];
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            return (
              <div key={type} style={{ marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#333', fontSize: '0.9rem' }}>{label}</span>
                  <span style={{ color: pct >= 75 ? '#4CAF50' : '#FF6B6B', fontWeight: 700, fontSize: '0.9rem' }}>
                    {stats.correct}/{stats.total} ({pct}%)
                  </span>
                </div>
                <div style={{ background: '#E0E0E0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: pct >= 75 ? '#4CAF50' : '#FF6B6B', height: '100%', width: pct + '%', transition: 'width 0.3s' }} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.8)', color: '#7E22CE', border: 'none', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#FFF', color: '#7E22CE', border: '2px solid #7E22CE', borderRadius: '12px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg,#F3E8FF 0%,#D8B4FE 50%,#7E22CE 100%)', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FFF', marginBottom: '0.25rem', fontSize: '1.6rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            {language === 'bm' ? 'Pengurusan Data' : 'Data Management'}
          </h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,255,255,0.25)', borderRadius: '12px' }}>
          <span style={{ color: '#FFF', fontSize: '0.9rem', fontWeight: 600 }}>
            {language === 'bm' ? 'Soalan ' + (qIdx + 1) + '/' + TOTAL_QUESTIONS : 'Q' + (qIdx + 1) + '/' + TOTAL_QUESTIONS}
          </span>
          <span style={{ fontWeight: 'bold', color: '#FFF' }}>⭐ {score}</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #D8B4FE', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block', background: '#F3E8FF', color: '#7E22CE', padding: '0.3rem 0.7rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {question.type === 'carta-palang' ? '📊 Carta Palang' : question.type === 'tafsir' ? '🔍 Tafsir' : '🧮 Kira'}
          </div>
          <div style={{ background: '#F3E8FF', borderRadius: '12px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <BarChart data={question.data} />
          </div>
          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '8px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5 }}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: '2px solid ' + border, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1.1rem', textAlign: 'center', transition: 'all 0.2s' }}>
                  {option}
                </button>
              );
            })}
          </div>
          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '10px', fontWeight: 'bold', marginTop: '1rem' }}>
              <div style={{ marginBottom: '0.4rem' }}>
                {isCorrect
                  ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                  : (language === 'bm' ? '❌ Tidak betul. Jawapan: ' + question.answer : '❌ Wrong. Answer: ' + question.answer)}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>
                {question.explanation_bm}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ flexShrink: 0, background: 'rgba(255,255,255,0.15)', borderTop: '2px solid rgba(255,255,255,0.3)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: 'rgba(255,255,255,0.7)', color: '#7E22CE', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#7E22CE' : '#D8B4FE', color: 'white', border: 'none', borderRadius: '12px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #6B21A8' : 'none', transition: 'background 0.2s' }}>
          {qIdx < TOTAL_QUESTIONS - 1
            ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
