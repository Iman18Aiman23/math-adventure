import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, RefreshCw, Trophy, Star, Home } from 'lucide-react';
import { JAWI_ALPHABET } from '../utils/jawiData';
import { playSound } from '../utils/soundManager';
import clsx from 'clsx';
import confetti from 'canvas-confetti';

const CARD_COLORS = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#FFE66D', // Yellow
    '#FF8C42', // Orange
    '#9D4EDD', // Purple
    '#6BCB77', // Green
    '#4D96FF', // Blue
    '#FF7878', // Coral
    '#A8E6CF', // Mint
    '#FFD3B6', // Peach
    '#6665EE', // Indigo
    '#FF9A9E'  // Pink
];

const JawiSelectionGrid = ({ selected, onToggle, onSelectAll, onClearAll }) => {
    return (
        <div className="fade-in">
            <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Select characters to practice matching:</p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                gap: '0.8rem',
                maxWidth: '600px',
                margin: '0 auto'
            }}>
                {JAWI_ALPHABET.map((item, idx) => (
                    <button
                        key={idx}
                        onClick={() => onToggle(item)}
                        className={clsx('btn-number', selected.some(s => s.jawi === item.jawi) && 'selected')}
                        style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
                    >
                        {item.jawi}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={onSelectAll} className="btn-secondary">Select All</button>
                <button onClick={onClearAll} className="btn-secondary">Clear All</button>
            </div>
        </div>
    );
};

export default function JawiMatchGame({ onBack, onHome, isMuted }) {
    const [gameState, setGameState] = useState('setup'); // 'setup' | 'playing' | 'won'
    const [selectedAlphabets, setSelectedAlphabets] = useState([]);
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]); // indices of flipped cards
    const [matched, setMatched] = useState([]); // pairs of matched IDs
    const [moves, setMoves] = useState(0);
    const [isLock, setIsLock] = useState(false);

    const toggleAlphabet = (item) => {
        setSelectedAlphabets(prev => {
            if (prev.some(s => s.jawi === item.jawi)) {
                return prev.filter(s => s.jawi !== item.jawi);
            } else {
                return [...prev, item];
            }
        });
    };

    const initGame = useCallback(() => {
        if (selectedAlphabets.length === 0) return;

        // Shuffle selected alphabet
        const selected = [...selectedAlphabets].sort(() => Math.random() - 0.5);

        // Create cards (one Jawi, one Rumi for each pair)
        const gameCards = [];
        selected.forEach((item, index) => {
            const color = CARD_COLORS[index % CARD_COLORS.length];
            gameCards.push({
                id: `${index}-jawi`,
                pairId: index,
                content: item.jawi,
                type: 'jawi',
                isFlipped: false,
                color
            });
            gameCards.push({
                id: `${index}-rumi`,
                pairId: index,
                content: item.rumi,
                type: 'rumi',
                isFlipped: false,
                color
            });
        });

        setCards(gameCards.sort(() => Math.random() - 0.5));
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setGameState('playing');
        setIsLock(false);
    }, [selectedAlphabets]);

    const handleCardClick = (index) => {
        if (isLock || flipped.includes(index) || matched.includes(cards[index].pairId)) return;

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            setIsLock(true);

            const [firstIdx, secondIdx] = newFlipped;
            const firstCard = cards[firstIdx];
            const secondCard = cards[secondIdx];

            if (firstCard.pairId === secondCard.pairId) {
                // Match!
                setMatched([...matched, firstCard.pairId]);
                setFlipped([]);
                setIsLock(false);
                playSound('correct');

                if (matched.length + 1 === selectedAlphabets.length) {
                    setGameState('won');
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            } else {
                // No match
                setTimeout(() => {
                    setFlipped([]);
                    setIsLock(false);
                }, 1000);
            }
        }
    };

    if (gameState === 'setup') {
        return (
            <div className="card fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <ArrowLeft size={32} />
                    </button>
                    <button onClick={onHome} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Home size={28} />
                    </button>
                </div>
                <h1 className="game-title" style={{ color: '#9D4EDD', fontSize: '2.5rem' }}>Jawi Match Game</h1>

                <JawiSelectionGrid
                    selected={selectedAlphabets}
                    onToggle={toggleAlphabet}
                    onSelectAll={() => setSelectedAlphabets([...JAWI_ALPHABET])}
                    onClearAll={() => setSelectedAlphabets([])}
                />

                <button
                    className="btn-primary"
                    onClick={initGame}
                    disabled={selectedAlphabets.length < 2}
                    style={{
                        backgroundColor: '#FF8C42',
                        marginTop: '2rem',
                        padding: '1rem 3rem',
                        fontSize: '1.4rem',
                        opacity: selectedAlphabets.length < 2 ? 0.5 : 1
                    }}
                >
                    {selectedAlphabets.length < 2 ? 'Select at least 2' : 'Start Game!'}
                </button>
            </div>
        );
    }

    if (gameState === 'won') {
        return (
            <div className="card fade-in" style={{ textAlign: 'center', padding: '4rem' }}>
                <Trophy size={100} color="gold" style={{ marginBottom: '2rem' }} />
                <h1 className="game-title" style={{ color: '#9D4EDD' }}>Hebat! (Great!)</h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>You matched {selectedAlphabets.length} pairs in <strong>{moves}</strong> moves!</p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn-secondary" onClick={() => setGameState('setup')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <ArrowLeft size={20} /> Selection
                    </button>
                    <button className="btn-primary" onClick={initGame} style={{ backgroundColor: '#FF8C42', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <RefreshCw size={20} /> Restart
                    </button>
                </div>
            </div>
        );
    }

    // Dynamic grid estimation
    const getColumns = () => {
        const count = cards.length;
        if (count <= 8) return 4;
        if (count <= 16) return 4;
        if (count <= 24) return 6;
        return 8;
    };

    return (
        <div style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setGameState('setup')} style={{ background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <ArrowLeft size={24} />
                    </button>
                    <button onClick={onHome} style={{ background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                        <Home size={22} />
                    </button>
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Matches: {matched.length} / {selectedAlphabets.length} | Moves: {moves}
                </div>
                <button onClick={initGame} style={{ background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <RefreshCw size={24} />
                </button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
                gap: '0.5rem',
                maxWidth: getColumns() > 4 ? '1000px' : '600px',
                margin: '0 auto',
                perspective: '1000px'
            }}>
                {cards.map((card, idx) => {
                    const isFlipped = flipped.includes(idx) || matched.includes(card.pairId);

                    return (
                        <div
                            key={card.id}
                            onClick={() => handleCardClick(idx)}
                            style={{
                                cursor: isFlipped ? 'default' : 'pointer',
                                height: getColumns() > 6 ? '80px' : '100px',
                                position: 'relative',
                                transformStyle: 'preserve-3d',
                                transition: 'transform 0.6s',
                                transform: isFlipped ? 'rotateY(180deg)' : 'none'
                            }}
                        >
                            {/* Card Front (Hidden) */}
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden',
                                backgroundColor: card.color, // Colorful front
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }}>
                                <Star color="white" fill="white" size={24} opacity={0.3} />
                            </div>

                            {/* Card Back (Content) */}
                            <div style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden',
                                transform: 'rotateY(180deg)',
                                backgroundColor: matched.includes(card.pairId) ? '#6BCB77' : 'white',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: `2px solid ${matched.includes(card.pairId) ? '#6BCB77' : card.color}`,
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                fontSize: card.type === 'jawi' ? '2.5rem' : '1.2rem',
                                color: matched.includes(card.pairId) ? 'white' : '#333',
                                fontWeight: 'bold',
                                padding: '5px',
                                textAlign: 'center'
                            }}>
                                {card.content}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
