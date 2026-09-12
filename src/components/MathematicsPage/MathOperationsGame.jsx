import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Settings, X } from 'lucide-react';
import { generateProblem } from '../../utils/mathLogic';
import { playSound } from '../../utils/soundManager';
import { useGameStateContext } from '../../App';
import AppHeader from '../AppHeader';
import GameMenu from './GameMenu';
import { getGameData, addCorrectAnswer, deductHeart } from '../../utils/gameStatsManager';

// ─── Web Speech API voice helper ───────────────────────────────────────────────
function speak(text, { pitch = 1.4, rate = 1.05, volume = 1 } = {}) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.pitch   = pitch;
  utt.rate    = rate;
  utt.volume  = volume;
  // Pick a child-friendly voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    /Google|Zira|Hazel|Karen|Samantha|Nicky/i.test(v.name)
  ) || voices[0];
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

// ─── Operation meta ────────────────────────────────────────────────────────────
const OP_META = {
  add:      { label: 'Tambah',   labelEn: 'Addition',       emoji: '➕', color: '#62D98B', dark: '#20A458' },
  subtract: { label: 'Tolak',    labelEn: 'Subtraction',    emoji: '➖', color: '#68C7F7', dark: '#188CC5' },
  multiply: { label: 'Darab',    labelEn: 'Multiplication', emoji: '✖️', color: '#D9A5FF', dark: '#9957C8' },
  divide:   { label: 'Bahagi',   labelEn: 'Division',       emoji: '➗', color: '#FFB86C', dark: '#D46B1F' },
  random:   { label: 'Rawak',    labelEn: 'Random Mix',     emoji: '🎲', color: '#FF8B8B', dark: '#D94B4B' },
};

const DIFF_META = {
  easy:   { label: 'Senang',     labelEn: 'Easy',   emoji: '🌱', desc: '1–9',     descEn: 'Single digit' },
  medium: { label: 'Sederhana',  labelEn: 'Medium', emoji: '⭐', desc: '10–99',   descEn: 'Two digits'   },
  hard:   { label: 'Susah',      labelEn: 'Hard',   emoji: '🔥', desc: '100–999', descEn: 'Three digits' },
};

const STREAK_MILESTONE = 10;

const STREAK_CHEERS_BM  = ['Bagus!', 'Cemerlang!', 'Hebat!', 'Luar Biasa!', 'Menakjubkan!', 'BINTANG!', 'JUARA!', 'PAKAR MATEMATIK!'];
const STREAK_CHEERS_EN  = ['Great!', 'Excellent!', 'Fantastic!', 'Amazing!', 'Incredible!', 'SUPERSTAR!', 'CHAMPION!', 'MATH WIZARD!'];

