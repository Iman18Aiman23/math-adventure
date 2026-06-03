import React, { useState, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';
import Tahun1LessonLayout from '../../Tahun1/Tahun1LessonLayout';

const KONSEP = [
  {
    icon: '🤫', label: 'Dakwah Secara Sembunyi', sublabel: '3 tahun pertama',
    desc: 'Nabi berdakwah secara sembunyi selama 3 tahun. Seruan hanya kepada keluarga terdekat dan sahabat karib yang dipercayai untuk memeluk Islam.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '👥', label: 'Orang Pertama Memeluk Islam', sublabel: 'As-Sabiqun al-Awwalun',
    desc: 'Orang pertama yang memeluk Islam: Siti Khadijah (isteri), Ali bin Abi Talib (sepupu), Abu Bakar (sahabat), dan Zaid bin Harithah (hamba).',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '📢', label: 'Dakwah Terang-terangan', sublabel: 'Seruan di Bukit Safa',
    desc: 'Selepas 3 tahun, Allah memerintahkan Nabi berdakwah secara terang-terangan. Nabi menyeru kaum Quraisy di Bukit Safa, mengajak mereka beriman kepada Allah.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '😤', label: 'Reaksi Kafir Quraisy', sublabel: 'Ejekan & ancaman',
    desc: 'Kaum kafir Quraisy mengejek, mengancam, dan menentang Nabi. Abu Lahab dan isterinya sangat giat memusuhi Nabi. Mereka menyakiti Nabi dengan kata-kata.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '⛓️', label: 'Sekatan & Pemulauan', sublabel: 'Boikot Bani Hashim',
    desc: 'Kafir Quraisy memulau dan menyekat Bani Hashim. Mereka digugat supaya tidak berniaga, berkahwin, atau bergaul dengan Nabi dan pengikutnya. Sekatan ini berlangsung 3 tahun.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🔥', label: 'Penyeksaan terhadap Bilal', sublabel: 'Diseksa di padang pasir',
    desc: 'Bilal bin Rabah diseksa oleh tuannya Umayyah bin Khalaf dengan dibaringkan di padang pasir dan diletakkan batu besar di dada sambil dipaksa meninggalkan Islam. Bilal tetap mengucapkan "Ahad, Ahad" (Allah Maha Esa).',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
  {
    icon: '💔', label: 'Penyeksaan terhadap Ammar & Sumayyah', sublabel: 'Keluarga Yasir',
    desc: 'Keluarga Yasir (Yasir, Sumayyah, dan Ammar) diseksa dengan kejam kerana memeluk Islam. Sumayyah dan Yasir mati syahid akibat penyeksaan — mereka adalah syuhada pertama dalam Islam.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🚢', label: 'Hijrah Pertama ke Habsyah', sublabel: 'Perlindungan di Abbysinia',
    desc: 'Nabi memerintahkan sebahagian sahabat berhijrah ke Habsyah (Ethiopia) untuk melarikan diri dari penyiksaan. Raja Najashi yang adil memberi perlindungan kepada mereka.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Berapa lama Nabi berdakwah secara sembunyi?', answer: '3 tahun', options: ['3 tahun', '1 tahun', '5 tahun', '10 tahun'] },
  { question: 'Siapa orang pertama memeluk Islam?', answer: 'Siti Khadijah', options: ['Siti Khadijah', 'Abu Bakar', 'Ali bin Abi Talib', 'Zaid bin Harithah'] },
  { question: 'Di mana Nabi menyeru dakwah secara terang-terangan?', answer: 'Bukit Safa', options: ['Bukit Safa', 'Gua Hira\'', 'Masjidil Haram', 'Pasar Mekah'] },
  { question: 'Siapa yang sangat memusuhi Nabi dari kalangan bapa saudara?', answer: 'Abu Lahab', options: ['Abu Lahab', 'Abu Talib', 'Hamzah', 'Abbas'] },
  { question: 'Apa yang dilakukan kafir Quraisy untuk menyekat dakwah?', answer: 'Sekatan dan pemulauan', options: ['Sekatan dan pemulauan', 'Perang', 'Berdakwah balik', 'Lari'] },
  { question: 'Siapa sahabat yang diseksa dengan batu di dada?', answer: 'Bilal bin Rabah', options: ['Bilal bin Rabah', 'Ammar bin Yasir', 'Abu Bakar', 'Ali bin Abi Talib'] },
  { question: 'Siapa syuhada pertama dalam Islam?', answer: 'Sumayyah', options: ['Sumayyah', 'Khadijah', 'Fatimah', 'Aisyah'] },
  { question: 'Ke mana sahabat berhijrah untuk selamat dari penyiksaan?', answer: 'Habsyah', options: ['Habsyah', 'Madinah', 'Taif', 'Mesir'] },
  { question: 'Siapa raja Habsyah yang melindungi sahabat?', answer: 'Najashi', options: ['Najashi', 'Heraclius', 'Kisra', 'Firaun'] },
  { question: 'Siapa yang menyertai Nabi sebagai pemeluk Islam awal selain Khadijah?', answer: 'Ali, Abu Bakar, Zaid', options: ['Ali, Abu Bakar, Zaid', 'Umar, Hamzah, Khalid', 'Uthman, Talhah, Zubair', 'Abu Lahab, Abu Sufyan'] },
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

export default function DakwahAwal({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  useEffect(() => () => SpeechManager.stopSpeaking(), []);
  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › Topik 4.3"
      title={language === 'bm' ? 'Dakwah Awal & Penentangan' : 'Early Da\'wah & Opposition'}
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
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}><QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#8B5CF6" emoji="🕊️" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} /></div>
      )}
    </Tahun1LessonLayout>
  );
}
