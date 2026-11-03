import { useCallback, useEffect, useState } from 'react';
import { calcStreak, loadLoginDates, recordLogin } from '../services/storageService';

const DAY_MS = 86400000;
const LOGIN_STORAGE_KEY = 'mathAdventureData';

function toDateStr(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function longestStreak(dates) {
  const unique = [...new Set(dates)].sort();
  let best = 0;
  let run = 0;

  for (let i = 0; i < unique.length; i++) {
    if (i === 0) {
      run = 1;
    } else {
      const gap = (new Date(unique[i]) - new Date(unique[i - 1])) / DAY_MS;
      run = gap === 1 ? run + 1 : 1;
    }
    best = Math.max(best, run);
  }

  return best;
}

function buildWeek(dates) {
  const activeDates = new Set(dates);
  const today = new Date();
  const todayKey = toDateStr(today);
  const mondayOffset = (today.getDay() + 6) % 7;
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return Array.from({ length: 7 }, (_, index) => {
    const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - mondayOffset + index);
    const key = toDateStr(day);
    return {
      key,
      active: activeDates.has(key),
      isToday: key === todayKey,
      isFuture: day.getTime() > startOfToday.getTime(),
    };
  });
}

function readSnapshot() {
  const todayKey = toDateStr();
  const stored = loadLoginDates();
  // Opening the page counts as today's visit; persist it in the effect below.
  const dates = stored.includes(todayKey) ? stored : [...stored, todayKey].sort();

  return {
    streak: calcStreak(dates),
    highest: longestStreak(dates),
    todayActive: true,
    lastActiveDate: todayKey,
    days: buildWeek(dates),
  };
}

/**
 * Reactive daily learning streak backed by the current localStorage store.
 * Records today's visit, then refreshes when another tab writes login dates,
 * when the tab becomes visible again, or at the next local calendar day.
 */
export default function useDailyStreak() {
  const [dailyStreak, setDailyStreak] = useState(readSnapshot);

  const refresh = useCallback(() => {
    recordLogin();
    const next = readSnapshot();
    setDailyStreak((previous) => (
      JSON.stringify(previous) === JSON.stringify(next) ? previous : next
    ));
  }, []);

  useEffect(() => {
    const initialSync = window.setTimeout(refresh, 0);

    const handleStorage = (event) => {
      if (!event.key || event.key === LOGIN_STORAGE_KEY) refresh();
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') refresh();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('daily-streak-sync', refresh);
    document.addEventListener('visibilitychange', handleVisibility);
    const interval = window.setInterval(refresh, 60_000);

    return () => {
      window.clearTimeout(initialSync);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('daily-streak-sync', refresh);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.clearInterval(interval);
    };
  }, [refresh]);

  return dailyStreak;
}
