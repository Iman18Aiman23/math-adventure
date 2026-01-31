import React from 'react';
import { Play, Star, Settings } from 'lucide-react';

export default function GameMenu({ onStart }) {
    const [difficulty, setDifficulty] = React.useState('medium');
    const [selectedOperation, setSelectedOperation] = React.useState(null);
    const [selectedNumbers, setSelectedNumbers] = React.useState([]);

    const operations = [
        { id: 'add', label: 'Addition (+)', color: '#FF6B6B' },
        { id: 'subtract', label: 'Subtraction (-)', color: '#4ECDC4' },
        { id: 'multiply', label: 'Multiplication (×)', color: '#FFE66D' },
        { id: 'divide', label: 'Division (÷)', color: '#6BCB77' },
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
            onStart(opId, difficulty, []);
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
        <div className="card fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 className="game-title">
                Math Adventure With Iman
            </h1>
            <p className="game-subtitle">
                Select your challenge!
            </p>

            {selectedOperation === 'multiply' ? (
                <div className="fade-in">
                    <h2 style={{ color: '#FFE66D', marginBottom: '1rem' }}>Practice Times Tables</h2>
                    <p style={{ marginBottom: '1rem' }}>Select numbers to practice:</p>

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
                            {selectedNumbers.length === 12 ? 'Clear All' : 'Select All'}
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
                            onClick={() => onStart('multiply', difficulty, selectedNumbers)}
                            disabled={selectedNumbers.length === 0}
                        >
                            Start Game!
                        </button>
                    </div>

                    <button
                        onClick={() => setSelectedOperation(null)}
                        style={{ marginTop: '1.5rem', background: 'none', border: 'none', color: '#888', textDecoration: 'underline', fontSize: '1rem', cursor: 'pointer' }}
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <>
                    <div style={{ marginBottom: '2rem' }}>
                        <h3>Difficulty</h3>
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
                                    {level}
                                </button>
                            ))}
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
                                }}
                            >
                                <span className="btn-icon">
                                    {op.id === 'add' ? '+' : op.id === 'subtract' ? '-' : op.id === 'multiply' ? '×' : '÷'}
                                </span>
                                {op.label.split(' ')[0]}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
