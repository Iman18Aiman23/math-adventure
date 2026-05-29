import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

const NUMBER_WORDS_BM = {
  0: 'sifar', 1: 'satu', 2: 'dua', 3: 'tiga', 4: 'empat', 5: 'lima',
  6: 'enam', 7: 'tujuh', 8: 'lapan', 9: 'sembilan', 10: 'sepuluh',
};

function spellNumber(num) {
  if (num < 11) return NUMBER_WORDS_BM[num];
  if (num < 20) return num === 11 ? 'sebelas' : `${NUMBER_WORDS_BM[num - 10]} belas`;
  if (num < 100) {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    const tensPart = tens === 1 ? 'sepuluh' : `${NUMBER_WORDS_BM[tens]} puluh`;
    return ones === 0 ? tensPart : `${tensPart} ${NUMBER_WORDS_BM[ones]}`;
  }
  if (num < 1000) {
    const hundreds = Math.floor(num / 100);
    const rest = num % 100;
    const hundredsPart = hundreds === 1 ? 'seratus' : `${NUMBER_WORDS_BM[hundreds]} ratus`;
    return rest === 0 ? hundredsPart : `${hundredsPart} ${spellNumber(rest)}`;
  }
  return num === 1000 ? 'seribu' : '';
}

function generateQuestion(mechanic) {
  const num = Math.floor(Math.random() * 900) + 100; // 100-999

  if (mechanic === 'sebut') {
    // Spell the number
    const correct = spellNumber(num);
    const options = [correct];
    while (options.length < 3) {
      const wrongNum = Math.floor(Math.random() * 900) + 100;
      const wrong = spellNumber(wrongNum);
      if (!options.includes(wrong)) options.push(wrong);
    }
    return {
      type: 'sebut',
      question_bm: `Apakah ejaan nombor ${num}?`,
      question_eng: `How to spell number ${num}?`,
      number: num,
      options: options.sort(() => Math.random() - 0.5),
      answer: correct,
      explanation_bm: `${num} = ${correct}`,
    };
  } else if (mechanic === 'tempat') {
    // Place value
    const ratus = Math.floor(num / 100);
    const puluh = Math.floor((num % 100) / 10);
    const sa = num % 10;
    const askType = Math.floor(Math.random() * 3);
    let question, answer;
    if (askType === 0) {
      question = `Apakah nilai tempat digit ratus dalam ${num}?`;
      answer = `${ratus} ratus`;
    } else if (askType === 1) {
      question = `Apakah nilai tempat digit puluh dalam ${num}?`;
      answer = `${puluh} puluh`;
    } else {
      question = `Apakah nilai tempat digit sa dalam ${num}?`;
      answer = `${sa} sa`;
    }
    const options = [answer];
    while (options.length < 3) {
      const wrongDigit = Math.floor(Math.random() * 10);
      const wrongType = ['ratus', 'puluh', 'sa'][Math.floor(Math.random() * 3)];
      const wrong = `${wrongDigit} ${wrongType}`;
      if (!options.includes(wrong)) options.push(wrong);
    }
    return {
      type: 'tempat',
      question_bm: question,
      question_eng: `What is the place value in ${num}?`,
      number: num,
      digits: { ratus, puluh, sa },
      options: options.sort(() => Math.random() - 0.5),
      answer: answer,
      explanation_bm: `${num}: ${ratus} ratus, ${puluh} puluh, ${sa} sa.`,
    };
  } else {
    // Compare
    const num1 = Math.floor(Math.random() * 900) + 100;
    let num2 = Math.floor(Math.random() * 900) + 100;
    while (num1 === num2) num2 = Math.floor(Math.random() * 900) + 100;
    const larger = num1 > num2 ? num1 : num2;
    const options = [
      `${num1} > ${num2}`,
      `${num1} < ${num2}`,
      `${num1} = ${num2}`,
    ];
    const answer = num1 > num2 ? `${num1} > ${num2}` : `${num1} < ${num2}`;
    return {
      type: 'banding',
      question_bm: `Bandingkan kedua-dua nombor ini:`,
      question_eng: `Compare these two numbers:`,
      num1, num2,
      options: options,
      answer: answer,
      explanation_bm: `${larger} ialah lebih besar.`,
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function Nombor1000({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [stats, setStats] = useState({
    sebut: { correct: 0, total: 0 },
    tempat: { correct: 0, total: 0 },
    banding: { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['sebut', 'tempat', 'banding'].forEach(m => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) qs.push(generateQuestion(m));
    });
    return qs.sort(() => Math.random() - 0.5);
  }, []);

  const question = questions[qIdx];
  const isCorrect = selectedAnswer === question.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    const correct = option === question.answer;
    if (correct) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
    }
    setStats(prev => ({
      ...prev,
      [question.type]: {
        correct: prev[question.type].correct + (correct ? 1 : 0),
        total: prev[question.type].total + 1,
      },
    }));
    setIsAnswered(true);
  }, [isAnswered, question.answer, question.type]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (qIdx < questions.length - 1) {
      setQIdx(qIdx + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
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
    setStats({
      sebut: { correct: 0, total: 0 },
      tempat: { correct: 0, total: 0 },
      banding: { correct: 0, total: 0 },
    });
  }, []);

  const getOptionStyle = (option) => {
    if (!isAnswered) return { bg: '#FFF', border: '#1CB0F6', color: '#333' };
    if (option === question.answer) return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (option === selectedAnswer) return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#D0F0FF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔢</div>
        <h2 style={{ color: '#1CB0F6', fontSize: '2rem', marginBottom: '0.5rem' }}>{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}
        </p>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: '#1CB0F6', fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
          </h3>
          {['sebut', 'tempat', 'banding'].map(type => {
            const label = { sebut: '📖 Sebut Nombor', tempat: '🔢 Nilai Tempat', banding: '⚖️ Bandingkan' }[type];
            const s = stats[type];
            const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
            return (
              <div key={type} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>{label}</span>
                  <span style={{ color: pct >= 75 ? '#4CAF50' : '#FF6B6B', fontWeight: 700 }}>{s.correct}/{s.total} ({pct}%)</span>
                </div>
                <div style={{ background: '#E0E0E0', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ background: pct >= 75 ? '#4CAF50' : '#FF6B6B', height: '100%', width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#1CB0F6', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#D0F0FF', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#1CB0F6', marginBottom: '0.25rem', fontSize: '1.6rem' }}>{language === 'bm' ? 'Nombor 1-1000' : 'Numbers 1-1000'}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'bm' ? 'Belajar nombor hingga 1000' : 'Learn numbers up to 1000'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>{language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}</span>
          <span style={{ fontWeight: 'bold', color: '#1CB0F6' }}>⭐ {score}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block', background: '#E3F2FD', color: '#1CB0F6', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
            {question.type === 'sebut' && '📖 Sebut Nombor'}
            {question.type === 'tempat' && '🔢 Nilai Tempat'}
            {question.type === 'banding' && '⚖️ Bandingkan'}
          </div>

          {/* Visual */}
          {question.type === 'sebut' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '2rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: 800, color: '#1CB0F6' }}>{question.number}</div>
            </div>
          )}
          {question.type === 'tempat' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem' }}>
                {[
                  { val: question.digits.ratus, label: 'Ratus' },
                  { val: question.digits.puluh, label: 'Puluh' },
                  { val: question.digits.sa, label: 'Sa' },
                ].map((d, i) => (
                  <div key={i} style={{ background: 'white', borderRadius: '8px', padding: '0.8rem 1rem', textAlign: 'center', minWidth: '70px', border: '2px solid #1CB0F6' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1CB0F6' }}>{d.val}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666', fontWeight: 600, marginTop: '0.3rem' }}>{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {question.type === 'banding' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#FF6B6B' }}>{question.num1}</div>
              <div style={{ fontSize: '2rem', color: '#1CB0F6' }}>?</div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#4CAF50' }}>{question.num2}</div>
            </div>
          )}

          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5 }}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {question.options.map((option, idx) => {
              const { bg, border, color } = getOptionStyle(option);
              return (
                <button key={idx} onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ padding: '0.8rem 1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1rem', textAlign: 'center', transition: 'all 0.2s' }}>
                  {option}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem' }}>
              <div style={{ marginBottom: '0.4rem' }}>
                {isCorrect ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!') : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>{question.explanation_bm}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ flexShrink: 0, background: '#D0F0FF', borderTop: '2px solid rgba(28,176,246,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#1CB0F6' : '#7FD4FF', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #0B8DC0' : 'none' }}>
          {qIdx < TOTAL_QUESTIONS - 1 ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →') : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
