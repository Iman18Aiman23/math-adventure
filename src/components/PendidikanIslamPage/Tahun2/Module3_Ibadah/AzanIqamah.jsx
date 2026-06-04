import React, { useState, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../../Tahun1/Tahun1LessonLayout';

const AZAN = [
  { n: 1, ar: 'ٱللَّهُ أَكْبَرُ، ٱللَّهُ أَكْبَرُ', label: 'Allahu Akbar, Allahu Akbar', response: 'ٱللَّهُ أَكْبَرُ، ٱللَّهُ أَكْبَرُ' },
  { n: 2, ar: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ', label: "Ashhadu alla ilaha illallah", response: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ' },
  { n: 3, ar: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّهِ', label: "Ashhadu anna Muhammadar Rasulullah", response: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّهِ' },
  { n: 4, ar: 'حَيَّ عَلَى ٱلصَّلَاةِ', label: 'Hayya alas-solah', response: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّهِ' },
  { n: 5, ar: 'حَيَّ عَلَى ٱلْفَلَاحِ', label: 'Hayya alal-falah', response: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّهِ' },
  { n: 6, ar: 'ٱللَّهُ أَكْبَرُ، ٱللَّهُ أَكْبَرُ', label: 'Allahu Akbar, Allahu Akbar', response: 'ٱللَّهُ أَكْبَرُ، ٱللَّهُ أَكْبَرُ' },
  { n: 7, ar: 'لَا إِلَٰهَ إِلَّا ٱللَّهُ', label: 'La ilaha illallah', response: 'لَا إِلَٰهَ إِلَّا ٱللَّهُ' },
];

const IQAMAH = [
  { n: 1, ar: 'ٱللَّهُ أَكْبَرُ، ٱللَّهُ أَكْبَرُ', label: 'Allahu Akbar, Allahu Akbar' },
  { n: 2, ar: 'أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا ٱللَّهُ', label: "Ashhadu alla ilaha illallah" },
  { n: 3, ar: 'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ ٱللَّهِ', label: "Ashhadu anna Muhammadar Rasulullah" },
  { n: 4, ar: 'حَيَّ عَلَى ٱلصَّلَاةِ', label: 'Hayya alas-solah' },
  { n: 5, ar: 'حَيَّ عَلَى ٱلْفَلَاحِ', label: 'Hayya alal-falah' },
  { n: 6, ar: 'قَدْ قَامَتِ ٱلصَّلَاةُ', label: 'Qad qamatis-solah, Qad qamatis-solah' },
  { n: 7, ar: 'لَا إِلَٰهَ إِلَّا ٱللَّهُ', label: 'Allahu Akbar, Allahu Akbar · La ilaha illallah' },
];

function buildQuestions() {
  const qs = [];
  const azanLabels = AZAN.map(a => a.label);
  const iqamahLabels = IQAMAH.map(i => i.label);

  AZAN.forEach(a => {
    const wrong = shuffle(azanLabels.filter(x => x !== a.label)).slice(0, 3);
    qs.push({
      question: 'Antara berikut, yang manakah lafaz AZAN?',
      answer: a.label,
      options: shuffle([a.label, ...wrong]),
    });
  });

  IQAMAH.slice(0, 3).forEach(i => {
    const wrong = shuffle(iqamahLabels.filter(x => x !== i.label)).slice(0, 3);
    qs.push({
      question: 'Antara berikut, yang manakah lafaz IQAMAH?',
      answer: i.label,
      options: shuffle([i.label, ...wrong]),
    });
  });

  qs.push({
    question: 'Apakah lafaz yang hanya ada dalam IQAMAH (tidak dalam AZAN)?',
    answer: 'Qad qamatis-solah, Qad qamatis-solah',
    options: shuffle([
      'Qad qamatis-solah, Qad qamatis-solah',
      'Hayya alal-falah',
      'Hayya alas-solah',
      'Allahu Akbar, Allahu Akbar',
    ]),
  });

  qs.push({
    question: 'Apakah jawapan ketika mendengar "Hayya alas-solah"?',
    answer: 'La haula wala quwwata illa billah',
    options: shuffle([
      'La haula wala quwwata illa billah',
      'Allahu Akbar',
      'Ashhadu alla ilaha illallah',
      'Sami allahu liman hamidah',
    ]),
  });

  qs.push({
    question: 'Apakah jawapan ketika mendengar "Hayya alal-falah"?',
    answer: 'La haula wala quwwata illa billah',
    options: shuffle([
      'La haula wala quwwata illa billah',
      'Allahu Akbar',
      'Ashhadu anna Muhammadar Rasulullah',
      'Alhamdulillah',
    ]),
  });

  qs.push({
    question: 'Apakah lafaz pertama dalam Azan?',
    answer: 'Allahu Akbar, Allahu Akbar',
    options: shuffle([
      'Allahu Akbar, Allahu Akbar',
      "Ashhadu alla ilaha illallah",
      "Ashhadu anna Muhammadar Rasulullah",
      'Hayya alas-solah',
    ]),
  });

  qs.push({
    question: 'Apakah lafaz terakhir dalam Azan?',
    answer: 'La ilaha illallah',
    options: shuffle([
      'La ilaha illallah',
      'Allahu Akbar, Allahu Akbar',
      'Hayya alal-falah',
      'Qad qamatis-solah',
    ]),
  });

  return shuffle(qs);
}

const TOTAL_ROUNDS = 8;

function PhraseCard({ item, type }) {
  const [showAr, setShowAr] = useState(false);
  const bg = type === 'azan'
    ? 'linear-gradient(135deg, #D6EEFF 0%, #BFDBFE 55%, #93C5FD 100%)'
    : 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 55%, #A5B4FC 100%)';
  const bd = type === 'azan' ? 'rgba(37,99,235,0.4)' : 'rgba(99,102,241,0.4)';
  return (
    <div style={{
      background: bg, border: `2.5px solid ${bd}`,
      borderRadius: 16, padding: '10px 10px',
      display: 'flex', flexDirection: 'column', gap: 6,
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 6px 16px rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{
          width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
          background: '#3B82F6', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800, fontSize: '0.7rem',
        }}>{item.n}</span>
        <p style={{
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(0.7rem, 1.7vw, 0.82rem)',
          color: '#1E3A5F', margin: 0, lineHeight: 1.2, flex: 1,
        }}>{item.label}</p>
        <button
          onClick={() => { setShowAr(s => !s); playHoverSound(); }}
          style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
            fontSize: '0.6rem', color: '#1E40AF',
            background: 'rgba(255,255,255,0.45)', border: 'none', borderRadius: 999,
            padding: '2px 8px', cursor: 'pointer', flexShrink: 0,
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {showAr ? 'Tutup' : 'عربي'}
        </button>
      </div>
      {showAr && (
        <p style={{
          fontFamily: "'Traditional Arabic', 'Arial', sans-serif",
          fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
          color: '#1E40AF', margin: 0, textAlign: 'center',
          background: 'rgba(255,255,255,0.5)', borderRadius: 8,
          padding: '5px 8px', direction: 'rtl',
        }}>
          {item.ar}
        </p>
      )}
      {type === 'azan' && showAr && item.response && (
        <p style={{
          fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
          fontSize: 'clamp(0.6rem, 1.4vw, 0.7rem)',
          color: '#059669', margin: 0, textAlign: 'center',
        }}>
          ↪ Jawab: {item.response}
        </p>
      )}
    </div>
  );
}

export default function AzanIqamah({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);

  useEffect(() => () => SpeechManager.stopSpeaking(), []);

  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Ibadah › Topik 3.3"
      title={language === 'bm' ? 'Azan & Iqamah' : 'Adhan & Iqamah'}
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
            🔊 Ketuk "عربي" untuk lihat teks Arab & cara menjawab
          </div>

          <p style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: 'clamp(0.9rem, 2.2vw, 1rem)', color: '#2563EB',
            margin: '0 0 10px',
          }}>Lafaz Azan (7)</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.7rem', marginBottom: '1.2rem' }}>
            {AZAN.map(a => <PhraseCard key={a.n} item={a} type="azan" />)}
          </div>

          <p style={{
            fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
            fontSize: 'clamp(0.9rem, 2.2vw, 1rem)', color: '#2563EB',
            margin: '0 0 10px',
          }}>Lafaz Iqamah (7)</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.7rem', marginBottom: '1.5rem' }}>
            {IQAMAH.map(i => <PhraseCard key={i.n} item={i} type="iqamah" />)}
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
          emoji="🔊"
        />
      )}
    </Tahun1LessonLayout>
  );
}
