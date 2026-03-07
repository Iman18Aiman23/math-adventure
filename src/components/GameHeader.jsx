import React from 'react';
import { ArrowLeft, Volume2, VolumeX, Trophy } from 'lucide-react';

export default function GameHeader({ onBack, onHome, onToggleMute, isMuted, score, streak, title, language = 'bm' }) {
    const backTip = language === 'bm' ? 'Kembali' : 'Go Back';

    return (
        <div className="game-header" style={{ marginBottom: '0.6rem' }}>
            {/* Left: Back */}
            <div className="header-section left">
                {onBack && (
                    <button onClick={onBack} className="header-btn" title={backTip}
                        style={{ background: 'rgba(244,63,94,0.10)', color: '#F43F5E' }}>
                        <ArrowLeft size={20} />
                    </button>
                )}
            </div>

            {/* Middle: Title */}
            <div className="header-section middle">
                {title && <span className="header-title">{title}</span>}
            </div>

            {/* Right: Stats + Mute */}
            <div className="header-section right">
                {(score !== undefined || streak !== undefined) && (
                    <div className="header-stats">
                        {score !== undefined && (
                            <span className="stat-item" style={{ color: '#F59E0B' }}>
                                <Trophy size={16} /> {score}
                            </span>
                        )}
                        {streak !== undefined && (
                            <span className="stat-item">
                                <span style={{ fontSize: '1rem' }}>🔥</span> {streak}
                            </span>
                        )}
                    </div>
                )}
                {onToggleMute && (
                    <button onClick={onToggleMute} className="header-btn"
                        style={{ background: isMuted ? 'rgba(156,163,175,0.15)' : 'rgba(16,185,129,0.12)', color: isMuted ? '#9ca3af' : '#10B981' }}>
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                )}
            </div>
        </div>
    );
}
