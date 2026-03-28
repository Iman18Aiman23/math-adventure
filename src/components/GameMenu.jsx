import React from 'react';
import GameHeader from './GameHeader';
import { LOCALIZATION } from '../utils/localization';

const OPS = [
    { id: 'add', sym: '➕', color: '#F43F5E', bg: 'linear-gradient(135deg,#ffe4e6,#fecdd3)' },
    { id: 'subtract', sym: '➖', color: '#0EA5E9', bg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)' },
    { id: 'multiply', sym: '✖️', color: '#F59E0B', bg: 'linear-gradient(135deg,#fef9c3,#fde68a)' },
    { id: 'divide', sym: '➗', color: '#10B981', bg: 'linear-gradient(135deg,#d1fae5,#a7f3d0)' },
    { id: 'random', sym: '🎲', color: '#7C3AED', bg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)' },
];

export default function GameMenu({ onStart, isMuted, onToggleMute, onBack, onHome, language }) {
    const t = LOCALIZATION[language].opsDetails;
    const [difficulty, setDifficulty] = React.useState('easy');
    const [quizType, setQuizType] = React.useState('multiple');
    const [selectedOperation, setSelectedOperation] = React.useState(null);
    const [selectedNumbers, setSelectedNumbers] = React.useState([]);

    const getOpLabel = (id) => {
        const map = { add: t.add, subtract: t.sub, multiply: t.mul, divide: t.div, random: t.ran };
        return map[id] || id;
    };

    const handleOpClick = (opId) => {
        if (opId === 'multiply') {
            setSelectedOperation('multiply');
            setSelectedNumbers([]);
        } else {
            setSelectedOperation(null);
            onStart(opId, difficulty, [], quizType);
        }
    };

    const toggleNumber = (num) => {
        setSelectedNumbers(prev =>
            prev.includes(num) ? prev.filter(n => n !== num) : [...prev, num].sort((a, b) => a - b)
        );
    };

    const toggleAll = () => {
        setSelectedNumbers(selectedNumbers.length === 12 ? [] : Array.from({ length: 12 }, (_, i) => i + 1));
    };

    const DIFF = [
        { id: 'easy', label: t.diffEasy, color: '#10B981' },
        { id: 'medium', label: t.diffMedium, color: '#F59E0B' },
        { id: 'hard', label: t.diffHard, color: '#F43F5E' },
    ];
    const QUIZ = [
        { id: 'multiple', label: t.quizMulti, emoji: '🔘' },
        { id: 'typing', label: t.quizType, emoji: '⌨️' },
    ];

    return (
        <div className="game-container fade-in">
            <GameHeader onBack={onBack} onHome={onHome} onToggleMute={onToggleMute} isMuted={isMuted} title={t.title} language={language} />

            <div style={{ width: '100%', maxWidth: '560px', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', overflow: 'hidden' }}>

                {selectedOperation === 'multiply' ? (
                    /* Multiplication Table Picker */
                    <div className="card fade-in" style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'auto' }}>
                        <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>✖️</div>
                        <h2 className="game-title" style={{ marginBottom: '0.3rem', fontSize: 'clamp(1.2rem,5vw,1.8rem)' }}>{t.practiceTitle}</h2>
                        <p style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.75rem' }}>{t.practicePick}</p>

                        <div className="number-grid">
                            {Array.from({ length: 12 }, (_, i) => i + 1).map(num => (
                                <button key={num} onClick={() => toggleNumber(num)}
                                    className={`btn-number ${selectedNumbers.includes(num) ? 'selected' : ''}`}>
                                    {num}
                                </button>
                            ))}
                        </div>

                        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button onClick={toggleAll} className="btn-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                {selectedNumbers.length === 12 ? t.clearAll : t.selectAll}
                            </button>
                            <button
                                className="btn-primary"
                                style={{ background: 'linear-gradient(135deg,#F59E0B,#fbbf24)', padding: '0.6rem 1.5rem', margin: 0, fontSize: '1rem' }}
                                onClick={() => onStart('multiply', difficulty, selectedNumbers, quizType)}
                                disabled={selectedNumbers.length === 0}
                            >
                                {t.startGame} 🚀
                            </button>
                        </div>

                        <button
                            onClick={() => setSelectedOperation(null)}
                            style={{ marginTop: '0.75rem', background: 'none', border: 'none', color: '#9ca3af', textDecoration: 'underline', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                            {t.cancel}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Settings Card – compact */}
                        <div className="card" style={{ padding: '0.75rem 1rem' }}>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                                {/* Difficulty */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <span className="mobile-wrap-label" style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: '#374151', whiteSpace: 'nowrap' }}>{t.diffLabel}:</span>
                                    {DIFF.map(d => (
                                        <button key={d.id} onClick={() => setDifficulty(d.id)}
                                            style={{
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '999px',
                                                background: difficulty === d.id ? d.color : 'white',
                                                color: difficulty === d.id ? 'white' : '#374151',
                                                border: `2px solid ${d.color}`,
                                                fontFamily: 'var(--font-heading)',
                                                fontSize: '0.82rem',
                                                transition: 'all 0.15s',
                                                boxShadow: difficulty === d.id ? `0 2px 0 ${d.color}88` : 'none',
                                            }}>
                                            {d.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Quiz Type */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <span className="mobile-wrap-label" style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', color: '#374151', whiteSpace: 'nowrap' }}>{t.quizLabel}:</span>
                                    {QUIZ.map(q => (
                                        <button key={q.id} onClick={() => setQuizType(q.id)}
                                            style={{
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '999px',
                                                background: quizType === q.id ? '#7C3AED' : 'white',
                                                color: quizType === q.id ? 'white' : '#374151',
                                                border: '2px solid #7C3AED',
                                                fontFamily: 'var(--font-heading)',
                                                fontSize: '0.82rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.25rem',
                                                transition: 'all 0.15s',
                                                boxShadow: quizType === q.id ? '0 2px 0 #5b21b6' : 'none',
                                            }}>
                                            {q.emoji} {q.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Operation Buttons – 2x2 grid + random full-width */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', width: '100%' }}>
                            {OPS.filter(op => op.id !== 'random').map(op => (
                                <button
                                    key={op.id}
                                    onClick={() => handleOpClick(op.id)}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.25rem',
                                        height: 'clamp(4rem,11vh,5.5rem)',
                                        borderRadius: '1.25rem',
                                        background: op.bg,
                                        border: `3px solid ${op.color}30`,
                                        color: op.color,
                                        boxShadow: `0 4px 0 ${op.color}40`,
                                        fontFamily: 'var(--font-heading)',
                                        cursor: 'pointer',
                                        transition: 'transform 0.15s, box-shadow 0.15s',
                                    }}
                                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                    onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                    onMouseDown={e => { e.currentTarget.style.transform = 'translateY(3px)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 0 ${op.color}40`; }}
                                >
                                    <span style={{ fontSize: 'clamp(1.4rem,5vw,2rem)', lineHeight: 1 }}>{op.sym}</span>
                                    <span style={{ fontSize: 'clamp(0.85rem,3vw,1rem)' }}>{getOpLabel(op.id)}</span>
                                </button>
                            ))}
                        </div>
                        {/* Random – full width */}
                        {OPS.filter(op => op.id === 'random').map(op => (
                            <button
                                key={op.id}
                                onClick={() => handleOpClick(op.id)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    height: 'clamp(3.2rem,9vh,4.5rem)',
                                    borderRadius: '1.25rem',
                                    background: op.bg,
                                    border: `3px solid ${op.color}30`,
                                    color: op.color,
                                    boxShadow: `0 4px 0 ${op.color}40`,
                                    fontFamily: 'var(--font-heading)',
                                    cursor: 'pointer',
                                    width: '100%',
                                    transition: 'transform 0.15s, box-shadow 0.15s',
                                    fontSize: 'clamp(0.9rem,3.5vw,1.1rem)',
                                }}
                                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(3px)'; e.currentTarget.style.boxShadow = 'none'; }}
                                onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = `0 4px 0 ${op.color}40`; }}
                            >
                                <span style={{ fontSize: 'clamp(1.4rem,5vw,1.8rem)', lineHeight: 1 }}>{op.sym}</span>
                                <span>{getOpLabel(op.id)}</span>
                            </button>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
