// Get the base URL from Vite's environment
const BASE_URL = import.meta.env.BASE_URL || '/';

// Mute state
let isMuted = false;

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

    const sounds = {
        correct: `${BASE_URL}sounds/correct.mp3`,
        wrong: `${BASE_URL}sounds/wrong.mp3`,
        streak: `${BASE_URL}sounds/streak.mp3`
    };

    const file = sounds[type];
    if (!file) return;

    const audio = new Audio(file);
    audio.volume = 0.5; // Reasonable default
    audio.play().catch(e => {
        console.warn(`Could not play sound: ${type}`, e);
    });
};
