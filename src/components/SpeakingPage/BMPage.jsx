import React, { useState } from 'react';
import './BMPage.css';
import { LOCALIZATION } from '../../utils/localization';
import { useGameStateContext } from '../../App';
import SpeechManager from '../../services/SpeechManager';
import BMSpeakGame from './BMSpeakGame';
import AppHeader from '../AppHeader';

// ── SVG Illustrations ──────────────────────────────────────────────────────

const KvIllo = () => (
  <svg viewBox="0 0 200 160">
    <ellipse cx="100" cy="150" rx="76" ry="7" fill="rgba(0,0,0,.22)"/>
    <g className="float-a">
      <g transform="translate(8 26) rotate(-10 35 35)">
        <rect width="70" height="70" rx="14" fill="#fff" stroke="#06628A" strokeWidth="3.5"/>
        <rect x="6" y="6" width="58" height="12" rx="6" fill="rgba(28,176,246,.25)"/>
        <text x="35" y="48" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="34" fill="#06628A">ba</text>
      </g>
    </g>
    <g className="float-b">
      <g transform="translate(66 12) rotate(6 36 36)">
        <rect width="72" height="72" rx="14" fill="#FFD60A" stroke="#06628A" strokeWidth="3.5"/>
        <rect x="6" y="6" width="60" height="12" rx="6" fill="rgba(255,255,255,.5)"/>
        <text x="36" y="50" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="34" fill="#06628A">bi</text>
      </g>
    </g>
    <g className="float-c">
      <g transform="translate(124 30) rotate(-6 34 34)">
        <rect width="68" height="68" rx="14" fill="#FF1F7A" stroke="#06628A" strokeWidth="3.5"/>
        <rect x="6" y="6" width="56" height="12" rx="6" fill="rgba(255,255,255,.5)"/>
        <text x="34" y="46" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="32" fill="#fff">bu</text>
      </g>
    </g>
  </svg>
);

const KvkIllo = () => (
  <svg viewBox="0 0 200 160">
    <ellipse cx="100" cy="150" rx="76" ry="7" fill="rgba(0,0,0,.22)"/>
    <g className="wobble">
      <g transform="translate(20 30) rotate(-4 80 30)">
        <rect width="160" height="60" rx="30" fill="#fff" stroke="#5B2A8A" strokeWidth="3.5"/>
        <text x="80" y="42" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="36" fill="#5B2A8A">ban</text>
        <circle cx="14" cy="14" r="3" fill="#FFD60A"/>
        <circle cx="146" cy="46" r="3" fill="#FF1F7A"/>
      </g>
    </g>
    <g className="float-b">
      <g transform="translate(48 88) rotate(3 50 22)">
        <rect width="100" height="44" rx="22" fill="#FFD60A" stroke="#5B2A8A" strokeWidth="3"/>
        <text x="50" y="32" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="26" fill="#5B2A8A">bin</text>
      </g>
    </g>
  </svg>
);

const PhonicsIllo = () => (
  <svg viewBox="0 0 200 160">
    <ellipse cx="100" cy="152" rx="76" ry="7" fill="rgba(0,0,0,.22)"/>
    <g className="float-a">
      <g transform="translate(14 16) rotate(-8 38 38)">
        <rect width="76" height="76" rx="16" fill="#fff" stroke="#8C0438" strokeWidth="3.5"/>
        <text x="38" y="58" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="56" fill="#8C0438">A</text>
        <text x="38" y="72" textAnchor="middle" fontFamily="'Nunito',sans-serif" fontWeight="700" fontSize="9" fill="#8C0438">/eɪ/</text>
      </g>
    </g>
    <g className="float-b">
      <g transform="translate(74 24) rotate(4 36 36)">
        <rect width="72" height="72" rx="14" fill="#FF1F7A" stroke="#8C0438" strokeWidth="3.5"/>
        <text x="36" y="54" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="52" fill="#fff">B</text>
        <text x="36" y="66" textAnchor="middle" fontFamily="'Nunito',sans-serif" fontWeight="700" fontSize="8" fill="#fff">/biː/</text>
      </g>
    </g>
    <g className="float-c">
      <g transform="translate(124 30) rotate(-5 34 34)">
        <rect width="68" height="68" rx="14" fill="#FFD60A" stroke="#8C0438" strokeWidth="3.5"/>
        <text x="34" y="52" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="48" fill="#8C0438">C</text>
        <text x="34" y="62" textAnchor="middle" fontFamily="'Nunito',sans-serif" fontWeight="700" fontSize="8" fill="#8C0438">/siː/</text>
      </g>
    </g>
  </svg>
);

