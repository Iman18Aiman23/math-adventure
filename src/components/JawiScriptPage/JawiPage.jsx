import React, { useState, useMemo } from 'react';
import './JawiPage.css';
import { LOCALIZATION } from '../../utils/localization';
import { useGameStateContext } from '../../App';
import JawiAlphabetPage from './JawiAlphabetPage';
import JawiMatchGame from './JawiMatchGame';
import JawiWordsPage from './JawiWordsPage';
import JawiSyllablesLearningPage from './JawiSyllablesLearningPage';
import Jawi100WordsGame from './Jawi100WordsGame';
import JawiShortStoriesPage from './JawiShortStoriesPage';
import AppHeader from '../AppHeader';
import { QuranIcon } from '../icons/GameIcons';

// ── Tile SVG illustrations ───────────────────────────────────────────────────

const AlphabetIllo = () => (
    <svg viewBox="0 0 200 160">
        <ellipse cx="100" cy="148" rx="74" ry="7" fill="rgba(0,0,0,.22)" />
        <g className="float-a">
            <g transform="translate(6 26) rotate(-10 35 35)">
                <rect width="70" height="70" rx="14" fill="#fff" stroke="#5B2A8A" strokeWidth="3" />
                <rect x="6" y="6" width="58" height="12" rx="6" fill="rgba(157,78,221,.25)" />
                <text x="35" y="46" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="44" fill="#5B2A8A">ت</text>
            </g>
        </g>
        <g className="float-b">
            <g transform="translate(64 12) rotate(6 36 36)">
                <rect width="72" height="72" rx="14" fill="#FFD60A" stroke="#5B2A8A" strokeWidth="3" />
                <rect x="6" y="6" width="60" height="12" rx="6" fill="rgba(255,255,255,.5)" />
                <text x="36" y="48" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="44" fill="#5B2A8A">ب</text>
            </g>
        </g>
        <g className="float-c">
            <g transform="translate(124 30) rotate(-6 34 34)">
                <rect width="68" height="68" rx="14" fill="#FF1F7A" stroke="#5B2A8A" strokeWidth="3" />
                <rect x="6" y="6" width="56" height="12" rx="6" fill="rgba(255,255,255,.45)" />
                <text x="34" y="44" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="42" fill="#fff">ا</text>
            </g>
        </g>
    </svg>
);

const SyllablesIllo = () => (
    <svg viewBox="0 0 200 160">
        <ellipse cx="100" cy="150" rx="76" ry="7" fill="rgba(0,0,0,.22)" />
        <g className="wobble">
            <path d="M16 36c20-10 50-12 64 4v90c-14-12-44-10-64 0V36z" fill="#fff" stroke="#8C5D00" strokeWidth="3.4" strokeLinejoin="round" />
            <path d="M184 36c-20-10-50-12-64 4v90c14-12 44-10 64 0V36z" fill="#FFEFC2" stroke="#8C5D00" strokeWidth="3.4" strokeLinejoin="round" />
            <path d="M78 40v90M82 40v90" stroke="#8C5D00" strokeWidth="1.8" />
            <text x="48" y="68" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="24" fill="#8C5D00">با</text>
            <text x="48" y="100" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="24" fill="#8C5D00">تا</text>
            <text x="152" y="75" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="24" fill="#8C5D00">جا</text>
            <text x="152" y="100" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="24" fill="#8C5D00">دا</text>
        </g>
        <g className="float-a" transform="translate(108 84)">
            <rect width="76" height="44" rx="18" fill="#FF1F7A" stroke="#8C0438" strokeWidth="3" />
            <circle cx="18" cy="22" r="5" fill="#fff" />
            <circle cx="58" cy="16" r="5" fill="#FFD60A" />
            <circle cx="58" cy="28" r="5" fill="#00B8C9" />
            <rect x="14" y="20" width="8" height="3" rx="1.5" fill="#8C0438" />
            <rect x="17" y="17" width="3" height="8" rx="1.5" fill="#8C0438" />
        </g>
        <g className="spin-slow" transform="translate(154 18)">
            <path d="M0 0l3 8 8 1-6 6 2 8-7-4-7 4 2-8-6-6 8-1z" fill="#FFD60A" stroke="#8C5D00" strokeWidth="2" />
        </g>
    </svg>
);

