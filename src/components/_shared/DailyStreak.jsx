import { Flame } from 'lucide-react';
import './DailyStreak.css';

const DAY_NAMES = {
  bm: ['Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu', 'Ahad'],
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};

const DAY_SHORT = {
  bm: ['I', 'S', 'R', 'K', 'J', 'S', 'A'],
  en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
};

export default function DailyStreak({ streak = 0, highest = 0, days = [], language = 'bm', className = '' }) {
  const lang = language === 'bm' ? 'bm' : 'en';
  const bm = lang === 'bm';
  const label = bm ? 'Streak harian' : 'Daily streak';
  const bestDays = bm ? 'hari' : (highest === 1 ? 'day' : 'days');
  const countDays = bm ? 'hari' : (streak === 1 ? 'day' : 'days');
  const hint = streak > 0
    ? (bm ? `Streak terbaik ${highest} hari` : `Best streak ${highest} ${bestDays}`)
    : (bm ? 'Mulakan streak hari ini!' : 'Start your streak today!');

  return (
    <div
      className={`daily-streak ${className}`.trim()}
      role="group"
      aria-label={`${label}: ${streak} ${countDays}. ${hint}`}
    >
      <span className="daily-streak__badge" aria-hidden="true">
        <Flame size={21} strokeWidth={2.6} />
      </span>
      <span className="daily-streak__copy">
        <span className="daily-streak__count">
          <strong>{streak}</strong>
          <span>{countDays}</span>
        </span>
        <span className="daily-streak__hint">{hint}</span>
      </span>
      <span className="daily-streak__week" role="list" aria-label={bm ? 'Aktiviti minggu ini' : 'This week'}>
        {days.map((day, index) => (
          <span
            key={day.key}
            role="listitem"
            className={`daily-streak__day${day.active ? ' is-active' : ''}${day.isToday ? ' is-today' : ''}${day.isFuture ? ' is-future' : ''}`}
            title={`${DAY_NAMES[lang][index]}${day.active ? (bm ? ' — selesai' : ' — completed') : ''}`}
          >
            <span className="daily-streak__dot" aria-hidden="true">
              {day.active ? <Flame size={11} strokeWidth={2.8} /> : null}
            </span>
            <span className="daily-streak__label" aria-hidden="true">{DAY_SHORT[lang][index]}</span>
          </span>
        ))}
      </span>
    </div>
  );
}
