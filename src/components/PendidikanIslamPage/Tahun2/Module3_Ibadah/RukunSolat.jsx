import React, { useState, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';

const RUKUN_FILI = [
  { n: 1, name: 'Berdiri tegak (mampu)', desc: 'Berdiri dengan sempurna bagi yang berkemampuan.' },
  { n: 2, name: 'Rukuk dengan tumaninah', desc: 'Membongkok dengan tenang dan sempurna.' },
  { n: 3, name: 'Iktidal dengan tumaninah', desc: 'Bangun dari rukuk dengan tenang.' },
  { n: 4, name: 'Sujud dengan tumaninah', desc: 'Sujud dengan dahi ke lantai dalam keadaan tenang.' },
  { n: 5, name: 'Duduk antara dua sujud', desc: 'Duduk sebentar antara dua sujud dengan tenang.' },
  { n: 6, name: 'Duduk tasyahhud akhir', desc: 'Duduk untuk membaca tasyahhud (tahiyat) akhir.' },
  { n: 7, name: 'Tertib', desc: 'Melakukan semua rukun secara berurutan.' },
];

const RUKUN_QOULI = [
  { n: 8, name: 'Niat', desc: 'Berniat dalam hati untuk melaksanakan solat tertentu.' },
  { n: 9, name: 'Takbiratul Ihram', desc: 'Mengucapkan "Allahu Akbar" pada permulaan solat.' },
  { n: 10, name: 'Membaca Al-Fatihah', desc: 'Membaca surah Al-Fatihah pada setiap rakaat.' },
  { n: 11, name: 'Tasyahhud akhir', desc: 'Membaca tahiyat akhir.' },
  { n: 12, name: 'Selawat ke atas Nabi', desc: 'Membaca selawat ke atas Nabi Muhammad SAW.' },
  { n: 13, name: 'Salam', desc: 'Memberi salam ke kanan dan ke kiri.' },
];

const ALL_RUKUN = [...RUKUN_FILI, ...RUKUN_QOULI];

function buildQuestions() {
  const qs = [];
  const filiNames = RUKUN_FILI.map(r => r.name);
  const qouliNames = RUKUN_QOULI.map(r => r.name);

  RUKUN_FILI.forEach(r => {
    const wrong = shuffle(qouliNames).slice(0, 3);
    qs.push({
      question: `"${r.name}" termasuk dalam Rukun jenis?`,
      answer: "Fi'li (Perbuatan)",
      options: shuffle(["Fi'li (Perbuatan)", 'Qouli (Bacaan)', ...wrong]),
    });
  });

  RUKUN_QOULI.forEach(r => {
    const wrong = shuffle(filiNames).slice(0, 3);
    qs.push({
      question: `"${r.name}" termasuk dalam Rukun jenis?`,
      answer: 'Qouli (Bacaan)',
      options: shuffle(['Qouli (Bacaan)', "Fi'li (Perbuatan)", ...wrong]),
    });
  });

  qs.push({
    question: 'Berapakah jumlah Rukun Solat keseluruhannya?',
    answer: '13', options: ['10', '12', '13', '15'],
  });
  qs.push({
    question: 'Berapakah bilangan Rukun Fi\'li?',
    answer: '7', options: ['5', '6', '7', '8'],
  });
  qs.push({
    question: 'Berapakah bilangan Rukun Qouli?',
    answer: '6', options: ['4', '5', '6', '7'],
  });
  qs.push({
    question: 'Antara berikut, yang manakah RUKUN QOULI?',
    answer: 'Niat',
    options: shuffle(['Niat', 'Rukuk', 'Sujud', 'Iktidal']),
  });
  qs.push({
    question: 'Antara berikut, yang manakah RUKUN FILI?',
    answer: 'Sujud dengan tumaninah',
    options: shuffle(['Sujud dengan tumaninah', 'Selawat ke atas Nabi', 'Niat', 'Salam']),
  });
  qs.push({
    question: '"Membaca Al-Fatihah" termasuk dalam?',
    answer: 'Rukun Qouli',
    options: shuffle(['Rukun Qouli', "Rukun Fi'li", 'Syarat Sah', 'Sunat Solat']),
  });
  qs.push({
    question: '"Tertib" termasuk dalam?',
    answer: "Rukun Fi'li",
    options: shuffle(["Rukun Fi'li", 'Rukun Qouli', 'Syarat Wajib', 'Sunat Solat']),
  });

  return shuffle(qs);
}

const TOTAL_ROUNDS = 10;

function RukunCard({ r, isFili }) {
  const [showDesc, setShowDesc] = useState(false);
  const bg = isFili
    ? 'linear-gradient(135deg, #D6EEFF 0%, #BFDBFE 55%, #93C5FD 100%)'
    : 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 55%, #A5B4FC 100%)';
  const bd = isFili ? 'rgba(37,99,235,0.4)' : 'rgba(99,102,241,0.4)';
  return (
    <div style={{
      background: bg, border: `2.5px solid ${bd}`,
      borderRadius: 16, padding: '10px 10px',
      display: 'flex', flexDirection: 'column', gap: 6,
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 6px 16px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: '#3B82F6', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.75rem',
        }}>{r.n}</span>
        <p style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(0.72rem, 1.8vw, 0.85rem)',
          color: '#1E3A5F', margin: 0, lineHeight: 1.2, flex: 1, textAlign: 'left',
        }}>{r.name}</p>
        <button
          onClick={() => { setShowDesc(s => !s); playHoverSound(); }}
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
            fontSize: '0.65rem', color: '#1E40AF',
            background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999,
            padding: '2px 10px', cursor: 'pointer', flexShrink: 0,
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {showDesc ? '▲' : 'ℹ️'}
        </button>
      </div>
      {showDesc && (
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
          fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
          color: '#1E40AF', margin: 0, lineHeight: 1.4,
          background: 'rgba(255,255,255,0.5)', borderRadius: 8,
          padding: '5px 8px', width: '100%', boxSizing: 'border-box',
        }}>
          {r.desc}
        </p>
      )}
    </div>
  );
}

