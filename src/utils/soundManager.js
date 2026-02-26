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
