import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import BackButton from '../BackButton';

const QUESTIONS = [
  {
    id: 1,
    coins: [{ value: 5, count: 1 }, { value: 1, count: 3 }],
    total: 8,
    currency: 'sen',
    image: '🪙',
  },
  {
    id: 2,
    coins: [{ value: 10, count: 1 }, { value: 5, count: 2 }],
    total: 20,
    currency: 'sen',
    image: '🪙',
  },
  {
    id: 3,
    coins: [{ value: 50, count: 1 }, { value: 10, count: 2 }, { value: 5, count: 1 }],
    total: 75,
    currency: 'sen',
    image: '💰',
  },
  {
    id: 4,
    coins: [{ value: 1, count: 5 }],
    total: 5,
    currency: 'sen',
    image: '🪙',
  },
  {
    id: 5,
    coins: [{ value: 10, count: 3 }, { value: 5, count: 2 }, { value: 1, count: 4 }],
    total: 44,
    currency: 'sen',
    image: '💵',
  },
];

export default function CountingMoney({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [feedback, setFeedback]         = useState('');
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isDone, setIsDone]             = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];
  const correctAnswer   = currentQuestion.total;

  const options = useMemo(() => {
    const opts = [correctAnswer];
    while (opts.length < 4) {
      const random = Math.floor(Math.random() * 100);
      if (!opts.includes(random) && random !== correctAnswer) opts.push(random);
    }
    return opts.sort(() => Math.random() - 0.5);
  }, [correctAnswer]);

  const handleAnswerClick = useCallback((amount) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAmount(amount);
    if (amount === currentQuestion.total) {
      playSound('correct');
      setFeedback('✅ ' + (language === 'bm' ? 'Betul!' : 'Correct!'));
      setScore(s => s + 10);
      confetti({ particleCount: 50, spread: 60 });
    } else {
      playSound('incorrect');
      setFeedback('❌ ' + (language === 'bm' ? 'Cuba lagi!' : 'Try again!'));
    }
    setIsAnswered(true);
  }, [isAnswered, currentQuestion, language]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAmount(null);
      setFeedback('');
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 100, spread: 70 });
      setIsDone(true);
    }
  }, [currentIndex]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAmount(null);
    setFeedback('');
    setIsAnswered(false);
    setIsDone(false);
  }, []);

  // ── Completion screen ──────────────────────────────────────────────────────
  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>💰</div>
        <h2 style={{ color: '#FF9600', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Ahli Kewangan!' : 'Money Master!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/50
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleReset} style={{ padding: '0.75rem 1.5rem', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} style={{ padding: '0.75rem 1.5rem', background: '#FF9600', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  // ── Game screen ────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* ── Header (sticky) ──────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Pengira Wang' : 'Counting Money'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Kira jumlah wang' : 'Count the total amount'}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,150,0,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Soalan' : 'Question'} {currentIndex + 1}/{QUESTIONS.length}
          </span>
          <span style={{ fontWeight: 'bold', color: '#FF9600' }}>⭐ {score}</span>
        </div>
      </div>

      {/* ── Body (scrollable) ────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem', fontSize: '3rem' }}>
          {currentQuestion.image}
        </div>

        {/* Coins Display */}
        <div style={{ padding: '1.25rem', background: '#FFF', borderRadius: '8px', marginBottom: '1.25rem', border: '2px solid #FF9600' }}>
          <p style={{ color: '#333', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center', fontSize: '0.95rem' }}>
            {language === 'bm' ? 'Kira syiling ini:' : 'Count these coins:'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {currentQuestion.coins.map((coin, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                {Array.from({ length: coin.count }).map((_, i) => (
                  <span key={i} style={{ fontSize: '1.5rem', background: 'rgba(255,150,0,0.1)', width: '46px', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '2px solid #FF9600', fontWeight: 'bold', fontSize: '0.9rem', color: '#FF9600' }}>
                    {coin.value}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div style={{ padding: '1rem', background: 'rgba(255,150,0,0.05)', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
          {currentQuestion.coins.map((coin, idx) => (
            <div key={idx} style={{ marginBottom: '0.4rem', color: '#666' }}>
              {coin.value} {currentQuestion.currency} × {coin.count} = {coin.value * coin.count} {currentQuestion.currency}
            </div>
          ))}
          <div style={{ borderTop: '1px solid #FF9600', paddingTop: '0.5rem', marginTop: '0.5rem', fontWeight: 'bold', color: '#FF9600' }}>
            {language === 'bm' ? 'Jumlah: ' : 'Total: '}{currentQuestion.total} {currentQuestion.currency}
          </div>
        </div>

        {/* Answer Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          {options.map((option, idx) => (
            <button key={idx} onClick={() => handleAnswerClick(option)} disabled={isAnswered}
              style={{ padding: '1rem', background: selectedAmount === option ? (option === currentQuestion.total ? '#4CAF50' : '#FF6B6B') : '#FFF', color: selectedAmount === option ? 'white' : '#333', border: '2px solid ' + (selectedAmount === option ? (option === currentQuestion.total ? '#4CAF50' : '#FF6B6B') : '#FF9600'), borderRadius: '8px', cursor: isAnswered ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1.1rem', transition: 'all 0.3s' }}>
              {option} {currentQuestion.currency}
            </button>
          ))}
        </div>

        {feedback && (
          <div style={{ padding: '0.85rem 1rem', background: feedback.includes('✅') ? '#D4EDDA' : '#F8D7DA', color: feedback.includes('✅') ? '#155724' : '#721C24', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
            {feedback}
          </div>
        )}
      </div>

      {/* ── Footer (sticky) ──────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, background: '#FFE9CC', borderTop: '2px solid rgba(255,150,0,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleReset} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#FF9600' : '#FFCF80', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #D47A00' : 'none', transition: 'background 0.2s' }}>
          {currentIndex < QUESTIONS.length - 1
            ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
