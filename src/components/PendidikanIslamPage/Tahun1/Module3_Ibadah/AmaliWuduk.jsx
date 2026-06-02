import React, { useState, useCallback, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';

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
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => { setShowDesc(s => !s); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.65rem', color: item.accent, background: `${item.accent}22`, border: 'none', borderRadius: 999, padding: '2px 8px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
          {showDesc ? '▲' : 'ℹ️'}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); SpeechManager.stopSpeaking(); SpeechManager.speak(item.desc, 'ms-MY', { rate: 0.8 }); }}
          style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.65rem', color: item.accent, background: `${item.accent}22`, border: 'none', borderRadius: 999, padding: '2px 8px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
        >
          🔊
        </button>
      </div>
    </div>
  );
}

function ChipTile({ icon, label, desc, accent }) {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div style={{ background: 'rgba(255,255,255,0.7)', border: `1.5px solid ${accent || 'rgba(0,0,0,0.1)'}`, borderRadius: 14, padding: '12px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center' }}>
      <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{icon}</span>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)', color: 'var(--pi-ink)', margin: 0, lineHeight: 1.2 }}>{label}</p>
      {showDesc && (
        <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: '0.72rem', color: 'var(--pi-muted)', margin: 0, lineHeight: 1.45, background: 'rgba(0,0,0,0.04)', borderRadius: 8, padding: '5px 7px', width: '100%', boxSizing: 'border-box' }}>{desc}</p>
      )}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => { setShowDesc(s => !s); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.65rem', color: '#94A3B8', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 999, padding: '2px 8px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
          {showDesc ? '▲' : 'ℹ️'}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); SpeechManager.stopSpeaking(); SpeechManager.speak(desc, 'ms-MY', { rate: 0.8 }); }}
          style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.65rem', color: '#94A3B8', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 999, padding: '2px 8px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}
        >
          🔊
        </button>
      </div>
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

export default function AmaliWuduk({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  useEffect(() => () => SpeechManager.stopSpeaking(), []);
  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › Topik 3.3"
      title={language === 'bm' ? 'Amali Wuduk' : 'Wuduk Practice'}
      accentColor="#2A9A6C"
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
        <ResultScreen
          score={finalScore}
          totalRounds={TOTAL_ROUNDS}
          onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }}
          onBack={() => setTab('belajar')}
          language={language}
          accentColor="#2A9A6C"
          accentGradient="linear-gradient(135deg, #065F46, #10B981)"
        />
      ) : (
        <QuizScreen
          key={quizKey}
          language={language}
          questions={QUESTIONS}
          totalRounds={TOTAL_ROUNDS}
          accentColor="#2A9A6C"
          onDone={(s) => { setFinalScore(s); setQuizDone(true); }}
          emoji="🤲"
        />
      )}
    </Tahun1LessonLayout>
  );
}
