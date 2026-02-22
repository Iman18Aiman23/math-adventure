import React from 'react';
import { Construction } from 'lucide-react';
import GameHeader from './GameHeader';
import { LOCALIZATION } from '../utils/localization';

export default function BMPage({ onBack, onHome, language }) {
    const t = LOCALIZATION[language].bmPage;
    return (
        <div className="game-container fade-in">
            <GameHeader onBack={onBack} onHome={onHome} title={t.title} language={language} />

            <div className="card" style={{ padding: '3rem', textAlign: 'center', width: '100%' }}>

                <Construction size={80} color="#4ECDC4" style={{ marginBottom: '2rem' }} />
                <h1 className="game-title" style={{ color: '#4ECDC4' }}>{t.title}</h1>
                <p className="game-subtitle" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                    {t.comingSoon}
                </p>
                <p style={{ color: '#666', fontSize: '1.2rem' }}>
                    {t.desc}
                </p>

                <button
                    className="btn-primary"
                    onClick={onBack}
                    style={{ backgroundColor: '#4ECDC4', marginTop: '3rem', width: 'auto', padding: '1rem 3rem' }}
                >
                    {t.backHome}
                </button>
            </div>
        </div>
    );
}
