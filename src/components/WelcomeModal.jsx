import React, { useEffect, useRef, useState } from 'react';
import MascotIcon from './icons/MascotIcon';

const welcomeStyles = `
  .welcome-logo-text {
    font-size: 2.8rem;
    font-weight: 900;
    background: linear-gradient(135deg, #2D4059 0%, #4A6FA5 50%, #A3D8F4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 1px;
    font-family: 'Fredoka One', cursive;
    margin: 0;
  }
  .welcome-subtitle-text {
    color: #F4C430;
    font-family: 'Fredoka One', cursive;
    font-size: 1.2rem;
    letter-spacing: 3px;
    margin: 0;
  }
`;

export default function WelcomeModal({ onSave }) {
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed);
  };

  return (
    <>
      <style>{welcomeStyles}</style>
      <div className="welcome-overlay">
        {/* Full-screen Duolingo onboarding */}
        <div className="welcome-emoji">
          <MascotIcon size={120} />
        </div>

        {/* Logo Text */}
        <div style={{ textAlign: 'center', marginTop: 0, marginBottom: 0 }}>
          <h1 className="welcome-logo-text">ImanCore</h1>
          <h2 className="welcome-subtitle-text">Learning Hub</h2>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '360px', width: '100%' }}>
          <h1 className="welcome-title">Selamat Datang!</h1>
          <p className="welcome-subtitle" style={{ marginTop: '0.5rem', marginBottom: '2rem' }}>
            Masukkan nama anda untuk memulakan pembelajaran! 🚀
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
          <input
            ref={inputRef}
            type="text"
            maxLength={24}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nama anda..."
            className="welcome-input"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="btn-primary welcome-btn"
          >
            Mula Belajar! ✨
          </button>
        </form>

        {/* Decorative dots */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '1rem' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? '#58CC02' : '#E5E5E5' }} />
          ))}
        </div>
      </div>
    </>
  );
}
