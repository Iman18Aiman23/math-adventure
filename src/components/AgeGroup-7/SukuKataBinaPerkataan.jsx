import React, { useState, useCallback, useMemo } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import BackButton from '../BackButton';

// KSSR BM Tahun 1 — KVKV (Konsonan+Vokal) suku kata words
const QUESTIONS = [
  { id: 1, word: 'buku',  syllables: ['bu', 'ku'], blank: 1, options: ['ku', 'ta', 'la', 'pi'], image: '📚', hint_bm: 'benda untuk membaca',          hint_eng: 'book'  },
  { id: 2, word: 'bola',  syllables: ['bo', 'la'], blank: 0, options: ['bo', 'ku', 'ma', 'ti'], image: '⚽', hint_bm: 'alat permainan bulat',          hint_eng: 'ball'  },
  { id: 3, word: 'mata',  syllables: ['ma', 'ta'], blank: 1, options: ['ta', 'ku', 'la', 'ji'], image: '👁️', hint_bm: 'digunakan untuk melihat',       hint_eng: 'eye'   },
  { id: 4, word: 'kuda',  syllables: ['ku', 'da'], blank: 0, options: ['ku', 'ma', 'bi', 'ta'], image: '🐴', hint_bm: 'haiwan yang berlari laju',      hint_eng: 'horse' },
  { id: 5, word: 'baju',  syllables: ['ba', 'ju'], blank: 1, options: ['ju', 'ku', 'ta', 'pi'], image: '👕', hint_bm: 'pakaian yang dipakai',          hint_eng: 'shirt' },
  { id: 6, word: 'meja',  syllables: ['me', 'ja'], blank: 0, options: ['me', 'bu', 'ka', 'ti'], image: '🪑', hint_bm: 'perabot untuk belajar',         hint_eng: 'table' },
  { id: 7, word: 'kaki',  syllables: ['ka', 'ki'], blank: 1, options: ['ki', 'ta', 'la', 'bu'], image: '🦵', hint_bm: 'anggota badan untuk berjalan',  hint_eng: 'leg'   },
  { id: 8, word: 'topi',  syllables: ['to', 'pi'], blank: 0, options: ['to', 'bu', 'ke', 'da'], image: '🎩', hint_bm: 'dipakai di atas kepala',        hint_eng: 'hat'   },
];

