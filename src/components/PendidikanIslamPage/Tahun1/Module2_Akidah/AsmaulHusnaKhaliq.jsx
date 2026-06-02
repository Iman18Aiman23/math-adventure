import React, { useState, useCallback } from 'react';
import Tahun1LessonLayout from '../Tahun1LessonLayout';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

// ── Al-Khaliq content ─────────────────────────────────────────────────────────
// Arabic text: public domain Islamic content.
// Explanations and descriptions: originally written for this app.
const KHALIQ = {
  ar: 'الْخَالِقُ',
  rumi: 'Al-Khaliq',
  meaning: 'Yang Maha Pencipta',
  meaningEng: 'The Creator',
  desc: 'Allah menciptakan segala sesuatu dari tiada menjadi ada. Hanya Allah yang berkuasa mencipta — tiada makhluk lain yang mampu mencipta seperti ciptaan-Nya.',
  descEng: 'Allah creates everything from nothing. Only Allah has the power to create — no creature can create as He does.',
  quranRef: 'هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ',
  quranSource: '(Surah Al-Hasyr 59:24)',
  quranMeaning: 'Dialah Allah, Yang Maha Pencipta, Yang Maha Mengadakan, Yang Maha Membentuk rupa.',
};

// Examples of Allah's creation — suitable for Tahun 1 children
const CIPTAAN = [
  { icon: '🌍', name: 'Bumi & Langit', desc: 'Allah mencipta langit dan bumi beserta segala isinya.' },
  { icon: '🌟', name: 'Bintang & Bulan', desc: 'Allah mencipta matahari, bulan, dan bintang-bintang di langit.' },
  { icon: '🌊', name: 'Laut & Sungai', desc: 'Allah mencipta lautan, sungai, dan semua air di bumi.' },
  { icon: '👤', name: 'Manusia', desc: 'Allah mencipta manusia dari tanah dan meniupkan roh ke dalamnya.' },
  { icon: '🐘', name: 'Haiwan', desc: 'Allah mencipta pelbagai haiwan — dari semut kecil hingga gajah besar.' },
  { icon: '🌺', name: 'Tumbuhan', desc: 'Allah mencipta pokok, bunga, buah-buahan, dan semua tumbuhan.' },
];

// ── Quiz questions ─────────────────────────────────────────────────────────────
const QUESTIONS = shuffle([
  {
    question: 'Apakah maksud nama Allah "Al-Khaliq"?',
    answer: 'Yang Maha Pencipta',
    options: ['Yang Maha Pencipta', 'Yang Maha Pemurah', 'Yang Maha Mengetahui', 'Yang Maha Pengasih'],
  },
  {
    question: 'Siapakah yang mencipta langit dan bumi?',
    answer: 'Allah',
    options: ['Allah', 'Malaikat', 'Manusia', 'Jin'],
  },
  {
    question: 'Al-Khaliq bermaksud Allah itu Maha ___.',
    answer: 'Pencipta',
    options: ['Pencipta', 'Pengampun', 'Pembalas', 'Penguasa'],
  },
  {
    question: 'Yang manakah BUKAN ciptaan Allah?',
    answer: 'Kereta buatan manusia',
    options: ['Kereta buatan manusia', 'Haiwan', 'Manusia', 'Bintang di langit'],
  },
  {
    question: 'Bagaimana Allah mencipta segala sesuatu?',
    answer: 'Dari tiada menjadi ada',
    options: [
      'Dari tiada menjadi ada',
      'Dari air dan api',
      'Dari logam dan kayu',
      'Dari batu dan pasir',
    ],
  },
  {
    question: '"الْخَالِقُ" dibaca sebagai?',
    answer: 'Al-Khaliq',
    options: ['Al-Khaliq', 'Al-Karim', 'Al-Hakim', 'Al-Rahim'],
  },
  {
    question: 'Manusia diciptakan Allah daripada apa?',
    answer: 'Tanah',
    options: ['Tanah', 'Air', 'Cahaya', 'Api'],
  },
  {
    question: 'Malaikat diciptakan Allah daripada apa?',
    answer: 'Cahaya',
    options: ['Cahaya', 'Tanah', 'Api', 'Angin'],
  },
  {
    question: 'Berapa bilangannya Asmaul Husna?',
    answer: '99',
    options: ['25', '66', '99', '114'],
  },
  {
    question: 'Asmaul Husna bermaksud?',
    answer: 'Nama-nama Allah yang indah',
    options: [
      'Nama-nama Allah yang indah',
      'Sifat-sifat malaikat',
      'Nama-nama Nabi',
      'Ayat-ayat al-Quran',
    ],
  },
]);

