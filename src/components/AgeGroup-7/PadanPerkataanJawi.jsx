import React, { useState, useCallback } from 'react';
import { RefreshCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import { JAWI_TOPICS } from '../../utils/jawiWordsData';
import BackButton from '../BackButton';

// Age 7 Jawi — KSSR Pendidikan Islam Obj 10 (Membaca perkataan jawi)
// Show a whole Jawi word; child picks its correct meaning (emoji + rumi).
// Word-level reading — one step beyond Bina Perkataan's letter assembly.
const JAWI_FONT = "'Traditional Arabic','Scheherazade New','Amiri','Noto Naskh Arabic',serif";
const ROUNDS = 10;

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const WORD_POOL = JAWI_TOPICS.flatMap(t => t.words);

const generateRounds = () => {
  return shuffle(WORD_POOL).slice(0, ROUNDS).map((answer) => {
    const distractors = [];
    const usedRumi = new Set([answer.rumi]);
    for (const cand of shuffle(WORD_POOL)) {
      if (distractors.length >= 3) break;
      if (usedRumi.has(cand.rumi)) continue;
      usedRumi.add(cand.rumi);
      distractors.push(cand);
    }
    return { ...answer, opts: shuffle([answer, ...distractors]) };
  });
};

export default function PadanPerkataanJawi({ onBack, language = 'bm' }) {
  const [rounds, setRounds]                 = useState(generateRounds);
  const [roundIdx, setRoundIdx]             = useState(0);
  const [selectedRumi, setSelectedRumi]     = useState(null);
  const [isAnswered, setIsAnswered]         = useState(false);
  const [score, setScore]                   = useState(0);
  const [isDone, setIsDone]                 = useState(false);

  const round     = rounds[roundIdx];
  const isCorrect = selectedRumi === round.rumi;

  const handleListen = useCallback(() => {
    playHoverSound();
    SpeechManager.speak(round.rumi, 'ms');
  }, [round.rumi]);

  const handleSelect = useCallback((opt) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedRumi(opt.rumi);
    if (opt.rumi === round.rumi) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 55, spread: 60 });
      SpeechManager.speak(round.rumi, 'ms');
    } else {
      playSound('incorrect');
    }
    setIsAnswered(true);
  }, [isAnswered, round.rumi]);

  const handleNext = useCallback(() => {
    if (!isAnswered) return;
    if (roundIdx < rounds.length - 1) {
      setRoundIdx(i => i + 1);
      setSelectedRumi(null);
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
    setSelectedRumi(null);
    setIsAnswered(false);
    setScore(0);
    setIsDone(false);
  }, []);

  const getOptionStyle = (opt) => {
    if (!isAnswered) return { bg: '#FFF', border: '#FF9600', color: '#333' };
    if (opt.rumi === round.rumi)      return { bg: '#4CAF50', border: '#388E3C', color: 'white' };
    if (opt.rumi === selectedRumi)    return { bg: '#FF6B6B', border: '#D32F2F', color: 'white' };
    return { bg: '#F5F5F5', border: '#DDD', color: '#AAA' };
  };

  if (isDone) {
    return (
      <div style={{ minHeight: '100%', background: '#FFE9CC', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <BackButton onClick={onBack} />
        <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📖</div>
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
            {language === 'bm' ? 'Padan Perkataan Jawi' : 'Match Jawi Words'}
          </h1>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>
            {language === 'bm' ? 'Apakah maksud perkataan Jawi ini?' : 'What does this Jawi word mean?'}
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

        {/* Jawi word display */}
        <div style={{ background: '#FFF', borderRadius: '16px', border: '2px solid #FF9600', padding: '1.5rem', marginBottom: '1.25rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: '4.5rem', fontWeight: 900, color: '#333', lineHeight: 1.25, fontFamily: JAWI_FONT, direction: 'rtl' }}>
            {round.jawi}
          </div>
          <button onClick={handleListen}
            style={{ position: 'absolute', top: '12px', right: '12px', background: '#FFE9CC', border: '2px solid #FFD299', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#FF9600' }}
            title={language === 'bm' ? 'Dengar' : 'Listen'}>
            <Volume2 size={20} />
          </button>
        </div>

        {/* Meaning choices — 2×2 grid (emoji + rumi) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          {round.opts.map((opt, idx) => {
            const { bg, border, color } = getOptionStyle(opt);
            return (
              <button key={idx} onClick={() => handleSelect(opt)} disabled={isAnswered}
                style={{ padding: '0.9rem', background: bg, color, border: `2px solid ${border}`, borderRadius: '12px', cursor: isAnswered ? 'default' : 'pointer', fontWeight: 'bold', fontSize: '1.1rem', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ fontSize: '2rem', lineHeight: 1 }}>{opt.emoji}</span>
                <span>{opt.rumi}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div style={{ padding: '0.85rem 1rem', background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24', borderRadius: '8px', fontWeight: 'bold', textAlign: 'center' }}>
            {isCorrect
              ? (language === 'bm' ? `✅ Betul! ${round.emoji} ${round.rumi}` : `✅ Correct! ${round.emoji} ${round.rumi}`)
              : (language === 'bm' ? `❌ Salah. Jawapan: ${round.emoji} ${round.rumi}` : `❌ Wrong! Answer: ${round.emoji} ${round.rumi}`)}
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
