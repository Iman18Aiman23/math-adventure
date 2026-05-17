import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { LOCALIZATION } from '../../utils/localization';
import { useGameStateContext } from '../../App';
import { JAWI_ALPHABET } from '../../utils/jawiData';
import { SUKU_KATA_DATA } from '../../utils/jawiSukuKataData';
import AppHeader from '../AppHeader';

export default function JawiAlphabetPage({ onBack, language }) {
    const t = LOCALIZATION[language].jawi;
    const gameState = useGameStateContext();
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

    const COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#FF8C42', '#9D4EDD', '#6BCB77', '#A06CD5', '#EF476F', '#4361EE', '#F72585', '#4CC9F0'];
    const BG_COLORS = ['#FFE0E0', '#D4F3F0', '#FFFAE0', '#FFE8D4', '#F3DDFF', '#E0FFD4', '#F0E0FF', '#FFE0E8', '#E8E8FF', '#FFE0F0', '#D4F4FF'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#f7f7f7' }}>
            <AppHeader onBack={onBack} gameState={gameState} language={language} />

            <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1rem' }}>
                <div style={{ padding: '0 0 0.25rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#AFAFAF', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>
                        {language === 'bm' ? 'Pilih Huruf untuk Belajar' : 'Select a Letter to Learn'}
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))',
                    gap: '0.6rem',
                    maxWidth: '480px',
                    margin: '0.5rem auto 0',
                    padding: '0.5rem 1rem 1.5rem',
                    direction: 'rtl',
                }}>
                    {JAWI_ALPHABET.map((item, idx) => {
                        const color = COLORS[idx % COLORS.length];
                        const bgColor = BG_COLORS[idx % BG_COLORS.length];
                        return (
                            <button
                                key={idx}
                                onClick={() => setSelectedAlphabet(item)}
                                style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    background: '#fff',
                                    border: `3px solid ${bgColor}`,
                                    borderBottom: `5px solid ${color}`,
                                    borderRadius: '16px',
                                    padding: '0.8rem 0.25rem',
                                    cursor: 'pointer',
                                    transition: 'transform 0.1s, box-shadow 0.1s',
                                    boxShadow: '0 4px 0 #E5E5E5',
                                    fontFamily: 'inherit',
                                    minHeight: '100px',
                                    minWidth: '72px',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 6px 0 ${color}`; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 0 #E5E5E5'; }}
                                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = '0 1px 0 #E5E5E5'; }}
                                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            >
                                <span style={{ fontSize: '2rem', fontWeight: 900, color: color, lineHeight: 1 }}>{item.jawi}</span>
                                <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#AFAFAF', marginTop: '4px' }}>{item.rumi}</span>
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
                                                background: '#f0f8ff', border: '2px solid #D0F0FF', cursor: 'pointer',
                                                color: '#1CB0F6', display: 'flex', alignItems: 'center', padding: '0.5rem',
                                                borderRadius: '50%'
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
                                <p style={{ textAlign: 'center', color: '#888', margin: 0 }}>
                                    {t.noSyllableData}
                                </p>
                            )}

                            {/* Navigation Buttons */}
                            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', marginTop: '1.5rem', borderTop: '2px solid #eee', paddingTop: '1rem' }}>
                                <button
                                    onClick={handlePrevAlphabet}
                                    style={{
                                        flex: 1, padding: '0.8rem', borderRadius: '12px', border: 'none',
                                        background: '#fff', color: '#CE82FF', fontWeight: 800, fontSize: '0.9rem',
                                        cursor: 'pointer', boxShadow: '0 4px 0 #E5E5E5',
                                        transition: 'transform 0.1s, borderColor 0.2s',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem'
                                    }}
                                    onMouseDown={e => e.currentTarget.style.transform = 'translateY(2px)'}
                                    onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <ChevronLeft size={16} /> {t.prev}
                                </button>

                                <button
                                    onClick={() => setSelectedAlphabet(null)}
                                    style={{
                                        flex: 1.5, padding: '0.8rem', borderRadius: '12px', border: 'none',
                                        background: '#CE82FF', color: '#fff', fontWeight: 800, fontSize: '0.9rem',
                                        cursor: 'pointer', boxShadow: '0 4px 0 #A451E0',
                                        transition: 'transform 0.1s, borderColor 0.2s'
                                    }}
                                    onMouseDown={e => e.currentTarget.style.transform = 'translateY(2px)'}
                                    onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    {t.close}
                                </button>

                                <button
                                    onClick={handleNextAlphabet}
                                    style={{
                                        flex: 1, padding: '0.8rem', borderRadius: '12px', border: 'none',
                                        background: '#fff', color: '#CE82FF', fontWeight: 800, fontSize: '0.9rem',
                                        cursor: 'pointer', boxShadow: '0 4px 0 #E5E5E5',
                                        transition: 'transform 0.1s, borderColor 0.2s',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem'
                                    }}
                                    onMouseDown={e => e.currentTarget.style.transform = 'translateY(2px)'}
                                    onMouseUp={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    {t.next} <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </div>
    );
}
