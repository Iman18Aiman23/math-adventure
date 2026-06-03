import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';

const KONSEP = [
  {
    icon: '👕', label: 'Menutup Aurat', sublabel: 'Pakaian menutup aurat',
    desc: 'Pakaian hendaklah menutup aurat mengikut syariat Islam. Lelaki menutup dari pusat ke lutut, manakala perempuan menutup seluruh badan kecuali muka dan tangan.',
    color: '#9F1239', accent: '#FF8CBF',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
  {
    icon: '⚖️', label: 'Sederhana', sublabel: 'Tidak mewah/tidak buruk',
    desc: 'Pakaian hendaklah sederhana — tidak terlalu mewah dan tidak terlalu buruk. Islam menggalakkan kita berpakaian kemas dan sopan tanpa berlebih-lebihan.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '🧼', label: 'Bersih', sublabel: 'Pakaian bersih dan kemas',
    desc: 'Pastikan pakaian bersih dan kemas. Pakaian yang kotor dan berbau tidak elok dipakai terutamanya ketika solat dan ke masjid.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '🚫', label: 'Tidak Menyerupai Lawan Jenis', sublabel: 'Lelaki & perempuan',
    desc: 'Lelaki tidak boleh memakai pakaian perempuan dan perempuan tidak boleh memakai pakaian lelaki. Islam melarang menyerupai lawan jenis.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '🤲', label: 'Doa Berpakaian', sublabel: 'Baca doa ketika memakai',
    desc: 'Baca doa ketika memakai pakaian: "Alhamdulillahillazi kasani haza wa razaqanihi min ghairi haulin minni wa la quwwah." Bersyukur pada Allah atas pakaian yang diberi.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🙏', label: 'Doa Membuka Pakaian', sublabel: 'Baca doa membuka',
    desc: 'Baca doa ketika membuka pakaian: "Bismillah" — dengan nama Allah. Jangan membuka pakaian di tempat terbuka tanpa ada tutupan.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Pakaian orang Islam hendaklah menutup?', answer: 'Aurat', options: ['Aurat', 'Tangan', 'Kaki', 'Kepala'] },
  { question: 'Kita tidak boleh memakai pakaian yang?', answer: 'Terlalu mewah atau terlalu buruk', options: ['Terlalu mewah atau terlalu buruk', 'Bersih', 'Baru', 'Warna terang'] },
  { question: 'Pakaian yang dipakai hendaklah dalam keadaan?', answer: 'Bersih dan kemas', options: ['Bersih dan kemas', 'Kotor', 'Berbau', 'Rennyek'] },
  { question: 'Lelaki tidak boleh memakai pakaian?', answer: 'Perempuan', options: ['Perempuan', 'Lelaki', 'Warna gelap', 'Panjang'] },
  { question: 'Perempuan tidak boleh memakai pakaian?', answer: 'Lelaki', options: ['Lelaki', 'Perempuan', 'Warna cerah', 'Pendek'] },
  { question: 'Apa yang dibaca ketika memakai pakaian?', answer: 'Doa berpakaian', options: ['Doa berpakaian', 'Al-Fatihah', 'Selawat', 'Doa makan'] },
  { question: 'Apa yang dibaca ketika membuka pakaian?', answer: 'Bismillah', options: ['Bismillah', 'Alhamdulillah', 'Allahuakbar', 'Subhanallah'] },
  { question: 'Islam menggalakkan kita berpakaian secara?', answer: 'Sederhana', options: ['Sederhana', 'Mewah', 'Buruk', 'Mahal'] },
  { question: 'Dimana tidak boleh membuka pakaian?', answer: 'Di tempat terbuka', options: ['Di tempat terbuka', 'Di dalam bilik', 'Di tandas', 'Di surau'] },
  { question: 'Pakaian perlu dijaga supaya sentiasa?', answer: 'Bersih dan kemas', options: ['Bersih dan kemas', 'Baru', 'Mahal', 'Berwarna'] },
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
  );
}

export default function AdabBerpakaian({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);

  useEffect(() => () => SpeechManager.stopSpeaking(), []);

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
      breadcrumb="Adab &amp; Akhlak › Topik 5.1"
      title={language === 'bm' ? 'Adab Berpakaian' : 'Dressing Etiquette'}
      accentColor="#EC4899"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`.ab-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; }`}</style>

      {tab === 'belajar' ? (
        <div style={{ padding: '0 1.25rem' }}>
          <div className="ab-grid">
            {KONSEP.map((k, i) => <ConceptCard key={i} k={k} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #BE185D, #EC4899)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(236,72,153,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} accentColor="#EC4899" accentGradient="linear-gradient(135deg, #BE185D, #EC4899)" />
      ) : (
        <QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#EC4899" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} emoji="👔" />
      )}
    </Tahun1LessonLayout>
  );
}