export default function SukuKataBinaPerkataan({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isDone, setIsDone]             = useState(false);

  const q             = QUESTIONS[currentIndex];
  const correctSyllable = q.syllables[q.blank];
  const isCorrect     = selectedAnswer === correctSyllable;

  const shuffledOptions = useMemo(
    () => [...q.options].sort(() => Math.random() - 0.5),
    [q],
  );

  const handleSelect = useCallback((suku) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(suku);
    if (suku === correctSyllable) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 50, spread: 60 });
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, correctSyllable]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
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
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsDone(false);
  }, []);

  const handleListen = useCallback(() => {
    SpeechManager.speak(q.word, 'ms');
  }, [q.word]);

  // ── Completion screen ──────────────────────────────────────────────────────
  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ color: '#FF9600', fontSize: '2rem', marginBottom: '0.5rem' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: '1.4rem', color: '#555', marginBottom: '2rem' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{QUESTIONS.length * 10}
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
      <div style={{ flexShrink: 0, padding: '3.5rem 1rem 0.75rem', maxWidth: '560px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.85rem' }}>
          <h1 style={{ color: '#FF9600', marginBottom: '0.25rem', fontSize: '1.6rem' }}>
            {language === 'bm' ? 'Suku Kata' : 'Syllable Builder'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm'
              ? 'Lengkapkan perkataan dengan suku kata yang betul'
              : 'Complete the word with the correct syllable'}
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
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '560px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Emoji + hint */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{q.image}</div>
          <p style={{ color: '#666', fontSize: '0.9rem' }}>
            ({language === 'bm' ? q.hint_bm : q.hint_eng})
          </p>
        </div>

        {/* Word builder card */}
        <div style={{ background: '#FFF', borderRadius: '12px', border: '2px solid #FF9600', padding: '1.25rem 1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
          <p style={{ color: '#888', fontSize: '0.82rem', marginBottom: '1rem' }}>
            {language === 'bm' ? 'Pilih suku kata yang sesuai:' : 'Pick the correct syllable:'}
          </p>

          {/* Slot row: [slot1] + [slot2] = [result] */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>

            {/* Slot 1 */}
            <div style={{
              padding: '0.7rem 1.1rem',
              background: q.blank === 0
                ? (isAnswered ? (isCorrect ? '#4CAF50' : '#FF6B6B') : 'transparent')
                : '#FF9600',
              border: `2px ${q.blank === 0 ? 'dashed' : 'solid'} ${q.blank === 0 ? '#FF9600' : '#E68900'}`,
              borderRadius: '10px',
              fontSize: '1.4rem', fontWeight: 'bold',
              color: q.blank === 0 ? (isAnswered ? 'white' : '#FF9600') : 'white',
              minWidth: '60px',
            }}>
              {q.blank === 0 ? (selectedAnswer ?? '?') : q.syllables[0]}
            </div>

            <span style={{ fontSize: '1.1rem', color: '#999', fontWeight: 'bold' }}>+</span>

            {/* Slot 2 */}
            <div style={{
              padding: '0.7rem 1.1rem',
              background: q.blank === 1
                ? (isAnswered ? (isCorrect ? '#4CAF50' : '#FF6B6B') : 'transparent')
                : '#FF9600',
              border: `2px ${q.blank === 1 ? 'dashed' : 'solid'} ${q.blank === 1 ? '#FF9600' : '#E68900'}`,
              borderRadius: '10px',
              fontSize: '1.4rem', fontWeight: 'bold',
              color: q.blank === 1 ? (isAnswered ? 'white' : '#FF9600') : 'white',
              minWidth: '60px',
            }}>
              {q.blank === 1 ? (selectedAnswer ?? '?') : q.syllables[1]}
            </div>

            <span style={{ fontSize: '1.1rem', color: '#999', fontWeight: 'bold' }}>=</span>

            {/* Result word */}
            <div style={{
              padding: '0.7rem 1.1rem',
              background: isAnswered ? (isCorrect ? '#4CAF50' : '#FF6B6B') : '#F5F5F5',
              border: `2px solid ${isAnswered ? (isCorrect ? '#388E3C' : '#D32F2F') : '#DDD'}`,
              borderRadius: '10px',
              fontSize: '1.4rem', fontWeight: 'bold',
              color: isAnswered ? 'white' : '#CCC',
              minWidth: '72px',
            }}>
              {isAnswered ? q.word : '...'}
            </div>
          </div>

          {/* Listen button — appears after answering */}
          {isAnswered && (
            <button onClick={handleListen} style={{ marginTop: '0.85rem', padding: '0.4rem 1rem', background: '#FF9600', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 'bold', fontSize: '0.85rem' }}>
              <Volume2 size={14} />
              {language === 'bm' ? 'Dengar' : 'Listen'}
            </button>
          )}
        </div>

        {/* 2 × 2 option buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', marginBottom: '1rem' }}>
          {shuffledOptions.map((suku, idx) => {
            let bg = '#FFF', border = '#FF9600', color = '#333';
            if (isAnswered) {
              if (suku === correctSyllable) { bg = '#4CAF50'; border = '#388E3C'; color = 'white'; }
              else if (suku === selectedAnswer) { bg = '#FF6B6B'; border = '#D32F2F'; color = 'white'; }
            }
            return (
              <button key={idx} onClick={() => handleSelect(suku)} disabled={isAnswered}
                style={{ padding: '1.1rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '10px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1.4rem', transition: 'all 0.2s' }}>
                {suku}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
            {isCorrect
              ? (language === 'bm'
                  ? `✅ Betul! "${q.word}" — ${q.hint_bm}`
                  : `✅ Correct! "${q.word}" means ${q.hint_eng}`)
              : (language === 'bm'
                  ? `❌ Tidak betul. Suku kata yang betul: "${correctSyllable}" → "${q.word}"`
                  : `❌ Wrong. Correct syllable: "${correctSyllable}" → "${q.word}"`)
            }
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
