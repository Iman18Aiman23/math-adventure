import React, { useState } from 'react';
import { ArrowLeft, BookOpen, GraduationCap } from 'lucide-react';
import { JAWI_ALPHABET } from '../utils/jawiData';

export default function JawiPage({ onBack }) {
    const [mode, setMode] = useState('menu'); // 'menu' | 'alphabet'

    const handleBack = () => {
        if (mode === 'alphabet') {
            setMode('menu');
        } else {
            onBack();
        }
    };

    if (mode === 'alphabet') {
        return (
            <div className="fade-in" style={{ padding: '1rem', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                    <button
                        onClick={handleBack}
                        style={{
                            background: 'rgba(0,0,0,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            marginRight: '1rem'
                        }}
                    >
                        <ArrowLeft size={32} color="var(--color-dark)" />
                    </button>
                    <h1 className="game-title" style={{ margin: 0, fontSize: '2.5rem', color: '#9D4EDD' }}>
                        Jawi Alphabet
                    </h1>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                    gap: '1.5rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {JAWI_ALPHABET.map((item, idx) => (
                        <div
                            key={idx}
                            className="card"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1.5rem',
                                background: 'white',
                                borderRadius: '20px',
                                boxShadow: '0 8px 20px rgba(157, 78, 221, 0.1)',
                                border: '2px solid rgba(157, 78, 221, 0.1)',
                                transition: 'all 0.3s ease',
                                cursor: 'default'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.borderColor = '#9D4EDD';
                                e.currentTarget.style.backgroundColor = 'rgba(157, 78, 221, 0.05)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'none';
                                e.currentTarget.style.borderColor = 'rgba(157, 78, 221, 0.1)';
                                e.currentTarget.style.backgroundColor = 'white';
                            }}
                        >
                            <span style={{
                                fontSize: '4rem',
                                color: '#9D4EDD',
                                marginBottom: '0.5rem',
                                fontWeight: 'bold'
                            }}>
                                {item.jawi}
                            </span>
                            <span style={{
                                fontSize: '1.2rem',
                                color: '#666',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                {item.rumi}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="card fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto', position: 'relative' }}>
            <button
                onClick={onBack}
                className="btn-back"
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(0,0,0,0.05)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
            >
                <ArrowLeft size={24} color="var(--color-dark)" />
            </button>

            <div style={{
                color: '#9D4EDD',
                background: 'rgba(157, 78, 221, 0.1)',
                padding: '2rem',
                borderRadius: '30px',
                display: 'inline-flex',
                marginBottom: '2rem'
            }}>
                <BookOpen size={64} />
            </div>

            <h1 className="game-title" style={{ color: '#9D4EDD', fontSize: '3rem' }}>Jawi Learning</h1>
            <p className="game-subtitle" style={{ fontSize: '1.4rem', marginBottom: '3rem' }}>
                Mari belajar mengenal Jawi bersama Iman! ✨
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px', margin: '0 auto' }}>
                <button
                    className="btn-primary"
                    onClick={() => setMode('alphabet')}
                    style={{
                        backgroundColor: '#9D4EDD',
                        padding: '1.5rem',
                        fontSize: '1.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '1rem'
                    }}
                >
                    <GraduationCap size={28} />
                    Learn Jawi Alphabet
                </button>

                <p style={{ color: '#888', fontStyle: 'italic', marginTop: '1rem' }}>
                    More modules coming soon!
                </p>
            </div>
        </div>
    );
}
