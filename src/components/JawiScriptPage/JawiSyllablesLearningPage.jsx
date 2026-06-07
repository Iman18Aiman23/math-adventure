import React from 'react';
import { LOCALIZATION } from '../../utils/localization';
import BackButton from '../BackButton';

export default function JawiSyllablesLearningPage({ onBack, onHome, language }) {
  const t = LOCALIZATION[language].jawi;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
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
      </div>
    </div>
  );
}
