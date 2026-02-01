import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RefreshCw, Trophy, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { generateProblem } from '../utils/mathLogic';
import { playSound } from '../utils/soundManager';
import clsx from 'clsx';

// Streak celebration messages - escalates with higher streaks!
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

// Get the appropriate message for the current streak
const getStreakMessage = (streak) => {
    // Find the highest matching message for this streak
    for (let i = STREAK_MESSAGES.length - 1; i >= 0; i--) {
        if (streak >= STREAK_MESSAGES[i].min) {
            return STREAK_MESSAGES[i];
        }
    }
    return STREAK_MESSAGES[0]; // Default to first message
};

export default function QuizArena({ operation, difficulty, selectedNumbers, onBack, isMuted, onToggleMute, quizType }) {
    const [problem, setProblem] = useState(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
    const [selectedOption, setSelectedOption] = useState(null); // Track what user clicked
    const [isAnimating, setIsAnimating] = useState(false);
    const [showStreakPopup, setShowStreakPopup] = useState(false);
    const [typedAnswer, setTypedAnswer] = useState(''); // For typing quiz mode

    // Initialize first problem
    useEffect(() => {
        nextProblem();
    }, [operation, difficulty, selectedNumbers]);

    const nextProblem = () => {
        setProblem(generateProblem(operation, difficulty, selectedNumbers));
        setFeedback(null);
        setSelectedOption(null);
        setTypedAnswer('');
        setIsAnimating(false);
        setShowStreakPopup(false);
    };

    const handleAnswer = (option) => {
        if (isAnimating) return; // Prevent double clicks

        setSelectedOption(option);

        if (option === problem.answer) {
            // Correct Answer Logic
            setIsAnimating(true);
            setFeedback('correct');
            setScore(s => s + 10);
            const newStreak = streak + 1;
            setStreak(newStreak);

            // Trigger confetti on streaks
            if (newStreak > 0 && newStreak % 5 === 0) {
                playSound('streak'); // Streak Sound
                setShowStreakPopup(true);
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 }
                });

                // Wait longer for streak celebration
                setTimeout(nextProblem, 3000);
            } else {
                playSound('correct'); // Normal Correct Sound
                setTimeout(nextProblem, 1000);
            }
        } else {
            // Wrong Answer Logic
            setFeedback('wrong');
            playSound('wrong'); // Wrong Sound
            setStreak(0);
            setIsAnimating(true); // Locks buttons, but we stay on this screen
            // No auto-advance. "Next" button appears.
        }
    };

    // Handle typed answer submission (for typing quiz mode)
    const handleTypedSubmit = (e) => {
        if (e) e.preventDefault();
        if (isAnimating || typedAnswer.trim() === '') return;

        const numericAnswer = parseInt(typedAnswer.trim(), 10);
        handleAnswer(numericAnswer);
    };

    if (!problem) return <div>Loading...</div>;

    return (
        <div className="card fade-in" style={{ position: 'relative' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'none', padding: '0.5rem' }}>
                    <ArrowLeft size={32} />
                </button>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '1.2rem', alignItems: 'center' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trophy color="gold" /> {score}
                    </span>
                    <span style={{ color: streak > 2 ? 'orange' : 'inherit' }}>
                        Streak: {streak} 🔥
                    </span>
                    {/* Mute Button */}
                    <button
                        onClick={onToggleMute}
                        style={{
                            background: 'rgba(0,0,0,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginLeft: '0.5rem'
                        }}
                        title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
                    >
                        {isMuted ? <VolumeX size={20} color="#888" /> : <Volume2 size={20} color="#4ECDC4" />}
                    </button>
                </div>
            </div>

            {/* Question */}
            <div style={{ marginBottom: '3rem' }}>
                <div style={{ fontSize: '5rem', fontWeight: 'bold', color: 'var(--color-dark)', fontFamily: 'var(--font-heading)' }}>
                    {problem.num1} {problem.symbol} {problem.num2}
                </div>
                <div style={{ fontSize: '2rem', color: '#666' }}>= ?</div>
            </div>

            {/* Answer Area - Multiple Choice or Typing */}
            {quizType === 'typing' ? (
                /* Typing Mode */
                <div style={{ marginBottom: '1rem' }}>
                    <form onSubmit={handleTypedSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <input
                            type="number"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            enterKeyHint="go"
                            value={typedAnswer}
                            onChange={(e) => setTypedAnswer(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleTypedSubmit();
                                }
                            }}
                            placeholder="Type your answer..."
                            disabled={isAnimating}
                            autoFocus
                            style={{
                                fontSize: '2.5rem',
                                padding: '1rem 2rem',
                                borderRadius: '15px',
                                border: feedback === 'correct'
                                    ? '3px solid var(--color-success)'
                                    : feedback === 'wrong'
                                        ? '3px solid #FF6B6B'
                                        : '3px solid #ddd',
                                textAlign: 'center',
                                width: '200px',
                                fontFamily: 'var(--font-heading)',
                                backgroundColor: feedback === 'correct'
                                    ? 'rgba(107, 203, 119, 0.1)'
                                    : feedback === 'wrong'
                                        ? 'rgba(255, 107, 107, 0.1)'
                                        : 'white',
                                outline: 'none',
                                transition: 'all 0.3s ease'
                            }}
                        />
                        {!isAnimating && (
                            <button
                                type="submit"
                                className="btn-primary"
                                disabled={typedAnswer.trim() === ''}
                                style={{
                                    padding: '0.8rem 3rem',
                                    fontSize: '1.2rem',
                                    opacity: typedAnswer.trim() === '' ? 0.5 : 1
                                }}
                            >
                                Submit ✓
                            </button>
                        )}
                    </form>
                    {feedback === 'correct' && (
                        <div style={{ marginTop: '1rem', color: 'var(--color-success)', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            ✓ Correct!
                        </div>
                    )}
                </div>
            ) : (
                /* Multiple Choice Mode (default) */
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', justifyItems: 'center' }}>
                    {problem.options.map((option, idx) => {
                        let extraClass = '';

                        if (feedback === 'correct') {
                            if (option === problem.answer) extraClass = 'correct-anim';
                        }
                        else if (feedback === 'wrong') {
                            if (option === problem.answer) extraClass = 'correct-static';
                            if (option === selectedOption) extraClass = 'wrong-anim';
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                className={clsx(
                                    'btn-option',
                                    extraClass,
                                    isAnimating && 'disabled'
                                )}
                                disabled={isAnimating}
                                style={
                                    feedback === 'wrong' && option === problem.answer
                                        ? { backgroundColor: 'var(--color-success)', color: 'white', borderColor: 'var(--color-success)' }
                                        : {}
                                }
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Next Button for Wrong Answers */}
            {feedback === 'wrong' && (
                <div className="fade-in" style={{ marginTop: '2rem' }}>
                    <button
                        className="btn-primary"
                        onClick={nextProblem}
                        style={{ padding: '0.8rem 2rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 auto' }}
                    >
                        Next Question <ArrowRight size={24} />
                    </button>
                    <p style={{ marginTop: '1rem', color: '#666' }}>
                        Oops! The correct answer was <b>{problem.answer}</b>.
                    </p>
                </div>
            )}

            {/* Success Overlay */}
            {feedback === 'correct' && !showStreakPopup && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
                    <span style={{ fontSize: '8rem', textShadow: '0 0 20px white' }}>🎉</span>
                </div>
            )}

            {/* Streak Popup */}
            {showStreakPopup && (() => {
                const streakInfo = getStreakMessage(streak);
                return (
                    <div className="fade-in" style={{
                        position: 'absolute',
                        top: '0', left: '0', right: '0', bottom: '0',
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '20px',
                        zIndex: 10
                    }}>
                        <h2 style={{
                            fontSize: '3rem',
                            color: streakInfo.color,
                            marginBottom: '1rem',
                            textShadow: `0 0 20px ${streakInfo.color}40`
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
