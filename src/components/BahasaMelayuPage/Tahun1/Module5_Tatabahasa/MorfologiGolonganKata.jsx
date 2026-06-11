import React, { useState, useCallback, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound, playHoverSound } from '../../../../utils/soundManager';
import BackButton from '../../../BackButton';

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

  if (isDone) {
    return (
      <div style={{ height: '100dvh', background: C.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px, 3vh, 36px)' }}>
        <div style={{ position: 'absolute', top: 12, left: 12 }}><BackButton onClick={onBack} /></div>
        <div style={{ fontSize: 'clamp(64px, 14vh, 120px)', marginBottom: 'clamp(10px, 1.8vh, 22px)' }}>🔍</div>
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
    );
  }

  return (
    <div style={{ height: '100dvh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: C.bg, fontFamily: "'Fredoka', system-ui, sans-serif" }}>
      <style>{`
        .jk-topbar { flex-shrink:0; display:flex; align-items:center; justify-content:space-between; padding:clamp(4px,.8vh,10px) 8px; background:rgba(255,255,255,.5); border-bottom:1px solid rgba(255,150,0,.15); }
        .jk-topbar-left { display:flex; align-items:center; gap:4px; }
        .jk-topbar-right { display:flex; align-items:center; gap:clamp(6px,1vw,14px); }
        .jk-progress-track { width:clamp(50px,12vw,100px); height:clamp(5px,.8vh,8px); background:#FFD9A8; border-radius:999px; overflow:hidden; }
        .jk-progress-fill { height:100%; background:${C.primary}; border-radius:999px; transition:width .3s; }
        .jk-label { font-family:'Baloo 2',sans-serif; font-weight:700; font-size:clamp(22px,3.2vh,28px); color:#888; white-space:nowrap; }
        .jk-score { font-family:'Baloo 2',sans-serif; font-weight:800; font-size:clamp(24px,3.6vh,30px); color:${C.primary}; white-space:nowrap; }
        .jk-body { flex:1; min-height:0; display:flex; flex-direction:column; align-items:center; width:100%; max-width:520px; margin:0 auto; padding:clamp(2px,.4vh,6px) 12px; overflow:hidden; }
        .jk-body-inner { width:100%; display:flex; flex-direction:column; align-items:center; gap:clamp(4px,.6vh,10px); flex:1; min-height:0; justify-content:center; }
        .jk-emoji { font-size:clamp(34px,8vh,64px); line-height:1; }
        .jk-word { font-size:clamp(24px,5vw,40px); font-weight:bold; color:#333; letter-spacing:0.05em; font-family:'Baloo 2',sans-serif; }
        .jk-listen-btn { background:none; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:4px; font-family:'Baloo 2',sans-serif; font-weight:700; font-size:clamp(13px,1.6vh,16px); color:#fff; background:${C.primary}; padding:clamp(4px,.6vh,8px) clamp(10px,1.4vw,18px); border-radius:999px; }
        .jk-example { background:rgba(255,150,0,0.08); border-radius:8px; padding:clamp(5px,.7vh,10px) clamp(8px,1vw,14px); font-size:clamp(12px,1.5vh,16px); color:#555; font-style:italic; width:100%; box-sizing:border-box; text-align:center; }
        .jk-prompt { color:#555; font-weight:bold; font-size:clamp(13px,1.6vh,17px); margin:0; }
        .jk-op { background:#fff; border:2.5px solid ${C.primary}; border-radius:clamp(10px,1.4vw,14px); cursor:pointer; font-weight:800; font-size:clamp(18px,3.4vw,26px); padding:clamp(10px,1.4vh,16px); width:100%; transition:all .15s; font-family:'Baloo 2',sans-serif; color:#333; }
        .jk-op:hover { transform:scale(1.04); }
        .jk-op:disabled { cursor:default; }
        .jk-feedback { padding:clamp(6px,.8vh,12px) clamp(10px,1.4vw,20px); border-radius:clamp(8px,1.2vw,14px); text-align:center; font-weight:bold; font-size:clamp(13px,1.8vh,17px); width:100%; box-sizing:border-box; }
        .jk-act-row { display:flex; gap:clamp(8px,1.2vw,16px); width:100%; }
        .jk-act-row button { flex:1; padding:clamp(8px,1.2vh,14px); border:none; border-radius:clamp(8px,1.2vw,12px); font-family:'Baloo 2',sans-serif; font-weight:700; font-size:clamp(16px,2.2vh,22px); cursor:pointer; transition:background .15s; }
        .jk-btn-next-enabled { background:${C.primary}; color:#fff; box-shadow:0 4px 0 ${C.primaryDark}; }
        .jk-btn-reset { background:#E0E0E0; color:#555; display:flex; align-items:center; justify-content:center; gap:4px; }
        @keyframes jk-pop { 0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)} }
        @keyframes jk-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-4px)} 75%{transform:translateX(4px)} }
        @media (max-height:500px) { .jk-prompt{display:none} .jk-example{display:none} }
      `}</style>

      {/* Top bar */}
      <div className="jk-topbar">
        <div className="jk-topbar-left">
          <BackButton onClick={onBack} />
        </div>
        <div className="jk-topbar-right">
          <span className="jk-label">{language === 'bm' ? 'Soalan' : 'Q'}</span>
          <div className="jk-progress-track">
            <div className="jk-progress-fill" style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }} />
          </div>
          <span className="jk-label">{currentIndex + 1}/{QUESTIONS.length}</span>
          <span className="jk-score">⭐ {score}</span>
        </div>
      </div>

      {/* Body */}
      <div className="jk-body">
        <div className="jk-body-inner">
          {/* Main card: emoji + example sentence + prompt */}
          <div style={{ background: '#fff', borderRadius: 'clamp(12px,1.8vw,20px)', border: `2.5px solid ${C.primary}`, padding: 'clamp(12px,2vh,24px) clamp(14px,2vw,22px)', width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
            <div style={{ fontSize: 'clamp(34px,8vh,64px)', lineHeight: 1, marginBottom: 'clamp(4px,.6vh,10px)' }}>{q.image}</div>
            <div style={{ fontSize: 'clamp(20px,4.4vw,34px)', fontWeight: 'bold', color: '#333', lineHeight: 1.4, fontFamily: "'Baloo 2',sans-serif", marginBottom: 'clamp(6px,.8vh,12px)' }}>
              {language === 'bm' ? q.example_bm : q.example_eng}
            </div>
            <div style={{ fontSize: 'clamp(14px,2vw,18px)', color: '#888', fontWeight: 600 }}>
              {language === 'bm' ? `"${q.word}" adalah?` : `"${q.word}" is?`}
            </div>
          </div>

          {/* Options */}

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(6px,1vh,14px)', width: '100%' }}>
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
                <button key={idx} className="jk-op" onClick={() => handleSelect(option)} disabled={isAnswered}
                  style={{ ...style, animation: isAnswered && option === q.answer ? 'jk-pop .35s cubic-bezier(.34,1.56,.64,1)' : isAnswered && option === selectedAnswer && option !== q.answer ? 'jk-shake .3s ease' : 'none' }}>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback + action buttons (only after answer) */}
          {isAnswered && (
            <div className="jk-feedback" style={{ background: isCorrect ? '#D4EDDA' : '#F8D7DA', color: isCorrect ? '#155724' : '#721C24' }}>
              {isCorrect
                ? (language === 'bm' ? `✅ Betul!` : `✅ Correct!`)
                : (language === 'bm' ? `❌ Jawapan: ${q.answer}` : `❌ Answer: ${q.answer}`)}
            </div>
          )}
          {isAnswered && (
            <div className="jk-act-row">
              <button className="jk-btn-reset" onClick={handleReset}>
                <RefreshCw size={14} /> {language === 'bm' ? 'Semula' : 'Reset'}
              </button>
              <button className="jk-btn-next-enabled" onClick={handleNext}>
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
