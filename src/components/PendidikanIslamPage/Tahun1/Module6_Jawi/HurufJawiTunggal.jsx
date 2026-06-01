import React, { useState, useCallback } from 'react';
import BackButton from '../../../BackButton';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { FONT_IMPORT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

const JAWI_LETTERS = [
  { letter: 'ا', name: 'Alif', sound: 'a' },
  { letter: 'ب', name: 'Ba', sound: 'b' },
  { letter: 'ت', name: 'Ta', sound: 't' },
  { letter: 'ث', name: 'Tha', sound: 'th' },
  { letter: 'ج', name: 'Jim', sound: 'j' },
  { letter: 'ح', name: 'Ha', sound: 'h' },
  { letter: 'خ', name: 'Kha', sound: 'kh' },
  { letter: 'د', name: 'Dal', sound: 'd' },
  { letter: 'ذ', name: 'Zal', sound: 'z' },
  { letter: 'ر', name: 'Ra', sound: 'r' },
  { letter: 'ز', name: 'Zay', sound: 'z' },
  { letter: 'س', name: 'Sin', sound: 's' },
  { letter: 'ش', name: 'Syim', sound: 'sy' },
  { letter: 'ص', name: 'Sad', sound: 's' },
  { letter: 'ض', name: 'Dad', sound: 'd' },
  { letter: 'ط', name: 'Tho', sound: 'th' },
  { letter: 'ظ', name: 'Zho', sound: 'z' },
  { letter: 'ع', name: 'Ain', sound: 'a' },
  { letter: 'غ', name: 'Ghain', sound: 'gh' },
  { letter: 'ف', name: 'Fa', sound: 'f' },
  { letter: 'ق', name: 'Qaf', sound: 'q' },
  { letter: 'ک', name: 'Kaf', sound: 'k' },
  { letter: 'ل', name: 'Lam', sound: 'l' },
  { letter: 'م', name: 'Mim', sound: 'm' },
  { letter: 'ن', name: 'Nun', sound: 'n' },
  { letter: 'و', name: 'Wau', sound: 'w' },
  { letter: 'ه', name: 'Ha', sound: 'h' },
  { letter: 'ء', name: 'Hamzah', sound: '\'' },
  { letter: 'ي', name: 'Ya', sound: 'y' },
  { letter: 'ڠ', name: 'Nga', sound: 'ng' },
  { letter: 'ڽ', name: 'Nya', sound: 'ny' },
  { letter: 'ڤ', name: 'Pa', sound: 'p' },
  { letter: 'ݢ', name: 'Ga', sound: 'g' },
  { letter: 'چ', name: 'Ca', sound: 'c' },
  { letter: 'ۏ', name: 'Va', sound: 'v' },
  { letter: 'لا', name: 'Lam-Alif', sound: 'la' },
];

const KONSEP = [
  {
    icon: '✍️', label: 'Apa itu Jawi?', sublabel: 'Tulisan Arab-Melayu',
    desc: 'Tulisan Jawi ialah tulisan Arab yang digunakan untuk menulis bahasa Melayu. Ia menggunakan huruf-huruf Arab dengan beberapa huruf tambahan seperti چ, ڤ, ڠ, ڽ, ݢ dan ۏ.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '🔤', label: '37 Huruf Jawi', sublabel: '29 huruf Arab + 6 tambahan',
    desc: 'Tulisan Jawi mempunyai 37 huruf. Ia terdiri daripada 29 huruf Arab dan 6 huruf tambahan (چ, ڤ, ڠ, ڽ, ݢ, ۏ) serta Lam-Alif (لا).',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '✏️', label: 'Cara Menulis', sublabel: 'Tulisan bersambung',
    desc: 'Huruf Jawi ditulis bersambung dari kanan ke kiri. Setiap huruf mempunyai bentuk yang berbeza di awal, tengah, akhir dan bersendirian.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🔊', label: 'Cara Menyebut', sublabel: 'Sebut dengan betul',
    desc: 'Setiap huruf Jawi disebut mengikut bunyi bahasa Melayu. Huruf tambahan seperti ڤ disebut "pa", چ disebut "ca", dan ڠ disebut "nga".',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '📖', label: 'Kegunaan Jawi', sublabel: 'Dalam kehidupan harian',
    desc: 'Tulisan Jawi digunakan pada papan tanda jalan, buku agama, majalah, dan juga dalam teks sejarah Melayu. Ia penting untuk membaca Al-Quran dan kitab agama.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🅰️', label: 'Vokal Jawi', sublabel: 'Alif, Wau & Ya',
    desc: 'Tiga huruf vokal dalam Jawi ialah Alif (ا), Wau (و) dan Ya (ي). Vokal ini digunakan untuk membunyikan suku kata dalam tulisan Jawi.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Tulisan Jawi berasal daripada tulisan?', answer: 'Arab', options: ['Arab', 'Rumi', 'Cina', 'India'] },
  { question: 'Berapakah jumlah huruf Jawi?', answer: '37 huruf', options: ['37 huruf', '26 huruf', '29 huruf', '30 huruf'] },
  { question: 'Berapakah huruf Arab dalam Jawi?', answer: '29 huruf', options: ['29 huruf', '37 huruf', '26 huruf', '20 huruf'] },
  { question: 'Antara berikut, yang manakah huruf tambahan Jawi?', answer: 'ڤ', options: ['ڤ', 'ب', 'ت', 'س'] },
  { question: 'Tulisan Jawi ditulis dari arah?', answer: 'Kanan ke kiri', options: ['Kanan ke kiri', 'Kiri ke kanan', 'Atas ke bawah', 'Bawah ke atas'] },
  { question: 'Huruf vokal dalam Jawi ialah?', answer: 'Alif, Wau, Ya', options: ['Alif, Wau, Ya', 'Alif, Ba, Ta', 'Jim, Ha, Kha', 'Sin, Syim, Sad'] },
  { question: 'Huruf چ disebut?', answer: 'Ca', options: ['Ca', 'Pa', 'Ga', 'Nga'] },
  { question: 'Huruf ڤ disebut?', answer: 'Pa', options: ['Pa', 'Ca', 'Fa', 'Ba'] },
  { question: 'Huruf ڠ disebut?', answer: 'Nga', options: ['Nga', 'Nya', 'Ga', 'Va'] },
  { question: 'Tulisan Jawi digunakan pada?', answer: 'Papan tanda & buku agama', options: ['Papan tanda & buku agama', 'Buku cerita sahaja', 'Surat khabar sahaja', 'Internet sahaja'] },
]);

