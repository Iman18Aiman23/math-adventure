import React from 'react';
import { Calculator, Clock } from 'lucide-react';
import GameHeader from './GameHeader';
import { LOCALIZATION } from '../utils/localization';

export default function MathHome({ onSelectSubGame, onBack, onHome, language }) {
    const t = LOCALIZATION[language].math;
    const subGames = [
        {
            id: 'operations',
            title: t.opsTitle,
            icon: <Calculator size={48} />,
            color: '#FF6B6B',
            description: t.opsDesc
        },
        {
            id: 'datetime',
            title: t.timeTitle,
            icon: <Clock size={48} />,
            color: '#4ECDC4',
            description: t.timeDesc,
        }
    ];

    return (
        <div className="game-container fade-in">
            <GameHeader onBack={onBack} onHome={onHome} title={t.hubTitle} language={language} />

            <p className="game-subtitle" style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
                {t.hubSubtitle}
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                width: '100%'
            }}>
                {subGames.map((game) => (
                    <button
                        key={game.id}
                        onClick={() => !game.disabled && onSelectSubGame(game.id)}
                        className="card"
                        disabled={game.disabled}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            padding: '2.5rem 1.5rem',
                            border: 'none',
                            cursor: game.disabled ? 'default' : 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            background: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            opacity: game.disabled ? 0.7 : 1,
                            filter: game.disabled ? 'grayscale(0.5)' : 'none'
                        }}
                        onMouseOver={(e) => {
                            if (!game.disabled) {
                                e.currentTarget.style.transform = 'translateY(-8px)';
                                e.currentTarget.style.boxShadow = `0 15px 30px ${game.color}20`;
                            }
                        }}
                        onMouseOut={(e) => {
                            if (!game.disabled) {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.boxShadow = 'none';
                            }
                        }}
                    >
                        <div style={{
                            color: game.color,
                            background: `${game.color}15`,
                            padding: '1.2rem',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {game.icon}
                        </div>

                        <div>
                            <h2 style={{ color: 'var(--color-dark)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                                {game.title}
                            </h2>
                            <p style={{ color: '#666', fontSize: '1rem' }}>
                                {game.description}
                            </p>
                        </div>

                        {!game.disabled && (
                            <div style={{
                                backgroundColor: game.color,
                                color: 'white',
                                padding: '0.6rem 1.5rem',
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                marginTop: '0.5rem',
                                fontSize: '1rem'
                            }}>
                                {t.playNow}
                            </div>
                        )}

                        {game.disabled && (
                            <div style={{
                                backgroundColor: '#eee',
                                color: '#888',
                                padding: '0.6rem 1.5rem',
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                marginTop: '0.5rem',
                                fontSize: '1rem'
                            }}>
                                {t.comingSoon}
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
