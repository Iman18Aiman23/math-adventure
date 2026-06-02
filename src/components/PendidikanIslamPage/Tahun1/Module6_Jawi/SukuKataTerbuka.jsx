import React, { useState, useCallback, useEffect } from 'react';
import { playHoverSound } from '../../../../utils/soundManager';
import { shuffle } from '../../_shared/utils';
import Tahun1LessonLayout, { QuizScreen, ResultScreen } from '../Tahun1LessonLayout';
import SpeechManager from '../../../../services/SpeechManager';

const KONSEP = [
  {
    icon: '🔤', label: 'Apa itu Suku Kata Terbuka?', sublabel: 'KV — Konsonan + Vokal',
    desc: 'Suku kata terbuka dalam Jawi ialah gabungan satu huruf konsonan dengan satu huruf vokal (Alif, Wau atau Ya). Contoh: با (ba), بو (bu), بي (bi).',
    color: '#065F46', accent: '#10B981',
    gradient: 'linear-gradient(135deg, #D6F5DD 0%, #8AD9A8 55%, #2A9A6C 100%)',
    border: 'rgba(42,154,108,0.5)',
  },
  {
    icon: 'ا', label: 'Vokal Alif (ا)', sublabel: 'Bunyi "a"',
    desc: 'Alif (ا) digunakan untuk mewakili bunyi vokal "a" dalam suku kata terbuka. Contoh: با (ba), تا (ta), ما (ma), نا (na).',
    color: '#0C4A6E', accent: '#0891B2',
    gradient: 'linear-gradient(135deg, #D0F7FA 0%, #67D6E8 55%, #0891B2 100%)',
    border: 'rgba(8,145,178,0.5)',
  },
  {
    icon: 'و', label: 'Vokal Wau (و)', sublabel: 'Bunyi "u"',
    desc: 'Wau (و) digunakan untuk mewakili bunyi vokal "u" dalam suku kata terbuka. Contoh: بو (bu), تو (tu), مو (mu), نو (nu).',
    color: '#1E40AF', accent: '#3B82F6',
    gradient: 'linear-gradient(135deg, #D6EEFF 0%, #6BAEE8 55%, #2563EB 100%)',
    border: 'rgba(37,99,235,0.5)',
  },
  {
    icon: 'ي', label: 'Vokal Ya (ي)', sublabel: 'Bunyi "i"',
    desc: 'Ya (ي) digunakan untuk mewakili bunyi vokal "i" dalam suku kata terbuka. Contoh: بي (bi), تي (ti), مي (mi), ني (ni).',
    color: '#92400E', accent: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFF7D6 0%, #FDD97A 55%, #D4960A 100%)',
    border: 'rgba(212,150,10,0.5)',
  },
  {
    icon: '📖', label: 'Contoh Perkataan', sublabel: 'Suku kata terbuka',
    desc: 'Contoh perkataan: باجو (baju), ملايو (Melayu), ساتو (satu), تيݢ (tiga), بولن (bulan). Setiap suku kata berakhir dengan vokal.',
    color: '#4C1D95', accent: '#7A55E0',
    gradient: 'linear-gradient(135deg, #E7D9FF 0%, #B79CFF 55%, #7A55E0 100%)',
    border: 'rgba(122,85,224,0.5)',
  },
  {
    icon: '✏️', label: 'Cara Membaca', sublabel: 'Sebut dengan jelas',
    desc: 'Baca suku kata terbuka dengan menyebut konsonan dahulu, kemudian vokal. Contoh: نا disebut "na", بو disebut "bu", لي disebut "li".',
    color: '#9D174D', accent: '#EC4899',
    gradient: 'linear-gradient(135deg, #FFE9F3 0%, #FFBFDD 55%, #FF8CBF 100%)',
    border: 'rgba(236,72,153,0.5)',
  },
];

