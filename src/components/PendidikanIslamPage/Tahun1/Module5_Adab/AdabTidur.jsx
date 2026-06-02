import React, { useState, useCallback } from 'react';
import Tahun1LessonLayout from '../Tahun1LessonLayout';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

const KONSEP = [
  {
    icon: '🌙', label: 'Doa Sebelum Tidur', sublabel: 'Baca doa tidur',
    desc: 'Sebelum tidur, bacalah doa: "Bismikallahumma ahya wa amut" — Dengan nama-Mu Ya Allah aku hidup dan mati. Juga baca Al-Ikhlas, Al-Falaq dan An-Nas.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '➡️', label: 'Tidur Mengiring ke Kanan', sublabel: 'Sunat Nabi',
    desc: 'Tidurlah mengiring ke sebelah kanan, menghadap kiblat. Ini adalah cara tidur yang paling baik dan sunnah Nabi. Jangan tidur meniarap.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🧹', label: 'Kemas Tempat Tidur', sublabel: 'Sejadah & bantal',
    desc: 'Sebelum tidur, kemas dan lap tempat tidur. Sapu tempat tidur dengan kain untuk membuang habuk dan kotoran.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '🕰️', label: 'Jangan Tidur Lewat', sublabel: 'Tidur awal, bangun awal',
    desc: 'Tidurlah awal supaya dapat bangun awal untuk solat Subuh. Rasulullah tidak suka tidur lewat selepas Isyak tanpa ada keperluan.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '☀️', label: 'Doa Bangun Tidur', sublabel: 'Syukur pada Allah',
    desc: 'Apabila bangun tidur, bacalah doa: "Alhamdulillahillazi ahyana ba\'da ma amatana wa ilaihin nusyur" — Segala puji bagi Allah yang menghidupkan kami selepas mematikan kami.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🫡', label: 'Bersih & Gosok Gigi', sublabel: 'Selepas bangun',
    desc: 'Selepas bangun tidur, basuh muka dan gosok gigi. Rasulullah menggunakan siwak untuk membersihkan mulut selepas bangun.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Apa doa sebelum tidur?', answer: 'Bismikallahumma ahya wa amut', options: ['Bismikallahumma ahya wa amut', 'Alhamdulillahillazi ahyana', 'Rabbana atina', 'Subhanallah'] },
  { question: 'Cara tidur yang sunnah?', answer: 'Mengiring ke kanan', options: ['Mengiring ke kanan', 'Meniarap', 'Telentang', 'Mengiring ke kiri'] },
  { question: 'Apa doa bangun tidur?', answer: 'Alhamdulillahillazi ahyana', options: ['Alhamdulillahillazi ahyana', 'Bismikallahumma', 'Allahuakbar', 'Laa ilaha illallah'] },
  { question: 'Apa yang dilakukan sebelum tidur?', answer: 'Kemas & lap tempat tidur', options: ['Kemas & lap tempat tidur', 'Makan', 'Main', 'Baca buku'] },
  { question: 'Nabi menggunakan apa untuk bersihkan mulut?', answer: 'Siwak', options: ['Siwak', 'Berus gigi', 'Ubat gigi', 'Air garam'] },
  { question: 'Tidur yang baik adalah?', answer: 'Tidur awal, bangun awal', options: ['Tidur awal, bangun awal', 'Tidur lewat', 'Tidur petang', 'Tidur sepanjang hari'] },
  { question: 'Sebelum tidur kita baca surah?', answer: 'Al-Ikhlas, Al-Falaq, An-Nas', options: ['Al-Ikhlas, Al-Falaq, An-Nas', 'Al-Fatihah', 'Al-Baqarah', 'Yasin'] },
  { question: 'Tidur meniarap adalah?', answer: 'Tidak digalakkan', options: ['Tidak digalakkan', 'Digalakkan', 'Sunat', 'Wajib'] },
  { question: 'Rasulullah tidak suka tidur lewat selepas?', answer: 'Solat Isyak', options: ['Solat Isyak', 'Solat Maghrib', 'Solat Subuh', 'Solat Zuhur'] },
  { question: 'Selepas bangun tidur kita patut?', answer: 'Basuh muka & gosok gigi', options: ['Basuh muka & gosok gigi', 'Terus makan', 'Main', 'Tidur lagi'] },
]);

const TOTAL_ROUNDS = 10;

