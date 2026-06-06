import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

const QUESTIONS = [
  { id: 1, hour: 3,  minute: 0,  display: '3:00',  image: '🌅' },
  { id: 2, hour: 6,  minute: 0,  display: '6:00',  image: '🍕' },
  { id: 3, hour: 9,  minute: 0,  display: '9:00',  image: '📚' },
  { id: 4, hour: 12, minute: 0,  display: '12:00', image: '☀️' },
  { id: 5, hour: 3,  minute: 30, display: '3:30',  image: '🎂' },
  { id: 6, hour: 6,  minute: 30, display: '6:30',  image: '🌙' },
];

const hours   = Array.from({ length: 12 }, (_, i) => i + 1);
const minutes = [0, 15, 30, 45];

export default function TimeTeller({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedHour, setSelectedHour]     = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [feedback, setFeedback]         = useState('');
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isDone, setIsDone]             = useState(false);

  const currentQuestion = QUESTIONS[currentIndex];

  const handleHourClick = useCallback((hour) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedHour(hour);
  }, [isAnswered]);

  const handleMinuteClick = useCallback((minute) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedMinute(minute);

    if (selectedHour !== null) {
      if (selectedHour === currentQuestion.hour && minute === currentQuestion.minute) {
        playSound('correct');
        setFeedback('✅ ' + (language === 'bm' ? 'Betul!' : 'Correct!'));
        setScore(s => s + 10);
        confetti({ particleCount: 50, spread: 60 });
      } else {
        playSound('incorrect');
        setFeedback('❌ ' + (language === 'bm' ? 'Cuba lagi!' : 'Try again!'));
      }
      setIsAnswered(true);
    }
  }, [selectedHour, currentQuestion, language]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedHour(null);
      setSelectedMinute(null);
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
    setSelectedHour(null);
    setSelectedMinute(null);
    setFeedback('');
    setIsAnswered(false);
    setIsDone(false);
  }, []);

  // ── Completion screen ──────────────────────────────────────────────────────
  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>⏰</div>
        <h2 style={{ color: '#FF9600', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Ahli Masa!' : 'Time Master!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/60
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
            {language === 'bm' ? 'Pembaca Masa' : 'Time Teller'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Baca waktu analog jam tangan' : 'Read the time on the clock'}
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

        {/* Image & Time Display */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>
            {currentQuestion.image}
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FF9600', padding: '1rem', background: '#FFF', borderRadius: '8px', border: '2px solid #FF9600' }}>
            {currentQuestion.display}
          </div>
        </div>

        {/* Clock Visualization */}
        <div style={{ width: '220px', height: '220px', margin: '0 auto 1.5rem', border: '4px solid #FF9600', borderRadius: '50%', background: '#FFF', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '12px', height: '12px', background: '#FF9600', borderRadius: '50%', position: 'absolute', zIndex: 10 }} />
          <div style={{ position: 'absolute', width: '6px', height: '55px', background: '#FF9600', borderRadius: '3px', transform: `rotate(${(currentQuestion.hour % 12) * 30 + currentQuestion.minute * 0.5}deg)`, transformOrigin: 'center bottom', bottom: '50%' }} />
          <div style={{ position: 'absolute', width: '4px', height: '75px', background: '#FFC107', borderRadius: '2px', transform: `rotate(${currentQuestion.minute * 6}deg)`, transformOrigin: 'center bottom', bottom: '50%' }} />
          {hours.map((h) => {
            const angle = (h - 3) * 30 * (Math.PI / 180);
            const x = 88 * Math.cos(angle);
            const y = 88 * Math.sin(angle);
            return (
              <div key={h} style={{ position: 'absolute', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold', transform: `translate(${x}px, ${y}px)` }}>
                {h}
              </div>
            );
          })}
        </div>

        {/* Hour Selection */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ color: '#333', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pilih jam:' : 'Select hour:'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.4rem' }}>
            {hours.map((h) => (
              <button key={h} onClick={() => handleHourClick(h)} disabled={isAnswered}
                style={{ padding: '0.5rem', background: selectedHour === h ? '#FF9600' : '#FFF', color: selectedHour === h ? 'white' : '#333', border: '2px solid #FF9600', borderRadius: '6px', cursor: isAnswered ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}>
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Minute Selection */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ color: '#333', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pilih minit:' : 'Select minute:'}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
            {minutes.map((m) => (
              <button key={m} onClick={() => handleMinuteClick(m)} disabled={isAnswered || selectedHour === null}
                style={{ padding: '0.75rem', background: selectedMinute === m ? '#FF9600' : '#FFF', color: selectedMinute === m ? 'white' : '#333', border: '2px solid #FF9600', borderRadius: '6px', cursor: (isAnswered || selectedHour === null) ? 'not-allowed' : 'pointer', fontWeight: 'bold', opacity: selectedHour === null ? 0.5 : 1 }}>
                :{String(m).padStart(2, '0')}
              </button>
            ))}
          </div>
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
