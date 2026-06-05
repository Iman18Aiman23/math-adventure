import React, { useState, useEffect, useRef, useContext } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RefreshCw, Trophy, Home, Keyboard, Volume2, VolumeX, ArrowRight, Grid, Shuffle, X } from 'lucide-react';
import clsx from 'clsx';
import { JAWI_TOPICS } from '../../../../utils/jawiWordsData';
import { playSound, toggleMute, getMuted } from '../../../../utils/soundManager';
import { LOCALIZATION } from '../../../../utils/localization';
import GameHeader from '../../../GameHeader';
import AppHeader from '../../../AppHeader';
import { GameStateContext, useGameStateContext } from '../../../../App';
import { getGameData, addCorrectAnswer, deductHeart } from '../../../../utils/gameStatsManager';
import { FONT_IMPORT } from '../../_shared/arabic';

const THEME = {
  pageGradient: 'linear-gradient(180deg,#ECFDF5 0%,#D1FAE5 50%,#A7F3D0 100%)',
  dark: '#065F46',
  accent: '#10B981',
  stageGradient: 'radial-gradient(ellipse at 50% 32%,#D1FAE5 0%,#6EE7B7 55%,#10B981 100%)',
};

const STREAK_MILESTONE = 10;

const STREAK_CHEERS_BM  = ['Bagus!', 'Cemerlang!', 'Hebat!', 'Luar Biasa!', 'Menakjubkan!', 'BINTANG!', 'JUARA!', 'PAKAR BAHASA!'];
const STREAK_CHEERS_EN  = ['Great!', 'Excellent!', 'Fantastic!', 'Amazing!', 'Incredible!', 'SUPERSTAR!', 'CHAMPION!', 'LANGUAGE WIZARD!'];

function StreakPopup({ streak, language, onClose }) {
  const milestoneCount = Math.floor(streak / STREAK_MILESTONE);
  const cheers = language === 'bm' ? STREAK_CHEERS_BM : STREAK_CHEERS_EN;
  const cheer = cheers[Math.min(milestoneCount - 1, cheers.length - 1)];

  return (
    <div className="ops-streak-overlay" onClick={onClose}>
      <div className="ops-streak-popup" onClick={e => e.stopPropagation()}>
        <div className="ops-streak-firework">🎉</div>
        <div className="ops-streak-number">{streak}</div>
        <div className="ops-streak-label">
          {language === 'bm' ? 'jawapan betul berturut-turut!' : 'correct answers in a row!'}
        </div>
        <div className="ops-streak-cheer">{cheer}</div>
        <button className="ops-streak-continue" onClick={onClose}>
          {language === 'bm' ? 'Terus! 🚀' : 'Keep Going! 🚀'}
        </button>
      </div>
    </div>
  );
}

const TOPIC_OPTIONS = [
  { id: 'random', labelBM: 'Semua Topik (Rawak)', labelEN: 'All Topics (Random)', emoji: '🎲', color: '#FF5E62' },
  ...JAWI_TOPICS.map(t => ({
    id: t.id,
    labelBM: t.title,
    labelEN: t.titleEng || t.title,
    emoji: t.words[0]?.emoji || '📚',
    color: t.color || '#999'
  }))
];

