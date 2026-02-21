import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import GameHeader from './GameHeader';

export default function TimeGameMenu({ onStart, onBack, onHome }) {
    const games = [
        {
            id: 'months',
            label: 'Month Learning',
            icon: <Calendar size={32} />,
            color: '#FF6B6B',
            description: 'Learn the 12 months in order!'
        },
        {
            id: 'clock',
            label: 'Time Adventure',
            icon: <Clock size={32} />,
            color: '#4ECDC4',
            description: 'Learn to read analog and digital clocks!'
        },
    ];

    return (
        <div className="game-container fade-in">
            <GameHeader onBack={onBack} onHome={onHome} title="Date & Time" />

            <p className="game-subtitle" style={{ fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center' }}>
                Pilih permainan anda! ✨
            </p>

            <div style={{ display: 'grid', gap: '1rem', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
                {games.map((game) => (
                    <button
                        key={game.id}
                        onClick={() => onStart(game.id)}
                        className="btn-primary"
                        style={{
                            background: 'white',
                            color: '#333',
                            border: `3px solid ${game.color}`,
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            textAlign: 'left',
                            borderRadius: '20px'
                        }}
                    >
                        <div style={{
                            background: `${game.color}20`,
                            padding: '1rem',
                            borderRadius: '15px',
                            color: game.color
                        }}>
                            {game.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: game.color }}>{game.label}</div>
                            <div style={{ fontSize: '0.9rem', color: '#888' }}>{game.description}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
