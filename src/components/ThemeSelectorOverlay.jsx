import React from 'react';

const SUBTHEMES = [
  { id: 'animals', icon: '🐘', name: 'Animals', nameMs: 'Haiwan', color: '#f43f5e', shadow: 'rgba(244,63,94,0.35)', grad: 'linear-gradient(135deg, #f43f5e, #fb7185)' },
  { id: 'plants', icon: '🌳', name: 'Plants', nameMs: 'Tumbuhan', color: '#10b981', shadow: 'rgba(16,185,129,0.35)', grad: 'linear-gradient(135deg, #10b981, #34d399)' },
  { id: 'weather', icon: '☀️', name: 'Weather', nameMs: 'Cuaca', color: '#f59e0b', shadow: 'rgba(245,158,11,0.35)', grad: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
  { id: 'landscape', icon: '⛰️', name: 'Landscapes', nameMs: 'Pemandangan', color: '#0ea5e9', shadow: 'rgba(14,165,233,0.35)', grad: 'linear-gradient(135deg, #0ea5e9, #38bdf8)' },
  { id: 'stationery', icon: '📝', name: 'Stationery', nameMs: 'Alat Tulis', color: '#8b5cf6', shadow: 'rgba(139,92,246,0.35)', grad: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
  { id: 'classroom', icon: '🏫', name: 'Classroom', nameMs: 'Bilik Darjah', color: '#ef4444', shadow: 'rgba(239,68,68,0.35)', grad: 'linear-gradient(135deg, #ef4444, #f87171)' },
  { id: 'subjects', icon: '📚', name: 'Subjects', nameMs: 'Mata Pelajaran', color: '#3b82f6', shadow: 'rgba(59,130,246,0.35)', grad: 'linear-gradient(135deg, #3b82f6, #60a5fa)' },
  { id: 'kitchen', icon: '🍳', name: 'Kitchen', nameMs: 'Dapur', color: '#f97316', shadow: 'rgba(249,115,22,0.35)', grad: 'linear-gradient(135deg, #f97316, #fb923c)' },
  { id: 'furniture', icon: '🛋️', name: 'Furniture', nameMs: 'Perabot', color: '#6366f1', shadow: 'rgba(99,102,241,0.35)', grad: 'linear-gradient(135deg, #6366f1, #818cf8)' },
  { id: 'household', icon: '🧹', name: 'Household', nameMs: 'Isi Rumah', color: '#14b8a6', shadow: 'rgba(20,184,166,0.35)', grad: 'linear-gradient(135deg, #14b8a6, #2dd4bf)' },
];

export default function ThemeSelectorOverlay({ visible, onClose, onSelect, language = 'bm' }) {
  if (!visible) return null;

  return (
    <div className="theme-overlay">
      <div className="theme-modal bounce-in">
        <div className="theme-modal-header">
          <h3 className="theme-modal-title">{language === 'bm' ? 'Pilih Topik' : 'Select Topic'}</h3>
          <button className="theme-close-btn" onClick={onClose} title="Close">✕</button>
        </div>
        
        <div className="theme-grid">
          {SUBTHEMES.map((theme, i) => (
            <button 
              key={theme.id}
              className="theme-card"
              style={{ 
                '--card-grad': theme.grad, 
                '--card-shadow': theme.shadow,
                animationDelay: `${i * 0.04}s`
              }}
              onClick={() => onSelect(theme.id)}
            >
              <div className="theme-card-content">
                <span className="theme-icon">{theme.icon}</span>
                <span className="theme-name">{language === 'bm' ? theme.nameMs : theme.name}</span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="theme-modal-footer">
          <button className="theme-all-btn" onClick={() => onSelect(null)}>
            {language === 'bm' ? 'Campur Semua Suku Kata' : 'Mix All Topics'}
          </button>
        </div>
      </div>
    </div>
  );
}
