import React, { useState, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';
import Tahun1LessonLayout from '../../Tahun1/Tahun1LessonLayout';

const KONSEP = [
  {
    icon: '🏔️', label: 'Berkhalwat di Gua Hira\'', sublabel: 'Mengasingkan diri',
    desc: 'Nabi Muhammad SAW sering berkhalwat (mengasingkan diri) di Gua Hira\' untuk beribadat dan merenung ciptaan Allah sebelum diangkat menjadi rasul.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '👼', label: 'Malaikat Jibril Datang', sublabel: 'Utusan Allah',
    desc: 'Malaikat Jibril datang kepada Nabi ketika baginda sedang berkhalwat di Gua Hira\'. Jibril menyampaikan wahyu pertama daripada Allah SWT.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '📖', label: 'Perintah "Iqra!"', sublabel: 'Bacalah!',
    desc: 'Malaikat Jibril memerintahkan Nabi membaca dengan berkata "Iqra!" (Bacalah!). Nabi menjawab "Aku tidak boleh membaca", diulang sebanyak tiga kali.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '📜', label: 'Surah Al-Alaq 1-5', sublabel: 'Wahyu pertama',
    desc: 'Surah Al-Alaq ayat 1 hingga 5 diturunkan sebagai wahyu pertama. Kandungannya menyeru manusia membaca, belajar, dan mengenal Allah Yang Maha Pencipta.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '😰', label: 'Nabi Rasa Takut', sublabel: 'Menggigil ketakutan',
    desc: 'Selepas menerima wahyu, Nabi berasa sangat takut dan menggigil. Baginda pulang kepada isterinya Siti Khadijah dalam keadaan cemas dan menggigil.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🤱', label: 'Khadijah Menenangkan', sublabel: 'Isteri yang setia',
    desc: 'Siti Khadijah menenangkan Nabi dengan kata-kata yang lembut. Baginda meyakinkan Nabi bahawa Allah tidak akan menghinakan orang yang baik dan amanah.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
  {
    icon: '👴', label: 'Waraqah bin Naufal', sublabel: 'Mengesahkan kenabian',
    desc: 'Waraqah bin Naufal, seorang pendita Nasrani yang tua, mengesahkan bahawa yang datang kepada Nabi adalah Jibril, malaikat yang sama diutus kepada Nabi Musa AS.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Di manakah Nabi berkhalwat sebelum menerima wahyu?', answer: 'Gua Hira\'', options: ['Gua Hira\'', 'Gua Thur', 'Masjidil Haram', 'Rumah Khadijah'] },
  { question: 'Malaikat apa yang menyampaikan wahyu pertama?', answer: 'Jibril', options: ['Jibril', 'Mikail', 'Israfil', 'Izrail'] },
  { question: 'Apa perintah pertama yang disampaikan oleh Jibril?', answer: 'Iqra! (Bacalah!)', options: ['Iqra! (Bacalah!)', 'Sembahyanglah!', 'Berpuasalah!', 'Bersedekahlah!'] },
  { question: 'Berapa kali Jibril menyuruh Nabi membaca?', answer: '3 kali', options: ['3 kali', '1 kali', '2 kali', '5 kali'] },
  { question: 'Surah apa yang diturunkan sebagai wahyu pertama?', answer: 'Al-Alaq', options: ['Al-Alaq', 'Al-Fatihah', 'Al-Ikhlas', 'An-Nas'] },
  { question: 'Siapa yang menenangkan Nabi selepas menerima wahyu?', answer: 'Siti Khadijah', options: ['Siti Khadijah', 'Abu Bakar', 'Ali bin Abi Talib', 'Aminah'] },
  { question: 'Siapa yang mengesahkan kenabian Nabi Muhammad?', answer: 'Waraqah bin Naufal', options: ['Waraqah bin Naufal', 'Abu Lahab', 'Abdul Muttalib', 'Abu Talib'] },
  { question: 'Apa perasaan Nabi selepas menerima wahyu pertama?', answer: 'Takut dan menggigil', options: ['Takut dan menggigil', 'Gembira', 'Marah', 'Biasa sahaja'] },
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

export default function WahyuPertama({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  useEffect(() => () => SpeechManager.stopSpeaking(), []);
  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › Topik 4.2"
      title={language === 'bm' ? 'Wahyu Pertama di Gua Hira\'' : 'First Revelation at Cave Hira\''}
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
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}><QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#8B5CF6" emoji="📖" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} /></div>
      )}
    </Tahun1LessonLayout>
  );
}
