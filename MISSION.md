# Mission Plan

## Tasks
- [x] Investigate audio capture logic for iOS microphone silence.
  - [x] Ensure AudioContext is resumed inside a user interaction (click/touch) handler.
  - [x] Check for `webkitAudioContext` compatibility.
- [x] Fix premature cutoff in voice capture (Wait for Speech logic).
  - [x] Increase silence threshold.
  - [x] Add a minimum duration for recording.
  - [x] Implement trailing silence detection (1.5-2s continuous silence after speech detected).
