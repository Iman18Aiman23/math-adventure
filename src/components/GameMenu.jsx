import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { LOCALIZATION } from '../utils/localization';
import SagaMap from './SagaMap';

export default function GameMenu({ onStart, isMuted, onToggleMute, onBack, onHome, language }) {
  const allNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleSelectLevel = (op, diff) => {
    const selectedNumbers = (op === 'multiply' || op === 'divide') ? allNumbers : [];
    onStart(op, diff, selectedNumbers, 'multiple');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
      {/* Sub-header */}
      <div style={{
        background: '#fff',
        borderBottom: '2px solid #E5E5E5',
        padding: '0 1rem',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexShrink: 0,
      }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
          <ArrowLeft size={24} />
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C' }}>
          {language === 'bm' ? 'Peta Matematik' : 'Math Map'}
        </div>
        <div style={{ width: 24 }} />
      </div>

      {/* Saga Map fills the rest */}
      <SagaMap onSelectLevel={handleSelectLevel} />
    </div>
  );
}
