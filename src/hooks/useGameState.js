import { useState, useEffect, useCallback, useRef } from 'react';
import { loadGameData, saveGameData } from '../services/storageService';

/**
 * Derive the player's level from total XP.
 * Formula: Level = floor( sqrt(XP) / 10 ) + 1
 * - Lv 1 :   0 –  99 XP
 * - Lv 2 : 100 – 399 XP
 * - Lv 3 : 400 – 899 XP  … and so on
 */
function calcLevel(xp) {
  return Math.floor(Math.sqrt(xp) / 10) + 1;
}

/**
 * useGameState(gameId)
 *
 * Central hook for the per-game gamification system.
 * Pass a stable gameId string (e.g. 'math-operations', 'jawi').
 * The hook reloads data whenever gameId changes.
 *
 * Returns:
 *  gameState  – { totalXP, mathCoins, level, unlockedItems, gameId,
 *                 addWin, spendCoins, unlockItem }
 *  levelUpInfo    – { newLevel } when a level boundary was just crossed
 *  clearLevelUp() – call after showing the toast
 */
export function useGameState(gameId) {
  // ── Per-game lazy initializers ─────────────────────────────────────────────
  // We key these on gameId so they reset correctly when gameId changes.
  // (useState lazy init only runs once — we handle re-keying via the effect below)
  const [totalXP,       setTotalXP]       = useState(() => loadGameData(gameId).totalXP);
  const [mathCoins,     setMathCoins]     = useState(() => loadGameData(gameId).mathCoins);
  const [unlockedItems, setUnlockedItems] = useState(() => loadGameData(gameId).unlockedItems);
  const [levelUpInfo,   setLevelUpInfo]   = useState(null);

  const prevLevelRef  = useRef(calcLevel(loadGameData(gameId).totalXP));
  const prevGameIdRef = useRef(gameId);

  // ── Reload when the active game changes ───────────────────────────────────
  useEffect(() => {
    if (prevGameIdRef.current === gameId) return; // no change
    prevGameIdRef.current = gameId;

    const saved = loadGameData(gameId);
    setTotalXP(saved.totalXP);
    setMathCoins(saved.mathCoins);
    setUnlockedItems(saved.unlockedItems);
    prevLevelRef.current = calcLevel(saved.totalXP);
    setLevelUpInfo(null); // clear any pending toast
  }, [gameId]);

  // ── Auto-persist ───────────────────────────────────────────────────────────
  useEffect(() => {
    saveGameData(gameId, { totalXP, mathCoins, unlockedItems });
  }, [gameId, totalXP, mathCoins, unlockedItems]);

  // ── Derived: level ──────────────────────────────────────────────────────────
  const level = calcLevel(totalXP);

  // ── addWin ─────────────────────────────────────────────────────────────────
  const addWin = useCallback((points = 10) => {
    setTotalXP(prev => {
      const newXP    = prev + points;
      const oldLevel = prevLevelRef.current;
      const newLevel = calcLevel(newXP);
      if (newLevel > oldLevel) {
        prevLevelRef.current = newLevel;
        setLevelUpInfo({ newLevel });
      }
      return newXP;
    });
    setMathCoins(prev => prev + 1);
  }, []);

  // ── spendCoins ─────────────────────────────────────────────────────────────
  const spendCoins = useCallback((amount) => {
    setMathCoins(prev => prev < amount ? prev : prev - amount);
  }, []);

  // ── unlockItem ─────────────────────────────────────────────────────────────
  const unlockItem = useCallback((itemId) => {
    setUnlockedItems(prev => prev.includes(itemId) ? prev : [...prev, itemId]);
  }, []);

  // ── clearLevelUp ───────────────────────────────────────────────────────────
  const clearLevelUp = useCallback(() => setLevelUpInfo(null), []);

  const gameState = {
    totalXP, mathCoins, level, unlockedItems, gameId,
    addWin, spendCoins, unlockItem,
  };

  return { gameState, levelUpInfo, clearLevelUp };
}