const WordsIllo = () => (
    <svg viewBox="0 0 200 160">
        <ellipse cx="100" cy="152" rx="76" ry="7" fill="rgba(0,0,0,.22)" />
        <g className="float-c">
            <g transform="translate(30 36) rotate(-10 60 29)">
                <rect width="120" height="58" rx="14" fill="#fff" stroke="#8C0438" strokeWidth="3" />
                <text x="60" y="36" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="32" fill="#8C0438">بوكو</text>
            </g>
        </g>
        <g className="float-b">
            <g transform="translate(22 56) rotate(5 60 29)">
                <rect width="120" height="58" rx="14" fill="#FFD6E6" stroke="#8C0438" strokeWidth="3" />
                <text x="60" y="36" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="32" fill="#8C0438">رومه</text>
            </g>
        </g>
        <g className="float-a">
            <g transform="translate(38 76) rotate(-3 60 29)">
                <rect width="120" height="58" rx="14" fill="#FF1F7A" stroke="#8C0438" strokeWidth="3" />
                <rect x="6" y="6" width="108" height="12" rx="6" fill="rgba(255,255,255,.5)" />
                <text x="60" y="40" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="30" fill="#fff">100</text>
            </g>
        </g>
        <g className="spin-slow" transform="translate(166 22)">
            <circle r="22" fill="#FFD60A" stroke="#8C0438" strokeWidth="3" />
            <text textAnchor="middle" dominantBaseline="central" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="18" fill="#8C0438">100</text>
        </g>
    </svg>
);

const SpellingIllo = () => (
    <svg viewBox="0 0 200 160">
        <ellipse cx="100" cy="152" rx="76" ry="7" fill="rgba(0,0,0,.22)" />
        <g className="float-a" transform="translate(56 4)">
            <rect width="88" height="36" rx="14" fill="#fff" stroke="#005B66" strokeWidth="3" />
            <text x="44" y="22" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="20" fill="#005B66">ا ب ت</text>
            <path d="M40 36l4 8 6-8" fill="#fff" stroke="#005B66" strokeWidth="3" strokeLinejoin="round" />
        </g>
        <g className="wobble">
            <rect x="16" y="60" width="168" height="80" rx="16" fill="#fff" stroke="#005B66" strokeWidth="3" />
            <rect x="26" y="70" width="26" height="22" rx="6" fill="#C7F4F9" stroke="#005B66" strokeWidth="2" />
            <text x="39" y="86" textAnchor="middle" fontFamily="Amiri,serif" fontSize="16" fontWeight="700" fill="#005B66">ث</text>
            <rect x="56" y="70" width="26" height="22" rx="6" fill="#FFD60A" stroke="#005B66" strokeWidth="2" />
            <text x="69" y="86" textAnchor="middle" fontFamily="Amiri,serif" fontSize="16" fontWeight="700" fill="#005B66">ت</text>
            <rect x="86" y="70" width="26" height="22" rx="6" fill="#C7F4F9" stroke="#005B66" strokeWidth="2" />
            <text x="99" y="84" textAnchor="middle" fontFamily="Amiri,serif" fontSize="16" fontWeight="700" fill="#005B66">ب</text>
            <rect x="116" y="70" width="26" height="22" rx="6" fill="#C7F4F9" stroke="#005B66" strokeWidth="2" />
            <text x="129" y="86" textAnchor="middle" fontFamily="Amiri,serif" fontSize="16" fontWeight="700" fill="#005B66">ا</text>
            <rect x="36" y="98" width="26" height="22" rx="6" fill="#C7F4F9" stroke="#005B66" strokeWidth="2" />
            <text x="49" y="114" textAnchor="middle" fontFamily="Amiri,serif" fontSize="16" fontWeight="700" fill="#005B66">ذ</text>
            <rect x="66" y="98" width="26" height="22" rx="6" fill="#C7F4F9" stroke="#005B66" strokeWidth="2" />
            <text x="79" y="114" textAnchor="middle" fontFamily="Amiri,serif" fontSize="16" fontWeight="700" fill="#005B66">د</text>
            <rect x="96" y="98" width="26" height="22" rx="6" fill="#FF1F7A" stroke="#005B66" strokeWidth="2" />
            <text x="109" y="108" textAnchor="middle" fontFamily="Amiri,serif" fontSize="16" fontWeight="700" fill="#fff">خ</text>
            <rect x="126" y="98" width="26" height="22" rx="6" fill="#C7F4F9" stroke="#005B66" strokeWidth="2" />
            <text x="139" y="108" textAnchor="middle" fontFamily="Amiri,serif" fontSize="16" fontWeight="700" fill="#005B66">ح</text>
            <rect x="58" y="124" width="84" height="12" rx="5" fill="#C7F4F9" stroke="#005B66" strokeWidth="2" />
        </g>
    </svg>
);

