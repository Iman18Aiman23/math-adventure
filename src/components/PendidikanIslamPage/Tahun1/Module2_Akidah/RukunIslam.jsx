import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

const RUKUN = [
  {
    n: 1,
    ar: 'الشَّهَادَتَانِ',
    name: 'Mengucap Dua Kalimah Syahadah',
    shortName: 'Syahadah',
    icon: '🗣️',
    desc: 'Mengucap bahawa tiada Tuhan selain Allah dan Muhammad itu Rasul Allah.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    n: 2,
    ar: 'الصَّلَاةُ',
    name: 'Mendirikan Solat',
    shortName: 'Solat',
    icon: '🙏',
    desc: 'Melakukan solat fardu 5 waktu sehari semalam — Subuh, Zohor, Asar, Maghrib, Isyak.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    n: 3,
    ar: 'الزَّكَاةُ',
    name: 'Menunaikan Zakat',
    shortName: 'Zakat',
    icon: '💰',
    desc: 'Mengeluarkan sebahagian harta kepada golongan yang berhak menerimanya.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    n: 4,
    ar: 'الصِّيَامُ',
    name: 'Berpuasa di Bulan Ramadan',
    shortName: 'Puasa',
    icon: '🌙',
    desc: 'Menahan diri daripada makan, minum dan perkara yang membatalkan puasa sepanjang Ramadan.',
    color: '#4C1D95', accent: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    n: 5,
    ar: 'الحَجُّ',
    name: 'Menunaikan Ibadah Haji',
    shortName: 'Haji',
    icon: '🕋',
    desc: 'Pergi ke Makkah untuk menunaikan ibadah haji bagi yang berkemampuan.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

const NOT_RUKUN_ISLAM = [
  'Beriman kepada Allah',
  'Beriman kepada Malaikat',
  'Beriman kepada Hari Kiamat',
  'Beriman kepada Qada dan Qadar',
];

function buildQuestions() {
  const qs = [];
  RUKUN.forEach(r => {
    const wrong = shuffle(RUKUN.filter(x => x.n !== r.n)).slice(0, 3).map(x => x.name);
    qs.push({
      question: `Apakah Rukun Islam yang ke-${r.n}?`,
      answer: r.name,
      options: shuffle([r.name, ...wrong]),
    });
  });
  RUKUN.forEach(r => {
    const wrongNums = shuffle([1,2,3,4,5].filter(n => n !== r.n)).slice(0, 3).map(n => `Yang ke-${n}`);
    qs.push({
      question: `Rukun Islam yang ke berapa ialah "${r.shortName}"?`,
      answer: `Yang ke-${r.n}`,
      options: shuffle([`Yang ke-${r.n}`, ...wrongNums]),
    });
  });
  qs.push({
    question: 'Berapakah bilangan Rukun Islam?',
    answer: '5',
    options: ['4', '5', '6', '7'],
  });
  NOT_RUKUN_ISLAM.forEach(d => {
    const real = shuffle(RUKUN).slice(0, 3).map(r => r.name);
    qs.push({
      question: 'Yang manakah BUKAN Rukun Islam?',
      answer: d,
      options: shuffle([d, ...real]),
    });
  });
  return qs;
}

const TOTAL_ROUNDS = 10;

function LearnCard({ r, language, playing, onPlayAudio }) {
  return (
    <div style={{
      background: r.gradient, border: `2.5px solid ${r.border}`,
      borderRadius: 20, padding: '14px 14px',
      display: 'flex', flexDirection: 'column', gap: 8,
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: r.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '1rem',
          boxShadow: `0 3px 8px ${r.border}`,
        }}>{r.n}</span>
        <p style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#1A202C',
          margin: 0, lineHeight: 1.2, flex: 1,
        }}>{r.name}</p>
        <button
          onClick={(e) => { e.stopPropagation(); onPlayAudio(r); }}
          style={{
            background: 'rgba(255,255,255,0.45)', border: 'none',
            borderRadius: '50%', width: 32, height: 32,
            fontSize: '1rem', cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {playing ? '🔊' : '🔈'}
        </button>
      </div>
      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
        fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', color: '#374151',
        margin: 0, lineHeight: 1.5,
        background: 'rgba(255,255,255,0.5)', borderRadius: 10, padding: '8px 12px',
      }}>{r.desc}</p>
    </div>
  );
}

export default function RukunIslam({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);
  const [playing,    setPlaying]    = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handlePlayAudio = useCallback((r) => {
    SpeechManager.stopSpeaking();
    setPlaying(r.n);
    SpeechManager.speak(r.desc, 'ms-MY', { rate: 0.8 })
      .then(() => setPlaying(null))
      .catch(() => setPlaying(null));
  }, []);

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
      breadcrumb="Akidah › Topik 2.2"
      title={language === 'bm' ? 'Rukun Islam (5 Perkara)' : 'Pillars of Islam (5)'}
      accentColor="#3B82F6"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`
        .rsl-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
        }
        @media (min-width: 640px) {
          .rsl-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        }
      `}</style>

      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{
            background: 'rgba(59,130,246,0.12)', border: '1.5px solid rgba(59,130,246,0.3)',
            borderRadius: 14, padding: '10px 14px', marginBottom: '1rem',
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
            fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: '#93C5FD', textAlign: 'center',
          }}>
            {language === 'bm'
              ? '🌙 Rukun Islam ada 5 perkara · Ketuk kad untuk keterangan'
              : '🌙 There are 5 Pillars of Islam · Tap a card for details'}
          </div>
          <div className="rsl-grid">
            {RUKUN.map(r => <LearnCard key={r.n} r={r} language={language} playing={playing === r.n} onPlayAudio={handlePlayAudio} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #2563EB, #3B82F6)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}>
              🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →
            </button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} accentColor="#3B82F6" accentGradient="linear-gradient(135deg, #2563EB, #3B82F6)" onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} />
        </div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
          <QuizScreen key={quizKey} language={language} questions={buildQuestions()} totalRounds={TOTAL_ROUNDS} accentColor="#3B82F6" emoji="🌙" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} />
        </div>
      )}
    </Tahun1LessonLayout>
  );
}
