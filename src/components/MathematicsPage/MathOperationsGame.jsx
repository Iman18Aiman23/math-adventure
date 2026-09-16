import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Pencil, SendHorizontal, Settings, X } from 'lucide-react';
import { generateProblem } from '../../utils/mathLogic';
import { playSound } from '../../utils/soundManager';
import { getGameData, addCorrectAnswer, deductHeart } from '../../utils/gameStatsManager';
import useBrowserBack from '../../hooks/useBrowserBack';
import HeartShopModal from '../HeartShopModal';
import { MathGameBody, MathGameFooter, MathGameHeader, MathGameShell } from './MathGameLayout';

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
    width: min(100%, 1100px);
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
    position: fixed;
    inset: 0;
    z-index: 180;
    display: grid;
    place-items: center;
    padding: clamp(14px, 3vw, 28px);
    background: rgba(236, 250, 245, 0.72);
    backdrop-filter: blur(14px);
  }

  .ops-settings-panel {
    width: min(760px, calc(100vw - 28px));
    max-height: calc(100dvh - 28px);
    overflow-y: auto;
    box-sizing: border-box;
    border-radius: clamp(24px, 4vw, 32px);
    background: #FFFFFF;
    border: 1px solid #DDEBE5;
    box-shadow: 0 28px 70px rgba(31, 78, 60, 0.16);
    padding: clamp(20px, 4vw, 34px);
  }

  .ops-settings-panel-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: clamp(18px, 3vh, 24px);
  }

  .ops-settings-title {
    margin: 0;
    color: #102D53;
    font-size: clamp(28px, 4vw, 36px);
    font-weight: 900;
    line-height: 1.02;
  }

  .ops-settings-subtitle,
  .ops-settings-help {
    margin: 0;
    color: #7B8EA8;
    font-weight: 700;
    line-height: 1.25;
  }

  .ops-settings-subtitle {
    margin-top: 4px;
    font-size: clamp(14px, 2.1vw, 17px);
  }

  .ops-settings-help {
    font-size: clamp(12px, 1.7vw, 15px);
  }

  .ops-settings-close {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #DDEBE5;
    background: #FFFFFF;
    color: #102D53;
    display: grid;
    place-items: center;
    cursor: pointer;
    flex-shrink: 0;
    box-shadow: 0 6px 14px rgba(31, 78, 60, 0.06);
  }

  .ops-settings-group {
    display: grid;
    gap: 10px;
    margin-top: clamp(16px, 2.8vh, 24px);
  }

  .ops-settings-label {
    color: #102D53;
    font-size: clamp(18px, 2.7vw, 22px);
    font-weight: 900;
    letter-spacing: 0;
    line-height: 1.05;
  }

  .ops-settings-section-head {
    display: grid;
    gap: 3px;
  }

  .ops-settings-options {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(8px, 1.4vw, 12px);
  }

  .ops-settings-option {
    min-height: clamp(42px, 6.2vh, 54px);
    padding: 9px clamp(14px, 2.5vw, 24px);
    border-radius: 15px;
    border: 1px solid #DDEBE5;
    background: #F8FCFA;
    color: #102D53;
    font-size: clamp(14px, 1.8vw, 16px);
    font-weight: 900;
    cursor: pointer;
    box-shadow: 0 2px 0 rgba(221, 235, 229, 0.8);
    transition: transform 120ms ease, background-color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  }

  .ops-settings-option.is-active {
    background: #23B76B;
    border-color: #23B76B;
    color: #FFFFFF;
    box-shadow: 0 4px 10px rgba(35, 183, 107, 0.18);
  }

  .ops-settings-option:active {
    transform: translateY(1px);
  }

  .ops-settings-footer {
    display: grid;
    grid-template-columns: minmax(116px, 0.34fr) minmax(180px, 1fr);
    gap: clamp(12px, 2vw, 18px);
    margin-top: clamp(18px, 3vh, 28px);
    padding-top: clamp(14px, 2vh, 18px);
    border-top: 1px solid #DDEBE5;
  }

  .ops-settings-cancel,
  .ops-settings-start {
    min-height: clamp(46px, 6.8vh, 56px);
    border-radius: 16px;
    font-size: clamp(14px, 1.8vw, 17px);
    font-weight: 900;
  }

  .ops-settings-cancel {
    border: 0;
    background: #F3F7F6;
    color: #64748B;
    cursor: pointer;
  }

  .ops-settings-start {
    width: 100%;
    margin-top: 0;
    border: 0;
    justify-self: end;
  }

  .ops-settings-start:disabled {
    background: #B9DEC9 !important;
    border-color: #B9DEC9 !important;
    color: rgba(255, 255, 255, 0.82) !important;
    box-shadow: none !important;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    .ops-settings-overlay {
      padding: 12px;
    }

    .ops-settings-panel {
      width: min(100%, calc(100vw - 24px));
      padding: 18px;
    }

    .ops-settings-title {
      font-size: 26px;
    }

    .ops-settings-close {
      width: 42px;
      height: 42px;
    }

    .ops-settings-footer {
      grid-template-columns: 1fr;
    }

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

  .ops-game-shell {
    --game-bg: #ECFAF5;
    --surface: #FFFFFF;
    --surface-soft: #F8FCFA;
    --primary: #27B668;
    --primary-dark: #159653;
    --primary-soft: #E5F7EE;
    --text-primary: #172B4D;
    --text-secondary: #74849A;
    --text-muted: #9AA7B7;
    --border: #DCE7E3;
    --correct: #27B668;
    --wrong: #FF4D55;
    --reward: #FFBE18;
    --progress-track: #E4E9E7;
    --object-size: clamp(28px, min(6vw, 6vh), 56px);
    width: 100% !important;
    height: 100dvh !important;
    min-height: 100dvh !important;
    max-width: 100vw !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    box-sizing: border-box !important;
    background: linear-gradient(180deg, #ECFAF5 0%, #F7FCF9 100%) !important;
    font-family: "Nunito", "Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .ops-ref-header {
    width: min(100%, 1100px);
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(8px, 2vw, 18px);
    padding: max(clamp(6px, 1vh, 12px), env(safe-area-inset-top)) clamp(12px, 3vw, 28px) clamp(6px, 1vh, 12px);
    flex-shrink: 0;
    min-width: 0;
  }

  .ops-ref-header-left,
  .ops-ref-rewards {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .ops-ref-header-left {
    gap: clamp(8px, 2vw, 14px);
    flex: 1 1 auto;
  }

  .ops-ref-back {
    width: clamp(44px, 10vw, 64px);
    height: clamp(44px, 10vw, 64px);
    border-radius: 50%;
    background: #FFFFFF;
    border: 1px solid #E2ECE8;
    color: var(--text-primary);
    box-shadow: 0 3px 10px rgba(25, 65, 50, 0.08);
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    transition: transform 160ms ease, box-shadow 160ms ease;
  }

  .ops-ref-back:active {
    transform: translateY(2px);
  }

  .ops-ref-subject-icon {
    width: clamp(44px, 10vw, 64px);
    height: clamp(44px, 10vw, 64px);
    border-radius: clamp(12px, 3vw, 18px);
    background: var(--primary);
    color: #FFFFFF;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    box-shadow: 0 4px 10px rgba(39, 182, 104, 0.18);
  }

  .ops-ref-title-block {
    min-width: 0;
  }

  .ops-ref-title-block h1 {
    margin: 0;
    font-family: inherit;
    font-size: clamp(18px, 3.5vw, 30px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: 0;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ops-ref-title-block p {
    margin: 0;
    font-size: clamp(13px, 2.5vw, 20px);
    font-weight: 700;
    line-height: 1.2;
    color: var(--text-secondary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ops-ref-rewards {
    gap: clamp(6px, 1.3vw, 14px);
    flex: 0 0 auto;
    white-space: nowrap;
  }

  .ops-ref-reward-pill {
    display: flex;
    align-items: center;
    gap: clamp(4px, 1vw, 8px);
    padding: clamp(6px, 1vw, 10px) clamp(8px, 2vw, 14px);
    background: #FFFFFF;
    border: 1px solid #E6EEEB;
    border-radius: 999px;
    box-shadow: 0 2px 8px rgba(31, 78, 60, 0.07);
    color: var(--text-primary);
    font-size: clamp(16px, 3vw, 24px);
    font-weight: 900;
    line-height: 1;
  }

  .ops-ref-reward-icon.is-star { color: #FFBE18; }
  .ops-ref-reward-icon.is-heart { color: #FF4D55; }
  .ops-ref-reward-icon.is-gem { color: #2BBDF7; }

  .ops-game-board {
    width: min(100%, 1100px) !important;
    height: 100% !important;
    flex: 1 1 auto !important;
    min-height: 0 !important;
    margin-inline: auto !important;
    display: flex !important;
    flex-direction: column !important;
    gap: clamp(8px, 1.2vh, 14px) !important;
    padding: 0 clamp(12px, 3vw, 28px) max(clamp(6px, 1vh, 14px), env(safe-area-inset-bottom)) !important;
    overflow: hidden !important;
  }

  .ops-question-zone {
    width: 100% !important;
    flex: 1 1 auto !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: clamp(14px, 2.5vh, 28px) clamp(16px, 4vw, 40px) !important;
    border: 1px solid rgba(210, 230, 221, 0.9) !important;
    border-radius: clamp(22px, 5vw, 36px) !important;
    background: rgba(255, 255, 255, 0.96) !important;
    box-shadow: 0 6px 20px rgba(31, 78, 60, 0.08) !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
  }

  .ops-question-top {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex: 0 0 auto;
  }

  .ops-question-counter {
    display: inline-flex;
    align-items: center;
    padding: clamp(6px, 1vh, 10px) clamp(12px, 3vw, 18px);
    background: #E6F6EF;
    border-radius: 999px;
    color: #14784C;
    font-size: clamp(13px, 2.5vw, 18px);
    font-weight: 900;
    line-height: 1.2;
  }

  .ops-settings-puck {
    position: absolute !important;
    top: clamp(14px, 2.5vh, 28px) !important;
    right: clamp(16px, 4vw, 40px) !important;
    width: clamp(40px, 9vw, 56px) !important;
    height: clamp(40px, 9vw, 56px) !important;
    border-radius: 50% !important;
    background: #F8FCFA !important;
    border: 1px solid #DFEBE6 !important;
    color: var(--text-primary) !important;
    box-shadow: 0 2px 8px rgba(31, 78, 60, 0.06) !important;
    flex: 0 0 auto;
  }

  .ops-question-label {
    margin: auto 0 0 !important;
    max-width: 100% !important;
    color: var(--text-primary) !important;
    font-family: inherit !important;
    font-size: clamp(20px, min(4.5vw, 5.3vh), 38px) !important;
    font-weight: 900 !important;
    line-height: 1.1 !important;
    letter-spacing: 0.02em !important;
    text-align: center !important;
    text-transform: uppercase !important;
    text-shadow: none !important;
  }

  .ops-question-subtitle {
    margin: 4px 0 0 !important;
    color: #708198 !important;
    font-size: clamp(13px, min(2.8vw, 3vh), 20px) !important;
    font-weight: 700 !important;
    line-height: 1.3 !important;
    text-align: center !important;
  }

  .ops-icons-container {
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: clamp(18px, 5vw, 60px) !important;
    margin: clamp(8px, 2vh, 24px) 0 clamp(8px, 1.6vh, 18px) !important;
    flex-wrap: nowrap !important;
    min-width: 0 !important;
  }

  .ops-icon-group {
    display: grid !important;
    grid-template-columns: repeat(3, var(--object-size)) !important;
    gap: clamp(4px, 1vw, 10px) !important;
    width: auto !important;
    min-width: 0 !important;
    max-width: none !important;
    justify-content: center !important;
    flex: 0 1 auto !important;
  }

  .ops-icon-emoji {
    width: var(--object-size) !important;
    height: var(--object-size) !important;
    display: grid !important;
    place-items: center !important;
    border-radius: 0 !important;
    color: inherit !important;
    background: transparent !important;
    box-shadow: none !important;
    font-size: calc(var(--object-size) * 0.92) !important;
    line-height: 1 !important;
    overflow: visible !important;
  }

  .ops-icon-operator {
    min-width: 0 !important;
    min-height: 0 !important;
    width: clamp(48px, 11vw, 76px) !important;
    height: clamp(48px, 11vw, 76px) !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: #EAF8F1 !important;
    color: #20A866 !important;
    font-size: clamp(28px, 7vw, 48px) !important;
    font-weight: 900 !important;
    box-shadow: none !important;
    text-shadow: none !important;
    flex: 0 0 auto !important;
  }

  .ops-question-expr {
    max-width: 100% !important;
    margin: 0 auto auto !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-wrap: nowrap !important;
    gap: clamp(10px, 2.5vw, 24px) !important;
    color: var(--text-primary) !important;
    font-family: inherit !important;
    font-size: clamp(48px, min(11vw, 12vh), 90px) !important;
    font-weight: 900 !important;
    line-height: 0.95 !important;
    letter-spacing: 0 !important;
    white-space: nowrap !important;
    text-shadow: none !important;
  }

  .ops-question-op,
  .ops-question-mark {
    color: #20A866 !important;
    padding: 0 !important;
    transform: none !important;
  }

  .ops-question-equals {
    color: #758392 !important;
    margin: 0 !important;
    text-shadow: none !important;
  }

  .ops-answer-zone {
    width: 100% !important;
    padding: 0 !important;
    flex: 0 0 auto !important;
    overflow: visible !important;
    display: flex !important;
    flex-direction: column !important;
    gap: clamp(8px, 1.2vh, 14px) !important;
  }

  .ops-typing-form {
    display: flex !important;
    flex-direction: row !important;
    align-items: stretch !important;
    gap: clamp(8px, 1.2vh, 14px) !important;
  }

  .ops-typing-input-shell {
    flex: 1 1 auto;
    min-width: 0;
    height: clamp(58px, 8vh, 78px);
    background: #FFFFFF;
    border: 2px solid #DCE5E3;
    border-radius: clamp(18px, 3vw, 26px);
    box-shadow: 0 3px 0 #D7E4DF, 0 8px 16px rgba(31, 78, 60, 0.06);
    padding-inline: clamp(14px, 3vw, 24px);
    display: flex;
    align-items: center;
    gap: clamp(10px, 2vw, 16px);
  }

  .ops-typing-input-shell:focus-within {
    border-color: var(--primary);
    box-shadow: 0 3px 0 #9CE3BA, 0 0 0 3px rgba(39, 182, 104, 0.12);
  }

  .ops-pencil-icon {
    color: #96A6B8;
    flex: 0 0 auto;
  }

  .ops-typing-input {
    flex: 1 1 auto !important;
    min-width: 0 !important;
    width: auto !important;
    height: 100% !important;
    padding: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    color: var(--text-primary) !important;
    font-family: inherit !important;
    font-size: clamp(18px, 4vw, 30px) !important;
    font-weight: 800 !important;
    text-align: left !important;
  }

  .ops-typing-input::placeholder {
    color: #93A0B1;
    opacity: 1;
  }

  .ops-submit-btn {
    width: auto !important;
    height: clamp(58px, 8vh, 78px) !important;
    padding: 0 !important;
    border: 0 !important;
    border-radius: clamp(18px, 3vw, 26px) !important;
    background: linear-gradient(180deg, #36C875, #22AA60) !important;
    color: #FFFFFF !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: clamp(8px, 2vw, 14px) !important;
    font-family: inherit !important;
    font-size: clamp(18px, 3vw, 28px) !important;
    font-weight: 900 !important;
    box-shadow: 0 5px 0 #168D4D, 0 8px 14px rgba(25, 120, 70, 0.12) !important;
    flex: 0 0 clamp(132px, 30%, 190px) !important;
    transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease !important;
  }

  .ops-submit-btn svg {
    width: 0.9em;
    height: 0.9em;
    flex: 0 0 auto;
  }

  .ops-submit-btn:active:not(:disabled) {
    transform: translateY(2px) !important;
    box-shadow: 0 3px 0 #168D4D, 0 5px 10px rgba(25, 120, 70, 0.10) !important;
  }

  @media (hover: hover) {
    .ops-submit-btn:hover:not(:disabled) {
      filter: brightness(1.02);
    }
  }

  .ops-submit-btn:disabled {
    background: #B9DEC9 !important;
    color: rgba(255, 255, 255, 0.8) !important;
    box-shadow: 0 4px 0 #9BC7AD !important;
    cursor: not-allowed !important;
    opacity: 1 !important;
  }

  .ops-choices-grid {
    width: 100%;
    display: grid !important;
    grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
    gap: clamp(8px, 1.5vw, 14px) !important;
  }

  .ops-choice-btn {
    min-height: clamp(58px, 8vh, 82px) !important;
    border-radius: clamp(18px, 3vw, 26px) !important;
    border: 1px solid #DCE7E3 !important;
    border-bottom: 4px solid #CAD7D2 !important;
    background: #FFFFFF !important;
    box-shadow: 0 3px 12px rgba(31, 78, 60, 0.06) !important;
  }

  .ops-choice-value {
    color: var(--text-primary) !important;
    font-family: inherit !important;
    text-shadow: none !important;
  }

  .ops-footer-stats {
    width: 100% !important;
    max-width: none !important;
    align-self: stretch !important;
    margin: 0 !important;
    padding: clamp(8px, 1.2vh, 14px) clamp(12px, 3vw, 22px) !important;
    background: rgba(255, 255, 255, 0.94) !important;
    border: 1px solid #DDEBE5 !important;
    border-radius: clamp(20px, 4vw, 30px) !important;
    box-shadow: 0 3px 12px rgba(31, 78, 60, 0.06) !important;
    flex: 0 0 auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
    justify-content: flex-start !important;
    gap: clamp(6px, 1vh, 10px) !important;
  }

  .ops-answer-record {
    width: 100% !important;
    min-height: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: clamp(6px, 1.5vw, 12px) !important;
    padding: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    border-radius: 0 !important;
    color: var(--text-secondary) !important;
    white-space: nowrap !important;
  }

  .ops-answer-title {
    color: var(--text-primary) !important;
    font-family: inherit !important;
    font-size: clamp(12px, 2.5vw, 17px) !important;
    font-weight: 900 !important;
    text-shadow: none !important;
  }

  .ops-answer-stats {
    display: flex !important;
    align-items: center !important;
    gap: clamp(6px, 1.5vw, 12px) !important;
    min-width: 0 !important;
  }

  .ops-answer-stat {
    display: inline-flex !important;
    align-items: center !important;
    gap: clamp(4px, 1vw, 7px) !important;
    font-family: inherit !important;
    font-size: clamp(12px, 2.5vw, 17px) !important;
    font-weight: 900 !important;
  }

  .ops-answer-icon {
    width: clamp(26px, 6vw, 34px) !important;
    height: clamp(26px, 6vw, 34px) !important;
    border-radius: 8px !important;
    display: grid !important;
    place-items: center !important;
    color: #FFFFFF !important;
    font-size: 0 !important;
    box-shadow: none !important;
  }

  .ops-answer-icon.is-correct {
    background: #27B668 !important;
  }

  .ops-answer-icon.is-wrong {
    background: #FF4D55 !important;
  }

  .ops-answer-icon.is-correct::before {
    content: "✓";
    font-size: clamp(18px, 4vw, 24px);
    line-height: 1;
  }

  .ops-answer-icon.is-wrong::before {
    content: "×";
    font-size: clamp(18px, 4vw, 24px);
    line-height: 1;
  }

  .ops-answer-stat.is-correct {
    color: #159653 !important;
  }

  .ops-answer-stat.is-wrong {
    color: #E93E46 !important;
  }

  .ops-answer-muted {
    color: var(--text-secondary) !important;
    font-weight: 800 !important;
  }

  .ops-answer-divider {
    width: 1px !important;
    height: 26px !important;
    background: #CBD5D1 !important;
    color: transparent !important;
    margin-inline: clamp(2px, 1vw, 8px) !important;
  }

  .ops-progress-wrap {
    width: 100% !important;
    max-width: none !important;
    display: grid !important;
    grid-template-columns: auto minmax(0, 1fr) auto !important;
    align-items: center !important;
    gap: clamp(10px, 2vw, 16px) !important;
    padding: 0 !important;
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  .ops-stat-trophy {
    width: clamp(40px, 9vw, 58px) !important;
    height: clamp(40px, 9vw, 58px) !important;
    border-radius: 50% !important;
    background: linear-gradient(180deg, #FFD84D, #FFB515) !important;
    display: grid !important;
    place-items: center !important;
    color: #9A6A00 !important;
    box-shadow: 0 2px 6px rgba(180, 120, 0, 0.12) !important;
    font-size: clamp(22px, 5vw, 30px) !important;
    line-height: 1 !important;
  }

  .ops-progress-track {
    width: 100% !important;
    height: clamp(12px, 2vh, 18px) !important;
    padding: 0 !important;
    background: #E5EBE8 !important;
    border-radius: 999px !important;
    overflow: hidden !important;
    box-shadow: none !important;
  }

  .ops-progress-fill {
    height: 100% !important;
    background: var(--primary) !important;
    border-radius: inherit !important;
    box-shadow: none !important;
    transition: width 300ms ease !important;
  }

  .ops-progress-count {
    min-width: 0 !important;
    color: var(--text-primary) !important;
    font-size: clamp(16px, 3vw, 22px) !important;
    font-weight: 900 !important;
    white-space: nowrap !important;
  }

  .ops-footer-stats.mgf-footer {
    padding: clamp(6px, 0.9vh, 10px) clamp(12px, 3vw, 22px) !important;
    border-radius: clamp(18px, 4vw, 26px) !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: clamp(8px, 1.6vw, 16px) !important;
    min-height: 0 !important;
  }

  .ops-footer-stats .mgf-answer-row {
    width: auto !important;
    flex: 0 0 auto !important;
    min-height: 0 !important;
    gap: clamp(6px, 1.2vw, 10px) !important;
  }

  .ops-footer-stats .mgf-progress-row {
    width: auto !important;
    flex: 1 1 auto !important;
    min-width: 0 !important;
    display: grid !important;
    grid-template-columns: auto minmax(0, 1fr) auto !important;
    gap: clamp(8px, 1.6vw, 16px) !important;
  }

  .ops-footer-stats .mgf-title,
  .ops-footer-stats .mgf-stat {
    font-size: clamp(12px, 1.7vw, 17px) !important;
  }

  .ops-footer-stats .mgf-stat {
    padding: 0 !important;
    border: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    gap: clamp(4px, 0.7vw, 7px) !important;
  }

  .ops-footer-stats .mgf-icon {
    width: clamp(24px, 4vw, 34px) !important;
    height: clamp(24px, 4vw, 34px) !important;
  }

  .ops-footer-stats .mgf-divider {
    height: clamp(22px, 3.8vh, 30px) !important;
    margin-inline: clamp(2px, 0.8vw, 8px) !important;
  }

  .ops-footer-stats .mgf-trophy {
    width: clamp(32px, 5.2vw, 44px) !important;
    height: clamp(32px, 5.2vw, 44px) !important;
  }

  .ops-footer-stats .mgf-track {
    height: clamp(12px, 1.7vh, 18px) !important;
  }

  .ops-footer-stats .mgf-count {
    font-size: clamp(15px, 2.3vw, 22px) !important;
  }

  .ops-feedback-bar {
    position: fixed !important;
    top: max(8px, env(safe-area-inset-top)) !important;
    left: 50% !important;
    right: auto !important;
    transform: translateX(-50%) !important;
    width: min(92vw, 420px) !important;
    border-radius: 999px !important;
    padding: 10px 16px !important;
    box-shadow: 0 8px 20px rgba(31, 78, 60, 0.14) !important;
    z-index: 70 !important;
  }

  @media (max-height: 700px) {
    .ops-game-shell {
      --object-size: clamp(20px, min(4.4vw, 4.5vh), 34px);
    }

    .ops-ref-header {
      padding-block: 4px;
    }

    .ops-question-zone {
      padding: 10px clamp(14px, 3vw, 24px) !important;
    }

    .ops-question-label {
      margin: clamp(4px, 0.9vh, 10px) 0 0 !important;
      font-size: clamp(17px, min(3.6vw, 4.6vh), 28px) !important;
      line-height: 1.05 !important;
    }

    .ops-question-subtitle {
      margin-top: 2px !important;
      font-size: clamp(12px, min(2.4vw, 2.6vh), 17px) !important;
      line-height: 1.15 !important;
    }

    .ops-icons-container {
      gap: clamp(10px, 3vw, 34px) !important;
      margin-block: clamp(2px, 0.6vh, 7px) !important;
    }

    .ops-icon-group {
      gap: clamp(3px, 0.8vw, 7px) !important;
    }

    .ops-icon-operator {
      width: clamp(42px, 9vw, 62px) !important;
      height: clamp(42px, 9vw, 62px) !important;
      font-size: clamp(26px, 6vw, 40px) !important;
    }

    .ops-question-expr {
      margin: 0 auto !important;
      font-size: clamp(38px, min(9vw, 9.5vh), 68px) !important;
      line-height: 0.9 !important;
      gap: clamp(8px, 2vw, 18px) !important;
    }

    .ops-typing-input-shell {
      height: clamp(54px, 8vh, 68px);
    }

    .ops-submit-btn {
      height: clamp(52px, 7.5vh, 64px) !important;
    }

    .ops-footer-stats {
      padding: 6px clamp(10px, 2vw, 18px) !important;
    }
  }

  @media (max-height: 600px) {
    .ops-game-shell {
      --object-size: clamp(16px, min(3.7vw, 3.8vh), 28px);
    }

    .ops-question-zone {
      padding-block: 6px !important;
    }

    .ops-question-label {
      margin-top: 2px !important;
      font-size: clamp(14px, min(3vw, 3.5vh), 21px) !important;
    }

    .ops-question-subtitle {
      margin-top: 1px !important;
      font-size: clamp(10px, min(2vw, 2.2vh), 13px) !important;
      line-height: 1.1 !important;
    }

    .ops-icons-container {
      gap: clamp(8px, 2.2vw, 22px) !important;
      margin-block: 1px !important;
    }

    .ops-icon-group {
      gap: clamp(2px, 0.5vw, 5px) !important;
    }

    .ops-icon-operator {
      width: clamp(32px, 6.5vw, 44px) !important;
      height: clamp(32px, 6.5vw, 44px) !important;
      font-size: clamp(22px, 4.5vw, 30px) !important;
    }

    .ops-question-expr {
      font-size: clamp(28px, min(6.7vw, 6.8vh), 46px) !important;
      line-height: 0.88 !important;
      gap: clamp(6px, 1.4vw, 14px) !important;
    }

    .ops-typing-input-shell,
    .ops-submit-btn {
      height: 50px !important;
    }

    .ops-footer-stats {
      gap: 4px !important;
    }
  }

  @media (max-height: 480px) {
    .ops-game-shell {
      --object-size: clamp(13px, min(3vw, 3.2vh), 22px);
    }

    .ops-question-counter {
      padding: 4px 10px;
      font-size: clamp(11px, 2.1vw, 14px);
    }

    .ops-settings-puck {
      width: clamp(32px, 7vw, 40px) !important;
      height: clamp(32px, 7vw, 40px) !important;
    }

    .ops-question-label {
      font-size: clamp(12px, min(2.7vw, 3vh), 18px) !important;
      line-height: 1 !important;
    }

    .ops-question-subtitle {
      font-size: clamp(9px, min(1.8vw, 2vh), 12px) !important;
    }

    .ops-icons-container {
      gap: clamp(6px, 1.7vw, 16px) !important;
      margin-block: 0 !important;
    }

    .ops-icon-operator {
      width: clamp(28px, 5.4vw, 36px) !important;
      height: clamp(28px, 5.4vw, 36px) !important;
      font-size: clamp(19px, 3.8vw, 26px) !important;
    }

    .ops-question-expr {
      font-size: clamp(24px, min(5.6vw, 5.8vh), 38px) !important;
      gap: clamp(5px, 1vw, 10px) !important;
    }
  }

  @media (max-width: 560px) {
    .ops-typing-form {
      gap: 7px !important;
    }

    .ops-typing-input-shell {
      height: 52px;
      padding-inline: 12px;
    }

    .ops-pencil-icon {
      width: 21px;
      height: 21px;
    }

    .ops-typing-input {
      font-size: 16px !important;
    }

    .ops-submit-btn {
      height: 52px !important;
      flex-basis: 118px !important;
      font-size: 17px !important;
    }

    .ops-footer-stats.mgf-footer {
      gap: clamp(5px, 1.3vw, 8px) !important;
      padding-inline: 8px !important;
    }

    .ops-footer-stats .mgf-title,
    .ops-footer-stats .mgf-stat {
      font-size: 11px !important;
    }

    .ops-footer-stats .mgf-stat {
      gap: 3px !important;
    }

    .ops-footer-stats .mgf-icon {
      width: 22px !important;
      height: 22px !important;
    }

    .ops-footer-stats .mgf-muted {
      font-size: 0.72em !important;
    }

    .ops-footer-stats .mgf-divider {
      height: 20px !important;
      margin-inline: 1px !important;
    }

    .ops-footer-stats .mgf-progress-row {
      gap: 6px !important;
    }

    .ops-footer-stats .mgf-trophy {
      width: 28px !important;
      height: 28px !important;
    }

    .ops-footer-stats .mgf-count {
      font-size: 13px !important;
    }
  }

  @media (max-width: 720px) {
    .ops-ref-rewards {
      gap: 5px;
    }

    .ops-ref-reward-pill {
      padding-inline: 8px;
    }

    .ops-ref-title-block h1 {
      max-width: 28vw;
    }

    .ops-choices-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
  }

  @media (min-width: 600px) {
    .ops-footer-stats {
      flex: 0 0 auto !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: clamp(96px, 18vh, 145px) !important;
      justify-content: flex-start !important;
      overflow: visible !important;
    }

    .ops-answer-record {
      flex: 0 0 auto !important;
      min-height: 30px !important;
    }

    .ops-progress-wrap {
      flex: 0 0 auto !important;
    }
  }

  @media (max-width: 430px) {
    .ops-ref-subject-icon {
      display: none;
    }

    .ops-ref-reward-pill svg {
      width: 22px;
      height: 22px;
    }

    .ops-ref-reward-pill {
      font-size: 16px;
      padding-inline: 7px;
      gap: 3px;
    }
  }

  @media (max-width: 360px) {
    .ops-game-board,
    .ops-ref-header {
      padding-inline: 10px !important;
    }

    .ops-ref-header-left {
      gap: 6px;
    }

    .ops-icons-container {
      gap: 14px !important;
    }

    .ops-answer-record,
    .ops-answer-stats {
      gap: 4px !important;
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
const OPERATIONS = [
  { id: 'add',      emoji: '➕', labelBm: 'Tambah',  labelEn: 'Addition',       color: '#62D98B', dark: '#20A458', light: '#DDFBE8' },
  { id: 'subtract', emoji: '➖', labelBm: 'Tolak',   labelEn: 'Subtraction',    color: '#68C7F7', dark: '#188CC5', light: '#DDF3FF' },
  { id: 'multiply', emoji: '✖️', labelBm: 'Darab',   labelEn: 'Multiplication', color: '#D9A5FF', dark: '#9957C8', light: '#F3E3FF' },
  { id: 'divide',   emoji: '➗', labelBm: 'Bahagi',  labelEn: 'Division',       color: '#FFB86C', dark: '#D46B1F', light: '#FFE8CF' },
  { id: 'random',   emoji: '🎲', labelBm: 'Rawak',   labelEn: 'Random Mix',     color: '#FF8B8B', dark: '#D94B4B', light: '#FFE0E0' },
];

const DIFFICULTIES = [
  { id: 'easy',   emoji: '🌱', labelBm: 'Senang',    labelEn: 'Easy',   descBm: '(1-9)',     color: '#62D98B', dark: '#20A458', light: '#DDFBE8' },
  { id: 'medium', emoji: '⭐', labelBm: 'Sederhana', labelEn: 'Medium', descBm: '(10-99)',   color: '#FFD873', dark: '#D59B17', light: '#FFF3CF' },
  { id: 'hard',   emoji: '🔥', labelBm: 'Susah',     labelEn: 'Hard',   descBm: '(100+)',    color: '#FF8B8B', dark: '#D94B4B', light: '#FFE0E0' },
];

const INPUT_MODES = [
  { id: 'multiple', emoji: '🔘', labelBm: 'Pilihan', labelEn: 'Choices', color: '#D9A5FF', dark: '#9957C8', light: '#F3E3FF' },
  { id: 'typing',   emoji: '⌨️', labelBm: 'Taip',    labelEn: 'Type',    color: '#FFB86C', dark: '#D46B1F', light: '#FFE8CF' },
];

// Numbers 1 to 9
const NUMBERS = Array.from({length: 9}, (_, i) => i + 1);

function GameMenu({
  onStart,
  onCancel,
  language,
  initialOperation = null,
  initialDifficulty = null,
  initialNums = [],
  initialInputMode = null,
}) {
  const [selOp,    setSelOp]    = useState(() => OPERATIONS.find(op => op.id === initialOperation) || null);
  const [selNums,  setSelNums]  = useState(() => Array.isArray(initialNums) ? initialNums : []);
  const [selDiff,  setSelDiff]  = useState(() => DIFFICULTIES.find(d => d.id === initialDifficulty) || null);
  const [selInput, setSelInput] = useState(() => INPUT_MODES.find(m => m.id === initialInputMode) || null);

  const bm = language === 'bm';

  const handleToggleNum = (n) => {
    if (n === 'random') {
      setSelNums(['random']);
      return;
    }
    let current = selNums.includes('random') ? [] : [...selNums];
    if (current.includes(n)) {
       current = current.filter(x => x !== n);
    } else {
       current.push(n);
    }
    setSelNums(current);
  };

  const handleStart = () => {
    if (selOp && selDiff && selInput) {
      const finalNums = selNums.includes('random') ? [] : selNums;
      onStart(selOp.id, selDiff.id, finalNums, selInput.id);
    }
  };

  const isReady = selOp && selDiff && selInput;

  return (
    <div>
      <div className="ops-settings-group">
        <div className="ops-settings-section-head">
          <div className="ops-settings-label">{bm ? 'Tahap' : 'Level'}</div>
          <p className="ops-settings-help">{bm ? 'Pilih tahap kesukaran soalan.' : 'Choose question difficulty.'}</p>
        </div>
        <div className="ops-settings-options">
          {DIFFICULTIES.map(d => (
            <button type="button" key={d.id} className={`ops-settings-option ${selDiff?.id === d.id ? 'is-active' : ''}`} aria-pressed={selDiff?.id === d.id} onClick={() => setSelDiff(d)}>{bm ? d.labelBm : d.labelEn}</button>
          ))}
        </div>
      </div>
      <div className="ops-settings-group">
        <div className="ops-settings-section-head">
          <div className="ops-settings-label">{bm ? 'Operasi' : 'Operation'}</div>
          <p className="ops-settings-help">{bm ? 'Pilih operasi matematik.' : 'Choose a math operation.'}</p>
        </div>
        <div className="ops-settings-options">
          {[OPERATIONS[4], ...OPERATIONS.slice(0, 4)].map(op => (
            <button type="button" key={op.id} className={`ops-settings-option ${selOp?.id === op.id ? 'is-active' : ''}`} aria-pressed={selOp?.id === op.id} aria-label={bm ? op.labelBm : op.labelEn} title={bm ? op.labelBm : op.labelEn} onClick={() => setSelOp(op)}>
              {({ add: '+', subtract: '-', multiply: '\u00d7', divide: '\u00f7' })[op.id] || (bm ? 'Rawak' : 'Random')}
            </button>
          ))}
        </div>
      </div>
      <div className="ops-settings-group">
        <div className="ops-settings-section-head">
          <div className="ops-settings-label">{bm ? 'Nombor' : 'Numbers'}</div>
          <p className="ops-settings-help">{bm ? 'Pilih julat nombor.' : 'Choose number range.'}</p>
        </div>
        <div className="ops-settings-options">
          {['random', ...NUMBERS].map(n => {
            const selected = n === 'random' ? !selNums.length || selNums.includes('random') : selNums.includes(n);
            return <button type="button" key={n} className={`ops-settings-option ${selected ? 'is-active' : ''}`} aria-pressed={selected} onClick={() => handleToggleNum(n)}>{n === 'random' ? (bm ? 'Rawak' : 'Random') : n}</button>;
          })}
        </div>
      </div>
      <div className="ops-settings-group">
        <div className="ops-settings-section-head">
          <div className="ops-settings-label">{bm ? 'Cara Menjawab' : 'Answer Method'}</div>
          <p className="ops-settings-help">{bm ? 'Pilih cara menjawab soalan.' : 'Choose how to answer questions.'}</p>
        </div>
        <div className="ops-settings-options">
          {INPUT_MODES.map(m => (
            <button type="button" key={m.id} className={`ops-settings-option ${selInput?.id === m.id ? 'is-active' : ''}`} aria-pressed={selInput?.id === m.id} onClick={() => setSelInput(m)}>{bm ? m.labelBm : m.labelEn}</button>
          ))}
        </div>
      </div>
      <div className="ops-settings-footer">
        <button type="button" className="ops-settings-cancel" onClick={onCancel}>{bm ? 'Batal' : 'Cancel'}</button>
        <button type="button" className="ops-settings-option is-active ops-settings-start" disabled={!isReady} onClick={handleStart}>{bm ? 'Mula Main!' : 'Start Playing!'}</button>
      </div>
    </div>
  );
}

export default function MathOperationsGame({
  operation, difficulty, nums, quizType,
  onBack, language, onConfigChange,
}) {
  const initialGameData = useMemo(() => getGameData(), []);
  const initialNums = useMemo(() => (Array.isArray(nums) ? nums : []), [nums]);
  const handleBack = useBrowserBack(onBack);

  const [activeOperation, setActiveOperation] = useState(operation || 'add');
  const [activeDifficulty, setActiveDifficulty] = useState(difficulty || 'easy');
  const [activeNums, setActiveNums] = useState(initialNums);
  const [activeQuizType, setActiveQuizType] = useState(quizType || 'multiple');
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
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
  const [isHeartShopOpen, setIsHeartShopOpen] = useState(false);

  const inputRef      = useRef(null);
  const feedbackTimer = useRef(null);
  const opMeta   = OP_META[activeOperation]  || OP_META.add;
  const operationTitle = language === 'bm' ? opMeta.label : opMeta.labelEn;

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
    if (!isSettingsOpen && !feedback && activeQuizType === 'typing' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [feedback, activeQuizType, isSettingsOpen]);

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
    onConfigChange?.({ operation: nextOperation, difficulty: nextDifficulty, nums: safeNums, quizType: nextQuizType });
  };

  const handleRewardPurchase = (newData) => {
    if (!newData) return;
    setHearts(newData.hearts);
    setGems(newData.gems);
    setStars(newData.stars);
  };

  if (!problem) {
    return (
      <MathGameShell className="ops-game-shell" styles={getOpsClayStyles()}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="ops-loading-spinner" />
        </div>
      </MathGameShell>
    );
  }

  const accentColor = opMeta.color;
  const accentDark  = opMeta.dark;
  const displaySymbol = problem.symbol === 'Ã—' ? '×' : problem.symbol === 'Ã·' ? '÷' : problem.symbol;
  const progressInGroup = showStreak && streak % 10 === 0 && streak > 0 ? 10 : streak % STREAK_MILESTONE;
  const questionNumber = Math.min(progressInGroup + 1, STREAK_MILESTONE);

  return (
    <MathGameShell className="ops-game-shell" styles={getOpsClayStyles()}>

      {/* Streak popup */}
      {showStreak && (
        <StreakPopup
          streak={streak}
          language={language}
          onClose={() => setShowStreak(false)}
        />
      )}

      <MathGameHeader
        classPrefix="ops"
        onBack={handleBack}
        language={language}
        subtitle={operationTitle}
        hearts={hearts}
        gems={gems}
        stars={stars}
        onRewardsClick={() => setIsHeartShopOpen(true)}
      />

      {isSettingsOpen && (
        <div className="ops-settings-overlay" role="dialog" aria-modal="true" aria-label={language === 'bm' ? 'Tetapan permainan' : 'Game settings'}>
          <div className="ops-settings-panel">
            <div className="ops-settings-panel-head">
              <div>
                <h2 className="ops-settings-title">{language === 'bm' ? 'Tetapan Permainan' : 'Game Settings'}</h2>
                <p className="ops-settings-subtitle">
                  {language === 'bm' ? 'Laraskan pilihan mengikut tahap dan gaya pembelajaran anda.' : 'Adjust choices for your level and learning style.'}
                </p>
              </div>
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
              language={language}
              onStart={handleSettingsStart}
              onCancel={() => setIsSettingsOpen(false)}
              initialOperation={activeOperation}
              initialDifficulty={activeDifficulty}
              initialNums={activeNums}
              initialInputMode={activeQuizType}
            />
          </div>
        </div>
      )}

      <MathGameBody className="ops-game-board">
      {/* ── Question Zone ── */}
      <div className="ops-question-zone">
        <div className="ops-question-top">
          <span className="ops-question-counter">
            {language === 'bm' ? `Soalan ${questionNumber} / ${STREAK_MILESTONE}` : `Question ${questionNumber} / ${STREAK_MILESTONE}`}
          </span>
        </div>
        <button
          type="button"
          className="ops-settings-puck"
          onClick={() => setIsSettingsOpen(true)}
          aria-label={language === 'bm' ? 'Buka tetapan permainan' : 'Open game settings'}
        >
          <Settings size={26} strokeWidth={2.5} aria-hidden="true" />
        </button>

        <p className="ops-question-label">
          {language === 'bm' ? 'Berapakah hasilnya?' : 'What is the answer?'}
        </p>
        <p className="ops-question-subtitle">
          {language === 'bm' ? 'Kira jumlah objek dan jawab soalan.' : 'Count the objects and answer.'}
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
              {displaySymbol}
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
          <span>{problem.num1}</span>
          <span className="ops-question-op">{displaySymbol}</span>
          <span>{problem.num2}</span>
          <span className="ops-question-equals">=</span>
          <span className="ops-question-mark">?</span>
        </div>
      </div>

      {/* ── Answer Zone ── */}
      <div className="ops-answer-zone">
        {activeQuizType === 'typing' ? (
          /* Manual Entry */
          <form onSubmit={handleTypingSubmit} className="ops-typing-form">
            <div className="ops-typing-input-shell">
              <Pencil className="ops-pencil-icon" size={32} strokeWidth={2.4} aria-hidden="true" />
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
            </div>
            <button
              type="submit"
              className="ops-submit-btn"
              style={{ background: accentColor, borderBottomColor: accentDark }}
              disabled={!typedAnswer.trim() || !!feedback}
            >
              <span>{language === 'bm' ? 'Semak' : 'Check'}</span>
              <SendHorizontal size={22} strokeWidth={2.6} aria-hidden="true" />
            </button>
          </form>
        ) : (
          /* Multiple Choice */
          <div className="ops-choices-grid">
            {problem.options.map((opt) => {
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
      <MathGameFooter
        language={language}
        correctCount={correctCount}
        wrongCount={wrongCount}
        progress={progressInGroup}
        milestone={STREAK_MILESTONE}
        className="ops-footer-stats"
      />
      </MathGameBody>
      <HeartShopModal isOpen={isHeartShopOpen} onClose={() => setIsHeartShopOpen(false)} onPurchase={handleRewardPurchase} language={language} />
    </MathGameShell>
  );
}
