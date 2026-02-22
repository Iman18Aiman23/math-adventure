import React from 'react';
import { BookOpen, Calculator, Languages } from 'lucide-react';
import { LOCALIZATION } from '../utils/localization';

export default function HomePage({ onSelectSubject, language }) {
    const t = LOCALIZATION[language].home;
    const subjects = [
        {
            id: 'bm',
            title: t.bmTitle,
            icon: <Languages size={48} />,
            color: '#4ECDC4',
            description: t.bmDesc
        },
        {
            id: 'math',
            title: t.mathTitle,
            icon: <Calculator size={48} />,
            color: '#FF6B6B',
            description: t.mathDesc
        },
        {
            id: 'jawi',
            title: t.jawiTitle,
            icon: <BookOpen size={48} />,
            color: '#9D4EDD',
            description: t.jawiDesc
        }
    ];

    return (
        <div className="fade-in" style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 className="game-title" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                {t.title}
            </h1>
            <p className="game-subtitle" style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>
                {t.subtitle}
            </p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {subjects.map((subject) => (
                    <button
                        key={subject.id}
                        onClick={() => onSelectSubject(subject.id)}
                        className="card"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1.5rem',
                            padding: '3rem 2rem',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            background: 'white',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                            e.currentTarget.style.boxShadow = `0 20px 40px ${subject.color}20`;
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* Decorative circle background */}
                        <div style={{
                            position: 'absolute',
                            top: '-20px',
                            right: '-20px',
                            width: '100px',
                            height: '100px',
                            background: subject.color,
                            opacity: 0.1,
                            borderRadius: '50%'
                        }} />

                        <div style={{
                            color: subject.color,
                            background: `${subject.color}15`,
                            padding: '1.5rem',
                            borderRadius: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {subject.icon}
                        </div>

                        <div>
                            <h2 style={{ color: 'var(--color-dark)', fontSize: '2rem', marginBottom: '0.5rem' }}>
                                {subject.title}
                            </h2>
                            <p style={{ color: '#666', fontSize: '1.1rem' }}>
                                {subject.description}
                            </p>
                        </div>

                        <div style={{
                            backgroundColor: subject.color,
                            color: 'white',
                            padding: '0.8rem 2rem',
                            borderRadius: '15px',
                            fontWeight: 'bold',
                            marginTop: '1rem',
                            fontSize: '1.1rem'
                        }}>
                            {t.startButton}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
