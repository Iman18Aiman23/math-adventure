import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LOCALIZATION } from '../../utils/localization';
import { JAWI_STORIES } from '../../utils/jawiStoriesData';
import GameHeader from '../GameHeader';

export default function JawiShortStoriesPage({ onBack, onHome, language }) {
    const t = LOCALIZATION[language].jawi;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayLang, setDisplayLang] = useState('jawi');
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [currentIndex]);

    const story = JAWI_STORIES[currentIndex];

    const handlePrevStory = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleNextStory = () => {
        if (currentIndex < JAWI_STORIES.length - 1) setCurrentIndex(currentIndex + 1);
    };

    const getStoryTitle = () => {
        if (displayLang === 'jawi') return story.title.jawi;
        if (displayLang === 'bm') return story.title.bm;
        return story.title.eng;
    };

    const getLanguageLabel = (lang) => {
        if (lang === 'jawi') return 'جاوي';
        if (lang === 'bm') return 'BM';
        return 'EN';
    };

    const getParagraphText = (para) => {
        if (displayLang === 'jawi') return para.jawi;
        if (displayLang === 'bm') return para.bm;
        return para.eng;
    };

    return (
        <div className="game-container fade-in">
            <GameHeader onBack={onBack} onHome={onHome} title={t.shortStories} language={language} />

            {/* Story Selector & Language Tabs - Same Line */}
            <div style={{
                padding: '0.75rem 1rem',
                background: '#fff',
                borderBottom: '2px solid #E5E5E5',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
            }}>
                {/* Story Dropdown */}
                <select
                    value={currentIndex}
                    onChange={(e) => setCurrentIndex(Number(e.target.value))}
                    style={{
                        padding: '0.6rem 1rem',
                        borderRadius: '16px',
                        border: `2px solid ${story.color}`,
                        background: story.bgColor,
                        color: story.color,
                        fontWeight: 900,
                        fontSize: '0.95rem',
                        cursor: 'pointer',
                        minWidth: '180px',
                        textAlign: 'center',
                        fontFamily: 'inherit'
                    }}
                >
                    {JAWI_STORIES.map((s, idx) => {
                        const title = displayLang === 'jawi' ? s.title.jawi : displayLang === 'bm' ? s.title.bm : s.title.eng;
                        return (
                            <option key={idx} value={idx}>
                                {s.emoji} {title}
                            </option>
                        );
                    })}
                </select>

                {/* Language Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '0.4rem'
                }}>
                    {['jawi', 'bm', 'eng'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setDisplayLang(lang)}
                            style={{
                                padding: '0.5rem 1rem',
                                borderRadius: '16px',
                                border: `2px solid ${story.color}`,
                                background: displayLang === lang ? story.color : '#fff',
                                color: displayLang === lang ? '#fff' : story.color,
                                fontWeight: 800,
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                transform: displayLang === lang ? 'scale(1.05)' : 'scale(1)',
                                fontFamily: 'inherit'
                            }}
                            onMouseEnter={(e) => {
                                if (displayLang !== lang) {
                                    e.currentTarget.style.transform = 'scale(1.08)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = `scale(${displayLang === lang ? 1.05 : 1})`;
                            }}
                        >
                            {getLanguageLabel(lang)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable content */}
            <div ref={scrollContainerRef} style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start'
            }}>
                {/* Book Container with Key to trigger re-animation */}
                <div key={currentIndex} className="fade-in" style={{
                    background: story.bgGradient,
                    borderRadius: isMobile ? '0' : '28px',
                    padding: isMobile ? '1.5rem 1.5rem' : '3rem 2.5rem',
                    boxShadow: isMobile ? 'none' : '0 12px 40px rgba(0,0,0,0.15)',
                    width: '100%',
                    margin: '0',
                    border: 'none'
                }}>
                    {/* Story Banner Header - Smaller */}
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '1.5rem',
                        position: 'relative',
                        paddingBottom: '1rem'
                    }}>
                        {/* Main emoji with bounce */}
                        <div style={{
                            fontSize: isMobile ? '4.2rem' : '5.5rem',
                            marginBottom: '0.5rem',
                            animation: 'bounce 2s ease-in-out infinite',
                            display: 'inline-block'
                        }}>
                            {story.emoji}
                        </div>

                        {/* Title */}
                        <h1 style={{
                            fontSize: isMobile ? '1.7rem' : '2.4rem',
                            fontWeight: 900,
                            color: story.color,
                            margin: 0,
                            direction: displayLang === 'jawi' ? 'rtl' : 'ltr',
                            fontFamily: displayLang === 'jawi' ? 'serif' : 'inherit'
                        }}>
                            {getStoryTitle()}
                        </h1>
                    </div>

                    {/* Story Paragraphs as Cards */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginTop: '1.5rem'
                    }}>
                        {story.paragraphs.map((para, idx) => {
                            const text = getParagraphText(para);
                            const isEven = idx % 2 === 0;
                            const sceneEmoji = story.sceneEmojis[idx];
                            const accentColor = story.accentColors[idx];

                            return (
                                <div
                                    key={idx}
                                    className="fade-in"
                                    style={{
                                        display: 'flex',
                                        flexDirection: isEven ? 'row' : 'row-reverse',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        background: '#fff',
                                        borderRadius: '14px',
                                        padding: '1rem',
                                        border: `3px solid ${accentColor}`,
                                        borderLeft: isEven ? `6px solid ${story.color}` : 'none',
                                        borderRight: !isEven ? `6px solid ${story.color}` : 'none',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                        position: 'relative',
                                        animationDelay: `${idx * 0.08}s`
                                    }}
                                >
                                    {/* Paragraph number badge */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        [isEven ? 'left' : 'right']: '12px',
                                        background: story.color,
                                        color: '#fff',
                                        width: '28px',
                                        height: '28px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 900,
                                        fontSize: '0.8rem',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                    }}>
                                        {idx + 1}
                                    </div>

                                    {/* Scene Emoji */}
                                    <div style={{
                                        fontSize: '3rem',
                                        minWidth: '4rem',
                                        textAlign: 'center',
                                        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
                                    }}>
                                        {sceneEmoji}
                                    </div>

                                    {/* Text */}
                                    <p style={{
                                        fontSize: isMobile ? '1.25rem' : '1.55rem',
                                        fontWeight: 700,
                                        color: '#3C3C3C',
                                        lineHeight: 1.8,
                                        margin: 0,
                                        direction: displayLang === 'jawi' ? 'rtl' : 'ltr',
                                        textAlign: displayLang === 'jawi' ? 'right' : 'left',
                                        fontFamily: displayLang === 'jawi' ? 'serif' : 'inherit',
                                        flex: 1
                                    }}>
                                        {text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer Navigation */}
            <div style={{
                padding: '0.6rem 1rem',
                background: '#fff',
                borderTop: '2px solid #E5E5E5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.75rem'
            }}>
                {/* Previous Button */}
                <button
                    onClick={handlePrevStory}
                    disabled={currentIndex === 0}
                    style={{
                        flex: 0.8,
                        padding: '1rem',
                        borderRadius: '16px',
                        border: 'none',
                        background: currentIndex === 0 ? '#E5E5E5' : story.color,
                        color: currentIndex === 0 ? '#999' : '#fff',
                        fontWeight: 900,
                        fontSize: '0.95rem',
                        cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        fontFamily: 'inherit',
                        boxShadow: currentIndex === 0 ? 'none' : `0 4px 12px ${story.color}40`
                    }}
                    onMouseDown={(e) => {
                        if (currentIndex > 0) {
                            e.currentTarget.style.transform = 'scale(0.95)';
                        }
                    }}
                    onMouseUp={(e) => {
                        if (currentIndex > 0) {
                            e.currentTarget.style.transform = 'scale(1)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <ChevronLeft size={20} /> {displayLang === 'jawi' ? t.prevJawi : t.prev}
                </button>

                {/* Story Dot Indicators */}
                <div style={{
                    display: 'flex',
                    gap: '0.6rem',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {JAWI_STORIES.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            style={{
                                width: currentIndex === idx ? '24px' : '12px',
                                height: '12px',
                                borderRadius: '6px',
                                border: 'none',
                                background: currentIndex === idx ? story.color : '#DDD',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                boxShadow: currentIndex === idx ? `0 2px 8px ${story.color}40` : 'none'
                            }}
                            title={`Story ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNextStory}
                    disabled={currentIndex === JAWI_STORIES.length - 1}
                    style={{
                        flex: 0.8,
                        padding: '1rem',
                        borderRadius: '16px',
                        border: 'none',
                        background: currentIndex === JAWI_STORIES.length - 1 ? '#E5E5E5' : story.color,
                        color: currentIndex === JAWI_STORIES.length - 1 ? '#999' : '#fff',
                        fontWeight: 900,
                        fontSize: '0.95rem',
                        cursor: currentIndex === JAWI_STORIES.length - 1 ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem',
                        fontFamily: 'inherit',
                        boxShadow: currentIndex === JAWI_STORIES.length - 1 ? 'none' : `0 4px 12px ${story.color}40`
                    }}
                    onMouseDown={(e) => {
                        if (currentIndex < JAWI_STORIES.length - 1) {
                            e.currentTarget.style.transform = 'scale(0.95)';
                        }
                    }}
                    onMouseUp={(e) => {
                        if (currentIndex < JAWI_STORIES.length - 1) {
                            e.currentTarget.style.transform = 'scale(1)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    {displayLang === 'jawi' ? t.nextJawi : t.next} <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
}
