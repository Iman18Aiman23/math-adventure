import React from 'react';
import { ArrowLeft, Home, Trophy, Volume2, VolumeX } from 'lucide-react';

/**
 * Standardized Game Header
 * @param {Object} props
 * @param {Function} props.onBack - Left action
 * @param {Function} props.onHome - Middle action
 * @param {Function} [props.onToggleMute] - Optional mute toggle
 * @param {Boolean} [props.isMuted] - Mute state
 * @param {Number} [props.score] - Optional score display
 * @param {Number} [props.streak] - Optional streak display
 * @param {String} [props.title] - Optional title
 */
export default function GameHeader({ onBack, onHome, onToggleMute, isMuted, score, streak, title, language = 'bm' }) {
    const backTip = language === 'bm' ? 'Kembali' : 'Go Back';
    const homeTip = language === 'bm' ? 'Menu Utama' : 'Back to Home';

    return (
        <div className="game-header">
            {/* Left Section: Back Button */}
            <div className="header-section left">
                {onBack && (
                    <button onClick={onBack} className="header-btn" title={backTip}>
                        <ArrowLeft size={24} />
                    </button>
                )}
            </div>

            {/* Middle Section: Home Button & Optional Title */}
            <div className="header-section middle">
                {onHome && (
                    <button onClick={onHome} className="header-btn home-btn" title={homeTip}>
                        <Home size={24} />
                    </button>
                )}
                {title && <span className="header-title">{title}</span>}
            </div>

            {/* Right Section: Stats & Audio Control */}
            <div className="header-section right">
                {(score !== undefined || streak !== undefined) && (
                    <div className="header-stats">
                        {score !== undefined && (
                            <span className="stat-item score">
                                <Trophy size={18} color="gold" /> {score}
                            </span>
                        )}
                        {streak !== undefined && (
                            <span className="stat-item streak">
                                {streak} 🔥
                            </span>
                        )}
                    </div>
                )}
                {onToggleMute && (
                    <button onClick={onToggleMute} className="header-btn mute-btn">
                        {isMuted ? <VolumeX size={20} color="#888" /> : <Volume2 size={20} color="#4ECDC4" />}
                    </button>
                )}
            </div>
        </div>
    );
}
