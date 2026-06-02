import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import { ARABIC_FONT } from '../../_shared/arabic';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

const KHALIQ = {
  ar: 'الْخَالِقُ',
  rumi: 'Al-Khaliq',
  meaning: 'Yang Maha Pencipta',
  meaningEng: 'The Creator',
  desc: 'Allah menciptakan segala sesuatu dari tiada menjadi ada. Hanya Allah yang berkuasa mencipta — tiada makhluk lain yang mampu mencipta seperti ciptaan-Nya.',
  descEng: 'Allah creates everything from nothing. Only Allah has the power to create — no creature can create as He does.',
  quranRef: 'هُوَ اللَّهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ',
  quranSource: '(Surah Al-Hasyr 59:24)',
  quranMeaning: 'Dialah Allah, Yang Maha Pencipta, Yang Maha Mengadakan, Yang Maha Membentuk rupa.',
};

const CIPTAAN = [
  { icon: '🌍', name: 'Bumi & Langit', desc: 'Allah mencipta langit dan bumi beserta segala isinya.' },
  { icon: '🌟', name: 'Bintang & Bulan', desc: 'Allah mencipta matahari, bulan, dan bintang-bintang di langit.' },
  { icon: '🌊', name: 'Laut & Sungai', desc: 'Allah mencipta lautan, sungai, dan semua air di bumi.' },
  { icon: '👤', name: 'Manusia', desc: 'Allah mencipta manusia dari tanah dan meniupkan roh ke dalamnya.' },
  { icon: '🐘', name: 'Haiwan', desc: 'Allah mencipta pelbagai haiwan — dari semut kecil hingga gajah besar.' },
  { icon: '🌺', name: 'Tumbuhan', desc: 'Allah mencipta pokok, bunga, buah-buahan, dan semua tumbuhan.' },
];

const QUESTIONS = shuffle([
  {
    question: 'Apakah maksud nama Allah "Al-Khaliq"?',
    answer: 'Yang Maha Pencipta',
    options: ['Yang Maha Pencipta', 'Yang Maha Pemurah', 'Yang Maha Mengetahui', 'Yang Maha Pengasih'],
  },
  {
    question: 'Siapakah yang mencipta langit dan bumi?',
    answer: 'Allah',
    options: ['Allah', 'Malaikat', 'Manusia', 'Jin'],
  },
  {
    question: 'Al-Khaliq bermaksud Allah itu Maha ___.',
    answer: 'Pencipta',
    options: ['Pencipta', 'Pengampun', 'Pembalas', 'Penguasa'],
  },
  {
    question: 'Yang manakah BUKAN ciptaan Allah?',
    answer: 'Kereta buatan manusia',
    options: ['Kereta buatan manusia', 'Haiwan', 'Manusia', 'Bintang di langit'],
  },
  {
    question: 'Bagaimana Allah mencipta segala sesuatu?',
    answer: 'Dari tiada menjadi ada',
    options: ['Dari tiada menjadi ada', 'Dari air dan api', 'Dari logam dan kayu', 'Dari batu dan pasir'],
  },
  {
    question: '"الْخَالِقُ" dibaca sebagai?',
    answer: 'Al-Khaliq',
    options: ['Al-Khaliq', 'Al-Karim', 'Al-Hakim', 'Al-Rahim'],
  },
  {
    question: 'Manusia diciptakan Allah daripada apa?',
    answer: 'Tanah',
    options: ['Tanah', 'Air', 'Cahaya', 'Api'],
  },
  {
    question: 'Malaikat diciptakan Allah daripada apa?',
    answer: 'Cahaya',
    options: ['Cahaya', 'Tanah', 'Api', 'Angin'],
  },
  {
    question: 'Berapa bilangannya Asmaul Husna?',
    answer: '99',
    options: ['25', '66', '99', '114'],
  },
  {
    question: 'Asmaul Husna bermaksud?',
    answer: 'Nama-nama Allah yang indah',
    options: ['Nama-nama Allah yang indah', 'Sifat-sifat malaikat', 'Nama-nama Nabi', 'Ayat-ayat al-Quran'],
  },
]);

const TOTAL_ROUNDS = 10;

const quizHeaderContent = (
  <p style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(2rem, 8vw, 3rem)', color: '#FDE68A', margin: 0, lineHeight: 1.6, direction: 'rtl' }}>
    {KHALIQ.ar}
  </p>
);

