import React, { useState, useCallback, useMemo } from 'react';
import { Volume2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import BMHeader from '../../_shared/BMHeader';

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

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

const C = { bg: '#FFE9CC', primary: '#FF9600', primaryDark: '#D47A00', correct: '#4CAF50', wrong: '#FF6B6B' };

export default function SukuKataBinaPerkataan({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const q = QUESTIONS[currentIndex];
  const correctSyllable = q.syllables[q.blank];
  const isCorrect = selectedAnswer === correctSyllable;

  const shuffledOptions = useMemo(() => shuffle(q.options), [q]);

  const handleSelect = useCallback((suku) => {
    if (isAnswered) return;
    setSelectedAnswer(suku);
    if (suku === correctSyllable) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setScore(s => s + 10);
      if (nextStreak % 5 === 0) {
        playSound('streak');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      } else {
        playSound('correct');
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
      }
    } else {
      setStreak(0);
      playSound('wrong');
    }
    setIsAnswered(true);
  }, [isAnswered, correctSyllable, streak]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsDone(true);
    }
  }, [currentIndex]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsDone(false);
  }, []);

  if (isDone) {
    return (
      <div style={{ height: '100dvh', background: C.bg, display: 'flex', flexDirection: 'column' }}>
        <BMHeader onBack={onBack} language={language} title={language === 'bm' ? 'Asas Membaca & Memahami' : 'Basic Reading & Comprehension'} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px, 3vh, 36px)' }}>
        <div style={{ fontSize: 'clamp(64px, 14vh, 120px)', marginBottom: 'clamp(10px, 1.8vh, 22px)' }}>🎉</div>
        <h2 style={{ color: C.primary, fontSize: 'clamp(28px, 5vh, 48px)', margin: '0 0 clamp(6px, 1vh, 12px)' }}>
          {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
        </h2>
        <p style={{ fontSize: 'clamp(18px, 3.2vh, 28px)', color: '#555', margin: '0 0 clamp(16px, 3vh, 32px)' }}>
          {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{QUESTIONS.length * 10}
        </p>
        <div style={{ display: 'flex', gap: 'clamp(10px, 1.8vw, 20px)' }}>
          <button onClick={handleReset} style={{ padding: 'clamp(10px, 1.6vh, 16px) clamp(20px, 3.6vw, 34px)', background: '#E0E0E0', color: '#333', border: 'none', borderRadius: '12px', fontSize: 'clamp(16px, 2.6vh, 22px)', cursor: 'pointer', fontWeight: 'bold' }}>
            {language === 'bm' ? 'Main Semula' : 'Play Again'}
          </button>
          <button onClick={onBack} style={{ padding: 'clamp(10px, 1.6vh, 16px) clamp(20px, 3.6vw, 34px)', background: C.primary, color: 'white', border: 'none', borderRadius: '12px', fontSize: 'clamp(16px, 2.6vh, 22px)', cursor: 'pointer', fontWeight: 'bold', boxShadow: `0 4px 0 ${C.primaryDark}` }}>
            {language === 'bm' ? 'Kembali' : 'Back'}
          </button>
        </div>
      </div>
    </div>
    );
  }

  return (
    <div style={{ height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: C.bg, fontFamily: "'Fredoka', system-ui, sans-serif" }}>
      <style>{`

        .sk-progress-track { width: clamp(50px, 12vw, 100px); height: clamp(5px, .8vh, 8px); background: #FFD9A8; border-radius: 999px; overflow: hidden; }
        .sk-progress-fill { height: 100%; background: ${C.primary}; border-radius: 999px; transition: width .3s; }
        .sk-label { font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: clamp(22px, 3.2vh, 28px); color: #888; white-space: nowrap; }
        .sk-score { font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(24px, 3.6vh, 30px); color: ${C.primary}; white-space: nowrap; }
        .sk-body { flex: 1; min-height: 0; display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 520px; margin: 0 auto; padding: clamp(2px, .4vh, 6px) 12px; overflow: hidden; }
        .sk-body-inner { width: 100%; display: flex; flex-direction: column; align-items: center; gap: clamp(3px, .6vh, 10px); flex: 1; min-height: 0; justify-content: center; }
        .sk-emoji { font-size: clamp(34px, 8vh, 64px); line-height: 1; }
        .sk-hint { font-size: clamp(13px, 1.8vh, 17px); color: #888; font-weight: 500; margin: 0; }
        .sk-card { background: #fff; border-radius: clamp(12px, 1.8vw, 20px); border: 2.5px solid ${C.primary}; padding: clamp(8px, 1.2vh, 16px) clamp(12px, 1.8vw, 22px); width: 100%; text-align: center; box-sizing: border-box; }
        .sk-card-label { font-size: clamp(12px, 1.6vh, 15px); color: #888; margin: 0 0 clamp(4px, .6vh, 10px); }
        .sk-slot-row { display: flex; align-items: center; justify-content: center; gap: clamp(4px, .7vw, 10px); flex-wrap: wrap; }
        .sk-slot { padding: clamp(5px, .8vh, 11px) clamp(10px, 1.8vw, 18px); border-radius: clamp(7px, 1vw, 12px); font-size: clamp(20px, 4.4vw, 34px); font-weight: bold; min-width: clamp(40px, 8vw, 64px); font-family: 'Baloo 2', sans-serif; }
        .sk-slot-dashed { border: 2.5px dashed ${C.primary}; color: ${C.primary}; background: transparent; }
        .sk-slot-filled { border: 2.5px solid #E68900; color: #fff; background: ${C.primary}; }
        .sk-slot-correct { border: 2.5px solid #388E3C; color: #fff; background: ${C.correct}; }
        .sk-slot-wrong { border: 2.5px solid #D32F2F; color: #fff; background: ${C.wrong}; }
        .sk-slot-result { padding: clamp(5px, .8vh, 11px) clamp(10px, 1.8vw, 18px); border-radius: clamp(7px, 1vw, 12px); font-size: clamp(20px, 4.4vw, 34px); font-weight: bold; min-width: clamp(44px, 9vw, 68px); font-family: 'Baloo 2', sans-serif; text-align: center; }
        .sk-op { background: transparent; border: none; cursor: pointer; padding: clamp(8px, 1.2vh, 16px); border-radius: clamp(10px, 1.4vw, 14px); font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: clamp(24px, 5vw, 40px); transition: all .15s; border: 2.5px solid ${C.primary}; color: #333; background: #fff; }
        .sk-op:hover { transform: scale(1.04); }
        .sk-op:disabled { cursor: default; }
        .sk-op-correct { border-color: #388E3C !important; background: #4CAF50 !important; color: #fff !important; animation: sk-pop .35s cubic-bezier(.34,1.56,.64,1); }
        .sk-op-wrong { border-color: #D32F2F !important; background: #FF6B6B !important; color: #fff !important; animation: sk-shake .3s ease; }
        .sk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(6px, 1vh, 12px); width: 100%; }
        .sk-feedback { padding: clamp(6px, .8vh, 12px) clamp(10px, 1.4vw, 20px); border-radius: clamp(8px, 1.2vw, 14px); text-align: center; font-weight: bold; font-size: clamp(13px, 1.8vh, 17px); width: 100%; box-sizing: border-box; }
        .sk-listening-btn { background: none; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: clamp(13px, 1.6vh, 16px); color: #fff; background: ${C.primary}; padding: clamp(4px, .6vh, 8px) clamp(10px, 1.4vw, 18px); border-radius: 999px; margin-top: clamp(3px, .5vh, 8px); }
        .sk-act-row { display: flex; gap: clamp(8px, 1.2vw, 16px); width: 100%; }
        .sk-act-row button { flex: 1; padding: clamp(8px, 1.2vh, 14px); border: none; border-radius: clamp(8px, 1.2vw, 12px); font-family: 'Baloo 2', sans-serif; font-weight: 700; font-size: clamp(16px, 2.2vh, 22px); cursor: pointer; transition: background .15s; }
        .sk-btn-next-enabled { background: ${C.primary}; color: #fff; box-shadow: 0 4px 0 ${C.primaryDark}; }
        .sk-btn-next-disabled { background: #FFCF80; color: #fff; cursor: not-allowed; }
        .sk-btn-reset { background: #E0E0E0; color: #555; display: flex; align-items: center; justify-content: center; gap: 4px; }
        @keyframes sk-pop { 0% { transform: scale(1); } 50% { transform: scale(1.08); } 100% { transform: scale(1); } }
        @keyframes sk-shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
        @media (max-height: 500px) { .sk-hint { display: none; } .sk-card-label { display: none; } }
      `}</style>

      <BMHeader onBack={onBack} language={language} title={language === 'bm' ? 'Asas Membaca & Memahami' : 'Basic Reading & Comprehension'} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '6px 12px', background: 'rgba(255,255,255,.3)' }}>
        <span className="sk-label">{language === 'bm' ? 'Soalan' : 'Q'}</span>
        <div className="sk-progress-track">
          <div className="sk-progress-fill" style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }} />
        </div>
        <span className="sk-label">{currentIndex + 1}/{QUESTIONS.length}</span>
        <span className="sk-score">⭐ {score}</span>
      </div>

      {/* Body */}
      <div className="sk-body">
        <div className="sk-body-inner">
          {/* Emoji */}
          <div className="sk-emoji">{q.image}</div>

          {/* Hint */}
          <p className="sk-hint">({language === 'bm' ? q.hint_bm : q.hint_eng})</p>

          {/* Word builder card */}
          <div className="sk-card">
            <p className="sk-card-label">{language === 'bm' ? 'Pilih suku kata yang sesuai:' : 'Pick the correct syllable:'}</p>
            <div className="sk-slot-row">
              <div className={`sk-slot ${q.blank === 0 ? (isAnswered ? (isCorrect ? 'sk-slot-correct' : 'sk-slot-wrong') : 'sk-slot-dashed') : 'sk-slot-filled'}`}>
                {q.blank === 0 ? (selectedAnswer ?? '?') : q.syllables[0]}
              </div>
              <span style={{ fontSize: 'clamp(28px, 4.4vw, 36px)', color: '#999', fontWeight: 'bold' }}>+</span>
              <div className={`sk-slot ${q.blank === 1 ? (isAnswered ? (isCorrect ? 'sk-slot-correct' : 'sk-slot-wrong') : 'sk-slot-dashed') : 'sk-slot-filled'}`}>
                {q.blank === 1 ? (selectedAnswer ?? '?') : q.syllables[1]}
              </div>
              <span style={{ fontSize: 'clamp(28px, 4.4vw, 36px)', color: '#999', fontWeight: 'bold' }}>=</span>
              <div className="sk-slot-result" style={{ background: isAnswered ? (isCorrect ? C.correct : C.wrong) : '#F5F5F5', border: `2px solid ${isAnswered ? (isCorrect ? '#388E3C' : '#D32F2F') : '#DDD'}`, color: isAnswered ? '#fff' : '#ccc' }}>
                {isAnswered ? q.word : '...'}
              </div>
            </div>
            {!isAnswered && (
              <button className="sk-listening-btn" onClick={() => { SpeechManager.speak(q.word, 'ms'); }}>
                <Volume2 size={14} /> {language === 'bm' ? 'Dengar' : 'Listen'}
              </button>
            )}
          </div>

          {/* 2×2 option grid */}
          <div className="sk-grid">
            {shuffledOptions.map((suku, idx) => {
              let extra = '';
              if (isAnswered) {
                if (suku === correctSyllable) extra = 'sk-op-correct';
                else if (suku === selectedAnswer) extra = 'sk-op-wrong';
              }
              return (
                <button key={idx} className={`sk-op ${extra}`} onClick={() => handleSelect(suku)} disabled={isAnswered}>
                  {suku}
                </button>
              );
            })}
          </div>

          {/* Feedback + action buttons */}
          {isAnswered && (
            <div className="sk-feedback" style={{ background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24' }}>
              {isCorrect
                ? `✅ ${language === 'bm' ? `Betul! "${q.word}"` : `Correct! "${q.word}"`}`
                : `❌ ${language === 'bm' ? `Jawapan: "${correctSyllable}" → "${q.word}"` : `Answer: "${correctSyllable}" → "${q.word}"`}`
              }
            </div>
          )}
          {isAnswered && (
            <div className="sk-act-row">
              <button className="sk-btn-reset" onClick={handleReset}>
                <RefreshCw size={14} /> {language === 'bm' ? 'Semula' : 'Reset'}
              </button>
              <button className="sk-btn-next-enabled" onClick={handleNext}>
                {currentIndex < QUESTIONS.length - 1
                  ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
                  : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
