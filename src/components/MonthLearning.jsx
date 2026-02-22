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
                        style={{
                            background: 'white',
                            padding: '2.5rem',
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
                                top: '1.5rem',
                                right: '1.5rem',
                                border: 'none',
                                background: '#f0f0f0',
                                borderRadius: '50%',
                                padding: '0.5rem',
                                cursor: 'pointer',
                                color: '#666'
                            }}
                        >
                            <X size={24} />
                        </button>

                        <div style={{
                            background: '#9D4EDD',
                            color: 'white',
                            display: 'inline-block',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '50px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            marginBottom: '1.5rem'
                        }}>
                            {t.monthPrefix} {selectedMonth.id}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div>
                                <label style={{ display: 'block', color: '#888', fontSize: '0.9rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.labelEng}</label>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>{selectedMonth.name}</div>
                            </div>

                            <div style={{ height: '2px', background: '#f0f0f0', width: '50%', margin: '0 auto' }}></div>

                            <div>
                                <label style={{ display: 'block', color: '#888', fontSize: '0.9rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.labelMalay}</label>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#9D4EDD' }}>{selectedMonth.malay}</div>
                            </div>

                            <div style={{ height: '2px', background: '#f0f0f0', width: '50%', margin: '0 auto' }}></div>

                            <div>
                                <label style={{ display: 'block', color: '#888', fontSize: '0.9rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t.labelIslamic}</label>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4ECDC4' }}>{selectedMonth.islamic}</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', marginTop: '2.5rem' }}>
                            <button
                                onClick={handlePrevMonth}
                                className="btn-primary"
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: '#f0f0f0',
                                    color: '#333',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <ChevronLeft size={20} /> {t.prev}
                            </button>

                            <button
                                className="btn-primary"
                                onClick={closeModal}
                                style={{
                                    flex: 2,
                                    padding: '1rem',
                                    background: '#9D4EDD',
                                    border: 'none'
                                }}
                            >
                                {t.close}
                            </button>

                            <button
                                onClick={handleNextMonth}
                                className="btn-primary"
                                style={{
                                    flex: 1,
                                    padding: '1rem',
                                    background: '#f0f0f0',
                                    color: '#333',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                {t.next} <ChevronRight size={20} />
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
