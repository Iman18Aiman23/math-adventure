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
            <GameHeader onBack={onBack} onHome={onHome} title={t.title} language={language} />

            <p className="game-subtitle" style={{ fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center' }}>
                {t.subtitle}
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '1rem',
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto'
            }}>
                {MONTHS.map((month) => (
                    <button
                        key={month.id}
                        onClick={() => handleMonthClick(month)}
                        className="btn-primary"
                        style={{
                            background: 'white',
                            color: '#333',
                            border: '3px solid #9D4EDD',
                            padding: '1.5rem 1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            borderRadius: '20px',
                            transition: 'transform 0.2s',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9D4EDD' }}>
                            {month.id}
                        </span>
                        <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                            {month.malay}
                        </span>
                    </button>
                ))}
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
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            gap: '0.5rem',
                            width: '100%',
                            marginTop: '2rem'
                        }}>
                            <button
                                onClick={handlePrevMonth}
                                className="btn-primary"
                                style={{
                                    flex: '1 1 auto',
                                    minWidth: '80px',
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
                                className="btn-primary"
                                onClick={closeModal}
                                style={{
                                    flex: '2 1 120px',
                                    padding: '0.8rem 1rem',
                                    background: '#9D4EDD',
                                    border: 'none',
                                    fontSize: '1rem',
                                    order: language === 'bm' ? 3 : 0 // Ensure close is prominent
                                }}
                            >
                                {t.close}
                            </button>

                            <button
                                onClick={handleNextMonth}
                                className="btn-primary"
                                style={{
                                    flex: '1 1 auto',
                                    minWidth: '80px',
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
            `}</style>
        </div>
    );
}
