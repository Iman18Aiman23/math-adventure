import React, { useState, useCallback, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import SpeechManager from '../../../../services/SpeechManager';
import { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';
import Tahun1LessonLayout from '../Tahun1LessonLayout';

const KONSEP = [
  {
    icon: '🐘', label: 'Tahun Gajah', sublabel: '12 Rabiulawal',
    desc: 'Nabi Muhammad SAW dilahirkan pada hari Isnin, 12 Rabiulawal Tahun Gajah (570 Masihi). Tahun Gajah dinamakan sempena tentera bergajah Abrahah yang menyerang Kaabah.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '🤱', label: 'Penyusuan Pertama', sublabel: 'Thuwaibah',
    desc: 'Nabi mula disusukan oleh Thuwaibah, hamba kepada Abu Lahab. Ini adalah susuan pertama baginda sebelum dipelihara oleh Halimah.',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '🏕️', label: 'Halimah As-Sa\'diyah', sublabel: 'Ibu susuan',
    desc: 'Halimah As-Sa\'diyah dari Bani Sa\'ad menjadi ibu susuan Nabi. Bersama Halimah, Nabi membesar di perkampungan Bani Sa\'ad yang segar dan sihat.',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: '✨', label: 'Pembelahan Dada', sublabel: 'Pembersihan hati',
    desc: 'Ketika bersama Halimah, malaikat Jibril datang membelah dada Nabi untuk mengeluarkan segumpal darah dan membersihkan hati baginda dengan air zamzam.',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: '👶', label: 'Kembali ke Mekah', sublabel: 'Usia 5-6 tahun',
    desc: 'Selepas beberapa tahun, Nabi dikembalikan kepada ibunya Aminah. Baginda membesar bersama ibunya sehingga usia 6 tahun, kemudian ibunya meninggal dunia.',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: '👴', label: 'Dipelihara Datuk', sublabel: 'Abdul Muttalib',
    desc: 'Setelah Aminah wafat, Nabi dipelihara oleh datuknya Abdul Muttalib. Namun Abdul Muttalib juga wafat ketika Nabi berusia 8 tahun. Kemudian Nabi dijaga bapa saudaranya, Abu Talib.',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Bilakah Nabi Muhammad SAW dilahirkan?', answer: '12 Rabiulawal', options: ['12 Rabiulawal', '1 Muharram', '10 Zulhijjah', '27 Rejab'] },
  { question: 'Tahun kelahiran Nabi dipanggil?', answer: 'Tahun Gajah', options: ['Tahun Gajah', 'Tahun Ular', 'Tahun Kuda', 'Tahun Unta'] },
  { question: 'Siapakah ibu susuan pertama Nabi?', answer: 'Thuwaibah', options: ['Thuwaibah', 'Halimah', 'Aminah', 'Fatimah'] },
  { question: 'Siapakah ibu susuan Nabi dari Bani Sa\'ad?', answer: 'Halimah As-Sa\'diyah', options: ['Halimah As-Sa\'diyah', 'Thuwaibah', 'Aminah', 'Siti Hajar'] },
  { question: 'Apa peristiwa yang berlaku ketika bersama Halimah?', answer: 'Pembelahan dada', options: ['Pembelahan dada', 'Pertama bercakap', 'Berjalan', 'Berpuasa'] },
  { question: 'Malaikat apa yang membelah dada Nabi?', answer: 'Jibril', options: ['Jibril', 'Mikail', 'Israfil', 'Izrail'] },
  { question: 'Siapa yang menyerang Kaabah pada Tahun Gajah?', answer: 'Abrahah', options: ['Abrahah', 'Firaun', 'Namrud', 'Qarun'] },
  { question: 'Di manakah Nabi membesar bersama Halimah?', answer: 'Bani Sa\'ad', options: ['Bani Sa\'ad', 'Mekah', 'Madinah', 'Taif'] },
  { question: 'Siapa yang menjaga Nabi selepas Aminah wafat?', answer: 'Abdul Muttalib', options: ['Abdul Muttalib', 'Abu Talib', 'Khadijah', 'Hamzah'] },
  { question: 'Hati Nabi dibersihkan dengan?', answer: 'Air zamzam', options: ['Air zamzam', 'Air mutlak', 'Air mawar', 'Air madu'] },
]);

const TOTAL_ROUNDS = 10;

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
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
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
    </div>
  );
}

export default function KelahiranPenyusuan({ onBack, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  useEffect(() => () => SpeechManager.stopSpeaking(), []);
  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Sirah › Topik 4.2"
      title={language === 'bm' ? 'Kelahiran & Penyusuan' : 'Birth & Nursing'}
      accentColor="#0891B2"
      tab={tab}
      onTabChange={(id) => { setTab(id); playHoverSound(); if (id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } }}
    >
      {tab === 'belajar' ? (
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.8rem' }}>
            {KONSEP.map((k, i) => <ConceptCard key={i} k={k} />)}
          </div>
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #0E7490, #0891B2)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(8,145,178,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <div style={{ flex: 1, overflowY: 'auto' }}><ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} accentColor="#0891B2" accentGradient='linear-gradient(135deg, #0E7490, #0891B2)' /></div>
      ) : (
        <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}><QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#0891B2" emoji="👶" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} /></div>
      )}
    </Tahun1LessonLayout>
  );
}
