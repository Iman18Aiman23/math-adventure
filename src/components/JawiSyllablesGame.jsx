import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Home, MousePointerClick, Keyboard, ArrowRight, RefreshCw } from 'lucide-react';
import { JAWI_ALPHABET } from '../utils/jawiData';
import { SUKU_KATA_DATA } from '../utils/jawiSukuKataData';
import { playSound, toggleMute, getMuted } from '../utils/soundManager';
import clsx from 'clsx';
import { LOCALIZATION } from '../utils/localization';
import GameHeader from './GameHeader';

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
    const [gameState, setGameState] = useState('setup'); // 'setup', 'playing', 'summary'
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
        setGameState('playing');
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
    }, [currentQuestion, gameState, gameMode]);

    const nextProblem = () => {
        setCurrentQuestion(generateRandomQuestion());
        setQuestionCount(prev => prev + 1);
        setFeedback(null);
        setUserAnswer('');
        setIsAnimating(false);
        setShowStreakPopup(false);
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
        }
    };

    if (gameState === 'setup') {
        return (
            <div className="game-container fade-in">
                <GameHeader onBack={onBack} onHome={onHome} title={t.syllablesTitle} language={language} />

                <div className="card" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <h3 style={{ marginBottom: '1rem' }}>{t.selectMode}</h3>
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
                                <span style={{ fontWeight: 'bold' }}>{t.multiChoice}</span>
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
                                <span style={{ fontWeight: 'bold' }}>{t.typeAnswer}</span>
                            </button>
                        </div>
                    </div>

                    <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0 }}>{t.selectAlphabets}</h3>
                        <button onClick={toggleAll} style={{ padding: '0.5rem 1rem', background: '#eee', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                            {selectedAlphabets.length === JAWI_ALPHABET.length ? t.deselectAll : t.selectAll}
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
                        {t.startGame} ({t.unlimited})
                    </button>
                </div>
            </div>
        );
    }

    if (gameState === 'summary') {
        const totalPossibleScore = questionCount * 10;
        const percentage = totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0;

        return (
            <div className="game-container fade-in">
                <GameHeader onBack={onBack} onHome={onHome} title={t.syllablesTitle} language={language} />

                <div className="card" style={{ textAlign: 'center', padding: '3rem', maxWidth: '600px', margin: '2rem auto' }}>
                    <Trophy size={80} color="#FFD93D" style={{ marginBottom: '1rem' }} />
                    <h1 style={{ color: '#9D4EDD', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{t.gameOver}</h1>
                    <p style={{ fontSize: '1.5rem', color: '#666', marginBottom: '2rem' }}>
                        {percentage === 100 ? t.perfectScore : (percentage >= 80 ? t.wellDone : (language === 'bm' ? 'Usaha yang bagus!' : 'Good effort!'))}
                    </p>

                    <div style={{ fontSize: '4rem', fontWeight: 'bold', color: '#4ECDC4', marginBottom: '0.5rem' }}>
                        {score}
                    </div>
                    <div style={{ fontSize: '1.2rem', color: '#888', marginBottom: '2rem' }}>
                        {t.totalScore} ({questionCount} {language === 'bm' ? 'soalan' : 'questions'})
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <button className="btn-primary" onClick={() => setGameState('setup')} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <RefreshCw /> {t.playAgain}
                        </button>
                        <button className="btn-secondary" onClick={onHome} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Home /> {language === 'bm' ? 'Utama' : 'Home'}
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
                onToggleMute={handleToggleMute}
                isMuted={isMuted}
                score={score}
                streak={streak}
                language={language}
                title={t.syllablesTitle}
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
                    {t.whatSyllable}
                </div>
                <div className="question-text-lg" style={{ fontSize: '5rem' }}>
                    {currentQuestion.jawi}
                </div>
            </div>

            {/* Answer Section */}
            {gameMode === 'abcd' ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem',
                    width: '100%',
                    maxWidth: '600px',
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
                                key={idx}
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
                <div className="fade-in" style={{ width: '100%', maxWidth: '600px' }}>
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
                        <div style={{ marginTop: '1rem', color: '#6BCB77', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
                            {t.correct}
                        </div>
                    )}
                </div>
            )}

            {/* Next Button for Wrong Answers */}
            {feedback === 'incorrect' && (
                <div className="fade-in" style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem', color: '#FF6B6B', fontSize: '1.2rem' }}>
                        {t.incorrectLabel} <b>{currentQuestion.rumi}</b>.
                    </p>
                    <button
                        className="btn-primary"
                        onClick={nextProblem}
                        style={{ padding: '0.8rem 2rem', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        {t.nextQuestion} <ArrowRight size={24} />
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
                            🔥 {streak} {t.streakInRow} 🔥
                        </p>
                        <span style={{ fontSize: '5rem' }}>{streakInfo.emoji}</span>
                    </div>
                );
            })()}
        </div>
    );
}
