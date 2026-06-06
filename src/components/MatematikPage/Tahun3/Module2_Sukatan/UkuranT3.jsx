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

function generateQuestion(mechanic) {
  if (mechanic === 'panjang') {
    const type = randInt(0, 3);
    let question_bm, question_eng, answer, unit, options;
    if (type === 0) {
      const m = randInt(1, 5);
      const cm = m * 100;
      question_bm = `${m}m = ? cm`;
      question_eng = `${m}m = ? cm`;
      answer = String(cm);
      unit = 'cm';
    } else if (type === 1) {
      const cm = randInt(2, 15);
      const mm = cm * 10;
      question_bm = `${cm}cm = ? mm`;
      question_eng = `${cm}cm = ? mm`;
      answer = String(mm);
      unit = 'mm';
    } else if (type === 2) {
      const m = randInt(1, 4);
      const cm = randInt(1, 9) * 10;
      const totalCm = m * 100 + cm;
      question_bm = `${m}m ${cm}cm = ? cm`;
      question_eng = `${m}m ${cm}cm = ? cm`;
      answer = String(totalCm);
      unit = 'cm';
    } else {
      const cm = randInt(1, 12);
      const mm = randInt(1, 9);
      const totalMm = cm * 10 + mm;
      question_bm = `${cm}cm ${mm}mm = ? mm`;
      question_eng = `${cm}cm ${mm}mm = ? mm`;
      answer = String(totalMm);
      unit = 'mm';
    }
    const wrongs = new Set();
    const offset = randInt(1, 5) * (Math.random() < 0.5 ? 1 : -1);
    wrongs.add(String(Math.max(1, Number(answer) + offset)));
    wrongs.add(String(Math.max(1, Number(answer) + offset * 2)));
    wrongs.add(String(Math.max(1, Number(answer) + offset * 3)));
    while (wrongs.size < 3) wrongs.add(String(Math.max(1, Number(answer) + randInt(1, 20))));
    options = shuffle([answer, ...Array.from(wrongs).slice(0, 3)]);
    return { type: 'panjang', question_bm, question_eng, options, answer, unit };
  } else if (mechanic === 'jisim') {
    const isCombined = Math.random() < 0.5;
    let question_bm, question_eng, answer;
    if (isCombined) {
      const kg = randInt(1, 2);
      const g = randInt(1, 9) * 100;
      const total = kg * 1000 + g;
      question_bm = `${kg}kg ${g}g = ? g`;
      question_eng = `${kg}kg ${g}g = ? g`;
      answer = String(total);
    } else {
      const kg = randInt(1, 3);
      question_bm = `${kg}kg = ? g`;
      question_eng = `${kg}kg = ? g`;
      answer = String(kg * 1000);
    }
    const wrongs = new Set();
    const offset = randInt(1, 3) * 100;
    wrongs.add(String(Math.max(100, Number(answer) + offset)));
    wrongs.add(String(Math.max(100, Number(answer) - offset)));
    wrongs.add(String(Math.max(100, Number(answer) + offset * 2)));
    while (wrongs.size < 3) wrongs.add(String(Math.max(100, Number(answer) + randInt(1, 10) * 100)));
    const options = shuffle([answer, ...Array.from(wrongs).slice(0, 3)]);
    return { type: 'jisim', question_bm, question_eng, options, answer, unit: 'g' };
  } else {
    const isCombined = Math.random() < 0.5;
    let question_bm, question_eng, answer;
    if (isCombined) {
      const l = randInt(1, 2);
      const ml = randInt(1, 9) * 100;
      const total = l * 1000 + ml;
      question_bm = `${l}l ${ml}ml = ? ml`;
      question_eng = `${l}l ${ml}ml = ? ml`;
      answer = String(total);
    } else {
      const l = randInt(1, 3);
      question_bm = `${l}l = ? ml`;
      question_eng = `${l}l = ? ml`;
      answer = String(l * 1000);
    }
    const wrongs = new Set();
    const offset = randInt(1, 3) * 100;
    wrongs.add(String(Math.max(100, Number(answer) + offset)));
    wrongs.add(String(Math.max(100, Number(answer) - offset)));
    wrongs.add(String(Math.max(100, Number(answer) + offset * 2)));
    while (wrongs.size < 3) wrongs.add(String(Math.max(100, Number(answer) + randInt(1, 10) * 100)));
    const options = shuffle([answer, ...Array.from(wrongs).slice(0, 3)]);
    return { type: 'cecair', question_bm, question_eng, options, answer, unit: 'ml' };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

const ICONS = { panjang: '📏', jisim: '⚖️', cecair: '🧪' };

const MECHANIC_COLORS = { panjang: '#6366F1', jisim: '#8B5CF6', cecair: '#A855F7' };

export default function UkuranT3({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [started, setStarted] = useState(false);

  const questions = useMemo(() => {
    const qs = [];
    ['panjang', 'jisim', 'cecair'].forEach(mechanic => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) qs.push(generateQuestion(mechanic));
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
      confetti({ particleCount: 40, spread: 55, colors: ['#6366F1', '#8B5CF6', '#A855F7'] });
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, question.answer]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 70, colors: ['#6366F1', '#8B5CF6', '#A855F7'] });
      setIsDone(true);
    }
  }, [isAnswered, qIdx, questions.length]);

  const handleResetGame = useCallback(() => {
    setQIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
    setStarted(false);
  }, []);

  if (!started) {
    return (
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#E0E7FF 0%,#A5B4FC 50%,#4338CA 100%)', padding: '24px', boxSizing: 'border-box' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>📐</div>
        <h1 style={{ fontFamily: "'Baloo 2'", fontSize: '2.2rem', color: '#FFF', margin: '0 0 8px', textAlign: 'center', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          {language === 'bm' ? 'Ukuran' : 'Measurement'}
        </h1>
        <p style={{ fontFamily: 'Fredoka', fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', margin: '0 0 24px', textAlign: 'center' }}>
          {language === 'bm' ? 'Panjang, Jisim & Cecair' : 'Length, Mass & Volume'}
        </p>
        <div style={{ display: 'flex', gap: '16px', marginBottom: '28px' }}>
          {['📏', '⚖️', '🧪'].map((icon, i) => (
            <div key={i} style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', backdropFilter: 'blur(4px)' }}>{icon}</div>
          ))}
        </div>
        <button onClick={() => setStarted(true)}
          style={{ fontFamily: "'Baloo 2'", fontSize: '1.5rem', padding: '14px 48px', background: '#FFF', color: '#4338CA', border: 'none', borderRadius: '60px', cursor: 'pointer', fontWeight: 700, boxShadow: '0 6px 0 rgba(0,0,0,0.15)', transition: 'transform 0.1s' }}>
          {language === 'bm' ? 'Mula' : 'Start'}
        </button>
      </div>
    );
  }

  if (isDone) {
    const pct = Math.round((score / TOTAL_QUESTIONS) * 100);
    return (
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#E0E7FF 0%,#A5B4FC 50%,#4338CA 100%)', padding: '24px', boxSizing: 'border-box' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '16px' }}>{pct >= 80 ? '🏆' : '💪'}</div>
        <h1 style={{ fontFamily: "'Baloo 2'", fontSize: '2rem', color: '#FFF', margin: '0 0 8px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          {language === 'bm' ? 'Selesai!' : 'Complete!'}
        </h1>
        <div style={{ background: 'rgba(255,255,255,0.95)', borderRadius: '20px', padding: '24px 32px', marginBottom: '24px', textAlign: 'center', width: '100%', maxWidth: '320px', boxSizing: 'border-box' }}>
          <p style={{ fontFamily: 'Fredoka', fontSize: '1rem', color: '#666', margin: '0 0 8px' }}>
            {language === 'bm' ? 'Markah Anda' : 'Your Score'}
          </p>
          <p style={{ fontFamily: "'Baloo 2'", fontSize: '3rem', color: MECHANIC_COLORS[['panjang', 'jisim', 'cecair'][randInt(0, 2)]], margin: '0' }}>
            {score}/{TOTAL_QUESTIONS}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handleResetGame}
            style={{ fontFamily: "'Baloo 2'", fontSize: '1.1rem', padding: '12px 28px', background: 'rgba(255,255,255,0.3)', color: '#FFF', border: '2px solid rgba(255,255,255,0.5)', borderRadius: '60px', cursor: 'pointer', fontWeight: 700 }}>
            {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
          </button>
          <button onClick={onBack}
            style={{ fontFamily: "'Baloo 2'", fontSize: '1.1rem', padding: '12px 28px', background: '#FFF', color: '#4338CA', border: 'none', borderRadius: '60px', cursor: 'pointer', fontWeight: 700, boxShadow: '0 4px 0 rgba(0,0,0,0.1)' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  const color = MECHANIC_COLORS[question.type];
  const icon = ICONS[question.type];
  const typeLabel = {
    panjang: language === 'bm' ? 'Panjang' : 'Length',
    jisim: language === 'bm' ? 'Jisim' : 'Mass',
    cecair: language === 'bm' ? 'Cecair' : 'Volume',
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg,#E0E7FF 0%,#A5B4FC 50%,#4338CA 100%)', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '56px 16px 12px', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <h1 style={{ fontFamily: "'Baloo 2'", color: '#FFF', margin: '0 0 4px', fontSize: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>
            {language === 'bm' ? 'Ukuran' : 'Measurement'}
          </h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
          <span style={{ fontFamily: 'Fredoka', color: '#FFF', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}
          </span>
          <span style={{ fontFamily: "'Baloo 2'", color: '#FFF' }}>⭐ {score}</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 16px', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '20px', border: `2px solid ${color}`, padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.5rem' }}>{icon}</span>
            <span style={{ fontFamily: 'Fredoka', fontWeight: 700, color, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{typeLabel[question.type]}</span>
          </div>
          <div style={{ background: '#EEF2FF', borderRadius: '12px', padding: '20px', marginBottom: '16px', textAlign: 'center' }}>
            <span style={{ fontFamily: "'Baloo 2'", fontSize: '1.8rem', color, letterSpacing: '1px' }}>{question.question_bm}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {question.options.map((option, idx) => {
              let bg = '#F8FAFF', borderColor = '#E0E7FF', txtColor = '#333';
              if (isAnswered) {
                if (option === question.answer) { bg = '#D4EDDA'; borderColor = '#4CAF50'; txtColor = '#155724'; }
                else if (option === selectedAnswer) { bg = '#FFE0E0'; borderColor = '#FF6B6B'; txtColor = '#721C24'; }
                else { bg = '#F5F5F5'; borderColor = '#E0E0E0'; txtColor = '#BBB'; }
              }
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ fontFamily: "'Baloo 2'", padding: '14px 16px', fontSize: '1.3rem', background: bg, color: txtColor, border: `2px solid ${borderColor}`, borderRadius: '14px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 700, textAlign: 'center', transition: 'all 0.15s', boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
                  {option} {question.unit ? <span style={{ fontFamily: 'Fredoka', fontWeight: 500, fontSize: '1rem', opacity: 0.7 }}>{question.unit}</span> : null}
                </button>
              );
            })}
          </div>
          {isAnswered && (
            <div style={{ padding: '14px', background: isCorrect ? '#D4EDDA' : '#FFE0E0', color: isCorrect ? '#155724' : '#721C24', borderRadius: '12px', fontWeight: 700, marginTop: '14px', fontFamily: 'Fredoka', fontSize: '0.95rem' }}>
              {isCorrect
                ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                : (language === 'bm' ? `❌ Jawapan: ${question.answer} ${question.unit}` : `❌ Answer: ${question.answer} ${question.unit}`)}
            </div>
          )}
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: '12px 16px', display: 'flex', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.3)' }}>
        <button onClick={() => { setSelectedAnswer(null); setIsAnswered(false); }}
          style={{ flex: 1, fontFamily: "'Baloo 2'", padding: '12px', background: 'rgba(255,255,255,0.2)', color: '#FFF', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '14px', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', backdropFilter: 'blur(4px)' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, fontFamily: "'Baloo 2'", padding: '12px', background: isAnswered ? '#FFF' : 'rgba(255,255,255,0.3)', color: isAnswered ? '#4338CA' : 'rgba(255,255,255,0.5)', border: 'none', borderRadius: '14px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 700, fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s' }}>
          {qIdx < TOTAL_QUESTIONS - 1
            ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
