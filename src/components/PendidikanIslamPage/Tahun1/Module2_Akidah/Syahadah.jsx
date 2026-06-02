import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

const KALIMAH = [
  {
    n: 1,
    label: 'Kalimah Pertama',
    ar: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ',
    rumi: 'Asyhadu allaa ilaaha illallah',
    meaning: 'Aku bersaksi bahawa tiada Tuhan yang berhak disembah selain Allah.',
    meaningEng: 'I bear witness that there is no god worthy of worship except Allah.',
    about: 'Kalimah ini menegaskan bahawa Allah sahaja yang wajib disembah. Tiada sebarang makhluk atau benda lain yang layak dijadikan Tuhan.',
    icon: '☝️',
    color: '#4C1D95', accent: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)', glow: 'rgba(122,85,224,0.3)',
  },
  {
    n: 2,
    label: 'Kalimah Kedua',
    ar: 'وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ',
    rumi: 'wa asyhadu anna Muhammadan Rasuulullah',
    meaning: 'Dan aku bersaksi bahawa Nabi Muhammad itu adalah Rasul (utusan) Allah.',
    meaningEng: 'And I bear witness that Muhammad is the Messenger of Allah.',
    about: 'Kalimah ini mengiktiraf bahawa Nabi Muhammad SAW adalah nabi dan rasul terakhir yang diutuskan Allah kepada umat manusia.',
    icon: '🌟',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)', glow: 'rgba(42,154,108,0.3)',
  },
];

const FULL_AR = 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللهِ';

const KEPENTINGAN = [
  { icon: '🏳️', text: 'Merupakan Rukun Islam yang pertama.' },
  { icon: '💫', text: 'Syarat masuk ke dalam agama Islam.' },
  { icon: '❤️', text: 'Menunjukkan keimanan seseorang kepada Allah dan Rasul-Nya.' },
  { icon: '🌍', text: 'Diucapkan sekurang-kurangnya sekali seumur hidup dengan ikhlas.' },
];

const QUESTIONS = shuffle([
  {
    question: 'Berapa kalimahkah dalam Dua Kalimah Syahadah?',
    answer: '2 kalimah',
    options: ['1 kalimah', '2 kalimah', '3 kalimah', '4 kalimah'],
  },
  {
    question: 'Apakah maksud "Asyhadu allaa ilaaha illallah"?',
    answer: 'Aku bersaksi tiada Tuhan selain Allah',
    options: ['Aku bersaksi tiada Tuhan selain Allah', 'Muhammad itu Rasul Allah', 'Allah Maha Pencipta', 'Allah Maha Esa'],
  },
  {
    question: 'Apakah maksud "wa asyhadu anna Muhammadan Rasuulullah"?',
    answer: 'Muhammad itu Rasul Allah',
    options: ['Allah Maha Pemurah', 'Muhammad itu Rasul Allah', 'Tiada Tuhan selain Allah', 'Allah adalah Pencipta'],
  },
  {
    question: 'Syahadah merupakan Rukun Islam yang ke berapa?',
    answer: 'Yang ke-1',
    options: ['Yang ke-1', 'Yang ke-2', 'Yang ke-3', 'Yang ke-5'],
  },
  {
    question: 'Apakah kepentingan utama mengucap Syahadah?',
    answer: 'Syarat masuk Islam',
    options: ['Syarat masuk Islam', 'Syarat pergi haji', 'Syarat membayar zakat', 'Syarat berpuasa'],
  },
  {
    question: 'Siapakah yang disebut dalam Kalimah Syahadah kedua?',
    answer: 'Nabi Muhammad SAW',
    options: ['Nabi Isa AS', 'Nabi Ibrahim AS', 'Nabi Muhammad SAW', 'Nabi Musa AS'],
  },
  {
    question: 'Berapa kali sekurang-kurangnya Syahadah diucapkan dalam hidup?',
    answer: 'Sekali',
    options: ['Sekali', 'Lima kali', 'Setiap hari', 'Setiap solat'],
  },
  {
    question: 'Kata "أَشْهَدُ" (asyhadu) bermaksud?',
    answer: 'Aku bersaksi',
    options: ['Aku bersaksi', 'Aku percaya', 'Aku memohon', 'Aku berdoa'],
  },
  {
    question: 'Apakah nama lain bagi Dua Kalimah Syahadah?',
    answer: 'Kalimah Tauhid',
    options: ['Kalimah Tauhid', 'Kalimah Basmala', 'Kalimah Takbir', 'Kalimah Salam'],
  },
  {
    question: 'Kalimah Syahadah pertama menegaskan tentang apa?',
    answer: 'Keesaan Allah',
    options: ['Keesaan Allah', 'Kerasulan Muhammad', 'Hari Kiamat', 'Malaikat Allah'],
  },
]);

