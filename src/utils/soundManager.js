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

let _audioCtx = null;

const getAudioContext = () => {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) return null;
    if (!_audioCtx || _audioCtx.state === 'closed') {
        _audioCtx = new AudioContextConstructor();
    }
    return _audioCtx;
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

// Unlock audio context on first user interaction.
// Uses a silent 1-frame buffer — never plays audible audio.
export const unlockAudio = () => {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        if (ctx.state === 'suspended') {
            ctx.resume().catch(error => console.warn('Could not unlock audio', error));
        }
        const buf = ctx.createBuffer(1, 1, 22050);
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.connect(ctx.destination);
        src.start(0);
    } catch (error) {
        console.warn('Could not unlock audio', error);
    }
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

const playHoverTone = (ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.06);
};

/**
 * Play a subtle hover click sound.
 * Uses Web Audio API oscillator — no external file needed.
 */
export const playHoverSound = () => {
    if (isMuted) return;

    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        if (ctx.state === 'suspended') {
            ctx.resume()
                .then(() => playHoverTone(ctx))
                .catch(error => console.warn('Could not play hover sound', error));
            return;
        }
        playHoverTone(ctx);
    } catch (error) {
        console.warn('Could not play hover sound', error);
    }
};

