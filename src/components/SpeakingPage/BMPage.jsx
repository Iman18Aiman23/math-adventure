import React, { useState } from 'react';
import './BMPage.css';
import { LOCALIZATION } from '../../utils/localization';
import { useGameStateContext } from '../../App';
import SpeechManager from '../../services/SpeechManager';
import BMSpeakGame from './BMSpeakGame';
import PageLayout from '../PageLayout';
import { MusicNoteIcon } from '../icons/GameIcons';
import { RobotDefs, RobotHeadSpeaking } from '../SubjectRobots';
import {
  LearnKVWordsIcon,
  LearnKVKWordsIcon,
  EnglishPhonicsIcon,
  Number1to100Icon,
  ObjectsIcon,
} from '../icons/LearningIcons';
const ILLOS = {
  bm_kv: <LearnKVWordsIcon size={200} />,
  bm_kvk: <LearnKVKWordsIcon size={200} />,
  en_long_vowels: <EnglishPhonicsIcon size={200} />,
  numbers: <Number1to100Icon size={200} />,
  common_objects: <ObjectsIcon size={200} />,
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
  const heroSubtitle = (
    <>
      {t.heroSubtitle}
      <span aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
      </span>
    </>
  );

  const hintContent = (
    <>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
      {language === 'bm' ? 'Pilih kategori untuk mula bercakap!' : 'Pick a category to start speaking!'}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF1F7A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
    </>
  );

  const gridContent = (
    <>
      {!isSupported && (
        <div className="bm-warning-card">
          <span style={{ fontSize: '1.5rem' }}>⚠️</span>
          <p>{unsupportedReason || t.notSupported}</p>
        </div>
      )}
      {CATEGORIES.map((cat) => (
        <button
          key={cat.key}
          className={`bp-icon-card ${cat.tClass}`}
          onClick={() => isSupported && setSelectedCategory(cat.key)}
          disabled={!isSupported}
          type="button"
          style={{ opacity: !isSupported ? 0.5 : 1 }}
        >
          {ILLOS[cat.key]}
        </button>
      ))}
    </>
  );

  const additionalSection = (
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
  );

  return (
    <>
      <RobotDefs />
      <PageLayout
        classPrefix="bp"
        heroIcon={<RobotHeadSpeaking style={{ width: 140, height: 100 }} />}
        heroSubtitle={heroSubtitle}
        sectionLabel={language === 'bm' ? 'Pilih Kategori' : 'Choose Category'}
        hintText={hintContent}
        onBack={onBack}
        additionalSection={additionalSection}
      >
        {gridContent}
      </PageLayout>
    </>
  );
}
