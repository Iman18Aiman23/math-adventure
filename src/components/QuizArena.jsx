import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import { generateProblem } from '../utils/mathLogic';
import { playSound } from '../utils/soundManager';
import clsx from 'clsx';

export default function QuizArena({ operation, difficulty, selectedNumbers, onBack }) {
    const [problem, setProblem] = useState(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
    const [selectedOption, setSelectedOption] = useState(null); // Track what user clicked
    const [isAnimating, setIsAnimating] = useState(false);
    const [showStreakPopup, setShowStreakPopup] = useState(false);

    // Initialize first problem
    useEffect(() => {
        nextProblem();
    }, [operation, difficulty, selectedNumbers]);

    const nextProblem = () => {
        setProblem(generateProblem(operation, difficulty, selectedNumbers));
        setFeedback(null);
        setSelectedOption(null);
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
            playSound('wrong'); // Wrong Sound
            setStreak(0);
            setIsAnimating(true); // Locks buttons, but we stay on this screen
            // No auto-advance. precise "Next" button appears.
        }
    };

    if (!problem) return <div>Loading...</div>;

    return (
        <div className="card fade-in" style={{ position: 'relative' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'none', padding: '0.5rem' }}>
                    <ArrowLeft size={32} />
                </button>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '1.2rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trophy color="gold" /> {score}
                    </span>
                    <span style={{ color: streak > 2 ? 'orange' : 'inherit' }}>
                        Streak: {streak} 🔥
                    </span>
                </div>
            </div>

            {/* Question */}
            <div style={{ marginBottom: '3rem' }}>
                <div style={{ fontSize: '5rem', fontWeight: 'bold', color: 'var(--color-dark)', fontFamily: 'var(--font-heading)' }}>
                    {problem.num1} {problem.symbol} {problem.num2}
                </div>
                <div style={{ fontSize: '2rem', color: '#666' }}>= ?</div>
            </div>

            {/* Options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', justifyItems: 'center' }}>
                {problem.options.map((option, idx) => {
                    let extraClass = '';

                    if (feedback === 'correct') {
                        if (option === problem.answer) extraClass = 'correct-anim';
                    }
                    else if (feedback === 'wrong') {
                        if (option === problem.answer) extraClass = 'correct-static'; // New static class needed or reuse style
                        if (option === selectedOption) extraClass = 'wrong-anim';
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            className={clsx(
                                'btn-option',
                                extraClass,
                                isAnimating && 'disabled' // Disable all buttons once an answer is picked
                            )}
                            disabled={isAnimating}
                            style={
                                // Inline override for static correct answer display
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
            {showStreakPopup && (
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
                    <h2 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem' }} className="animate-bounce">
                        AMAZING!
                    </h2>
                    <p style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                        {streak} in a row!
                    </p>
                    <span style={{ fontSize: '5rem' }}>🌟</span>
                </div>
            )}
        </div>
    );
}
