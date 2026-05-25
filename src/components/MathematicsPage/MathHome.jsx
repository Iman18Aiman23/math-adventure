import React from 'react';
import './MathHome.css';
import { LOCALIZATION } from '../../utils/localization';
import { useGameStateContext } from '../../App';
import PageLayout from '../PageLayout';
import { CalculatorIcon } from '../icons/GameIcons';
import {
  MathOperationIcon,
  MathLongMethodIcon,
  ClockAndTimeIcon,
} from '../icons/LearningIcons';

const ILLOS = {
  operations: <MathOperationIcon size={200} />,
  faq:        <MathLongMethodIcon size={200} />,
  datetime:   <ClockAndTimeIcon size={200} />,
};

// ── Game config ───────────────────────────────────────────────────────────

const SUB_GAMES = [
  {
    id: 'operations',
    num: 1,
    tClass: 't-green',
    titleKey: 'opsTitle',
  },
  {
    id: 'faq',
    num: 2,
    tClass: 't-orange',
    title: { bm: 'Soalan Lazim', eng: 'FAQ' },
  },
  {
    id: 'datetime',
    num: 3,
    tClass: 't-sky',
    titleKey: 'timeTitle',
  },
];

// ── Main component ────────────────────────────────────────────────────────

export default function MathHome({ onSelectSubGame, onBack, onHome, language }) {
  const t = LOCALIZATION[language].math;
  const gameState = useGameStateContext();

  const heroSubtitle = (
    <>
      {language === 'bm' ? 'Dari operasi asas hingga penyelesaian masalah. Belajar dengan percaya diri!' : 'From basic operations to problem solving. Learn with confidence!'}
      <span aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
      </span>
    </>
  );

  const hintContent = (
    <>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
      {language === 'bm' ? 'Pilih topik untuk mula belajar!' : 'Pick a topic to start learning!'}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF1F7A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
    </>
  );

  const gridTiles = SUB_GAMES.map((game) => (
    <button
      key={game.id}
      className={`mh-icon-card ${game.tClass}`}
      onClick={() => onSelectSubGame(game.id)}
      type="button"
    >
      {ILLOS[game.id]}
    </button>
  ));

  return (
    <PageLayout
      classPrefix="mh"
      heroIcon={<CalculatorIcon size={96} />}
      heroSubtitle={heroSubtitle}
      sectionLabel={language === 'bm' ? 'Pilih Topik' : 'Choose Topic'}
      hintText={hintContent}
      onBack={onBack}
    >
      {gridTiles}
    </PageLayout>
  );
}
