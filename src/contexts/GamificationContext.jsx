/**
 * React Context for Gamification.
 * Provides GamificationRepository instance to all components via useGamificationRepo hook.
 */

import React, { createContext, useContext } from 'react';
import { LocalGamificationRepo } from '../services/LocalGamificationRepo';

/**
 * Context holds a GamificationRepository instance.
 * Default is LocalGamificationRepo; can be swapped to ApiGamificationRepo or DualWriteRepo in Phase 8.
 * Module-level singleton: a default param like `repo = new LocalGamificationRepo()` would
 * construct a fresh repo (and attach a new storage listener) on every provider render.
 */
const defaultRepo = new LocalGamificationRepo();

export const GamificationContext = createContext(defaultRepo);

/**
 * Hook to access the GamificationRepository instance.
 * @returns {GamificationRepository}
 */
export function useGamificationRepo() {
  const repo = useContext(GamificationContext);
  if (!repo) {
    throw new Error('useGamificationRepo must be used within GamificationProvider');
  }
  return repo;
}

/**
 * Provider component that wraps the app.
 * Allows injecting different repository implementations (e.g., for testing).
 * @param {Object} props
 * @param {GamificationRepository} [props.repo] - Custom repo instance (defaults to LocalGamificationRepo)
 * @param {React.ReactNode} props.children
 * @returns {React.ReactElement}
 */
export function GamificationProvider({ repo = defaultRepo, children }) {
  return <GamificationContext.Provider value={repo}>{children}</GamificationContext.Provider>;
}
