import React, { useState, useCallback } from 'react';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';
import Tahun1LessonLayout from '../Tahun1LessonLayout';

const RUKUN = [
  { n: 1, icon: '🙏', label: 'Niat', desc: 'Berniat dalam hati untuk berwuduk kerana Allah.', accent: '#3B82F6' },
  { n: 2, icon: '👤', label: 'Basuh Muka', desc: 'Membasuh seluruh muka dari dahi hingga dagu, dan dari telinga ke telinga.', accent: '#10B981' },
  { n: 3, icon: '💪', label: 'Basuh Tangan', desc: 'Membasuh kedua-dua belah tangan hingga siku, termasuk siku.', accent: '#F59E0B' },
  { n: 4, icon: '🤚', label: 'Sapu Kepala', desc: 'Menyapu sebahagian rambut kepala dengan tangan yang basah.', accent: '#8B5CF6' },
  { n: 5, icon: '🦶', label: 'Basuh Kaki', desc: 'Membasuh kedua-dua belah kaki hingga buku lali, termasuk buku lali.', accent: '#EC4899' },
  { n: 6, icon: '🔢', label: 'Tertib', desc: 'Melakukan semua rukun mengikut susunan yang betul dari mula hingga akhir.', accent: '#0891B2' },
];

const SUNAT = [
  { icon: '🗣️', label: 'Baca Bismillah', desc: 'Membaca "Bismillah" sebelum memulakan wuduk.' },
  { icon: '🦷', label: 'Gosok Gigi', desc: 'Menggosok gigi (bersiwak) sebelum berwuduk.' },
  { icon: '🖐️', label: 'Basuh Tangan 3×', desc: 'Membasuh kedua-dua belah tangan hingga pergelangan terlebih dahulu.' },
  { icon: '👄', label: 'Kumur-kumur', desc: 'Memasukkan air ke dalam mulut dan berkumur.' },
  { icon: '👃', label: 'Air ke Hidung', desc: 'Memasukkan air ke dalam lubang hidung kemudian menghembusnya keluar.' },
  { icon: '3️⃣', label: 'Basuh 3 Kali', desc: 'Membasuh setiap anggota wuduk sebanyak tiga kali.' },
];

const BATAL = [
  { icon: '🚽', label: 'Keluar dari Qubul/Dubur', desc: 'Keluar apa-apa sahaja dari tempat buang air — seperti air kencing, angin, atau najis.' },
  { icon: '😴', label: 'Tidur / Pengsan', desc: 'Tidur nyenyak, pengsan, atau hilang akal menyebabkan wuduk batal.' },
  { icon: '✋', label: 'Sentuh Kemaluan', desc: 'Menyentuh kemaluan sendiri dengan tapak tangan tanpa lapik.' },
  { icon: '🤝', label: 'Sentuh Bukan Mahram', desc: 'Bersentuhan kulit antara lelaki dan perempuan yang bukan mahram.' },
];

const QUESTIONS = shuffle([
  { question: 'Berapakah rukun wuduk?', answer: '6', options: ['4', '5', '6', '7'] },
  { question: 'Rukun wuduk ke-1?', answer: 'Niat', options: ['Niat', 'Basuh muka', 'Basuh kaki', 'Tertib'] },
  { question: 'Rukun wuduk ke-2?', answer: 'Basuh muka', options: ['Niat', 'Basuh muka', 'Sapu kepala', 'Basuh kaki'] },
  { question: 'Rukun wuduk ke-3?', answer: 'Basuh tangan', options: ['Basuh muka', 'Basuh tangan', 'Sapu kepala', 'Tertib'] },
  { question: 'Rukun wuduk ke-4?', answer: 'Sapu kepala', options: ['Basuh tangan', 'Sapu kepala', 'Basuh kaki', 'Niat'] },
  { question: 'Rukun wuduk ke-5?', answer: 'Basuh kaki', options: ['Niat', 'Basuh muka', 'Basuh kaki', 'Tertib'] },
  { question: 'Rukun wuduk ke-6?', answer: 'Tertib', options: ['Niat', 'Sapu kepala', 'Basuh kaki', 'Tertib'] },
  { question: 'Basuh tangan — hingga mana?', answer: 'Siku', options: ['Siku', 'Bahu', 'Jari sahaja', 'Pergelangan'] },
  { question: 'Basuh kaki — hingga mana?', answer: 'Buku lali', options: ['Lutut', 'Buku lali', 'Betis', 'Jari kaki'] },
  { question: 'Wuduk batal jika?', answer: 'Tidur nyenyak', options: ['Tidur nyenyak', 'Bersolat', 'Makan', 'Berjalan'] },
  { question: 'Wuduk batal jika?', answer: 'Keluar angin', options: ['Keluar angin', 'Minum air', 'Membaca', 'Duduk'] },
  { question: 'Sunat wuduk yang pertama?', answer: 'Baca Bismillah', options: ['Baca Bismillah', 'Kumur-kumur', 'Basuh tangan', 'Gosok gigi'] },
]);

const TOTAL_ROUNDS = 10;

