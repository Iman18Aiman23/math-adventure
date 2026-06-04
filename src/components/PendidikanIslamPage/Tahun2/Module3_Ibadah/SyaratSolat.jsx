import React, { useState, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';

const SYARAT_WAJIB = [
  { icon: '☪️', label: 'Islam', desc: 'Hanya orang Islam diwajibkan menunaikan solat.' },
  { icon: '🧑', label: 'Baligh (cukup umur)', desc: 'Telah mencapai umur dewasa — mimpi basah (lelaki) atau haid (perempuan).' },
  { icon: '🧠', label: 'Berakal (siuman)', desc: 'Sedar dan siuman; tidak sah solat orang yang gila atau tidak sedar.' },
  { icon: '♀️', label: 'Suci haid & nifas', desc: 'Bagi perempuan, wajib suci daripada haid dan nifas.' },
  { icon: '📢', label: 'Sampai seruan Islam', desc: 'Telah sampai kepadanya dakwah dan seruan Islam.' },
];

const SYARAT_SAH = [
  { icon: '🧼', label: 'Suci badan, pakaian & tempat', desc: 'Badan, pakaian dan tempat solat hendaklah bersih daripada najis.' },
  { icon: '👗', label: 'Menutup aurat', desc: 'Lelaki: pusat hingga lutut. Perempuan: seluruh tubuh kecuali muka dan tapak tangan.' },
  { icon: '🕋', label: 'Menghadap kiblat', desc: 'Menghadap ke arah Kaabah di Masjidil Haram, Mekah.' },
  { icon: '⏰', label: 'Masuk waktu solat', desc: 'Setiap solat fardu mempunyai waktu yang telah ditetapkan.' },
];

function buildQuestions() {
  const qs = [];
  const allWajib = SYARAT_WAJIB.map(w => w.label);
  const allSah = SYARAT_SAH.map(s => s.label);
  const allMix = [...allWajib, ...allSah];

  SYARAT_WAJIB.forEach(w => {
    const wrong = shuffle(allMix.filter(x => x !== w.label)).slice(0, 3);
    qs.push({
      question: 'Antara berikut, yang manakah SYARAT WAJIB solat?',
      answer: w.label,
      options: shuffle([w.label, ...wrong]),
    });
  });

  SYARAT_SAH.forEach(s => {
    const wrong = shuffle(allMix.filter(x => x !== s.label)).slice(0, 3);
    qs.push({
      question: 'Antara berikut, yang manakah SYARAT SAH solat?',
      answer: s.label,
      options: shuffle([s.label, ...wrong]),
    });
  });

  qs.push({
    question: 'Berapakah bilangan Syarat Wajib Solat?',
    answer: '5', options: ['3', '4', '5', '6'],
  });
  qs.push({
    question: 'Berapakah bilangan Syarat Sah Solat?',
    answer: '4', options: ['2', '3', '4', '5'],
  });
  qs.push({
    question: '"Menutup aurat" termasuk dalam?',
    answer: 'Syarat Sah',
    options: shuffle(['Syarat Sah', 'Syarat Wajib', 'Rukun Solat', 'Sunat Solat']),
  });
  qs.push({
    question: '"Baligh" termasuk dalam?',
    answer: 'Syarat Wajib',
    options: shuffle(['Syarat Wajib', 'Syarat Sah', 'Rukun Solat', 'Sunat Solat']),
  });
  qs.push({
    question: 'Yang manakah BUKAN syarat sah solat?',
    answer: 'Islam',
    options: shuffle(['Islam', 'Menutup aurat', 'Menghadap kiblat', 'Masuk waktu solat']),
  });
  qs.push({
    question: 'Yang manakah BUKAN syarat wajib solat?',
    answer: 'Menghadap kiblat',
    options: shuffle(['Menghadap kiblat', 'Islam', 'Baligh', 'Berakal']),
  });

  return shuffle(qs);
}

const TOTAL_ROUNDS = 10;

function InfoCard({ item }) {
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div style={{
      background: 'linear-gradient(135deg, #D6EEFF 0%, #BFDBFE 55%, #93C5FD 100%)',
      border: '2.5px solid rgba(37,99,235,0.4)',
      borderRadius: 20, padding: '14px 12px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 8px 20px rgba(0,0,0,0.08)',
      textAlign: 'center',
    }}>
      <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{item.icon}</span>
      <p style={{
        fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
        fontSize: 'clamp(0.78rem, 2vw, 0.92rem)',
        color: '#1E3A5F', margin: 0, lineHeight: 1.2,
      }}>{item.label}</p>
      {showDesc && (
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
          fontSize: 'clamp(0.68rem, 1.6vw, 0.8rem)',
          color: '#1E40AF', margin: 0, lineHeight: 1.5,
          background: 'rgba(255,255,255,0.5)', borderRadius: 10,
          padding: '7px 10px', width: '100%', boxSizing: 'border-box',
        }}>
          {item.desc}
        </p>
      )}
      <button
        onClick={() => { setShowDesc(s => !s); playHoverSound(); }}
        style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
          fontSize: '0.7rem', color: '#1E40AF',
          background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999,
          padding: '3px 12px', cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {showDesc ? '▲ Tutup' : 'ℹ️ Penjelasan'}
      </button>
    </div>
  );
}

export default function SyaratSolat({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);

  useEffect(() => () => SpeechManager.stopSpeaking(), []);

  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › Topik 3.1"
      title={language === 'bm' ? 'Syarat Wajib & Sah Solat' : 'Conditions of Prayer'}
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
            📋 Syarat Wajib (5) · Syarat Sah (4)
          </div>

          <p style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: 'clamp(0.9rem, 2.2vw, 1rem)', color: '#2563EB',
            margin: '0 0 10px',
          }}>Syarat Wajib Solat</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.7rem', marginBottom: '1.2rem' }}>
            {SYARAT_WAJIB.map((w, i) => <InfoCard key={i} item={w} />)}
          </div>

          <p style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: 'clamp(0.9rem, 2.2vw, 1rem)', color: '#2563EB',
            margin: '0 0 10px',
          }}>Syarat Sah Solat</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.7rem', marginBottom: '1.5rem' }}>
            {SYARAT_SAH.map((s, i) => <InfoCard key={i} item={s} />)}
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
          emoji="🧎"
        />
      )}
    </Tahun1LessonLayout>
  );
}
