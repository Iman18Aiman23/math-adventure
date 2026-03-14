import React, { useEffect, useRef, useState } from 'react';

/**
 * WelcomeModal
 *
 * Full-screen first-launch modal asking the player for their name.
 *
 * Props:
 *  onSave(name) – callback when user submits a valid name
 */
export default function WelcomeModal({ onSave }) {
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSave(trimmed);
  };

  return (
    <div className="welcome-overlay">
      <div className="welcome-modal bounce-in">
        <div className="welcome-emoji">🚀</div>
        <h1 className="welcome-title">Selamat Datang!</h1>
        <p className="welcome-subtitle">Masukkan nama anda untuk memulakan petualangan!</p>

        <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          <input
            ref={inputRef}
            type="text"
            maxLength={24}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama anda..."
            className="welcome-input"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="btn-primary welcome-btn"
          >
            Mula Petualangan! ✨
          </button>
        </form>
      </div>
    </div>
  );
}
