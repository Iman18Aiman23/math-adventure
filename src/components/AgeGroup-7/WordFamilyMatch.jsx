import React, { useState, useCallback, useMemo } from 'react';
import { Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';

const ROUNDS = [
  { family: '-at', listen: ['cat', 'bat', 'hat'], correct: ['cat', 'bat', 'hat'], wrong: ['dog', 'pen', 'cup'], image: '🐱' },
  { family: '-an', listen: ['pan', 'fan', 'man'], correct: ['pan', 'fan', 'man'], wrong: ['pit', 'hop', 'bug'], image: '🍳' },
  { family: '-og', listen: ['dog', 'log', 'fog'], correct: ['dog', 'log', 'fog'], wrong: ['cat', 'lid', 'map'], image: '🐕' },
  { family: '-it', listen: ['sit', 'bit', 'hit'], correct: ['sit', 'bit', 'hit'], wrong: ['fan', 'box', 'mud'], image: '💺' },
];

const MAX_WRONG = 3;

export default function WordFamilyMatch({ onBack, language = 'bm' }) {
  const [roundIndex, setRoundIndex]       = useState(0);
  const [score, setScore]                 = useState(0);
  const [correctFound, setCorrectFound]   = useState(new Set());
  const [wrongPicked, setWrongPicked]     = useState(new Set());
  const [wrongCount, setWrongCount]       = useState(0);
  const [roundDone, setRoundDone]         = useState(false);
  const [failed, setFailed]               = useState(false);
  const [isComplete, setIsComplete]       = useState(false);

  const round = ROUNDS[roundIndex];

  const options = useMemo(
    () => [...round.correct, ...round.wrong].sort(() => Math.random() - 0.5),
    [round],
  );

  const handleSelect = useCallback((word) => {
    if (roundDone) return;
    const isCorrect = round.correct.includes(word);

    if (isCorrect) {
      if (correctFound.has(word)) return;
      playSound('correct');
      playHoverSound();
      const next = new Set(correctFound);
      next.add(word);
      setCorrectFound(next);

      if (next.size === round.correct.length) {
        playSound('levelup');
        confetti({ particleCount: 60, spread: 60 });
        setScore(s => s + 10);
        setRoundDone(true);
      }
    } else {
      if (wrongPicked.has(word)) return;
      playSound('incorrect');
      playHoverSound();
      const next = new Set(wrongPicked);
      next.add(word);
      setWrongPicked(next);
      const newCount = wrongCount + 1;
      setWrongCount(newCount);

      if (newCount >= MAX_WRONG) {
        setFailed(true);
        setRoundDone(true);
      }
    }
  }, [roundDone, round, correctFound, wrongPicked, wrongCount]);

  const handleNext = useCallback(() => {
    if (roundIndex < ROUNDS.length - 1) {
      setRoundIndex(i => i + 1);
      setCorrectFound(new Set());
      setWrongPicked(new Set());
      setWrongCount(0);
      setRoundDone(false);
      setFailed(false);
    } else {
      playSound('levelup');
      confetti({ particleCount: 100, spread: 70 });
      setIsComplete(true);
    }
  }, [roundIndex]);

  const handleListen = useCallback(() => {
    SpeechManager.speak(round.listen.join(', '), 'en');
  }, [round]);

  // ── Completion screen ──────────────────────────────────────────────────────
  if (isComplete) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ color: '#FF9600', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/40
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
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
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '560px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Keluarga Perkataan' : 'Word Family Match'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? `Cari 3 perkataan dalam keluarga ${round.family}` : `Find 3 words in the ${round.family} family`}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,150,0,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pusingan' : 'Round'} {roundIndex + 1}/{ROUNDS.length}
          </span>
          <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ fontSize: '1.1rem', opacity: i < wrongCount ? 0.25 : 1 }}>❤️</span>
            ))}
          </div>
          <span style={{ fontWeight: 'bold', color: '#FF9600' }}>⭐ {score}</span>
        </div>
      </div>

      {/* ── Body (scrollable) ────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '560px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Listen section */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #FF9600', padding: '1.1rem', marginBottom: '1rem', textAlign: 'center' }}>
          <p style={{ color: '#888', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
            {language === 'bm' ? 'Dengar 3 perkataan ini:' : 'Listen to these 3 words:'}
          </p>
          <button onClick={handleListen} style={{ padding: '0.45rem 1.25rem', background: '#FF9600', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold', fontSize: '0.88rem' }}>
            <Volume2 size={15} />
            {language === 'bm' ? 'Dengar' : 'Listen'}
          </button>
          <p style={{ color: '#555', fontWeight: 'bold', marginTop: '0.6rem', fontSize: '1rem' }}>
            {language === 'bm' ? `Keluarga: ${round.family}` : `Family: ${round.family}`}
          </p>
        </div>

        {/* Instruction */}
        <p style={{ textAlign: 'center', color: '#555', fontSize: '0.88rem', marginBottom: '0.75rem' }}>
          {language === 'bm'
            ? `👇 Pilih 3 jawapan yang betul (${correctFound.size}/3):`
            : `👇 Select the 3 correct answers (${correctFound.size}/3):`}
        </p>

        {/* Options grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem', marginBottom: '1rem' }}>
          {options.map((word, idx) => {
            const isCorrect   = round.correct.includes(word);
            const pickedRight = correctFound.has(word);
            const pickedWrong = wrongPicked.has(word);
            const revealAll   = roundDone;

            let bg     = '#FFF';
            let border = '#DDD';
            let color  = '#333';
            let disabled = roundDone || pickedRight;

            if (pickedRight) {
              bg = '#4CAF50'; border = '#388E3C'; color = 'white';
            } else if (pickedWrong) {
              bg = '#FF6B6B'; border = '#D32F2F'; color = 'white';
            } else if (revealAll && isCorrect) {
              bg = '#E8F5E9'; border = '#4CAF50'; color = '#2E7D32';
            }

            return (
              <button key={idx} onClick={() => handleSelect(word)}
                disabled={disabled}
                style={{
                  padding: '1rem 0.4rem',
                  background: bg, color, border: `2px solid ${border}`,
                  borderRadius: '10px',
                  cursor: disabled ? 'default' : 'pointer',
                  fontWeight: 'bold', fontSize: '1rem',
                  transition: 'all 0.2s',
                }}>
                {pickedRight ? '✓ ' : ''}{word}
              </button>
            );
          })}
        </div>

        {/* Fail message */}
        {failed && (
          <div style={{ padding: '0.85rem 1rem', background: '#FFEBEE', border: '2px solid #EF5350', color: '#C62828', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.95rem' }}>
            {language === 'bm'
              ? '❌ Lebih 3 kali silap! Jawapan yang betul ditunjukkan dalam hijau.'
              : '❌ 3 wrong picks! Correct answers are shown in green.'}
          </div>
        )}

        {/* Pass message */}
        {roundDone && !failed && (
          <div style={{ padding: '0.85rem 1rem', background: '#E8F5E9', border: '2px solid #4CAF50', color: '#1B5E20', borderRadius: '10px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.95rem' }}>
            {language === 'bm'
              ? `✅ Betul! Semua 3 perkataan keluarga ${round.family} ditemui!`
              : `✅ Correct! All 3 ${round.family} words found!`}
          </div>
        )}
      </div>

      {/* ── Footer (sticky) ──────────────────────────────────────────────── */}
      <div style={{ flexShrink: 0, background: '#FFE9CC', borderTop: '2px solid rgba(255,150,0,0.25)', padding: '0.75rem 1rem' }}>
        <button onClick={handleNext} disabled={!roundDone}
          style={{ width: '100%', padding: '0.85rem', background: roundDone ? '#FF9600' : '#FFCF80', color: 'white', border: 'none', borderRadius: '10px', cursor: roundDone ? 'pointer' : 'not-allowed', fontWeight: 'bold', fontSize: '1rem', boxShadow: roundDone ? '0 4px 0 #D47A00' : 'none', transition: 'background 0.2s' }}>
          {roundIndex < ROUNDS.length - 1
            ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
            : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
        </button>
      </div>
    </div>
  );
}
