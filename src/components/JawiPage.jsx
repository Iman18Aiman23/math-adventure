import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, GraduationCap, Star, Keyboard, ChevronLeft, ChevronRight, Languages, Brain, ArrowLeft, Home } from 'lucide-react';
import { LOCALIZATION } from '../utils/localization';
import { JAWI_ALPHABET } from '../utils/jawiData';
import { SUKU_KATA_DATA } from '../utils/jawiSukuKataData';
import JawiMatchGame from './JawiMatchGame';
import JawiWordsPage from './JawiWordsPage';
import JawiSyllablesGame from './JawiSyllablesGame';
import Jawi100WordsGame from './Jawi100WordsGame';
import GameHeader from './GameHeader';

export default function JawiPage({ onBack, onHome, language }) {
    const t = LOCALIZATION[language].jawi;
    const [mode, setMode] = useState(null); // null, 'alphabet' | 'match' | 'words' | 'syllables' | 'spelling_game'
    const [selectedAlphabet, setSelectedAlphabet] = useState(null);

    const handleBack = () => {
        if (mode === 'alphabet' || mode === 'match' || mode === 'words' || mode === 'syllables' || mode === 'spelling_game') {
            setMode('menu');
        } else {
            onBack();
        }
    };

    const handleNextAlphabet = () => {
        const currentIndex = JAWI_ALPHABET.findIndex(item => item.jawi === selectedAlphabet.jawi);
        const nextIndex = (currentIndex + 1) % JAWI_ALPHABET.length;
        setSelectedAlphabet(JAWI_ALPHABET[nextIndex]);
    };

    const handlePrevAlphabet = () => {
        const currentIndex = JAWI_ALPHABET.findIndex(item => item.jawi === selectedAlphabet.jawi);
        const prevIndex = (currentIndex - 1 + JAWI_ALPHABET.length) % JAWI_ALPHABET.length;
        setSelectedAlphabet(JAWI_ALPHABET[prevIndex]);
    };

    if (mode === 'alphabet') {
        const COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8C42', '#9D4EDD', '#6BCB77', '#A06CD5', '#EF476F', '#4361EE', '#F72585', '#4CC9F0'];

        return (
            <div className="game-container fade-in">
                <GameHeader onBack={handleBack} onHome={onHome} title={t.alphabetTitle} language={language} />

                <div className="jawi-alphabet-grid">
                    {JAWI_ALPHABET.map((item, idx) => {
                        const color = COLORS[idx % COLORS.length];
                        return (
                            <button
                                key={idx}
                                className="jawi-card"
                                onClick={() => setSelectedAlphabet(item)}
                                style={{
                                    borderColor: `${color}44`, // 44 is hex alpha for ~27% opacity
                                    '--hover-color': color
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = color;
                                    e.currentTarget.style.backgroundColor = `${color}08`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = `${color}44`;
                                    e.currentTarget.style.backgroundColor = 'white';
                                }}
                            >
                                <span className="jawi-text" style={{ color: color }}>{item.jawi}</span>
                                <span className="rumi-text">{item.rumi}</span>
                            </button>
                        );
                    })}
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
                                padding: '1rem',
                                borderRadius: '25px',
                                maxWidth: '650px', // slightly wider for 2 cols
                                width: '95%',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                position: 'relative',
                                border: '4px solid #9D4EDD',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem',
                                borderBottom: '2px solid #eee',
                                paddingBottom: '0.8rem',
                                background: 'white',
                                zIndex: 10
                            }}>
                                <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#9D4EDD', display: 'flex', alignItems: 'center', gap: '0.5rem', direction: 'rtl' }}>
                                    <span style={{ fontSize: '2rem', fontFamily: 'serif' }}>{selectedAlphabet.jawi}</span>
                                    <span style={{ color: '#666', fontSize: '1rem', direction: 'ltr' }}>- {selectedAlphabet.rumi}</span>
                                </h2>
                                <button
                                    onClick={() => setSelectedAlphabet(null)}
                                    style={{
                                        background: '#FF6B6B',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        cursor: 'pointer',
                                        fontSize: '1.2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ✕
                                </button>
                            </div>

                            {SUKU_KATA_DATA[selectedAlphabet.jawi] ? (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                    gap: '0.8rem',
                                    padding: '0.2rem'
                                }}>
                                    {SUKU_KATA_DATA[selectedAlphabet.jawi].map((row, idx) => {
                                        const DIALOG_COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8C42', '#9D4EDD', '#6BCB77'];
                                        const color = DIALOG_COLORS[idx % DIALOG_COLORS.length];

                                        return (
                                            <div key={idx} className="fade-in" style={{
                                                background: color,
                                                borderRadius: '15px',
                                                padding: '0.8rem',
                                                color: 'white',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.5rem',
                                                border: '2px solid rgba(0,0,0,0.05)'
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'rtl' }}>
                                                    <div style={{ textAlign: 'center', flex: 1 }}>
                                                        <div style={{ fontSize: '2rem', fontFamily: 'serif', lineHeight: '1', fontWeight: 'bold' }}>{row.jawi}</div>
                                                    </div>
                                                    <div style={{ textAlign: 'center', flex: 1, borderLeft: '1px solid rgba(255,255,255,0.3)', direction: 'ltr' }}>
                                                        <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>{row.rumi}</div>
                                                    </div>
                                                </div>

                                                <div style={{
                                                    background: 'rgba(0,0,0,0.1)',
                                                    padding: '0.4rem',
                                                    borderRadius: '10px',
                                                    textAlign: 'center'
                                                }}>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>{row.bunyi}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p style={{ textAlign: 'center', color: '#888' }}>
                                    {t.noSyllableData}
                                </p>
                            )}

                            {/* Navigation Buttons */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', marginTop: '1.5rem', borderTop: '2px solid #eee', paddingTop: '1rem' }}>
                                <button
                                    onClick={handlePrevAlphabet}
                                    className="btn-primary"
                                    style={{
                                        flex: 1,
                                        padding: '0.8rem',
                                        background: '#f0f0f0',
                                        color: '#333',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontSize: '1rem'
                                    }}
                                >
                                    <ChevronLeft size={20} /> {t.prev}
                                </button>

                                <button
                                    className="btn-primary"
                                    onClick={() => setSelectedAlphabet(null)}
                                    style={{
                                        flex: 2,
                                        padding: '0.8rem',
                                        background: '#9D4EDD',
                                        border: 'none',
                                        fontSize: '1rem'
                                    }}
                                >
                                    {t.close}
                                </button>

                                <button
                                    onClick={handleNextAlphabet}
                                    className="btn-primary"
                                    style={{
                                        flex: 1,
                                        padding: '0.8rem',
                                        background: '#f0f0f0',
                                        color: '#333',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        fontSize: '1rem'
                                    }}
                                >
                                    {t.next} <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        );
    }

    if (mode === 'match') return <JawiMatchGame onBack={handleBack} onHome={onHome} language={language} />;
    if (mode === 'words') return <JawiWordsPage onBack={handleBack} onHome={onHome} language={language} />;
    if (mode === 'syllables') return <JawiSyllablesGame onBack={handleBack} onHome={onHome} language={language} />;
    if (mode === 'spelling_game') return <Jawi100WordsGame onBack={handleBack} onHome={onHome} language={language} />;

    return (
        <div className="game-container fade-in">
            <GameHeader onBack={onBack} onHome={onHome} title={t.title} language={language} />

            <div className="card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>

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

                <h1 className="game-title" style={{ color: '#9D4EDD', fontSize: '3rem' }}>{t.title}</h1>
                <p className="game-subtitle" style={{ fontSize: '1.4rem', marginBottom: '3rem' }}>
                    {t.subtitle}
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
                        {t.learnAlphabet}
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
                        {t.learnSyllables}
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
                        {t.learn100Words}
                    </button>

                    <button
                        className="btn-primary"
                        onClick={() => setMode('spelling_game')}
                        style={{
                            backgroundColor: '#4ECDC4',
                            padding: '1.5rem',
                            fontSize: '1.4rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem'
                        }}
                    >
                        <Keyboard size={28} />
                        {t.learnSpelling}
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
                        {t.testMatch}
                    </button>

                    <p style={{ color: '#888', fontStyle: 'italic', marginTop: '1rem' }}>
                        {t.comingSoon}
                    </p>
                </div>
            </div>
        </div>
    );
}
