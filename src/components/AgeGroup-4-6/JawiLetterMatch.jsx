import React, { useState, useCallback } from 'react';
import { RefreshCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import { JAWI_ALPHABET } from '../../utils/jawiData';
import BackButton from '../BackButton';

// Age 4-6 Jawi — Match the Jawi letter to its name (Rumi)
// Shows a big Jawi glyph; child picks the correct name from 4 options.
const JAWI_FONT = "'Traditional Arabic','Scheherazade New','Amiri','Noto Naskh Arabic',serif";
const ROUNDS = 10;

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const generateRounds = () => {
  const pool = shuffle(JAWI_ALPHABET).slice(0, ROUNDS);

  return pool.map((answer) => {
    // Distractor NAMES must differ from the correct name (ت & ط are both "Ta",
    // ح & ه both "Ha") — dedupe by name so only one option is ever correct.
    const distractors = [];
    const usedNames = new Set([answer.rumi]);
    for (const cand of shuffle(JAWI_ALPHABET)) {
      if (distractors.length >= 3) break;
      if (usedNames.has(cand.rumi)) continue;
      usedNames.add(cand.rumi);
      distractors.push(cand.rumi);
    }
    const opts = shuffle([answer.rumi, ...distractors]);
    return { jawi: answer.jawi, answer: answer.rumi, opts };
  });
};

export default function JawiLetterMatch({ onBack, language = 'bm' }) {
  const [rounds, setRounds]                 = useState(generateRounds);
  const [roundIdx, setRoundIdx]             = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]         = useState(false);
  const [score, setScore]                   = useState(0);
  const [isDone, setIsDone]                 = useState(false);

  const round     = rounds[roundIdx];
  const isCorrect = selectedAnswer === round.answer;

  const handleListen = useCallback(() => {
    playHoverSound();
    SpeechManager.speak(round.answer, 'ms');
  }, [round.answer]);

  const handleSelect = useCallback((name) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(name);
    if (name === round.answer) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 55, spread: 60 });
      SpeechManager.speak(round.answer, 'ms');
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, round.answer]);

  const handleNext = useCallback(() => {
    if (roundIdx < rounds.length - 1) {
      setRoundIdx(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 80 });
      setIsDone(true);
    }
  }, [roundIdx, rounds.length]);

  const handleReset = useCallback(() => {
    setRounds(generateRounds());
    setRoundIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionStyle = (name) => {
    if (!isAnswered) return { bg: '#FFF', border: '#58CC02', color: '#333' };
    if (name === round.answer)    return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (name === selectedAnswer)  return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#E6FFD4', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>✍️</div>
        <h2 style={{ color: '#58CC02', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{rounds.length * 10}
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleReset} className="ee-btn ee-btn--muted" style={{ padding: '0.8rem 1.5rem' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} className="ee-btn" style={{ padding: '0.8rem 1.5rem', '--btn-bg': '#58CC02', '--btn-shadow': '#46A302' }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#E6FFD4', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#58CC02', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Padan Huruf Jawi' : 'Match Jawi Letters'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pilih nama yang betul untuk huruf ini' : 'Pick the correct name for this letter'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(88,204,2,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Soalan' : 'Question'} {roundIdx + 1}/{rounds.length}
          </span>
          <span style={{ fontWeight: 'bold', color: '#58CC02' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Jawi glyph display */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #58CC02', padding: '1.5rem', marginBottom: '1.25rem', textAlign: 'center', position: 'relative' }}>
          <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: '0.5rem', fontWeight: 600 }}>
            {language === 'bm' ? 'Huruf apakah ini?' : 'What letter is this?'}
          </p>
          <div style={{ fontSize: '6rem', fontWeight: 900, color: '#333', lineHeight: 1.15, fontFamily: JAWI_FONT, direction: 'rtl' }}>
            {round.jawi}
          </div>
          <button onClick={handleListen}
            style={{ position: 'absolute', top: '12px', right: '12px', background: '#E6FFD4', border: '2px solid #C8F0A8', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#58CC02' }}
            title={language === 'bm' ? 'Dengar' : 'Listen'}>
            <Volume2 size={20} />
          </button>
        </div>

        {/* Name choices — 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          {round.opts.map((name, idx) => {
            const { bg, border, color } = getOptionStyle(name);
            return (
              <button key={idx} onClick={() => handleSelect(name)} disabled={isAnswered}
                style={{ padding: '1.1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1.3rem', transition: 'all 0.2s', textAlign: 'center' }}>
                {name}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', textAlign: 'center' }}>
            {isCorrect
              ? (language === 'bm' ? `✅ Betul! Huruf ini ialah "${round.answer}"` : `✅ Correct! This letter is "${round.answer}"`)
              : (language === 'bm' ? `❌ Salah. Jawapan: "${round.answer}"` : `❌ Wrong! Answer: "${round.answer}"`)}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#E6FFD4', borderTop: '2px solid rgba(88,204,2,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleReset} className="ee-btn ee-btn--muted" style={{ flex: 1 }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          className="ee-btn" style={{ flex: 1, '--btn-bg': '#58CC02', '--btn-shadow': '#46A302' }}>
          {roundIdx < rounds.length - 1
            ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
