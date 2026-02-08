import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Check, RefreshCw, Trophy, Home, Keyboard, Volume2, VolumeX, ArrowRight, Grid, Shuffle } from 'lucide-react';
import { JAWI_TOPICS } from '../utils/jawiWordsData';
import { playSound, toggleMute, getMuted } from '../utils/soundManager';

// Streak celebration messages
const STREAK_MESSAGES = [
    { min: 5, text: "Keep it up!", emoji: "👍", color: "#FFD700" },
    { min: 10, text: "Great Job!", emoji: "🌟", color: "#FF6B6B" },
    { min: 15, text: "Awesome!", emoji: "🔥", color: "#FF4500" },
    { min: 20, text: "Fantastic!", emoji: "⚡", color: "#9B59B6" },
    { min: 25, text: "Amazing!", emoji: "🚀", color: "#3498DB" },
    { min: 30, text: "SUPERSTAR!", emoji: "⭐", color: "#E74C3C" },
];

const getStreakMessage = (streak) => {
    for (let i = STREAK_MESSAGES.length - 1; i >= 0; i--) {
        if (streak >= STREAK_MESSAGES[i].min) {
            return STREAK_MESSAGES[i];
        }
    }
    return STREAK_MESSAGES[0];
};

export default function Jawi100WordsGame({ onBack, onHome }) {
    const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'summary'
    const [selectedTopicId, setSelectedTopicId] = useState(null); // null means random/all

    // Game State
    const [currentWord, setCurrentWord] = useState(null);
    const [questionCount, setQuestionCount] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect'
    const [isMuted, setIsMuted] = useState(getMuted());
    const [showStreakPopup, setShowStreakPopup] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // --- Helpers ---

    const handleToggleMute = () => {
        const muted = toggleMute();
        setIsMuted(muted);
    };

    const generateRandomWord = (topicId) => {
        let pool = [];
        if (topicId === 'random' || topicId === null) {
            // Flatten all words
            JAWI_TOPICS.forEach(topic => {
                pool = [...pool, ...topic.words];
            });
        } else {
            const topic = JAWI_TOPICS.find(t => t.id === topicId);
            if (topic) pool = topic.words;
        }

        if (pool.length === 0) return null;
        return pool[Math.floor(Math.random() * pool.length)];
    };

    // --- Game Logic ---

    const startGame = (topicId) => {
        setSelectedTopicId(topicId);
        setQuestionCount(1);
        setScore(0);
        setStreak(0);
        setGameState('playing');
        setFeedback(null);
        setUserAnswer('');
        setIsAnimating(false);
        setShowStreakPopup(false);
        setCurrentWord(generateRandomWord(topicId));
    };

    const nextProblem = () => {
        setCurrentWord(generateRandomWord(selectedTopicId));
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
        if (!currentWord) return;

        const isCorrect = answer.toLowerCase().trim() === currentWord.rumi.toLowerCase().trim();

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
            // Wait for user to click Next
        }
    };

    // --- Render ---

    if (gameState === 'setup') {
        return (
            <div className="card fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '1rem' }}>
                        <ArrowLeft size={32} />
                    </button>
                    <h1 className="game-title" style={{ margin: 0, fontSize: '2rem', color: '#FF6B6B' }}>1st 100 Words Game</h1>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', color: '#666' }}>Choose a Topic</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {/* Random Option */}
                        <button
                            onClick={() => startGame('random')}
                            className="btn-topic"
                            style={{
                                background: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)',
                                color: 'white',
                                padding: '1.5rem',
                                borderRadius: '15px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: '0 4px 15px rgba(255, 94, 98, 0.3)'
                            }}
                        >
                            <Shuffle size={32} />
                            Random Mix
                        </button>

                        {/* Topics from Data */}
                        {JAWI_TOPICS.map(topic => (
                            <button
                                key={topic.id}
                                onClick={() => startGame(topic.id)}
                                className="btn-topic"
                                style={{
                                    background: 'white',
                                    color: '#333',
                                    padding: '1.5rem',
                                    borderRadius: '15px',
                                    border: `2px solid ${topic.color || '#eee'}`,
                                    cursor: 'pointer',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'transform 0.2s',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.background = topic.color || '#eee';
                                    e.currentTarget.style.color = 'white';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.background = 'white';
                                    e.currentTarget.style.color = '#333';
                                }}
                            >
                                <span style={{ fontSize: '2rem' }}>
                                    {/* Use a meaningful icon or just first char if no icon provided in data, but we have emoji in words. 
                                        Let's just use a generic icon or the first emoji from the topic for visual flair */}
                                    {topic.words[0]?.emoji || '📚'}
                                </span>
                                {topic.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'summary') {
        const totalPossibleScore = questionCount * 10;
        const percentage = totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0;

        return (
            <div className="card fade-in" style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px', margin: '2rem auto' }}>
                <Trophy size={80} color="#FFD93D" style={{ marginBottom: '1rem' }} />
                <h1 style={{ color: '#FF6B6B', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Game Over!</h1>
                <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem' }}>
                    {percentage === 100 ? "Perfect Score!" : "Well Done!"}
                </p>

                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#4ECDC4', marginBottom: '0.5rem' }}>
                    {score}
                </div>
                <div style={{ fontSize: '1.2rem', color: '#888', marginBottom: '2rem' }}>
                    Total Score ({questionCount} words)
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button className="btn-primary" onClick={() => setGameState('setup')} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <RefreshCw /> New Game
                    </button>
                    <button className="btn-secondary" onClick={onHome} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Home /> Home
                    </button>
                </div>
            </div>
        );
    }

    if (!currentWord) return <div>Loading...</div>;

    const topicColor = selectedTopicId && selectedTopicId !== 'random'
        ? JAWI_TOPICS.find(t => t.id === selectedTopicId)?.color
        : '#FF6B6B';

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={finishGame} style={{ background: '#eee', border: 'none', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: 'bold', color: '#666' }}>
                    Finish
                </button>

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
                background: topicColor || '#FF6B6B',
                color: 'white',
                padding: '3rem',
                borderRadius: '30px',
                textAlign: 'center',
                marginBottom: '2rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                position: 'relative',
                transition: 'transform 0.3s'
            }}>
                <div style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '1rem' }}>
                    Type the Rumi spelling
                </div>

                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                    {currentWord.emoji}
                </div>

                <div style={{ fontSize: '5rem', fontFamily: 'serif', fontWeight: 'bold', lineHeight: 1, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    {currentWord.jawi}
                </div>
            </div>

            {/* Typing Area */}
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
                            background: topicColor || '#FF6B6B',
                            color: 'white',
                            border: 'none',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            opacity: !userAnswer || isAnimating ? 0.5 : 1
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

            {/* Next Button for Wrong Answers */}
            {feedback === 'incorrect' && (
                <div className="fade-in" style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem', color: '#FF6B6B', fontSize: '1.2rem' }}>
                        Oops! The answer is <b>{currentWord.rumi}</b>.
                    </p>
                    <button
                        className="btn-primary"
                        onClick={nextProblem}
                        style={{ padding: '0.8rem 2rem', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        Next Word <ArrowRight size={24} />
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
