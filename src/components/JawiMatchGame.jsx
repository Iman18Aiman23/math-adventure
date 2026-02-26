import React, { useState, useEffect, useCallback } from 'react';
import { playSound } from '../utils/soundManager';
import clsx from 'clsx';
import confetti from 'canvas-confetti';
import { LOCALIZATION } from '../utils/localization';
import GameHeader from './GameHeader';
import { JAWI_ALPHABET } from '../utils/jawiData';
import { Trophy, Star, RefreshCw, ArrowLeft } from 'lucide-react';

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

const JawiSelectionGrid = ({ selected, onToggle, onSelectAll, onClearAll, t }) => {
    return (
        <div className="fade-in">
            <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{t.selectChar}</p>

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
                        style={{
                            width: '60px',
                            height: '60px',
                            fontSize: '1.5rem',
                            opacity: (!selected.some(s => s.jawi === item.jawi) && selected.length >= 6) ? 0.5 : 1,
                            cursor: (!selected.some(s => s.jawi === item.jawi) && selected.length >= 6) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {item.jawi}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={onSelectAll} className="btn-secondary">{t.random6}</button>
                <button onClick={onClearAll} className="btn-secondary">{t.clearAll}</button>
            </div>
        </div>
    );
};

export default function JawiMatchGame({ onBack, onHome, isMuted, language }) {
    const t = LOCALIZATION[language].jawiGames;
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
                if (prev.length >= 6) return prev;
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
            <div className="game-container fade-in">
                <GameHeader onBack={onBack} onHome={onHome} title={t.matchTitle} language={language} />

                <div className="card" style={{ textAlign: 'center', padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                    <h1 className="game-title" style={{ color: '#9D4EDD', fontSize: '2.5rem' }}>{t.matchTitle}</h1>

                    <JawiSelectionGrid
                        selected={selectedAlphabets}
                        onToggle={toggleAlphabet}
                        onSelectAll={() => {
                            const random = [...JAWI_ALPHABET].sort(() => Math.random() - 0.5).slice(0, 6);
                            setSelectedAlphabets(random);
                        }}
                        onClearAll={() => setSelectedAlphabets([])}
                        t={t}
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
                        {selectedAlphabets.length < 2 ? t.selectAtLeast2 : t.startGame}
                    </button>
                </div>
            </div>
        );
    }

    if (gameState === 'won') {
        return (
            <div className="game-container fade-in">
                <GameHeader onBack={() => setGameState('setup')} onHome={onHome} title={t.matchTitle} language={language} />
                <div className="card" style={{ textAlign: 'center', padding: '4rem', maxWidth: '600px', margin: '2rem auto' }}>
                    <Trophy size={100} color="gold" style={{ marginBottom: '2rem' }} />
                    <h1 className="game-title" style={{ color: '#9D4EDD' }}>{t.great}</h1>
                    <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{t.matchSummary.replace('{count}', selectedAlphabets.length).replace('{moves}', moves)}</p>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button className="btn-secondary" onClick={() => setGameState('setup')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ArrowLeft size={20} /> {t.selection}
                        </button>
                        <button className="btn-primary" onClick={initGame} style={{ backgroundColor: '#FF8C42', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <RefreshCw size={20} /> {t.restart}
                        </button>
                    </div>
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
        <div className="game-container fade-in">
            <GameHeader
                onBack={onBack}
                onHome={onHome}
                title={t.matchTitle}
                language={language}
                score={moves}
            />

            <div className="card" style={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: '1rem 0.5rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '0.5rem',
                    flex: 1,
                    alignContent: 'center'
                }}>
                    {cards.map((card, idx) => {
                        const isCardFlipped = flipped.includes(idx);
                        const isCardMatched = matched.includes(card.pairId);

                        return (
                            <div
                                key={card.id}
                                onClick={() => handleCardClick(idx)}
                                style={{
                                    height: 'clamp(5rem, 15vh, 8rem)',
                                    borderRadius: '1rem',
                                    padding: '0.25rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    transform: isCardFlipped || isCardMatched ? 'rotateY(180deg)' : 'rotateY(0)',
                                    transformStyle: 'preserve-3d',
                                    position: 'relative',
                                    background: isCardMatched ? '#6BCB77' : 'white',
                                    border: `3px solid ${isCardMatched ? '#6BCB77' : (isCardFlipped ? '#9D4EDD' : '#eee')}`,
                                    boxShadow: isCardFlipped ? '0 10px 20px rgba(157, 78, 221, 0.2)' : '0 4px 10px rgba(0,0,0,0.05)'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    top: 0,
                                    left: 0
                                }}>
                                    <Star size={32} color={card.color} opacity={0.3} />
                                </div>

                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: card.type === 'jawi' ? 'clamp(1.5rem, 4vw, 2.2rem)' : 'clamp(0.9rem, 3vw, 1.2rem)',
                                    color: isCardMatched ? 'white' : '#333',
                                    textAlign: 'center',
                                    top: 0,
                                    left: 0,
                                    padding: '0.25rem'
                                }}>
                                    {card.content}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem'
                }}>
                    <button
                        className="btn-primary"
                        onClick={initGame}
                        style={{
                            padding: '0.8rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            margin: 0
                        }}
                    >
                        <RefreshCw size={20} />
                        {t.restart}
                    </button>
                </div>
            </div>
        </div>
    );
}