// ── Step tile: icon + number + label + optional explanation ───────────────────
function StepTile({ item }) {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div style={{ background: 'rgba(255,255,255,0.7)', border: `2px solid ${item.accent}44`, borderRadius: 18, padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
      <span style={{ width: 30, height: 30, borderRadius: '50%', background: item.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.9rem', flexShrink: 0 }}>{item.n}</span>
      <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{item.icon}</span>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: 'var(--pi-ink)', margin: 0, lineHeight: 1.2 }}>{item.label}</p>
      {showDesc && (
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: '0.72rem', color: 'var(--pi-muted)', margin: 0, lineHeight: 1.45, background: 'rgba(0,0,0,0.04)', borderRadius: 8, padding: '5px 7px', width: '100%', boxSizing: 'border-box' }}>{item.desc}</p>
      )}
      <button onClick={() => { setShowDesc(s => !s); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.65rem', color: item.accent, background: `${item.accent}22`, border: 'none', borderRadius: 999, padding: '2px 8px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
        {showDesc ? '▲' : 'ℹ️'}
      </button>
    </div>
  );
}

// ── Chip tile: for sunat & batal items ────────────────────────────────────────
function ChipTile({ icon, label, desc, accent }) {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div style={{ background: 'rgba(255,255,255,0.7)', border: `1.5px solid ${accent || 'rgba(0,0,0,0.1)'}`, borderRadius: 14, padding: '12px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
      <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{icon}</span>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)', color: 'var(--pi-ink)', margin: 0, lineHeight: 1.2 }}>{label}</p>
      {showDesc && (
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: '0.72rem', color: 'var(--pi-muted)', margin: 0, lineHeight: 1.45, background: 'rgba(0,0,0,0.04)', borderRadius: 8, padding: '5px 7px', width: '100%', boxSizing: 'border-box' }}>{desc}</p>
      )}
      <button onClick={() => { setShowDesc(s => !s); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.65rem', color: '#94A3B8', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 999, padding: '2px 8px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
        {showDesc ? '▲' : 'ℹ️'}
      </button>
    </div>
  );
}

function Section({ title, accent, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: '1rem' }}>
      <button onClick={() => { setOpen(o => !o); playHoverSound(); }} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: `${accent}22`, border: `1.5px solid ${accent}55`, borderRadius: 12, padding: '10px 14px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent', marginBottom: open ? '0.6rem' : 0 }}>
        <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(0.88rem, 2.2vw, 1rem)', color: accent, margin: 0 }}>{title}</p>
        <span style={{ color: accent, fontWeight: 700, fontSize: '0.85rem' }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && children}
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
        <div style={{ flex: 1, height: 8, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${(round / TOTAL_ROUNDS) * 100}%`, background: 'linear-gradient(90deg, #10B981, #6EE7B7)', borderRadius: 99, transition: 'width 0.4s ease' }} /></div>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#6EE7B7', whiteSpace: 'nowrap' }}>{round + 1} / {TOTAL_ROUNDS}</span>
        <span style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.85rem', color: '#F59E0B' }}>⭐ {score}</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, background: '#FFFFFF', border: '2px solid rgba(0,0,0,0.06)', borderRadius: 20, padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textAlign: 'center', position: 'relative', overflow: 'visible' }}>
        {chosen && correct && <Celebration />}
        <span style={{ fontSize: '3rem' }}>🤲</span>
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
  const msg = pct >= 80 ? (language === 'bm' ? 'Hebat! Kamu tahu amali wuduk!' : 'Great!') : pct >= 50 ? (language === 'bm' ? 'Bagus! Cuba lagi!' : 'Good!') : (language === 'bm' ? 'Cuba lagi ya!' : 'Try again!');
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '3rem' }}>{star}</div>
      <h2 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.4rem, 4vw, 2rem)', color: '#6EE7B7', margin: 0 }}>{score} / {TOTAL_ROUNDS}</h2>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: '1.05rem', color: 'var(--pi-muted)', margin: 0 }}>{msg}</p>
      <div style={{ width: '100%', maxWidth: 300, height: 12, borderRadius: 99, background: 'rgba(0,0,0,0.08)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #10B981, #6EE7B7)', borderRadius: 99, transition: 'width 0.8s ease' }} /></div>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={onRetry} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem', background: 'linear-gradient(135deg, #065F46, #10B981)', color: '#fff', border: 'none', borderRadius: 999, padding: '10px 28px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(16,185,129,0.4)' }}>🔁 {language === 'bm' ? 'Cuba Lagi' : 'Try Again'}</button>
        <button onClick={onBack} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1rem', background: 'rgba(0,0,0,0.04)', color: 'var(--pi-muted)', border: '2px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '10px 28px', cursor: 'pointer' }}>← {language === 'bm' ? 'Kembali' : 'Back'}</button>
      </div>
    </div>
  );
}

export default function AmaliWuduk({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › Topik 3.3"
      title={language === 'bm' ? 'Amali Wuduk' : 'Wuduk Practice'}
      accentColor="#2563EB"
      tab={tab}
      onTabChange={(id) => { playHoverSound(); if (id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } setTab(id); }}
    >
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <Section title={language === 'bm' ? '🕌 Rukun Wuduk (6 Perkara)' : '🕌 Pillars of Wuduk (6)'} accent="#3B82F6">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
              {RUKUN.map(r => <StepTile key={r.n} item={r} />)}
            </div>
          </Section>
          <Section title={language === 'bm' ? '✨ Sunat Wuduk' : '✨ Recommended Acts'} accent="#10B981" defaultOpen={false}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
              {SUNAT.map((s, i) => <ChipTile key={i} icon={s.icon} label={s.label} desc={s.desc} accent="#10B98144" />)}
            </div>
          </Section>
          <Section title={language === 'bm' ? '❌ Perkara Membatalkan' : '❌ Things That Invalidate'} accent="#EF4444" defaultOpen={false}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem' }}>
              {BATAL.map((b, i) => <ChipTile key={i} icon={b.icon} label={b.label} desc={b.desc} accent="#EF444444" />)}
            </div>
          </Section>
          <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #065F46, #10B981)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(16,185,129,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
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
