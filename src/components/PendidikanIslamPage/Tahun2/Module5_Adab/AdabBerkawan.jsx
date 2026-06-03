import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';

const KONSEP = [
  {
    icon: '👥', label: 'Pilih Kawan Baik', sublabel: 'Baik akhlaknya',
    desc: 'Pilihlah kawan yang baik akhlaknya. Kawan yang baik akan membawa kita ke arah kebaikan. Kawan yang buruk akan membawa kita kepada keburukan.',
    color: '#9F1239', accent: '#FF8CBF',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
  {
    icon: '🤝', label: 'Saling Menghormati', sublabel: 'Hormat-menghormati',
    desc: 'Hormatilah sesama kawan. Jangan mengejek, menghina atau merendah-rendahkan kawan. Setiap orang ada kelebihan dan kekurangan masing-masing.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '🤲', label: 'Tolong-menolong', sublabel: 'Dalam kebaikan',
    desc: 'Tolong-menolonglah sesama kawan dalam perkara kebaikan. Bantu kawan yang memerlukan pertolongan seperti membantu belajar atau berkongsi makanan.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '🤫', label: 'Menjaga Rahsia Kawan', sublabel: 'Jangan sebarkan',
    desc: 'Jika kawan memberitahu sesuatu rahsia, jangan sebarkannya kepada orang lain. Menjaga rahsia kawan adalah tanda kita boleh dipercayai.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '🚪', label: 'Memohon Izin Masuk Rumah', sublabel: 'Sebelum masuk',
    desc: 'Sebelum masuk rumah kawan, mohon izin dahulu. Ketuk pintu dan beri salam. Tunggu sehingga dijemput masuk. Jangan masuk tanpa kebenaran.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🏥', label: 'Menziarahi Kawan Sakit', sublabel: 'Adab menziarah',
    desc: 'Apabila kawan sakit, ziarahlah dengan memberi salam, bertanya khabar, mendoakan kesembuhan dan memberi semangat. Jangan terlalu lama melawat.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Kita hendaklah pilih kawan yang?', answer: 'Baik akhlaknya', options: ['Baik akhlaknya', 'Kaya', 'Popular', 'Berani'] },
  { question: 'Sesama kawan kita perlu?', answer: 'Saling menghormati', options: ['Saling menghormati', 'Bermusuh', 'Bergaduh', 'Bersaing'] },
  { question: 'Kita perlu tolong kawan dalam perkara?', answer: 'Kebaikan', options: ['Kebaikan', 'Kejahatan', 'Pertengkaran', 'Permainan'] },
  { question: 'Jika kawan beri rahsia, kita perlu?', answer: 'Jaganya', options: ['Jaganya', 'Sebarkannya', 'Ceritakan', 'Tulis di media sosial'] },
  { question: 'Sebelum masuk rumah kawan, kita perlu?', answer: 'Memberi salam dan minta izin', options: ['Memberi salam dan minta izin', 'Terus masuk', 'Panggil nama', 'Ketuk tingkap'] },
  { question: 'Antara adab menziarahi orang sakit?', answer: 'Mendoakan kesembuhan', options: ['Mendoakan kesembuhan', 'Bercerita lawak', 'Makan minum', 'Bermain'] },
  { question: 'Apa yang diucapkan ketika melawat orang sakit?', answer: 'Salam dan bertanya khabar', options: ['Salam dan bertanya khabar', 'Selamat tinggal', 'Apa khabar', 'Terima kasih'] },
  { question: 'Semasa menziarahi orang sakit, jangan?', answer: 'Terlalu lama', options: ['Terlalu lama', 'Baca doa', 'Beri semangat', 'Senyum'] },
  { question: 'Kawan yang baik akan membawa kita ke arah?', answer: 'Kebaikan', options: ['Kebaikan', 'Keburukan', 'Kemewahan', 'Keseronokan'] },
  { question: 'Kita perlu memberi apa kepada kawan yang sakit?', answer: 'Semangat', options: ['Semangat', 'Hadiah', 'Ubat', 'Wang'] },
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

export default function AdabBerkawan({ onBack, language = 'bm' }) {
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
      breadcrumb="Adab &amp; Akhlak › Topik 5.3"
      title={language === 'bm' ? 'Adab Berkawan &amp; Menziarahi Sakit' : 'Friendship &amp; Visiting the Sick'}
      accentColor="#EC4899"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`.abk-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.8rem; }`}</style>

      {tab === 'belajar' ? (
        <div style={{ padding: '0 1.25rem' }}>
          <div className="abk-grid">
            {KONSEP.map((k, i) => <ConceptCard key={i} k={k} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #BE185D, #EC4899)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(236,72,153,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} accentColor="#EC4899" accentGradient="linear-gradient(135deg, #BE185D, #EC4899)" />
      ) : (
        <QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#EC4899" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} emoji="🤝" />
      )}
    </Tahun1LessonLayout>
  );
}