const QUESTIONS = shuffle([
  { question: 'Suku kata terbuka Jawi: با disebut?', answer: 'ba', options: ['ba', 'bu', 'bi', 'be'] },
  { question: 'Suku kata terbuka Jawi: بو disebut?', answer: 'bu', options: ['bu', 'ba', 'bi', 'bo'] },
  { question: 'Suku kata terbuka Jawi: بي disebut?', answer: 'bi', options: ['bi', 'ba', 'bu', 'be'] },
  { question: 'Huruf vokal dalam Jawi ialah?', answer: 'Alif, Wau, Ya', options: ['Alif, Wau, Ya', 'Alif, Ba, Ta', 'Sin, Syim, Sad', 'Kaf, Lam, Mim'] },
  { question: 'Alif (ا) mewakili bunyi?', answer: 'a', options: ['a', 'i', 'u', 'e'] },
  { question: 'Wau (و) mewakili bunyi?', answer: 'u', options: ['u', 'a', 'i', 'o'] },
  { question: 'Ya (ي) mewakili bunyi?', answer: 'i', options: ['i', 'a', 'u', 'e'] },
  { question: 'Contoh perkataan Jawi: باجو dalam Rumi?', answer: 'baju', options: ['baju', 'baja', 'biji', 'buku'] },
  { question: 'Suku kata terbuka berakhir dengan?', answer: 'Huruf vokal', options: ['Huruf vokal', 'Huruf konsonan', 'Huruf mati', 'Tanda baca'] },
  { question: 'نا disebut?', answer: 'na', options: ['na', 'ni', 'nu', 'ne'] },
]);

