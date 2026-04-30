import React, { useState, useEffect } from 'react';
import { LOCALIZATION } from '../utils/localization';
import { useGameStateContext } from '../App';
import SpeechManager from '../services/SpeechManager';
import BMSpeakGame from './BMSpeakGame';

/**
 * BMPage — Bahasa Melayu Speak & Play
 *
 * Two views:
 * 1. Category Selection (React) — Duolingo flat-card menu
 * 2. BMSpeakGame (pure React) — Instant load, no Phaser/canvas
 */

const CATEGORIES = [
  {
    key: 'bm_kv',
    emoji: '🗣️',
    color: '#0EA5E9',
    gradient: 'linear-gradient(135deg, #0EA5E9, #38bdf8)',
  },
  {
    key: 'bm_kvk',
    emoji: '🔤',
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, #7C3AED, #a78bfa)',
  },
  {
    key: 'en_long_vowels',
    emoji: '📖',
    color: '#F43F5E',
    gradient: 'linear-gradient(135deg, #F43F5E, #fb7185)',
  },
  {
    key: 'numbers',
    emoji: '🔢',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #fbbf24)',
  },
  {
    key: 'common_objects',
    emoji: '🎯',
    color: '#10B981',
    gradient: 'linear-gradient(135deg, #10B981, #34d399)',
  },
];

export default function BMPage({ onBack, onHome, language }) {
  const t = LOCALIZATION[language].bmPage;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const isSupported = SpeechManager.isSupported();
  const unsupportedReason = SpeechManager.getUnsupportedReason();

  // ── Game View ──────────────────────────────────────────────────────────────
  if (selectedCategory) {
    return (
      <BMSpeakGame
        category={selectedCategory}
        language={language}
        onBack={() => setSelectedCategory(null)}
      />
    );
  }

  // ── Category Selection ─────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
      {/* Sub-header */}
      <div style={{
        background: '#fff', borderBottom: '2px solid #E5E5E5',
        padding: '0 1rem', height: '56px',
        display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0,
      }}>
        <button onClick={onBack} style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center', fontSize: '1.3rem' }}>
          ←
        </button>
        <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C' }}>
          🗣️ {t.title}
        </div>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {/* Hero */}
        <div className="bm-hero">
          <div className="bm-hero-emoji">🎤</div>
          <h2 className="bm-hero-title">{t.heroTitle}</h2>
          <p className="bm-hero-subtitle">{t.heroSubtitle}</p>
        </div>

        {/* Browser / mic warnings */}
        {!isSupported && (
          <div className="bm-warning-card">
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            <p>{unsupportedReason || t.notSupported}</p>
          </div>
        )}

        {/* Section label */}
        <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 1rem 0.5rem' }}>
          {language === 'bm' ? 'PILIH KATEGORI' : 'CHOOSE CATEGORY'}
        </p>

        <div className="bm-category-grid">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.key}
              className="bm-category-card fade-in"
              style={{
                '--card-gradient': cat.gradient,
                '--card-color': cat.color,
                animationDelay: `${i * 0.06}s`,
                opacity: !isSupported ? 0.5 : 1,
              }}
              onClick={() => isSupported && setSelectedCategory(cat.key)}
              disabled={!isSupported}
            >
              <span className="bm-cat-emoji" style={{ background: cat.gradient }}>{cat.emoji}</span>
              <div className="bm-cat-info">
                <span className="bm-cat-title">{t.categories[cat.key]?.title}</span>
                <span className="bm-cat-desc">{t.categories[cat.key]?.desc}</span>
              </div>
              <span className="bm-cat-arrow">›</span>
            </button>
          ))}
        </div>

        {/* How to play */}
        <div className="bm-howto">
          <div className="bm-howto-title">{t.howToPlayTitle}</div>
          <div className="bm-howto-steps">
            <div className="bm-howto-step"><span className="bm-step-num">1</span><span>{t.howToStep1}</span></div>
            <div className="bm-howto-step"><span className="bm-step-num">2</span><span>{t.howToStep2}</span></div>
            <div className="bm-howto-step"><span className="bm-step-num">3</span><span>{t.howToStep3}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
