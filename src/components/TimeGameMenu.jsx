import React from 'react';
import GameHeader from './GameHeader';
import { LOCALIZATION } from '../utils/localization';

const TIME_COLORS = [
    { main: '#7C3AED', bg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)', emoji: '📅' },
    { main: '#F43F5E', bg: 'linear-gradient(135deg,#ffe4e6,#fecdd3)', emoji: '🗓️' },
    { main: '#0EA5E9', bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', emoji: '⏰' },
];

export default function TimeGameMenu({ onStart, onBack, onHome, language }) {
    const t = LOCALIZATION[language].time;

    const games = [
        { id: 'month-learning', label: t.monthLearning, desc: t.monthLearningDesc, ...TIME_COLORS[0] },
        { id: 'months', label: t.monthQuiz, desc: t.monthQuizDesc, ...TIME_COLORS[1] },
        { id: 'clock', label: t.timeAdventure, desc: t.timeAdventureDesc, ...TIME_COLORS[2] },
    ];

    return (
        <div className="game-container fade-in">
            <GameHeader onBack={onBack} onHome={onHome} title={t.title} language={language} />

            <p style={{ color: '#6b7280', fontWeight: 600, fontSize: '1rem', marginBottom: '1rem', textAlign: 'center' }}>
                {t.selectGame}
            </p>

            <div style={{ display: 'grid', gap: '0.75rem', maxWidth: '480px', width: '100%' }}>
                {games.map((game, i) => (
                    <button
                        key={game.id}
                        className="subject-card fade-in"
                        onClick={() => onStart(game.id)}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            gap: '1rem',
                            padding: '1rem 1.25rem',
                            border: `3px solid ${game.main}30`,
                            background: game.bg,
                            textAlign: 'left',
                            animationDelay: `${i * 0.08}s`,
                        }}
                    >
                        <span style={{
                            fontSize: '2rem',
                            background: game.bg,
                            border: `2px solid ${game.main}25`,
                            borderRadius: '1rem',
                            padding: '0.5rem 0.7rem',
                            lineHeight: 1,
                            flexShrink: 0,
                        }}>{game.emoji}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(0.95rem,3.5vw,1.15rem)', color: game.main, marginBottom: '0.2rem' }}>
                                {game.label}
                            </div>
                            <div style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.78rem,2.5vw,0.88rem)', color: '#6b7280', fontWeight: 600, lineHeight: 1.3 }}>
                                {game.desc}
                            </div>
                        </div>
                        <span style={{ fontFamily: 'var(--font-heading)', color: game.main, fontSize: '1.1rem', flexShrink: 0 }}>→</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
