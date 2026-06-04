import React, { useState, useCallback, useEffect } from 'react';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';
import { playHoverSound, playSound } from '../../../../utils/soundManager';
import SpeechManager from '../../../../services/SpeechManager';
import { shuffle } from '../../_shared/utils';
import Celebration from '../../_shared/Celebration';

const POINTS = [
  {
    n: 1,
    title: 'Maksud Syirik',
    titleEn: 'Meaning of Shirk',
    icon: '⚠️',
    desc: 'Syirik bermaksud menyekutukan Allah dengan sesuatu yang lain — sama ada dalam ibadah, keyakinan, atau perbuatan.',
    descEn: 'Shirk means associating partners with Allah — whether in worship, belief, or actions.',
    color: '#991B1B', accent: '#EF4444',
    gradient: 'linear-gradient(135deg, #FEE2E2 0%, #FCA5A5 55%, #EF4444 100%)',
    border: 'rgba(239,68,68,0.5)',
  },
  {
    n: 2,
    title: 'Jenis Syirik',
    titleEn: 'Types of Shirk',
    icon: '🔍',
    desc: 'Syirik Besar — menyembah selain Allah, Syirik Kecil — riya\' (menunjuk-nunjuk) dan bergantung pada tangkal.',
    descEn: 'Major Shirk — worshipping other than Allah, Minor Shirk — showing off (riya\') and depending on amulets.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    n: 3,
    title: 'Contoh Syirik',
    titleEn: 'Examples of Shirk',
    icon: '🚫',
    desc: 'Menyembah patung atau berhala, riya\' dalam ibadah, percaya pada tangkal atau azimat, dan meramal nasib.',
    descEn: 'Worshipping idols, showing off in worship, believing in amulets or talismans, and fortune-telling.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    n: 4,
    title: 'Kesan Syirik',
    titleEn: 'Consequences of Shirk',
    icon: '🔥',
    desc: 'Syirik adalah dosa besar yang tidak akan diampuni Allah jika tidak bertaubat. Pelaku syirik akan kekal dalam neraka.',
    descEn: 'Shirk is a great sin that Allah will not forgive unless one repents. Those who commit shirk will remain in hell.',
    color: '#7F1D1D', accent: '#DC2626',
    gradient: 'linear-gradient(135deg, #FECACA 0%, #F87171 55%, #DC2626 100%)',
    border: 'rgba(220,38,38,0.5)',
  },
];

const QUESTIONS = shuffle([
  {
    question: 'Apakah maksud syirik?',
    answer: 'Menyekutukan Allah',
    options: ['Menyekutukan Allah', 'Mengingati Allah', 'Bersyukur kepada Allah', 'Beriman kepada Allah'],
  },
  {
    question: 'Syirik besar bermaksud?',
    answer: 'Menyembah selain Allah',
    options: ['Menyembah selain Allah', 'Menunjuk-nunjuk ibadah', 'Bercakap bohong', 'Meninggalkan solat'],
  },
  {
    question: 'Apakah contoh syirik kecil?',
    answer: 'Riya\' (menunjuk-nunjuk)',
    options: ['Riya\' (menunjuk-nunjuk)', 'Menyembah berhala', 'Membunuh', 'Mencuri'],
  },
  {
    question: 'Syirik adalah dosa yang ___ jika tidak bertaubat.',
    answer: 'Tidak diampuni Allah',
    options: ['Tidak diampuni Allah', 'Kecil dan mudah', 'Diampuni Allah pasti', 'Tidak perlu taubat'],
  },
  {
    question: 'Yang manakah contoh syirik?',
    answer: 'Bergantung pada tangkal',
    options: ['Bergantung pada tangkal', 'Bersedekah', 'Berpuasa', 'Membaca al-Quran'],
  },
  {
    question: 'Orang yang melakukan syirik besar dan tidak bertaubat akan?',
    answer: 'Kekal dalam neraka',
    options: ['Kekal dalam neraka', 'Masuk syurga', 'Dapat ampunan pasti', 'Menjadi malaikat'],
  },
  {
    question: 'Apakah yang dimaksudkan dengan riya\'?',
    answer: 'Menunjuk-nunjuk ibadah',
    options: ['Menunjuk-nunjuk ibadah', 'Bersedekah diam-diam', 'Beribadah ikhlas', 'Belajar agama'],
  },
  {
    question: 'Bagaimana cara menjauhi syirik?',
    answer: 'Ikhlas beribadah hanya kepada Allah',
    options: ['Ikhlas beribadah hanya kepada Allah', 'Banyak tidur', 'Malas beribadah', 'Ikut hawa nafsu'],
  },
  {
    question: 'Hukum syirik dalam Islam adalah?',
    answer: 'Dosa besar',
    options: ['Dosa besar', 'Dosa kecil', 'Harus', 'Sunat'],
  },
  {
    question: 'Allah berfirman tentang syirik dalam Surah?',
    answer: 'Surah An-Nisa\' ayat 48',
    options: ['Surah An-Nisa\' ayat 48', 'Surah Al-Fatihah ayat 1', 'Surah Al-Ikhlas ayat 1', 'Surah An-Nas ayat 1'],
  },
]);