const TOTAL_ROUNDS = 10;


function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div style={{
      background: item.gradient,
      border: `2.5px solid ${item.border}`,
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 6px 18px rgba(0,0,0,0.08)',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', background: 'none', border: 'none',
          cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#1A202C',
          textAlign: 'left', transition: 'background 0.2s',
        }}
      >
        <span style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
        <div style={{ flex: 1 }}>
          <span>{item.label}</span>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', color: item.color, marginTop: 2 }}>{item.sublabel}</div>
        </div>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', fontSize: '1.2rem', color: item.color }}>▾</span>
      </button>
      <div style={{ maxHeight: isOpen ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <div style={{ padding: '0 16px 14px' }}>
          <div style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
            fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)', color: '#374151',
            lineHeight: 1.5, background: 'rgba(255,255,255,0.55)',
            borderRadius: 10, padding: '8px 10px',
          }}>
            {item.desc}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizScreen({ language, onDone }) {
  const [pool] = useState(() => shuffle(QUESTIONS).slice(0, TOTAL_ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [animating, setAnimating] = useState(false);
  const q = pool[round];
  const handleAnswer = useCallback((opt) => {
    if (animating || chosen) return;
    const isCorrect = opt === q.answer;
    setChosen(opt); setCorrect(isCorrect);
    if (isCorrect) { setScore(s => s + 1); playSound('correct'); } else playSound('wrong');
    setAnimating(true);
    setTimeout(() => { setChosen(null); setCorrect(null); setAnimating(false); if (round + 1 >= TOTAL_ROUNDS) onDone(isCorrect ? score + 1 : score); else setRound(r => r + 1); }, 900);
  }, [animating, chosen, q, round, score, onDone]);
  if (!q) return null;
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.75rem 1.25rem calc(0.75rem + var(--safe-bottom, 0px))', overflow: 'hidden' }}>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #0891B2, #67D6E8)', borderRadius: 99, transition: 'width 0.4s ease' }} /></div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#67D6E8', whiteSpace: 'nowrap' }}>{round + 1} / {TOTAL_ROUNDS}</span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B' }}>⭐ {score}</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, background: 'rgba(255,255,255,0.06)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textAlign: 'center', position: 'relative', overflow: 'visible' }}>
        {chosen && correct && <Celebration />}
        <span style={{ fontSize: '3rem' }}>✍️</span>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: '#E2E8F0', margin: 0, lineHeight: 1.4, maxWidth: 320 }}>{q.question}</p>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {q.options.map(opt => {
          const isChosen = chosen === opt, isCorrect = isChosen && correct, isWrong = isChosen && !correct, isAnswer = chosen && opt === q.answer && !isChosen;
          return <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!chosen} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', padding: '13px 16px', borderRadius: 14, border: '2.5px solid', cursor: chosen ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s ease', background: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.07)', borderColor: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? '#10B981' : 'rgba(255,255,255,0.15)', color: isCorrect || isWrong ? '#fff' : '#E2E8F0', transform: isChosen ? 'scale(1.02)' : 'scale(1)' }}><span>{opt}</span><span>{isCorrect ? '✅' : isWrong ? '❌' : isAnswer ? '✅' : ''}</span></button>;
        })}
      </div>
    </div>
  );
}

