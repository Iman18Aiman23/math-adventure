import React, { useState, useEffect, useCallback } from 'react';
import { playSound } from '../../utils/soundManager';
import confetti from 'canvas-confetti';
import { LOCALIZATION } from '../../utils/localization';
import { RefreshCw, ArrowLeft, Check, Zap, Clock, Star } from 'lucide-react';
import { useGameStateContext } from '../../App';
import { getGameData, addCorrectAnswer, deductHeart } from '../../utils/gameStatsManager';
import { JAWI_ALPHABET } from '../../utils/jawiData';
import AppHeader from '../AppHeader';

const DIFFICULTIES = {
    easy:   { cols: 4, rows: 3, pairs: 6,  label: 'Easy' },
    medium: { cols: 4, rows: 4, pairs: 8,  label: 'Medium' },
    hard:   { cols: 5, rows: 4, pairs: 10, label: 'Hard' }
};

export default function JawiMatchGame({ onBack, onHome, isMuted, language }) {
    const t = LOCALIZATION[language].jawiGames;
    const gameState = useGameStateContext();
    const [localGameState, setLocalGameState] = useState('setup'); // 'setup' | 'playing' | 'won'
    const [setupStage, setSetupStage] = useState('difficulty'); // 'difficulty' | 'alphabet'
    const [difficulty, setDifficulty] = useState('easy');
    const [selectedAlphabets, setSelectedAlphabets] = useState([]);
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [matchedPairIds, setMatchedPairIds] = useState([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [isLock, setIsLock] = useState(false);
    const [timerInterval, setTimerInterval] = useState(null);
    const [stars, setStars] = useState(0);
    const [hearts, setHearts] = useState(3);
    const [gems, setGems] = useState(0);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
      const gameData = getGameData();
      setHearts(gameData.hearts);
      setGems(gameData.gems);
      setStars(gameData.stars);
      setStreak(gameData.streak);
    }, []);

    useEffect(() => {
        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [timerInterval]);

    useEffect(() => {
        if (localGameState === 'won' && timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
        }
    }, [localGameState, timerInterval]);

    const shuffle = (arr) => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    useEffect(() => {
        if (gameStarted && timerInterval === null) {
            const interval = setInterval(() => {
                setTimerSeconds(t => t + 1);
            }, 1000);
            setTimerInterval(interval);
        }
    }, [gameStarted, timerInterval]);

    const initGame = useCallback(() => {
        if (timerInterval) {
            clearInterval(timerInterval);
            setTimerInterval(null);
        }

        // Create cards from selected alphabets (Jawi and Rumi pairs)
        const gameCards = [];
        selectedAlphabets.forEach((item, index) => {
            gameCards.push({
                id: `${index}-jawi`,
                pairId: index,
                content: item.jawi,
                type: 'jawi'
            });
            gameCards.push({
                id: `${index}-rumi`,
                pairId: index,
                content: item.rumi,
                type: 'rumi'
            });
        });

        setCards(shuffle(gameCards));
        setFlipped([]);
        setMatchedPairs(0);
        setMatchedPairIds([]);
        setMoves(0);
        setScore(0);
        setTimerSeconds(0);
        setGameStarted(false);
        setLocalGameState('playing');
        setIsLock(false);
    }, [selectedAlphabets, timerInterval]);

    const handleCardClick = (index) => {
        if (isLock || flipped.includes(index) || matchedPairIds.includes(cards[index].pairId)) return;

        const diff = DIFFICULTIES[difficulty];

        if (!gameStarted) {
            setGameStarted(true);
        }

        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            setIsLock(true);

            const [i1, i2] = newFlipped;
            if (cards[i1].pairId === cards[i2].pairId) {
                // Match!
                const newMatchedPairs = matchedPairs + 1;
                const pairId = cards[i1].pairId;
                setTimeout(() => {
                    setMatchedPairs(newMatchedPairs);
                    setMatchedPairIds(prev => [...prev, pairId]);
                    const matchScore = 100;
                    setScore(s => s + matchScore);
                    setFlipped([]);
                    setIsLock(false);
                    playSound('correct');

                    const gameData = addCorrectAnswer();
                    setGems(gameData.gems);
                    setStars(gameData.stars);
                    setStreak(gameData.streak);

                    if (newMatchedPairs === diff.pairs) {
                        handleWin(diff, newMatchedPairs);
                    }
                }, 350);
            } else {
                // No match
                setTimeout(() => {
                    setFlipped([]);
                    setIsLock(false);
                }, 1000);

                playSound('wrong');
                const gameData = deductHeart();
                setHearts(gameData.hearts);
                setStreak(gameData.streak);
            }
        }
    };

    const handleWin = useCallback((diff, finalMatches) => {
        playSound('correct');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            setLocalGameState('won');
        }, 600);
    }, []);

    if (localGameState === 'setup') {
        const diff = DIFFICULTIES[difficulty];

        // Show alphabet selection stage
        if (setupStage === 'alphabet') {
            return (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#FFF8E1' }}>
                    <AppHeader onBack={onBack} gameState={gameState} language={language} hearts={hearts} gems={gems} stars={stars} />
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', paddingTop: '2rem', textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.2,
                        marginBottom: '0.3rem',
                        background: 'linear-gradient(135deg, #4FC3F7, #66BB6A, #FFD54F, #FF6B9D)',
                        backgroundSize: '300% 300%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        animation: 'gradShift 5s ease infinite',
                        padding: '0.5rem 0'
                    }}>
                        Select Jawi Alphabet
                    </h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
                        color: '#636E72',
                        marginBottom: '1rem',
                        fontWeight: 600
                    }}>
                        {diff.label} - Choose {diff.pairs} alphabets
                    </p>
                    <p style={{
                        fontSize: '0.95rem',
                        color: '#636E72',
                        marginBottom: '2rem',
                        fontWeight: 500
                    }}>
                        Selected: {selectedAlphabets.length}/{diff.pairs}
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                        gap: '0.8rem',
                        maxWidth: '600px',
                        margin: '0 auto',
                        marginBottom: '2rem',
                        width: '100%'
                    }}>
                        {JAWI_ALPHABET.map((item, idx) => {
                            const isSelected = selectedAlphabets.some(s => s.jawi === item.jawi);
                            const canSelect = isSelected || selectedAlphabets.length < diff.pairs;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (isSelected) {
                                            setSelectedAlphabets(prev => prev.filter(s => s.jawi !== item.jawi));
                                        } else if (canSelect) {
                                            setSelectedAlphabets(prev => [...prev, item]);
                                        }
                                    }}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        fontSize: '1.5rem',
                                        padding: '0.5rem',
                                        borderRadius: '12px',
                                        border: isSelected ? '3px solid #66BB6A' : '2px solid #ddd',
                                        cursor: canSelect ? 'pointer' : 'not-allowed',
                                        fontFamily: 'var(--font-heading)',
                                        fontWeight: 700,
                                        background: isSelected
                                            ? 'linear-gradient(135deg, #C8E6C9, #A5D6A7)'
                                            : 'white',
                                        color: isSelected ? '#2E7D32' : '#2D3436',
                                        opacity: canSelect ? 1 : 0.5,
                                        transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                                        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                                        boxShadow: isSelected ? '0 4px 12px rgba(102,187,106,0.3)' : 'none'
                                    }}
                                >
                                    {item.jawi}
                                </button>
                            );
                        })}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
                        <button
                            onClick={() => {
                                setSetupStage('difficulty');
                                setSelectedAlphabets([]);
                            }}
                            style={{
                                padding: '0.8rem 2rem',
                                borderRadius: '20px',
                                border: '2px solid #ddd',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                background: 'white',
                                color: '#2D3436',
                                transition: 'all 0.3s'
                            }}
                        >
                            Back
                        </button>
                        <button
                            onClick={() => {
                                const random = shuffle(JAWI_ALPHABET).slice(0, diff.pairs);
                                setSelectedAlphabets(random);
                            }}
                            style={{
                                padding: '0.8rem 2rem',
                                borderRadius: '20px',
                                border: '2px solid #FFD54F',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                background: 'linear-gradient(135deg, #FFE66D, #FFD54F)',
                                color: '#E65100',
                                transition: 'all 0.3s'
                            }}
                        >
                            Random
                        </button>
                        <button
                            onClick={() => setSelectedAlphabets([])}
                            style={{
                                padding: '0.8rem 2rem',
                                borderRadius: '20px',
                                border: '2px solid #FF6B6B',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                background: 'linear-gradient(135deg, #FFB0B0, #FF8787)',
                                color: '#C92A2A',
                                transition: 'all 0.3s'
                            }}
                        >
                            Clear All
                        </button>
                    </div>

                    <button
                        onClick={initGame}
                        disabled={selectedAlphabets.length !== diff.pairs}
                        style={{
                            padding: '1rem 3.5rem',
                            fontSize: '1.4rem',
                            fontWeight: 800,
                            fontFamily: 'var(--font-heading)',
                            border: 'none',
                            borderRadius: '50px',
                            cursor: selectedAlphabets.length === diff.pairs ? 'pointer' : 'not-allowed',
                            color: 'white',
                            background: 'linear-gradient(135deg, #FF6B9D, #E91E63)',
                            boxShadow: '0 6px 30px rgba(255,107,157,0.4)',
                            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                            opacity: selectedAlphabets.length === diff.pairs ? 1 : 0.5
                        }}
                    >
                        Start Game
                    </button>

                    <div style={{
                        marginTop: '2rem',
                        maxWidth: '460px',
                        textAlign: 'left',
                        background: 'rgba(255,255,255,0.75)',
                        borderRadius: '20px',
                        padding: '1.4rem 1.6rem',
                        boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                            💡 How to Play
                        </h3>
                        <ol style={{
                            paddingLeft: '1.2rem',
                            fontWeight: 600,
                            color: '#636E72',
                            lineHeight: 1.9,
                            fontSize: '0.95rem'
                        }}>
                            <li>Click any card to flip it over</li>
                            <li>Find two cards with matching Jawi and Rumi</li>
                            <li>Match all pairs to win the game</li>
                            <li>Fewer moves and faster time means a higher score</li>
                        </ol>
                    </div>

                    <style>{`
                        @keyframes gradShift {
                            0%, 100% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                        }
                    `}</style>
                    </div>
                </div>
            );
        }

        // Show difficulty selection stage
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#FFF8E1' }}>
                <AppHeader onBack={onBack} gameState={gameState} language={language} hearts={hearts} gems={gems} stars={stars} />
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', paddingTop: '3rem', textAlign: 'center' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 800,
                    lineHeight: 1.2,
                    marginBottom: '0.3rem',
                    background: 'linear-gradient(135deg, #4FC3F7, #66BB6A, #FFD54F, #FF6B9D)',
                    backgroundSize: '300% 300%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradShift 5s ease infinite',
                    padding: '0.5rem 0'
                }}>
                    Memory Match
                </h1>
                <p style={{
                    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                    color: '#636E72',
                    marginBottom: '2rem',
                    fontWeight: 600
                }}>
                    Flip cards, find pairs, and train your brain
                </p>

                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}>
                    {Object.entries(DIFFICULTIES).map(([key, diff]) => (
                        <button
                            key={key}
                            onClick={() => {
                                setDifficulty(key);
                                setSetupStage('alphabet');
                                setSelectedAlphabets([]);
                            }}
                            style={{
                                padding: '1.1rem 2rem',
                                borderRadius: '20px',
                                border: `3px solid ${difficulty === key && setupStage === 'difficulty' ? '#66BB6A' : 'transparent'}`,
                                cursor: 'pointer',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                fontSize: '1.05rem',
                                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                                background: key === 'easy'
                                    ? 'linear-gradient(135deg, #C8E6C9, #A5D6A7)'
                                    : key === 'medium'
                                    ? 'linear-gradient(135deg, #BBDEFB, #90CAF9)'
                                    : 'linear-gradient(135deg, #FFCCBC, #FFAB91)',
                                color: key === 'easy'
                                    ? '#2E7D32'
                                    : key === 'medium'
                                    ? '#1565C0'
                                    : '#E65100',
                                boxShadow: difficulty === key && setupStage === 'difficulty'
                                    ? '0 6px 28px rgba(102,187,106,0.55), 0 0 0 4px rgba(102,187,106,0.2)'
                                    : '0 4px 15px rgba(0,0,0,0.1)',
                                transform: difficulty === key && setupStage === 'difficulty' ? 'translateY(-2px) scale(1.03)' : 'none'
                            }}
                        >
                            <div style={{ fontSize: '1.25rem', display: 'block' }}>
                                {diff.label}
                            </div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 600, opacity: 0.75, display: 'block' }}>
                                {diff.cols} × {diff.rows} Grid
                            </div>
                        </button>
                    ))}
                </div>

                <div style={{
                    marginTop: '2rem',
                    maxWidth: '460px',
                    textAlign: 'left',
                    background: 'rgba(255,255,255,0.75)',
                    borderRadius: '20px',
                    padding: '1.4rem 1.6rem',
                    boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
                }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                        💡 How to Play
                    </h3>
                    <ol style={{
                        paddingLeft: '1.2rem',
                        fontWeight: 600,
                        color: '#636E72',
                        lineHeight: 1.9,
                        fontSize: '0.95rem'
                    }}>
                        <li>Click any card to flip it over</li>
                        <li>Find two cards with matching Jawi and Rumi</li>
                        <li>Match all pairs to win the game</li>
                        <li>Fewer moves and faster time means a higher score</li>
                    </ol>
                </div>

                <style>{`
                    @keyframes gradShift {
                        0%, 100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }
                `}</style>
                </div>
            </div>
        );
    }

    if (localGameState === 'won') {
        const diff = DIFFICULTIES[difficulty];
        const minMoves = diff.pairs;
        const moveRatio = moves / minMoves;
        let starCount = 1;
        if (moveRatio <= 1.5) starCount = 3;
        else if (moveRatio <= 2.2) starCount = 2;

        return (
            <div style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
                zIndex: 200
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '30px',
                    padding: '2.5rem 2rem',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: 'modalPop 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '5px',
                        background: 'linear-gradient(90deg, #4FC3F7, #66BB6A, #FFD54F, #FF6B9D)'
                    }}/>

                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        marginBottom: '0.3rem',
                        background: 'linear-gradient(135deg, #FFD700, #FF9800)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Congratulations!
                    </h2>
                    <p style={{
                        color: '#636E72',
                        fontWeight: 600,
                        marginBottom: '0.5rem'
                    }}>
                        You matched all the pairs
                    </p>

                    <div style={{
                        fontSize: '2.4rem',
                        margin: '0.6rem 0',
                        letterSpacing: '0.5rem'
                    }}>
                        {Array(3).fill(0).map((_, i) => (
                            <span key={i} style={{
                                opacity: i < starCount ? 1 : 0.2,
                                filter: i < starCount ? 'drop-shadow(0 0 6px rgba(255,215,0,0.6))' : 'none'
                            }}>
                                ★
                            </span>
                        ))}
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '0.7rem',
                        margin: '1.2rem 0'
                    }}>
                        <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
                            <div style={{ fontSize: '0.82rem', color: '#636E72', fontWeight: 600 }}>Moves</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{moves}</div>
                        </div>
                        <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
                            <div style={{ fontSize: '0.82rem', color: '#636E72', fontWeight: 600 }}>Time</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>
                                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                            </div>
                        </div>
                        <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
                            <div style={{ fontSize: '0.82rem', color: '#636E72', fontWeight: 600 }}>Score</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FF6B9D' }}>{score}</div>
                        </div>
                        <div style={{ background: '#f8f9fa', borderRadius: '14px', padding: '0.7rem' }}>
                            <div style={{ fontSize: '0.82rem', color: '#636E72', fontWeight: 600 }}>Matches</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{matchedPairs}/{selectedAlphabets.length}</div>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '0.7rem',
                        justifyContent: 'center',
                        marginTop: '1.2rem'
                    }}>
                        <button
                            onClick={() => setLocalGameState('setup')}
                            style={{
                                padding: '0.6rem 1.4rem',
                                borderRadius: '14px',
                                border: '2px solid #ddd',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                background: 'white',
                                color: '#2D3436',
                                transition: 'all 0.25s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem'
                            }}
                        >
                            <ArrowLeft size={16} /> Menu
                        </button>
                        <button
                            onClick={() => initGame()}
                            style={{
                                padding: '0.6rem 1.4rem',
                                borderRadius: '14px',
                                border: '2px solid #4FC3F7',
                                fontFamily: 'var(--font-heading)',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                background: 'linear-gradient(135deg, #4FC3F7, #0288D1)',
                                color: 'white',
                                transition: 'all 0.25s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.35rem'
                            }}
                        >
                            <RefreshCw size={16} /> Play Again
                        </button>
                    </div>

                    <style>{`
                        @keyframes modalPop {
                            0% { transform: scale(0.4); opacity: 0; }
                            100% { transform: scale(1); opacity: 1; }
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    const diff = DIFFICULTIES[difficulty];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#FFF8E1' }}>
            <AppHeader onBack={onBack} gameState={gameState} language={language} hearts={hearts} gems={gems} stars={stars} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                {/* HEADER - Stats bar */}
                <div style={{
                    flex: 'none',
                    padding: '1.25rem 1rem 0.75rem',
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    background: '#FFF8E1'
                }}>
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '0.5rem 1.2rem',
                    boxShadow: '0 3px 15px rgba(0,0,0,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontWeight: 700,
                    fontSize: '1rem'
                }}>
                    <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '9px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.85rem',
                        background: 'linear-gradient(135deg, #4FC3F7, #039BE5)'
                    }}>
                        <Zap size={16} />
                    </div>
                    <span>Moves</span>
                    <span style={{ fontWeight: 800, fontSize: '1.25rem', minWidth: '2ch' }}>{moves}</span>
                </div>

                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '0.5rem 1.2rem',
                    boxShadow: '0 3px 15px rgba(0,0,0,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontWeight: 700,
                    fontSize: '1rem'
                }}>
                    <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '9px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.85rem',
                        background: 'linear-gradient(135deg, #66BB6A, #43A047)'
                    }}>
                        <Check size={16} />
                    </div>
                    <span>Matches</span>
                    <span style={{ fontWeight: 800, fontSize: '1.25rem', minWidth: '2ch' }}>{matchedPairs}/{selectedAlphabets.length}</span>
                </div>

                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '0.5rem 1.2rem',
                    boxShadow: '0 3px 15px rgba(0,0,0,0.07)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontWeight: 700,
                    fontSize: '1rem'
                }}>
                    <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '9px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.85rem',
                        background: 'linear-gradient(135deg, #FFD54F, #F9A825)'
                    }}>
                        <Clock size={16} />
                    </div>
                    <span>Time</span>
                    <span style={{ fontWeight: 800, fontSize: '1.25rem', minWidth: '2ch' }}>
                        {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                    </span>
                </div>

                </div>

                {/* BODY - Game grid container */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1.25rem 1rem',
                    width: '100%'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${diff.cols}, 1fr)`,
                        gap: '10px',
                        justifyContent: 'center',
                        width: diff.cols === 5 ? '500px' : '440px',
                        boxSizing: 'border-box'
                    }}>
                {cards.map((card, idx) => {
                        const isFlipped = flipped.includes(idx);
                        const isMatched = matchedPairIds.includes(card.pairId);

                        // For matched cards, show them as permanently open/revealed
                        if (isMatched) {
                            return (
                                <div
                                    key={card.id}
                                    style={{
                                        aspectRatio: '1',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'linear-gradient(135deg, #C8E6C9, #A5D6A7)',
                                        boxShadow: '0 0 22px rgba(102,187,106,0.4)',
                                        border: '3px solid #66BB6A',
                                        fontSize: card.type === 'jawi' ? 'clamp(1.5rem, 4vw, 2.2rem)' : 'clamp(0.9rem, 3vw, 1.2rem)',
                                        fontWeight: 'bold',
                                        lineHeight: 1,
                                        padding: '0.5rem',
                                        textAlign: 'center',
                                        cursor: 'not-allowed',
                                        color: '#2E7D32',
                                        pointerEvents: 'none',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    {card.content}
                                </div>
                            );
                        }

                        return (
                            <div
                                key={card.id}
                                onClick={() => handleCardClick(idx)}
                                style={{
                                    aspectRatio: '1',
                                    perspective: '900px',
                                    cursor: isLock ? 'not-allowed' : 'pointer',
                                    position: 'relative',
                                    transformStyle: 'preserve-3d',
                                    transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
                                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                                    boxSizing: 'border-box'
                                }}
                            >
                                {/* Front face (back of card) */}
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #4FC3F7, #0288D1)',
                                    boxShadow: '0 4px 18px rgba(79,195,247,0.35), inset 0 2px 6px rgba(255,255,255,0.25)',
                                    overflow: 'hidden',
                                    fontSize: '2rem',
                                    color: 'white',
                                    fontWeight: 800,
                                    zIndex: 1
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        inset: 0,
                                        opacity: 0.15,
                                        background: 'radial-gradient(circle, white 2px, transparent 2px)',
                                        backgroundSize: '16px 16px',
                                        pointerEvents: 'none'
                                    }}/>
                                    <span style={{ position: 'relative', zIndex: 1 }}>?</span>
                                </div>

                                {/* Back face (Jawi/Rumi) */}
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'white',
                                    boxShadow: '0 4px 18px rgba(0,0,0,0.08)',
                                    border: '3px solid #f0f0f0',
                                    fontSize: card.type === 'jawi' ? 'clamp(1.5rem, 4vw, 2.2rem)' : 'clamp(0.9rem, 3vw, 1.2rem)',
                                    fontWeight: 'bold',
                                    lineHeight: 1,
                                    zIndex: 0,
                                    padding: '0.5rem',
                                    textAlign: 'center'
                                }}>
                                    {card.content}
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>

                {/* FOOTER - Controls */}
                <div style={{
                    flex: 'none',
                    padding: '0.75rem 1rem 1.25rem',
                    display: 'flex',
                    gap: '0.8rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    width: '100%',
                    background: '#FFF8E1',
                    boxSizing: 'border-box'
                }}>
                    <button
                        onClick={() => initGame()}
                        style={{
                            padding: '0.6rem 1.4rem',
                            borderRadius: '14px',
                            border: '2px solid #4FC3F7',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            background: 'linear-gradient(135deg, #4FC3F7, #0288D1)',
                            color: 'white',
                            boxShadow: '0 3px 12px rgba(79,195,247,0.3)',
                            transition: 'all 0.25s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                        }}
                    >
                        <RefreshCw size={16} /> Restart
                    </button>
                    <button
                        onClick={onBack}
                        style={{
                            padding: '0.6rem 1.4rem',
                            borderRadius: '14px',
                            border: '2px solid #ddd',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            cursor: 'pointer',
                            background: 'white',
                            color: '#2D3436',
                            transition: 'all 0.25s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                        }}
                    >
                        Menu
                    </button>
                </div>
            </div>
        </div>
    );
}