const TOTAL_ROUNDS = 10;

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div style={{
      background: item.gradient,
      border: `2.5px solid ${item.border}`,
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 2px 0 rgba(255,255,255,0.35) inset, 0 6px 18px rgba(0,0,0,0.08)',
    }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 16px', background: 'none', border: 'none',
          cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
          fontFamily: "'Baloo 2', sans-serif", fontWeight: 800,
          fontSize: 'clamp(0.85rem, 2.2vw, 1rem)', color: '#1A202C',
          textAlign: 'left', transition: 'background 0.2s',
        }}
      >
        <span style={{ fontSize: '2rem', lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
        <div style={{ flex: 1 }}>
          <span>{item.label}</span>
          <div style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', color: item.color, marginTop: 2 }}>{item.sublabel}</div>
        </div>
        <span onClick={(e) => { e.stopPropagation(); SpeechManager.stopSpeaking(); SpeechManager.speak(item.desc, 'ms-MY', { rate: 0.8 }); }}
          style={{ fontSize: '1rem', cursor: 'pointer', flexShrink: 0 }}>
          🔊
        </span>
        <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s ease', fontSize: '1.2rem', color: item.color }}>▾</span>
      </button>
      <div style={{ maxHeight: isOpen ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
        <div style={{ padding: '0 16px 14px' }}>
          <div style={{
            fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 600,
            fontSize: 'clamp(0.72rem, 1.8vw, 0.84rem)', color: '#374151',
            lineHeight: 1.5, background: 'rgba(255,255,255,0.55)',
            borderRadius: 10, padding: '8px 10px',
          }}>
            {item.desc}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SukuKataTerbuka({ onBack, onNavigate, language = 'bm' }) {
  const [tab, setTab] = useState('belajar');
  const [quizDone, setQuizDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => () => SpeechManager.stopSpeaking(), []);

  return (
    <Tahun1LessonLayout
      onBack={onBack}
      language={language}
      breadcrumb="Celik Jawi › Topik 6.2"
      title={language === 'bm' ? 'Suku Kata Terbuka' : 'Open Syllables'}
      accentColor="#0891B2"
      tab={tab}
      onTabChange={(id) => { playHoverSound(); if (id === 'kuiz') { setQuizDone(false); setQuizKey(k => k + 1); } setTab(id); }}
    >
      <style>{`
        @keyframes mari-pulse {
          0%, 100% { box-shadow: 0 4px 15px rgba(8,145,178,0.4); transform: scale(1); }
          50% { box-shadow: 0 4px 30px rgba(8,145,178,0.6), 0 0 0 4px rgba(8,145,178,0.1); transform: scale(1.03); }
        }
        @keyframes mari-sparkle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(15deg) scale(1.3); }
          75% { transform: rotate(-15deg) scale(1.2); }
        }
        @keyframes mari-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
      {tab === 'belajar' ? (
        <div style={{ padding: '0.75rem 1.25rem calc(80px + var(--safe-bottom, 0px))' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {KONSEP.map((k, i) => <FaqItem key={i} item={k} isOpen={openFaq === i} onToggle={() => { setOpenFaq(openFaq === i ? null : i); playHoverSound(); }} />)}
          </div>

          <button
            onClick={() => { playHoverSound(); onNavigate?.('jawi-kv-learning'); }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(8,145,178,0.5), 0 0 0 4px rgba(8,145,178,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.93) rotate(0deg)'; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1.1) rotate(-2deg)'; }}
            style={{
              width: '100%', maxWidth: 300, margin: '0 auto',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
              fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700,
              fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
              padding: '16px 12px', borderRadius: 18, border: 'none',
              cursor: 'pointer', userSelect: 'none',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              background: 'linear-gradient(145deg, #0E7490, #0891B2, #06B6D4)',
              color: '#fff',
              boxShadow: '0 4px 15px rgba(8,145,178,0.4)',
              animation: 'mari-pulse 2s ease-in-out infinite',
            }}
          >
            <span style={{ display: 'inline-block', animation: 'mari-sparkle 2s ease-in-out infinite', fontSize: '1rem', lineHeight: 1 }}>🧩</span>
            <span style={{ fontFamily: "'Amiri', serif", fontWeight: 700, fontSize: '1.5rem', lineHeight: 1.1, display: 'flex', gap: 3, direction: 'rtl' }}>
              <span style={{ animation: 'mari-bounce 1.5s ease-in-out infinite', animationDelay: '0s' }}>با</span>
              <span style={{ animation: 'mari-bounce 1.5s ease-in-out infinite', animationDelay: '0.15s' }}>بي</span>
              <span style={{ animation: 'mari-bounce 1.5s ease-in-out infinite', animationDelay: '0.3s' }}>بو</span>
            </span>
            <span style={{ fontSize: '0.6rem', opacity: 0.85 }}>
              {language === 'bm' ? 'Interaktif' : 'Interactive'}
            </span>
          </button>

          <div style={{ marginTop: '1.25rem', textAlign: 'center', paddingBottom: '1rem' }}>
            <button onClick={() => { setTab('kuiz'); setQuizDone(false); setQuizKey(k => k + 1); playHoverSound(); }} style={{ fontFamily: "'Fredoka', system-ui, sans-serif", fontWeight: 700, fontSize: '1.05rem', background: 'linear-gradient(135deg, #0E7490, #0891B2)', color: '#fff', border: 'none', borderRadius: 999, padding: '12px 32px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(8,145,178,0.4)' }}>🎯 {language === 'bm' ? 'Mula Kuiz' : 'Start Quiz'} →</button>
          </div>
        </div>
      ) : quizDone ? (
        <ResultScreen score={finalScore} totalRounds={TOTAL_ROUNDS} onRetry={() => { setQuizDone(false); setQuizKey(k => k + 1); }} onBack={() => setTab('belajar')} language={language} accentColor="#0891B2" accentGradient="linear-gradient(135deg, #0E7490, #0891B2)" />
      ) : (
        <QuizScreen key={quizKey} language={language} questions={QUESTIONS} totalRounds={TOTAL_ROUNDS} accentColor="#0891B2" onDone={(s) => { setFinalScore(s); setQuizDone(true); }} emoji="📝" />
      )}
    </Tahun1LessonLayout>
  );
}
