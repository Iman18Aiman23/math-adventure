import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';

const KONSEP = [
  {
    icon: '🧼', label: 'Basuh Tangan', sublabel: 'Sebelum & selepas',
    desc: 'Basuh tangan dengan air bersih sebelum dan selepas makan. Ini menjaga kebersihan dan kesihatan kita.',
    color: '#9F1239', accent: '#FF8CBF',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(255,128,187,0.5)',
  },
  {
    icon: '🤲', label: 'Baca Doa', sublabel: 'Sebelum & selepas',
    desc: 'Baca "Bismillah" sebelum makan dan "Alhamdulillah" selepas makan. Makan yang berkat ialah makan yang dimulakan dengan doa.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '✋', label: 'Guna Tangan Kanan', sublabel: 'Bukan tangan kiri',
    desc: 'Gunakan tangan kanan ketika makan dan minum. Tangan kiri digunakan untuk perkara yang kotor. Ini adalah sunnah Nabi.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '🍚', label: 'Makan dari Tepi', sublabel: 'Jangan tengah-tengah',
    desc: 'Ambil makanan dari tepi pinggan, bukan dari tengah. Nasi dan lauk di tengah adalah sumber berkat. Jangan memilih-milih makanan.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '🪑', label: 'Duduk Ketika Minum', sublabel: 'Jangan berdiri',
    desc: 'Minumlah sambil duduk, bukan berdiri. Minum dengan tenang dan jangan tergopoh-gapah. Ini lebih baik untuk kesihatan.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🙏', label: 'Jangan Bazir', sublabel: 'Habiskan makanan',
    desc: 'Ambillah makanan secukupnya dan habiskan. Membazir makanan adalah perbuatan yang tidak baik. Allah tidak suka orang yang membazir.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Apa yang kita baca sebelum makan?', answer: 'Bismillah', options: ['Bismillah', 'Alhamdulillah', 'Subhanallah', 'Allahuakbar'] },
  { question: 'Tangan mana untuk makan?', answer: 'Tangan kanan', options: ['Tangan kanan', 'Tangan kiri', 'Dua-dua', 'Mana-mana'] },
  { question: 'Bila kita basuh tangan?', answer: 'Sebelum & selepas makan', options: ['Sebelum & selepas makan', 'Sebelum sahaja', 'Selepas sahaja', 'Tak perlu basuh'] },
  { question: 'Bagaimana cara mengambil makanan?', answer: 'Dari tepi pinggan', options: ['Dari tepi pinggan', 'Dari tengah', 'Dari bawah', 'Mana-mana'] },
  { question: 'Apa yang kita baca selepas makan?', answer: 'Alhamdulillah', options: ['Alhamdulillah', 'Bismillah', 'Astaghfirullah', 'Laa ilaha illallah'] },
  { question: 'Minum sebaiknya secara?', answer: 'Duduk', options: ['Duduk', 'Berdiri', 'Berjalan', 'Berlari'] },
  { question: 'Perbuatan membazir makanan adalah?', answer: 'Tidak baik', options: ['Tidak baik', 'Bagus', 'Biasa', 'Tak apa'] },
  { question: 'Makanan di tengah pinggan adalah?', answer: 'Sumber berkat', options: ['Sumber berkat', 'Hiasan', 'Tidak penting', 'Sisa'] },
  { question: 'Nabi mengajar kita makan dengan?', answer: 'Tangan kanan', options: ['Tangan kanan', 'Tangan kiri', 'Sudu', 'Garpu'] },
  { question: 'Kita patut mengambil makanan?', answer: 'Secukupnya', options: ['Secukupnya', 'Banyak-banyak', 'Sedikit sahaja', 'Mewah'] },
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

export default function AdabMakanMinum({ onBack, language = 'bm' }) {
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
      title={language === 'bm' ? 'Adab Makan & Minum' : 'Eating & Drinking Etiquette'}
      accentColor="#FF8CBF"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`.am-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; }`}</style>

      {tab === 'belajar' ? (
        <div style={{ padding: '0 1.25rem' }}>
          <div className="am-grid">
            {KONSEP.map((k, i) => <ConceptCard key={i} k={k} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #BE185D, #FF8CBF)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(255,140,191,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} accentColor="#FF8CBF" accentGradient="linear-gradient(135deg, #BE185D, #FF8CBF)" />
      ) : (
        <QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#FF8CBF" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} emoji="🍽️" />
      )}
    </Tahun1LessonLayout>
  );
}
