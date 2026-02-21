export const MONTHS = [
    { id: 1, name: 'January', malay: 'Januari', islamic: 'Muharram' },
    { id: 2, name: 'February', malay: 'Februari', islamic: 'Safar' },
    { id: 3, name: 'March', malay: 'Mac', islamic: 'Rabiulawal' },
    { id: 4, name: 'April', malay: 'April', islamic: 'Rabiulakhir' },
    { id: 5, name: 'May', malay: 'Mei', islamic: 'Jamadilawal' },
    { id: 6, name: 'June', malay: 'Jun', islamic: 'Jamadilakhir' },
    { id: 7, name: 'July', malay: 'Julai', islamic: 'Rejab' },
    { id: 8, name: 'August', malay: 'Ogos', islamic: 'Syaaban' },
    { id: 9, name: 'September', malay: 'September', islamic: 'Ramadan' },
    { id: 10, name: 'October', malay: 'Oktober', islamic: 'Syawal' },
    { id: 11, name: 'November', malay: 'November', islamic: 'Zulkaedah' },
    { id: 12, name: 'December', malay: 'Disember', islamic: 'Zulhijjah' }
];

export const generateClockProblem = (type) => {
    // Generate random hour (1-12) and minute (0-55 in increments of 5 for simplicity/learning)
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = Math.floor(Math.random() * 12) * 5;

    const timeString = `${hour}:${minute < 10 ? '0' + minute : minute}`;

    // Generate distractors
    let distractors = new Set();
    while (distractors.size < 3) {
        const h = Math.floor(Math.random() * 12) + 1;
        const m = Math.floor(Math.random() * 12) * 5;
        const s = `${h}:${m < 10 ? '0' + m : m}`;
        if (s !== timeString) {
            distractors.add(s);
        }
    }

    const options = [timeString, ...Array.from(distractors)].sort(() => 0.5 - Math.random());

    return {
        hour,
        minute,
        displayTime: timeString,
        options,
        answer: timeString
    };
};