const getOpsClayStyles = () => `
  .ops-game-shell {
    width: 100% !important;
    height: 100vh !important;
    height: 100dvh !important;
    max-width: 100vw !important;
    min-width: 0 !important;
    box-sizing: border-box !important;
    display: flex !important;
    flex-direction: column !important;
    background:
      radial-gradient(circle at 18% 8%, rgba(104, 199, 247, 0.16), transparent 30%),
      radial-gradient(circle at 82% 5%, rgba(255, 216, 115, 0.2), transparent 28%),
      linear-gradient(180deg, #FBFCFD 0%, #F7FBF8 48%, #EEF6F5 100%) !important;
    overflow: hidden !important;
  }

  .ops-game-shell *,
  .ops-game-shell *::before,
  .ops-game-shell *::after {
    box-sizing: border-box;
  }

  .ops-game-board {
    width: min(100%, 1120px);
    max-width: 100%;
    min-width: 0;
    min-height: 0;
    flex: 1 1 auto;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    overflow: hidden;
  }

  .ops-game-shell .duo-home-header {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 0 !important;
    min-height: clamp(54px, 8.5dvh, 68px) !important;
    padding: 0.65rem clamp(0.75rem, 3vw, 1.25rem) !important;
    flex-wrap: nowrap !important;
    border-bottom: 0 !important;
    background:
      radial-gradient(circle at 24% 0%, rgba(255,255,255,0.95), transparent 46%),
      linear-gradient(145deg, rgba(255,255,255,0.96), #F4F8F2) !important;
    box-shadow:
      0 14px 30px rgba(55, 110, 30, 0.08),
      0 4px 0 rgba(227, 236, 224, 0.82),
      inset 0 2px 0 rgba(255,255,255,0.9),
      inset 0 -8px 18px rgba(55, 110, 30, 0.04) !important;
    position: relative;
    z-index: 20;
  }

  .ops-game-shell .duo-home-header > button {
    width: clamp(40px, 6dvh, 48px) !important;
    height: clamp(40px, 6dvh, 48px) !important;
    border: 1px solid rgba(227, 236, 224, 0.95) !important;
    background: linear-gradient(145deg, #FFFFFF, #F4F8F2) !important;
    color: #677064 !important;
    box-shadow:
      0 8px 16px rgba(55, 110, 30, 0.13),
      0 4px 0 #DDE8DA,
      inset 0 2px 0 rgba(255,255,255,0.9),
      inset 0 -5px 10px rgba(55,110,30,0.06) !important;
  }

  .ops-game-shell .duo-home-stats button {
    min-height: clamp(36px, 5.5dvh, 42px) !important;
    padding: clamp(5px, 1.1dvh, 7px) clamp(8px, 2vw, 12px) !important;
    border: 1px solid rgba(255,255,255,0.78) !important;
    background: linear-gradient(145deg, #FFFFFF, #F4F8F2) !important;
    box-shadow:
      0 8px 16px rgba(55, 110, 30, 0.1),
      0 3px 0 #DDE8DA,
      inset 0 2px 0 rgba(255,255,255,0.88),
      inset 0 -5px 10px rgba(55,110,30,0.05) !important;
  }

  .ops-game-shell .duo-home-stats button span:first-child {
    width: clamp(24px, 4dvh, 28px);
    height: clamp(24px, 4dvh, 28px);
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #fff;
    text-shadow: 0 2px 0 rgba(0,0,0,0.16);
    box-shadow:
      inset 0 3px 0 rgba(255,255,255,0.42),
      inset 0 -5px 8px rgba(0,0,0,0.18),
      0 5px 10px rgba(55,110,30,0.12);
  }

  .ops-game-shell .duo-home-stats button:nth-child(1) span:first-child {
    background: linear-gradient(145deg, #FFE98A, #FACC15 58%, #D59B17);
  }

  .ops-game-shell .duo-home-stats button:nth-child(2) span:first-child {
    background: linear-gradient(145deg, #FF9AAE, #F43F5E 58%, #BE123C);
  }

  .ops-game-shell .duo-home-stats button:nth-child(3) span:first-child {
    background: linear-gradient(145deg, #8FD7FF, #1CB0F6 58%, #0B6EA8);
  }

  .ops-question-zone {
    position: relative;
    flex: 1 1 auto !important;
    min-height: 0;
    width: calc(100% - clamp(1rem, 5vw, 4rem));
    max-width: 100%;
    margin: clamp(0.4rem, 1.4dvh, 0.85rem) auto 0 !important;
    padding: clamp(0.75rem, 2.5dvh, 1.6rem) clamp(0.6rem, 2.6vw, 1.25rem) !important;
    overflow: hidden;
    border: 1px solid rgba(227, 236, 224, 0.9);
    border-radius: clamp(26px, 5vw, 42px);
    background:
      radial-gradient(circle at 50% 6%, rgba(255,255,255,0.92), transparent 45%),
      linear-gradient(145deg, rgba(255,255,255,0.95), #F4F8F2);
    box-shadow:
      0 24px 44px rgba(55, 110, 30, 0.09),
      0 7px 0 rgba(227, 236, 224, 0.84),
      inset 0 3px 0 rgba(255,255,255,0.95),
      inset 0 -14px 24px rgba(55,110,30,0.05);
  }

  .ops-question-label {
    color: #677064 !important;
    font-size: clamp(0.78rem, 2.1vmin, 1.12rem) !important;
    letter-spacing: 0.08em !important;
    max-width: calc(100% - clamp(2.7rem, 7vmin, 3.4rem));
    margin-bottom: clamp(0.75rem, 1.8vh, 1.2rem) !important;
    text-shadow: 0 2px 0 rgba(255,255,255,0.82);
  }

  .ops-icons-container {
    gap: clamp(0.45rem, 2.3vmin, 1.4rem) !important;
    margin-bottom: clamp(0.35rem, 1.2dvh, 0.75rem) !important;
    max-width: 100%;
    min-width: 0;
  }

  .ops-icon-group {
    max-width: min(clamp(6rem, 20vmin, 10.5rem), 32vw) !important;
    min-width: 0 !important;
    gap: clamp(0.2rem, 0.7vmin, 0.35rem) !important;
  }

  .ops-icon-emoji {
    width: clamp(1.35rem, 4.6vmin, 2.6rem);
    height: clamp(1.35rem, 4.6vmin, 2.6rem);
    display: grid;
    place-items: center;
    border-radius: 50%;
    background:
      radial-gradient(circle at 34% 26%, #BEEBFF 0 13%, transparent 14%),
      radial-gradient(circle at 62% 32%, rgba(255,255,255,0.42), transparent 18%),
      linear-gradient(145deg, #77C9FF, #4388E8 62%, #2D5EBE);
    color: transparent;
    box-shadow:
      0 9px 14px rgba(45, 94, 190, 0.16),
      inset 0 3px 0 rgba(255,255,255,0.44),
      inset 0 -7px 10px rgba(28,65,150,0.28);
  }

  .ops-icon-operator {
    min-width: clamp(2.35rem, 6vmin, 4rem);
    min-height: clamp(2.35rem, 6vmin, 4rem);
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: linear-gradient(145deg, #FFFFFF, #F0F4EC);
    color: #677064 !important;
    font-family: var(--font-heading);
    font-size: clamp(1.65rem, 4.4vmin, 2.8rem) !important;
    font-weight: 900 !important;
    text-shadow:
      1px 2px 0 rgba(255,255,255,0.9),
      -1px -2px 0 rgba(55,110,30,0.16);
    box-shadow:
      inset 0 5px 10px rgba(55,110,30,0.12),
      inset 0 -3px 8px rgba(255,255,255,0.86),
      0 10px 18px rgba(55,110,30,0.09);
  }

  .ops-question-expr {
    color: #374151 !important;
    max-width: 100%;
    min-width: 0;
    overflow-wrap: anywhere;
    font-size: clamp(2.2rem, 8.5vmin, 5.2rem) !important;
    font-weight: 900 !important;
    letter-spacing: 0 !important;
    text-shadow:
      2px 3px 0 rgba(255,255,255,0.95),
      -2px -3px 0 rgba(55,110,30,0.15),
      0 8px 16px rgba(55,110,30,0.08);
  }

  .ops-question-op {
    color: #20A458 !important;
    padding: 0 0.28em !important;
  }

  .ops-question-equals {
    color: #677064 !important;
    text-shadow:
      1px 2px 0 rgba(255,255,255,0.95),
      -1px -2px 0 rgba(55,110,30,0.17);
  }

  .ops-answer-zone {
    flex: 0 0 auto;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding: clamp(0.55rem, 1.8dvh, 1rem) clamp(0.65rem, 3vw, 1.4rem) !important;
    overflow: hidden;
  }

  .ops-choices-grid {
    width: 100%;
    min-width: 0;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: clamp(0.5rem, 1.8vmin, 0.9rem) !important;
  }

  .ops-choice-btn {
    min-width: 0;
    min-height: clamp(4.6rem, 11.5vmin, 7rem);
    border: 1px solid rgba(255,255,255,0.78) !important;
    border-bottom-width: 8px !important;
    border-radius: clamp(22px, 4vw, 32px) !important;
    padding: clamp(1rem, 2.6vmin, 1.55rem) 0.75rem !important;
    box-shadow:
      0 16px 24px rgba(55, 110, 30, 0.08),
      inset 0 3px 0 rgba(255,255,255,0.82),
      inset 0 -10px 16px rgba(0,0,0,0.07);
    transition: transform 0.16s cubic-bezier(.34,1.56,.64,1), box-shadow 0.16s ease, border-bottom-width 0.16s ease !important;
  }

  .ops-choice-btn:nth-child(1) {
    background: linear-gradient(145deg, #F7FFF9, #DDFBE8) !important;
    border-bottom-color: #20A458 !important;
  }

  .ops-choice-btn:nth-child(2) {
    background: linear-gradient(145deg, #F7FCFF, #DDF3FF) !important;
    border-bottom-color: #188CC5 !important;
  }

  .ops-choice-btn:nth-child(3) {
    background: linear-gradient(145deg, #FFFDF5, #FFF3CF) !important;
    border-bottom-color: #D59B17 !important;
  }

  .ops-choice-btn:nth-child(4) {
    background: linear-gradient(145deg, #FFF7F7, #FFE0E0) !important;
    border-bottom-color: #D94B4B !important;
  }

  .ops-choice-btn:active:not(:disabled) {
    transform: translateY(5px) scale(0.99) !important;
    border-bottom-width: 3px !important;
    box-shadow:
      0 8px 14px rgba(55, 110, 30, 0.08),
      inset 0 7px 14px rgba(0,0,0,0.09),
      inset 0 -3px 8px rgba(255,255,255,0.62) !important;
  }

  .ops-choice-label {
    top: 10px !important;
    left: 12px !important;
    width: 28px !important;
    height: 28px !important;
    border-radius: 10px !important;
    border: 0 !important;
    background: rgba(255,255,255,0.58) !important;
    color: #677064 !important;
    box-shadow:
      inset 0 2px 0 rgba(255,255,255,0.9),
      inset 0 -4px 8px rgba(55,110,30,0.08);
  }

  .ops-choice-value {
    color: #374151 !important;
    font-family: var(--font-heading);
    font-size: clamp(1.65rem, 6vmin, 3.2rem) !important;
    line-height: 1;
    text-shadow:
      1px 2px 0 rgba(255,255,255,0.95),
      -1px -2px 0 rgba(55,110,30,0.18);
  }

  .ops-choice-correct {
    background: linear-gradient(145deg, #93F0AD, #22C55E) !important;
    border-bottom-color: #15803D !important;
  }

  .ops-choice-wrong {
    background: linear-gradient(145deg, #FFACB8, #F43F5E) !important;
    border-bottom-color: #BE123C !important;
  }

  .ops-typing-input,
  .ops-submit-btn,
  .ops-continue-wrong {
    border-radius: 26px !important;
    box-shadow:
      0 14px 24px rgba(55, 110, 30, 0.08),
      inset 0 3px 0 rgba(255,255,255,0.78),
      inset 0 -8px 14px rgba(0,0,0,0.06);
  }

  .ops-footer-stats {
    width: calc(100% - clamp(1rem, 5vw, 4rem));
    max-width: 100%;
    min-width: 0;
    flex: 0 0 auto;
    margin: 0 auto calc(0.45rem + var(--safe-bottom));
    padding: clamp(0.5rem, 1.25dvh, 0.85rem) clamp(0.6rem, 2.4vw, 1rem) !important;
    border: 1px solid rgba(227, 236, 224, 0.9) !important;
    border-radius: clamp(24px, 5vw, 34px);
    background:
      radial-gradient(circle at 12% 0%, rgba(255,255,255,0.9), transparent 42%),
      linear-gradient(145deg, rgba(255,255,255,0.96), #F4F8F2) !important;
    box-shadow:
      0 16px 30px rgba(55, 110, 30, 0.08),
      0 4px 0 rgba(227, 236, 224, 0.84),
      inset 0 2px 0 rgba(255,255,255,0.9),
      inset 0 -8px 16px rgba(55,110,30,0.04);
  }

  .ops-stat-chip {
    min-width: 0;
    border: 0 !important;
    background: rgba(255,255,255,0.52) !important;
    box-shadow:
      inset 0 2px 0 rgba(255,255,255,0.9),
      inset 0 -4px 9px rgba(55,110,30,0.06);
  }

  .ops-answer-record {
    flex: 1 1 auto;
    min-width: 0;
    justify-content: flex-start;
    gap: clamp(0.4rem, 1.5vw, 0.7rem) !important;
    padding: clamp(0.55rem, 1.5vh, 0.75rem) clamp(0.75rem, 2.6vw, 1.2rem) !important;
    border-radius: 999px !important;
    background:
      radial-gradient(circle at 12% 10%, rgba(255,255,255,0.88), transparent 38%),
      linear-gradient(145deg, #E8FFF1, #CFF8DE) !important;
    color: #677064 !important;
    box-shadow:
      0 10px 18px rgba(34, 197, 94, 0.12),
      inset 0 3px 0 rgba(255,255,255,0.78),
      inset 0 -7px 12px rgba(22, 163, 74, 0.08) !important;
  }

  .ops-answer-title {
    color: #677064;
    font-family: var(--font-heading);
    font-size: clamp(0.86rem, 2.2vmin, 1.06rem);
    font-weight: 900;
    white-space: nowrap;
    text-shadow: 0 1px 0 rgba(255,255,255,0.82);
  }

  .ops-answer-stats {
    display: inline-flex;
    align-items: center;
    gap: clamp(0.35rem, 1.3vw, 0.55rem);
    white-space: nowrap;
    min-width: 0;
  }

  .ops-answer-stat {
    display: inline-flex;
    align-items: center;
    gap: 0.22rem;
    font-family: var(--font-heading);
    font-size: clamp(0.86rem, 2.2vmin, 1.02rem);
    font-weight: 900;
    line-height: 1;
  }

  .ops-answer-stat.is-correct {
    color: #15803D;
  }

  .ops-answer-stat.is-wrong {
    color: #DC2626;
  }

  .ops-answer-icon {
    width: 1.25em;
    height: 1.25em;
    display: grid;
    place-items: center;
    border-radius: 0.32em;
    color: #fff;
    font-size: 0.78em;
    box-shadow:
      inset 0 2px 0 rgba(255,255,255,0.42),
      inset 0 -3px 5px rgba(0,0,0,0.16),
      0 3px 6px rgba(55,110,30,0.12);
  }

  .ops-answer-icon.is-correct {
    background: linear-gradient(145deg, #8EF3A8, #22C55E 62%, #16A34A);
  }

  .ops-answer-icon.is-wrong {
    background: linear-gradient(145deg, #FF9AAE, #F43F5E 62%, #BE123C);
  }

  .ops-answer-muted {
    color: #94A3B8;
    font-weight: 700;
  }

  .ops-answer-divider {
    color: #B7C5BB;
    font-weight: 800;
  }

  .ops-stat-check,
  .ops-stat-trophy {
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border-radius: 50%;
  }

  .ops-stat-check {
    background: linear-gradient(145deg, #9AF2B3, #22C55E);
    box-shadow: inset 0 3px 0 rgba(255,255,255,0.38), inset 0 -5px 8px rgba(0,0,0,0.16);
  }

  .ops-stat-trophy {
    background: linear-gradient(145deg, #FFE98A, #FACC15 58%, #D59B17);
    box-shadow: inset 0 3px 0 rgba(255,255,255,0.42), inset 0 -5px 8px rgba(0,0,0,0.18);
  }

  .ops-progress-wrap {
    display: flex;
    align-items: center;
    gap: 0.65rem;
    flex: 1 1 220px;
    min-width: 0;
    max-width: min(46vw, 300px);
  }

  .ops-progress-track {
    flex: 1;
    height: clamp(16px, 2.5vh, 22px);
    padding: 4px;
    border-radius: 999px;
    background: #E7EFE3;
    box-shadow:
      inset 0 3px 7px rgba(55,110,30,0.12),
      inset 0 -2px 5px rgba(255,255,255,0.78);
    overflow: hidden;
  }

  .ops-progress-fill {
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #FFE98A, #FACC15 42%, #FFB86C);
    box-shadow:
      0 0 12px rgba(250, 204, 21, 0.42),
      inset 0 2px 0 rgba(255,255,255,0.38),
      inset 0 -3px 6px rgba(174, 101, 18, 0.16);
    transition: width 0.3s ease-out;
  }

  .ops-progress-count {
    color: #A66F00;
    font-size: 0.92rem;
    font-weight: 900;
    min-width: 36px;
    text-align: right;
  }

  .ops-settings-puck {
    position: absolute;
    top: clamp(0.55rem, 1.6dvh, 0.85rem);
    right: clamp(0.55rem, 1.8vw, 0.95rem);
    z-index: 12;
    width: clamp(36px, 5.6dvh, 44px);
    height: clamp(36px, 5.6dvh, 44px);
    display: grid;
    place-items: center;
    border: 1px solid rgba(227, 236, 224, 0.95);
    border-radius: 50%;
    background: linear-gradient(145deg, #FFFFFF, #F4F8F2);
    color: #677064;
    cursor: pointer;
    box-shadow:
      0 8px 16px rgba(55, 110, 30, 0.13),
      0 4px 0 #DDE8DA,
      inset 0 2px 0 rgba(255,255,255,0.9),
      inset 0 -5px 10px rgba(55,110,30,0.06);
    transition: transform 0.16s cubic-bezier(.34,1.56,.64,1), box-shadow 0.16s ease;
  }

  .ops-settings-puck:hover {
    transform: translateY(-2px);
  }

  .ops-settings-puck:active {
    transform: translateY(2px);
    box-shadow:
      0 4px 10px rgba(55, 110, 30, 0.1),
      0 2px 0 #DDE8DA,
      inset 0 5px 10px rgba(55,110,30,0.1);
  }

  .ops-settings-overlay {
    position: absolute;
    inset: 0;
    z-index: 90;
    display: grid;
    place-items: center;
    padding: clamp(0.65rem, 2.5vw, 1.25rem);
    background: rgba(241, 248, 242, 0.72);
    backdrop-filter: blur(10px);
    overflow: hidden;
  }

  .ops-settings-panel {
    width: min(940px, 100%);
    max-width: 100%;
    height: min(760px, calc(100dvh - clamp(1.3rem, 5vw, 2.5rem)));
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid rgba(227, 236, 224, 0.94);
    border-radius: clamp(24px, 5vw, 34px);
    background:
      radial-gradient(circle at 18% 0%, rgba(255,255,255,0.96), transparent 42%),
      linear-gradient(145deg, rgba(255,255,255,0.98), #F4F8F2);
    box-shadow:
      0 30px 60px rgba(55, 110, 30, 0.18),
      0 7px 0 rgba(215, 229, 212, 0.88),
      inset 0 3px 0 rgba(255,255,255,0.94),
      inset 0 -14px 24px rgba(55,110,30,0.05);
  }

  .ops-settings-panel-head {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: clamp(0.75rem, 2vh, 1rem) clamp(0.85rem, 3vw, 1.25rem) 0.35rem;
    min-width: 0;
  }

  .ops-settings-title {
    min-width: 0;
    margin: 0;
    color: #374151;
    font-family: var(--font-heading);
    font-size: clamp(1.1rem, 3vmin, 1.55rem);
    font-weight: 900;
    line-height: 1.05;
    overflow-wrap: anywhere;
    text-shadow: 0 2px 0 rgba(255,255,255,0.8);
  }

  .ops-settings-close {
    width: clamp(38px, 6vmin, 46px);
    height: clamp(38px, 6vmin, 46px);
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    border: 1px solid rgba(227, 236, 224, 0.94);
    border-radius: 50%;
    background: linear-gradient(145deg, #FFFFFF, #F4F8F2);
    color: #677064;
    cursor: pointer;
    box-shadow:
      0 7px 14px rgba(55,110,30,0.12),
      0 3px 0 #DDE8DA,
      inset 0 2px 0 rgba(255,255,255,0.88),
      inset 0 -5px 9px rgba(55,110,30,0.06);
  }

  @media (max-width: 600px) {
    .ops-game-shell .duo-home-header {
      min-height: 60px !important;
      padding: 0.5rem 0.65rem !important;
    }

    .ops-game-shell .duo-home-header > button {
      width: 42px !important;
      height: 42px !important;
    }

    .ops-question-zone {
      margin-inline: 0.65rem !important;
      padding: 0.85rem 0.6rem !important;
    }

    .ops-icons-container {
      flex-direction: row !important;
    }

    .ops-icon-group {
      max-width: 6.6rem !important;
      min-width: 4.8rem !important;
    }

    .ops-icon-operator {
      min-width: 2.7rem;
      min-height: 2.7rem;
    }

    .ops-answer-zone {
      padding-inline: 0.65rem !important;
    }

    .ops-choices-grid {
      gap: 0.55rem !important;
    }

    .ops-choice-btn {
      min-height: 5.1rem;
      border-bottom-width: 6px !important;
    }

    .ops-footer-stats {
      margin-inline: 0.65rem;
      flex-wrap: nowrap;
      gap: 0.5rem;
    }

    .ops-progress-wrap {
      min-width: 0;
      flex: 1;
    }

    .ops-answer-record {
      flex-wrap: wrap;
      row-gap: 0.35rem !important;
    }
  }

  @media (min-width: 900px) and (min-height: 700px) {
    .ops-choices-grid {
      grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    }

    .ops-choice-btn {
      min-height: clamp(5rem, 13dvh, 7.2rem);
    }
  }

  @media (max-width: 390px) {
    .ops-game-shell .duo-home-header {
      gap: 0.42rem !important;
    }

    .ops-game-shell .duo-home-stats {
      gap: 0.3rem !important;
    }

    .ops-game-shell .duo-home-stats button {
      padding-inline: 6px !important;
    }

    .ops-question-zone,
    .ops-footer-stats {
      width: calc(100% - 0.8rem);
    }

    .ops-answer-zone {
      padding-inline: 0.4rem !important;
    }

    .ops-footer-stats {
      flex-direction: column;
      align-items: stretch;
    }

    .ops-progress-wrap {
      max-width: none;
      width: 100%;
    }
  }

  @media (max-height: 720px) {
    .ops-question-zone {
      margin-top: 0.35rem !important;
      padding-block: clamp(0.55rem, 1.7dvh, 0.85rem) !important;
      border-radius: clamp(20px, 4vw, 30px);
    }

    .ops-question-label {
      margin-bottom: 0.35rem !important;
    }

    .ops-icon-emoji {
      width: clamp(1.1rem, 4dvh, 1.8rem);
      height: clamp(1.1rem, 4dvh, 1.8rem);
    }

    .ops-icon-operator {
      min-width: clamp(2rem, 6dvh, 3rem);
      min-height: clamp(2rem, 6dvh, 3rem);
      font-size: clamp(1.45rem, 4.8dvh, 2.2rem) !important;
    }

    .ops-question-expr {
      font-size: clamp(2rem, 8dvh, 4rem) !important;
    }

    .ops-answer-zone {
      padding-block: clamp(0.45rem, 1.3dvh, 0.7rem) !important;
      gap: 0.55rem !important;
    }

    .ops-choice-btn {
      min-height: clamp(3.9rem, 14dvh, 5.4rem);
      padding-block: 0.7rem !important;
    }

    .ops-footer-stats {
      padding-block: clamp(0.42rem, 1.15dvh, 0.65rem) !important;
      margin-bottom: calc(0.28rem + var(--safe-bottom));
    }
  }

  @media (max-height: 610px) {
    .ops-icons-container {
      display: none !important;
    }

    .ops-question-zone {
      flex: 0.85 1 auto !important;
    }

    .ops-feedback-bar {
      padding: 0.55rem !important;
      font-size: 0.92rem !important;
    }
  }

  @media (max-height: 560px) and (orientation: landscape) {
    .ops-game-board {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(220px, 0.85fr);
      grid-template-rows: minmax(0, 1fr) auto;
      gap: clamp(0.4rem, 1.5vw, 0.75rem);
      padding: 0.45rem;
    }

    .ops-question-zone {
      width: 100%;
      height: 100%;
      margin: 0 !important;
    }

    .ops-answer-zone {
      align-self: center;
      padding: 0 !important;
    }

    .ops-choices-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }

    .ops-footer-stats {
      grid-column: 1 / -1;
      width: 100%;
      margin: 0;
    }
  }
`;

