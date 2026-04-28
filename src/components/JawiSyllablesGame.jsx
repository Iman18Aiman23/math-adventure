import React, { useState, useEffect, useRef, useContext } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Home, MousePointerClick, Keyboard, ArrowRight, RefreshCw } from 'lucide-react';
import { JAWI_ALPHABET } from '../utils/jawiData';
import { SUKU_KATA_DATA } from '../utils/jawiSukuKataData';
import { playSound, toggleMute, getMuted } from '../utils/soundManager';
import clsx from 'clsx';
import { LOCALIZATION } from '../utils/localization';
import GameHeader from './GameHeader';
import { GameStateContext } from '../App';

export default function JawiSyllablesGame({ onBack, onHome, language }) {
    const t = LOCALIZATION[language].jawiGames;

    // Get the appropriate message for the current streak
    const getStreakMessage = (streakValue) => {
        const messages = t.streakMessages;
        // Icons and colors for streaks
        const EMOJIS = ["🌟", "💫", "🔥", "⚡", "🚀", "⭐", "💪", "🧠", "🧙‍♂️", "👑"];
        const COLORS = ["#FFD700", "#FF6B6B", "#FF4500", "#9B59B6", "#3498DB", "#E74C3C", "#1ABC9C", "#8E44AD", "#2ECC71", "#F39C12"];

        for (let i = messages.length - 1; i >= 0; i--) {
            if (streakValue >= messages[i].min) {
                return {
                    text: messages[i].text,
                    emoji: EMOJIS[i] || "🌟",
                    color: COLORS[i] || "#FFD700"
                };
            }
        }
        return { text: messages[0].text, emoji: EMOJIS[0], color: COLORS[0] };
    };
    const gameState = useContext(GameStateContext);
    const [localGameState, setLocalGameState] = useState('setup'); // 'setup', 'playing', 'summary'
    const [gameMode, setGameMode] = useState('abcd'); // 'abcd', 'type'
    const [selectedAlphabets, setSelectedAlphabets] = useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionCount, setQuestionCount] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [isMuted, setIsMuted] = useState(getMuted());
    const [showStreakPopup, setShowStreakPopup] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const inputRef = useRef(null); // Ref for typing input field

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

    // Auto-focus input when question changes (for typing mode)
    useEffect(() => {
        if (currentQuestion && gameMode === 'type' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentQuestion, gameMode]);

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
        setLocalGameState('playing');
        setFeedback(null);
        setUserAnswer('');
        setIsAnimating(false);
        setShowStreakPopup(false);
        setCurrentQuestion(generateRandomQuestion());
    };

    const getCardStyle = (bunyi, mode) => {
        const isPepet = bunyi.toLowerCase().includes('pepet');
        const isTaling = bunyi.toLowerCase().includes('taling');

        // In typing mode, always show the bunyi as a label
        if (mode === 'type') {
            if (isPepet) return { background: '#FFD93D', color: '#000', label: bunyi };
            if (isTaling) return { background: '#FF6B6B', color: '#FFF', label: bunyi };
            return { background: '#4ECDC4', color: '#000', label: bunyi };
        }

        // In multiple choice mode, only show special labels
        if (isPepet) return { background: '#FFD93D', color: '#000', label: 'E-Pepet' };
        if (isTaling) return { background: '#FF6B6B', color: '#FFF', label: 'E-Taling' };
        return { background: '#4ECDC4', color: '#000', label: null };
    };

    useEffect(() => {
        if (localGameState === 'playing' && gameMode === 'abcd' && currentQuestion) {
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
    }, [currentQuestion, localGameState, gameMode]);

    const nextProblem = () => {
        setCurrentQuestion(generateRandomQuestion());
        setQuestionCount(prev => prev + 1);
        setFeedback(null);
        setUserAnswer('');
        setIsAnimating(false);
        setShowStreakPopup(false);
        // Clear any active focus to prevent persistent colors on mobile
        if (typeof document !== 'undefined') {
            document.activeElement?.blur();
        }
    };

    const handleAnswer = (answer) => {
        if (isAnimating) return;

        const isCorrect = answer.toLowerCase().trim() === currentQuestion.rumi.toLowerCase().trim();

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
        }
    };

    if (localGameState === 'setup') {
        return (
            <div className="game-container fade-in">
                <GameHeader onBack={onBack} onHome={onHome} title={t.syllablesTitle} language={language} />

                <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '1.5rem 1rem' }}>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{t.selectMode}</h3>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
                            <button
                                onClick={() => setGameMode('abcd')}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '1rem',
                                    border: gameMode === 'abcd' ? '3px solid #9D4EDD' : '2px solid #eee',
                                    background: gameMode === 'abcd' ? '#f3e5f5' : 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    flex: 1,
                                    maxWidth: '120px'
                                }}
                            >
                                <MousePointerClick size={24} color="#9D4EDD" />
                                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{t.multiChoice}</span>
                            </button>
                            <button
                                onClick={() => setGameMode('type')}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '1rem',
                                    border: gameMode === 'type' ? '3px solid #9D4EDD' : '2px solid #eee',
                                    background: gameMode === 'type' ? '#f3e5f5' : 'white',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    flex: 1,
                                    maxWidth: '120px'
                                }}
                            >
                                <Keyboard size={24} color="#9D4EDD" />
                                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{t.typeAnswer}</span>
                            </button>
                        </div>
                    </div>

                    <div style={{ marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{t.selectAlphabets}</h3>
                        <button onClick={toggleAll} style={{ padding: '0.4rem 0.8rem', background: '#eee', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                            {selectedAlphabets.length === JAWI_ALPHABET.length ? t.deselectAll : t.selectAll}
                        </button>
                    </div>

                    <div className="jawi-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(3.5rem, 1fr))',
                        gap: '0.4rem',
                        maxHeight: '40vh',
                        overflowY: 'auto',
                        padding: '0.4rem',
                        border: '2px solid #f0f0f0',
                        borderRadius: '1rem'
                    }}>
                        {JAWI_ALPHABET.map((item) => (
                            <button
                                key={item.jawi}
                                onClick={() => toggleAlphabet(item.jawi)}
                                style={{
                                    background: selectedAlphabets.includes(item.jawi) ? '#9D4EDD' : 'white',
                                    color: selectedAlphabets.includes(item.jawi) ? 'white' : '#333',
                                    border: '1px solid #ddd',
                                    borderRadius: '0.75rem',
                                    padding: '0.5rem',
                                    fontSize: '1.4rem',
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
                            marginTop: '1.5rem',
                            width: '100%',
                            padding: '1rem',
                            opacity: selectedAlphabets.length === 0 ? 0.5 : 1,
                            fontSize: '1.2rem',
                            margin: '1.5rem 0 0 0'
                        }}
                    >
                        {t.startGame} ({t.unlimited})
                    </button>
                </div>
            </div>
        );
    }

    if (localGameState === 'summary') {
        const totalPossibleScore = questionCount * 10;
        const percentage = totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0;

        return (
            <div className="game-container fade-in">
                <GameHeader onBack={onBack} onHome={onHome} title={t.syllablesTitle} language={language} />

                <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem', maxWidth: '600px', margin: '1rem auto' }}>
                    <Trophy size={64} color="#FFD93D" style={{ marginBottom: '1rem' }} />
                    <h1 style={{ color: '#9D4EDD', fontSize: '2rem', marginBottom: '0.5rem' }}>{t.gameOver}</h1>
                    <p style={{ fontSize: '1.25rem', color: '#666', marginBottom: '1.5rem' }}>
                        {percentage === 100 ? t.perfectScore : (percentage >= 80 ? t.wellDone : (language === 'bm' ? 'Usaha yang bagus!' : 'Good effort!'))}
                    </p>

                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4ECDC4', marginBottom: '0.5rem' }}>
                        {score}
                    </div>
                    <div style={{ fontSize: '1rem', color: '#888', marginBottom: '2rem' }}>
                        {t.totalScore} ({questionCount} {language === 'bm' ? 'soalan' : 'questions'})
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                        <button className="btn-primary" onClick={() => setLocalGameState('setup')} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: 0, padding: '0.8rem 1.5rem', fontSize: '1.1rem' }}>
                            <RefreshCw size={20} /> {t.playAgain}
                        </button>
                        <button className="btn-secondary" onClick={onHome} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: 0, padding: '0.8rem 1.5rem', fontSize: '1.1rem' }}>
                            <Home size={20} /> {language === 'bm' ? 'Utama' : 'Home'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentQuestion) return <div>{t.loading}</div>;

    const style = getCardStyle(currentQuestion.bunyi, gameMode);

    return (
        <div className="game-container">
            <GameHeader
                onBack={onBack}
                onHome={onHome}
                score={score}
                streak={streak}
                title={t.syllablesTitle}
                language={language}
            />

            {/* Question Card */}
            <div className="question-card fade-in" style={{
                background: style.background,
                color: style.color,
                position: 'relative'
            }}>
                {style.label && (
                    <div style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        background: 'rgba(0,0,0,0.2)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '1rem',
                        fontSize: '0.8rem',
                        fontWeight: 'bold'
                    }}>
                        {style.label}
                    </div>
                )}

                <div style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '0.75rem' }}>
                    {t.whatSyllable}
                </div>
                <div className="question-text-lg">
                    {currentQuestion.jawi}
                </div>
            </div>

            {/* Answer Section */}
            {gameMode === 'abcd' ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem',
                    width: '100%',
                    maxWidth: '100%',
                    margin: '0 auto'
                }}>
                    {shuffledOptions.map((opt, idx) => {
                        let btnStyle = {
                            background: 'white',
                            border: '3px solid #eee',
                            color: '#333'
                        };

                        if (feedback && opt === currentQuestion.rumi) {
                            btnStyle = { background: '#6BCB77', border: '3px solid #6BCB77', color: 'white' };
                        } else if (feedback === 'incorrect') {
                            btnStyle = { opacity: 0.5, background: '#eee', border: '3px solid #eee', color: '#999' };
                        }

                        return (
                            <button
                                key={`${currentQuestion.jawi}-${opt}`}
                                onClick={() => handleAnswer(opt)}
                                disabled={isAnimating}
                                className="btn-option"
                                style={btnStyle}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="fade-in" style={{ width: '100%' }}>
                    <form onSubmit={(e) => { e.preventDefault(); handleAnswer(userAnswer); }} className="input-wrapper">
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
                        />
                    </form>
                    {feedback === 'correct' && (
                        <div style={{ marginTop: '0.75rem', color: '#6BCB77', fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center' }}>
                            {t.correct}
                        </div>
                    )}
                </div>
            )}

            {/* Next Button for Wrong Answers */}
            {feedback === 'incorrect' && (
                <div className="fade-in" style={{ marginTop: '1.5rem', textAlign: 'center', width: '100%' }}>
                    <p style={{ marginBottom: '0.75rem', color: '#FF6B6B', fontSize: '1.1rem' }}>
                        {t.incorrectLabel} <b>{currentQuestion.rumi}</b>.
                    </p>
                    <button
                        className="btn-primary"
                        onClick={nextProblem}
                        style={{ padding: '0.8rem 2rem', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}
                    >
                        {t.nextQuestion} <ArrowRight size={20} />
                    </button>
                </div>
            )}

            {/* Footer Stats */}
            <div className="ops-footer-stats">
                <div className="ops-stat-chip">
                    <span>✅</span>
                    <span>{questionCount}</span>
                    <span style={{ color: '#AFAFAF', fontSize: '0.7rem' }}>
                        {language === 'bm' ? 'dijawab' : 'answered'}
                    </span>
                </div>
                <div className="ops-stat-chip ops-stat-chip-highlight" style={{ gap: '8px' }}>
                    <span>🔥</span>
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
                        zIndex: 9999,
                        padding: '1rem'
                    }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 8vw, 3rem)',
                            color: streakInfo.color,
                            marginBottom: '0.75rem',
                            textShadow: `0 0 20px ${streakInfo.color}40`,
                            textAlign: 'center'
                        }} className="animate-bounce">
                            {streakInfo.text}
                        </h2>
                        <p style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#666' }}>
                            🔥 {streak} {t.streakInRow} 🔥
                        </p>
                        <span style={{ fontSize: '4rem' }}>{streakInfo.emoji}</span>
                    </div>
                );
            })()}
        </div>
    );
}