export default function RukunSolat({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);

  useEffect(() => () => SpeechManager.stopSpeaking(), []);

  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › Topik 3.2"
      title={language === 'bm' ? 'Rukun Solat' : 'Pillars of Prayer'}
      accentColor="#3B82F6"
      tab={tab}
      onTabChange={(id) => { playHoverSound(); if (id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } setTab(id); }}
    >
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{
            background: 'rgba(59,130,246,0.12)', border: '1.5px solid rgba(59,130,246,0.3)',
            borderRadius: 14, padding: '8px 14px', marginBottom: '0.75rem',
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
            fontSize: 'clamp(0.78rem, 2vw, 0.9rem)', color: '#2563EB', textAlign: 'center',
          }}>
            🕌 13 Rukun Solat · Fi'li (7) &amp; Qouli (6)
          </div>

          <p style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: 'clamp(0.9rem, 2.2vw, 1rem)', color: '#2563EB',
            margin: '0 0 10px',
          }}>Rukun Fi'li (Perbuatan)</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.7rem', marginBottom: '1.2rem' }}>
            {RUKUN_FILI.map(r => <RukunCard key={r.n} r={r} isFili />)}
          </div>

          <p style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: 'clamp(0.9rem, 2.2vw, 1rem)', color: '#2563EB',
            margin: '0 0 10px',
          }}>Rukun Qouli (Bacaan)</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.7rem', marginBottom: '1.5rem' }}>
            {RUKUN_QOULI.map(r => <RukunCard key={r.n} r={r} isFili={false} />)}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }}
              style={{
                fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
                fontSize: '1.05rem',
                background: 'linear-gradient(135deg, #2563EB, #3B82F6)',
                color: '#fff', border: 'none', borderRadius: 999,
                padding: '12px 32px', cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(59,130,246,0.4)',
              }}
            >
              🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →
            </button>
          </div>
        </div>
      ) : quizDone ? (
        <ResultScreen
          score={finalScore}
          totalRounds={TOTAL_ROUNDS}
          onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }}
          onBack={() => setTab('belajar')}
          language={language}
          accentColor="#3B82F6"
          accentGradient="linear-gradient(135deg, #2563EB, #3B82F6)"
        />
      ) : (
        <QuizScreen
          key={quizKey}
          language={language}
          questions={buildQuestions()}
          totalRounds={TOTAL_ROUNDS}
          accentColor="#3B82F6"
          onDone={(s) => { setFinalScore(s); setQuizDone(true); }}
          emoji="🕌"
        />
      )}
    </Tahun1LessonLayout>
  );
}
