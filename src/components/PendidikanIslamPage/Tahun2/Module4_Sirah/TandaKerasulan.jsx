import React, { useState, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';
import Tahun1LessonLayout from '../../Tahun1/Tahun1LessonLayout';

const KONSEP = [
  {
    icon: '🪨', label: 'Batu Memberi Salam', sublabel: 'Sebelum kerasulan',
    desc: 'Sebelum diangkat menjadi rasul, batu-batu di Mekah memberi salam kepada Nabi Muhammad SAW. Baginda mendengar ucapan salam dari batu yang dilalui.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🌴', label: 'Pokok Memberi Perlindungan', sublabel: 'Naungan dari alam',
    desc: 'Pokok dan pepohon memberikan perlindungan kepada Nabi ketika musim panas yang terik. Ini adalah tanda bahawa alam semesta mengiktiraf kemuliaan baginda.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '📜', label: 'Disebut dalam Kitab', sublabel: 'Taurat & Injil',
    desc: 'Nama Nabi Muhammad SAW telah disebut dalam kitab Taurat dan Injil sebagai nabi terakhir yang akan diutuskan. Ahli kitab mengetahuinya.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '✨', label: 'Cahaya di Wajah', sublabel: 'Sejak kecil',
    desc: 'Sejak kecil, cahaya kenabian kelihatan pada wajah Nabi Muhammad SAW. Wajah baginda bersinar-sinar dan memancarkan cahaya yang menarik perhatian.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '🫀', label: 'Pembelahan Dada', sublabel: 'Pembersihan oleh malaikat',
    desc: 'Malaikat Jibril telah membelah dada Nabi ketika kecil untuk mengeluarkan segumpal darah dan membersihkan hati baginda dengan air zamzam.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🌿', label: 'Rahmat & Keberkatan', sublabel: 'Menyertai Baginda',
    desc: 'Di mana sahaja Nabi berada, rahmat dan keberkatan menyertai baginda. Masyarakat dan alam sekitar mendapat kebaikan dengan kehadiran baginda.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Apa yang memberi salam kepada Nabi sebelum kerasulan?', answer: 'Batu', options: ['Batu', 'Pokok', 'Malaikat', 'Haiwan'] },
  { question: 'Apa tanda alam yang menunjukkan kemuliaan Nabi?', answer: 'Pokok memberi perlindungan', options: ['Pokok memberi perlindungan', 'Pokok berbuah', 'Pokok bercakap', 'Pokok menari'] },
  { question: 'Di mana nama Nabi disebut sebelum kelahirannya?', answer: 'Taurat dan Injil', options: ['Taurat dan Injil', 'Zabur sahaja', 'Kitab Mesir', 'Kitab Yunani'] },
  { question: 'Apa yang kelihatan pada wajah Nabi sejak kecil?', answer: 'Cahaya', options: ['Cahaya', 'Bintik hitam', 'Peluh', 'Air mata'] },
  { question: 'Siapa yang membelah dada Nabi untuk dibersihkan?', answer: 'Malaikat Jibril', options: ['Malaikat Jibril', 'Malaikat Mikail', 'Malaikat Israfil', 'Malaikat Izrail'] },
  { question: 'Hati Nabi dibersihkan dengan apa?', answer: 'Air zamzam', options: ['Air zamzam', 'Air mawar', 'Air madu', 'Air sungai'] },
  { question: 'Apa tanda kerasulan yang berkaitan dengan kitab?', answer: 'Nama Nabi disebut dalam kitab', options: ['Nama Nabi disebut dalam kitab', 'Nabi menulis kitab', 'Nabi membaca kitab', 'Kitab turun kepada Nabi'] },
  { question: 'Keberkatan dan rahmat menyertai Nabi di mana?', answer: 'Di mana sahaja', options: ['Di mana sahaja', 'Di Mekah sahaja', 'Di Madinah sahaja', 'Di masjid sahaja'] },
]);

const TOTAL_ROUNDS = 8;

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
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => { setShowDesc(s => !s); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.72rem', color: k.color, background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999, padding: '3px 12px', cursor: 'pointer', WebkitTapHighlightColor: 'transparent' }}>
          {showDesc ? '▲ Tutup' : 'ℹ️ Penjelasan'}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); SpeechManager.stopSpeaking(); SpeechManager.speak(k.desc, 'ms-MY', { rate: 0.8 }); }}
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
            fontSize: '0.72rem', color: k.color,
            background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999,
            padding: '3px 12px', cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          🔊
        </button>
      </div>
    </div>
  );
}

export default function TandaKerasulan({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  useEffect(() => () => SpeechManager.stopSpeaking(), []);
  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › Topik 4.1"
      title={language === 'bm' ? 'Tanda-tanda Kerasulan' : 'Signs of Prophethood'}
      accentColor="#8B5CF6"
      tab={tab}
      onTabChange={(id) => { setTab(id); playHoverSound(); if (id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } }}
    >
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
            {KONSEP.map((k, i) => <ConceptCard key={i} k={k} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #7A55E0, #8B5CF6)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(139,92,246,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}><ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} accentColor="#8B5CF6" accentGradient='linear-gradient(135deg, #7A55E0, #8B5CF6)' /></div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}><QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#8B5CF6" emoji="🌟" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} /></div>
      )}
    </Tahun1LessonLayout>
  );
}