const StoriesIllo = () => (
    <svg viewBox="0 0 200 160">
        <ellipse cx="100" cy="152" rx="78" ry="7" fill="rgba(0,0,0,.22)" />
        <g className="wobble">
            <path d="M12 26c20-10 56-12 70 0v110c-16-12-50-10-70 0V26z" fill="#fff" stroke="#6E1C7C" strokeWidth="3.4" strokeLinejoin="round" />
            <path d="M188 26c-20-10-56-12-70 0v110c16-12 50-10 70 0V26z" fill="#F4D2FB" stroke="#6E1C7C" strokeWidth="3.4" strokeLinejoin="round" />
            <text x="38" y="56" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="22" fill="#6E1C7C">قصة</text>
            <path d="M16 76h44M16 86h32M16 96h44" stroke="#D946EF" strokeWidth="3" strokeLinecap="round" />
            <circle cx="40" cy="120" r="14" fill="#FFD60A" stroke="#6E1C7C" strokeWidth="2.4" />
            <circle cx="35" cy="118" r="2" fill="#6E1C7C" />
            <circle cx="45" cy="118" r="2" fill="#6E1C7C" />
            <path d="M34 124c3 3 9 3 12 0" stroke="#6E1C7C" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="27" cy="124" r="2.6" fill="#FF9DA8" opacity=".75" />
            <circle cx="53" cy="124" r="2.6" fill="#FF9DA8" opacity=".75" />
            <circle cx="158" cy="60" r="10" fill="#FFD60A" stroke="#6E1C7C" strokeWidth="2" />
            <g stroke="#6E1C7C" strokeWidth="2" strokeLinecap="round">
                <line x1="158" y1="44" x2="158" y2="50" />
                <line x1="174" y1="60" x2="168" y2="60" />
                <line x1="148" y1="60" x2="142" y2="60" />
                <line x1="170" y1="48" x2="166" y2="52" />
                <line x1="146" y1="48" x2="150" y2="52" />
            </g>
            <path d="M120 86h48M120 96h36M120 106h48M120 116h32" stroke="#D946EF" strokeWidth="3" strokeLinecap="round" />
        </g>
    </svg>
);

const MatchIllo = () => (
    <svg viewBox="0 0 200 160">
        <ellipse cx="100" cy="152" rx="76" ry="7" fill="rgba(0,0,0,.22)" />
        <path d="M62 90 Q100 60 138 90" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 7" fill="none" opacity=".85" />
        <g className="float-a">
            <g transform="translate(8 38) rotate(-8 36 36)">
                <rect width="72" height="84" rx="14" fill="#fff" stroke="#8C4F00" strokeWidth="3" />
                <rect x="6" y="6" width="60" height="12" rx="6" fill="rgba(255,149,0,.25)" />
                <text x="36" y="56" textAnchor="middle" fontFamily="Amiri,serif" fontWeight="700" fontSize="44" fill="#8C4F00">ب</text>
            </g>
        </g>
        <g className="float-b">
            <g transform="translate(118 50) rotate(8 36 36)">
                <rect width="72" height="84" rx="14" fill="#FF9500" stroke="#8C4F00" strokeWidth="3" />
                <rect x="6" y="6" width="60" height="12" rx="6" fill="rgba(255,255,255,.5)" />
                <text x="36" y="56" textAnchor="middle" fontFamily="'Fredoka',sans-serif" fontWeight="700" fontSize="28" fill="#fff">Ba</text>
            </g>
        </g>
        <g className="spin-slow" transform="translate(100 90)">
            <circle r="16" fill="#FFD60A" stroke="#8C4F00" strokeWidth="2.5" />
            <path d="M-7 -1l5 5 9-9" stroke="#8C4F00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>
    </svg>
);

