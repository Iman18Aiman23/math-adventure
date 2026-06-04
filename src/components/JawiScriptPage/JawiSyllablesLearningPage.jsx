import React from 'react';
import { LOCALIZATION } from '../../utils/localization';
import { JAWI_ALPHABET } from '../../utils/jawiData';
import BackButton from '../BackButton';
import LoadingSpinner from '../LoadingSpinner';
import JawiReadingPage4 from './JawiReadingPage4';

// Categorize syllables by level
const SYLLABLE_LEVELS = {
  1: { // KV - Simple syllables (a, e, i, o, u sounds)
    name: 'KV',
    pattern: ['ا', 'ب', 'ت', 'ث', 'ج', 'چ', 'ح', 'خ']
  },
  2: { // KVK - Closed syllables
    name: 'KVK',
    pattern: ['د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض']
  },
  3: { // Intermediate
    name: 'Intermediate',
    pattern: ['ط', 'ظ', 'ع', 'غ', 'ڠ', 'ف', 'ڤ', 'ق']
  },
  4: { // Advanced
    name: 'Advanced',
    pattern: ['ك', 'ݢ', 'ل', 'م', 'ن', 'و', 'ۏ', 'ه', 'ء', 'ي', 'ڽ']
  }
};

export default function JawiSyllablesLearningPage({ onBack, onHome, language }) {
  const t = LOCALIZATION[language].jawi;
  const [selectedLevel, setSelectedLevel] = React.useState(null);
  // Keep the level menu visible while a lazy level chunk (KV/KVK) loads.
  const [isPending, startTransition] = React.useTransition();

  // Route each level to its dedicated learning page
  if (selectedLevel === 4) {
    return (
      <JawiReadingPage4
        onBack={() => setSelectedLevel(null)}
        language={language}
      />
    );
  }

  // Main learning page
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
      {isPending && <LoadingSpinner overlay />}
      <BackButton onClick={onBack} />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem 1rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem', animation: 'bounce 2s ease-in-out infinite' }}>
            🅰️
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#3C3C3C', margin: '0 0 0.5rem 0' }}>
            {language === 'bm' ? 'Kuasai Suku Kata Jawi' : 'Master Jawi Syllables'}
          </h2>
          <p style={{ fontSize: '1rem', color: '#777', fontWeight: 600, margin: 0 }}>
            {language === 'bm'
              ? 'Dari suku kata ringkas hingga ayat panjang. Mulai dari tahap mudah dan berkembang dengan kepercayaan diri!'
              : 'From simple syllables to complete sentences. Start easy and progress with confidence!'}
          </p>
        </div>

        {/* Level Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            {
              num: 4,
              title: language === 'bm' ? 'Tahap 4 (Ayat Panjang)' : 'Level 4 (Long Sentences)',
              desc: language === 'bm' ? 'Membaca ayat penuh berserta makna' : 'Reading complete sentences with meaning',
              color: '#58CC02',
              bg: '#E6FFD4'
            },
          ].map((level) => (
            <button
              key={level.num}
              onClick={() => startTransition(() => setSelectedLevel(level.num))}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1.25rem',
                background: '#fff',
                border: `3px solid ${level.bg}`,
                borderLeft: `5px solid ${level.color}`,
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                gap: '1.2rem',
                textAlign: 'left',
                width: '100%',
                minHeight: '80px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translateY(2px)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
              }}
            >
              <div style={{
                background: level.color,
                color: '#fff',
                borderRadius: '14px',
                width: '56px',
                height: '56px',
                minWidth: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 900
              }}>
                {level.num}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#3C3C3C', marginBottom: '4px' }}>
                  {level.title}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#AFAFAF', lineHeight: 1.3 }}>
                  {level.desc}
                </div>
              </div>
              <div style={{ fontSize: '1.5rem', color: '#AFAFAF' }}>›</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
