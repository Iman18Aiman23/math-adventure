import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, BookOpen, GraduationCap, Star, Home, Keyboard } from 'lucide-react';
import { JAWI_ALPHABET } from '../utils/jawiData';
import { SUKU_KATA_DATA } from '../utils/jawiSukuKataData';
import JawiMatchGame from './JawiMatchGame';
import JawiWordsPage from './JawiWordsPage';
import JawiSyllablesGame from './JawiSyllablesGame';

export default function JawiPage({ onBack, onHome }) {
    const [mode, setMode] = useState('menu'); // 'menu' | 'alphabet' | 'match' | 'words' | 'syllables'
    const [selectedAlphabet, setSelectedAlphabet] = useState(null);

    const handleBack = () => {
        if (mode === 'alphabet' || mode === 'match' || mode === 'words' || mode === 'syllables') {
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
                        <button
                            key={idx}
                            className="jawi-card"
                            onClick={() => setSelectedAlphabet(item)}
                            style={{
                                cursor: 'pointer',
                                border: 'none',
                                background: 'white',
                                transition: 'transform 0.2s',
                                width: '100%' // Ensure button takes full width of grid cell
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <span className="jawi-text">{item.jawi}</span>
                            <span className="rumi-text">{item.rumi}</span>
                        </button>
                    ))}
                </div>

                {/* Suku Kata Dialog */}
                {selectedAlphabet && createPortal(
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(5px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        padding: '1rem'
                    }} onClick={() => setSelectedAlphabet(null)}>
                        <div
                            className="card fade-in"
                            style={{
                                background: 'white',
                                padding: '1.5rem',
                                borderRadius: '25px',
                                maxWidth: '550px',
                                width: '100%',
                                maxHeight: '85vh',
                                overflowY: 'auto',
                                position: 'relative',
                                border: '4px solid #9D4EDD',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1.5rem',
                                borderBottom: '2px solid #eee',
                                paddingBottom: '1rem',
                                position: 'sticky',
                                top: '-24px', // negative margin compensation
                                marginTop: '-8px',
                                paddingTop: '8px',
                                background: 'white',
                                zIndex: 10
                            }}>
                                <h2 style={{ margin: 0, fontSize: '1.8rem', color: '#9D4EDD', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '2.2rem', fontFamily: 'serif' }}>{selectedAlphabet.jawi}</span>
                                    <span style={{ color: '#666', fontSize: '1.2rem' }}>- {selectedAlphabet.rumi}</span>
                                </h2>
                                <button
                                    onClick={() => setSelectedAlphabet(null)}
                                    style={{
                                        background: '#FF6B6B',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '40px',
                                        height: '40px',
                                        cursor: 'pointer',
                                        fontSize: '1.5rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold',
                                        boxShadow: '0 4px 10px rgba(255, 107, 107, 0.4)'
                                    }}
                                >
                                    ✕
                                </button>
                            </div>

                            {SUKU_KATA_DATA[selectedAlphabet.jawi] ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {SUKU_KATA_DATA[selectedAlphabet.jawi].map((row, idx) => {
                                        const DIALOG_COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8C42', '#9D4EDD', '#6BCB77'];
                                        const color = DIALOG_COLORS[idx % DIALOG_COLORS.length];

                                        return (
                                            <div key={idx} className="fade-in" style={{
                                                background: color,
                                                borderRadius: '15px',
                                                padding: '1.2rem',
                                                color: 'white',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.8rem',
                                                border: '2px solid rgba(0,0,0,0.05)'
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div style={{ textAlign: 'center', flex: 1, borderRight: '1px solid rgba(255,255,255,0.3)' }}>
                                                        <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.2rem' }}>Suku Kata Rumi</div>
                                                        <div style={{ fontSize: '1.8rem', fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>{row.rumi}</div>
                                                    </div>
                                                    <div style={{ textAlign: 'center', flex: 1 }}>
                                                        <div style={{ fontSize: '0.9rem', opacity: 0.9, marginBottom: '0.2rem' }}>Suku Kata Jawi</div>
                                                        <div style={{ fontSize: '2.5rem', fontFamily: 'serif', lineHeight: '0.8', fontWeight: 'bold' }}>{row.jawi}</div>
                                                    </div>
                                                </div>

                                                <div style={{
                                                    background: 'rgba(0,0,0,0.1)',
                                                    padding: '0.8rem',
                                                    borderRadius: '12px',
                                                    textAlign: 'center',
                                                    marginTop: '0.3rem'
                                                }}>
                                                    <div style={{ fontSize: '0.75rem', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Bunyi</div>
                                                    <div style={{ fontSize: '1rem', fontWeight: '600' }}>{row.bunyi}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p style={{ textAlign: 'center', color: '#888' }}>
                                    No detailed Suku Kata data available for this alphabet.
                                </p>
                            )}
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        );
    }

    if (mode === 'match') {
        return <JawiMatchGame onBack={handleBack} onHome={onHome} />;
    }

    if (mode === 'words') {
        return <JawiWordsPage onBack={handleBack} onHome={onHome} />;
    }

    if (mode === 'syllables') {
        return <JawiSyllablesGame onBack={handleBack} onHome={onHome} />;
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
                    onClick={() => setMode('syllables')}
                    style={{
                        backgroundColor: '#FFD93D',
                        padding: '1.5rem',
                        fontSize: '1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem',
                        color: '#333'
                    }}
                >
                    <Keyboard size={28} />
                    Alphabet Syllables Game
                </button>

                <button
                    className="btn-primary"
                    onClick={() => setMode('words')}
                    style={{
                        backgroundColor: '#FF6B6B',
                        padding: '1.5rem',
                        fontSize: '1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem'
                    }}
                >
                    <BookOpen size={28} />
                    1st 100 Words
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
                        gap: '1rem'
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
