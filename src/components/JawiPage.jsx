import React, { useState } from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Star, Home } from 'lucide-react';
import { JAWI_ALPHABET } from '../utils/jawiData';
import JawiMatchGame from './JawiMatchGame';

export default function JawiPage({ onBack, onHome }) {
    const [mode, setMode] = useState('menu'); // 'menu' | 'alphabet' | 'match'

    const handleBack = () => {
        if (mode === 'alphabet' || mode === 'match') {
            setMode('menu');
        } else {
            onBack();
        }
    };

    if (mode === 'alphabet') {
        return (
            <div className="fade-in" style={{ padding: '1rem', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={handleBack}
                        style={{
                            background: 'rgba(0,0,0,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginRight: '1rem'
                        }}
                    >
                        <ArrowLeft size={32} color="var(--color-dark)" />
                    </button>
                    <h1 className="game-title" style={{ margin: 0, fontSize: '2.5rem', color: '#9D4EDD' }}>
                        Jawi Alphabet
                    </h1>
                </div>

                <div className="jawi-alphabet-grid">
                    {JAWI_ALPHABET.map((item, idx) => (
                        <div key={idx} className="jawi-card">
                            <span className="jawi-text">{item.jawi}</span>
                            <span className="rumi-text">{item.rumi}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (mode === 'match') {
        return <JawiMatchGame onBack={handleBack} onHome={onHome} />;
    }

    return (
        <div className="card fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button
                    onClick={onBack}
                    className="btn-back"
                    style={{
                        background: 'rgba(0,0,0,0.05)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <ArrowLeft size={24} color="var(--color-dark)" />
                </button>
                <button
                    onClick={onHome}
                    style={{
                        background: 'rgba(0,0,0,0.05)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                >
                    <Home size={24} color="var(--color-dark)" />
                </button>
            </div>

            <div style={{
                color: '#9D4EDD',
                background: 'rgba(157, 78, 221, 0.1)',
                padding: '2rem',
                borderRadius: '30px',
                display: 'inline-flex',
                marginBottom: '2rem'
            }}>
                <BookOpen size={64} />
            </div>

            <h1 className="game-title" style={{ color: '#9D4EDD', fontSize: '3rem' }}>Jawi Learning</h1>
            <p className="game-subtitle" style={{ fontSize: '1.4rem', marginBottom: '3rem' }}>
                Mari belajar mengenal Jawi bersama Iman! ✨
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px', margin: '0 auto' }}>
                <button
                    className="btn-primary"
                    onClick={() => setMode('alphabet')}
                    style={{
                        backgroundColor: '#9D4EDD',
                        padding: '1.5rem',
                        fontSize: '1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem'
                    }}
                >
                    <GraduationCap size={28} />
                    Learn Jawi Alphabet
                </button>

                <button
                    className="btn-primary"
                    onClick={() => setMode('match')}
                    style={{
                        backgroundColor: '#FF8C42', // Different color for test
                        padding: '1.5rem',
                        fontSize: '1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        border: '3px dashed white' // Dashed border for test
                    }}
                >
                    <Star size={28} />
                    [TEST] Play Jawi Match
                </button>

                <p style={{ color: '#888', fontStyle: 'italic', marginTop: '1rem' }}>
                    More modules coming soon!
                </p>
            </div>
        </div>
    );
}