function LearnCard({ item, language, playing, onPlayAudio }) {
  return (
    <div style={{
      background: 'rgba(245,158,11,0.1)', border: '1.5px solid rgba(245,158,11,0.25)',
      borderRadius: 14, padding: '12px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, textAlign: 'center',
    }}>
      <span style={{ fontSize: '1.8rem' }}>{item.icon}</span>
      <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 700, fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', color: '#FDE68A', margin: 0 }}>{item.name}</p>
      <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500, fontSize: 'clamp(0.66rem, 1.5vw, 0.76rem)', color: 'var(--pi-muted)', margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
      <button
        onClick={(e) => { e.stopPropagation(); onPlayAudio(item); }}
        style={{
          background: 'rgba(245,158,11,0.2)', border: 'none',
          borderRadius: '50%', width: 28, height: 28,
          fontSize: '0.85rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {playing ? '🔊' : '🔈'}
      </button>
    </div>
  );
}

export default function AsmaulHusnaKhaliq({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);
  const [playing,    setPlaying]    = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handlePlayAudio = useCallback((item) => {
    SpeechManager.stopSpeaking();
    setPlaying(item.name);
    const text = language === 'bm' ? item.desc : item.desc;
    SpeechManager.speak(text, 'ms-MY', { rate: 0.8 })
      .then(() => setPlaying(null))
      .catch(() => setPlaying(null));
  }, [language]);

  const handlePlayMainAudio = useCallback(() => {
    SpeechManager.stopSpeaking();
    setPlaying('main');
    SpeechManager.speak(KHALIQ.ar, 'ar-SA', { rate: 0.7 })
      .then(() => SpeechManager.speak(language === 'bm' ? KHALIQ.meaning : KHALIQ.meaningEng, 'ms-MY', { rate: 0.8 }))
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
      breadcrumb="Akidah › Topik 2.4"
      title={language === 'bm' ? 'Asmaul Husna: Al-Khaliq' : 'Beautiful Names: Al-Khaliq'}
      accentColor="#F59E0B"
      tab={tab}
      onTabChange={handleTabChange}
    >
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
            border: '2.5px solid rgba(212,150,10,0.5)', borderRadius: 22,
            padding: '20px 18px', marginBottom: '1rem',
            boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 12px 28px rgba(217,119,6,0.25)',
          }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <p style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(2.8rem, 10vw, 4rem)', color: '#92400E', margin: 0, lineHeight: 1.4, direction: 'rtl' }}>
                  {KHALIQ.ar}
                </p>
                <button
                  onClick={handlePlayMainAudio}
                  style={{
                    background: 'rgba(255,255,255,0.45)', border: 'none',
                    borderRadius: '50%', width: 36, height: 36,
                    fontSize: '1.1rem', cursor: 'pointer', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {playing === 'main' ? '🔊' : '🔈'}
                </button>
              </div>
              <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(1.1rem, 3vw, 1.4rem)', color: '#92400E', margin: '4px 0 0', letterSpacing: '0.04em' }}>
                {KHALIQ.rumi}
              </p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.55)', borderRadius: 14, padding: '12px 14px' }}>
              <p style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', color: '#92400E', margin: '0 0 6px', textAlign: 'center' }}>
                {language === 'bm' ? KHALIQ.meaning : KHALIQ.meaningEng}
              </p>
              <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.74rem, 1.8vw, 0.88rem)', color: '#374151', margin: 0, lineHeight: 1.5 }}>
                {language === 'bm' ? KHALIQ.desc : KHALIQ.descEng}
              </p>
            </div>
          </div>

          <div style={{
            background: 'rgba(212,150,10,0.1)', border: '1.5px solid rgba(212,150,10,0.3)',
            borderRadius: 14, padding: '12px 14px', marginBottom: '1rem',
          }}>
            <p style={{ fontFamily: ARABIC_FONT, fontSize: 'clamp(1rem, 3.5vw, 1.35rem)', color: '#FDE68A', direction: 'rtl', textAlign: 'right', margin: '0 0 6px', lineHeight: 1.9 }}>
              {KHALIQ.quranRef}
            </p>
            <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.7rem, 1.6vw, 0.82rem)', color: '#F59E0B', margin: '0 0 4px' }}>
              {KHALIQ.quranSource}
            </p>
            <p style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 500, fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', color: 'var(--pi-ink)', margin: 0, lineHeight: 1.5 }}>
              {KHALIQ.quranMeaning}
            </p>
          </div>

          <h3 style={{ fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#FDE68A', margin: '0 0 0.75rem', paddingLeft: 10, borderLeft: '4px solid #F59E0B' }}>
            {language === 'bm' ? 'Contoh Ciptaan Allah' : "Examples of Allah's Creation"}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {CIPTAAN.map((c, i) => (
              <LearnCard key={i} item={c} language={language} playing={playing === c.name} onPlayAudio={handlePlayAudio} />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #D97706, #F59E0B)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(217,119,6,0.4)' }}>
              🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →
            </button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} accentColor="#F59E0B" accentGradient="linear-gradient(135deg, #D97706, #F59E0B)" onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} />
        </div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
          <QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#F59E0B" emoji="🌟" headerContent={quizHeaderContent} onDone={(s) => { setFinalScore(s); setQuizDone(true); }} />
        </div>
      )}
    </Tahun1LessonLayout>
  );
}