const TOTAL_ROUNDS = 8;

export default function Syirik({ onBack, language = 'bm' }) {
  const [tab,        setTab]        = useState('belajar');
  const [quizDone,   setQuizDone]   = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey,    setQuizKey]    = useState(0);
  const [playing,    setPlaying]    = useState(null);

  useEffect(() => {
    return () => SpeechManager.stopSpeaking();
  }, []);

  const handlePlayAudio = useCallback((p) => {
    SpeechManager.stopSpeaking();
    setPlaying(p.n);
    const text = language === 'bm' ? `${p.title}. ${p.desc}` : `${p.titleEn}. ${p.descEn}`;
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
      breadcrumb="Akidah › Topik 2.3"
      title={language === 'bm' ? 'Kesan Menyekutukan Allah (Syirik)' : 'Consequences of Shirk'}
      accentColor="#10B981"
      tab={tab}
      onTabChange={handleTabChange}
    >
      <style>{`
        .sy-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
        }
        @media (min-width: 640px) {
          .sy-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        }
        @media (max-width: 480px) {
          .sy-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{
            background: 'rgba(239,68,68,0.12)', border: '1.5px solid rgba(239,68,68,0.3)',
            borderRadius: 14, padding: '10px 14px', marginBottom: '1rem',
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
            fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: '#FCA5A5', textAlign: 'center',
          }}>
            {language === 'bm'
              ? '⚠️ Syirik adalah dosa besar · Jauhi syirik dalam kehidupan'
              : '⚠️ Shirk is a major sin · Avoid shirk in daily life'}
          </div>
          <div className="sy-grid">
            {POINTS.map(p => (
              <div key={p.n} style={{
                background: p.gradient, border: `2.5px solid ${p.border}`,
                borderRadius: 20, padding: '14px 14px',
                display: 'flex', flexDirection: 'column', gap: 8,
                boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                    background: p.accent, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '1rem',
                    boxShadow: `0 3px 8px ${p.border}`,
                  }}>{p.n}</span>
                  <p style={{
                    fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
                    fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#1A202C',
                    margin: 0, lineHeight: 1.2, flex: 1,
                  }}>{language === 'bm' ? p.title : p.titleEn}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); onPlayAudio(p); }}
                    style={{
                      background: 'rgba(255,255,255,0.45)', border: 'none',
                      borderRadius: '50%', width: 32, height: 32,
                      fontSize: '1rem', cursor: 'pointer', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      WebkitTapHighlightColor: 'transparent',
                    }}
                  >
                    {playing === p.n ? '🔊' : '🔈'}
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.5)', borderRadius: 10, padding: '8px 12px' }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{p.icon}</span>
                  <p style={{
                    fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
                    fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)', color: '#374151',
                    margin: 0, lineHeight: 1.5,
                  }}>{language === 'bm' ? p.desc : p.descEn}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: 'clamp(0.9rem, 2.2vw, 1.05rem)', background: 'linear-gradient(135deg, #DC2626, #EF4444)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(239,68,68,0.4)' }}>
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
          <QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#10B981" emoji="⚠️" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} />
        </div>
      )}
    </Tahun1LessonLayout>
  );
}
