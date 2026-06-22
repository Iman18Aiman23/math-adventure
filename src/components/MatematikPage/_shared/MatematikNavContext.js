import { createContext } from 'react';

/**
 * Provides "advance to the next topic" navigation to the activity completion
 * screen, without plumbing props through every topic page / explore component.
 * Value shape: { hasNext: boolean, goNext: () => void } | null
 */
export const MatematikNavContext = createContext(null);
