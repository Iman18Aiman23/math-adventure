import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Check, X, RefreshCw, Trophy, Home, Settings, Keyboard, MousePointerClick, Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { JAWI_ALPHABET } from '../utils/jawiData';
import { SUKU_KATA_DATA } from '../utils/jawiSukuKataData';
import { playSound, toggleMute, getMuted } from '../utils/soundManager';

// Streak celebration messages
const STREAK_MESSAGES = [
    { min: 5, text: "You're Good!", emoji: "🌟", color: "#FFD700" },
    { min: 10, text: "Brilliant!", emoji: "💫", color: "#FF6B6B" },
    { min: 15, text: "Awesome!", emoji: "🔥", color: "#FF4500" },
    { min: 20, text: "Fantastic!", emoji: "⚡", color: "#9B59B6" },
    { min: 25, text: "Incredible!", emoji: "🚀", color: "#3498DB" },
    { min: 30, text: "SUPERSTAR!", emoji: "⭐", color: "#E74C3C" },
    { min: 35, text: "UNSTOPPABLE!", emoji: "💪", color: "#1ABC9C" },
    { min: 40, text: "GENIUS!", emoji: "🧠", color: "#8E44AD" },
    { min: 45, text: "MATH WIZARD!", emoji: "🧙‍♂️", color: "#2ECC71" },
    { min: 50, text: "LEGENDARY!", emoji: "👑", color: "#F39C12" },
];

const getStreakMessage = (streak) => {
    for (let i = STREAK_MESSAGES.length - 1; i >= 0; i--) {
        if (streak >= STREAK_MESSAGES[i].min) {
            return STREAK_MESSAGES[i];
        }
    }
    return STREAK_MESSAGES[0];
};