const TOTAL_ROUNDS = 10;

// ── Quiz screen ────────────────────────────────────────────────────────────────
function QuizScreen({ language, onDone }) {
  const [pool]      = useState(() => shuffle(QUESTIONS).slice(0, TOTAL_ROUNDS));
  const [round,     setRound]     = useState(0);
  const [score,     setScore]     = useState(0);
  const [chosen,    setChosen]    = useState(null);
  const [correct,   setCorrect]   = useState(null);
  const [animating, setAnimating] = useState(false);
  const q = pool[round];

  const handleAnswer = useCallback((opt) => {
    if (animating || chosen) return;
    const isCorrect = opt === q.answer;
    setChosen(opt); setCorrect(isCorrect);
    if (isCorrect) { setScore(s => s + 1); playSound('correct'); } else playSound('wrong');
    setAnimating(true);
    setTimeout(() => {
      setChosen(null); setCorrect(null); setAnimating(false);
      if (round + 1 >= TOTAL_ROUNDS) onDone(isCorrect ? score + 1 : score);
      else setRound(r => r + 1);
    }, 900);
  }, [animating, chosen, q, round, score, onDone]);

  if (!q) return null;
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '0.75rem 1.25rem calc(0.75rem + var(--safe-bottom, 0px))', overflow: 'hidden' }}>
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #F59E0B, #FDE68A)', borderRadius: 99, transition: 'width 0.4s ease' }} />
        </div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B', whiteSpace: 'nowrap' }}>{round + 1} / {TOTAL_ROUNDS}</span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B' }}>⭐ {score}</span>
      </div>
      <div style={{
        flex: 1, minHeight: 0,
        background: '#FFFFFF', border: '2px solid rgba(0,0,0,0.06)',
        borderRadius: 20, padding: '1rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem', textAlign: 'center', position: 'relative', overflow: 'visible',
      }}>
        {chosen && correct && <Celebration />}
        <p style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(2rem, 8vw, 3rem)', color: '#FDE68A', margin: 0, lineHeight: 1.6, direction: 'rtl' }}>
          {KHALIQ.ar}
        </p>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)', color: 'var(--pi-ink)', margin: 0, lineHeight: 1.4, maxWidth: 340 }}>
          {q.question}
        </p>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {q.options.map(opt => {
          const isChosen = chosen === opt, isCorrect = isChosen && correct, isWrong = isChosen && !correct, isAnswer = chosen && opt === q.answer && !isChosen;
          return (
            <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!chosen}
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
                fontSize: 'clamp(0.82rem, 2vw, 0.95rem)', padding: '11px 16px',
                borderRadius: 14, border: '2.5px solid', cursor: chosen ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                transition: 'all 0.2s ease', textAlign: 'left',
                background: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? 'rgba(16,185,129,0.2)' : '#FFFFFF',
                borderColor: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? '#10B981' : 'rgba(0,0,0,0.1)',
                color: isCorrect || isWrong ? '#fff' : 'var(--pi-ink)',
                transform: isChosen ? 'scale(1.02)' : 'scale(1)',
              }}>
              <span>{opt}</span>
              <span>{isCorrect ? '✅' : isWrong ? '❌' : isAnswer ? '✅' : ''}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Result screen ──────────────────────────────────────────────────────────────
function ResultScreen({ score, onRetry, onBack, language }) {
  const pct = Math.round((score / TOTAL_ROUNDS) * 100);
  const star = pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐';
  const msg = pct >= 80
    ? (language === 'bm' ? 'Cemerlang! Kamu faham Al-Khaliq dengan baik!' : 'Excellent! You understand Al-Khaliq well!')
    : pct >= 50
      ? (language === 'bm' ? 'Bagus! Teruskan berlatih.' : 'Good! Keep practising.')
      : (language === 'bm' ? 'Teruskan berlatih! Kamu pasti boleh!' : 'Keep going! You can do it!');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#F59E0B', margin: 0 }}>{score} / {TOTAL_ROUNDS}</h2>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.88rem, 2.2vw, 1.05rem)', color: 'var(--pi-muted)', margin: 0, lineHeight: 1.5, maxWidth: 320 }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #F59E0B, #FDE68A)', borderRadius: 99, transition: 'width 0.8s ease' }} />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: 'linear-gradient(135deg, #D97706, #F59E0B)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(217,119,6,0.4)' }}>
          🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}
        </button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.85rem, 2vw, 1rem)', background: 'rgba(0,0,0,0.04)', color: 'var(--pi-muted)', border: '2px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>
          ← {language === 'bm' ? 'Kembali' : 'Back'}
        </button>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function AsmaulHusnaKhaliq({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);

  const handleTabChange = useCallback((t) => {
    setTab(t);
    playHoverSound();
    if (t === 'kuiz') {
      setQuizDone(false);
      setQuizKey(k => k + 1);
    }
  }, []);

  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Akidah &rsaquo; Topik 2.4"
      title={language === 'bm' ? 'Asmaul Husna: Al-Khaliq' : 'Beautiful Names: Al-Khaliq'}
      accentColor="#2A9A6C"
      tab={tab}
      onTabChange={handleTabChange}
    >

      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>

          {/* Main name card */}
          <div style={{
            background: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
            border: '2.5px solid rgba(212,150,10,0.5)', borderRadius: 22,
            padding: '20px 18px', marginBottom: '1rem',
            boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 12px 28px rgba(217,119,6,0.25)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <p style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(2.8rem, 10vw, 4rem)', color: '#92400E', margin: 0, lineHeight: 1.4, direction: 'rtl' }}>
                {KHALIQ.ar}
              </p>
              <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#92400E', margin: '4px 0 0', letterSpacing: '0.04em' }}>
                {KHALIQ.rumi}
              </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.55)', borderRadius: 14, padding: '12px 14px' }}>
              <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: '#92400E', margin: '0 0 6px', textAlign: 'center' }}>
                {language === 'bm' ? KHALIQ.meaning : KHALIQ.meaningEng}
              </p>
              <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.74rem, 1.8vw, 0.88rem)', color: '#374151', margin: 0, lineHeight: 1.5 }}>
                {language === 'bm' ? KHALIQ.desc : KHALIQ.descEng}
              </p>
            </div>
          </div>

          {/* Quran reference */}
          <div style={{
            background: 'rgba(212,150,10,0.1)', border: '1.5px solid rgba(212,150,10,0.3)',
            borderRadius: 14, padding: '12px 14px', marginBottom: '1rem',
          }}>
            <p style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1rem, 3.5vw, 1.35rem)', color: '#FDE68A', direction: 'rtl', textAlign: 'right', margin: '0 0 6px', lineHeight: 1.9 }}>
              {KHALIQ.quranRef}
            </p>
            <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.7rem, 1.6vw, 0.82rem)', color: '#F59E0B', margin: '0 0 4px' }}>
              {KHALIQ.quranSource}
            </p>
            <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500, fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', color: 'var(--pi-ink)', margin: 0, lineHeight: 1.5 }}>
              {KHALIQ.quranMeaning}
            </p>
          </div>

          {/* Contoh ciptaan */}
          <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#FDE68A', margin: '0 0 0.75rem', paddingLeft: 10, borderLeft: '4px solid #F59E0B' }}>
            {language === 'bm' ? 'Contoh Ciptaan Allah' : "Examples of Allah's Creation"}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {CIPTAAN.map((c, i) => (
              <div key={i} style={{
                background: 'rgba(245,158,11,0.1)', border: '1.5px solid rgba(245,158,11,0.25)',
                borderRadius: 14, padding: '12px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center',
              }}>
                <span style={{ fontSize: '1.8rem' }}>{c.icon}</span>
                <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', color: '#FDE68A', margin: 0 }}>{c.name}</p>
                <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500, fontSize: 'clamp(0.66rem, 1.5vw, 0.76rem)', color: 'var(--pi-muted)', margin: 0, lineHeight: 1.4 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #D97706, #F59E0B)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(217,119,6,0.4)' }}>
              🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →
            </button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ResultScreen score={finalScore} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} />
        </div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
          <QuizScreen key={quizKey} language={language} onDone={(s) => { setFinalScore(s); setQuizDone(true); }} />
        </div>
      )}
    </Tahun1LessonLayout>
  );
}
