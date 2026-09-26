# Cabaran Membaca

`ReadingPage` lazy-loads `ReadingJourney` for menu item 5. The journey lazy-loads one `ReadingGame` for all 15 levels. Existing Mathematics shell, header, answer record and progress components are imported without changing Mathematics behavior.

- Content: `readingContent.js` holds five worlds, 15 configurations and 137 questions. Extend the vocabulary, scenes or story pools here. Builder tiles have individual IDs so repeated syllables (su + su) work.
- Progress: `useGameState('reading-challenge')` persists `reading-complete-N` unlocks in the existing store. Completing every question unlocks the next level. Replays remain available.
- Scoring: correct/wrong counts describe first attempts. A wrong question can be retried until correct; additional retries do not deduct more hearts. Correct answers receive existing global rewards once per question. Shared hearts and the heart shop remain available; practice is allowed at zero hearts, matching Mathematics.
- Stars: completion shows 3 stars for at least 90% first-attempt accuracy, 2 for at least 60%, otherwise 1. These are a session rating, separate from the global reward balance.
- Fluency: correct first attempts within 15 seconds contribute to the speed-match result. There is no timeout or failure for reading slowly.
- Audio: `ReadingAudio` reuses `SpeechManager` with `ms-MY`. Playback requires a tap, supports replay, disables overlapping requests, and stops when leaving a question. Browser speech support and installed voices determine pronunciation. An adult-assisted text fallback appears if speech synthesis is unavailable.
- Accessibility: native buttons, visible keyboard focus and selection markers, feedback status, image descriptions, reduced-motion confetti, and a scrollable question board for short viewports. UI controls can use English; reading material remains Malay.

Run `node scripts/test-reading-challenge.mjs [path-to-playwright]` for content, completion, persistence, navigation, audio-control and responsive browser checks. The test uses a local Vite server and Microsoft Edge. Optional environment variables `READING_LAYOUT_ONLY=1`, `READING_WIDTHS=320,1366`, and `READING_HEIGHT=568` restrict follow-up layout runs. Audio-control tests stub speech output; pronunciation should also be checked on target devices.
