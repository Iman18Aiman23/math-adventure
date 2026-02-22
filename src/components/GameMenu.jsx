import React, { useState, useEffect } from 'react';
import { Calculator, Star, Trophy, ArrowLeft, Volume2, VolumeX, MousePointerClick, Keyboard, Hash, Home, Play, Settings } from 'lucide-react';
import GameHeader from './GameHeader';
import { LOCALIZATION } from '../utils/localization';

export default function GameMenu({ onStart, isMuted, onToggleMute, onBack, onHome, language }) {
    const t = LOCALIZATION[language].opsDetails;
    const [difficulty, setDifficulty] = useState('easy');
    const [quizType, setQuizType] = useState('multiple');
    const [selectedOperation, setSelectedOperation] = useState(null);
    const [selectedNumbers, setSelectedNumbers] = useState([]);

    const operations = [
        { id: 'add', label: `${t.add} (+)`, color: '#FF6B6B' },
        { id: 'subtract', label: `${t.sub} (-)`, color: '#4ECDC4' },
        { id: 'multiply', label: `${t.mul} (×)`, color: '#FFE66D' },
        { id: 'divide', label: `${t.div} (÷)`, color: '#6BCB77' },
        { id: 'random', label: `${t.ran} (?)`, color: '#9D4EDD' },
    ];

    const handleOpClick = (opId) => {
        if (opId === 'multiply') {
            if (selectedOperation === 'multiply') {
                // Already selected, do nothing or maybe toggle off (optional)
                // But for now, we just stay in the mode.
            } else {
                setSelectedOperation('multiply');
                // Default to selecting NONE so user can pick specific numbers easily
                setSelectedNumbers([]);
            }
        } else {
            setSelectedOperation(null);
            // Start immediately for others
            onStart(opId, difficulty, [], quizType);
        }
    };

    const toggleNumber = (num) => {
        setSelectedNumbers(prev => {
            if (prev.includes(num)) {
                return prev.filter(n => n !== num);
            } else {
                return [...prev, num].sort((a, b) => a - b);
            }
        });
    };

    const toggleAll = () => {
        if (selectedNumbers.length === 12) {
            setSelectedNumbers([]);
        } else {
            setSelectedNumbers(Array.from({ length: 12 }, (_, i) => i + 1));
        }
    };

    return (
        <div className="game-container fade-in">
            <GameHeader
                onBack={onBack}
                onHome={onHome}
                onToggleMute={onToggleMute}
                isMuted={isMuted}
                title={t.title}
                language={language}
            />

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>

                <h1 className="game-title">
                    {t.title}
                </h1>
                <p className="game-subtitle">
                    {t.subtitle}
                </p>

                {selectedOperation === 'multiply' ? (
                    <div className="fade-in">
                        <h2 style={{ color: '#FFE66D', marginBottom: '1rem' }}>{t.practiceTitle}</h2>
                        <p style={{ marginBottom: '1rem' }}>{t.practicePick}</p>

                        <div className="number-grid">
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                                <button
                                    key={num}
                                    onClick={() => toggleNumber(num)}
                                    className={`btn-number ${selectedNumbers.includes(num) ? 'selected' : ''}`}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={toggleAll} className="btn-secondary">
                                {selectedNumbers.length === 12 ? t.clearAll : t.selectAll}
                            </button>
                            <button
                                className="btn-primary"
                                style={{
                                    backgroundColor: '#FFE66D',
                                    color: 'var(--color-dark)',
                                    width: 'auto',
                                    padding: '0.8rem 3rem',
                                    margin: 0
                                }}
                                onClick={() => onStart('multiply', difficulty, selectedNumbers, quizType)}
                                disabled={selectedNumbers.length === 0}
                            >
                                {t.startGame}
                            </button>
                        </div>

                        <button
                            onClick={() => setSelectedOperation(null)}
                            style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: '#888', textDecoration: 'underline', fontSize: '1rem', cursor: 'pointer' }}
                        >
                            {t.cancel}
                        </button>
                    </div>
                ) : (
                    <>
                        <div style={{ marginBottom: '2rem' }}>
                            <h3>{t.diffLabel}</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                {['easy', 'medium', 'hard'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setDifficulty(level)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '20px',
                                            background: difficulty === level ? 'var(--color-dark)' : 'white',
                                            color: difficulty === level ? 'white' : 'var(--color-dark)',
                                            border: '2px solid var(--color-dark)',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        {level === 'easy' ? t.diffEasy : level === 'medium' ? t.diffMedium : t.diffHard}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3>{t.quizLabel}</h3>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                <button
                                    onClick={() => setQuizType('multiple')}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        background: quizType === 'multiple' ? '#9D4EDD' : 'white',
                                        color: quizType === 'multiple' ? 'white' : 'var(--color-dark)',
                                        border: '2px solid #9D4EDD',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {t.quizMulti}
                                </button>
                                <button
                                    onClick={() => setQuizType('typing')}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        background: quizType === 'typing' ? '#9D4EDD' : 'white',
                                        color: quizType === 'typing' ? 'white' : 'var(--color-dark)',
                                        border: '2px solid #9D4EDD',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                >
                                    {t.quizType}
                                </button>
                            </div>
                        </div>

                        <div className="menu-grid">
                            {operations.map((op) => (
                                <button
                                    key={op.id}
                                    onClick={() => handleOpClick(op.id)}
                                    className="btn-primary btn-menu-item"
                                    style={{
                                        backgroundColor: op.color,
                                        gridColumn: op.id === 'random' ? '1 / -1' : 'auto', // Span full width for random
                                    }}
                                >
                                    <span className="btn-icon">
                                        {op.id === 'add' ? '+' : op.id === 'subtract' ? '-' : op.id === 'multiply' ? '×' : op.id === 'divide' ? '÷' : '?'}
                                    </span>
                                    {op.label.split(' ')[0]}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
