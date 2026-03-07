import React from 'react';
import { LOCALIZATION } from '../utils/localization';

const SUBJECTS = [
    {
        id: 'bm',
        emoji: '📝',
        colorMain: '#0EA5E9',
        colorBg: 'linear-gradient(135deg,#e0f2fe,#bae6fd)',
        colorBadge: '#0EA5E9',
        stars: '⭐⭐',
    },
    {
        id: 'math',
        emoji: '🔢',
        colorMain: '#F43F5E',
        colorBg: 'linear-gradient(135deg,#ffe4e6,#fecdd3)',
        colorBadge: '#F43F5E',
        stars: '⭐⭐⭐',
    },
    {
        id: 'jawi',
        emoji: '📖',
        colorMain: '#7C3AED',
        colorBg: 'linear-gradient(135deg,#ede9fe,#ddd6fe)',
        colorBadge: '#7C3AED',
        stars: '⭐⭐',
    },
];

export default function HomePage({ onSelectSubject, language }) {
    const t = LOCALIZATION[language].home;

    const subjectData = [
        { ...SUBJECTS[0], title: t.bmTitle, desc: t.bmDesc },
        { ...SUBJECTS[1], title: t.mathTitle, desc: t.mathDesc },
        { ...SUBJECTS[2], title: t.jawiTitle, desc: t.jawiDesc },
    ];

    return (
        <div className="fade-in" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: '100%',
            padding: 'clamp(0.5rem, 2vw, 1.5rem) clamp(0.75rem, 3vw, 2rem)',
            boxSizing: 'border-box',
            overflow: 'hidden',
        }}>
            {/* Hero */}
            <div style={{ textAlign: 'center', lineHeight: 1.15 }}>
                <div style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)', marginBottom: '0.15rem' }} className="animate-bounce">
                    🚀
                </div>
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.6rem, 7vw, 2.8rem)',
                    background: 'linear-gradient(135deg, #7C3AED, #F43F5E, #F59E0B)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.25rem',
                    letterSpacing: '0.5px',
                }}>
                    {t.title}
                </h1>
                <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(0.88rem, 3.5vw, 1.1rem)',
                    color: '#6b7280',
                    fontWeight: 600,
                }}>
                    {t.subtitle}
                </p>
            </div>

            {/* Subject Cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'clamp(0.6rem, 2.5vw, 1.25rem)',
                width: '100%',
                maxWidth: '680px',
            }}>
                {subjectData.map((s, i) => (
                    <button
                        key={s.id}
                        className="subject-card fade-in"
                        onClick={() => onSelectSubject(s.id)}
                        style={{
                            background: s.colorBg,
                            border: `3px solid ${s.colorMain}25`,
                            animationDelay: `${i * 0.08}s`,
                        }}
                    >
                        <span className="card-emoji">{s.emoji}</span>
                        <h2 className="card-title" style={{ color: s.colorMain }}>{s.title}</h2>
                        <p className="card-desc">{s.desc}</p>
                        <span className="card-badge" style={{ background: s.colorMain }}>
                            {t.startButton} →
                        </span>
                    </button>
                ))}
            </div>

            {/* Footer tag */}
            <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.72rem, 2.5vw, 0.82rem)',
                color: '#9ca3af',
                fontWeight: 600,
            }}>
                Iman's Learning Adventure • v2.0 ✨
            </p>
        </div>
    );
}