const NumbersIllo = () => (
  <svg viewBox="0 0 200 160">
    <ellipse cx="100" cy="150" rx="76" ry="7" fill="rgba(0,0,0,.22)"/>
    <g className="float-a">
      <g transform="translate(10 22) rotate(-8 32 32)">
        <rect width="64" height="64" rx="14" fill="#fff" stroke="#8C5D00" strokeWidth="3.5"/>
        <text x="32" y="48" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="42" fill="#8C5D00">1</text>
      </g>
    </g>
    <g className="float-b">
      <g transform="translate(58 12) rotate(5 32 32)">
        <rect width="64" height="64" rx="14" fill="#1CB0F6" stroke="#8C5D00" strokeWidth="3.5"/>
        <text x="32" y="48" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="42" fill="#fff">2</text>
      </g>
    </g>
    <g className="float-c">
      <g transform="translate(106 18) rotate(-4 32 32)">
        <rect width="64" height="64" rx="14" fill="#FF1F7A" stroke="#8C5D00" strokeWidth="3.5"/>
        <text x="32" y="48" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="42" fill="#fff">3</text>
      </g>
    </g>
    <g transform="translate(140 96)">
      <ellipse cx="0" cy="0" rx="34" ry="22" fill="#FFD60A" stroke="#8C5D00" strokeWidth="3"/>
      <text textAnchor="middle" dominantBaseline="central" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="22" fill="#8C5D00">100</text>
    </g>
    <circle cx="40" cy="116" r="3" fill="#fff"/>
    <circle cx="56" cy="120" r="3" fill="#fff"/>
    <circle cx="72" cy="124" r="3" fill="#fff"/>
    <circle cx="88" cy="120" r="3" fill="#fff"/>
  </svg>
);

const ObjectsIllo = () => (
  <svg viewBox="0 0 200 160">
    <ellipse cx="100" cy="152" rx="80" ry="6" fill="rgba(0,0,0,.22)"/>

    {/* CAT (left, big) */}
    <g className="float-a">
      <g transform="translate(2 16)">
        <path d="M10 30 L22 6 L34 30 Z" fill="#fff" stroke="#0B5C44" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M58 30 L70 6 L82 30 Z" fill="#fff" stroke="#0B5C44" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M16 26 L22 14 L28 26 Z" fill="#FF9DA8"/>
        <path d="M64 26 L70 14 L76 26 Z" fill="#FF9DA8"/>
        <circle cx="46" cy="46" r="32" fill="#fff" stroke="#0B5C44" strokeWidth="3.5"/>
        <circle cx="32" cy="56" r="5" fill="#FFB5C8" opacity=".8"/>
        <circle cx="60" cy="56" r="5" fill="#FFB5C8" opacity=".8"/>
        <ellipse cx="34" cy="42" rx="5" ry="6" fill="#fff" stroke="#0B5C44" strokeWidth="2"/>
        <ellipse cx="58" cy="42" rx="5" ry="6" fill="#fff" stroke="#0B5C44" strokeWidth="2"/>
        <ellipse cx="34" cy="44" rx="2.5" ry="3.5" fill="#0B5C44"/>
        <ellipse cx="58" cy="44" rx="2.5" ry="3.5" fill="#0B5C44"/>
        <circle cx="35" cy="42" r="1.2" fill="#fff"/>
        <circle cx="59" cy="42" r="1.2" fill="#fff"/>
        <path d="M41 54 l5 6 l5 -6 z" fill="#FF6B9D" stroke="#0B5C44" strokeWidth="2" strokeLinejoin="round"/>
        <line x1="6" y1="50" x2="22" y2="52" stroke="#0B5C44" strokeWidth="2" strokeLinecap="round"/>
        <line x1="6" y1="56" x2="22" y2="56" stroke="#0B5C44" strokeWidth="2" strokeLinecap="round"/>
        <line x1="70" y1="52" x2="86" y2="50" stroke="#0B5C44" strokeWidth="2" strokeLinecap="round"/>
        <line x1="70" y1="56" x2="86" y2="56" stroke="#0B5C44" strokeWidth="2" strokeLinecap="round"/>
        <path d="M46 60 v3" stroke="#0B5C44" strokeWidth="2" strokeLinecap="round"/>
        <path d="M38 64 q8 8 16 0" stroke="#0B5C44" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      </g>
    </g>

    {/* FLOWER (top-right, big) */}
    <g className="float-b">
      <g transform="translate(106 4)">
        <g stroke="#0B5C44" strokeWidth="2.8" strokeLinejoin="round">
          <ellipse cx="36" cy="14" rx="11" ry="14" fill="#FF6B9D"/>
          <ellipse cx="58" cy="36" rx="14" ry="11" fill="#FF6B9D"/>
          <ellipse cx="36" cy="58" rx="11" ry="14" fill="#FF6B9D"/>
          <ellipse cx="14" cy="36" rx="14" ry="11" fill="#FF6B9D"/>
        </g>
        <circle cx="36" cy="36" r="13" fill="#FFD60A" stroke="#0B5C44" strokeWidth="3"/>
        <circle cx="32" cy="34" r="1.6" fill="#0B5C44"/>
        <circle cx="40" cy="34" r="1.6" fill="#0B5C44"/>
        <path d="M31 38 q5 4 10 0" stroke="#0B5C44" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        <path d="M36 72 q-4 22 2 44" stroke="#16A87A" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <path d="M37 92 q14 -4 22 8 q-14 4 -22 -8 z" fill="#16A87A" stroke="#0B5C44" strokeWidth="2.4"/>
      </g>
    </g>

    {/* CUP (bottom-center, big) */}
    <g className="float-c">
      <g transform="translate(56 100)">
        <path d="M20 -8 q4 -8 -2 -16 q4 -4 0 -10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".95"/>
        <path d="M38 -8 q4 -8 -2 -16 q4 -4 0 -10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".95"/>
        <path d="M56 -8 q4 -8 -2 -16 q4 -4 0 -10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".95"/>
        <path d="M76 8 q22 6 0 30" stroke="#0B5C44" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <path d="M4 8 h74 v22 q0 16 -37 16 t-37 -16 V8 Z" fill="#1CB0F6" stroke="#0B5C44" strokeWidth="3.5" strokeLinejoin="round"/>
        <ellipse cx="41" cy="8" rx="38" ry="5" fill="#9EE2FF" stroke="#0B5C44" strokeWidth="3"/>
        <ellipse cx="41" cy="8" rx="32" ry="3.5" fill="#8B5A3C"/>
        <path d="M4 18 h74" stroke="#fff" strokeWidth="2" opacity=".55"/>
        <circle cx="32" cy="26" r="2" fill="#0B5C44"/>
        <circle cx="50" cy="26" r="2" fill="#0B5C44"/>
        <path d="M30 32 q11 6 22 0" stroke="#0B5C44" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      </g>
    </g>
  </svg>
);