// ─── Streak Popup ──────────────────────────────────────────────────────────────
function StreakPopup({ streak, language, onClose }) {
  const milestoneCount = Math.floor(streak / STREAK_MILESTONE);
  const cheers = language === 'bm' ? STREAK_CHEERS_BM : STREAK_CHEERS_EN;
  const cheer = cheers[Math.min(milestoneCount - 1, cheers.length - 1)];

  return (
    <div className="ops-streak-overlay" onClick={onClose}>
      <div className="ops-streak-popup" onClick={e => e.stopPropagation()}>
        <div className="ops-streak-firework">🎉</div>
        <div className="ops-streak-number">{streak}</div>
        <div className="ops-streak-label">
          {language === 'bm' ? 'jawapan betul berturut-turut!' : 'correct answers in a row!'}
        </div>
        <div className="ops-streak-cheer">{cheer}</div>
        <button className="ops-streak-continue" onClick={onClose}>
          {language === 'bm' ? 'Terus! 🚀' : 'Keep Going! 🚀'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Game Component ───────────────────────────────────────────────────────
export default function MathOperationsGame({
  operation, difficulty, nums, quizType,
  onBack, language,
}) {
  const gameState = useGameStateContext();
  const initialGameData = useMemo(() => getGameData(), []);
  const initialNums = useMemo(() => (Array.isArray(nums) ? nums : []), [nums]);

  const [activeOperation, setActiveOperation] = useState(operation || 'add');
  const [activeDifficulty, setActiveDifficulty] = useState(difficulty || 'easy');
  const [activeNums, setActiveNums] = useState(initialNums);
  const [activeQuizType, setActiveQuizType] = useState(quizType || 'multiple');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [problem,        setProblem]        = useState(null);
  const [streak,         setStreak]         = useState(initialGameData.streak);
  const [correctCount,   setCorrectCount]   = useState(0);
  const [wrongCount,     setWrongCount]     = useState(0);
  const [feedback,       setFeedback]       = useState(null); // 'correct' | 'wrong' | null
  const [selectedOption, setSelectedOption] = useState(null);
  const [typedAnswer,    setTypedAnswer]    = useState('');
  const [showStreak,     setShowStreak]     = useState(false);
  const [isAnimating,    setIsAnimating]    = useState(false);
  const [hearts,         setHearts]         = useState(initialGameData.hearts);
  const [gems,           setGems]           = useState(initialGameData.gems);
  const [stars,          setStars]          = useState(initialGameData.stars);

  const inputRef      = useRef(null);
  const feedbackTimer = useRef(null);
  const opMeta   = OP_META[activeOperation]  || OP_META.add;

  const loadNext = useCallback(() => {
    setProblem(generateProblem(activeOperation, activeDifficulty, activeNums));
    setFeedback(null);
    setSelectedOption(null);
    setTypedAnswer('');
    setIsAnimating(false);
  }, [activeOperation, activeDifficulty, activeNums]);

  // Generate first problem on mount / config change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNext();
    return () => { if (feedbackTimer.current) clearTimeout(feedbackTimer.current); };
  }, [loadNext]);

  // Re-focus input after feedback clears (typing mode)
  useEffect(() => {
    if (!feedback && activeQuizType === 'typing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [feedback, activeQuizType]);

  // Pre-load voices (Chrome lazy-loads them)
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, []);

  const problemIcon = useMemo(() => {
    if (!problem) return null;
    return '🫐';
  }, [problem]);

  const handleAnswer = useCallback((userAnswer) => {
    if (feedback || isAnimating) return;
    const correct = Number(userAnswer) === problem.answer;

    setSelectedOption(Number(userAnswer));
    setFeedback(correct ? 'correct' : 'wrong');
    setIsAnimating(true);

    if (correct) {
      // Add correct answer reward
      const gameData = addCorrectAnswer();
      setGems(gameData.gems);
      setStars(gameData.stars);
      const newStreak = gameData.streak;
      setStreak(newStreak);
      setCorrectCount(t => t + 1);

      // Confetti + streak milestone
      if (newStreak % STREAK_MILESTONE === 0) {
        playSound('streak');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
        setTimeout(() => {
          setShowStreak(true);
        }, 400);
      } else {
        playSound('correct');
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
      }

      // Auto-advance after short delay
      feedbackTimer.current = setTimeout(() => {
        loadNext();
      }, 1200);

    } else {
      setWrongCount(t => t + 1);
      if (navigator.vibrate) navigator.vibrate([60, 30, 60]);

      // Deduct heart on wrong answer (resets streak)
      const gameData = deductHeart();
      setHearts(gameData.hearts);
      setStreak(gameData.streak);

      // Voice: encouraging wrong
      speak(
        language === 'bm'
          ? `Cuba lagi! Jawapannya ialah ${problem.answer}`
          : `Try again! The answer is ${problem.answer}`,
        { pitch: 1.3, rate: 0.95 }
      );

      // Stay on wrong until user taps Continue
    }
  }, [feedback, isAnimating, problem, language, loadNext]);

  const handleTypingSubmit = (e) => {
    e.preventDefault();
    const val = typedAnswer.trim();
    if (!val || feedback) return;
    handleAnswer(val);
  };

  const handleContinueAfterWrong = () => {
    loadNext();
  };

  const handleSettingsStart = (nextOperation, nextDifficulty, nextNums, nextQuizType) => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    const safeNums = Array.isArray(nextNums) ? nextNums : [];
    setActiveOperation(nextOperation);
    setActiveDifficulty(nextDifficulty);
    setActiveNums(safeNums);
    setActiveQuizType(nextQuizType);
    setProblem(generateProblem(nextOperation, nextDifficulty, safeNums));
    setFeedback(null);
    setSelectedOption(null);
    setTypedAnswer('');
    setIsAnimating(false);
    setCorrectCount(0);
    setWrongCount(0);
    setShowStreak(false);
    setIsSettingsOpen(false);
  };

  if (!problem) {
    return (
      <div className="ops-game-shell">
        <style>{getOpsClayStyles()}</style>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="ops-loading-spinner" />
        </div>
      </div>
    );
  }

  const accentColor = opMeta.color;
  const accentDark  = opMeta.dark;

  return (
    <div className="ops-game-shell">
      <style>{getOpsClayStyles()}</style>

      {/* Streak popup */}
      {showStreak && (
        <StreakPopup
          streak={streak}
          language={language}
          onClose={() => setShowStreak(false)}
        />
      )}

      <AppHeader onBack={onBack} gameState={gameState} language={language} hearts={hearts} gems={gems} stars={stars} />

      {isSettingsOpen && (
        <div className="ops-settings-overlay" role="dialog" aria-modal="true" aria-label={language === 'bm' ? 'Tetapan permainan' : 'Game settings'}>
          <div className="ops-settings-panel">
            <div className="ops-settings-panel-head">
              <h2 className="ops-settings-title">{language === 'bm' ? 'Tetapan permainan' : 'Game settings'}</h2>
              <button
                type="button"
                className="ops-settings-close"
                onClick={() => setIsSettingsOpen(false)}
                aria-label={language === 'bm' ? 'Tutup tetapan' : 'Close settings'}
              >
                <X size={22} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
            <GameMenu
              embedded
              language={language}
              onBack={() => setIsSettingsOpen(false)}
              onStart={handleSettingsStart}
              initialOperation={activeOperation}
              initialDifficulty={activeDifficulty}
              initialNums={activeNums}
              initialInputMode={activeQuizType}
            />
          </div>
        </div>
      )}

      <main className="ops-game-board">
      {/* ── Question Zone ── */}
      <div className="ops-question-zone">
        <button
          type="button"
          className="ops-settings-puck"
          onClick={() => setIsSettingsOpen(true)}
          aria-label={language === 'bm' ? 'Buka tetapan permainan' : 'Open game settings'}
        >
          <Settings size={22} strokeWidth={2.5} aria-hidden="true" />
        </button>

        <p className="ops-question-label">
          {language === 'bm' ? 'Berapakah hasilnya?' : 'What is the answer?'}
        </p>

        {/* ── Icons Visual ── */}
        {problem.num1 <= 20 && problem.num2 <= 20 && problemIcon && (
          <div className="ops-icons-container">
            {/* Number 1 Icons */}
            <div className="ops-icon-group">
              {Array.from({ length: problem.num1 }).map((_, i) => (
                <span key={`n1-${i}`} className="ops-icon-emoji">{problemIcon}</span>
             ))}
              {problem.num1 === 0 && <span className="ops-icon-emoji" style={{ opacity: 0 }}>{problemIcon}</span>}
            </div>

            {/* Operator */}
            <div className="ops-icon-operator" style={{ color: accentColor }}>
              {problem.symbol}
            </div>

            {/* Number 2 Icons */}
            <div className="ops-icon-group">
              {Array.from({ length: problem.num2 }).map((_, i) => (
                <span key={`n2-${i}`} className="ops-icon-emoji">{problemIcon}</span>
              ))}
              {problem.num2 === 0 && <span className="ops-icon-emoji" style={{ opacity: 0 }}>{problemIcon}</span>}
            </div>
          </div>
        )}

        <div
          className="ops-question-expr ops-question-row"
          style={{ color: feedback === 'correct' ? '#46A302' : feedback === 'wrong' ? '#CC3B3B' : '#3C3C3C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap' }}
        >
          {problem.num1} <span className="ops-question-op" style={{ color: accentColor }}>{problem.symbol}</span> {problem.num2} <span className="ops-question-equals" style={{ color: '#3C3C3C', marginLeft: '0.5rem' }}>= ?</span>
        </div>
      </div>

      {/* ── Answer Zone ── */}
      <div className="ops-answer-zone">
        {activeQuizType === 'typing' ? (
          /* Manual Entry */
          <form onSubmit={handleTypingSubmit} className="ops-typing-form">
            <input
              ref={inputRef}
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              enterKeyHint="go"
              value={typedAnswer}
              onChange={e => setTypedAnswer(e.target.value)}
              placeholder={language === 'bm' ? 'Taip jawapan...' : 'Type answer...'}
              disabled={!!feedback}
              className={`ops-typing-input${feedback === 'correct' ? ' ops-input-correct' : feedback === 'wrong' ? ' ops-input-wrong' : ''}`}
              autoComplete="off"
            />
            <button
              type="submit"
              className="ops-submit-btn"
              style={{ background: accentColor, borderBottomColor: accentDark }}
              disabled={!typedAnswer.trim() || !!feedback}
            >
              {language === 'bm' ? 'Semak ✓' : 'Check ✓'}
            </button>
          </form>
        ) : (
          /* Multiple Choice */
          <div className="ops-choices-grid">
            {problem.options.map((opt, idx) => {
              const labels = ['A', 'B', 'C', 'D'];
              let state = 'idle';
              if (feedback === 'correct' && opt === problem.answer) state = 'correct';
              else if (feedback === 'wrong') {
                if (opt === problem.answer) state = 'correct';
                else if (opt === selectedOption) state = 'wrong';
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  disabled={!!feedback}
                  className={`ops-choice-btn ops-choice-${state}`}
                  style={state === 'idle' ? { '--accent': accentColor, '--accent-dark': accentDark } : undefined}
                >
                  <span className="ops-choice-label">{labels[idx]}</span>
                  <span className="ops-choice-value">{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Wrong answer continue button */}
        {feedback === 'wrong' && (
          <button
            className="ops-continue-wrong"
            onClick={handleContinueAfterWrong}
          >
            {language === 'bm' ? 'Faham, terus →' : 'Got it, next →'}
          </button>
        )}
      </div>

      {/* ── Feedback Bar ── */}
      {feedback && (
        <div className={`ops-feedback-bar ops-feedback-${feedback}`}>
          {feedback === 'correct' ? (
            <span>
              {language === 'bm' ? '🎉 Betul sekali!' : '🎉 Correct!'}{' '}
              <strong>{problem.answer}</strong>
            </span>
          ) : (
            <span>
              {language === 'bm' ? `💡 Jawapan: ` : `💡 Answer: `}
              <strong>{problem.answer}</strong>
            </span>
          )}
        </div>
      )}

      {/* ── Footer Stats ── */}
      <div className="ops-footer-stats">
        <div className="ops-stat-chip ops-answer-record">
          <span className="ops-answer-title">{language === 'bm' ? 'Jawapan :' : 'Answer :'}</span>
          <span className="ops-answer-stats">
            <span className="ops-answer-stat is-correct">
                  <span className="ops-answer-icon is-correct">✅</span>
              <span>{correctCount}</span>
              <span className="ops-answer-muted">{language === 'bm' ? 'Betul' : 'Correct'}</span>
            </span>
            <span className="ops-answer-divider">|</span>
            <span className="ops-answer-stat is-wrong">
                  <span className="ops-answer-icon is-wrong">❌</span>
              <span>{wrongCount}</span>
              <span className="ops-answer-muted">{language === 'bm' ? 'salah' : 'wrong'}</span>
            </span>
          </span>
        </div>
        {(() => {
          const progressInGroup = showStreak && streak % 10 === 0 && streak > 0 ? 10 : streak % 10;
          return (
            <div className="ops-stat-chip ops-stat-chip-highlight ops-progress-wrap" style={{ gap: '8px' }}>
              <span className="ops-stat-trophy">🏆</span>
              <div className="ops-progress-track">
                <div className="ops-progress-fill" style={{ width: `${(progressInGroup / 10) * 100}%` }} />
              </div>
              <span className="ops-progress-count">
                {progressInGroup}/10
              </span>
            </div>
          );
        })()}
      </div>
      </main>
    </div>
  );
}