const TOTAL_ROUNDS = 10;

function KalimahCard({ k, language, showMeaning, playing, onPlayAudio }) {
  return (
    <div style={{
      background: k.gradient, border: `2.5px solid ${k.border}`,
      borderRadius: 22, padding: '20px 16px',
      display: 'flex', flexDirection: 'column', gap: 12,
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 10px 28px rgba(0,0,0,0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(0.72rem, 1.6vw, 0.85rem)', color: k.color,
          background: 'rgba(255,255,255,0.45)', padding: '3px 10px', borderRadius: 999,
        }}>{k.label}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onPlayAudio(k); }}
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

      <div style={{
        background: 'rgba(255,255,255,0.5)', borderRadius: 16, padding: '14px 16px',
        textAlign: 'right', direction: 'rtl',
      }}>
        <p style={{
          fontFamily: ARABIC_FONT, fontSize: 'clamp(1.35rem, 5vw, 1.9rem)',
          color: k.color, margin: 0, lineHeight: 2,
        }}>{k.ar}</p>
      </div>

      <p style={{
        fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontStyle: 'italic',
        fontSize: 'clamp(0.78rem, 2vw, 0.92rem)', color: k.accent,
        margin: 0, lineHeight: 1.5,
      }}>{k.rumi}</p>

      {showMeaning && (
        <div style={{ background: 'rgba(255,255,255,0.55)', borderRadius: 12, padding: '10px 12px' }}>
          <p style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
            fontSize: 'clamp(0.74rem, 1.8vw, 0.88rem)', color: k.color, margin: '0 0 4px', lineHeight: 1.4,
          }}>
            {language === 'bm' ? k.meaning : k.meaningEng}
          </p>
          <p style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500,
            fontSize: 'clamp(0.68rem, 1.6vw, 0.8rem)', color: '#374151', margin: 0, lineHeight: 1.5,
          }}>{k.about}</p>
        </div>
      )}
    </div>
  );
}

export default function Syahadah({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [showMeaning, setShowMeaning] = useState(true);
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);
  const [playing,    setPlaying]    = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handlePlayAudio = useCallback((k) => {
    SpeechManager.stopSpeaking();
    setPlaying(k.n);
    SpeechManager.speak(k.ar, 'ar-SA', { rate: 0.7 })
      .then(() => SpeechManager.speak(k.meaning, 'ms-MY', { rate: 0.8 }))
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
      breadcrumb="Akidah › Topik 2.3"
      title={language === 'bm' ? 'Dua Kalimah Syahadah' : 'The Two Declarations of Faith'}
      accentColor="#8B5CF6"
      tab={tab}
      onTabChange={handleTabChange}
    >
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(139,92,246,0.15))',
            border: '2px solid rgba(139,92,246,0.35)', borderRadius: 18,
            padding: '16px', marginBottom: '1.1rem', textAlign: 'right', direction: 'rtl',
          }}>
            <p style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1.1rem, 3.5vw, 1.5rem)', color: '#E9D5FF', margin: 0, lineHeight: 2 }}>
              {FULL_AR}
            </p>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <button onClick={() => { setShowMeaning(m => !m); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '0.88rem', background: showMeaning ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)', color: 'var(--pi-ink)', border: '2px solid rgba(0,0,0,0.1)', borderRadius: 999, padding: '7px 20px', cursor: 'pointer' }}>
              {showMeaning
                ? (language === 'bm' ? '🕌 Sembunyi Maksud' : '🕌 Hide Meaning')
                : (language === 'bm' ? '🕌 Tunjuk Maksud' : '🕌 Show Meaning')}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {KALIMAH.map(k => <KalimahCard key={k.n} k={k} language={language} showMeaning={showMeaning} playing={playing === k.n} onPlayAudio={handlePlayAudio} />)}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#C4B5FD', margin: '0 0 0.75rem', paddingLeft: 10, borderLeft: '4px solid #8B5CF6' }}>
              {language === 'bm' ? 'Kepentingan Syahadah' : 'Importance of Syahadah'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {KEPENTINGAN.map((k, i) => (
                <div key={i} style={{
                  background: 'rgba(139,92,246,0.1)', border: '1.5px solid rgba(139,92,246,0.25)',
                  borderRadius: 12, padding: '10px 14px',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{k.icon}</span>
                  <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: 'var(--pi-ink)', margin: 0, lineHeight: 1.4 }}>{k.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #7C3AED, #8B5CF6)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(124,58,237,0.4)' }}>
              🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →
            </button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} accentColor="#8B5CF6" accentGradient="linear-gradient(135deg, #7C3AED, #8B5CF6)" onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} />
        </div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
          <QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#8B5CF6" emoji="✨" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} />
        </div>
      )}
    </Tahun1LessonLayout>
  );
}
