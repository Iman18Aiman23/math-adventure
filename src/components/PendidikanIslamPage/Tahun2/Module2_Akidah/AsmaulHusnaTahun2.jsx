import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

const NAMES = [
  {
    n: 1,
    ar: 'الأَحَد',
    rumi: 'Al-Ahad',
    meaning: 'Yang Maha Esa',
    meaningEng: 'The One',
    desc: 'Allah itu satu, tiada sekutu bagi-Nya. Allah tidak beranak dan tidak diperanakkan. Tiada sesuatu pun yang setara dengan Allah.',
    descEng: 'Allah is One, no partner unto Him. He neither begets nor is born. Nothing is comparable to Him.',
    icon: '🤲',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    n: 2,
    ar: 'الصَّمَد',
    rumi: 'As-Samad',
    meaning: 'Tempat Meminta',
    meaningEng: 'The Self-Sufficient',
    desc: 'Allah tempat meminta segala hajat. Hanya kepada Allah kita memohon pertolongan, kerana Allah Maha Kaya dan tidak bergantung kepada sesiapa.',
    descEng: 'Allah is the one upon whom all depend. Only to Allah we ask for help, for Allah is Self-Sufficient and needs no one.',
    icon: '🙏',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
];

const QUESTIONS = shuffle([
  {
    question: 'Apakah maksud Al-Ahad?',
    answer: 'Yang Maha Esa',
    options: ['Yang Maha Esa', 'Tempat Meminta', 'Maha Pemurah', 'Maha Pengampun'],
  },
  {
    question: 'Apakah maksud As-Samad?',
    answer: 'Tempat Meminta',
    options: ['Maha Pencipta', 'Tempat Meminta', 'Maha Mengetahui', 'Yang Maha Esa'],
  },
  {
    question: '"الأَحَد" dibaca sebagai?',
    answer: 'Al-Ahad',
    options: ['Al-Ahad', 'As-Samad', 'Al-Khaliq', 'Ar-Rahim'],
  },
  {
    question: '"الصَّمَد" dibaca sebagai?',
    answer: 'As-Samad',
    options: ['Al-Ahad', 'As-Samad', 'Al-Wahhab', 'Al-Karim'],
  },
  {
    question: 'Al-Ahad bermaksud Allah itu ___.',
    answer: 'Maha Esa',
    options: ['Maha Esa', 'Maha Kaya', 'Maha Kuasa', 'Maha Bijaksana'],
  },
  {
    question: 'As-Samad bermaksud Allah itu tempat ___.',
    answer: 'Meminta',
    options: ['Meminta', 'Bertanya', 'Bersyukur', 'Berzikir'],
  },
  {
    question: 'Kepada siapakah kita memohon pertolongan?',
    answer: 'Allah',
    options: ['Allah', 'Malaikat', 'Nabi', 'Ibu bapa'],
  },
  {
    question: 'Apakah kesan daripada mengimani Al-Ahad?',
    answer: 'Kita hanya menyembah Allah',
    options: ['Kita hanya menyembah Allah', 'Kita hanya meminta pada manusia', 'Kita boleh menyembah selain Allah', 'Kita tidak perlu berdoa'],
  },
  {
    question: 'Al-Ahad terdapat dalam Surah apa?',
    answer: 'Surah Al-Ikhlas',
    options: ['Surah Al-Fatihah', 'Surah Al-Ikhlas', 'Surah An-Nas', 'Surah Al-Falaq'],
  },
  {
    question: 'Berapa kalimah Asmaul Husna keseluruhannya?',
    answer: '99',
    options: ['66', '77', '99', '100'],
  },
]);

const TOTAL_ROUNDS = 8;

function NameCard({ k, language, playing, onPlayAudio }) {
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
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <span>{k.icon}</span>
          <span>{language === 'bm' ? `Nama ke-${k.n}` : `Name ${k.n}`}</span>
        </span>
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

      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: ARABIC_FONT, fontSize: 'clamp(2rem, 7vw, 3rem)',
          color: k.color, margin: 0, lineHeight: 1.4, direction: 'rtl',
        }}>{k.ar}</p>
        <p style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(1rem, 2.8vw, 1.3rem)', color: k.color,
          margin: '2px 0 0', letterSpacing: '0.04em',
        }}>{k.rumi}</p>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.55)', borderRadius: 14, padding: '10px 14px' }}>
        <p style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: k.color,
          margin: '0 0 6px', textAlign: 'center',
        }}>
          {language === 'bm' ? k.meaning : k.meaningEng}
        </p>
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
          fontSize: 'clamp(0.7rem, 1.6vw, 0.82rem)', color: '#374151',
          margin: 0, lineHeight: 1.5,
        }}>
          {language === 'bm' ? k.desc : k.descEng}
        </p>
      </div>
    </div>
  );
}

export default function AsmaulHusnaTahun2({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
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
      .then(() => SpeechManager.speak(language === 'bm' ? k.meaning : k.meaningEng, 'ms-MY', { rate: 0.8 }))
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
      breadcrumb="Akidah › Topik 2.2"
      title={language === 'bm' ? 'Asmaul Husna: Al-Ahad & As-Samad' : 'Beautiful Names: Al-Ahad & As-Samad'}
      accentColor="#10B981"
      tab={tab}
      onTabChange={handleTabChange}
    >
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{
            background: 'rgba(16,185,129,0.12)', border: '1.5px solid rgba(16,185,129,0.3)',
            borderRadius: 14, padding: '10px 14px', marginBottom: '1rem',
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
            fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: '#6EE7B7', textAlign: 'center',
          }}>
            {language === 'bm'
              ? '✨ Al-Ahad (Maha Esa) & As-Samad (Tempat Meminta)'
              : '✨ Al-Ahad (The One) & As-Samad (The Self-Sufficient)'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {NAMES.map(k => <NameCard key={k.n} k={k} language={language} playing={playing === k.n} onPlayAudio={handlePlayAudio} />)}
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
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
          <QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#10B981" emoji="✨" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} />
        </div>
      )}
    </Tahun1LessonLayout>
  );
}