function ConceptCard({ k }) {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div style={{ background: k.gradient, border: `2.5px solid ${k.border}`, borderRadius: 20, padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <span style={{ fontSize: '2.6rem', lineHeight: 1 }}>{k.icon}</span>
      <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#1A202C', margin: 0, lineHeight: 1.2 }}>{k.label}</p>
      <span style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.68rem, 1.6vw, 0.8rem)', color: k.color, background: 'rgba(255,255,255,0.5)', padding: '2px 10px', borderRadius: 999 }}>{k.sublabel}</span>
      {showDesc && (
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)', color: '#374151', margin: 0, lineHeight: 1.5, background: 'rgba(255,255,255,0.55)', borderRadius: 10, padding: '7px 10px', width: '100%', boxSizing: 'border-box' }}>
          {k.desc}
        </p>
      )}
      <button onClick={() => { setShowDesc(s => !s); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.72rem', color: k.color, background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999, padding: '3px 12px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
        {showDesc ? '▲ Tutup' : 'ℹ️ Penjelasan'}
      </button>
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
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #0891B2, #67D6E8)', borderRadius: 99, transition: 'width 0.4s ease' }} /></div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#67D6E8', whiteSpace: 'nowrap' }}>{round + 1} / {TOTAL_ROUNDS}</span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B' }}>⭐ {score}</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, background: '#FFFFFF', border: '2px solid rgba(0,0,0,0.06)', borderRadius: 20, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textAlign: 'center', position: 'relative', overflow: 'visible' }}>
        {chosen && correct && <Celebration />}
        <span style={{ fontSize: '3rem' }}>🌙</span>
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--pi-ink)', margin: 0, lineHeight: 1.4, maxWidth: 320 }}>{q.question}</p>
      </div>
      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {q.options.map(opt => {
          const isChosen = chosen === opt, isCorrect = isChosen && correct, isWrong = isChosen && !correct, isAnswer = chosen && opt === q.answer && !isChosen;
          return <button key={opt} onClick={() => handleAnswer(opt)} disabled={!!chosen} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', padding: '13px 16px', borderRadius: 14, border: '2.5px solid', cursor: chosen ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s ease', background: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? 'rgba(16,185,129,0.2)' : '#FFFFFF', borderColor: isCorrect ? '#10B981' : isWrong ? '#EF4444' : isAnswer ? '#10B981' : 'rgba(0,0,0,0.1)', color: isCorrect || isWrong ? '#fff' : 'var(--pi-ink)', transform: isChosen ? 'scale(1.02)' : 'scale(1)' }}><span>{opt}</span><span>{isCorrect ? '✅' : isWrong ? '❌' : isAnswer ? '✅' : ''}</span></button>;
        })}
      </div>
    </div>
  );
}

function ResultScreen({ score, onRetry, onBack, language }) {
  const pct = Math.round((score / TOTAL_ROUNDS) * 100);
  const star = pct >= 80 ? '🌟🌟🌟' : pct >= 50 ? '⭐⭐' : '⭐';
  const msg = pct >= 80 ? (language === 'bm' ? "Hebat! Kamu tahu adab tidur!" : "Great!") : pct >= 50 ? (language === 'bm' ? 'Bagus! Cuba lagi!' : 'Good! Try again!') : (language === 'bm' ? 'Cuba lagi ya!' : 'Try again!');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#67D6E8', margin: 0 }}>{score} / {TOTAL_ROUNDS}</h2>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: '1.05rem', color: 'var(--pi-muted)', margin: 0 }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #0891B2, #67D6E8)', borderRadius: 99, transition: 'width 0.8s ease' }} /></div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg, #0E7490, #0891B2)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(8,145,178,0.4)' }}>🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}</button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem', background: 'rgba(0,0,0,0.04)', color: 'var(--pi-muted)', border: '2px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>← {language === 'bm' ? 'Kembali' : 'Back'}</button>
      </div>
    </div>
  );
}

export default function AdabTidur({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);

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
      breadcrumb="Adab &amp; Akhlak › Topik 5.2"
      title={language === 'bm' ? 'Adab Tidur &amp; Bangun' : 'Sleeping &amp; Waking Etiquette'}
      accentColor="#0891B2"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`.at-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; }`}</style>
      {tab === 'belajar' ? (
        <div style={{ padding: '0 1.25rem' }}>
          <div className="at-grid">
            {KONSEP.map((k, i) => <ConceptCard key={i} k={k} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #0E7490, #0891B2)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(8,145,178,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}><ResultScreen score={finalScore} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} /></div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}><QuizScreen key={quizKey} language={language} onDone={(s) => { setFinalScore(s); setQuizDone(true); }} /></div>
      )}
    </Tahun1LessonLayout>
  );
}
