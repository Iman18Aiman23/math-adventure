import React from 'react';
import { ArrowLeft, Construction, Home } from 'lucide-react';

export default function BMPage({ onBack, onHome }) {
    return (
        <div className="card fade-in" style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-dark)'
                    }}
                >
                    <ArrowLeft size={32} />
                </button>
                <button
                    onClick={onHome}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-dark)'
                    }}
                >
                    <Home size={28} />
                </button>
            </div>

            <Construction size={80} color="#4ECDC4" style={{ marginBottom: '2rem' }} />
            <h1 className="game-title" style={{ color: '#4ECDC4' }}>Bahasa Melayu</h1>
            <p className="game-subtitle" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                Akan datang tidak lama lagi! 🚀
            </p>
            <p style={{ color: '#666', fontSize: '1.2rem' }}>
                Kami sedang menyiapkan modul pembelajaran suku kata dan kosa kata yang menyeronokkan untuk anda.
            </p>

            <button
                className="btn-primary"
                onClick={onBack}
                style={{ backgroundColor: '#4ECDC4', marginTop: '3rem', width: 'auto', padding: '1rem 3rem' }}
            >
                Kembali ke Menu Utama
            </button>
        </div>
    );
}
