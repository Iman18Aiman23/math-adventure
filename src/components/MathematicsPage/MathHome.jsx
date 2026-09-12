import React from 'react';
import './MathHome.css';
import BackButton from '../BackButton';
import { LOCALIZATION } from '../../utils/localization';
import {
  MathOperationIcon,
  MathLongMethodIcon,
  ClockAndTimeIcon,
} from '../icons/LearningIcons';

const SUB_GAMES = [
  {
    id: 'operations',
    className: 't-blue',
    titleKey: 'opsTitle',
    visual: <MathOperationIcon size={260} />,
  },
  {
    id: 'faq',
    className: 't-red',
    title: { bm: 'Math Long Method', eng: 'Math Long Method' },
    visual: <MathLongMethodIcon size={260} />,
  },
  {
    id: 'datetime',
    className: 't-cyan',
    title: { bm: 'Clock & Time', eng: 'Clock & Time' },
    visual: <ClockAndTimeIcon size={260} />,
  },
];

export default function MathHome({ onSelectSubGame, onBack, language = 'bm' }) {
  const t = LOCALIZATION[language].math;

  return (
    <main className="mh-screen" aria-label={t.hubTitle}>
      <BackButton onClick={onBack} />

      <section className="mh-hero" aria-label={t.hubTitle}>
        <div className="mh-brand" aria-label="Matematik">
          <span className="mh-brand-dot" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="3" fill="#fff" />
              <text x="12" y="15" textAnchor="middle" fontFamily="Fredoka,sans-serif" fontWeight="700" fontSize="13" fill="#0F9488">+</text>
            </svg>
          </span>
          <b className="mh-brand-text">
            Mate<span>matik</span>
          </b>
        </div>

        <p className="mh-hero-sub">
          <span>
            {language === 'bm'
              ? 'Dari operasi asas hingga penyelesaian masalah. Belajar dengan percaya diri!'
              : 'From basic operations to problem solving. Learn with confidence!'}
          </span>
          <svg className="mh-sub-star" width="22" height="22" viewBox="0 0 24 24" fill="#FFD60A" aria-hidden="true">
            <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
          </svg>
        </p>
      </section>

      <div className="mh-section-label">
        {language === 'bm' ? 'Pilih Topik' : 'Choose Topic'}
      </div>

      <section
        className={`mh-topic-grid mh-topic-grid--${SUB_GAMES.length}`}
        aria-label={language === 'bm' ? 'Pilih topik' : 'Choose topic'}
      >
        {SUB_GAMES.map((game) => {
          const title = game.titleKey ? t[game.titleKey] : game.title[language];

          return (
            <button
              key={game.id}
              className={`mh-topic-button ${game.className}`}
              type="button"
              onClick={() => onSelectSubGame(game.id)}
              aria-label={title}
            >
              {game.visual}
            </button>
          );
        })}
      </section>

      <footer className="mh-hint">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFD60A" aria-hidden="true">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
        <span>{language === 'bm' ? 'Pilih topik untuk mula belajar!' : 'Pick a topic to start learning!'}</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#FF1F7A" aria-hidden="true">
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
      </footer>
    </main>
  );
}
