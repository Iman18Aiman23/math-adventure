import { Play, Star, Settings, Volume2, VolumeX, Home } from 'lucide-react';

export default function GameMenu({ onStart, isMuted, onToggleMute, onBack }) {
    const [difficulty, setDifficulty] = React.useState('easy');
    const [quizType, setQuizType] = React.useState('multiple');
    const [selectedOperation, setSelectedOperation] = React.useState(null);
    const [selectedNumbers, setSelectedNumbers] = React.useState([]);

    const operations = [
        { id: 'add', label: 'Addition (+)', color: '#FF6B6B' },
        { id: 'subtract', label: 'Subtraction (-)', color: '#4ECDC4' },
        { id: 'multiply', label: 'Multiplication (×)', color: '#FFE66D' },
        { id: 'divide', label: 'Division (÷)', color: '#6BCB77' },
        { id: 'random', label: 'Random (?)', color: '#9D4EDD' },
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
        <div className="card fade-in" style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            {/* Home/Back Button */}
            <button
                onClick={onBack}
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(0,0,0,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
                title="Go to Subject Selection"
            >
                <Home size={24} color="var(--color-dark)" />
            </button>

            {/* Mute Button */}
            <button
                onClick={onToggleMute}
                style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'rgba(0,0,0,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                }}
                title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
                {isMuted ? <VolumeX size={24} color="#888" /> : <Volume2 size={24} color="#4ECDC4" />}
            </button>

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
                            onClick={() => onStart('multiply', difficulty, selectedNumbers, quizType)}
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

                    <div style={{ marginBottom: '2rem' }}>
                        <h3>Quiz Type</h3>
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
                                🔘 Multiple Choice
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
                                ⌨️ Type Answer
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
    );
}
