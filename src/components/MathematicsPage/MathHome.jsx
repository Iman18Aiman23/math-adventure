import React from 'react';
import './MathHome.css';
import { LOCALIZATION } from '../../utils/localization';
import { useGameStateContext } from '../../App';
import AppHeader from '../AppHeader';

// ── SVG Illustrations ──────────────────────────────────────────────────────

const OperationsIllo = () => (
  <div style={{ width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg viewBox="0 0 100 100" fill="none" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="50" cy="96" rx="30" ry="4" fill="rgba(0,0,0,.18)"/>
      <rect x="18" y="6" width="64" height="84" rx="10" fill="#fff" stroke="#2E6B00" strokeWidth="3"/>
      <rect x="24" y="12" width="52" height="20" rx="4" fill="#E6FFD4" stroke="#2E6B00" strokeWidth="2"/>
      <text x="70" y="28" textAnchor="end" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="14" fill="#2E6B00">123</text>
      <g stroke="#2E6B00" strokeWidth="2">
        <rect x="26" y="40" width="12" height="10" rx="2" fill="#fff"/>
        <rect x="44" y="40" width="12" height="10" rx="2" fill="#fff"/>
        <rect x="62" y="40" width="12" height="10" rx="2" fill="#fff"/>
        <rect x="26" y="54" width="12" height="10" rx="2" fill="#fff"/>
        <rect x="44" y="54" width="12" height="10" rx="2" fill="#fff"/>
        <rect x="62" y="54" width="12" height="10" rx="2" fill="#FFC800"/>
        <rect x="26" y="68" width="12" height="10" rx="2" fill="#fff"/>
        <rect x="44" y="68" width="12" height="10" rx="2" fill="#fff"/>
        <rect x="62" y="68" width="12" height="10" rx="2" fill="#FF7A00"/>
      </g>
      <text x="10" y="22" fontFamily="'Baloo 2'" fontWeight="800" fontSize="16" fill="#2E6B00">+</text>
      <text x="86" y="86" fontFamily="'Baloo 2'" fontWeight="800" fontSize="16" fill="#2E6B00">÷</text>
    </svg>
  </div>
);

const FaqIllo = () => (
  <div style={{ width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg viewBox="0 0 100 100" fill="none" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="bubO2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF"/>
          <stop offset="1" stopColor="#FFE2A6"/>
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="96" rx="30" ry="4" fill="rgba(0,0,0,.2)"/>
      <path d="M10 18a8 8 0 0 1 8-8h64a8 8 0 0 1 8 8v44a8 8 0 0 1-8 8H58l-14 14V70H18a8 8 0 0 1-8-8z"
            fill="url(#bubO2)" stroke="#8F5300" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M38 30c0-7 5-12 12-12s12 5 12 12c0 6-5 9-8 11-2 2-3 3-3 6" stroke="#FF9600" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <circle cx="51" cy="56" r="4.5" fill="#FF9600"/>
      <path d="M22 18h28" stroke="rgba(255,255,255,.85)" strokeWidth="3" strokeLinecap="round"/>
    </svg>
  </div>
);

const DatetimeIllo = () => (
  <div style={{ width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <svg viewBox="0 0 100 100" fill="none" style={{ width: '100%', height: '100%' }}>
      <ellipse cx="50" cy="96" rx="32" ry="3" fill="rgba(0,0,0,.2)"/>
      <defs>
        <linearGradient id="clockB2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff"/>
          <stop offset=".55" stopColor="#9EE2FF"/>
          <stop offset="1" stopColor="#1CB0F6"/>
        </linearGradient>
        <radialGradient id="clockF2" cx=".4" cy=".35" r=".75">
          <stop offset="0" stopColor="#FFFFFF"/>
          <stop offset=".7" stopColor="#E6F6FF"/>
          <stop offset="1" stopColor="#9EE2FF"/>
        </radialGradient>
      </defs>
      <rect x="44" y="4" width="12" height="8" rx="2" fill="#06628A"/>
      <path d="M22 22c-6-6-2-14 6-14M78 22c6-6 2-14-6-14" stroke="#06628A" strokeWidth="5" fill="none" strokeLinecap="round"/>
      <circle cx="50" cy="54" r="38" fill="url(#clockB2)" stroke="#06628A" strokeWidth="3.5"/>
      <circle cx="50" cy="54" r="28" fill="url(#clockF2)" stroke="#06628A" strokeWidth="2.5"/>
      <g stroke="#06628A" strokeWidth="2" strokeLinecap="round">
        <path d="M50 30v4M50 74v4M26 54h4M70 54h4"/>
      </g>
      <text x="50" y="40" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="9" fill="#06628A">12</text>
      <text x="64" y="58" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="9" fill="#06628A">3</text>
      <text x="50" y="74" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="9" fill="#06628A">6</text>
      <text x="36" y="58" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="9" fill="#06628A">9</text>
      <path d="M50 54l0-14" stroke="#06628A" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M50 54l12 4" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="50" cy="54" r="3" fill="#06628A"/>
      <path d="M28 88l6-6M72 88l-6-6" stroke="#06628A" strokeWidth="5" strokeLinecap="round"/>
    </svg>
  </div>
);

// ── Illustration map ──────────────────────────────────────────────────────

const ILLOS = {
  operations: <OperationsIllo />,
  faq:        <FaqIllo />,
  datetime:   <DatetimeIllo />,
};

// ── Game config ───────────────────────────────────────────────────────────

const SUB_GAMES = [
  {
    id: 'operations',
    tClass: 't-green',
    titleKey: 'opsTitle',
    descKey: 'opsDesc',
    starFill: '#FFE066',
  },
  {
    id: 'faq',
    tClass: 't-orange',
    title: { bm: 'Soalan Lazim', eng: 'FAQ' },
    desc: { bm: 'Soalan & jawapan lazim', eng: 'Frequently asked questions' },
    starFill: '#FFE066',
  },
  {
    id: 'datetime',
    tClass: 't-sky',
    titleKey: 'timeTitle',
    descKey: 'timeDesc',
    starFill: '#fff',
  },
];

// ── Main component ────────────────────────────────────────────────────────

export default function MathHome({ onSelectSubGame, onBack, onHome, language }) {
  const t = LOCALIZATION[language].math;
  const gameState = useGameStateContext();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
      <AppHeader onBack={onBack} gameState={gameState} language={language} />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 80px' }}>
        <div className="bm-hero">
          <div className="bm-hero-emoji">🔢</div>
          <h2 className="bm-hero-title">{language === 'bm' ? 'Kuasai Matematik' : 'Master Mathematics'}</h2>
          <p className="bm-hero-subtitle">{language === 'bm' ? 'Dari operasi asas hingga penyelesaian masalah. Belajar dengan percaya diri!' : 'From basic operations to problem solving. Learn with confidence!'}</p>
        </div>

        <div style={{ fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, fontSize: '13px', letterSpacing: '0.16em', color: '#6B7280', margin: '6px 4px 28px', textTransform: 'uppercase' }}>
          {language === 'bm' ? 'PILIH TOPIK' : 'CHOOSE TOPIC'}
        </div>

        {/* Tile grid */}
        <div className="mh-grid">
          {SUB_GAMES.map((game) => {
            const title = game.titleKey ? t[game.titleKey] : (game.title[language] || game.title.bm);
            const desc = game.descKey ? t[game.descKey] : (game.desc[language] || game.desc.bm);

            return (
              <button
                key={game.id}
                className={`mh-tile ${game.tClass}`}
                onClick={() => onSelectSubGame(game.id)}
                type="button"
              >
                {/* Spinning star badge (top-right) */}
                <svg className="mh-badge-corner" width="40" height="40" viewBox="0 0 24 24" fill={game.starFill}>
                  <path d="M12 2l2.6 6.4L21 9l-5 4.4L17.4 20 12 16.7 6.6 20 8 13.4 3 9l6.4-.6L12 2z"/>
                </svg>

                {/* Hover sparkles */}
                <span className="mh-spark s1" style={{ top: '24%', left: '14%' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFF">
                    <path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/>
                  </svg>
                </span>
                <span className="mh-spark s2" style={{ top: '30%', right: '14%' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </span>
                <span className="mh-spark s3" style={{ bottom: '38%', right: '14%' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,.7)">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </span>

                {/* SVG illustration */}
                <div className="mh-illo">{ILLOS[game.id]}</div>

                {/* Bottom white plate */}
                <div className="mh-plate">
                  <div className="mh-plate-content">
                    <div className="mh-plate-title">{title}</div>
                    <div className="mh-plate-desc">{desc}</div>
                  </div>
                  <div className="mh-plate-row">
                    <div className="mh-go">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                        <path d="M8 5.5v13a.6.6 0 0 0 .9.5l11.5-6.5a.6.6 0 0 0 0-1L8.9 5a.6.6 0 0 0-.9.5Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
