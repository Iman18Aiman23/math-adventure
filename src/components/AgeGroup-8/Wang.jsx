import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

// Malaysian money denominations (Grade 2 level)
const NOTES = [
  { value: 1, color: '#1976D2', dark: '#0D47A1', label: 'RM1' },
  { value: 5, color: '#388E3C', dark: '#1B5E20', label: 'RM5' },
  { value: 10, color: '#D32F2F', dark: '#B71C1C', label: 'RM10' },
  { value: 20, color: '#F57C00', dark: '#E65100', label: 'RM20' },
  { value: 50, color: '#7B1FA2', dark: '#4A148C', label: 'RM50' },
];

// Items for shopping scenarios
const SHOP_ITEMS = [
  { name: { bm: 'Roti', eng: 'Bread' }, emoji: '🍞', price: 3 },
  { name: { bm: 'Susu', eng: 'Milk' }, emoji: '🥛', price: 5 },
  { name: { bm: 'Pisang', eng: 'Banana' }, emoji: '🍌', price: 2 },
  { name: { bm: 'Buku', eng: 'Book' }, emoji: '📕', price: 8 },
  { name: { bm: 'Pensel', eng: 'Pencil' }, emoji: '✏️', price: 1 },
  { name: { bm: 'Bola', eng: 'Ball' }, emoji: '⚽', price: 10 },
  { name: { bm: 'Mainan', eng: 'Toy' }, emoji: '🧸', price: 15 },
  { name: { bm: 'Aiskrim', eng: 'Ice Cream' }, emoji: '🍦', price: 4 },
];

// Get note breakdown for a value (max 5 notes for display)
function getNotesBreakdown(value) {
  const breakdown = [];
  let remaining = value;
  const sortedNotes = [...NOTES].sort((a, b) => b.value - a.value);

  for (const note of sortedNotes) {
    while (remaining >= note.value && breakdown.length < 6) {
      breakdown.push(note);
      remaining -= note.value;
    }
    if (breakdown.length >= 6) break;
  }
  return breakdown;
}

// Generate question for each mechanic
function generateQuestion(mechanic) {
  if (mechanic === 'kenali') {
    // Identify total value from notes shown
    const noteCount = Math.floor(Math.random() * 3) + 2; // 2-4 notes
    const selectedNotes = [];
    for (let i = 0; i < noteCount; i++) {
      const randomNote = NOTES[Math.floor(Math.random() * 4)]; // exclude RM50 for kenali
      selectedNotes.push(randomNote);
    }
    const total = selectedNotes.reduce((sum, n) => sum + n.value, 0);

    return {
      type: 'kenali',
      question_bm: 'Berapa jumlah wang ini?',
      question_eng: 'How much money is this?',
      notes: selectedNotes,
      answer: `RM${total}`,
      options: generateMoneyOptions(total),
      explanation_bm: `Jumlah: ${selectedNotes.map(n => n.label).join(' + ')} = RM${total}`,
    };
  } else if (mechanic === 'beli') {
    // Shopping: calculate total of 2-3 items
    const itemCount = Math.floor(Math.random() * 2) + 2; // 2-3 items
    const items = [];
    for (let i = 0; i < itemCount; i++) {
      items.push(SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)]);
    }
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return {
      type: 'beli',
      question_bm: `Berapa harga semua barang ini?`,
      question_eng: `What is the total price?`,
      items: items,
      answer: `RM${total}`,
      options: generateMoneyOptions(total),
      explanation_bm: `${items.map(i => `${i.name.bm} (RM${i.price})`).join(' + ')} = RM${total}`,
    };
  } else {
    // Change calculation: bought item, paid X, what's the change?
    const item = SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)];
    const possiblePayments = [10, 20, 50].filter(p => p > item.price);
    const paid = possiblePayments[Math.floor(Math.random() * possiblePayments.length)];
    const change = paid - item.price;

    return {
      type: 'baki',
      question_bm: `Ali beli ${item.name.bm} berharga RM${item.price}. Ali bayar RM${paid}. Berapa baki?`,
      question_eng: `Ali bought ${item.name.eng} for RM${item.price}. Ali paid RM${paid}. How much is the change?`,
      item: item,
      paid: paid,
      answer: `RM${change}`,
      options: generateMoneyOptions(change),
      explanation_bm: `Baki = RM${paid} - RM${item.price} = RM${change}`,
    };
  }
}

