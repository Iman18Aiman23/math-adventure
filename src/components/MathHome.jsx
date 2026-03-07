import React from 'react';
import GameHeader from './GameHeader';
import { LOCALIZATION } from '../utils/localization';

const GAME_COLORS = {
    operations: { main: '#F43F5E', bg: 'linear-gradient(135deg,#ffe4e6,#fecdd3)', emoji: '🔢' },
    datetime: { main: '#0EA5E9', bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)', emoji: '🕐' },
};

export default function MathHome({ onSelectSubGame, onBack, onHome, language }) {
    const t = LOCALIZATION[language].math;

    const subGames = [
        { id: 'operations', title: t.opsTitle, desc: t.opsDesc, ...GAME_COLORS.operations },
        { id: 'datetime', title: t.timeTitle, desc: t.timeDesc, ...GAME_COLORS.datetime },
    ];

    return (
        <div className="game-container fade-in">
            <GameHeader onBack={onBack} onHome={onHome} title={t.hubTitle} language={language} />

            <p style={{ color: '#6b7280', fontWeight: 600, fontSize: '1rem', marginBottom: '1.25rem', textAlign: 'center' }}>
                {t.hubSubtitle}
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
                width: '100%',
                maxWidth: '560px',
            }}>
                {subGames.map((game, i) => (
                    <button
                        key={game.id}
                        className="subject-card fade-in"
                        onClick={() => onSelectSubGame(game.id)}
                        style={{
                            background: game.bg,
                            border: `3px solid ${game.main}30`,
                            animationDelay: `${i * 0.1}s`,
                        }}
                    >
                        <span style={{ fontSize: 'clamp(2.4rem,9vw,3.4rem)', lineHeight: 1 }}>{game.emoji}</span>
                        <h2 className="card-title" style={{ color: game.main }}>{game.title}</h2>
                        <p className="card-desc">{game.desc}</p>
                        <span className="card-badge" style={{ background: game.main }}>
                            {t.playNow} →
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