function ResultScreen({ score, onRetry, onBack, language }) {
  const pct = Math.round((score / TOTAL_ROUNDS) * 100);
  const star = pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐';
  const msg = pct >= 80 ? (language === 'bm' ? "Hebat! Kamu kenal huruf Jawi!" : "Great!") : pct >= 50 ? (language === 'bm' ? 'Bagus! Cuba lagi!' : 'Good! Try again!') : (language === 'bm' ? 'Cuba lagi ya!' : 'Try again!');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#67D6E8', margin: 0 }}>{score} / {TOTAL_ROUNDS}</h2>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: '1.05rem', color: '#CBD5E0', margin: 0 }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #0891B2, #67D6E8)', borderRadius: 99, transition: 'width 0.8s ease' }} /></div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg, #0E7490, #0891B2)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(8,145,178,0.4)' }}>🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}</button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem', background: 'rgba(255,255,255,0.1)', color: '#CBD5E0', border: '2px solid rgba(255,255,255,0.15)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>← {language === 'bm' ? 'Kembali' : 'Back'}</button>
      </div>
    </div>
  );
}

export default function HurufJawiTunggal({ onBack, onNavigate, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  const half = Math.ceil(JAWI_LETTERS.length / 2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0B1A2E', color: '#F1F5F9', fontFamily: 'Inter, sans-serif' }}>
      <BackButton onClick={onBack} />
      <style>{`${FONT_IMPORT}
        @keyframes mari-pulse {
          0%, 100% { box-shadow: 0 4px 15px rgba(8,145,178,0.4); transform: scale(1); }
          50% { box-shadow: 0 4px 30px rgba(8,145,178,0.6), 0 0 0 4px rgba(8,145,178,0.1); transform: scale(1.03); }
        }
        @keyframes mari-sparkle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(15deg) scale(1.3); }
          75% { transform: rotate(-15deg) scale(1.2); }
        }
        @keyframes mari-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
      <div style={{ padding: '1.5rem 3.5rem 0.75rem', flexShrink: 0, textAlign: 'center' }}>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.65rem, 1.4vw, 0.75rem)', color: 'rgba(255,255,255,0.45)', margin: '0 0 0.35rem' }}>Celik Jawi &rsaquo; Topik 6.1</p>
        <h1 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: '#67D6E8', margin: '0 0 0.75rem' }}>{language === 'bm' ? 'Huruf Jawi Tunggal' : 'Single Jawi Letters'}</h1>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ id: 'belajar', label: '📖 Belajar' }, { id: 'kuiz', label: '🎯 Kuiz' }].map(t => (
            <button key={t.id} onClick={() => { setTab(t.id); playHoverSound(); if (t.id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.82rem, 2vw, 0.95rem)', padding: '8px 22px', borderRadius: 999, border: '2px solid', cursor: 'pointer', transition: 'all 0.2s ease', background: tab === t.id ? 'linear-gradient(135deg, #0E7490, #0891B2)' : 'rgba(255,255,255,0.07)', borderColor: tab === t.id ? '#0891B2' : 'rgba(255,255,255,0.15)', color: tab === t.id ? '#fff' : '#94A3B8', boxShadow: tab === t.id ? '0 4px 14px rgba(8,145,178,0.35)' : 'none' }}>{t.label}</button>
          ))}
          <button
            onClick={() => { playHoverSound(); onNavigate?.('jawi-kvk-learning'); }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(8,145,178,0.5), 0 0 0 4px rgba(8,145,178,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.93) rotate(0deg)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg)'; }}
            style={{
              width: 100, height: 100,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
              fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
              fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
              padding: 0, borderRadius: 18, border: 'none',
              cursor: 'pointer', userSelect: 'none', flexShrink: 0,
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              background: 'linear-gradient(145deg, #0E7490, #0891B2, #06B6D4)',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(8,145,178,0.4)',
              animation: 'mari-pulse 2s ease-in-out infinite',
            }}
          >
            <span style={{ display: 'inline-block', animation: 'mari-sparkle 2s ease-in-out infinite', fontSize: '1rem', lineHeight: 1 }}>✨</span>
            <span style={{ fontFamily: "'Amiri', serif", fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.1, display: 'flex', gap: 3, direction: 'rtl' }}>
              <span style={{ animation: 'mari-bounce 1.5s ease-in-out infinite', animationDelay: '0s' }}>ا</span>
              <span style={{ animation: 'mari-bounce 1.5s ease-in-out infinite', animationDelay: '0.15s' }}>ب</span>
              <span style={{ animation: 'mari-bounce 1.5s ease-in-out infinite', animationDelay: '0.3s' }}>ت</span>
            </span>
            <span style={{ fontSize: '0.6rem', opacity: 0.85 }}>
              {language === 'bm' ? 'Belajar' : 'Learn'}
            </span>
          </button>
        </div>
      </div>
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {KONSEP.map((k, i) => <FaqItem key={i} item={k} isOpen={openFaq === i} onToggle={() => { setOpenFaq(openFaq === i ? null : i); playHoverSound(); }} />)}
          </div>

          <div style={{ marginTop: '0.5rem', textAlign: 'center', paddingBottom: '1rem' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #0E7490, #0891B2)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(8,145,178,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}><ResultScreen score={finalScore} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} /></div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}><QuizScreen key={quizKey} language={language} onDone={(s) => { setFinalScore(s); setQuizDone(true); }} /></div>
      )}
    </div>
  );
}