function generateMoneyOptions(correctAnswer) {
  const options = [correctAnswer];
  while (options.length < 3) {
    let wrong;
    const variance = Math.floor(Math.random() * 8) + 1;
    if (Math.random() > 0.5) {
      wrong = correctAnswer + variance;
    } else {
      wrong = correctAnswer - variance;
    }
    if (wrong > 0 && wrong !== correctAnswer && !options.includes(wrong)) {
      options.push(wrong);
    }
  }
  return options.sort(() => Math.random() - 0.5).map(v => `RM${v}`);
}

const TOTAL_QUESTIONS = 12;
const QUESTIONS_PER_MECHANIC = 4;

// Money note component (visual)
function MoneyNote({ note }) {
  return (
    <div style={{
      background: note.color,
      color: 'white',
      padding: '0.6rem 0.9rem',
      borderRadius: '8px',
      fontWeight: 800,
      fontSize: '1rem',
      boxShadow: `0 3px 0 ${note.dark}`,
      minWidth: '70px',
      textAlign: 'center',
      border: '2px solid white',
      outline: `2px solid ${note.dark}`,
    }}>
      {note.label}
    </div>
  );
}

export default function Wang({ onBack, language = 'bm' }) {
  const [qIdx, setQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [mechanicStats, setMechanicStats] = useState({
    kenali: { correct: 0, total: 0 },
    beli: { correct: 0, total: 0 },
    baki: { correct: 0, total: 0 },
  });

  // Generate questions for this session
  const questions = useMemo(() => {
    const qs = [];
    const mechanics = ['kenali', 'beli', 'baki'];
    mechanics.forEach(mechanic => {
      for (let i = 0; i < QUESTIONS_PER_MECHANIC; i++) {
        qs.push(generateQuestion(mechanic));
      }
    });
    return qs.sort(() => Math.random() - 0.5);
  }, []);

  const question = questions[qIdx];
  const isCorrect = selectedAnswer === question.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === question.answer) {
      playSound('correct');
      setScore(s => s + 10);
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: {
          correct: prev[question.type].correct + 1,
          total: prev[question.type].total + 1,
        },
      }));
      confetti({ particleCount: 40, spread: 55 });
    } else {
      playSound('incorrect');
      setMechanicStats(prev => ({
        ...prev,
        [question.type]: {
          correct: prev[question.type].correct,
          total: prev[question.type].total + 1,
        },
      }));
    }
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
    setMechanicStats({
      kenali: { correct: 0, total: 0 },
      beli: { correct: 0, total: 0 },
      baki: { correct: 0, total: 0 },
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
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>💰</div>
        <h2 style={{ color: '#1CB0F6', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '1.5rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{TOTAL_QUESTIONS * 10}
        </p>

        {/* Stats by mechanic */}
        <div style={{ background: '#FFF', borderRadius: '12px', padding: '1rem', marginBottom: '2rem', maxWidth: '400px', width: '100%' }}>
          <h3 style={{ color: '#1CB0F6', fontSize: '1rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {language === 'bm' ? 'Keputusan Setiap Jenis' : 'Results by Type'}
          </h3>
          {['kenali', 'beli', 'baki'].map(type => {
            const label = { kenali: '💵 Kenali Wang', beli: '🛒 Beli-belah', baki: '💰 Baki' }[type];
            const stats = mechanicStats[type];
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            return (
              <div key={type} style={{ marginBottom: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontWeight: 600, color: '#333' }}>{label}</span>
                  <span style={{ color: pct >= 75 ? '#4CAF50' : '#FF6B6B', fontWeight: 700 }}>
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

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#1CB0F6', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Wang' : 'Money'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Belajar wang Ringgit Malaysia' : 'Learn Malaysian Ringgit'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(28,176,246,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Soalan ${qIdx + 1}/${TOTAL_QUESTIONS}` : `Q${qIdx + 1}/${TOTAL_QUESTIONS}`}
          </span>
          <span style={{ fontWeight: 'bold', color: '#1CB0F6' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Question card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #1CB0F6', padding: '1.1rem 1.25rem', marginBottom: '1rem' }}>

          {/* Type indicator badge */}
          <div style={{ display: 'inline-block', background: '#E3F2FD', color: '#1CB0F6', padding: '0.3rem 0.7rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {question.type === 'kenali' && '💵 Kenali Wang'}
            {question.type === 'beli' && '🛒 Beli-belah'}
            {question.type === 'baki' && '💰 Baki'}
          </div>

          {/* Visual: Money notes for kenali */}
          {question.type === 'kenali' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.6rem' }}>
              {question.notes.map((note, idx) => (
                <MoneyNote key={idx} note={note} />
              ))}
            </div>
          )}

          {/* Visual: Items for beli (shopping) */}
          {question.type === 'beli' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {question.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '0.6rem 0.9rem', borderRadius: '8px', border: '2px solid #BBDEFB' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontSize: '1.8rem' }}>{item.emoji}</span>
                      <span style={{ fontWeight: 600, color: '#333' }}>
                        {language === 'bm' ? item.name.bm : item.name.eng}
                      </span>
                    </div>
                    <span style={{ fontWeight: 700, color: '#1CB0F6', fontSize: '1.1rem' }}>RM{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Visual: Item + paid amount for baki */}
          {question.type === 'baki' && (
            <div style={{ background: '#E3F2FD', borderRadius: '8px', padding: '1.5rem 1rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'white', padding: '0.8rem 1.2rem', borderRadius: '8px', border: '2px solid #BBDEFB' }}>
                <span style={{ fontSize: '2.5rem' }}>{question.item.emoji}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#333', fontSize: '1rem' }}>
                    {language === 'bm' ? question.item.name.bm : question.item.name.eng}
                  </div>
                  <div style={{ fontWeight: 700, color: '#1CB0F6', fontSize: '1.1rem' }}>RM{question.item.price}</div>
                </div>
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#666' }}>
                {language === 'bm' ? 'Bayar dengan' : 'Paid with'}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
                {getNotesBreakdown(question.paid).map((note, idx) => (
                  <MoneyNote key={idx} note={note} />
                ))}
              </div>
            </div>
          )}

          {/* Question text */}
          <div style={{ background: '#FFF9C4', borderLeft: '4px solid #FBC02D', padding: '0.9rem 1rem', marginBottom: '1rem', borderRadius: '6px' }}>
            <p style={{ fontSize: '1rem', color: '#333', margin: '0', fontWeight: 600, lineHeight: 1.5 }}>
              {language === 'bm' ? question.question_bm : question.question_eng}
            </p>
          </div>

          {/* Options */}
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

          {/* Feedback */}
          {isAnswered && (
            <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', marginTop: '1rem' }}>
              <div style={{ marginBottom: '0.4rem' }}>
                {isCorrect
                  ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
                  : (language === 'bm' ? `❌ Tidak betul. Jawapan: ${question.answer}` : `❌ Wrong. Answer: ${question.answer}`)}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.9 }}>
                {question.explanation_bm}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#D0F0FF', borderTop: '2px solid rgba(28,176,246,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleResetQuestion} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#1CB0F6' : '#7FD4FF', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #0B8DC0' : 'none', transition: 'background 0.2s' }}>
          {qIdx < TOTAL_QUESTIONS - 1
            ? (language === 'bm' ? 'Soalan Seterusnya →' : 'Next Question →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
