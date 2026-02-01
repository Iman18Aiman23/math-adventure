import React from 'react';
import { ArrowLeft, Construction } from 'lucide-react';

export default function JawiPage({ onBack }) {
    return (
        <div className="card fade-in" style={{ padding: '3rem', textAlign: 'center' }}>
            <button
                onClick={onBack}
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-dark)'
                }}
            >
                <ArrowLeft size={32} />
            </button>

            <Construction size={80} color="#9D4EDD" style={{ marginBottom: '2rem' }} />
            <h1 className="game-title" style={{ color: '#9D4EDD' }}>Jawi</h1>
            <p className="game-subtitle" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                Akan datang tidak lama lagi! 🚀
            </p>
            <p style={{ color: '#666', fontSize: '1.2rem' }}>
                Mari bersedia untuk belajar mengenal huruf Jawi dengan cara yang paling menarik!
            </p>

            <button
                className="btn-primary"
                onClick={onBack}
                style={{ backgroundColor: '#9D4EDD', marginTop: '3rem', width: 'auto', padding: '1rem 3rem' }}
            >
                Kembali ke Menu Utama
            </button>
        </div>
    );
}
