import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Pencil, SendHorizontal, Settings, X } from 'lucide-react';
import { generateProblem } from '../../utils/mathLogic';
import { playSound } from '../../utils/soundManager';
import { getGameData, addCorrectAnswer, deductHeart } from '../../utils/gameStatsManager';
import useBrowserBack from '../../hooks/useBrowserBack';
import HeartShopModal from '../HeartShopModal';
import { MathGameToolbar, MathGameBody, MathGameHeader, MathGameShell } from './MathGameLayout';

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


  .ops-game-shell {
    --primary: #08b65b; --text-primary: #091b44; --text-secondary: #78879e;
    --object-size: clamp(28px, min(8.5vw, 6dvh), 78px);
    --object-columns: 3;
    --object-gap: clamp(4px, 1vw, 12px);
    width: 100%; min-width: 0; height: 100dvh; max-height: 100dvh; overflow: hidden;
    padding: clamp(8px, 2dvh, 24px) clamp(8px, 3vw, 32px);
    background: radial-gradient(ellipse at center, #f5fffb, #eafff6);
    color: var(--text-primary); font-family: 'Fredoka', sans-serif; font-variant-numeric: tabular-nums;
    display: flex; flex-direction: column; gap: clamp(6px, 1dvh, 14px);
  }
  .ops-game-shell *, .ops-game-shell *::before, .ops-game-shell *::after { box-sizing: border-box; }
  .ops-game-shell button { cursor: pointer; }
  .ops-game-shell button:focus-visible { outline: 3px solid #188cc5; outline-offset: 4px; }
  .ops-game-shell button:disabled { cursor: default; }
  .ops-ref-header { width: 100%; max-width: 1190px; min-width: 0; margin: 0 auto; display: flex; align-items: center; flex: 0 0 auto; gap: clamp(4px, 1.2vw, 20px); }
  .ops-ref-header-left { display: flex; align-items: center; gap: clamp(5px, 1.5vw, 18px); min-width: 0; flex: 1 1 auto; }
  .ops-ref-rewards { display: flex; align-items: center; gap: clamp(3px, 0.8vw, 12px); min-width: 0; margin-left: auto; flex: 0 0 auto; flex-wrap: nowrap; }
  .ops-ref-back { width: clamp(36px, 5.3vw, 58px); aspect-ratio: 1; flex-shrink: 0; border: 0; border-radius: 50%; background: white; color: var(--text-primary); display: grid; place-items: center; box-shadow: 0 5px 18px #135c3910; }
  .ops-ref-back svg { width: clamp(19px, 2.8vw, 28px); }
  .ops-ref-subject-icon { display: none; }
  .ops-ref-title-block { min-width: 0; }
  .ops-ref-title-block h1 { margin: 0; font: 800 clamp(18px, 2.5vw, 32px)/1 'Baloo 2', sans-serif; color: var(--text-primary); white-space: nowrap; }
  .ops-ref-title-block p { margin: 0; font-size: clamp(12px, 1.6vw, 20px); line-height: 1.1; color: #6f8097; white-space: nowrap; }
  .ops-ref-reward-pill { display: flex; align-items: center; justify-content: center; gap: clamp(2px, 0.5vw, 8px); min-height: 36px; padding: clamp(5px, 0.8vw, 10px); border: 0; border-radius: 99px; background: white; color: var(--text-primary); font: 800 clamp(15px, 1.8vw, 25px)/1 'Baloo 2', sans-serif; white-space: nowrap; box-shadow: 0 5px 18px #135c3910; }
  .ops-ref-reward-pill svg { width: clamp(17px, 2vw, 28px); height: auto; }
  .ops-ref-reward-icon.is-star { color: #ffb800; }
  .ops-ref-reward-icon.is-heart { color: #ff515f; }
  .ops-ref-reward-icon.is-gem { color: #16bafa; }
  .ops-game-shell .ops-game-board { width: 100%; max-width: 1292px; min-height: 0; margin: 0 auto; padding: clamp(10px, 1.6dvh, 22px) clamp(12px, 2.8vw, 40px); background: white; border-radius: clamp(24px, 2.8vw, 40px); box-shadow: 0 8px 30px #126b3b0c; display: flex; flex-direction: column; gap: clamp(6px, 1.2dvh, 16px); flex: 1; }
  .ops-board-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .ops-answer-record, .ops-answer-stat { display: flex; align-items: center; gap: 8px; }
  .ops-answer-record { flex-wrap: wrap; gap: clamp(5px, 1vw, 14px); font-size: clamp(12px, 1.4vw, 20px); }
  .ops-answer-title { font-weight: 600; }
  .ops-answer-stat { color: #09b65a; }
  .ops-answer-stat.is-wrong { color: #ff3947; }
  .ops-answer-muted { color: #74839b; }
  .ops-answer-icon { width: clamp(24px, 2.8vw, 38px); aspect-ratio: 1; border: 5px solid #dbf9e7; border-radius: 50%; display: grid; place-items: center; background: #08b65b; color: white; }
  .is-wrong .ops-answer-icon { background: #ff3947; border-color: #ffe1e2; }
  .ops-answer-icon svg { width: 80%; height: 80%; }
  .ops-answer-divider { height: 36px; width: 2px; background: #dce2eb; }
  .ops-settings-puck { position: static; width: clamp(40px, 4.5vw, 60px); aspect-ratio: 1; flex-shrink: 0; display: grid; place-items: center; background: linear-gradient(white, #f7fafc); color: var(--text-primary); border: 2px solid #e7edf4; border-radius: 50%; box-shadow: 0 4px 10px #09234708; }
  .ops-settings-puck svg { width: clamp(24px, 2.6vw, 30px); }
  .ops-game-shell .ops-question-zone { width: 100%; min-width: 0; min-height: 0; margin: 0; padding: clamp(6px, 1.5dvh, 20px) clamp(4px, 2vw, 24px); flex: 1 1 auto; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .ops-game-shell .ops-question-label { margin: 0; color: var(--text-primary); font: 800 clamp(23px, min(4.2vw, 5dvh), 56px)/1.1 'Baloo 2', sans-serif; text-transform: uppercase; letter-spacing: 0; text-align: center; text-wrap: balance; }
  .ops-question-subtitle { margin: 4px 0 0; color: var(--text-secondary); font-size: clamp(14px, 2vw, 28px); text-align: center; }
  .ops-game-shell .ops-icons-container { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; justify-items: center; gap: clamp(8px, 3vw, 45px) !important; margin: clamp(14px, 3dvh, 36px) 0; width: 100%; min-height: 0; }
  .ops-game-shell .ops-icon-group { display: flex; flex-wrap: wrap; gap: var(--object-gap); width: 100%; max-width: calc(var(--object-columns) * var(--object-size) + (var(--object-columns) - 1) * var(--object-gap)); min-width: 0; justify-content: center; align-content: center; }
  .ops-game-shell .ops-icons-container:has(.ops-icon-emoji:nth-child(n + 10)) { --object-size: clamp(20px, min(6vw, 4dvh), 44px); --object-columns: 4; --object-gap: 2px; }
  .ops-icon-emoji { width: var(--object-size); height: var(--object-size); display: grid; place-items: center; font-size: var(--object-size); line-height: 1; filter: hue-rotate(8deg) saturate(1.1) drop-shadow(0 6px 5px #44218420); }
  .ops-game-shell .ops-icons-container .ops-icon-operator { width: clamp(42px, 8vw, 96px); aspect-ratio: 1; flex-shrink: 0; display: grid; place-items: center; border-radius: 50%; background: #e0faee; color: #08b65b !important; font: 800 clamp(36px, 6vw, 78px)/1 'Baloo 2', sans-serif !important; }
  .ops-game-shell .ops-question-expr { max-width: 100%; margin: 0; gap: clamp(6px, 1.6vw, 24px); font: 800 clamp(38px, min(8.2vw, 10dvh), 108px)/1 'Baloo 2', sans-serif; color: var(--text-primary); }
  .ops-question-op, .ops-question-mark { color: #08b65b; padding: 0; transform: none; }
  .ops-question-equals { color: #738196; }
  .ops-game-shell .ops-answer-zone { width: 100%; padding: 0; gap: 8px; flex: 0 0 auto; }
  .ops-game-shell .ops-continue-wrong { margin-top: 0; padding: clamp(7px, 1dvh, 12px); font-size: clamp(15px, 1.8vw, 20px); }
  .ops-game-shell .ops-choices-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(6px, 1vw, 14px); }
  .ops-game-shell .ops-choice-btn { min-width: 0; min-height: clamp(56px, 11dvh, 116px); padding: 10px; border: 2px solid #d9e2ee; border-radius: 18px; background: linear-gradient(white, #f3f7fa); box-shadow: 0 5px 12px #19395708; display: grid; place-items: center; transition: transform 160ms, border-color 160ms, background 160ms; }
  .ops-game-shell .ops-choice-value { font: 800 clamp(32px, 4.2vw, 56px)/1 'Baloo 2', sans-serif; color: var(--text-primary); }
  .ops-game-shell .ops-choice-correct { background: #dcfce7; border-color: #08b65b; }
  .ops-game-shell .ops-choice-wrong { background: #ffe2e5; border-color: #ff3947; }
  .ops-game-shell .ops-choice-correct .ops-choice-value { color: #07843f; }
  .ops-game-shell .ops-choice-wrong .ops-choice-value { color: #c92336; }
  .ops-progress-wrap { width: 100%; display: flex; align-items: center; gap: clamp(10px, 2vw, 24px); margin-top: 0; flex: 0 0 auto; }
  .ops-progress-track { flex: 1; height: clamp(12px, 1.6dvh, 18px); background: #e5eaf1; border-radius: 99px; overflow: hidden; }
  .ops-progress-fill { height: 100%; background: linear-gradient(90deg, #08b65b, #0ac765); border-radius: inherit; transition: width 300ms; }
  .ops-progress-count { font: 800 clamp(18px, 2vw, 28px)/1 'Baloo 2', sans-serif; white-space: nowrap; }
  .ops-game-shell .ops-feedback-bar { position: static; margin: 0; width: 100%; padding: clamp(6px, 1dvh, 12px); border-radius: 14px; }
  @media (hover: hover) { .ops-choice-btn:hover:not(:disabled) { border-color: #08b65b; background: #f0fff6; } }
  @media (max-width: 600px) {
    .ops-game-shell { padding: 8px 8px max(8px, env(safe-area-inset-bottom)); gap: 6px; }
    .ops-ref-header { flex-wrap: nowrap; gap: 4px; }
    .ops-ref-header-left { gap: 5px; }
    .ops-ref-rewards { gap: 3px; }
    .ops-ref-reward-pill { padding: 5px; gap: 2px; }
    .ops-game-shell .ops-game-board { gap: 8px; }
    .ops-answer-record { gap: 6px; }
    .ops-answer-stat { gap: 4px; }
    .ops-answer-icon { border-width: 4px; }
    .ops-answer-divider { height: 24px; }
    .ops-answer-title { width: 100%; }
    .ops-game-shell .ops-choices-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .ops-game-shell .ops-question-expr { font-size: clamp(46px, min(14vw, 9dvh), 72px); }
    .ops-game-shell .ops-question-label { font-size: clamp(28px, 8vw, 40px); }
    .ops-settings-overlay { padding: 12px; }
    .ops-settings-panel { padding: 20px 16px; }
    .ops-settings-title { font-size: 24px; }
    .ops-game-shell .ops-submit-btn { flex-basis: 96px !important; font-size: 18px !important; }
    .ops-typing-input-shell { padding-inline: 10px; gap: 8px; }
    .ops-pencil-icon { width: 22px; }
  }
  @media (min-width: 601px) and (max-height: 800px) {
    .ops-game-shell { --object-size: clamp(24px, 5.5dvh, 44px); padding-block: 20px; }
    .ops-ref-back { width: 54px; }
    .ops-ref-reward-pill { padding: 12px 18px; }
    .ops-ref-title-block h1 { font-size: 32px; }
    .ops-ref-title-block p { font-size: 20px; }
    .ops-settings-puck { width: 48px; }
    .ops-game-shell .ops-game-board { gap: 16px; }
    .ops-game-shell .ops-question-expr { font-size: clamp(36px, 9dvh, 72px); }
    .ops-question-subtitle { font-size: 20px; }
  }
  @media (max-width: 360px) {
    .ops-ref-title-block h1 { font-size: 17px; }
    .ops-ref-reward-pill { font-size: 14px; padding: 4px; }
    .ops-ref-reward-pill svg { width: 16px; }
  }
  @media (max-height: 650px) {
    .ops-game-shell { --object-size: clamp(18px, 3.5dvh, 25px); }
    .ops-game-shell .ops-game-board { padding-block: 8px; gap: 5px; }
    .ops-game-shell .ops-question-zone { padding-block: 3px; }
    .ops-game-shell .ops-icons-container { margin-block: 4px; }
    .ops-game-shell .ops-icons-container { --object-columns: 4; --object-gap: 2px; }
    .ops-game-shell .ops-choice-btn { min-height: clamp(52px, 9dvh, 60px); padding: 6px; }
  }
  .ops-game-board:has(.ops-feedback-bar) .ops-icons-container { margin-block: 8px; }
  @media (prefers-reduced-motion: reduce) { .ops-game-shell *, .ops-game-shell *::before, .ops-game-shell *::after { animation: none !important; transition: none !important; } }
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
      <MathGameShell className="ops-game-shell math-game-screen" styles={getOpsClayStyles()}>
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
    <MathGameShell className="ops-game-shell math-game-screen" styles={getOpsClayStyles()}>

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
      <MathGameToolbar language={language} correctCount={correctCount} wrongCount={wrongCount}>
        <button type="button" className="ops-settings-puck" onClick={() => setIsSettingsOpen(true)}
          aria-label={language === 'bm' ? 'Buka tetapan permainan' : 'Open game settings'}>
          <Settings size={30} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </MathGameToolbar>
      <div className="ops-question-zone">
        <p className="ops-question-label">
          {language === 'bm'
            ? `Berapakah hasil ${({ '+': 'Tambah', '-': 'Tolak', '×': 'Darab', '÷': 'Bahagi' })[displaySymbol] || operationTitle}?`
            : `What is the result of ${({ '+': 'addition', '-': 'subtraction', '×': 'multiplication', '÷': 'division' })[displaySymbol] || operationTitle.toLowerCase()}?`}
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
          style={{ color: feedback === 'correct' ? '#46A302' : feedback === 'wrong' ? '#CC3B3B' : 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap' }}
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
      <div className="ops-progress-wrap">
        <div className="ops-progress-track" role="progressbar"
          aria-label={language === 'bm' ? 'Kemajuan soalan' : 'Question progress'}
          aria-valuemin={0} aria-valuemax={STREAK_MILESTONE} aria-valuenow={questionNumber}>
          <div className="ops-progress-fill" style={{ width: `${(questionNumber / STREAK_MILESTONE) * 100}%` }} />
        </div>
        <span className="ops-progress-count">{questionNumber}/{STREAK_MILESTONE}</span>
      </div>
      </MathGameBody>
      <HeartShopModal isOpen={isHeartShopOpen} onClose={() => setIsHeartShopOpen(false)} onPurchase={handleRewardPurchase} language={language} />
    </MathGameShell>
  );
}
