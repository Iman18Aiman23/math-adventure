import React, { useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import { JAWI_STORIES } from '../../utils/jawiStoriesData';
import BackButton from '../BackButton';

// Age 7 Jawi — KSSR Pendidikan Islam Obj 10 (Membaca ayat / teks dalam tulisan jawi)
// Show a Jawi sentence with one word blanked out; child reads the sentence and
// picks the missing Jawi word. The BM meaning is shown as a reading aid.
const JAWI_FONT = "'Traditional Arabic','Scheherazade New','Amiri','Noto Naskh Arabic',serif";
const ROUNDS = 8;
// Short function words make poor blanks — keep the gap on a content word.
const STOPWORDS = new Set(['دان', 'اين', 'ايت', 'يڠ', 'اد', 'دري', 'اداله']);

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);
const charLen = (s) => Array.from(s).length;

// Flatten all paragraphs, keeping only "clean" sentences (no alternate-spelling
// "/" or annotation "*" tokens) so the cloze sentence renders cleanly.
const CLEAN_PARAGRAPHS = JAWI_STORIES.flatMap((story) =>
  story.paragraphs
    .filter((p) => !p.jawi.includes('/') && !p.jawi.includes('*'))
    .map((p) => {
      const tokens = p.jawi.replace(/[.]/g, '').trim().split(/\s+/);
      return { emoji: story.emoji, bm: p.bm, eng: p.eng, tokens };
    })
    .filter((p) => p.tokens.length >= 3)
);

// Global pool of content-word tokens (for distractors).
const TOKEN_POOL = [...new Set(
  CLEAN_PARAGRAPHS.flatMap((p) => p.tokens).filter((t) => charLen(t) >= 3 && !STOPWORDS.has(t))
)];

const candidateIndices = (tokens) =>
  tokens.map((t, i) => i).filter((i) => charLen(tokens[i]) >= 3 && !STOPWORDS.has(tokens[i]));

const generateRounds = () => {
  const usable = CLEAN_PARAGRAPHS.filter((p) => candidateIndices(p.tokens).length > 0);
  return shuffle(usable).slice(0, ROUNDS).map((p) => {
    const cands = candidateIndices(p.tokens);
    const blankIdx = cands[Math.floor(Math.random() * cands.length)];
    const answer = p.tokens[blankIdx];

    const distractors = [];
    const used = new Set([answer]);
    for (const cand of shuffle(TOKEN_POOL)) {
      if (distractors.length >= 3) break;
      if (used.has(cand)) continue;
      used.add(cand);
      distractors.push(cand);
    }
    return { ...p, blankIdx, answer, opts: shuffle([answer, ...distractors]) };
  });
};

export default function BacaAyatJawi({ onBack, language = 'bm' }) {
  const [rounds, setRounds]                 = useState(generateRounds);
  const [roundIdx, setRoundIdx]             = useState(0);
  const [selected, setSelected]             = useState(null);
  const [isAnswered, setIsAnswered]         = useState(false);
  const [score, setScore]                   = useState(0);
  const [isDone, setIsDone]                 = useState(false);

  const round     = rounds[roundIdx];
  const isCorrect = selected === round.answer;

  const handleSelect = useCallback((token) => {
    if (isAnswered) return;
    playHoverSound();
    setSelected(token);
    if (token === round.answer) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 55, spread: 60 });
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, round.answer]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (roundIdx < rounds.length - 1) {
      setRoundIdx(i => i + 1);
      setSelected(null);
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
    setSelected(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionStyle = (token) => {
    if (!isAnswered) return { bg: '#FFF', border: '#FF9600', color: '#333' };
    if (token === round.answer)   return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (token === selected)        return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📜</div>
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
            {language === 'bm' ? 'Baca Ayat Jawi' : 'Read Jawi Sentences'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Pilih perkataan Jawi yang hilang' : 'Pick the missing Jawi word'}
          </p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', background: 'rgba(255,150,0,0.12)', borderRadius: '10px' }}>
          <span style={{ color: '#666', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Ayat' : 'Sentence'} {roundIdx + 1}/{rounds.length}
          </span>
          <span style={{ fontWeight: 'bold', color: '#FF9600' }}>⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem 1rem', maxWidth: '600px', width: '100%', alignSelf: 'center', boxSizing: 'border-box' }}>

        {/* Sentence card with blank (right-to-left) */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #FF9600', padding: '1.4rem 1.25rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '1.6rem', textAlign: 'center', marginBottom: '0.6rem' }}>{round.emoji}</div>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '0.45rem', fontFamily: JAWI_FONT, lineHeight: 1.6 }}>
            {round.tokens.map((token, i) => {
              if (i === round.blankIdx) {
                return (
                  <span key={i} style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    minWidth: '90px', height: '48px', padding: '0 0.5rem',
                    border: `2px ${isAnswered ? 'solid' : 'dashed'} ${isAnswered ? (isCorrect ? '#4CAF50' : '#FF6B6B') : '#FF9600'}`,
                    borderRadius: '10px', background: isAnswered ? (isCorrect ? '#E8F5E9' : '#FDECEA') : '#FFF7EC',
                    fontSize: '2rem', color: '#333',
                  }}>
                    {isAnswered ? round.answer : ''}
                  </span>
                );
              }
              return (
                <span key={i} style={{ fontSize: '2rem', color: '#333' }}>{token}</span>
              );
            })}
          </div>
          {/* BM meaning as a reading aid */}
          <p style={{ fontSize: '0.9rem', color: '#888', textAlign: 'center', marginTop: '0.9rem', marginBottom: 0, fontStyle: 'italic' }}>
            {language === 'bm' ? round.bm : round.eng}
          </p>
        </div>

        {/* Word choices — 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          {round.opts.map((token, idx) => {
            const { bg, border, color } = getOptionStyle(token);
            return (
              <button key={idx} onClick={() => handleSelect(token)} disabled={isAnswered}
                style={{ padding: '0.9rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1.8rem', fontFamily: JAWI_FONT, direction: 'rtl', transition: 'all 0.2s', textAlign: 'center' }}>
                {token}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', textAlign: 'center' }}>
            {isCorrect
              ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
              : (language === 'bm' ? '❌ Salah. Jawapan ditanda hijau di atas.' : '❌ Wrong. The answer is shown in green above.')}
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