export default function Jawi100WordsGame({ onBack, onHome, language }) {
    const t = LOCALIZATION[language].jawiGames;
    const gameState = useGameStateContext();

    const getStreakMessage = (streakValue) => {
        const messages = t.streakMessages;
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

    const [selectedTopicId, setSelectedTopicId] = useState('random');
    const [currentWord, setCurrentWord] = useState(null);
    const [questionCount, setQuestionCount] = useState(0);
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [isMuted, setIsMuted] = useState(getMuted());
    const [showStreakPopup, setShowStreakPopup] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [hearts, setHearts] = useState(3);
    const [gems, setGems] = useState(0);
    const [stars, setStars] = useState(0);
    const [showSummary, setShowSummary] = useState(false);
    const [topicOpen, setTopicOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
      const gameData = getGameData();
      setHearts(gameData.hearts);
      setGems(gameData.gems);
      setStars(gameData.stars);
      setStreak(gameData.streak);
    }, []);

    useEffect(() => {
      startGame('random');
    }, []);

    const handleToggleMute = () => {
        const muted = toggleMute();
        setIsMuted(muted);
    };

    useEffect(() => {
        if (currentWord && inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentWord]);

    const generateRandomWord = (topicId) => {
        let pool = [];
        if (topicId === 'random') {
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

    const startGame = (topicId) => {
        setSelectedTopicId(topicId);
        setQuestionCount(1);
        setScore(0);
        setStreak(0);
        setShowSummary(false);
        setFeedback(null);
        setUserAnswer('');
        setIsAnimating(false);
        setShowStreakPopup(false);
        setShowImage(false);
        setCurrentWord(generateRandomWord(topicId));
        setTopicOpen(false);
    };

    const nextProblem = () => {
        const nextWord = generateRandomWord(selectedTopicId);
        if (!nextWord) {
            setShowSummary(true);
            return;
        }
        setCurrentWord(nextWord);
        setQuestionCount(prev => prev + 1);
        setFeedback(null);
        setUserAnswer('');
        setIsAnimating(false);
        setShowStreakPopup(false);
        setShowImage(false);
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

            const gameData = addCorrectAnswer();
            setGems(gameData.gems);
            setStars(gameData.stars);
            const newStreak = gameData.streak;
            setStreak(newStreak);

            if (newStreak > 0 && newStreak % STREAK_MILESTONE === 0) {
                playSound('streak');
                setShowStreakPopup(true);
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.5 }
                });
            } else {
                playSound('correct');
                confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
                setTimeout(nextProblem, 1000);
            }
        } else {
            setFeedback('incorrect');
            playSound('wrong');
            setIsAnimating(true);
            const gameData = deductHeart();
            setHearts(gameData.hearts);
            setStreak(gameData.streak);
        }
    };

    const selectedTopic = TOPIC_OPTIONS.find(o => o.id === selectedTopicId);
    const topicColor = selectedTopic && selectedTopic.id !== 'random'
        ? (JAWI_TOPICS.find(t => t.id === selectedTopic.id)?.color || THEME.accent)
        : THEME.accent;

    // --- Summary screen ---
    if (showSummary) {
        const totalPossibleScore = questionCount * 10;
        const percentage = totalPossibleScore > 0 ? Math.round((score / totalPossibleScore) * 100) : 0;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', fontFamily: "'Fredoka',system-ui,sans-serif", background: THEME.pageGradient }}>
                <AppHeader onBack={onBack} gameState={gameState} language={language} />

                <div style={{ textAlign: 'center', padding: '2rem 1.5rem', maxWidth: '600px', margin: '1rem auto', background: '#fff', borderRadius: 24, boxShadow: `0 14px 34px -16px ${THEME.dark}48,0 2px 6px ${THEME.dark}0D` }}>
                    <Trophy size={64} color="#FFD93D" style={{ marginBottom: '1rem' }} />
                    <h1 style={{ color: THEME.dark, fontSize: '2rem', marginBottom: '0.5rem', fontFamily: "'Baloo 2',sans-serif", fontWeight: 800 }}>{t.gameOver}</h1>
                    <p style={{ fontSize: '1.1rem', color: '#8A5670', marginBottom: '2rem' }}>
                        {percentage === 100 ? t.perfectScore : t.wellDone}
                    </p>

                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: THEME.accent, marginBottom: '0.5rem' }}>
                        {score}
                    </div>
                    <div style={{ fontSize: '1.2rem', color: '#8A5670', marginBottom: '2rem' }}>
                        {t.totalScore} ({questionCount} {language === 'bm' ? 'perkataan' : 'words'})
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                        <button onClick={() => startGame(selectedTopicId)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '14px 28px', borderRadius: 60, border: 'none', background: `linear-gradient(180deg,${THEME.accent}cc,${THEME.accent})`, color: '#fff', fontSize: 16, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', boxShadow: `0 6px 20px -4px ${THEME.dark}66` }}>
                            <RefreshCw size={20} /> {t.newGame}
                        </button>
                        <button onClick={onHome} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '14px 28px', borderRadius: 60, border: `2px solid ${THEME.accent}44`, background: '#fff', color: THEME.dark, fontSize: 16, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>
                            <Home size={20} /> {language === 'bm' ? 'Utama' : 'Home'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentWord) {
        return (
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', background: THEME.pageGradient, fontFamily: "'Fredoka',system-ui,sans-serif", color: '#8A5670', fontSize: 18 }}>
                <AppHeader onBack={onBack} gameState={gameState} language={language} />
                <div style={{ textAlign: 'center', paddingTop: 80 }}>
                    {t.loading || 'Loading...'}
                </div>
            </div>
        );
    }

    return (
        <div style={{
          display: 'flex', flexDirection: 'column', flex: 1, width: '100%', maxWidth: '100%',
          backgroundImage: THEME.pageGradient,
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#A7F3D0',
          fontFamily: "'Fredoka',system-ui,sans-serif",
          color: THEME.dark
        }}>
            <style>{FONT_IMPORT}</style>
            <AppHeader onBack={onBack} gameState={gameState} language={language} hearts={hearts} gems={gems} stars={stars} />

            {/* Topic toggle + selector */}
            <div style={{ flex: 'none', position: 'relative', zIndex: 5 }}>
                <div style={{
                    display: 'flex', justifyContent: 'center',
                    padding: topicOpen ? '0' : '8px 16px'
                }}>
                    <button
                        onClick={() => setTopicOpen(o => !o)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '7px 18px', borderRadius: 999,
                            border: `2px solid ${topicOpen ? topicColor : `${THEME.accent}44`}`,
                            background: topicOpen ? `${topicColor}18` : 'rgba(255,255,255,.85)',
                            color: topicOpen ? topicColor : THEME.dark,
                            cursor: 'pointer', fontSize: 12, fontWeight: 700,
                            fontFamily: "'Baloo 2',sans-serif", letterSpacing: '.04em',
                            transition: 'all .2s cubic-bezier(.34,1.56,.64,1)',
                            boxShadow: topicOpen ? `0 2px 8px ${topicColor}33` : `0 2px 8px ${THEME.dark}0D`,
                            backdropFilter: topicOpen ? 'none' : 'blur(8px)'
                        }}
                    >
                        <Shuffle size={14} />
                        {topicOpen
                            ? (language === 'bm' ? 'Tutup' : 'Close')
                            : (language === 'bm' ? 'Tukar Topik' : 'Change Topic')}
                    </button>
                </div>

                {topicOpen && (
                    <div style={{
                        background: 'rgba(255,255,255,.92)',
                        backdropFilter: 'blur(14px)',
                        borderBottom: `1px solid ${THEME.accent}2E`,
                        padding: '10px 14px 14px',
                        animation: 'fadeIn .15s ease',
                        boxShadow: `0 8px 24px ${THEME.dark}12`
                    }}>
                        <div style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, fontFamily: "'Baloo 2',sans-serif", letterSpacing: '.1em', textTransform: 'uppercase', color: '#8A5670', marginBottom: 8 }}>
                            {language === 'bm' ? 'Pilih Topik' : 'Choose Topic'}
                        </div>
                        <div style={{
                            display: 'flex', flexWrap: 'wrap', gap: 6,
                            justifyContent: 'center'
                        }}>
                            {TOPIC_OPTIONS.map(opt => {
                                const isActive = selectedTopicId === opt.id;
                                return (
                                    <button
                                        key={opt.id}
                                        onClick={() => startGame(opt.id)}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 5,
                                            flex: '0 0 auto',
                                            padding: '8px 16px', borderRadius: 999,
                                            border: `2px solid ${isActive ? opt.color : `${THEME.accent}22`}`,
                                            background: isActive
                                                ? `linear-gradient(135deg,${opt.color}18,${opt.color}08)`
                                                : '#fff',
                                            color: isActive ? opt.color : THEME.dark,
                                            cursor: 'pointer', fontSize: 12, fontWeight: 700,
                                            fontFamily: "'Fredoka',system-ui,sans-serif",
                                            boxShadow: isActive
                                                ? `0 2px 8px ${opt.color}33`
                                                : `0 1px 3px ${THEME.dark}0D`,
                                            transition: 'all .2s cubic-bezier(.34,1.56,.64,1)',
                                            transform: isActive ? 'scale(1.04)' : 'scale(1)'
                                        }}
                                    >
                                        <span style={{ fontSize: 14 }}>{opt.emoji}</span>
                                        <span style={{
                                            whiteSpace: 'nowrap',
                                            maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis'
                                        }}>
                                            {language === 'bm' ? opt.labelBM : opt.labelEN}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Content area */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.25rem 1rem', gap: '1.25rem' }}>

            {/* Question Card */}
            <div style={{
                background: topicColor || THEME.accent,
                color: 'white',
                padding: '2rem 1.25rem',
                position: 'relative',
                margin: '0',
                width: '100%',
                maxWidth: '480px',
                boxSizing: 'border-box',
                borderRadius: 24,
                boxShadow: `0 14px 34px -16px ${THEME.dark}48,0 2px 6px ${THEME.dark}0D`
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
                        fontSize: '0.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontWeight: 700,
                        fontFamily: "'Baloo 2',sans-serif",
                        zIndex: 10
                    }}
                >
                    {showImage ? (language === 'bm' ? 'Sembunyi' : 'Hide') : (language === 'bm' ? 'Papar' : 'Show')}
                </button>
                <div style={{ fontSize: '0.9rem', opacity: 0.85, fontWeight: 600, marginBottom: '0.75rem', fontFamily: "'Baloo 2',sans-serif", letterSpacing: '.03em', textAlign: 'center' }}>
                    {t.typeRumi}
                </div>

                {showImage && (
                    <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)' }}>
                            {currentWord.emoji}
                        </div>
                    </div>
                )}

                <div style={{
                    fontFamily: "'Amiri','Scheherazade New',serif",
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontSize: 'clamp(2.5rem, 10vw, 4rem)',
                    fontWeight: 700,
                    textAlign: 'center',
                    direction: 'rtl',
                    lineHeight: 1.2
                }}>
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
                            padding: '1rem',
                            fontFamily: "'Fredoka',system-ui,sans-serif",
                            borderRadius: 16,
                            border: `3px solid ${feedback === 'correct' ? '#6BCB77' : feedback === 'incorrect' ? '#FF6B6B' : `${THEME.accent}33`}`
                        }}
                    />
                </form>
                {feedback === 'correct' && (
                    <div style={{ marginTop: '0.75rem', color: '#6BCB77', fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center', fontFamily: "'Baloo 2',sans-serif" }}>
                        {t.correct}
                    </div>
                )}
            </div>

            {/* Next Button for Wrong Answers */}
            {feedback === 'incorrect' && (
                <div className="fade-in" style={{ marginTop: '0.5rem', textAlign: 'center', width: '100%', maxWidth: '480px', padding: '0 0.5rem', boxSizing: 'border-box' }}>
                    <p style={{ marginBottom: '0.75rem', color: '#FF6B6B', fontSize: '1.1rem', fontWeight: 600 }}>
                        {t.incorrectLabel} <b>{currentWord.rumi}</b>.
                    </p>
                    <button
                        onClick={nextProblem}
                        style={{
                            padding: '12px 32px', borderRadius: 60, border: 'none',
                            background: `linear-gradient(180deg,${THEME.accent}cc,${THEME.accent})`,
                            color: '#fff', fontSize: '1.1rem', fontWeight: 700,
                            fontFamily: "'Fredoka',system-ui,sans-serif",
                            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            boxShadow: `0 6px 20px -4px ${THEME.dark}66`
                        }}
                    >
                        {t.nextWord} <ArrowRight size={20} />
                    </button>
                </div>
            )}

            </div>

            {/* Footer Stats */}
            <div className="ops-footer-stats" style={{ background: 'rgba(255,255,255,.85)', backdropFilter: 'blur(12px)', borderTop: `1px solid ${THEME.accent}2E`, justifyContent: 'space-between', padding: '6px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#64748b', flexWrap: 'wrap' }}>
                    <span>{language === 'bm' ? 'Jawapan :' : 'Answer :'}</span>
                    <span style={{ color: THEME.dark, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span>✅</span><span>{score / 10}</span><span style={{ color: '#94a3b8', fontWeight: 500 }}>Betul</span>
                    </span>
                    <span style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: 3 }}>
                        <span>❌</span><span>{questionCount - 1 - score / 10}</span><span style={{ color: '#94a3b8', fontWeight: 500 }}>salah</span>
                    </span>
                </div>
                {(() => {
                    const progressInGroup = showStreakPopup && streak % 10 === 0 && streak > 0 ? 10 : streak % 10;
                    return (
                        <div className="ops-stat-chip ops-stat-chip-highlight" style={{ gap: '4px' }}>
                            <span style={{ fontSize: 18 }}>🏆</span>
                            <div style={{ width: '70px', height: '7px', background: 'rgba(204, 119, 0, 0.15)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: `${(progressInGroup / 10) * 100}%`, height: '100%', background: '#FFB800', borderRadius: '4px', transition: 'width 0.3s ease-out' }} />
                            </div>
                            <span style={{ color: '#CC7700', fontSize: '0.85rem', fontWeight: 900, minWidth: '28px', textAlign: 'right' }}>
                                {progressInGroup}/10
                            </span>
                        </div>
                    );
                })()}
            </div>

            {/* Streak popup */}
            {showStreakPopup && (
                <StreakPopup
                    streak={streak}
                    language={language}
                    onClose={() => { setShowStreakPopup(false); nextProblem(); }}
                />
            )}
        </div>
    );
}
