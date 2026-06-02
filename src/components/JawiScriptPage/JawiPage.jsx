import React, { useState, useMemo } from 'react';
import './JawiPage.css';
import { LOCALIZATION } from '../../utils/localization';
import { useGameStateContext } from '../../App';

import JawiMatchGame from './JawiMatchGame';
import JawiSyllablesLearningPage from './JawiSyllablesLearningPage';
import Jawi100WordsGame from './Jawi100WordsGame';
import JawiShortStoriesPage from './JawiShortStoriesPage';
import IqraPage from './IqraPage';
import PageLayout from '../PageLayout';
import { QuranIcon } from '../icons/GameIcons';
import { RobotDefs, RobotHeadArabic } from '../SubjectRobots';
import {
  JawiWordsIcon,
  SpellingIcon,
  JawiStoriesIcon,
  JawiGameIcon,
  IqraIcon,
} from '../icons/LearningIcons';
const ILLOS = {
    syllables:     <JawiWordsIcon size={200} />,
    spelling_game: <SpellingIcon size={200} />,
    short_stories: <JawiStoriesIcon size={200} />,
    match:         <JawiGameIcon size={200} />,
    iqra:          <IqraIcon size={200} />,
};

// ── Main component ───────────────────────────────────────────────────────────
export default function JawiPage({ onBack, onHome, language, onGameStart, onGameEnd }) {
    const t = LOCALIZATION[language].jawi;
    const gameState = useGameStateContext();
    const [mode, setMode] = useState(null);

    // ── Activities list (memoised — only recalculates when language changes) ─
    // NOTE: must be declared BEFORE any conditional returns to satisfy Rules of Hooks
    const activities = useMemo(() => [
        { mode: 'syllables',     num: 1, tClass: 't-syllables', capTitle: language === 'bm' ? 'Suku Kata' : 'Syllables' },
        { mode: 'spelling_game', num: 2, tClass: 't-spelling',  capTitle: language === 'bm' ? 'Ejaan'     : 'Spelling'  },
        { mode: 'short_stories', num: 4, tClass: 't-stories',   capTitle: language === 'bm' ? 'Cerita'    : 'Stories'   },
        { mode: 'match',         num: 5, tClass: 't-match',     capTitle: language === 'bm' ? 'Padanan'   : 'Match'     },
        { mode: 'iqra',          num: 6, tClass: 't-iqra',      capTitle: language === 'bm' ? 'Iqra 1-6'  : 'Iqra 1-6'  },
    ], [language]);

    // ── Handlers ────────────────────────────────────────────────────────────
    const handleGameModeChange = (newMode) => {
        const gameModesWithSidebar = ['match', 'spelling_game', 'syllables'];
        if (gameModesWithSidebar.includes(newMode)) onGameStart?.();
        setMode(newMode);
    };

    const handleBackFromGame = () => {
        const gameModesWithSidebar = ['match', 'spelling_game', 'syllables'];
        if (gameModesWithSidebar.includes(mode)) onGameEnd?.();
        if (['match','syllables','spelling_game','short_stories','iqra'].includes(mode)) {
            setMode(null);
        } else {
            onBack();
        }
    };

    // ── Sub-page routes ─────────────────────────────────────────────────────
    if (mode === 'match')         return <JawiMatchGame onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'syllables')     return <JawiSyllablesLearningPage onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'spelling_game') return <Jawi100WordsGame onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'short_stories') return <JawiShortStoriesPage onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'iqra')          return <IqraPage onBack={handleBackFromGame} language={language} />;

    const heroSubtitle = (
        <>
            {t.subtitle}
            <span aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
            </span>
        </>
    );

    const hintContent = (
        <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
            {t.comingSoon}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF1F7A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
        </>
    );

    const gridTiles = activities.map((item) => (
        <button
            key={item.mode}
            className={`jw-icon-card ${item.tClass}`}
            onClick={() => handleGameModeChange(item.mode)}
            type="button"
        >
            {ILLOS[item.mode]}
        </button>
    ));

    return (
        <>
            <RobotDefs />
            <PageLayout
                classPrefix="jw"
                heroIcon={<RobotHeadArabic style={{ width: 140, height: 100 }} />}
                heroSubtitle={heroSubtitle}
                sectionLabel={language === 'bm' ? 'Pilih Aktiviti' : 'Choose Activity'}
                hintText={hintContent}
                onBack={onBack}
            >
                {gridTiles}
            </PageLayout>
        </>
    );
}
