import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';

const KONSEP = [
  {
    icon: '💬', label: 'Bercakap dengan Sopan', sublabel: 'Lembut dan hormat',
    desc: 'Bercakaplah dengan sopan dan lembut kepada ibu bapa. Jangan bercakap kasar, meninggikan suara atau membantah kata-kata mereka.',
    color: '#9F1239', accent: '#FF8CBF',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
  {
    icon: '👂', label: 'Mendengar Nasihat', sublabel: 'Ibu bapa dan keluarga',
    desc: 'Dengarlah nasihat ibu bapa dengan penuh perhatian. Nasihat mereka adalah untuk kebaikan kita. Jangan menentang atau mengabaikan kata-kata mereka.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '🧹', label: 'Membantu Kerja Rumah', sublabel: 'Tolong-menolong',
    desc: 'Bantulah ibu bapa membuat kerja rumah seperti mengemas rumah, membasuh pinggan, atau menyapu lantai. Ini menunjukkan kita sayang kepada mereka.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '🤲', label: 'Mendoakan Ibu Bapa', sublabel: 'Doa untuk mereka',
    desc: 'Jangan lupa mendoakan kedua ibu bapa: "Rabbighfirli wa liwalidayya warhamhuma kama rabbayani saghira." — Ya Allah, ampunilah aku dan kedua ibu bapaku.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '✋', label: 'Mencium Tangan Ibu Bapa', sublabel: 'Tanda hormat',
    desc: 'Biasakan mencium tangan ibu bapa ketika hendak pergi ke sekolah atau sebelum tidur. Ini menunjukkan kasih sayang dan hormat kepada mereka.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🏠', label: 'Menjaga Nama Baik Keluarga', sublabel: 'Jaga maruah',
    desc: 'Jagalah nama baik keluarga dengan berkelakuan baik di luar rumah. Jangan melakukan perkara yang memalukan ibu bapa dan keluarga.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '🙏', label: 'Bersyukur atas Kasih Sayang', sublabel: 'Hargai keluarga',
    desc: 'Bersyukurlah atas kasih sayang yang diberi oleh ibu bapa dan keluarga. Ucapkan terima kasih dan hargai setiap pengorbanan mereka untuk kita.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #EC4899 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Bagaimana cara bercakap dengan ibu bapa?', answer: 'Sopan dan lembut', options: ['Sopan dan lembut', 'Kasar', 'Bentak', 'Teriak'] },
  { question: 'Apa yang kita buat dengan nasihat ibu bapa?', answer: 'Dengar dan ikut', options: ['Dengar dan ikut', 'Abai', 'Tolak', 'Marah'] },
  { question: 'Antara cara membantu ibu bapa di rumah?', answer: 'Membantu kerja rumah', options: ['Membantu kerja rumah', 'Bermain', 'Menonton TV', 'Tidur'] },
  { question: 'Kita perlu mendoakan?', answer: 'Kedua ibu bapa', options: ['Kedua ibu bapa', 'Diri sendiri', 'Kawan', 'Guru'] },
  { question: 'Apa tanda hormat kepada ibu bapa?', answer: 'Mencium tangan mereka', options: ['Mencium tangan mereka', 'Menjerit', 'Membaling', 'Menghentak'] },
  { question: 'Di luar rumah, kita perlu menjaga?', answer: 'Nama baik keluarga', options: ['Nama baik keluarga', 'Diri sendiri', 'Kawan', 'Harta'] },
  { question: 'Perasaan kita terhadap kasih sayang keluarga?', answer: 'Bersyukur', options: ['Bersyukur', 'Marah', 'Benci', 'Dendam'] },
  { question: 'Kita perlu ucapkan apa kepada ibu bapa?', answer: 'Terima kasih', options: ['Terima kasih', 'Selamat tinggal', 'Maaf', 'Tidak apa'] },
  { question: 'Doa untuk ibu bapa dibaca?', answer: 'Setiap hari', options: ['Setiap hari', 'Setahun sekali', 'Seminggu sekali', 'Tidak pernah'] },
  { question: 'Apabila ibu bapa memanggil, kita hendaklah?', answer: 'Menyahut dengan segera', options: ['Menyahut dengan segera', 'Diam sahaja', 'Buat tak dengar', 'Lari'] },
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

export default function AdabKasihSayang({ onBack, language = 'bm' }) {
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
      breadcrumb="Adab &amp; Akhlak › Topik 5.2"
      title={language === 'bm' ? 'Adab Kasih Sayang' : 'Affection Etiquette'}
      accentColor="#EC4899"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`.ak-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; }`}</style>

      {tab === 'belajar' ? (
        <div style={{ padding: '0 1.25rem' }}>
          <div className="ak-grid">
            {KONSEP.map((k, i) => <ConceptCard key={i} k={k} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #BE185D, #EC4899)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(236,72,153,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} accentColor="#EC4899" accentGradient="linear-gradient(135deg, #BE185D, #EC4899)" />
      ) : (
        <QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#EC4899" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} emoji="💖" />
      )}
    </Tahun1LessonLayout>
  );
}
