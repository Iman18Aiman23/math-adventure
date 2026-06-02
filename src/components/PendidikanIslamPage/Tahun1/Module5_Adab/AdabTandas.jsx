import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';

const KONSEP = [
  {
    icon: '🚪', label: 'Masuk Kaki Kiri', sublabel: 'Baca doa',
    desc: 'Apabila masuk tandas, mulakan dengan kaki kiri dan baca doa masuk tandas: "Allahumma inni a\'uzu bika minal khubusi wal khaba\'is."',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🚻', label: 'Jangan Bawa Nama Allah', sublabel: 'Jangan sebut nama Allah',
    desc: 'Di dalam tandas, jangan menyebut nama Allah atau membaca ayat Al-Quran. Ini kerana tandas adalah tempat yang kotor dan najis.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '🚫', label: 'Jangan Menghadap Kiblat', sublabel: 'Juga membelakangi',
    desc: 'Jangan menghadap atau membelakangi kiblat ketika berada di dalam tandas. Ini adalah adab yang diajarkan oleh Rasulullah SAW.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '🧻', label: 'Bersih dengan Air/Tisu', sublabel: 'Istinja\' dengan bersih',
    desc: 'Selepas buang air, bersihkan dengan air bersih (istinja\') atau tisu. Pastikan bersih sehingga tiada lagi najis yang tinggal.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '🚶', label: 'Keluar Kaki Kanan', sublabel: 'Baca doa keluar',
    desc: 'Apabila keluar tandas, mulakan dengan kaki kanan dan baca doa: "Ghufranak, Alhamdulillahillazi azhaba annil aza wa afani."',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🧼', label: 'Basuh Tangan', sublabel: 'Selepas dari tandas',
    desc: 'Selepas keluar tandas, basuh tangan dengan air bersih dan sabun. Ini untuk menjaga kebersihan dan kesihatan diri.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Kaki mana untuk masuk tandas?', answer: 'Kaki kiri', options: ['Kaki kiri', 'Kaki kanan', 'Dua-dua', 'Mana-mana'] },
  { question: 'Kaki mana untuk keluar tandas?', answer: 'Kaki kanan', options: ['Kaki kanan', 'Kaki kiri', 'Dua-dua', 'Mana-mana'] },
  { question: 'Apa yang kita baca sebelum masuk tandas?', answer: 'Doa masuk tandas', options: ['Doa masuk tandas', 'Al-Fatihah', 'Bismillah', 'Selawat'] },
  { question: 'Di dalam tandas, kita tidak boleh?', answer: 'Sebut nama Allah', options: ['Sebut nama Allah', 'Berdiri', 'Duduk', 'Berjalan'] },
  { question: 'Ketika di tandas, kita tidak boleh menghadap?', answer: 'Kiblat', options: ['Kiblat', 'Pintu', 'Tingkap', 'Cermin'] },
  { question: 'Selepas buang air, kita perlu?', answer: 'Istinja\' dengan air/tisu', options: ['Istinja\' dengan air/tisu', 'Terus keluar', 'Pakai seluar', 'Baca doa'] },
  { question: 'Apa yang dibaca semasa keluar tandas?', answer: 'Ghufranak', options: ['Ghufranak', 'Bismillah', 'Alhamdulillah', 'Allahuakbar'] },
  { question: 'Selepas keluar tandas, kita perlu?', answer: 'Basuh tangan', options: ['Basuh tangan', 'Makan', 'Minum', 'Tidur'] },
  { question: 'Jika tiada air, istinja\' boleh guna?', answer: 'Tisu atau batu', options: ['Tisu atau batu', 'Daun', 'Pasir', 'Apa-apa'] },
  { question: 'Tandas adalah tempat yang?', answer: 'Kotor dan najis', options: ['Kotor dan najis', 'Bersih dan suci', 'Indah dan cantik', 'Sunyi dan senyap'] },
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

export default function AdabTandas({ onBack, language = 'bm' }) {
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
      breadcrumb="Adab &amp; Akhlak &rsaquo; Topik 5.3"
      title={language === 'bm' ? 'Adab Masuk &amp; Keluar Tandas' : 'Toilet Etiquette'}
      accentColor="#2563EB"
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
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} accentColor="#2563EB" accentGradient="linear-gradient(135deg, #1D4ED8, #3B82F6)" />
      ) : (
        <QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#2563EB" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} emoji="🚻" />
      )}
    </Tahun1LessonLayout>
  );
}
