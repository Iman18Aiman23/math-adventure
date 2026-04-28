import React, { useState, useEffect, useRef, useContext } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RefreshCw, Trophy, Home, Keyboard, Volume2, VolumeX, ArrowRight, Grid, Shuffle, X } from 'lucide-react';
import clsx from 'clsx';
import { JAWI_TOPICS } from '../utils/jawiWordsData';
import { playSound, toggleMute, getMuted } from '../utils/soundManager';
import { LOCALIZATION } from '../utils/localization';
import GameHeader from './GameHeader';
import { GameStateContext } from '../App';

const STREAK_MILESTONE = 5;

export default function Jawi100WordsGame({ onBack, onHome, language }) {
    const t = LOCALIZATION[language].jawiGames;
    const gameState = useContext(GameStateContext);

    // Get the appropriate message for the current streak
    const getStreakMessage = (streakValue) => {
        const messages = t.streakMessages;
        // Icons and colors for streaks
        const EMOJIS = ["👍", "🌟", "🔥", "⚡", "🚀", "⭐"];
        const COLORS = ["#FFD700", "#FF6B6B", "#FF4500", "#9B59B6", "#3498DB", "#E74C3C"];

        for (let i = messages.length - 1; i >= 0; i--) {
            if (streakValue >= messages[i].min) {
                return {
                    text: messages[i].text,
                    emoji: EMOJIS[i] || "👍",
                    color: COLORS[i] || "#FFD700"
                };
            }
        }
        return { text: messages[0].text, emoji: EMOJIS[0], color: COLORS[0] };
    };
    const [localGameState, setLocalGameState] = useState('setup'); // 'setup', 'playing', 'summary'
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
    const [showImage, setShowImage] = useState(false);
    const inputRef = useRef(null);

    // --- Helpers ---

    const handleToggleMute = () => {
        const muted = toggleMute();
        setIsMuted(muted);
    };

    // Auto-focus input when question changes
    useEffect(() => {
        if (currentWord && inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentWord]);

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
        setLocalGameState('playing');
        setFeedback(null);
        setUserAnswer('');
        setIsAnimating(false);
        setShowStreakPopup(false);
        setShowImage(false);
        setCurrentWord(generateRandomWord(topicId));
    };

    const nextProblem = () => {
        setCurrentWord(generateRandomWord(selectedTopicId));
        setQuestionCount(prev => prev + 1);
        setFeedback(null);
        setUserAnswer('');
        setIsAnimating(false);
        setShowStreakPopup(false);
        setShowImage(false);
    };

    const finishGame = () => {
        setLocalGameState('summary');
    };

    const handleAnswer = (answer) => {
        if (isAnimating) return;
        if (!currentWord) return;

        const isCorrect = answer.toLowerCase().trim() === currentWord.rumi.toLowerCase().trim();

        if (isCorrect) {
            setIsAnimating(true);
            setScore(s => s + 10);
            setFeedback('correct');
            if (gameState?.addWin) gameState.addWin(10);
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

    if (localGameState === 'setup') {
        return (
            <div className="game-container">
                <GameHeader onBack={onBack} onHome={onHome} title={t.wordsTitle} language={language} />

                <div className="card fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem', color: '#666' }}>{t.chooseTopic}</h3>

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
                                {t.randomMix}
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
                                        padding: '1.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        border: `2px solid ${topic.color || '#eee'}`,
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        transition: 'transform 0.2s',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                                        minHeight: '4.5rem'
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
                                    <span style={{ fontSize: '1.5rem' }}>
                                        {topic.words[0]?.emoji || '📚'}
                                    </span>
                                    {language === 'bm' ? topic.title : topic.titleEng || topic.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (localGameState === 'summary') {
        const totalPossibleScore = questionCount * 10;
        const percentage = totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0;

        return (
            <div className="game-container fade-in">
                <GameHeader onBack={onBack} onHome={onHome} title={t.wordsTitle} language={language} />

                <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem', maxWidth: '600px', margin: '1rem auto' }}>
                    <Trophy size={64} color="#FFD93D" style={{ marginBottom: '1rem' }} />
                    <h1 style={{ color: '#FF6B6B', fontSize: '2rem', marginBottom: '0.5rem' }}>{t.gameOver}</h1>
                    <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>
                        {percentage === 100 ? t.perfectScore : t.wellDone}
                    </p>

                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4ECDC4', marginBottom: '0.5rem' }}>
                        {score}
                    </div>
                    <div style={{ fontSize: '1.2rem', color: '#888', marginBottom: '2rem' }}>
                        {t.totalScore} ({questionCount} {language === 'bm' ? 'perkataan' : 'words'})
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                        <button className="btn-primary" onClick={() => setLocalGameState('setup')} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: 0, padding: '0.8rem 1.5rem' }}>
                            <RefreshCw size={20} /> {t.newGame}
                        </button>
                        <button className="btn-secondary" onClick={onHome} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: 0, padding: '0.8rem 1.5rem' }}>
                            <Home size={20} /> {language === 'bm' ? 'Utama' : 'Home'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentWord) return <div>{t.loading}</div>;

    const topicColor = selectedTopicId && selectedTopicId !== 'random'
        ? JAWI_TOPICS.find(t => t.id === selectedTopicId)?.color
        : '#FF6B6B';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', background: '#fff' }}>
            {/* ── Header matching Practice Problems style ── */}
            <div style={{ background: '#fff', borderBottom: '2px solid #E5E5E5', padding: '0 0.85rem', height: '60px', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => setLocalGameState('setup')} style={{ background: 'transparent', color: '#AFAFAF', display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                    <X size={22} />
                </button>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '1.15rem' }}>📖</span>
                    <span style={{ fontWeight: 900, fontSize: '0.98rem', color: '#3C3C3C', letterSpacing: '0.01em' }}>
                        {t.wordsTitle}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: '#FFF6D6', borderRadius: '999px', fontWeight: 900, fontSize: '0.82rem', color: '#B58800', border: '1.5px solid #FFE08A' }}>
                        <span style={{ fontSize: '0.85rem' }}>⭐</span>
                        <span>{Math.floor(streak / STREAK_MILESTONE) * 10}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: '#FFEAD0', borderRadius: '999px', fontWeight: 900, fontSize: '0.82rem', color: '#D9610B', border: '1.5px solid #FFC081' }}>
                        <span style={{ fontSize: '0.85rem' }}>🔥</span>
                        <span>{streak}</span>
                    </div>
                </div>
            </div>

            {/* Content area */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.25rem 1rem', gap: '1.25rem' }}>

            {/* Question Card */}
            <div className="question-card fade-in" style={{
                background: topicColor || '#FF6B6B',
                color: 'white',
                padding: '2rem 1rem',
                position: 'relative',
                margin: '0',
                width: '100%',
                maxWidth: '480px',
                boxSizing: 'border-box',
                borderRadius: '16px'
            }}>
                <button
                    onClick={() => setShowImage(!showImage)}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontWeight: 'bold',
                        zIndex: 10
                    }}
                >
                    {showImage ? (language === 'bm' ? 'Sembunyikan Imej' : 'Hide Image') : (language === 'bm' ? 'Papar Imej' : 'Show Image')}
                </button>
                <div style={{ fontSize: '1rem', opacity: 0.9, marginBottom: '0.75rem' }}>
                    {t.typeRumi}
                </div>

                <div style={{ marginBottom: '1rem', minHeight: 'clamp(2.5rem, 10vw, 4rem)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {showImage && (
                        <div style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)', marginBottom: '0.5rem' }}>
                            {currentWord.emoji}
                        </div>
                    )}
                </div>

                <div className="question-text-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)', fontSize: 'clamp(2.5rem, 10vw, 4rem)' }}>
                    {currentWord.jawi}
                </div>
            </div>

            {/* Typing Area */}
            <div className="fade-in" style={{ width: '100%', maxWidth: '480px', padding: '0 0.5rem', boxSizing: 'border-box' }}>
                <form onSubmit={(e) => { e.preventDefault(); handleAnswer(userAnswer); }} className="input-wrapper" style={{ padding: '0' }}>
                    <input
                        ref={inputRef}
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={isAnimating}
                        placeholder={t.typeAnswer}
                        autoFocus
                        className={clsx(
                            "standard-input",
                            feedback === 'correct' && 'correct-input',
                            feedback === 'incorrect' && 'incorrect-input'
                        )}
                        style={{
                            textAlign: 'center',
                            fontSize: '1.75rem',
                            padding: '1rem'
                        }}
                    />
                </form>
                {feedback === 'correct' && (
                    <div style={{ marginTop: '0.75rem', color: '#6BCB77', fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center' }}>
                        {t.correct}
                    </div>
                )}
            </div>

            {/* Next Button for Wrong Answers */}
            {feedback === 'incorrect' && (
                <div className="fade-in" style={{ marginTop: '0.5rem', textAlign: 'center', width: '100%', maxWidth: '480px', padding: '0 0.5rem', boxSizing: 'border-box' }}>
                    <p style={{ marginBottom: '0.75rem', color: '#FF6B6B', fontSize: '1.1rem' }}>
                        {t.incorrectLabel} <b>{currentWord.rumi}</b>.
                    </p>
                    <button
                        className="btn-primary"
                        onClick={nextProblem}
                        style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}
                    >
                        {t.nextWord} <ArrowRight size={20} />
                    </button>
                </div>
            )}

            </div>

            {/* Footer Stats matching Practice Problems style */}
            <div className="ops-footer-stats">
                <div className="ops-stat-chip">
                    <span>✅</span>
                    <span>{questionCount - 1}</span>
                    <span style={{ color: '#AFAFAF', fontSize: '0.7rem' }}>
                        {language === 'bm' ? 'dijawab' : 'answered'}
                    </span>
                </div>
                <div className="ops-stat-chip ops-stat-chip-highlight" style={{ gap: '8px' }}>
                    <span>🏆</span>
                    <div style={{ width: '80px', height: '8px', background: 'rgba(204, 119, 0, 0.2)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${Math.min((streak / 10) * 100, 100)}%`, height: '100%', background: '#FFB800', borderRadius: '4px', transition: 'width 0.3s ease-out' }} />
                    </div>
                    <span style={{ color: '#CC7700', fontSize: '0.9rem', fontWeight: 900, minWidth: '32px', textAlign: 'right' }}>
                        {Math.min(streak, 10)}/10
                    </span>
                </div>
            </div>

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
                            🔥 {streak} {t.streakInRow} 🔥
                        </p>
                        <span style={{ fontSize: '5rem' }}>{streakInfo.emoji}</span>
                    </div>
                );
            })()}
        </div>
    );
}
