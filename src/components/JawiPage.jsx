import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, GraduationCap, Star, Keyboard, ChevronLeft, ChevronRight, Languages, Brain, ArrowLeft, Home, Volume2 } from 'lucide-react';
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

    const speakLetter = (text) => {
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = 'ms-MY';
        const voices = window.speechSynthesis.getVoices();
        const malayVoice = voices.find(v => v.lang.includes('ms') || v.lang.includes('id'));
        if (malayVoice) utt.voice = malayVoice;
        window.speechSynthesis.speak(utt);
    };

    useEffect(() => {
        if (selectedAlphabet && selectedAlphabet.rumi) {
            speakLetter(selectedAlphabet.rumi);
        }
    }, [selectedAlphabet]);

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
                                className="jawi-card-3d"
                                onClick={() => setSelectedAlphabet(item)}
                                style={{
                                    '--hover-color': color,
                                    borderColor: `${color}44`
                                }}
                            >
                                <span className="jawi-text-3d" style={{ color: color }}>{item.jawi}</span>
                                <span className="rumi-text-3d">{item.rumi}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Suku Kata Dialog */}
                {selectedAlphabet && createPortal(
                    <div className="jawi-modal-overlay" onClick={() => setSelectedAlphabet(null)}>
                        <div
                            className="jawi-modal-content"
                            style={{ padding: '1.5rem', border: '5px solid #CE82FF' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem',
                                borderBottom: '2px solid #eee',
                                paddingBottom: '0.8rem',
                                position: 'sticky',
                                top: 0,
                                background: 'white',
                                zIndex: 10
                            }}>
                                <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#9D4EDD', display: 'flex', alignItems: 'center', gap: '0.5rem', direction: 'rtl' }}>
                                    <span style={{ fontSize: '1.8rem', fontFamily: 'serif' }}>{selectedAlphabet.jawi}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', direction: 'ltr' }}>
                                        <span style={{ color: '#666', fontSize: '0.9rem' }}>- {selectedAlphabet.rumi}</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); speakLetter(selectedAlphabet.rumi); }}
                                            className="pulse-audio"
                                            style={{
                                                background: '#f0f8ff', border: 'none', cursor: 'pointer',
                                                color: '#1CB0F6', display: 'flex', alignItems: 'center', padding: '0.5rem',
                                                borderRadius: '50%', border: '2px solid #D0F0FF'
                                            }}
                                            title="Dengar sebutan"
                                        >
                                            <Volume2 size={24} />
                                        </button>
                                    </div>
                                </h2>
                                <button
                                    onClick={() => setSelectedAlphabet(null)}
                                    style={{
                                        background: '#FF6B6B',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '2rem',
                                        height: '2rem',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
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
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                    gap: '0.75rem',
                                    padding: '0.2rem'
                                }}>
                                    {SUKU_KATA_DATA[selectedAlphabet.jawi].map((row, idx) => {
                                        const DIALOG_COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8C42', '#9D4EDD', '#6BCB77'];
                                        const color = DIALOG_COLORS[idx % DIALOG_COLORS.length];

                                        return (
                                            <div key={idx} className="fade-in" style={{
                                                background: color,
                                                borderRadius: '1rem',
                                                padding: '0.75rem',
                                                color: 'white',
                                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.4rem',
                                                border: '2px solid rgba(0,0,0,0.05)'
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'rtl' }}>
                                                    <div style={{ textAlign: 'center', flex: 1 }}>
                                                        <div style={{ fontSize: '1.8rem', fontFamily: 'serif', lineHeight: '1', fontWeight: 'bold' }}>{row.jawi}</div>
                                                    </div>
                                                    <div style={{ textAlign: 'center', flex: 1, borderLeft: '1px solid rgba(255,255,255,0.3)', direction: 'ltr' }}>
                                                        <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>{row.rumi}</div>
                                                    </div>
                                                </div>

                                                <div style={{
                                                    background: 'rgba(0,0,0,0.1)',
                                                    padding: '0.3rem',
                                                    borderRadius: '0.75rem',
                                                    textAlign: 'center'
                                                }}>
                                                    <div style={{ fontSize: '0.8rem', fontWeight: '600' }}>{row.bunyi}</div>
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', marginTop: '1.5rem', borderTop: '2px solid #eee', paddingTop: '1rem' }}>
                                <button
                                    onClick={handlePrevAlphabet}
                                    className="btn-primary"
                                    style={{
                                        flex: 1,
                                        padding: '0.6rem',
                                        background: '#f0f0f0',
                                        color: '#333',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.25rem',
                                        fontSize: '0.9rem',
                                        borderRadius: '0.75rem'
                                    }}
                                >
                                    <ChevronLeft size={16} /> {t.prev}
                                </button>

                                <button
                                    className="btn-primary"
                                    onClick={() => setSelectedAlphabet(null)}
                                    style={{
                                        flex: 1.5,
                                        padding: '0.6rem',
                                        background: '#9D4EDD',
                                        border: 'none',
                                        fontSize: '0.9rem',
                                        borderRadius: '0.75rem'
                                    }}
                                >
                                    {t.close}
                                </button>

                                <button
                                    onClick={handleNextAlphabet}
                                    className="btn-primary"
                                    style={{
                                        flex: 1,
                                        padding: '0.6rem',
                                        background: '#f0f0f0',
                                        color: '#333',
                                        border: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.25rem',
                                        fontSize: '0.9rem',
                                        borderRadius: '0.75rem'
                                    }}
                                >
                                    {t.next} <ChevronRight size={16} />
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
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
            {/* Duolingo sub-header */}
            <div style={{
                background: '#fff', borderBottom: '2px solid #E5E5E5',
                padding: '0 1rem', height: '56px',
                display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0,
            }}>
                <button onClick={onBack} style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center' }}>
                    <ArrowLeft size={24} />
                </button>
                <div style={{ flex: 1, textAlign: 'center', fontWeight: 900, fontSize: '1rem', color: '#3C3C3C' }}>
                    📖 {t.title}
                </div>
                <div style={{ width: 24 }} />
            </div>

            {/* Scrollable content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1rem' }}>
                {/* Jawi hero */}
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '0.25rem', animation: 'bounce 2s ease-in-out infinite' }}>📖</div>
                    <p style={{ fontWeight: 600, color: '#777', fontSize: '0.9rem' }}>{t.subtitle}</p>
                </div>

                <p style={{ fontSize: '0.8rem', fontWeight: 800, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>
                    {language === 'bm' ? 'PILIH AKTIVITI' : 'CHOOSE ACTIVITY'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {[
                        { mode: 'alphabet',     emoji: '🔤', iconBg: '#EDD9FF', color: '#CE82FF', title: t.learnAlphabet,  desc: language === 'bm' ? 'Pelajari 36 huruf Jawi' : 'Learn 36 Jawi letters' },
                        { mode: 'syllables',    emoji: '🅰️', iconBg: '#FFF0CC', color: '#FFC800', title: t.learnSyllables, desc: language === 'bm' ? 'Suku kata KV & KVK' : 'KV & KVK syllables' },
                        { mode: 'words',        emoji: '📝', iconBg: '#FFE0E0', color: '#FF4B4B', title: t.learn100Words,  desc: language === 'bm' ? '100 perkataan asas' : '100 basic words' },
                        { mode: 'spelling_game',emoji: '🎮', iconBg: '#D0F0FF', color: '#1CB0F6', title: t.learnSpelling,  desc: language === 'bm' ? 'Cabaran ejaan interaktif' : 'Interactive spelling challenge' },
                        { mode: 'match',        emoji: '⭐', iconBg: '#FFE8CC', color: '#FF9600', title: t.testMatch,      desc: language === 'bm' ? 'Padankan huruf & perkataan' : 'Match letters & words' },
                    ].map((item, i) => (
                        <button
                            key={item.mode}
                            className="duo-lesson-row fade-in"
                            onClick={() => setMode(item.mode)}
                            style={{ animationDelay: `${i * 0.06}s` }}
                        >
                            <div className="duo-lesson-icon" style={{ background: item.iconBg }}>
                                {item.emoji}
                            </div>
                            <div className="duo-lesson-info">
                                <div className="duo-lesson-title" style={{ color: item.color }}>{item.title}</div>
                                <div className="duo-lesson-desc">{item.desc}</div>
                            </div>
                            <div className="duo-lesson-arrow">›</div>
                        </button>
                    ))}
                </div>

                <p style={{ color: '#AFAFAF', fontStyle: 'italic', marginTop: '1rem', fontSize: '0.85rem', textAlign: 'center' }}>
                    {t.comingSoon}
                </p>
            </div>
        </div>
    );
}

