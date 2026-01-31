export const playSound = (type, baseUrl = '') => {
    const sounds = {
        correct: `${baseUrl}/sounds/correct.mp3`,
        wrong: `${baseUrl}/sounds/wrong.mp3`,
        streak: `${baseUrl}/sounds/streak.mp3`
    };

    const file = sounds[type];
    if (!file) return;

    const audio = new Audio(file);
    audio.volume = 0.5; // Reasonable default
    audio.play().catch(e => {
        console.warn(`Could not play sound: ${type}`, e);
    });
};
