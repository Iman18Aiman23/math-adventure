import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

const OBJECTS = [
  { bm: 'Pensel', eng: 'Pencil', emoji: '✏️', unit: 'cm', sizes: [15, 18, 20] },
  { bm: 'Buku', eng: 'Book', emoji: '📕', unit: 'cm', sizes: [20, 25, 30] },
  { bm: 'Meja', eng: 'Table', emoji: '🪑', unit: 'm', sizes: [1, 2, 3] },
  { bm: 'Pintu', eng: 'Door', emoji: '🚪', unit: 'm', sizes: [2, 3] },
  { bm: 'Pemadam', eng: 'Eraser', emoji: '🧽', unit: 'cm', sizes: [3, 5, 7] },
  { bm: 'Tikar', eng: 'Mat', emoji: '🟫', unit: 'm', sizes: [1, 2] },
  { bm: 'Sudu', eng: 'Spoon', emoji: '🥄', unit: 'cm', sizes: [10, 15, 20] },
  { bm: 'Pokok', eng: 'Tree', emoji: '🌳', unit: 'm', sizes: [3, 5, 10] },
];

function generateQuestion(mechanic) {
  if (mechanic === 'unit') {
    // Choose correct unit (cm or m) for an object
    const obj = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
    const options = ['cm', 'm', 'km'];
    return {
      type: 'unit',
      question_bm: `Apakah unit yang sesuai untuk ukur ${obj.bm.toLowerCase()}?`,
      question_eng: `Which unit is suitable to measure a ${obj.eng.toLowerCase()}?`,
      object: obj,
      options: options.sort(() => Math.random() - 0.5),
      answer: obj.unit,
      explanation_bm: `${obj.bm} biasanya diukur dalam ${obj.unit === 'cm' ? 'sentimeter (cm)' : 'meter (m)'}.`,
    };
  } else if (mechanic === 'banding') {
    // Compare lengths
    const obj1 = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
    const obj2 = OBJECTS[Math.floor(Math.random() * OBJECTS.length)];
    const size1 = obj1.sizes[Math.floor(Math.random() * obj1.sizes.length)];
    const size2 = obj2.sizes[Math.floor(Math.random() * obj2.sizes.length)];

    // Convert all to cm for comparison
    const cm1 = obj1.unit === 'm' ? size1 * 100 : size1;
    const cm2 = obj2.unit === 'm' ? size2 * 100 : size2;

    if (cm1 === cm2) {
      // Force different
      return generateQuestion(mechanic);
    }

    const longer = cm1 > cm2 ? `${obj1.bm} (${size1} ${obj1.unit})` : `${obj2.bm} (${size2} ${obj2.unit})`;
    const shorter = cm1 < cm2 ? `${obj1.bm} (${size1} ${obj1.unit})` : `${obj2.bm} (${size2} ${obj2.unit})`;
    const askLonger = Math.random() > 0.5;

    return {
      type: 'banding',
      question_bm: askLonger ? 'Yang manakah lebih panjang?' : 'Yang manakah lebih pendek?',
      question_eng: askLonger ? 'Which is longer?' : 'Which is shorter?',
      items: [
        { ...obj1, size: size1 },
        { ...obj2, size: size2 },
      ],
      options: [`${obj1.bm} (${size1} ${obj1.unit})`, `${obj2.bm} (${size2} ${obj2.unit})`].sort(() => Math.random() - 0.5),
      answer: askLonger ? longer : shorter,
      explanation_bm: `${askLonger ? longer + ' ialah lebih panjang' : shorter + ' ialah lebih pendek'} (${cm1} cm vs ${cm2} cm).`,
    };
  } else {
    // Story problem
    const a = Math.floor(Math.random() * 20) + 5;
    const b = Math.floor(Math.random() * 15) + 3;
    const op = Math.random() > 0.5 ? 'add' : 'sub';
    const answer = op === 'add' ? a + b : a - b;
    if (op === 'sub' && answer < 0) return generateQuestion(mechanic);

    const stories = op === 'add' ? [
      { bm: `Pita Ali ${a} cm. Pita Adi ${b} cm. Berapa jumlah panjang pita kedua-duanya?`, eng: `Ali's ribbon is ${a} cm. Adi's ribbon is ${b} cm. Total length?` },
      { bm: `Rini ada tali ${a} m dan tali lain ${b} m. Berapa jumlah panjang tali Rini?`, eng: `Rini has ${a} m rope and another ${b} m. Total?` },
    ] : [
      { bm: `Pita panjang ${a} cm. Dipotong ${b} cm. Berapa baki pita?`, eng: `Ribbon is ${a} cm. Cut ${b} cm. How much left?` },
      { bm: `Tali Ali ${a} m. Adi ambil ${b} m. Berapa baki tali Ali?`, eng: `Ali's rope is ${a} m. Adi took ${b} m. How much left?` },
    ];

    const story = stories[Math.floor(Math.random() * stories.length)];
    const unit = story.bm.includes('cm') ? 'cm' : 'm';
    const options = [`${answer} ${unit}`];
    while (options.length < 3) {
      const wrong = answer + (Math.floor(Math.random() * 10) - 5);
      if (wrong > 0 && wrong !== answer && !options.includes(`${wrong} ${unit}`)) options.push(`${wrong} ${unit}`);
    }

    return {
      type: 'cerita',
      question_bm: story.bm,
      question_eng: story.eng,
      options: options.sort(() => Math.random() - 0.5),
      answer: `${answer} ${unit}`,
      explanation_bm: `${a} ${op === 'add' ? '+' : '-'} ${b} = ${answer} ${unit}`,
    };
  }
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

export default function UkuranPanjangTahun2({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [stats, setStats] = useState({
    unit: { correct: 0, total: 0 },
    banding: { correct: 0, total: 0 },
    cerita: { correct: 0, total: 0 },
  });

  const questions = useMemo(() => {
    const qs = [];
    ['unit', 'banding', 'cerita'].forEach(m => {
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
      [question.type]: { correct: prev[question.type].correct + (correct ? 1 : 0), total: prev[question.type].total + 1 },
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

  const handleResetQuestion = useCallback(() => { setSelectedAnswer(null); setIsAnswered(false); }, []);
  const handleResetGame = useCallback(() => {
    setQIdx(0); setSelectedAnswer(null); setIsAnswered(false); setScore(0); setIsDone(false);
    setStats({ unit: { correct: 0, total: 0 }, banding: { correct: 0, total: 0 }, cerita: { correct: 0, total: 0 } });
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📏</div>
        <h2 style={{ color: '#1CB0F6', fontSize: '2rem', marginBottom: '0.5rem' }}>{language === 'bm' ? 'Tahniah!' : 'Well Done!'}</h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>{language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}</p>
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: '#1CB0F6', fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>{language === 'bm' ? 'Keputusan' : 'Results'}</h3>
          {['unit', 'banding', 'cerita'].map(type => {
            const label = { unit: '📐 Pilih Unit', banding: '⚖️ Bandingkan', cerita: '📖 Cerita' }[type];
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
          <button onClick={handleResetGame} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>{language === 'bm' ? 'Main Semula' : 'Play Again'}</button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#1CB0F6', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>{language === 'bm' ? 'Kembali' : 'Back'}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#D0F0FF', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#1CB0F6', marginBottom: '0.25rem', fontSize: '1.6rem' }}>{language === 'bm' ? 'Ukuran Panjang' : 'Length Measurement'}</h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>{language === 'bm' ? 'cm dan meter' : 'cm and meter'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>{language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}</span>
          <span style={{ fontWeight: 'bold', color: '#1CB0F6' }}>⭐ {score}</span>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ display: 'inline-block', background: '#E3F2FD', color: '#1CB0F6', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase' }}>
            {question.type === 'unit' && '📐 Pilih Unit'}
            {question.type === 'banding' && '⚖️ Bandingkan'}
            {question.type === 'cerita' && '📖 Cerita'}
          </div>

          {question.type === 'unit' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '2rem 1rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem' }}>{question.object.emoji}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1CB0F6', marginTop: '0.5rem' }}>{language === 'bm' ? question.object.bm : question.object.eng}</div>
            </div>
          )}

          {question.type === 'banding' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '1rem' }}>
                {question.items.map((item, i) => (
                  <div key={i} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3.5rem' }}>{item.emoji}</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#333', marginTop: '0.3rem' }}>{language === 'bm' ? item.bm : item.eng}</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1CB0F6', marginTop: '0.2rem' }}>{item.size} {item.unit}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {question.type === 'cerita' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem' }}>📏</div>
            </div>
          )}

          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5 }}>{language === 'bm' ? question.question_bm : question.question_eng}</p>
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
              <div style={{ marginBottom: '0.4rem' }}>{isCorrect ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!') : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}</div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>{question.explanation_bm}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ flexShrink: 0, background: '#D0F0FF', borderTop: '2px solid rgba(28,176,246,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />{language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#1CB0F6' : '#7FD4FF', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #0B8DC0' : 'none' }}>
          {qIdx < TOTAL_QUESTIONS - 1 ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →') : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
