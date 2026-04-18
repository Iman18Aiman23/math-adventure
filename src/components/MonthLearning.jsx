import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTHS } from '../utils/timeData';
import GameHeader from './GameHeader';
import { LOCALIZATION } from '../utils/localization';

export default function MonthLearning({ onBack, onHome, language }) {
    const t = LOCALIZATION[language].monthLearningDetail;
    const [selectedMonth, setSelectedMonth] = useState(null);

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
    };

    const closeModal = () => {
        setSelectedMonth(null);
    };

    const handleNextMonth = () => {
        const currentIndex = MONTHS.findIndex(m => m.id === selectedMonth.id);
        const nextIndex = (currentIndex + 1) % MONTHS.length;
        setSelectedMonth(MONTHS[nextIndex]);
    };

    const handlePrevMonth = () => {
        const currentIndex = MONTHS.findIndex(m => m.id === selectedMonth.id);
        const prevIndex = (currentIndex - 1 + MONTHS.length) % MONTHS.length;
        setSelectedMonth(MONTHS[prevIndex]);
    };

    return (
        <div className="game-container fade-in">
            <GameHeader
                onBack={onBack}
                onHome={onHome}
                title={t.monthLearning}
                language={language}
            />

            <p className="game-subtitle" style={{ fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center' }}>
                {t.subtitle}
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '1.2rem',
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto',
                padding: '0 0.5rem'
            }}>
                {MONTHS.map((month, index) => {
                    const MONTH_THEMES = [
                        { base: '#FF4B4B', border: '#D03030', shadow: 'rgba(208, 48, 48, 0.3)', icon: '🎈' },
                        { base: '#FF9000', border: '#D07000', shadow: 'rgba(208, 112, 0, 0.3)', icon: '☀️' },
                        { base: '#FFD100', border: '#D0A000', shadow: 'rgba(208, 160, 0, 0.3)', icon: '🪁' },
                        { base: '#8CE836', border: '#60C010', shadow: 'rgba(96, 192, 16, 0.3)', icon: '🌱' },
                        { base: '#00D1A1', border: '#00A07A', shadow: 'rgba(0, 160, 122, 0.3)', icon: '🦋' },
                        { base: '#00B4D8', border: '#008BA5', shadow: 'rgba(0, 139, 165, 0.3)', icon: '🐋' },
                        { base: '#6332F6', border: '#4E24C0', shadow: 'rgba(78, 36, 192, 0.3)', icon: '👾' },
                        { base: '#D90368', border: '#A00040', shadow: 'rgba(160, 0, 64, 0.3)', icon: '🌺' },
                        { base: '#F15BB5', border: '#C04090', shadow: 'rgba(192, 64, 144, 0.3)', icon: '🌸' },
                        { base: '#4ECDC4', border: '#20A09A', shadow: 'rgba(32, 160, 154, 0.3)', icon: '🐬' },
                        { base: '#9D4EDD', border: '#7020B0', shadow: 'rgba(112, 32, 176, 0.3)', icon: '🌟' },
                        { base: '#FF5A5F', border: '#D03030', shadow: 'rgba(208, 48, 48, 0.3)', icon: '🎉' },
                    ];
                    const theme = MONTH_THEMES[index % MONTH_THEMES.length];
                    
                    return (
                        <button
                            key={month.id}
                            onClick={() => handleMonthClick(month)}
                            className="month-btn-interactive"
                            style={{
                                '--btn-base': theme.base,
                                '--btn-border': theme.border,
                                '--btn-shadow': theme.shadow,
                            }}
                        >
                            <div style={{
                                width: '50px',
                                height: '50px',
                                background: 'rgba(255, 255, 255, 0.25)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.6rem',
                                marginBottom: '0.3rem',
                                boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.1)'
                            }}>
                                {theme.icon}
                            </div>
                            <span style={{ fontSize: '1.6rem', fontWeight: '900', textShadow: '0 2px 0 rgba(0,0,0,0.15)', lineHeight: '1' }}>
                                {month.id}
                            </span>
                            <span style={{ fontSize: '1.1rem', fontWeight: '800', opacity: 0.95, marginTop: '0.2rem' }}>
                                {month.malay}
                            </span>
                        </button>
                    )
                })}
            </div>

            {/* Flashcard Modal */}
            {selectedMonth && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        backdropFilter: 'blur(5px)',
                        padding: '1rem'
                    }}
                    onClick={closeModal}
                >
                    <div
                        className="card"
                        style={{
                            background: 'white',
                            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                            borderRadius: '30px',
                            width: '100%',
                            maxWidth: '450px',
                            position: 'relative',
                            textAlign: 'center',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                            animation: 'modalFadeIn 0.3s ease-out'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                border: 'none',
                                background: '#f0f0f0',
                                borderRadius: '50%',
                                padding: '0.4rem',
                                cursor: 'pointer',
                                color: '#666'
                            }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{
                            background: '#9D4EDD',
                            color: 'white',
                            display: 'inline-block',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '50px',
                            fontSize: 'clamp(1rem, 4vw, 1.2rem)',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem',
                            marginTop: '0.5rem'
                        }}>
                            {t.monthPrefix} {selectedMonth.id}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'min(2rem, 5vh)' }}>
                            <div>
                                <label style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.labelEng}</label>
                                <div style={{ fontSize: 'clamp(1.8rem, 8vw, 2.5rem)', fontWeight: 'bold', color: '#333' }}>{selectedMonth.name}</div>
                            </div>

                            <div style={{ height: '2px', background: '#f0f0f0', width: '40%', margin: '0 auto' }}></div>

                            <div>
                                <label style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.labelMalay}</label>
                                <div style={{ fontSize: 'clamp(1.8rem, 8vw, 2.5rem)', fontWeight: 'bold', color: '#9D4EDD' }}>{selectedMonth.malay}</div>
                            </div>

                            <div style={{ height: '2px', background: '#f0f0f0', width: '40%', margin: '0 auto' }}></div>

                            <div>
                                <label style={{ display: 'block', color: '#888', fontSize: '0.8rem', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.labelIslamic}</label>
                                <div style={{ fontSize: 'clamp(1.8rem, 8vw, 2.5rem)', fontWeight: 'bold', color: '#4ECDC4' }}>{selectedMonth.islamic}</div>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            width: '100%',
                            marginTop: '2rem'
                        }}>
                            <button
                                onClick={handlePrevMonth}
                                className="btn-primary"
                                style={{
                                    flex: '1',
                                    padding: '0.8rem 0.5rem',
                                    background: '#f0f0f0',
                                    color: '#333',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.3rem',
                                    fontSize: '0.9rem'
                                }}
                            >
                                <ChevronLeft size={18} /> {t.prev}
                            </button>

                            <button
                                onClick={handleNextMonth}
                                className="btn-primary"
                                style={{
                                    flex: '1',
                                    padding: '0.8rem 0.5rem',
                                    background: '#f0f0f0',
                                    color: '#333',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.3rem',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {language === 'bm' ? 'Seterusnya' : 'Next'} <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes modalFadeIn {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                
                .month-btn-interactive {
                    position: relative;
                    background: var(--btn-base);
                    color: white;
                    border: none;
                    border-radius: 24px;
                    padding: 1.5rem 0.5rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.1s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 8px 0 var(--btn-border), 0 12px 16px var(--btn-shadow);
                    cursor: pointer;
                    font-family: inherit;
                    -webkit-tap-highlight-color: transparent;
                    margin-bottom: 8px;
                }
                
                .month-btn-interactive:active {
                    transform: translateY(8px);
                    box-shadow: 0 0px 0 var(--btn-border), 0 2px 4px var(--btn-shadow);
                }
                
                @media (hover: hover) {
                    .month-btn-interactive:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 10px 0 var(--btn-border), 0 16px 24px var(--btn-shadow);
                    }
                    .month-btn-interactive:active {
                        transform: translateY(8px);
                        box-shadow: 0 0px 0 var(--btn-border), 0 2px 4px var(--btn-shadow);
                    }
                }
            `}</style>
        </div>
    );
}
