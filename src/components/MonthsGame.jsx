import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { RefreshCw, Trophy, ArrowRight, MousePointerClick, Keyboard, HelpCircle, X, Languages } from 'lucide-react';
import { MONTHS } from '../utils/timeData';
import { playSound, toggleMute, getMuted } from '../utils/soundManager';
import clsx from 'clsx';
import GameHeader from './GameHeader';
import { LOCALIZATION } from '../utils/localization';

export default function MonthsGame({ onBack, onHome, language }) {
    const [quizType, setQuizType] = useState('multiple'); // 'multiple' or 'typing'
    const [questionMode, setQuestionMode] = useState('name'); // 'name' = show Name/Malay → answer Islamic | 'islamic' = show Islamic → answer Name/Malay
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [isMuted, setIsMuted] = useState(getMuted());
    const [isAnimating, setIsAnimating] = useState(false);
    const [showReference, setShowReference] = useState(false);
    const inputRef = useRef(null);

    const t = LOCALIZATION[language].monthsGame;

    useEffect(() => {
        generateQuestion();
    }, [questionMode, language]);

    useEffect(() => {
        if (currentQuestion && quizType === 'typing' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentQuestion, quizType]);

    const generateQuestion = () => {
        const month = MONTHS[Math.floor(Math.random() * MONTHS.length)];

        let question;
        if (questionMode === 'name') {
            // Show Name + Malay → answer is Islamic
            const distractors = MONTHS
                .filter(m => m.id !== month.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(m => m.islamic);
            question = {
                prompt: t.promptName,
                display: month.name,
                subtitle: month.malay,
                answer: month.islamic,
                options: [month.islamic, ...distractors].sort(() => 0.5 - Math.random()),
                correctInfo: `${month.name} (${month.malay}) → ${month.islamic}`
            };
        } else if (questionMode === 'islamic') {
            // Show Islamic → answer is Name/Malay
            const distractors = MONTHS
                .filter(m => m.id !== month.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(m => m.name);
            question = {
                prompt: t.promptIslamic,
                display: month.islamic,
                subtitle: null,
                answer: month.name,
                options: [month.name, ...distractors].sort(() => 0.5 - Math.random()),
                correctInfo: `${month.islamic} → ${month.name} (${month.malay})`
            };
        } else {
            // Show Number → answer is Name/Malay
            const distractors = MONTHS
                .filter(m => m.id !== month.id)
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map(m => `${m.name}/${m.malay}`);
            const correctAnswer = `${month.name}/${month.malay}`;
            question = {
                prompt: t.promptNumber,
                display: month.id,
                subtitle: null,
                answer: correctAnswer,
                options: [correctAnswer, ...distractors].sort(() => 0.5 - Math.random()),
                correctInfo: `${t.correctInfoPrefix} ${month.id} ${t.correctInfoSuffix} ${month.name} (${month.malay})`
            };
        }

        setCurrentQuestion(question);
        setShuffledOptions(question.options);
        setFeedback(null);
        setUserAnswer('');
        setSelectedOption(null);
        setIsAnimating(false);
    };

    const handleAnswer = (answer) => {
        if (isAnimating) return;

        const input = answer.toLowerCase().trim();
        const expected = currentQuestion.answer.toLowerCase().trim();

        // Multi-answer support (e.g. "January/Januari")
        const isCorrect = input === expected ||
            (expected.includes('/') && expected.split('/').some(part => part.trim().toLowerCase() === input));

        setSelectedOption(answer);

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

    if (!currentQuestion) return <div>Loading...</div>;

    const bgColor = questionMode === 'name' ? '#9D4EDD' : '#4ECDC4';

    const toggleBtnStyle = (active) => ({
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        border: active ? '2px solid #9D4EDD' : '2px solid #eee',
        background: active ? '#f3e5f5' : 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        fontSize: '0.85rem',
        fontWeight: 'bold'
    });

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

            {/* Mode Toggles */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                {/* Row 1: Logic Modes */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setQuestionMode('number')} style={toggleBtnStyle(questionMode === 'number')}>
                        {t.modeNumber}
                    </button>
                    <button onClick={() => setQuestionMode('name')} style={toggleBtnStyle(questionMode === 'name')}>
                        {t.modeName}
                    </button>
                    <button onClick={() => setQuestionMode('islamic')} style={toggleBtnStyle(questionMode === 'islamic')}>
                        {t.modeIslamic}
                    </button>
                </div>

                {/* Row 2: Quiz Type */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setQuizType('multiple')} style={toggleBtnStyle(quizType === 'multiple')}>
                        <MousePointerClick size={16} color="#9D4EDD" /> {t.quizABCD}
                    </button>
                    <button onClick={() => setQuizType('typing')} style={toggleBtnStyle(quizType === 'typing')}>
                        <Keyboard size={16} color="#9D4EDD" /> {t.quizType}
                    </button>
                </div>
            </div>

            {/* Question Card */}
            <div className="question-card fade-in" style={{
                background: bgColor,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}>
                {/* Reference Button */}
                <button
                    onClick={() => setShowReference(true)}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'rgba(255,255,255,0.2)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white',
                        transition: 'all 0.2s ease'
                    }}
                    title="Show Months Reference"
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                >
                    <HelpCircle size={24} />
                </button>

                <div style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '1rem' }}>
                    {currentQuestion.prompt}
                </div>
                <div className="question-text-lg" style={{ lineHeight: 1.2 }}>
                    {currentQuestion.display}
                </div>
                {currentQuestion.subtitle && (
                    <div style={{ fontSize: '1.8rem', marginTop: '1rem', fontStyle: 'italic', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1.5rem', borderRadius: '15px' }}>
                        {currentQuestion.subtitle}
                    </div>
                )}
            </div>

            {/* Answer Section */}
            {quizType === 'multiple' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {shuffledOptions.map((opt, idx) => {
                        let btnStyle = {
                            padding: '1.5rem',
                            borderRadius: '15px',
                            fontSize: '1.3rem',
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
                            <button key={idx} onClick={() => handleAnswer(opt)} disabled={isAnimating} style={btnStyle}>
                                {opt}
                            </button>
                        );
                    })}
                </div>
            ) : (
                <div className="fade-in" style={{ width: '100%' }}>
                    <form onSubmit={(e) => { e.preventDefault(); handleAnswer(userAnswer); }} className="input-wrapper" style={{ width: '100%', maxWidth: '100%' }}>
                        <input
                            ref={inputRef}
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            disabled={isAnimating}
                            placeholder={t.placeholder}
                            autoFocus
                            className={clsx(
                                "standard-input",
                                feedback === 'correct' && 'correct-input',
                                feedback === 'incorrect' && 'incorrect-input'
                            )}
                            style={{ width: '100%' }}
                        />
                    </form>
                </div>
            )}

            {feedback === 'incorrect' && (
                <div className="fade-in" style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <p style={{ marginBottom: '1rem', color: '#FF6B6B', fontSize: '1.2rem' }}>
                        {t.incorrectFeedback} <b>{currentQuestion.answer}</b>.
                    </p>
                    <p style={{ marginBottom: '1rem', color: '#888', fontSize: '1rem' }}>
                        {currentQuestion.correctInfo}
                    </p>
                    <button className="btn-primary" onClick={generateQuestion} style={{ padding: '0.8rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        {t.nextQuest} <ArrowRight size={24} />
                    </button>
                </div>
            )}
            {/* Reference Modal */}
            {showReference && createPortal(
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '1rem'
                }} onClick={() => setShowReference(false)}>
                    <div
                        className="card fade-in"
                        style={{
                            background: 'white',
                            padding: '1.5rem',
                            borderRadius: '25px',
                            maxWidth: '600px',
                            width: '100%',
                            maxHeight: '85vh',
                            overflowY: 'auto',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #eee', paddingBottom: '0.8rem' }}>
                            <h2 style={{ margin: 0, color: '#9D4EDD' }}>{t.refTitle}</h2>
                            <button
                                onClick={() => setShowReference(false)}
                                style={{ background: '#FF6B6B', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ padding: '0.5rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #ddd' }}>
                                        <th style={{ padding: '0.8rem 0.5rem', color: '#666' }}>{t.refNo}</th>
                                        <th style={{ padding: '0.8rem 0.5rem', color: '#666' }}>{t.refNames}</th>
                                        <th style={{ padding: '0.8rem 0.5rem', color: '#666' }}>{t.refIslamic}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MONTHS.map(m => (
                                        <tr key={m.id} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '0.8rem 0.5rem', fontWeight: 'bold', color: '#9D4EDD' }}>{m.id}</td>
                                            <td style={{ padding: '0.8rem 0.5rem' }}>
                                                <div style={{ fontWeight: '600' }}>{m.name}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#666' }}>{m.malay}</div>
                                            </td>
                                            <td style={{ padding: '0.8rem 0.5rem', fontWeight: 'bold', color: '#4ECDC4' }}>{m.islamic}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