// ── Illustration map (static, created once at module level) ─────────────────
const ILLOS = {
    alphabet:      <AlphabetIllo />,
    syllables:     <SyllablesIllo />,
    words:         <WordsIllo />,
    spelling_game: <SpellingIllo />,
    short_stories: <StoriesIllo />,
    match:         <MatchIllo />,
};

// ── Main component ───────────────────────────────────────────────────────────
export default function JawiPage({ onBack, onHome, language, onGameStart, onGameEnd }) {
    const t = LOCALIZATION[language].jawi;
    const gameState = useGameStateContext();
    const [mode, setMode] = useState(null);

    // ── Activities list (memoised — only recalculates when language changes) ─
    // NOTE: must be declared BEFORE any conditional returns to satisfy Rules of Hooks
    const activities = useMemo(() => [
        { mode: 'alphabet',      num: 1, tClass: 't-alphabet',  capTitle: language === 'bm' ? 'Huruf'     : 'Alphabet'  },
        { mode: 'syllables',     num: 2, tClass: 't-syllables', capTitle: language === 'bm' ? 'Suku Kata' : 'Syllables' },
        { mode: 'words',         num: 3, tClass: 't-words',     capTitle: language === 'bm' ? '100 Kata'  : '100 Words' },
        { mode: 'spelling_game', num: 4, tClass: 't-spelling',  capTitle: language === 'bm' ? 'Ejaan'     : 'Spelling'  },
        { mode: 'short_stories', num: 5, tClass: 't-stories',   capTitle: language === 'bm' ? 'Cerita'    : 'Stories'   },
        { mode: 'match',         num: 6, tClass: 't-match',     capTitle: language === 'bm' ? 'Padanan'   : 'Match'     },
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
        if (['alphabet','match','words','syllables','spelling_game','short_stories'].includes(mode)) {
            setMode(null);
        } else {
            onBack();
        }
    };

    // ── Sub-page routes ─────────────────────────────────────────────────────
    if (mode === 'alphabet')      return <JawiAlphabetPage onBack={handleBackFromGame} language={language} />;
    if (mode === 'match')         return <JawiMatchGame onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'words')         return <JawiWordsPage onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'syllables')     return <JawiSyllablesLearningPage onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'spelling_game') return <Jawi100WordsGame onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'short_stories') return <JawiShortStoriesPage onBack={handleBackFromGame} onHome={onHome} language={language} />;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

            <AppHeader onBack={onBack} gameState={gameState} language={language} />

            <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
                <div className="jw-body" style={{ minHeight: '100%' }}>

                    <div className="jw-shell">

                        {/* Hero */}
                        <section className="jw-hero">
                            <div className="jw-hero-emoji-wrap">
                                <span className="jw-hero-emoji" role="img" aria-label="Quran"><QuranIcon size={96} /></span>
                            </div>
                            <p className="jw-hero-sub">
                                {t.subtitle}
                                <span aria-hidden="true">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
                                </span>
                            </p>
                        </section>

                        {/* Section label */}
                        <div className="jw-section-label">
                            {language === 'bm' ? 'Pilih Aktiviti' : 'Choose Activity'}
                        </div>

                        {/* Activity tiles */}
                        <div className="jw-grid">
                            {activities.map((item) => (
                                <button
                                    key={item.mode}
                                    className={`jw-tile ${item.tClass}`}
                                    onClick={() => handleGameModeChange(item.mode)}
                                    type="button"
                                >
                                    <span className="jw-tile-num">{item.num}</span>

                                    <span className="jw-spark s1" style={{ top:'24%', left:'14%' }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/></svg>
                                    </span>
                                    <span className="jw-spark s2" style={{ top:'30%', right:'14%' }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="10"/></svg>
                                    </span>
                                    <span className="jw-spark s3" style={{ bottom:'38%', right:'14%' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,.7)"><circle cx="12" cy="12" r="10"/></svg>
                                    </span>

                                    <div className="jw-illo">
                                        {ILLOS[item.mode]}
                                    </div>

                                    <div className="jw-cap">
                                        <span className="jw-cap-title">{item.capTitle}</span>
                                        <span className="jw-cap-go" aria-hidden="true">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 6l6 6-6 6"/>
                                            </svg>
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Hint footer */}
                        <div className="jw-hint">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
                            {t.comingSoon}
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF1F7A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
