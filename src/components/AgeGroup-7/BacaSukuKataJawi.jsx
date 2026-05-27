import React, { useState, useCallback } from 'react';
import { RefreshCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import { SUKU_KATA_DATA } from '../../utils/jawiSukuKataData';
import BackButton from '../BackButton';

// Age 7 Jawi — KSSR Pendidikan Islam Obj 10 (Membaca tulisan jawi)
// Show a Jawi syllable glyph (e.g. با); child picks its correct rumi reading.
// Step up from Age 4-6 letter recognition → reading at the syllable (suku kata) level.
const JAWI_FONT = "'Traditional Arabic','Scheherazade New','Amiri','Noto Naskh Arabic',serif";
const ROUNDS = 10;

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Flatten SUKU_KATA_DATA into a single list, tagging each syllable with its base letter.
const FLAT_SYLLABLES = Object.entries(SUKU_KATA_DATA).flatMap(([letter, list]) =>
  list.map((s) => ({ ...s, letter }))
);

const generateRounds = () => {
  const answers = shuffle(FLAT_SYLLABLES).slice(0, ROUNDS);

  return answers.map((answer) => {
    // Distractors must come from DIFFERENT base letters so their Jawi glyphs
    // differ from the one shown — otherwise two options could both be valid
    // readings of the same glyph (e.g. بو = "Bu" or "Bo").
    const distractors = [];
    const usedRumi = new Set([answer.rumi]);
    for (const cand of shuffle(FLAT_SYLLABLES)) {
      if (distractors.length >= 3) break;
      if (cand.letter === answer.letter) continue;
      if (usedRumi.has(cand.rumi)) continue;
      usedRumi.add(cand.rumi);
      distractors.push(cand.rumi);
    }
    return {
      jawi: answer.jawi,
      answer: answer.rumi,
      bunyi: answer.bunyi,
      opts: shuffle([answer.rumi, ...distractors]),
    };
  });
};

export default function BacaSukuKataJawi({ onBack, language = 'bm' }) {
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
    if (!isAnswered) return;
    if (roundIdx < rounds.length - 1) {
      setRoundIdx(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 120, spread: 80 });
      setIsDone(true);
    }
  }, [isAnswered, roundIdx, rounds.length]);

  const handleReset = useCallback(() => {
    setRounds(generateRounds());
    setRoundIdx(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionStyle = (name) => {
    if (!isAnswered) return { bg: '#FFF', border: '#FF9600', color: '#333' };
    if (name === round.answer)    return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (name === selectedAnswer)  return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔤</div>
        <h2 style={{ color: '#FF9600', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{rounds.length * 10}
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

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#FFE9CC', overflow: 'hidden' }}>
      <BackButton onClick={onBack} />

      {/* Header */}
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Baca Suku Kata Jawi' : 'Read Jawi Syllables'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pilih bunyi yang betul untuk suku kata ini' : 'Pick the correct sound for this syllable'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,150,0,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Soalan' : 'Question'} {roundIdx + 1}/{rounds.length}
          </span>
          <span style={{ fontWeight: 'bold', color: '#FF9600' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Jawi syllable display */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #FF9600', padding: '1.5rem', marginBottom: '1.25rem', textAlign: 'center', position: 'relative' }}>
          <p style={{ fontSize: '0.82rem', color: '#888', marginBottom: '0.5rem', fontWeight: 600 }}>
            {language === 'bm' ? 'Bunyi apakah suku kata ini?' : 'What sound is this syllable?'}
          </p>
          <div style={{ fontSize: '5.5rem', fontWeight: 900, color: '#333', lineHeight: 1.2, fontFamily: JAWI_FONT, direction: 'rtl' }}>
            {round.jawi}
          </div>
          <button onClick={handleListen}
            style={{ position: 'absolute', top: '12px', right: '12px', background: '#FFE9CC', border: '2px solid #FFD299', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FF9600' }}
            title={language === 'bm' ? 'Dengar' : 'Listen'}>
            <Volume2 size={20} />
          </button>
        </div>

        {/* Reading choices — 2×2 grid */}
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
            <div style={{ marginBottom: '0.35rem' }}>
              {isCorrect
                ? (language === 'bm' ? `✅ Betul! Bunyinya "${round.answer}"` : `✅ Correct! It reads "${round.answer}"`)
                : (language === 'bm' ? `❌ Salah. Jawapan: "${round.answer}"` : `❌ Wrong! Answer: "${round.answer}"`)}
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 'normal', opacity: 0.9 }}>
              {round.bunyi}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ flexShrink: 0, background: '#FFE9CC', borderTop: '2px solid rgba(255,150,0,0.25)', padding: '0.75rem 1rem', display: 'flex', gap: '0.75rem' }}>
        <button onClick={handleReset} style={{ flex: 1, padding: '0.75rem', background: '#E0E0E0', color: '#555', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <RefreshCw size={16} />
          {language === 'bm' ? 'Semula' : 'Reset'}
        </button>
        <button onClick={handleNext} disabled={!isAnswered}
          style={{ flex: 1, padding: '0.75rem', background: isAnswered ? '#FF9600' : '#FFCF80', color: 'white', border: 'none', borderRadius: '10px', cursor: isAnswered ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: isAnswered ? '0 4px 0 #D47A00' : 'none', transition: 'background 0.2s' }}>
          {roundIdx < rounds.length - 1
            ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
