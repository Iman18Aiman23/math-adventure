import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

const MALAIKAT = [
  { n: 1, ar: 'جِبْرِيل', name: 'Jibril', icon: '📜', duty: 'Menyampaikan wahyu', dutyEn: 'Delivers revelation', color: '#065F46', accent: '#10B981', gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)', border: 'rgba(42,154,108,0.5)' },
  { n: 2, ar: 'مِيكَائِيل', name: 'Mikail', icon: '🌧️', duty: 'Membahagikan rezeki', dutyEn: 'Distributes sustenance', color: '#1E40AF', accent: '#3B82F6', gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)', border: 'rgba(37,99,235,0.5)' },
  { n: 3, ar: 'إِسْرَافِيل', name: 'Israfil', icon: '📯', duty: 'Meniup sangkakala', dutyEn: 'Blows the trumpet', color: '#92400E', accent: '#F59E0B', gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)', border: 'rgba(212,150,10,0.5)' },
  { n: 4, ar: 'عِزْرَائِيل', name: 'Izrail', icon: '🌙', duty: 'Mencabut nyawa', dutyEn: 'Takes souls', color: '#4C1D95', accent: '#8B5CF6', gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)', border: 'rgba(122,85,224,0.5)' },
  { n: 5, ar: 'مُنكَر', name: 'Munkar', icon: '❓', duty: 'Menyoal di kubur', dutyEn: 'Questions in the grave', color: '#9D174D', accent: '#EC4899', gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)', border: 'rgba(236,72,153,0.5)' },
  { n: 6, ar: 'نَكِير', name: 'Nakir', icon: '❔', duty: 'Menyoal di kubur', dutyEn: 'Questions in the grave', color: '#0C4A6E', accent: '#0891B2', gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)', border: 'rgba(8,145,178,0.5)' },
  { n: 7, ar: 'رَقِيب', name: 'Raqib', icon: '✍️', duty: 'Mencatat amal baik', dutyEn: 'Records good deeds', color: '#14532D', accent: '#22C55E', gradient: 'linear-gradient(135deg, #DCFCE7 0%, #86EFAC 55%, #22C55E 100%)', border: 'rgba(34,197,94,0.5)' },
  { n: 8, ar: 'عَتِيد', name: 'Atid', icon: '📝', duty: 'Mencatat amal buruk', dutyEn: 'Records bad deeds', color: '#7F1D1D', accent: '#EF4444', gradient: 'linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 55%, #EF4444 100%)', border: 'rgba(239,68,68,0.5)' },
  { n: 9, ar: 'مَالِك', name: 'Malik', icon: '🔥', duty: 'Menjaga neraka', dutyEn: 'Guards hell', color: '#9A3412', accent: '#F97316', gradient: 'linear-gradient(135deg, #FFEDD5 0%, #FDBA74 55%, #F97316 100%)', border: 'rgba(249,115,22,0.5)' },
  { n: 10, ar: 'رِضْوَان', name: 'Ridwan', icon: '🌿', duty: 'Menjaga syurga', dutyEn: 'Guards paradise', color: '#166534', accent: '#10B981', gradient: 'linear-gradient(135deg, #D1FAE5 0%, #6EE7B7 55%, #10B981 100%)', border: 'rgba(16,185,129,0.5)' },
];

function buildQuestions() {
  const qs = [];
  MALAIKAT.forEach(m => {
    const wrong = shuffle(MALAIKAT.filter(x => x.n !== m.n)).slice(0, 3).map(x => x.name);
    qs.push({
      question: `Siapakah Malaikat yang ke-${m.n}?`,
      answer: m.name,
      options: shuffle([m.name, ...wrong]),
    });
  });
  MALAIKAT.forEach(m => {
    const wrongDuties = shuffle(MALAIKAT.filter(x => x.n !== m.n)).slice(0, 3).map(x => x.duty);
    qs.push({
      question: `Apakah tugas Malaikat ${m.name}?`,
      answer: m.duty,
      options: shuffle([m.duty, ...wrongDuties]),
    });
  });
  qs.push({
    question: 'Berapakah jumlah malaikat yang wajib diketahui?',
    answer: '10',
    options: ['5', '8', '10', '25'],
  });
  qs.push({
    question: 'Malaikat diciptakan Allah daripada apa?',
    answer: 'Cahaya',
    options: ['Cahaya', 'Tanah', 'Api', 'Angin'],
  });
  const dummy = shuffle(MALAIKAT).slice(0, 3).map(x => x.name);
  qs.push({
    question: 'Yang manakah BUKAN nama Malaikat?',
    answer: 'Iblis',
    options: shuffle(['Iblis', ...dummy]),
  });
  return qs;
}

const TOTAL_ROUNDS = 10;

function LearnCard({ m, language, playing, onPlayAudio }) {
  return (
    <div style={{
      background: m.gradient, border: `2.5px solid ${m.border}`,
      borderRadius: 20, padding: '14px 14px',
      display: 'flex', flexDirection: 'column', gap: 8,
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: m.accent, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '1rem',
          boxShadow: `0 3px 8px ${m.border}`,
        }}>{m.n}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#1A202C',
            margin: 0, lineHeight: 1.2,
          }}>{m.name}</p>
          <p style={{
            fontFamily: ARABIC_FONT, fontWeight: 700,
            fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)', color: m.color,
            margin: '2px 0 0', lineHeight: 1.2,
          }}>{m.ar}</p>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onPlayAudio(m); }}
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
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.5)', borderRadius: 10, padding: '8px 12px' }}>
        <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{m.icon}</span>
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
          fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', color: '#374151',
          margin: 0, lineHeight: 1.5,
        }}>{language === 'bm' ? m.duty : m.dutyEn}</p>
      </div>
    </div>
  );
}

export default function Malaikat({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);
  const [playing,    setPlaying]    = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handlePlayAudio = useCallback((m) => {
    SpeechManager.stopSpeaking();
    setPlaying(m.n);
    const text = language === 'bm' ? `${m.name}. ${m.duty}` : `${m.name}. ${m.dutyEn}`;
    SpeechManager.speak(text, 'ms-MY', { rate: 0.8 })
      .then(() => setPlaying(null))
      .catch(() => setPlaying(null));
  }, [language]);

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
      breadcrumb="Akidah › Topik 2.1"
      title={language === 'bm' ? 'Beriman kepada Malaikat' : 'Belief in Angels'}
      accentColor="#10B981"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`
        .ml-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
        }
        @media (min-width: 640px) {
          .ml-grid { grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        }
      `}</style>

      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{
            background: 'rgba(16,185,129,0.12)', border: '1.5px solid rgba(16,185,129,0.3)',
            borderRadius: 14, padding: '10px 14px', marginBottom: '1rem',
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
            fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: '#6EE7B7', textAlign: 'center',
          }}>
            {language === 'bm'
              ? '😇 Ada 10 Malaikat utama · Ketuk kad untuk keterangan'
              : '😇 There are 10 main Angels · Tap a card for details'}
          </div>
          <div className="ml-grid">
            {MALAIKAT.map(m => <LearnCard key={m.n} m={m} language={language} playing={playing === m.n} onPlayAudio={handlePlayAudio} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #065F46, #10B981)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(16,185,129,0.4)' }}>
              🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →
            </button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} accentColor="#10B981" accentGradient="linear-gradient(135deg, #065F46, #10B981)" onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} />
        </div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
          <QuizScreen key={quizKey} language={language} questions={buildQuestions()} totalRounds={TOTAL_ROUNDS} accentColor="#10B981" emoji="😇" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} />
        </div>
      )}
    </Tahun1LessonLayout>
  );
}
