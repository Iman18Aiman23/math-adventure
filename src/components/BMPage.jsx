import React from 'react';
import GameHeader from './GameHeader';
import { LOCALIZATION } from '../utils/localization';

export default function BMPage({ onBack, onHome, language }) {
    const t = LOCALIZATION[language].bmPage;

    return (
        <div className="game-container fade-in">
            <GameHeader onBack={onBack} onHome={onHome} title={t.title} language={language} />

            <div className="card" style={{
                maxWidth: '480px',
                width: '100%',
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                background: 'linear-gradient(135deg,#e0f2fe,#bae6fd)',
                border: '3px solid #0EA5E920',
            }}>
                {/* Animated construction emoji */}
                <div style={{ fontSize: 'clamp(3rem,12vw,5rem)', marginBottom: '1rem' }} className="animate-bounce">
                    🚧
                </div>
                <h1 className="game-title" style={{ color: '#0EA5E9', marginBottom: '0.5rem' }}>
                    {t.title}
                </h1>
                <p style={{ fontSize: 'clamp(1rem, 4vw, 1.25rem)', color: '#0284c7', fontWeight: 700, marginBottom: '0.75rem' }}>
                    {t.comingSoon}
                </p>
                <p style={{ color: '#0369a1', fontSize: '0.95rem', fontWeight: 600, marginBottom: '2rem', lineHeight: 1.5 }}>
                    {t.desc}
                </p>

                {/* Fun stars */}
                <div style={{ fontSize: '1.8rem', marginBottom: '1.5rem', letterSpacing: '0.25rem' }}>
                    ⭐ ⭐ ⭐
                </div>

                <button
                    className="btn-primary"
                    onClick={onBack}
                    style={{ background: 'linear-gradient(135deg,#0EA5E9,#38bdf8)', padding: '0.85rem 2.5rem', margin: 0 }}
                >
                    {t.backHome} 🏠
                </button>
            </div>
        </div>
    );
}
