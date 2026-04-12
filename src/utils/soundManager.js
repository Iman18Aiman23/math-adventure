// Get the base URL from Vite's environment
const BASE_URL = import.meta.env.BASE_URL || '/';

// Mute state
let isMuted = false;

// Audio cache/pool to avoid garbage collection delays and pre-load sounds
const audioPool = {};

const SOUND_FILES = {
    correct: `${BASE_URL}sounds/correct.mp3`,
    wrong: `${BASE_URL}sounds/wrong.mp3`,
    streak: `${BASE_URL}sounds/streak.mp3`
};

// Preload all sounds
export const preloadSounds = () => {
    Object.entries(SOUND_FILES).forEach(([type, path]) => {
        if (!audioPool[type]) {
            const audio = new Audio(path);
            audio.load();
            audioPool[type] = audio;
        }
    });
};

// Unlock audio context on mobile (should be called on first user interaction)
export const unlockAudio = () => {
    Object.values(audioPool).forEach(audio => {
        audio.play().then(() => {
            audio.pause();
            audio.currentTime = 0;
        }).catch(() => {
            // Silently fail if interaction hasn't happened yet
        });
    });
};

// Get mute state
export const getMuted = () => isMuted;

// Set mute state
export const setMuted = (muted) => {
    isMuted = muted;
};

// Toggle mute state
export const toggleMute = () => {
    isMuted = !isMuted;
    return isMuted;
};

export const playSound = (type) => {
    // Don't play if muted
    if (isMuted) return;

    let audio = audioPool[type];
    
    // Fallback if not preloaded
    if (!audio && SOUND_FILES[type]) {
        audio = new Audio(SOUND_FILES[type]);
        audioPool[type] = audio;
    }

    if (!audio) return;

    // Reset and play
    audio.volume = 0.5;
    audio.currentTime = 0;
    audio.play().catch(e => {
        console.warn(`Could not play sound: ${type}`, e);
    });
};

/**
 * Play a subtle hover click sound on desktop.
 * Uses Web Audio API oscillator — no external file needed.
 * Call this on mouseenter of buttons/cards.
 */
let _audioCtx = null;
export const playHoverSound = () => {
    if (isMuted) return;
    // Only on desktop (no hover on touch)
    if ('ontouchstart' in window) return;

    try {
        if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = _audioCtx.createOscillator();
        const gain = _audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, _audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, _audioCtx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.03, _audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, _audioCtx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(_audioCtx.destination);
        osc.start(_audioCtx.currentTime);
        osc.stop(_audioCtx.currentTime + 0.06);
    } catch (_) { /* silent fail */ }
};

