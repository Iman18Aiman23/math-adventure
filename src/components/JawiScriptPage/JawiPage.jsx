import React, { useState } from 'react';
import { BookOpen, GraduationCap, Star, Keyboard, Languages, Brain, ArrowLeft, Home } from 'lucide-react';
import { LOCALIZATION } from '../../utils/localization';
import { useGameStateContext } from '../../App';
import JawiAlphabetPage from './JawiAlphabetPage';
import JawiMatchGame from './JawiMatchGame';
import JawiWordsPage from './JawiWordsPage';
import JawiSyllablesLearningPage from './JawiSyllablesLearningPage';
import Jawi100WordsGame from './Jawi100WordsGame';
import JawiShortStoriesPage from './JawiShortStoriesPage';
import AppHeader from '../AppHeader';
import { JawiAlphabetIcon, JawiReadingIcon, Jawi100WordsIcon, JawiSpellingGameIcon, JawiStoriesIcon } from '../icons/JawiPageIcons';

export default function JawiPage({ onBack, onHome, language, onGameStart, onGameEnd }) {
    const t = LOCALIZATION[language].jawi;
    const gameState = useGameStateContext();
    const [mode, setMode] = useState(null); // null, 'alphabet' | 'match' | 'words' | 'syllables' | 'spelling_game' | 'short_stories'

    const handleGameModeChange = (newMode) => {
        const gameModesWithSidebar = ['match', 'spelling_game', 'syllables'];
        if (gameModesWithSidebar.includes(newMode)) {
            onGameStart?.();
        }
        setMode(newMode);
    };

    const handleBackFromGame = () => {
        const gameModesWithSidebar = ['match', 'spelling_game', 'syllables'];
        if (gameModesWithSidebar.includes(mode)) {
            onGameEnd?.();
        }
        if (mode === 'alphabet' || mode === 'match' || mode === 'words' || mode === 'syllables' || mode === 'spelling_game' || mode === 'short_stories') {
            setMode(null);
        } else {
            onBack();
        }
    };

    if (mode === 'alphabet') {
        return <JawiAlphabetPage onBack={handleBackFromGame} language={language} />;
    }

    if (mode === 'match') return <JawiMatchGame onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'words') return <JawiWordsPage onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'syllables') return <JawiSyllablesLearningPage onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'spelling_game') return <Jawi100WordsGame onBack={handleBackFromGame} onHome={onHome} language={language} />;
    if (mode === 'short_stories') return <JawiShortStoriesPage onBack={handleBackFromGame} onHome={onHome} language={language} />;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
            <AppHeader onBack={onBack} gameState={gameState} language={language} />

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1rem' }}>
                {/* Jawi hero */}
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '0.25rem', animation: 'bounce 2s ease-in-out infinite' }}>📖</div>
                    <p style={{ fontWeight: 600, color: '#777', fontSize: '1.1rem', margin: 0 }}>{t.subtitle}</p>
                </div>

                <p style={{ fontSize: '1rem', fontWeight: 800, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', textAlign: 'center', margin: '0 0 0.75rem 0' }}>
                    {language === 'bm' ? 'PILIH AKTIVITI' : 'CHOOSE ACTIVITY'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        { mode: 'alphabet',     icon: <JawiAlphabetIcon size={48} />, iconBg: '#EDD9FF', color: '#CE82FF', title: t.learnAlphabet,  desc: language === 'bm' ? 'Pelajari 36 huruf Jawi' : 'Learn 36 Jawi letters' },
                        { mode: 'syllables',    icon: <JawiReadingIcon size={48} />, iconBg: '#FFF0CC', color: '#FFC800', title: t.learnSyllables, desc: language === 'bm' ? 'Suku kata KV & KVK' : 'KV & KVK syllables' },
                        { mode: 'words',        icon: <Jawi100WordsIcon size={48} />, iconBg: '#FFE0E0', color: '#FF4B4B', title: t.learn100Words,  desc: language === 'bm' ? '100 perkataan asas' : '100 basic words' },
                        { mode: 'spelling_game',icon: <JawiSpellingGameIcon size={48} />, iconBg: '#D0F0FF', color: '#1CB0F6', title: t.learnSpelling,  desc: language === 'bm' ? 'Cabaran ejaan interaktif' : 'Interactive spelling challenge' },
                        { mode: 'short_stories',icon: <JawiStoriesIcon size={48} />, iconBg: '#E8D4F5', color: '#B856D9', title: t.shortStories,   desc: language === 'bm' ? 'Baca cerita pendek dalam Jawi' : 'Read short stories in Jawi' },
                        { mode: 'match',        emoji: '⭐', iconBg: '#FFE8CC', color: '#FF9600', title: t.testMatch,      desc: language === 'bm' ? 'Padankan huruf & perkataan' : 'Match letters & words' },
                    ].map((item, i) => (
                        <button
                            key={item.mode}
                            className="fade-in"
                            onClick={() => handleGameModeChange(item.mode)}
                            style={{
                                display: 'flex', alignItems: 'center', padding: '1.25rem',
                                background: '#fff', border: `3px solid ${item.iconBg}`, borderLeft: `5px solid ${item.color}`, borderRadius: '16px',
                                cursor: 'pointer', transition: 'all 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', textAlign: 'left',
                                gap: '1.2rem', animationDelay: `${i * 0.07}s`,
                                width: '100%', minHeight: '95px'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseDown={(e) => {
                                e.currentTarget.style.transform = 'translateY(2px)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                            }}
                            onMouseUp={(e) => {
                                e.currentTarget.style.transform = 'translateY(-3px)';
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                            }}
                        >
                            <div style={{ background: item.color, color: '#fff', borderRadius: '14px', width: '56px', height: '56px', minWidth: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 900 }}>
                                {item.icon || item.emoji}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#3C3C3C', marginBottom: '6px' }}>{item.title}</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#AFAFAF', lineHeight: 1.3 }}>{item.desc}</div>
                            </div>
                            <div style={{ fontSize: '1.5rem', color: '#AFAFAF' }}>›</div>
                        </button>
                    ))}
                </div>

                <p style={{ color: '#AFAFAF', fontStyle: 'italic', marginTop: '1rem', fontSize: '0.85rem', textAlign: 'center', margin: '1rem 0 0 0' }}>
                    {t.comingSoon}
                </p>
            </div>
        </div>
    );
}