export default function JawiSyllablesGame({ onBack, onHome }) {
    const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'summary'
    const [gameMode, setGameMode] = useState('abcd'); // 'abcd', 'type'
    const [selectedAlphabets, setSelectedAlphabets] = useState([]);

    // In unlimited mode, we don't need a pre-generated array of questions.
    // We just need the "current" question and a way to generate the next one.
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionCount, setQuestionCount] = useState(0); // Track how many served

    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [isMuted, setIsMuted] = useState(getMuted());
    const [showStreakPopup, setShowStreakPopup] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // --- Setup Logic ---

    const toggleAlphabet = (jawi) => {
        setSelectedAlphabets(prev =>
            prev.includes(jawi)
                ? prev.filter(a => a !== jawi)
                : [...prev, jawi]
        );
    };

    const toggleAll = () => {
        if (selectedAlphabets.length === JAWI_ALPHABET.length) {
            setSelectedAlphabets([]);
        } else {
            setSelectedAlphabets(JAWI_ALPHABET.map(a => a.jawi));
        }
    };

    const handleToggleMute = () => {
        const muted = toggleMute();
        setIsMuted(muted);
    };

    // Helper to pick a random question from selected alphabets
    const generateRandomQuestion = () => {
        let pool = [];
        selectedAlphabets.forEach(jawi => {
            const syllables = SUKU_KATA_DATA[jawi];
            if (syllables) {
                syllables.forEach(s => {
                    pool.push({
                        ...s,
                        originalAlphabet: jawi
                    });
                });
            }
        });

        if (pool.length === 0) return null;
        return pool[Math.floor(Math.random() * pool.length)];
    };

    const startGame = () => {
        if (selectedAlphabets.length === 0) return;

        setQuestionCount(1);
        setScore(0);
        setStreak(0);
        setGameState('playing');
        setFeedback(null);
        setUserAnswer('');
        setIsAnimating(false);
        setShowStreakPopup(false);
        setCurrentQuestion(generateRandomQuestion());
    };

    const getCardStyle = (bunyi) => {
        const isPepet = bunyi.toLowerCase().includes('pepet');
        const isTaling = bunyi.toLowerCase().includes('taling');

        if (isPepet) return { background: '#FFD93D', color: '#000', label: 'E-Pepet' }; // Yellow
        if (isTaling) return { background: '#FF6B6B', color: '#FFF', label: 'E-Taling' }; // Red
        return { background: '#4ECDC4', color: '#000', label: null }; // Teal default
    };

    useEffect(() => {
        if (gameState === 'playing' && gameMode === 'abcd' && currentQuestion) {
            const correct = currentQuestion.rumi;
            let distractorPool = [];
            Object.values(SUKU_KATA_DATA).forEach(list => {
                list.forEach(item => {
                    if (item.rumi !== correct) {
                        distractorPool.push(item.rumi);
                    }
                });
            });

            distractorPool.sort(() => 0.5 - Math.random());
            const distractors = [...new Set(distractorPool)].slice(0, 3);
            const options = [correct, ...distractors].sort(() => 0.5 - Math.random());
            setShuffledOptions(options);
        }
    }, [currentQuestion, gameState, gameMode]); // Updated dependency

    const nextProblem = () => {
        setCurrentQuestion(generateRandomQuestion());
        setQuestionCount(prev => prev + 1);
        setFeedback(null);
        setUserAnswer('');
        setIsAnimating(false);
        setShowStreakPopup(false);
    };

    const finishGame = () => {
        setGameState('summary');
    };

    const handleAnswer = (answer) => {
        if (isAnimating) return;

        const isCorrect = answer.toLowerCase().trim() === currentQuestion.rumi.toLowerCase().trim();

        if (isCorrect) {
            setIsAnimating(true);
            setScore(s => s + 10);
            setFeedback('correct');
            const newStreak = streak + 1;
            setStreak(newStreak);

            if (newStreak > 0 && newStreak % 5 === 0) {
                playSound('streak');
                setShowStreakPopup(true);
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 }
                });
                setTimeout(nextProblem, 3000);
            } else {
                playSound('correct');
                setTimeout(nextProblem, 1000);
            }
        } else {
            setFeedback('incorrect');
            setStreak(0);
            playSound('wrong');
            setIsAnimating(true);
            // No auto-advance for wrong answer, wait for "Next" button
        }
    };

    // --- Render Helpers ---

    if (gameState === 'setup') {
        return (
            <div className="card fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem' }}>
                        <ArrowLeft size={32} />
                    </button>
                    <h1 className="game-title" style={{ margin: 0, fontSize: '2rem', color: '#9D4EDD' }}>Jawi Syllables Game</h1>
                </div>

                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Select Game Mode</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <button
                            onClick={() => setGameMode('abcd')}
                            style={{
                                padding: '1rem 2rem',
                                borderRadius: '15px',
                                border: gameMode === 'abcd' ? '3px solid #9D4EDD' : '2px solid #eee',
                                background: gameMode === 'abcd' ? '#f3e5f5' : 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem',
                                width: '150px'
                            }}
                        >
                            <MousePointerClick size={32} color="#9D4EDD" />
                            <span style={{ fontWeight: 'bold' }}>Multiple Choice</span>
                        </button>
                        <button
                            onClick={() => setGameMode('type')}
                            style={{
                                padding: '1rem 2rem',
                                borderRadius: '15px',
                                border: gameMode === 'type' ? '3px solid #9D4EDD' : '2px solid #eee',
                                background: gameMode === 'type' ? '#f3e5f5' : 'white',
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem',
                                width: '150px'
                            }}
                        >
                            <Keyboard size={32} color="#9D4EDD" />
                            <span style={{ fontWeight: 'bold' }}>Type Answer</span>
                        </button>
                    </div>
                </div>

                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Select Alphabets</h3>
                    <button onClick={toggleAll} style={{ padding: '0.5rem 1rem', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                        {selectedAlphabets.length === JAWI_ALPHABET.length ? 'Deselect All' : 'Select All'}
                    </button>
                </div>

                <div className="jawi-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))',
                    gap: '0.5rem',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    padding: '0.5rem',
                    border: '2px solid #f0f0f0',
                    borderRadius: '15px'
                }}>
                    {JAWI_ALPHABET.map((item) => (
                        <button
                            key={item.jawi}
                            onClick={() => toggleAlphabet(item.jawi)}
                            style={{
                                background: selectedAlphabets.includes(item.jawi) ? '#9D4EDD' : 'white',
                                color: selectedAlphabets.includes(item.jawi) ? 'white' : '#333',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                padding: '0.5rem',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                fontFamily: 'serif',
                                transition: 'all 0.2s'
                            }}
                        >
                            {item.jawi}
                        </button>
                    ))}
                </div>

                <button
                    className="btn-primary"
                    onClick={startGame}
                    disabled={selectedAlphabets.length === 0}
                    style={{
                        marginTop: '2rem',
                        width: '100%',
                        padding: '1rem',
                        opacity: selectedAlphabets.length === 0 ? 0.5 : 1
                    }}
                >
                    Start Game (Unlimited)
                </button>
            </div>
        );
    }

    if (gameState === 'summary') {
        const totalPossibleScore = questionCount * 10;
        // Prevent division by zero if something weird happens, though questionCount starts at 1
        const percentage = totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0;

        let message = "Good effort!";
        if (percentage === 100) message = "Perfect! Amazing!";
        else if (percentage >= 80) message = "Great job!";
        else if (percentage >= 50) message = "Well done!";

        return (
            <div className="card fade-in" style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px', margin: '2rem auto' }}>
                <Trophy size={80} color="#FFD93D" style={{ marginBottom: '1rem' }} />
                <h1 style={{ color: '#9D4EDD', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Game Over!</h1>
                <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem' }}>{message}</p>

                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#4ECDC4', marginBottom: '0.5rem' }}>
                    {score}
                </div>
                <div style={{ fontSize: '1.2rem', color: '#888', marginBottom: '2rem' }}>
                    Total Score ({questionCount} questions)
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn-primary" onClick={() => setGameState('setup')} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <RefreshCw /> Play Again
                    </button>
                    <button className="btn-secondary" onClick={onHome} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Home /> Home
                    </button>
                </div>
            </div>
        );
    }

    if (!currentQuestion) return <div>Loading...</div>;

    const style = getCardStyle(currentQuestion.bunyi);

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button onClick={finishGame} style={{ background: '#eee', border: 'none', cursor: 'pointer', padding: '0.5rem', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold', color: '#666' }}>
                        Finish
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trophy color="gold" size={20} /> {score}
                    </span>
                    <span style={{ color: streak > 2 ? 'orange' : 'inherit' }}>
                        Streak: {streak} 🔥
                    </span>
                    <button
                        onClick={handleToggleMute}
                        style={{
                            background: 'rgba(0,0,0,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        {isMuted ? <VolumeX size={20} color="#888" /> : <Volume2 size={20} color="#4ECDC4" />}
                    </button>
                </div>
            </div>

            {/* Question Card */}
            <div className="card fade-in" style={{
                background: style.background,
                color: style.color,
                padding: '3rem',
                borderRadius: '30px',
                textAlign: 'center',
                marginBottom: '2rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                position: 'relative',
                transition: 'transform 0.3s'
            }}>
                {style.label && (
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '0.3rem 0.8rem',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                    }}>
                        {style.label}
                    </div>
                )}

                <div style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '1rem' }}>
                    What is this syllable in Rumi?
                </div>
                <div style={{ fontSize: '5rem', fontFamily: 'serif', fontWeight: 'bold', lineHeight: 1 }}>
                    {currentQuestion.jawi}
                </div>
                {/* Removed the hint provided by bunyi here to make it a quiz, but keep unique card color as hint */}
            </div>

            {/* Answer Section */}
            {gameMode === 'abcd' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {shuffledOptions.map((opt, idx) => {
                        let btnStyle = {
                            background: 'white',
                            border: '3px solid #eee',
                            color: '#333'
                        };

                        // Show correct answer when user gets it wrong or right
                        if (feedback && opt === currentQuestion.rumi) {
                            btnStyle = { background: '#6BCB77', border: '3px solid #6BCB77', color: 'white' };
                        } else if (feedback === 'incorrect' && opt !== currentQuestion.rumi && selectedAlphabets) {
                            // If we tracked what they clicked we could highlight it red.
                            // Simplified: just show regular style or maybe grey out.
                            btnStyle = { opacity: 0.5, background: '#eee', border: '3px solid #eee', color: '#999' };
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(opt)}
                                disabled={isAnimating}
                                style={{
                                    padding: '1.5rem',
                                    borderRadius: '15px',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    ...btnStyle
                                }}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <form onSubmit={(e) => { e.preventDefault(); handleAnswer(userAnswer); }} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
                        <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            disabled={isAnimating}
                            placeholder="Type answer..."
                            autoFocus
                            style={{
                                flex: 1,
                                padding: '1.5rem',
                                fontSize: '1.5rem',
                                borderRadius: '15px',
                                border: feedback === 'incorrect' ? '3px solid #FF6B6B' : (feedback === 'correct' ? '3px solid #6BCB77' : '3px solid #eee'),
                                outline: 'none',
                                textAlign: 'center',
                                background: feedback === 'correct' ? '#e8f5e9' : (feedback === 'incorrect' ? '#ffebee' : 'white')
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!userAnswer || isAnimating}
                            style={{
                                padding: '0 2rem',
                                background: '#9D4EDD',
                                color: 'white',
                                border: 'none',
                                borderRadius: '15px',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                opacity: !userAnswer ? 0.5 : 1
                            }}
                        >
                            <Check size={32} />
                        </button>
                    </form>
                    {feedback === 'correct' && (
                        <div style={{ marginTop: '1rem', color: '#6BCB77', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            ✓ Correct!
                        </div>
                    )}
                </div>
            )}

            {/* Next Button for Wrong Answers */}
            {feedback === 'incorrect' && (
                <div className="fade-in" style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem', color: '#FF6B6B', fontSize: '1.2rem' }}>
                        Oops! The correct answer was <b>{currentQuestion.rumi}</b>.
                    </p>
                    <button
                        className="btn-primary"
                        onClick={nextProblem}
                        style={{ padding: '0.8rem 2rem', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        Next Question <ArrowRight size={24} />
                    </button>
                </div>
            )}

            {/* Streak Popup */}
            {showStreakPopup && (() => {
                const streakInfo = getStreakMessage(streak);
                return (
                    <div className="fade-in" style={{
                        position: 'fixed',
                        top: '0', left: '0', right: '0', bottom: '0',
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0',
                        zIndex: 9999
                    }}>
                        <h2 style={{
                            fontSize: '3rem',
                            color: streakInfo.color,
                            marginBottom: '1rem',
                            textShadow: `0 0 20px ${streakInfo.color}40`,
                            textAlign: 'center'
                        }} className="animate-bounce">
                            {streakInfo.text}
                        </h2>
                        <p style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#666' }}>
                            🔥 {streak} in a row! 🔥
                        </p>
                        <span style={{ fontSize: '5rem' }}>{streakInfo.emoji}</span>
                    </div>
                );
            })()}
        </div>
    );
}