const ILLOS = {
  bm_kv: <KvIllo />,
  bm_kvk: <KvkIllo />,
  en_long_vowels: <PhonicsIllo />,
  numbers: <NumbersIllo />,
  common_objects: <ObjectsIllo />,
};

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
    num: 1,
    tClass: 'cat-kv',
    titleKey: 'bm_kv',
  },
  {
    key: 'bm_kvk',
    num: 2,
    tClass: 'cat-kvk',
    titleKey: 'bm_kvk',
  },
  {
    key: 'en_long_vowels',
    num: 3,
    tClass: 'cat-phonics',
    titleKey: 'en_long_vowels',
  },
  {
    key: 'numbers',
    num: 4,
    tClass: 'cat-numbers',
    titleKey: 'numbers',
  },
  {
    key: 'common_objects',
    num: 5,
    tClass: 'cat-objects',
    titleKey: 'common_objects',
  },
];

export default function BMPage({ onBack, onHome, language }) {
  const t = LOCALIZATION[language].bmPage;
  const gameState = useGameStateContext();

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
      <AppHeader onBack={onBack} gameState={gameState} language={language} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 80px' }}>
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
        <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: '13px', letterSpacing: '0.16em', color: '#6B7280', margin: '6px 4px 28px', textTransform: 'uppercase' }}>
          {language === 'bm' ? 'PILIH KATEGORI' : 'CHOOSE CATEGORY'}
        </div>

        {/* Category Tiles Grid */}
        <div className="bp-grid">
          {CATEGORIES.map((cat) => {
            const categoryData = t.categories[cat.titleKey];
            return (
              <button
                key={cat.key}
                className={`bp-tile ${cat.tClass}`}
                onClick={() => isSupported && setSelectedCategory(cat.key)}
                disabled={!isSupported}
                type="button"
                style={{ opacity: !isSupported ? 0.5 : 1 }}
              >
                {/* Number badge */}
                <span className="bp-tile-num">{cat.num}</span>

                {/* Microphone badge */}
                <span className="bp-tile-mic" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1A7 7 0 0 0 19 11h-2Z"/>
                  </svg>
                </span>

                {/* Hover sparkles */}
                <span className="bp-spark s1" style={{ top: '24%', left: '14%' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
                    <path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/>
                  </svg>
                </span>
                <span className="bp-spark s2" style={{ top: '30%', right: '14%' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </span>

                {/* SVG illustration */}
                <div className="bp-illo">{ILLOS[cat.key]}</div>

                {/* Bottom white plate */}
                <div className="bp-plate">
                  <span className="bp-plate-title">
                    {categoryData?.title}
                    <small>{categoryData?.desc}</small>
                  </span>
                  <div className="bp-plate-row">
                    <div className="bp-go">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 6l6 6-6 6"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* How to play */}
        <div className="bm-howto">
          <div className="bm-howto-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFB300" aria-hidden="true">
              <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/>
            </svg>
            {t.howToPlayTitle}
          </div>
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
