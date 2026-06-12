import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BMStdShell from '../../_shared/BMStdShell';
import BMHeader from '../../_shared/BMHeader';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const RAW_QUESTIONS = [
  { id: 1, word: 'kucing', image: '🐱', example_bm: 'Kucing itu comel.', example_eng: 'The cat is cute.', options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'], answer: 'Kata Nama Am', explanation_bm: '"kucing" ialah nama benda/haiwan yang umum — Kata Nama Am', explanation_eng: '"kucing" is a common name for a thing/animal — Common Noun' },
  { id: 2, word: 'berlari', image: '🏃', example_bm: 'Murid itu berlari laju.', example_eng: 'The student runs fast.', options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'], answer: 'Kata Kerja', explanation_bm: '"berlari" ialah perbuatan yang dilakukan — Kata Kerja', explanation_eng: '"berlari" is an action word — Verb' },
  { id: 3, word: 'cantik', image: '🌸', example_bm: 'Bunga itu cantik.', example_eng: 'The flower is beautiful.', options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'], answer: 'Kata Adjektif', explanation_bm: '"cantik" menerangkan sifat sesuatu — Kata Adjektif', explanation_eng: '"cantik" describes a quality — Adjective' },
  { id: 4, word: 'Ahmad', image: '👦', example_bm: 'Ahmad pergi ke sekolah.', example_eng: 'Ahmad goes to school.', options: ['Kata Nama Am', 'Kata Nama Khas', 'Kata Kerja'], answer: 'Kata Nama Khas', explanation_bm: '"Ahmad" ialah nama khas seseorang — Kata Nama Khas', explanation_eng: '"Ahmad" is a specific person\'s name — Proper Noun' },
  { id: 5, word: 'membaca', image: '📖', example_bm: 'Saya suka membaca buku.', example_eng: 'I like to read books.', options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'], answer: 'Kata Kerja', explanation_bm: '"membaca" ialah perbuatan yang dilakukan — Kata Kerja', explanation_eng: '"membaca" is an action word — Verb' },
  { id: 6, word: 'besar', image: '🐘', example_bm: 'Gajah itu sangat besar.', example_eng: 'The elephant is very big.', options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'], answer: 'Kata Adjektif', explanation_bm: '"besar" menerangkan saiz sesuatu — Kata Adjektif', explanation_eng: '"besar" describes the size of something — Adjective' },
  { id: 7, word: 'sekolah', image: '🏫', example_bm: 'Saya pergi ke sekolah.', example_eng: 'I go to school.', options: ['Kata Nama Am', 'Kata Kerja', 'Kata Adjektif'], answer: 'Kata Nama Am', explanation_bm: '"sekolah" ialah nama tempat yang umum — Kata Nama Am', explanation_eng: '"sekolah" is a common place name — Common Noun' },
  { id: 8, word: 'Malaysia', image: '🇲🇾', example_bm: 'Saya tinggal di Malaysia.', example_eng: 'I live in Malaysia.', options: ['Kata Nama Am', 'Kata Nama Khas', 'Kata Adjektif'], answer: 'Kata Nama Khas', explanation_bm: '"Malaysia" ialah nama khas sebuah negara — Kata Nama Khas', explanation_eng: '"Malaysia" is the specific name of a country — Proper Noun' },
];

const TYPE_COLORS = {
  'Kata Nama Am':   { bg: '#E3F2FD', border: '#1976D2', text: '#1565C0' },
  'Kata Nama Khas': { bg: '#FFF3E0', border: '#F57C00', text: '#E65100' },
  'Kata Kerja':     { bg: '#E8F5E9', border: '#388E3C', text: '#2E7D32' },
  'Kata Adjektif':  { bg: '#F3E5F5', border: '#7B1FA2', text: '#6A1B9A' },
};

const C = { bg: '#FFE9CC', primary: '#FF9600', primaryDark: '#D47A00', correct: '#4CAF50', wrong: '#FF6B6B' };

export default function JenisKata({ onBack, language = 'bm' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered]     = useState(false);
  const [isDone, setIsDone]             = useState(false);

  const QUESTIONS = useMemo(() =>
    RAW_QUESTIONS.map(q => ({ ...q, options: shuffle(q.options) })),
  []);

  const q        = QUESTIONS[currentIndex];
  const isCorrect = selectedAnswer === q.answer;

  const handleSelect = useCallback((option) => {
    if (isAnswered) return;
    playHoverSound();
    setSelectedAnswer(option);
    if (option === q.answer) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
    } else {
      playSound('wrong');
    }
    setIsAnswered(true);
  }, [isAnswered, q.answer]);

  const handleNext = useCallback(() => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      playSound('streak');
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      setIsDone(true);
    }
  }, [currentIndex, QUESTIONS.length]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsDone(false);
  }, []);

  const topicTitle = language === 'bm' ? 'Morfologi Golongan Kata' : 'Word Type Morphology';

  if (isDone) {
    return (
      <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: C.bg }}>
        <BMHeader onBack={onBack} language={language} title={topicTitle} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 16, textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(56px, 12vh, 90px)', marginBottom: 'clamp(8px, 1.6vh, 16px)' }}>🔍</div>
          <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: C.primary, fontSize: 'clamp(24px, 5vh, 36px)', fontWeight: 800, margin: 0 }}>
            {language === 'bm' ? 'Tahniah!' : 'Well Done!'}
          </h2>
          <p style={{ fontSize: 'clamp(14px, 2.6vh, 18px)', color: '#555', fontWeight: 600, margin: '0.6rem 0 1.2rem' }}>
            {language === 'bm' ? 'Markah: ' : 'Score: '}<strong>{score}</strong>/{QUESTIONS.length * 10}
          </p>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={handleReset} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: '#fff', color: '#475569', border: '2px solid #E2E8F0', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800 }}>
              🔄 {language === 'bm' ? 'Main Semula' : 'Play Again'}
            </button>
            <button onClick={onBack} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: `linear-gradient(180deg, ${C.primary}cc, ${C.primary})`, color: '#fff', border: 'none', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800, boxShadow: `0 4px 0 ${C.primaryDark}` }}>
              {language === 'bm' ? 'Kembali' : 'Back'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .mg-opts { display: flex; flex-direction: column; gap: clamp(6px, 1vh, 14px); width: 100%; }
        .mg-op {
          background: #fff;
          border: 2.5px solid ${C.primary}66;
          border-radius: clamp(10px, 1.4vw, 14px);
          cursor: pointer; font-weight: 800;
          font-size: clamp(18px, 3.4vw, 26px);
          padding: clamp(10px, 1.4vh, 16px);
          width: 100%; transition: all .15s;
          font-family: 'Baloo 2', sans-serif; color: #333;
        }
        .mg-op:hover { transform: scale(1.04); }
        .mg-op:disabled { cursor: default; transform: none; }
        .mg-feedback {
          padding: clamp(6px,.8vh,12px) clamp(10px,1.4vw,20px);
          border-radius: clamp(8px,1.2vw,14px);
          text-align: center; font-weight: bold;
          font-size: clamp(13px,1.8vh,17px);
          width: 100%; box-sizing: border-box;
        }
        .mg-card {
          flex-shrink: 0; width: 100%;
          display: flex; flex-direction: column; align-items: center;
          gap: clamp(10px, 2.2vh, 20px);
          text-align: center;
          background: #fff;
          border: 3px solid ${C.primary}66;
          border-radius: clamp(18px, 3vh, 28px);
          padding: clamp(16px, 3.4vh, 30px) clamp(16px, 4vw, 28px) clamp(18px, 3.6vh, 32px);
          box-shadow: 0 clamp(3px, 0.6vh, 5px) 0 ${C.primary}2e, 0 12px 26px -16px rgba(0,0,0,.2);
        }
        .mg-card-emoji { font-size: clamp(48px, 11vh, 84px); line-height: 1.15; user-select: none; }
        .mg-card-example {
          width: 100%;
          border-top: 2px dashed #F5E6D0;
          padding-top: clamp(10px, 2.2vh, 20px);
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(20px, 4.6vh, 36px);
          line-height: 1.25; color: #333;
        }
        .mg-prompt { flex-shrink: 0; font-size: clamp(13px, 2vw, 17px); color: #888; font-weight: 600; }
        .mg-footer-btn {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(15px, 2.8vh, 18px);
          border: none; border-radius: 14px; cursor: pointer;
          padding: clamp(10px, 2vh, 14px) 12px;
          transition: transform .12s ease, box-shadow .12s ease;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .mg-footer-btn:active { transform: translateY(2px); }
        .mg-footer-btn.primary { background: linear-gradient(180deg, ${C.primary}cc, ${C.primary}); box-shadow: 0 4px 0 ${C.primaryDark}; color: #fff; }
        .mg-footer-btn.secondary { background: #fff; color: #64748B; border: 2px solid #E2E8F0; }
        @keyframes mg-pop { 0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)} }
        @keyframes mg-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
        @media (max-height:500px) { .mg-prompt{display:none} }
      `}</style>

      <BMStdShell
        onBack={onBack} language={language} title={topicTitle}
        current={currentIndex} total={QUESTIONS.length} score={score}
        accentColor={C.primary}
        footer={isAnswered && (
          <div style={{ display: 'flex', gap: 'clamp(8px, 2vw, 12px)', width: '100%' }}>
            <button className="mg-footer-btn secondary" onClick={handleReset}>
              <RefreshCw size={16} /> {language === 'bm' ? 'Semula' : 'Reset'}
            </button>
            <button className="mg-footer-btn primary" onClick={handleNext}>
              {currentIndex < QUESTIONS.length - 1
                ? (language === 'bm' ? 'Seterusnya →' : 'Next →')
                : (language === 'bm' ? 'Selesai ✓' : 'Finish ✓')}
            </button>
          </div>
        )}
      >
        <div className="mg-card">
          <div className="mg-card-emoji">{q.image}</div>
          <div className="mg-card-example">
            {language === 'bm' ? q.example_bm : q.example_eng}
          </div>
          <div className="mg-prompt">
            {language === 'bm' ? `"${q.word}" adalah?` : `"${q.word}" is?`}
          </div>
        </div>

        <div className="mg-opts">
          {q.options.map((option, idx) => {
            const tc = TYPE_COLORS[option] || { bg: '#FFF', border: '#FF9600', text: '#333' };
            let style = {};
            if (isAnswered) {
              if (option === q.answer) style = { background: '#4CAF50', borderColor: '#388E3C', color: '#fff' };
              else if (option === selectedAnswer) style = { background: '#FF6B6B', borderColor: '#D32F2F', color: '#fff' };
              else style = { background: '#F5F5F5', borderColor: '#DDD', color: '#AAA' };
            } else {
              style = { background: tc.bg, borderColor: tc.border, color: tc.text };
            }
            return (
              <button key={idx} className="mg-op" onClick={() => handleSelect(option)} disabled={isAnswered}
                style={{ ...style, animation: isAnswered && option === q.answer ? 'mg-pop .35s cubic-bezier(.34,1.56,.64,1)' : isAnswered && option === selectedAnswer && option !== q.answer ? 'mg-shake .3s ease' : 'none' }}>
                {option}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mg-feedback" style={{ background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24' }}>
            {isCorrect
              ? (language === 'bm' ? '✅ Betul!' : '✅ Correct!')
              : (language === 'bm' ? `❌ Jawapan: ${q.answer}` : `❌ Answer: ${q.answer}`)}
          </div>
        )}
      </BMStdShell>
    </>
  );
}
