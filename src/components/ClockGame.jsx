import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight } from 'lucide-react';
import { generateClockProblem } from '../utils/timeData';
import { playSound, toggleMute, getMuted } from '../utils/soundManager';
import AnalogClock from './AnalogClock';
import GameHeader from './GameHeader';
import { LOCALIZATION } from '../utils/localization';

export default function ClockGame({ onBack, onHome, language }) {
    const t = LOCALIZATION[language].clockGame;
    const [clockMode, setClockMode] = useState('analog-to-digital'); // user-selectable
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [isMuted, setIsMuted] = useState(getMuted());
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        generateQuestion();
    }, []);

    const handleModeChange = (mode) => {
        if (mode === clockMode) return;
        setCurrentQuestion(null);
        setClockMode(mode);
    };

    // Generate new question when mode changes (skip initial mount)
    const prevModeRef = React.useRef(clockMode);
    useEffect(() => {
        if (prevModeRef.current !== clockMode) {
            prevModeRef.current = clockMode;
            generateQuestion();
        }
    }, [clockMode]);

    const generateQuestion = () => {
        const problem = generateClockProblem();

        if (clockMode === 'digital-to-analog') {
            const correctTime = { hour: problem.hour, minute: problem.minute, id: 0 };
            let distractors = [];
            while (distractors.length < 3) {
                const h = Math.floor(Math.random() * 12) + 1;
                const m = Math.floor(Math.random() * 12) * 5;
                if (h !== correctTime.hour || m !== correctTime.minute) {
                    if (!distractors.some(d => d.hour === h && d.minute === m)) {
                        distractors.push({ hour: h, minute: m, id: distractors.length + 1 });
                    }
                }
            }
            const options = [correctTime, ...distractors].sort(() => 0.5 - Math.random());
            setCurrentQuestion({ ...problem, analogOptions: options });
        } else {
            setCurrentQuestion(problem);
        }

        setFeedback(null);
        setSelectedOption(null);
        setIsAnimating(false);
        // Clear any active focus to prevent persistent colors on mobile
        if (typeof document !== 'undefined') {
            document.activeElement?.blur();
        }
    };

    const handleAnswer = (option) => {
        if (isAnimating) return;
        setSelectedOption(option);

        const isCorrect = clockMode === 'analog-to-digital'
            ? option === currentQuestion.answer
            : (option.hour === currentQuestion.hour && option.minute === currentQuestion.minute);

        if (isCorrect) {
            setIsAnimating(true);
            setScore(s => s + 10);
            setFeedback('correct');
            const newStreak = streak + 1;
            setStreak(newStreak);

            if (newStreak > 0 && newStreak % 5 === 0) {
                playSound('streak');
                confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
                setTimeout(generateQuestion, 2000);
            } else {
                playSound('correct');
                setTimeout(generateQuestion, 1000);
            }
        } else {
            setFeedback('incorrect');
            setStreak(0);
            playSound('wrong');
            setIsAnimating(true);
        }
    };

    const handleToggleMute = () => {
        const muted = toggleMute();
        setIsMuted(muted);
    };

    const toggleBtnStyle = (active) => ({
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        border: active ? '2px solid #4ECDC4' : '2px solid #eee',
        background: active ? '#e0f7f5' : 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        fontSize: '0.85rem',
        fontWeight: 'bold'
    });

    if (!currentQuestion) return <div className="game-container" style={{ textAlign: 'center', padding: '5rem' }}>{t.loading}</div>;

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
            />

            {/* Mode Toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <button onClick={() => handleModeChange('analog-to-digital')} style={toggleBtnStyle(clockMode === 'analog-to-digital')}>
                    {t.modeAnalogDigital}
                </button>
                <button onClick={() => handleModeChange('digital-to-analog')} style={toggleBtnStyle(clockMode === 'digital-to-analog')}>
                    {t.modeDigitalAnalog}
                </button>
            </div>

            {/* Question Card */}
            <div className="question-card fade-in" style={{ background: '#4ECDC4', color: 'white' }}>
                <div style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '1rem' }}>
                    {clockMode === 'analog-to-digital' ? t.promptAnalog : t.promptDigital}
                </div>

                {clockMode === 'analog-to-digital' ? (
                    <div style={{ background: 'white', display: 'inline-block', padding: '1rem', borderRadius: '50%', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                        <AnalogClock hour={currentQuestion.hour} minute={currentQuestion.minute} size={220} showNumbers={true} />
                    </div>
                ) : (
                    <div className="question-text-lg">
                        {currentQuestion.displayTime}
                    </div>
                )}
            </div>

            {/* Answer Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
                {clockMode === 'analog-to-digital' ? (
                    currentQuestion.options.map((opt, idx) => {
                        let btnStyle = {
                            padding: '1.5rem',
                            borderRadius: '15px',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: '0.2s',
                            background: 'white',
                            border: '3px solid rgb(238, 238, 238)',
                            color: 'rgb(51, 51, 51)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        };

                        if (feedback && opt === currentQuestion.answer) {
                            btnStyle = { ...btnStyle, background: '#6BCB77', border: '3px solid #6BCB77', color: 'white' };
                        } else if (feedback === 'incorrect' && opt === selectedOption) {
                            btnStyle = { ...btnStyle, background: '#FF6B6B', border: '3px solid #FF6B6B', color: 'white', animation: 'shake 0.5s' };
                        }

                        return (
                            <button
                                key={`${currentQuestion.answer}-${opt}`}
                                onClick={() => handleAnswer(opt)}
                                disabled={isAnimating}
                                style={btnStyle}
                                onMouseOver={(e) => {
                                    if (!feedback) e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                                }}
                                onMouseOut={(e) => {
                                    if (!feedback) e.currentTarget.style.backgroundColor = 'white';
                                }}
                            >
                                {opt}
                            </button>
                        );
                    })
                ) : (
                    currentQuestion.analogOptions.map((opt, idx) => {
                        let btnStyle = {
                            padding: '0.8rem',
                            borderRadius: '15px',
                            cursor: 'pointer',
                            transition: '0.2s',
                            background: 'white',
                            border: '3px solid rgb(238, 238, 238)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '120px'
                        };

                        if (feedback && (opt.hour === currentQuestion.hour && opt.minute === currentQuestion.minute)) {
                            btnStyle = { ...btnStyle, background: '#6BCB77', border: '3px solid #6BCB77' };
                        } else if (feedback === 'incorrect' && opt.id === selectedOption?.id) {
                            btnStyle = { ...btnStyle, background: '#FF6B6B', border: '3px solid #FF6B6B', animation: 'shake 0.5s' };
                        }

                        return (
                            <button key={`${currentQuestion.answer}-${opt.hour}-${opt.minute}`} onClick={() => handleAnswer(opt)} disabled={isAnimating} style={btnStyle}>
                                <AnalogClock hour={opt.hour} minute={opt.minute} size={110} showNumbers={true} />
                            </button>
                        );
                    })
                )}
            </div>

            {feedback === 'incorrect' && (
                <div className="fade-in" style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem', color: '#FF6B6B', fontSize: '1.2rem' }}>
                        {t.correctTimeLabel} <b>{currentQuestion.displayTime}</b>.
                    </p>
                    <button className="btn-primary" onClick={generateQuestion} style={{ padding: '0.8rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        {t.nextQuestion} <ArrowRight size={24} />
                    </button>
                </div>
            )}
        </div>
    );
}
