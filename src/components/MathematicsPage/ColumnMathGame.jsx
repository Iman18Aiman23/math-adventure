import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Settings, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../utils/soundManager';
import { getGameData, addCorrectAnswer, deductHeart } from '../../utils/gameStatsManager';
import useBrowserBack from '../../hooks/useBrowserBack';
import HeartShopModal from '../HeartShopModal';
import { MathGameToolbar, MathGameBody, MathGameHeader, MathGameProgress, MathGameShell } from './MathGameLayout';

const STREAK_MILESTONE = 10;

function generateProblem(difficulty, op) {
  const operation = op === 'random'
    ? ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)]
    : op;

  if (operation === '×') {
    let a, b;
    if (difficulty === 'easy') {
      a = Math.floor(Math.random() * 9) + 1;
      b = Math.floor(Math.random() * 9) + 1;
    } else if (difficulty === 'medium') {
      a = Math.floor(Math.random() * 90) + 10;
      const t = Math.floor(Math.random() * 9) + 1;
      const o = Math.floor(Math.random() * 9) + 1;
      b = t * 10 + o;
    } else {
      a = Math.floor(Math.random() * 900) + 100;
      const h = Math.floor(Math.random() * 9) + 1;
      const t = Math.floor(Math.random() * 9) + 1;
      const o = Math.floor(Math.random() * 9) + 1;
      b = h * 100 + t * 10 + o;
    }
    const prob = { num1: a, num2: b, op: '×', answer: a * b };
    if (difficulty !== 'easy') {
      prob.partial1 = a * (b % 10);
      prob.partial2 = a * (Math.floor(b / 10) % 10);
      if (b >= 100) prob.partial3 = a * Math.floor(b / 100);
      prob.hasPartials = true;
    }
    return prob;
  }

  let a, b;
  if (difficulty === 'easy') {
    a = Math.floor(Math.random() * 9) + 1;
    b = Math.floor(Math.random() * 9) + 1;
  } else if (difficulty === 'medium') {
    a = Math.floor(Math.random() * 90) + 10;
    b = Math.floor(Math.random() * 90) + 10;
  } else {
    a = Math.floor(Math.random() * 900) + 100;
    b = Math.floor(Math.random() * 900) + 100;
  }

  if (operation === '-') {
    const [big, small] = a >= b ? [a, b] : [b, a];
    return { num1: big, num2: small, op: operation, answer: big - small };
  }

  if (operation === '÷') {
    const divisor = Math.floor(Math.random() * 9) + 1;
    const min = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 10 : 100;
    const max = min * 10 - 1;
    const minQuotient = Math.ceil(min / divisor);
    const maxQuotient = Math.floor(max / divisor);
    const dividend = divisor * (minQuotient + Math.floor(Math.random() * (maxQuotient - minQuotient + 1)));
    return { num1: dividend, num2: divisor, op: '÷', answer: dividend / divisor };
  }

  return { num1: a, num2: b, op: operation, answer: a + b };
}

const CHEERS_BM = ['Bagus!', 'Cemerlang!', 'Hebat!', 'Luar Biasa!', 'Menakjubkan!', 'BINTANG!', 'JUARA!', 'PAKAR MATEMATIK!'];
const CHEERS_EN = ['Great!', 'Excellent!', 'Fantastic!', 'Amazing!', 'Incredible!', 'SUPERSTAR!', 'CHAMPION!', 'MATH WIZARD!'];

const getColumnMathStyles = () => `
  .cmg-shell {
    --game-bg: #ECFAF5;
    --surface: #FFFFFF;
    --surface-soft: #F8FCFA;
    --primary: #27B668;
    --primary-dark: #159653;
    --primary-soft: #E5F7EE;
    --navy: #082A55;
    --text-secondary: #74849A;
    --text-muted: #9AA7B7;
    --border: #DCE7E3;
    --digit-border: #B7BDC4;
    --correct: #27B668;
    --wrong: #FF3D45;
    --multiply: #C96AF0;
    --subtract: #FF4D55;
    --reward: #FFBE18;
    --progress-track: #E5EBE8;
    --active-digit: #1DADEB;
    --digit-size: clamp(52px, min(11vw, 8vh), 82px);
    --math-font: clamp(44px, min(10vw, 7.4vh), 82px);
    width: 100% !important;
    height: 100dvh !important;
    min-height: 100dvh !important;
    max-width: 100vw !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    background: linear-gradient(180deg, #ECFAF5 0%, #F7FCF9 100%) !important;
    color: var(--navy);
    font-family: "Nunito", "Poppins", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    box-sizing: border-box;
  }

  .cmg-shell *,
  .cmg-shell *::before,
  .cmg-shell *::after {
    box-sizing: border-box;
  }

  .cmg-ref-header {
    width: min(100%, 1100px);
    margin-inline: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(8px, 2vw, 18px);
    padding: max(clamp(6px, 1vh, 14px), env(safe-area-inset-top)) clamp(12px, 3vw, 28px) clamp(6px, 1vh, 12px);
    flex-shrink: 0;
    min-width: 0;
  }

  .cmg-ref-header-left,
  .cmg-ref-rewards {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .cmg-ref-header-left {
    gap: clamp(8px, 2vw, 14px);
    flex: 1 1 auto;
  }

  .cmg-ref-back {
    width: clamp(44px, 10vw, 62px);
    height: clamp(44px, 10vw, 62px);
    border-radius: 50%;
    background: #FFFFFF;
    border: 1px solid #E1ECE7;
    color: var(--navy);
    box-shadow: 0 3px 10px rgba(31, 78, 60, 0.08);
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    cursor: pointer;
  }

  .cmg-ref-subject-icon {
    width: clamp(44px, 10vw, 62px);
    height: clamp(44px, 10vw, 62px);
    border-radius: clamp(12px, 3vw, 18px);
    background: linear-gradient(180deg, #35C878, #18A85C);
    color: #FFFFFF;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
  }

  .cmg-ref-title-block {
    min-width: 0;
  }

  .cmg-ref-title-block h1 {
    margin: 0;
    color: var(--navy);
    font-size: clamp(19px, 4vw, 30px);
    font-weight: 800;
    line-height: 1.05;
    white-space: nowrap;
  }

  .cmg-ref-title-block p {
    margin: 0;
    color: var(--text-secondary);
    font-size: clamp(13px, 2.8vw, 19px);
    font-weight: 600;
    line-height: 1.15;
    white-space: nowrap;
  }

  .cmg-ref-rewards {
    gap: clamp(6px, 1.3vw, 14px);
    flex: 0 0 auto;
    white-space: nowrap;
  }

  .cmg-ref-reward-pill {
    display: flex;
    align-items: center;
    gap: clamp(4px, 1vw, 8px);
    padding: clamp(6px, 1vw, 10px) clamp(8px, 2vw, 14px);
    background: #FFFFFF;
    border: 1px solid #E5EEEA;
    border-radius: 999px;
    box-shadow: 0 2px 8px rgba(31, 78, 60, 0.07);
    color: var(--navy);
    font-size: clamp(16px, 3vw, 24px);
    font-weight: 900;
    line-height: 1;
    cursor: pointer;
  }

  .cmg-ref-reward-icon.is-star { color: #FFBE18; }
  .cmg-ref-reward-icon.is-heart { color: #FF4D55; }
  .cmg-ref-reward-icon.is-gem { color: #2BBDF7; }

  .cmg-main {
    width: min(100%, 1100px) !important;
    height: 100% !important;
    min-height: 0 !important;
    flex: 1 1 auto !important;
    margin-inline: auto !important;
    padding: 0 clamp(12px, 3vw, 28px) max(clamp(6px, 1vh, 14px), env(safe-area-inset-bottom)) !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
    gap: clamp(8px, 1.3vh, 16px) !important;
    overflow: hidden !important;
  }

  .cmg-settings-strip {
    display: none !important;
  }

  .cmg-shell > .ops-footer-stats {
    display: none !important;
  }

  .cmg-card {
    position: relative !important;
    flex: 1 1 auto !important;
    min-height: 0 !important;
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
    margin: 0 !important;
    padding: clamp(14px, 2.5vh, 28px) clamp(16px, 4vw, 40px) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: rgba(255, 255, 255, 0.97) !important;
    border: 1px solid rgba(216, 233, 226, 0.95) !important;
    border-radius: clamp(24px, 5vw, 36px) !important;
    box-shadow: 0 6px 20px rgba(31, 78, 60, 0.08) !important;
    overflow: hidden !important;
  }

  .cmg-card.is-multiply::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: clamp(5px, 0.8vh, 9px);
    background: #D174EF;
    z-index: 1;
  }

  .cmg-card > div:first-child {
    display: none !important;
  }

  .cmg-question-counter {
    position: absolute;
    top: clamp(16px, 2.5vh, 28px);
    left: clamp(16px, 4vw, 32px);
    padding: clamp(7px, 1vh, 11px) clamp(14px, 3vw, 20px);
    border-radius: 999px;
    background: #E5F7EE;
    color: #108253;
    font-size: clamp(14px, 3vw, 20px);
    font-weight: 800;
    line-height: 1.2;
    z-index: 3;
  }

  .cmg-card-settings,
  .cmg-card-info {
    position: absolute !important;
    display: grid !important;
    place-items: center !important;
    border-radius: 50% !important;
    cursor: pointer !important;
    z-index: 4 !important;
  }

  .cmg-card-settings {
    top: clamp(16px, 2.5vh, 28px) !important;
    right: clamp(16px, 3vw, 28px) !important;
    width: clamp(42px, 9vw, 58px) !important;
    height: clamp(42px, 9vw, 58px) !important;
    background: #FFFFFF !important;
    border: 1px solid #DDEAE5 !important;
    color: var(--navy) !important;
    box-shadow: 0 3px 10px rgba(31, 78, 60, 0.09) !important;
  }

  .cmg-card-info {
    top: clamp(82px, 11vh, 112px) !important;
    right: clamp(18px, 3vw, 30px) !important;
    width: clamp(40px, 8vw, 54px) !important;
    height: clamp(40px, 8vw, 54px) !important;
    background: transparent !important;
    border: 3px solid #FF3D45 !important;
    color: #FF3D45 !important;
    box-shadow: none !important;
    font-size: clamp(28px, 6vw, 44px) !important;
  }

  .cmg-work-area {
    --line-color: #082A55;
    width: max-content !important;
    max-width: none !important;
    flex-shrink: 0;
    margin: 0 auto !important;
    padding-top: clamp(48px, 7vh, 82px) !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: stretch !important;
    justify-content: center !important;
    gap: clamp(6px, 1.3vh, 14px) !important;
    transform-origin: center;
  }

  .cmg-work-viewport {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cmg-work-viewport .cmg-work-area {
    padding-top: 0 !important;
  }

  .cmg-work-area:not(.is-division) div[style*="border-top"] {
    border-top-color: var(--line-color) !important;
    border-top-width: clamp(4px, 0.6vh, 6px) !important;
    border-radius: 999px !important;
  }

  .cmg-work-area:not(.is-division) input[type="text"]:not(.cmg-carry-field) {
    border: clamp(3px, 0.7vw, 5px) solid var(--digit-border) !important;
    border-radius: clamp(14px, 3vw, 20px) !important;
    background: #FFFFFF !important;
    color: var(--navy) !important;
    font-size: clamp(34px, min(8vw, 5.8vh), 58px) !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    font-family: inherit !important;
    text-align: center !important;
    box-shadow: none !important;
  }

  .cmg-work-area:not(.is-division) input[type="text"]:focus {
    border-color: var(--active-digit) !important;
    background: #F5FCFF !important;
    box-shadow: 0 0 0 2px rgba(29, 173, 235, 0.08) !important;
    transform: none !important;
  }

  .cmg-work-area .cmg-carry-field {
    padding: 0;
    border-radius: 6px;
    line-height: normal;
    flex-shrink: 0;
  }

  .cmg-work-area span,
  .cmg-work-area div {
    font-family: inherit !important;
  }

  .cmg-action-area {
    flex: 0 0 auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    gap: clamp(8px, 1.2vh, 14px) !important;
  }

  .cmg-action-area .cmg-btn {
    width: min(100%, 650px) !important;
    height: clamp(58px, 8vh, 78px) !important;
    padding: 0 clamp(18px, 4vw, 32px) !important;
    margin: 0 auto !important;
    border: 0 !important;
    border-radius: clamp(20px, 4vw, 30px) !important;
    background: linear-gradient(180deg, #35C875, #20AD61) !important;
    color: #FFFFFF !important;
    font-size: clamp(20px, 4.5vw, 30px) !important;
    font-weight: 800 !important;
    letter-spacing: 0 !important;
    text-transform: none !important;
    box-shadow: 0 5px 0 #158F4D !important;
  }

  .cmg-action-area .cmg-btn:disabled {
    background: #E2E5E7 !important;
    color: #9CA4AC !important;
    box-shadow: 0 4px 0 #C3C8CC !important;
    opacity: 1 !important;
  }

  .cmg-settings-overlay {
    position: fixed;
    inset: 0;
    z-index: 180;
    display: grid;
    place-items: center;
    padding: clamp(14px, 3vw, 28px);
    background: rgba(236, 250, 245, 0.72);
    backdrop-filter: blur(14px);
  }

  .cmg-settings-modal {
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

  .cmg-settings-modal-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: clamp(18px, 3vh, 24px);
  }

  .cmg-settings-modal h2 {
    margin: 0;
    color: var(--navy);
    font-size: clamp(28px, 4vw, 36px);
    font-weight: 900;
    line-height: 1.02;
  }

  .cmg-settings-subtitle,
  .cmg-settings-help {
    margin: 0;
    color: var(--text-secondary);
    font-weight: 700;
    line-height: 1.25;
  }

  .cmg-settings-subtitle {
    margin-top: 4px;
    font-size: clamp(14px, 2.1vw, 17px);
  }

  .cmg-settings-help {
    font-size: clamp(12px, 1.7vw, 15px);
  }

  .cmg-settings-close {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #DDEBE5;
    background: #FFFFFF;
    color: var(--navy);
    display: grid;
    place-items: center;
    cursor: pointer;
    flex-shrink: 0;
    box-shadow: 0 6px 14px rgba(31, 78, 60, 0.06);
  }

  .cmg-settings-group {
    display: grid;
    gap: 10px;
    margin-top: clamp(16px, 2.8vh, 24px);
  }

  .cmg-settings-label {
    color: var(--navy);
    font-size: clamp(18px, 2.7vw, 22px);
    font-weight: 900;
    letter-spacing: 0;
    line-height: 1.05;
  }

  .cmg-settings-section-head {
    display: grid;
    gap: 3px;
  }

  .cmg-settings-options {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(8px, 1.4vw, 12px);
  }

  .cmg-settings-option {
    min-height: clamp(42px, 6.2vh, 54px);
    padding: 9px clamp(14px, 2.5vw, 24px);
    border-radius: 15px;
    border: 1px solid #DDEBE5;
    background: #F8FCFA;
    color: var(--navy);
    font-size: clamp(14px, 1.8vw, 16px);
    font-weight: 900;
    cursor: pointer;
    box-shadow: 0 2px 0 rgba(221, 235, 229, 0.8);
    transition: transform 120ms ease, background-color 120ms ease, border-color 120ms ease, box-shadow 120ms ease;
  }

  .cmg-settings-option.is-active {
    background: var(--primary);
    border-color: var(--primary);
    color: #FFFFFF;
    box-shadow: 0 4px 10px rgba(35, 183, 107, 0.18);
  }

  .cmg-settings-option:active {
    transform: translateY(1px);
  }

  .cmg-settings-footer {
    display: grid;
    grid-template-columns: minmax(116px, 0.34fr) minmax(180px, 1fr);
    gap: clamp(12px, 2vw, 18px);
    margin-top: clamp(18px, 3vh, 28px);
    padding-top: clamp(14px, 2vh, 18px);
    border-top: 1px solid #DDEBE5;
  }

  .cmg-settings-cancel,
  .cmg-settings-start {
    min-height: clamp(46px, 6.8vh, 56px);
    border-radius: 16px;
    font-size: clamp(14px, 1.8vw, 17px);
    font-weight: 900;
  }

  .cmg-settings-cancel {
    border: 0;
    background: #F3F7F6;
    color: var(--text-secondary);
    cursor: pointer;
  }

  .cmg-settings-start {
    width: 100%;
    margin-top: 0;
    border: 0;
    justify-self: end;
  }

  @media (max-width: 600px) {
    .cmg-settings-overlay {
      padding: 12px;
    }

    .cmg-settings-modal {
      width: min(100%, calc(100vw - 24px));
      padding: 18px;
    }

    .cmg-settings-modal h2 {
      font-size: 26px;
    }

    .cmg-settings-close {
      width: 42px;
      height: 42px;
    }

    .cmg-settings-footer {
      grid-template-columns: 1fr;
    }
  }

  @media (max-height: 700px) {
    .cmg-shell {
      --digit-size: clamp(46px, min(10vw, 7vh), 68px);
      --math-font: clamp(38px, min(9vw, 6.5vh), 66px);
    }

    .cmg-ref-header {
      padding-block: 4px;
    }

    .cmg-card {
      padding-block: 12px !important;
    }

    .cmg-work-area {
      padding-top: 42px !important;
      gap: 6px !important;
    }

    .cmg-action-area .cmg-btn {
      height: 54px !important;
    }

  }

  @media (max-height: 600px) {
    .cmg-shell {
      --digit-size: clamp(40px, min(9vw, 6.2vh), 58px);
      --math-font: clamp(34px, min(8vw, 5.8vh), 56px);
    }

    .cmg-main {
      gap: 5px !important;
    }

    .cmg-card {
      padding-block: 8px !important;
    }

    .cmg-work-area {
      padding-top: 36px !important;
      gap: 4px !important;
    }

    .cmg-action-area .cmg-btn {
      height: 48px !important;
    }

  }

  @media (max-width: 720px) {
    .cmg-ref-rewards {
      gap: 5px;
    }

    .cmg-ref-reward-pill {
      padding-inline: 8px;
    }

    .cmg-ref-title-block h1 {
      max-width: 30vw;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  @media (max-width: 430px) {
    .cmg-ref-subject-icon {
      display: none;
    }

    .cmg-ref-reward-pill svg {
      width: 22px;
      height: 22px;
    }

    .cmg-ref-reward-pill {
      font-size: 16px;
      padding-inline: 7px;
      gap: 3px;
    }
  }
`;

// Keep this component identity stable so division inputs retain their DOM nodes
// (and focus) when typing or moving between columns.
function DigitRow({ children }) {
  return <div style={{ display: 'flex', gap: 0 }}>{children}</div>;
}

function StreakPopup({ streak, language, onClose }) {
  const bm = language === 'bm';
  const cheers = bm ? CHEERS_BM : CHEERS_EN;
  const cheer = cheers[Math.min(Math.floor(streak / STREAK_MILESTONE) - 1, cheers.length - 1)];
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '24px', padding: '2.5rem 2rem', textAlign: 'center', maxWidth: '300px', width: '90%', border: '4px solid #FFC800', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ fontSize: '4rem' }}>🎉</div>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#FFC800', lineHeight: 1 }}>{streak}</div>
        <div style={{ fontWeight: 700, color: '#777', marginBottom: '0.5rem' }}>{bm ? 'jawapan betul berturut-turut!' : 'correct answers in a row!'}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FF9600', marginBottom: '1.5rem' }}>{cheer}</div>
        <button onClick={onClose} style={{ background: '#58CC02', color: '#fff', fontWeight: 900, fontSize: '1rem', padding: '0.75rem 2rem', borderRadius: '12px', border: 'none', borderBottom: '4px solid #46A302', cursor: 'pointer' }}>
          {bm ? 'Terus! 🚀' : 'Keep Going! 🚀'}
        </button>
      </div>
    </div>
  );
}

function buildAdditionTutorial(num1, num2, bm) {
  const a = String(num1);
  const b = String(num2);
  const maxLen = Math.max(a.length, b.length);
  const p1 = a.padStart(maxLen, '0');
  const p2 = b.padStart(maxLen, '0');
  const answer = num1 + num2;
  const places = bm
    ? ['unit', 'puluh', 'ratus', 'ribu', 'puluh ribu', 'ratus ribu']
    : ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'];

  const lines = [];
  let carry = 0;
  for (let i = maxLen - 1; i >= 0; i--) {
    const d1 = parseInt(p1[i], 10);
    const d2 = parseInt(p2[i], 10);
    const place = places[maxLen - 1 - i];
    const sum = d1 + d2 + carry;
    const ones = sum % 10;
    const newCarry = Math.floor(sum / 10);
    const eq = carry > 0 ? `${d1} + ${d2} + ${carry} = ${sum}` : `${d1} + ${d2} = ${sum}`;
    let outcome;
    if (i === 0 && newCarry > 0) {
      outcome = bm ? `tulis ${sum}` : `write ${sum}`;
    } else if (newCarry > 0) {
      outcome = bm ? `tulis ${ones}, bawa ke rumah sebelah ${newCarry}` : `write ${ones}, carry ${newCarry}`;
    } else {
      outcome = bm ? `tulis ${ones}` : `write ${ones}`;
    }
    lines.push(`${bm ? 'Lajur' : 'Column'} ${place}: ${eq} → ${outcome}.`);
    carry = newCarry;
  }

  return {
    title: bm ? `Cara Selesaikan ${num1} + ${num2}` : `How to Solve ${num1} + ${num2}`,
    steps: [
      {
        title: bm ? 'Langkah 1: Susun Nombor' : 'Step 1: Line Up the Numbers',
        lines: [bm
          ? `Letakkan ${num1} di atas dan ${num2} di bawah. Selaraskan digit mengikut nilai tempat (unit, puluh, ratus...).`
          : `Place ${num1} on top and ${num2} below. Line up the digits by place value (ones, tens, hundreds...).`
        ]
      },
      {
        title: bm ? 'Langkah 2: Tambah Setiap Lajur (Kanan ke Kiri)' : 'Step 2: Add Each Column (Right to Left)',
        lines
      },
      {
        title: bm ? 'Langkah 3: Jawapan Akhir' : 'Step 3: Final Answer',
        lines: [`${num1} + ${num2} = ${answer}`]
      }
    ]
  };
}

function buildSubtractionTutorial(num1, num2, bm) {
  const big = Math.max(num1, num2);
  const small = Math.min(num1, num2);
  const a = String(big);
  const b = String(small);
  const maxLen = a.length;
  const p1 = a.padStart(maxLen, '0').split('').map(Number);
  const p2 = b.padStart(maxLen, '0').split('').map(Number);
  const answer = big - small;
  const places = bm
    ? ['unit', 'puluh', 'ratus', 'ribu', 'puluh ribu', 'ratus ribu']
    : ['ones', 'tens', 'hundreds', 'thousands', 'ten thousands', 'hundred thousands'];

  const lines = [];
  for (let i = maxLen - 1; i >= 0; i--) {
    const place = places[maxLen - 1 - i];
    if (p1[i] < p2[i]) {
      const leftPlace = places[maxLen - i];
      lines.push(bm
        ? `Lajur ${place}: ${p1[i]} terlalu kecil untuk tolak ${p2[i]}. Pinjam 1 daripada lajur ${leftPlace}: ${p1[i - 1]} → ${p1[i - 1] - 1}, dan ${p1[i]} → ${p1[i] + 10}.`
        : `Column ${place}: ${p1[i]} is too small to subtract ${p2[i]}. Borrow 1 from the ${leftPlace} column: ${p1[i - 1]} becomes ${p1[i - 1] - 1}, and ${p1[i]} becomes ${p1[i] + 10}.`
      );
      p1[i - 1] -= 1;
      p1[i] += 10;
    }
    const result = p1[i] - p2[i];
    lines.push(`${bm ? 'Lajur' : 'Column'} ${place}: ${p1[i]} - ${p2[i]} = ${result}.`);
  }

  return {
    title: bm ? `Cara Selesaikan ${big} - ${small}` : `How to Solve ${big} - ${small}`,
    steps: [
      {
        title: bm ? 'Langkah 1: Susun Nombor' : 'Step 1: Line Up the Numbers',
        lines: [bm
          ? `Letakkan ${big} di atas dan ${small} di bawah, selaraskan digit mengikut nilai tempat.`
          : `Place ${big} on top and ${small} below, lining up digits by place value.`
        ]
      },
      {
        title: bm ? 'Langkah 2: Tolak Setiap Lajur (Kanan ke Kiri)' : 'Step 2: Subtract Each Column (Right to Left)',
        lines
      },
      {
        title: bm ? 'Langkah 3: Jawapan Akhir' : 'Step 3: Final Answer',
        lines: [`${big} - ${small} = ${answer}`]
      }
    ]
  };
}

function buildMultiplyByDigit(topStr, multiplier, bm) {
  const lines = [];
  let carry = 0;
  let resultDigits = [];
  for (let i = topStr.length - 1; i >= 0; i--) {
    const d = parseInt(topStr[i], 10);
    const product = d * multiplier + carry;
    const ones = product % 10;
    const newCarry = Math.floor(product / 10);
    const eq = carry > 0 ? `${multiplier} × ${d} + ${carry} = ${product}` : `${multiplier} × ${d} = ${product}`;
    let outcome;
    if (i === 0 && newCarry > 0) {
      outcome = bm ? `tulis ${product}` : `write ${product}`;
      resultDigits.unshift(String(product));
    } else if (newCarry > 0) {
      outcome = bm ? `tulis ${ones}, bawa ke rumah sebelah ${newCarry}` : `write ${ones}, carry ${newCarry}`;
      resultDigits.unshift(String(ones));
    } else {
      outcome = bm ? `tulis ${ones}` : `write ${ones}`;
      resultDigits.unshift(String(ones));
    }
    lines.push(`${eq} → ${outcome}.`);
    carry = newCarry;
  }
  return { lines, result: resultDigits.join('') };
}

function buildMultiplicationTutorial(num1, num2, bm) {
  const num1Str = String(num1);
  const onesDigit = num2 % 10;
  const tensDigit = Math.floor(num2 / 10);
  const hundredsDigit = Math.floor(num2 / 100);
  const answer = num1 * num2;

  const steps = [];
  steps.push({
    title: bm ? 'Langkah 1: Susun Nombor' : 'Step 1: Line Up the Numbers',
    lines: [bm
      ? `Letakkan ${num1} di atas dan ${num2} di bawah. Lukis garis di bawah.`
      : `Place ${num1} on top and ${num2} below. Draw a line underneath.`
    ]
  });

  // Step: multiply by ones
  const onesPart = buildMultiplyByDigit(num1Str, onesDigit, bm);
  steps.push({
    title: bm
      ? `Langkah 2: Darab dengan Tempat Unit (${num1} × ${onesDigit})`
      : `Step 2: Multiply by the "Ones" place (${num1} × ${onesDigit})`,
    lines: onesPart.lines,
    result: bm ? `Hasil baris pertama: ${onesPart.result}` : `Result of first line: ${onesPart.result}`
  });

  // Step: multiply by tens (if applicable)
  if (tensDigit > 0) {
    const tensPart = buildMultiplyByDigit(num1Str, tensDigit, bm);
    const tensLines = [
      bm
        ? `Penanda Tempat: Kerana ${tensDigit} berada di tempat puluh, kita letakkan 0 di lajur unit dahulu.`
        : `The Placeholder: Since ${tensDigit} is in the tens place, we put a 0 in the ones column before we start.`,
      ...tensPart.lines
    ];
    steps.push({
      title: bm
        ? `Langkah 3: Darab dengan Tempat Puluh (${num1} × ${tensDigit}0)`
        : `Step 3: Multiply by the "Tens" place (${num1} × ${tensDigit}0)`,
      lines: tensLines,
      result: bm ? `Hasil baris kedua: ${tensPart.result}0` : `Result of second line: ${tensPart.result}0`
    });

    if (hundredsDigit > 0) {
      const hundredsPart = buildMultiplyByDigit(num1Str, hundredsDigit, bm);
      const hLines = [
        bm
          ? `Penanda Tempat: Kerana ${hundredsDigit} berada di tempat ratus, letakkan 00 di sebelah kanan.`
          : `The Placeholder: Since ${hundredsDigit} is in the hundreds place, put 00 on the right.`,
        ...hundredsPart.lines
      ];
      steps.push({
        title: bm
          ? `Langkah 4: Darab dengan Tempat Ratus (${num1} × ${hundredsDigit}00)`
          : `Step 4: Multiply by the "Hundreds" place (${num1} × ${hundredsDigit}00)`,
        lines: hLines,
        result: bm ? `Hasil baris ketiga: ${hundredsPart.result}00` : `Result of third line: ${hundredsPart.result}00`
      });
    }

    steps.push({
      title: bm ? 'Langkah Akhir: Tambahkan Hasil-Hasil Separa' : 'Final Step: Add the Partial Products',
      lines: [bm
        ? `Tambahkan semua hasil separa untuk mendapatkan jawapan akhir.`
        : `Add the partial products together for the final answer.`
      ],
      result: `${num1} × ${num2} = ${answer}`
    });
  } else {
    steps.push({
      title: bm ? 'Jawapan Akhir' : 'Final Answer',
      lines: [`${num1} × ${num2} = ${answer}`]
    });
  }

  return {
    title: bm ? `Cara Selesaikan ${num1} × ${num2}` : `How to Solve ${num1} × ${num2}`,
    steps
  };
}

function buildDivisionTutorial(num1, num2, bm) {
  const dividend = num1;
  const divisor = num2;
  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;

  const steps = [];
  steps.push({
    title: bm ? 'Langkah 1: Susun Nombor' : 'Step 1: Line Up the Numbers',
    lines: [bm
      ? `Letakkan ${dividend} (dividen) di dalam kurungan dan ${divisor} (pembahagi) di luar.`
      : `Place ${dividend} (dividend) inside the bracket and ${divisor} (divisor) outside.`
    ]
  });

  steps.push({
    title: bm ? 'Langkah 2: Bahagi (D)' : 'Step 2: Divide (D)',
    lines: [bm
      ? `Tanya: "Berapa kali ${divisor} boleh masuk ke dalam ${dividend}?" Jawapan: ${quotient} kali.`
      : `Ask: "How many times does ${divisor} go into ${dividend}?" Answer: ${quotient} times.`
    ],
    result: bm ? `Hasil bahagi: ${quotient}` : `Quotient: ${quotient}`
  });

  steps.push({
    title: bm ? 'Langkah 3: Darab (M)' : 'Step 3: Multiply (M)',
    lines: [bm
      ? `Darabkan hasil bahagi (${quotient}) dengan pembahagi (${divisor}): ${quotient} × ${divisor} = ${quotient * divisor}`
      : `Multiply the quotient (${quotient}) by the divisor (${divisor}): ${quotient} × ${divisor} = ${quotient * divisor}`
    ]
  });

  steps.push({
    title: bm ? 'Langkah 4: Tolak (S)' : 'Step 4: Subtract (S)',
    lines: [bm
      ? `Tolak hasil darab dari dividen: ${dividend} - ${quotient * divisor} = ${remainder}`
      : `Subtract the product from the dividend: ${dividend} - ${quotient * divisor} = ${remainder}`
    ],
    result: bm ? `Baki: ${remainder}` : `Remainder: ${remainder}`
  });

  if (remainder === 0) {
    steps.push({
      title: bm ? 'Jawapan Akhir' : 'Final Answer',
      lines: [bm
        ? `Tiada baki. Jawapannya ialah ${quotient}.`
        : `No remainder. The answer is ${quotient}.`
      ],
      result: `${dividend} ÷ ${divisor} = ${quotient}`
    });
  } else {
    steps.push({
      title: bm ? 'Jawapan Akhir' : 'Final Answer',
      lines: [bm
        ? `Jawapannya ialah ${quotient} dengan baki ${remainder}.`
        : `The answer is ${quotient} with a remainder of ${remainder}.`
      ],
      result: `${dividend} ÷ ${divisor} = ${quotient} R${remainder}`
    });
  }

  return {
    title: bm ? `Cara Selesaikan ${dividend} ÷ ${divisor}` : `How to Solve ${dividend} ÷ ${divisor}`,
    steps
  };
}

function TutorialModal({ operation, language, onClose, num1, num2 }) {
  const bm = language === 'bm';
  const isDesktop = typeof window !== 'undefined' ? window.innerWidth >= 768 : true;

  const getTutorialContent = () => {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      return { title: bm ? 'Maklumat' : 'Information', steps: [] };
    }
    if (operation === '+') return buildAdditionTutorial(num1, num2, bm);
    if (operation === '-') return buildSubtractionTutorial(num1, num2, bm);
    if (operation === '×') return buildMultiplicationTutorial(num1, num2, bm);
    if (operation === '÷') return buildDivisionTutorial(num1, num2, bm);
    return { title: bm ? 'Maklumat' : 'Information', steps: [] };
  };

  const content = getTutorialContent();

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '24px', padding: '2rem', maxWidth: isDesktop ? '600px' : '100%', width: '100%', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#3C3C3C' }}>{content.title}</h2>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}
          >
            ✕
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {content.steps.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
              <div style={{
                minWidth: '32px', width: '32px', height: '32px',
                borderRadius: '50%',
                background: '#FFE6F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, color: '#FF4B4B', fontSize: '0.9rem', flexShrink: 0
              }}>
                {idx + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#3C3C3C', marginBottom: '0.4rem' }}>
                  {step.title}
                </div>
                {step.lines && step.lines.map((ln, k) => (
                  <div key={k} style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.5, marginBottom: '0.25rem', paddingLeft: '0.25rem' }}>
                    • {ln}
                  </div>
                ))}
                {step.result && (
                  <div style={{ marginTop: '0.4rem', fontSize: '0.9rem', fontWeight: 800, color: '#58CC02', background: '#EFFFEA', padding: '0.4rem 0.6rem', borderRadius: '8px', display: 'inline-block' }}>
                    {step.result}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            marginTop: '2rem', width: '100%',
            background: '#58CC02', color: '#fff', fontWeight: 900, fontSize: '1rem',
            padding: '0.75rem 2rem', borderRadius: '12px', border: 'none',
            borderBottom: '4px solid #46A302', cursor: 'pointer'
          }}
        >
          {bm ? 'Tutup' : 'Close'}
        </button>
      </div>
    </div>
  );
}

function useIsDesktop(bp = 768) {
  const [isDesk, setIsDesk] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= bp : false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(`(min-width: ${bp}px)`);
    const h = (e) => setIsDesk(e.matches);
    mql.addEventListener('change', h);
    return () => mql.removeEventListener('change', h);
  }, [bp]);
  return isDesk;
}

function computeDisplayInfo(prob, maxLen) {
  const d1 = String(prob.num1).padStart(maxLen, '0').split('').map(Number);
  const d2 = String(prob.num2).padStart(maxLen, '0').split('').map(Number);
  const topRow    = new Array(maxLen).fill(null);
  const struckRow = new Array(maxLen).fill(false);

  if (prob.op === '+') {
    let carry = 0;
    for (let r = 0; r < maxLen; r++) {
      const dc = maxLen - 1 - r;
      const sum = d1[dc] + d2[dc] + carry;
      carry = Math.floor(sum / 10);
      if (carry > 0 && dc > 0) topRow[dc - 1] = carry;
    }
  } else if (prob.op === '-') {
    const eff = [...d1];
    for (let r = 0; r < maxLen; r++) {
      const dc = maxLen - 1 - r;
      if (eff[dc] < d2[dc] && dc > 0) {
        eff[dc] += 10;
        eff[dc - 1] -= 1;
        struckRow[dc - 1] = true;
      }
    }
    for (let dc = 0; dc < maxLen; dc++) {
      if (struckRow[dc]) topRow[dc] = eff[dc];
    }
  }

  return { topRow, struckRow };
}

function computeMultiplicationInfo(prob, maxLen) {
  const p1Carries = new Array(maxLen).fill(null);
  const p2Carries = new Array(maxLen).fill(null);
  const addCarries = new Array(maxLen).fill(null);

  if (!prob || prob.op !== '×' || !prob.hasPartials) return { p1Carries, p2Carries, addCarries };

  const s1 = String(prob.num1);
  const m1 = prob.num2 % 10;
  const m2 = Math.floor(prob.num2 / 10) % 10;
  
  let c = 0;
  for (let i = s1.length - 1; i >= 0; i--) {
    const d = parseInt(s1[i], 10);
    const prod = d * m1 + c;
    c = Math.floor(prod / 10);
    const colIdx = maxLen - s1.length + i;
    if (c > 0 && i > 0) p1Carries[colIdx - 1] = c;
  }

  c = 0;
  for (let i = s1.length - 1; i >= 0; i--) {
    const d = parseInt(s1[i], 10);
    const prod = d * m2 + c;
    c = Math.floor(prod / 10);
    const colIdx = maxLen - s1.length + i;
    if (c > 0 && i > 0) p2Carries[colIdx - 1] = c;
  }

  const pp1 = String(prob.partial1).padStart(maxLen, '0').split('').map(Number);
  const pp2 = (String(prob.partial2) + '0').padStart(maxLen, '0').split('').map(Number);
  const pp3 = String((prob.partial3 ?? 0) * 100).padStart(maxLen, '0').split('').map(Number);
  let ac = 0;
  for (let r = 0; r < maxLen; r++) {
    const dc = maxLen - 1 - r;
    const sum = pp1[dc] + pp2[dc] + pp3[dc] + ac;
    ac = Math.floor(sum / 10);
    if (ac > 0 && dc > 0) addCarries[dc - 1] = ac;
  }

  return { p1Carries, p2Carries, addCarries };
}

export default function ColumnMathGame({ onBack, language }) {
  const bm = language === 'bm';
  const isDesktop = useIsDesktop();
  const handleBack = useBrowserBack(onBack);

  // Responsive sizing — compact on desktop to fit without scrolling
  const CELL_W   = isDesktop ? 88 : 64;
  const OP_W     = isDesktop ? 70 : 48;
  const DIGIT_FS = isDesktop ? '4.6rem' : '3rem';
  const ANS_FS   = isDesktop ? '3.2rem' : '2.35rem';
  const ANS_H    = isDesktop ? '4.9rem' : '3.7rem';
  const TOP_W1   = '40px';
  const TOP_W2   = '48px';
  const TOP_H    = '38px';
  const TOP_FS   = '24px';

  const [difficulty,      setDifficulty]      = useState('easy');
  const [op,              setOp]              = useState('random');
  const [problem,         setProblem]         = useState(null);
  const [inputDigits,     setInputDigits]     = useState([]);
  const [activeIdx,       setActiveIdx]       = useState(0);
  const [topRowInputs,    setTopRowInputs]    = useState([]);
  const [activeSection,   setActiveSection]   = useState('answer');
  const [activeTopIdx,    setActiveTopIdx]    = useState(0);
  const [status,          setStatus]          = useState('playing');
  const [score,           setScore]           = useState(0);
  const [streak,          setStreak]          = useState(() => getGameData().streak);
  const [totalAnswered,   setTotalAnswered]   = useState(0);
  const [wrongCount,      setWrongCount]      = useState(0);
  const [showStreak,      setShowStreak]      = useState(false);
  const [userStruckRow,    setUserStruckRow]    = useState([]);
  const [userBorrowedTo,   setUserBorrowedTo]   = useState([]);
  const [confirmBorrowIdx, setConfirmBorrowIdx] = useState(null);
  const [borrowAnswerInput, setBorrowAnswerInput] = useState('');
  const [borrowSubmitAttempted, setBorrowSubmitAttempted] = useState(false);
  const [lockMessage,      setLockMessage]      = useState('');
  const [partial1Inputs,       setPartial1Inputs]       = useState([]);
  const [partial2Inputs,       setPartial2Inputs]       = useState([]);
  const [partial3Inputs,       setPartial3Inputs]       = useState([]);
  const [partial3CarryInputs,  setPartial3CarryInputs]  = useState([]);
  const [activePartial3Idx,    setActivePartial3Idx]    = useState(0);
  const [partial1CarryInputs,  setPartial1CarryInputs]  = useState([]);
  const [partial2CarryInputs,  setPartial2CarryInputs]  = useState([]);
  const [activePartial1Idx,    setActivePartial1Idx]    = useState(0);
  const [activePartial2Idx,    setActivePartial2Idx]    = useState(0);
  const [activePartial1CarryIdx, setActivePartial1CarryIdx] = useState(0);
  const [activePartial2CarryIdx, setActivePartial2CarryIdx] = useState(0);
  const [showTutorial,         setShowTutorial]         = useState(false);
  const [isSettingsOpen,       setIsSettingsOpen]       = useState(false);
  const [isHeartShopOpen,      setIsHeartShopOpen]      = useState(false);
  const [partial1Submitted,    setPartial1Submitted]    = useState(new Set());
  const [partial2Submitted,    setPartial2Submitted]    = useState(new Set());
  const [answerSubmitted,      setAnswerSubmitted]      = useState(new Set());
  const [hearts,               setHearts]               = useState(() => getGameData().hearts);
  const [gems,                 setGems]                 = useState(() => getGameData().gems);
  const [stars,                setStars]                = useState(() => getGameData().stars);

  const inputRefs            = useRef([]);
  const topRowRefs           = useRef([]);
  const partial1Refs         = useRef([]);
  const partial2Refs         = useRef([]);
  const partial3Refs         = useRef([]);
  const cardRef              = useRef(null);
  const workRef              = useRef(null);
  const partial1CarryRefs    = useRef([]);
  const partial2CarryRefs    = useRef([]);
  const submitBtnRef         = useRef(null);
  const feedbackTimer        = useRef(null);

  const needsBorrowAt = (i) => {
    if (!problem || problem.op !== '-') return false;
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    const sp1 = String(problem.num1).padStart(ml, ' ');
    const sp2 = String(problem.num2).padStart(ml, ' ');
    const ch1 = sp1[i];
    const ch2 = sp2[i];
    if (ch1 === ' ' && ch2 === ' ') return false;
    const t = ch1 === ' ' ? 0 : parseInt(ch1, 10);
    const b = ch2 === ' ' ? 0 : parseInt(ch2, 10);
    let eff = t;
    if (userBorrowedTo[i]) eff += 10;
    if (userStruckRow[i] && !userBorrowedTo[i]) eff -= 1;
    return eff < b;
  };

  const triggerLockMessage = (i) => {
    if (!problem) return;
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    const sp1 = String(problem.num1).padStart(ml, ' ');
    const sp2 = String(problem.num2).padStart(ml, ' ');
    const tDigit = sp1[i] === ' ' ? '0' : sp1[i];
    const bDigit = sp2[i] === ' ' ? '0' : sp2[i];
    setLockMessage(bm
      ? `${tDigit} lebih kecil daripada ${bDigit}. Anda perlu Pinjam dari Rumah Sebelah!`
      : `${tDigit} is smaller than ${bDigit}. You need to Borrow from the House Next Door!`);
  };

  const newProblem = useCallback(() => {
    const p = generateProblem(difficulty, op);
    const ml = Math.max(String(p.num1).length, String(p.num2).length, String(p.answer).length);
    setProblem(p);
    setInputDigits(Array(ml).fill(''));
    setTopRowInputs(Array(ml).fill(''));
    setUserStruckRow(Array(ml).fill(false));
    setUserBorrowedTo(Array(ml).fill(false));
    setPartial1Inputs(Array(ml).fill(''));
    setPartial2Inputs(Array(ml).fill(''));
    setPartial3Inputs(Array(ml).fill(''));
    setPartial3CarryInputs(Array(ml).fill(''));
    setPartial1CarryInputs(Array(ml).fill(''));
    setPartial2CarryInputs(Array(ml).fill(''));
    setPartial1Submitted(new Set());
    setPartial2Submitted(new Set());
    setAnswerSubmitted(new Set());
    setActiveIdx(ml - 1);
    setActiveTopIdx(0);
    if (p.hasPartials) {
      setActiveSection('partial1');
      setActivePartial1Idx(ml - 1);
      setActivePartial1CarryIdx(0);
      setActivePartial2CarryIdx(0);
      setActivePartial2Idx(0);
    } else {
      // For division, start from left; for addition/subtraction, start from right
      setActiveSection('answer');
      setActiveIdx(p.op === '÷' ? 0 : ml - 1);
      setActivePartial1Idx(0);
      setActivePartial2Idx(0);
      setActivePartial1CarryIdx(0);
      setActivePartial2CarryIdx(0);
      setActiveTopIdx(0);
    }
    setConfirmBorrowIdx(null);
    setLockMessage('');
    setStatus('playing');
    setShowStreak(false);
  }, [difficulty, op]);

  // Regenerate the working problem when the selected level or operation changes.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => { newProblem(); }, [newProblem]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    const card = cardRef.current;
    const work = workRef.current;
    if (!card || !work) return;
    let frame;
    const fit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Measure unscaled layout dimensions. CSS zoom changes layout and can
        // retrigger this observer every frame as text and borders are rounded.
        const workWidth = work.offsetWidth;
        const workHeight = work.offsetHeight;
        if (!workWidth || !workHeight || !card.clientHeight) return;
        const styles = getComputedStyle(card);
        const width = card.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
        const bottom = parseFloat(styles.paddingBottom);
        const toolbar = card.querySelector('.math-game-toolbar');
        const top = toolbar.offsetTop + toolbar.offsetHeight + 8;
        const scale = Math.min(1, width / workWidth, Math.max(0, card.clientHeight - top - bottom) / workHeight);
        const viewport = work.parentElement;
        const nextTop = `${top}px`;
        const nextBottom = `${bottom}px`;
        const nextTransform = `scale(${Math.max(0.1, Math.floor(scale * 1000) / 1000)})`;
        if (viewport.style.top !== nextTop) viewport.style.top = nextTop;
        if (viewport.style.bottom !== nextBottom) viewport.style.bottom = nextBottom;
        // A transform changes only painting, leaving the observed size stable.
        if (work.style.transform !== nextTransform) work.style.transform = nextTransform;
      });
    };
    const observer = new ResizeObserver(fit);
    observer.observe(card);
    observer.observe(work);
    observer.observe(card.querySelector('.math-game-toolbar'));
    fit();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [problem]);

  // Cleanup feedback timer on unmount
  useEffect(() => {
    return () => { if (feedbackTimer.current) clearTimeout(feedbackTimer.current); };
  }, []);

  // Focus the active input whenever section or index changes
  useEffect(() => {
    if (status !== 'playing') return;
    if (activeSection === 'answer') {
      inputRefs.current[activeIdx]?.focus({ preventScroll: true });
    } else if (activeSection === 'topRow') {
      topRowRefs.current[activeTopIdx]?.focus({ preventScroll: true });
    } else if (activeSection === 'partial1Carry') {
      partial1CarryRefs.current[activePartial1CarryIdx]?.focus({ preventScroll: true });
    } else if (activeSection === 'partial1') {
      partial1Refs.current[activePartial1Idx]?.focus({ preventScroll: true });
    } else if (activeSection === 'partial2Carry') {
      partial2CarryRefs.current[activePartial2CarryIdx]?.focus({ preventScroll: true });
    } else if (activeSection === 'partial2') {
      partial2Refs.current[activePartial2Idx]?.focus({ preventScroll: true });
    }
  }, [activeSection, activeIdx, activeTopIdx, activePartial1Idx, activePartial2Idx, activePartial1CarryIdx, activePartial2CarryIdx, status, problem]);

  const checkAnswer = useCallback((digits) => {
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    const padded = String(problem.answer).padStart(ml, '0');
    let correct = digits.join('') === padded;
    if (correct && problem.hasPartials) {
      const N1 = String(problem.partial1).length;
      const N2 = String(problem.partial2).length;
      const cp1 = String(problem.partial1);
      const cp2 = String(problem.partial2);
      for (let i = 0; i < N1; i++) {
        if (partial1Inputs[ml - N1 + i] !== cp1[i]) { correct = false; break; }
      }
      if (correct) {
        for (let i = 0; i < N2; i++) {
          if (partial2Inputs[ml - N2 - 1 + i] !== cp2[i]) { correct = false; break; }
        }
      }
      if (correct && problem.partial3 !== undefined) {
        const cp3 = String(problem.partial3);
        correct = cp3.split('').every((d, i) => partial3Inputs[ml - cp3.length - 2 + i] === d);
      }
    }
    if (correct) {
      setStatus('correct');
      setScore(s => s + 10);
      setTotalAnswered(t => t + 1);

      // Add correct answer reward
      const gameData = addCorrectAnswer();
      setGems(gameData.gems);
      setStars(gameData.stars);
      const newStreak = gameData.streak;
      setStreak(newStreak);

      if (newStreak % STREAK_MILESTONE === 0) {
        playSound('streak');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
        setTimeout(() => setShowStreak(true), 400);
      } else {
        playSound('correct');
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        // Auto-advance after short delay (only if not a milestone)
        feedbackTimer.current = setTimeout(() => {
          newProblem();
        }, 1200);
      }
    } else {
      setStatus('wrong');
      setWrongCount(w => w + 1);
      playSound('wrong');
      if (navigator.vibrate) navigator.vibrate([60, 30, 60]);

      // Deduct heart on wrong answer (resets streak)
      const gameData = deductHeart();
      setHearts(gameData.hearts);
      setStreak(gameData.streak);
    }
  }, [problem, partial1Inputs, partial2Inputs, partial3Inputs, newProblem]);

  const submitAnswer = () => {
    if (status !== 'playing') return;
    if (inputDigits.includes('')) return;

    // Subtraction: every column with top < bottom must have its borrow performed first
    if (problem.op === '-') {
      const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
      for (let i = 0; i < ml; i++) {
        if (needsBorrowAt(i)) {
          triggerLockMessage(i);
          return;
        }
      }
    }

    if (problem.hasPartials) {
      const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
      const N1 = String(problem.partial1).length;
      const N2 = String(problem.partial2).length;
      for (let i = ml - N1; i <= ml - 1; i++) {
        if (!partial1Inputs[i]) return;
      }
      for (let i = ml - N2 - 1; i <= ml - 2; i++) {
        if (!partial2Inputs[i]) return;
      }
      if (problem.partial3 !== undefined && partial3Inputs.slice(ml - String(problem.partial3).length - 2, ml - 2).includes('')) return;
    }

    checkAnswer(inputDigits);
  };

  const resetFields = () => {
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    setInputDigits(Array(ml).fill(''));
    setTopRowInputs(Array(ml).fill(''));
    setPartial1Inputs(Array(ml).fill(''));
    setPartial2Inputs(Array(ml).fill(''));
    setPartial3Inputs(Array(ml).fill(''));
    setPartial3CarryInputs(Array(ml).fill(''));
    setPartial1CarryInputs(Array(ml).fill(''));
    setPartial2CarryInputs(Array(ml).fill(''));
    setPartial1Submitted(new Set());
    setPartial2Submitted(new Set());
    setAnswerSubmitted(new Set());
    setUserStruckRow([]);
    setUserBorrowedTo([]);
    setConfirmBorrowIdx(null);
    setBorrowAnswerInput('');
    setBorrowSubmitAttempted(false);
    setLockMessage('');
    setActiveIdx(0);
    setActiveTopIdx(0);
    setActiveSection('answer');
    setActivePartial1Idx(0);
    setActivePartial2Idx(0);
    setActivePartial1CarryIdx(0);
    setActivePartial2CarryIdx(0);
  };

  const focusAnswerField = (index) => {
    if (index < 0 || index >= inputDigits.length) return;
    setActiveIdx(index);
    setActiveSection('answer');
    requestAnimationFrame(() => {
      inputRefs.current[index]?.focus({ preventScroll: true });
    });
  };

  const focusDivisionSubmit = () => {
    requestAnimationFrame(() => {
      submitBtnRef.current?.focus({ preventScroll: true });
    });
  };

  const moveDivisionAnswerFocus = (currentIndex, digitsOverride = inputDigits) => {
    if (problem?.op !== '÷') return false;
    const nextIdx = currentIndex + 1;
    if (nextIdx < digitsOverride.length) {
      focusAnswerField(nextIdx);
      return true;
    }
    const allFilled = digitsOverride.every((d) => d !== '');
    if (allFilled) {
      focusDivisionSubmit();
      return true;
    }
    return false;
  };

  const handleAnswerChange = (i, rawValue) => {
    if (status !== 'playing') return;
    // Allow any numeric input - user can type 1, 2, or more digits
    const cleaned = rawValue.replace(/[^0-9]/g, '');

    // Keep only up to 2 digits
    const limited = cleaned.slice(0, 2);

    const digits = [...inputDigits];
    digits[i] = limited;
    setInputDigits(digits);

    if (!limited) {
      setLockMessage('');
      return;
    }

    if (problem && problem.op === '÷') {
      const submitted = new Set(answerSubmitted);
      submitted.add(i);
      setAnswerSubmitted(submitted);

      const nextDigits = [...digits];
      const moved = moveDivisionAnswerFocus(i, nextDigits);
      if (!moved) {
        setTimeout(() => {
          const allFilled = nextDigits.every((d) => d !== '');
          if (allFilled) focusDivisionSubmit();
        }, 0);
      }
      setLockMessage('');
      return;
    }

    // Check if borrowing is needed for subtraction
    if (problem && problem.op === '-') {
      const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
      for (let j = 0; j < ml; j++) {
        if (needsBorrowAt(j)) {
          triggerLockMessage(j);
          return;
        }
      }
    }

    // Only advance to next column if user has stopped typing (will be handled by onBlur)
    setLockMessage('');
  };

  const processCarryLogic = (i, rawValue) => {
    if (status !== 'playing') return;
    const cleaned = rawValue.replace(/[^0-9]/g, '');

    if (!cleaned) {
      const digits = [...inputDigits];
      digits[i] = '';
      setInputDigits(digits);
      setLockMessage('');
      return;
    }

    // Mark this position as submitted
    const submitted = new Set(answerSubmitted);
    submitted.add(i);

    // Handle values >= 10: split and carry
    if (cleaned.length === 2 && parseInt(cleaned) >= 10) {
      const value = parseInt(cleaned);
      const ones = String(value % 10);
      const tens = String(Math.floor(value / 10));

      // Set the ones digit in the answer field
      const digits = [...inputDigits];
      digits[i] = ones;
      setInputDigits(digits);

      // Set the tens digit in the upper carry field (left column)
      const topInputs = [...topRowInputs];
      if (i > 0) topInputs[i - 1] = tens;
      setTopRowInputs(topInputs);

      // Mark carry position as submitted so it displays
      if (i > 0) submitted.add(i - 1);
      setAnswerSubmitted(submitted);

      setLockMessage('');
      return;
    }

    // Single digit - keep as is
    const digits = [...inputDigits];
    digits[i] = cleaned.slice(-1);
    setInputDigits(digits);
    setAnswerSubmitted(submitted);
    setLockMessage('');
  };

  const processPartial1CarryLogic = (i, rawValue) => {
    if (status !== 'playing' || !problem.hasPartials) return;
    const cleaned = rawValue.replace(/[^0-9]/g, '');

    // Mark this index as submitted
    const newSubmitted = new Set(partial1Submitted);
    newSubmitted.add(i);
    setPartial1Submitted(newSubmitted);

    if (!cleaned) {
      const digits = [...partial1Inputs];
      digits[i] = '';
      setPartial1Inputs(digits);
      return;
    }

    // Handle values >= 10: split and carry
    if (cleaned.length === 2 && parseInt(cleaned) >= 10) {
      const value = parseInt(cleaned);
      const ones = String(value % 10);
      const tens = String(Math.floor(value / 10));

      // Set the ones digit in the answer field
      const digits = [...partial1Inputs];
      digits[i] = ones;
      setPartial1Inputs(digits);

      // Set the tens digit in the carry row to the left column
      const carryInputs = [...partial1CarryInputs];
      let submittedWithCarry = newSubmitted;
      if (i - 1 >= 0) {
        carryInputs[i - 1] = tens;
        // Mark the carry position as submitted so it displays
        submittedWithCarry = new Set(newSubmitted);
        submittedWithCarry.add(i - 1);
      }
      setPartial1CarryInputs(carryInputs);
      setPartial1Submitted(submittedWithCarry);
      return;
    }

    // Single digit - keep as is
    const digits = [...partial1Inputs];
    digits[i] = cleaned.slice(-1);
    setPartial1Inputs(digits);
  };

  const processPartial2CarryLogic = (i, rawValue) => {
    if (status !== 'playing' || !problem.hasPartials) return;
    const cleaned = rawValue.replace(/[^0-9]/g, '');

    // Mark this index as submitted
    const newSubmitted = new Set(partial2Submitted);
    newSubmitted.add(i);
    setPartial2Submitted(newSubmitted);

    if (!cleaned) {
      const digits = [...partial2Inputs];
      digits[i] = '';
      setPartial2Inputs(digits);
      return;
    }

    // Handle values >= 10: split and carry
    if (cleaned.length === 2 && parseInt(cleaned) >= 10) {
      const value = parseInt(cleaned);
      const ones = String(value % 10);
      const tens = String(Math.floor(value / 10));

      // Set the ones digit in the answer field
      const digits = [...partial2Inputs];
      digits[i] = ones;
      setPartial2Inputs(digits);

      // Set the tens digit in the carry row aligned with partial 2 (shifted left by 1)
      // Undo the tens-row shift so the carry sits over the next multiplicand digit.
      const carryInputs = [...partial2CarryInputs];
      carryInputs[i] = tens;
      const submittedWithCarry = new Set(newSubmitted);
      submittedWithCarry.add(i);
      setPartial2CarryInputs(carryInputs);
      setPartial2Submitted(submittedWithCarry);
      return;
    }

    // Single digit - keep as is
    const digits = [...partial2Inputs];
    digits[i] = cleaned.slice(-1);
    setPartial2Inputs(digits);
  };

  const handleAnswerKeyDown = (i, e) => {
    if (status !== 'playing') return;

    const moveFocus = (nextIdx) => {
      if (nextIdx < 0 || nextIdx >= inputDigits.length) return false;
      focusAnswerField(nextIdx);
      return true;
    };

    const isAdvanceKey = ['Enter', 'NumpadEnter', 'Tab', 'Done', 'Next'].includes(e.key) || e.code === 'NumpadEnter';

    if (isAdvanceKey) {
      e.preventDefault();
      if (problem && problem.op === '÷') {
        const nextDigits = [...inputDigits];
        const moved = moveDivisionAnswerFocus(i, nextDigits);
        if (!moved) {
          const allFilled = nextDigits.every((d) => d !== '');
          if (allFilled) focusDivisionSubmit();
        }
      } else {
        // Process carry logic when user presses Enter
        processCarryLogic(i, inputRefs.current[i]?.value ?? '');
        const nextIdx = i - 1;
        if (!moveFocus(nextIdx)) {
          setTimeout(() => {
            const allFilled = !inputDigits.some((d, idx) => idx === i ? false : d === '');
            if (allFilled) {
              submitBtnRef.current?.focus({ preventScroll: true });
            }
          }, 0);
        }
      }
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      // Move focus to left column (i-1)
      if (i > 0) {
        focusAnswerField(i - 1);
      }
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      // Move focus to right column (i+1)
      if (i < inputDigits.length - 1) {
        focusAnswerField(i + 1);
      }
      return;
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const digits = [...inputDigits];
      if (digits[i] !== '') {
        digits[i] = '';
        setInputDigits(digits);
        setLockMessage('');
      } else if (e.key === 'Backspace' && i < digits.length - 1) {
        digits[i + 1] = '';
        setInputDigits(digits);
        setActiveIdx(i + 1);
        setLockMessage('');
      }
    }
  };

  const handleTopRowChange = (i, rawValue) => {
    if (status !== 'playing') return;
    if (problem.op === '-') return; // subtraction topRow is auto-filled
    const cleaned = rawValue.replace(/[^0-9]/g, '');
    const limited = cleaned.slice(0, 2); // allow up to 2 digits (e.g., 15 for 3×5)
    const inputs = [...topRowInputs];
    inputs[i] = limited;
    setTopRowInputs(inputs);
  };

  const handleTopRowKeyDown = (i, e) => {
    if (status !== 'playing') return;
    if (problem.op === '-') { e.preventDefault(); return; }

    if (e.key === 'Enter') {
      e.preventDefault();
      // Move to answer section on Enter
      setActiveSection('answer');
      setActiveIdx(0);
      inputRefs.current[0]?.focus({ preventScroll: true });
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (i < maxLen - 1) {
        setActiveTopIdx(i + 1);
        topRowRefs.current[i + 1]?.focus({ preventScroll: true });
      }
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (i > 0) {
        setActiveTopIdx(i - 1);
        topRowRefs.current[i - 1]?.focus({ preventScroll: true });
      }
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      const inputs = [...topRowInputs];
      inputs[i] = '';
      setTopRowInputs(inputs);
    }
  };

  const handlePartial1Change = (i, rawValue) => {
    if (status !== 'playing' || !problem.hasPartials) return;
    const cleaned = rawValue.replace(/[^0-9]/g, '');
    const limited = cleaned.slice(0, 2);
    const inputs = [...partial1Inputs];
    inputs[i] = limited;
    setPartial1Inputs(inputs);
  };

  const handlePartial1KeyDown = (i, e) => {
    if (status !== 'playing') return;
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    if (e.key === 'Enter') {
      e.preventDefault();
      processPartial1CarryLogic(i, partial1Refs.current[i].value);
      const N1 = String(problem.partial1).length;
      const leftmostP1 = ml - N1;
      if (i > leftmostP1) {
        setTimeout(() => {
          setActivePartial1Idx(i - 1);
          partial1Refs.current[i - 1]?.focus({ preventScroll: true });
        }, 50);
      } else if (problem.hasPartials) {
        // At leftmost partial 1, all filled → move to rightmost partial 2
        const updatedInputs = [...partial1Inputs];
        updatedInputs[i] = partial1Refs.current[i].value.replace(/[^0-9]/g, '').slice(0, 2);
        const allFilled = !updatedInputs.slice(leftmostP1).some(d => d === '');
        if (allFilled) {
          const rightmostP2 = ml - 2;
          setTimeout(() => {
            setActiveSection('partial2');
            setActivePartial2Idx(rightmostP2);
            partial2Refs.current[rightmostP2]?.focus({ preventScroll: true });
          }, 80);
        }
      }
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (i > 0) {
        setActivePartial1Idx(i - 1);
        partial1Refs.current[i - 1]?.focus({ preventScroll: true });
      }
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (i < ml - 1) {
        setActivePartial1Idx(i + 1);
        partial1Refs.current[i + 1]?.focus({ preventScroll: true });
      }
      return;
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const inputs = [...partial1Inputs];
      if (inputs[i] !== '') {
        inputs[i] = '';
        setPartial1Inputs(inputs);
      } else if (e.key === 'Backspace' && i < ml - 1) {
        inputs[i + 1] = '';
        setPartial1Inputs(inputs);
        setActivePartial1Idx(i + 1);
      }
    }
  };

  const handlePartial2Change = (i, rawValue) => {
    if (status !== 'playing' || !problem.hasPartials) return;
    const cleaned = rawValue.replace(/[^0-9]/g, '');
    const limited = cleaned.slice(0, 2);
    const inputs = [...partial2Inputs];
    inputs[i] = limited;
    setPartial2Inputs(inputs);
  };

  const handlePartial2KeyDown = (i, e) => {
    if (status !== 'playing') return;
    const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
    if (e.key === 'Enter') {
      e.preventDefault();
      processPartial2CarryLogic(i, partial2Refs.current[i].value);
      const N2 = String(problem.partial2).length;
      const leftmostP2 = ml - N2 - 1;
      if (i > leftmostP2) {
        setTimeout(() => {
          setActivePartial2Idx(i - 1);
          partial2Refs.current[i - 1]?.focus({ preventScroll: true });
        }, 0);
      } else if (leftmostP2 >= 0) {
        // At leftmost partial 2, check if all filled by examining DOM refs
        let allFilled = true;
        for (let j = leftmostP2; j < ml - 1; j++) {
          if (!partial2Refs.current[j] || partial2Refs.current[j].value.trim() === '') {
            allFilled = false;
            break;
          }
        }
        if (allFilled) {
          setTimeout(() => {
            if (problem.partial3 !== undefined) {
              setActiveSection('partial3');
              setActivePartial3Idx(ml - 3);
              partial3Refs.current[ml - 3]?.focus({ preventScroll: true });
            } else {
              setActiveSection('answer');
              inputRefs.current[ml - 1]?.focus({ preventScroll: true });
            }
          }, 80);
        }
      }
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (i > 0) {
        setActivePartial2Idx(i - 1);
        partial2Refs.current[i - 1]?.focus({ preventScroll: true });
      }
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (i < ml - 1) {
        setActivePartial2Idx(i + 1);
        partial2Refs.current[i + 1]?.focus({ preventScroll: true });
      }
      return;
    }
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const inputs = [...partial2Inputs];
      if (inputs[i] !== '') {
        inputs[i] = '';
        setPartial2Inputs(inputs);
      } else if (e.key === 'Backspace' && i < ml - 2) {
        inputs[i + 1] = '';
        setPartial2Inputs(inputs);
        setActivePartial2Idx(i + 1);
      }
    }
  };

  const processPartial3CarryLogic = (i, rawValue) => {
    if (status !== 'playing') return;
    const cleaned = rawValue.replace(/[^0-9]/g, '').slice(0, 2);
    const digits = [...partial3Inputs];
    digits[i] = cleaned ? String(Number(cleaned) % 10) : '';
    setPartial3Inputs(digits);
    if (Number(cleaned) >= 10) {
      const carries = [...partial3CarryInputs];
      // Hundreds-row cells are shifted two places left of the multiplicand.
      carries[i + 1] = String(Math.floor(Number(cleaned) / 10));
      setPartial3CarryInputs(carries);
    }
  };

  const handlePartial3KeyDown = (i, e) => {
    if (status !== 'playing') return;
    const ml = inputDigits.length;
    const leftmost = ml - String(problem.partial3).length - 2;
    if (e.key === 'Enter') {
      e.preventDefault();
      processPartial3CarryLogic(i, e.currentTarget.value);
      setTimeout(() => {
        if (i > leftmost) partial3Refs.current[i - 1]?.focus({ preventScroll: true });
        else inputRefs.current[ml - 1]?.focus({ preventScroll: true });
      }, 0);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = i + (e.key === 'ArrowLeft' ? -1 : 1);
      if (next >= leftmost && next <= ml - 3) partial3Refs.current[next]?.focus({ preventScroll: true });
    }
  };

  if (!problem) return null;

  const s1 = String(problem.num1);
  const s2 = String(problem.num2);
  const maxLen = Math.max(s1.length, s2.length, String(problem.answer).length);
  const p1     = s1.padStart(maxLen, ' ');
  const p2     = s2.padStart(maxLen, ' ');
  const totalW = OP_W + CELL_W * maxLen;

  const { topRow } = computeDisplayInfo(problem, maxLen);
  const { addCarries } = computeMultiplicationInfo(problem, maxLen);
  const showTopRow = problem.op === '+'
    ? topRowInputs.some((d, i) => d !== '' && d !== undefined && answerSubmitted.has(i))
    : problem.op === '-'
      ? (userStruckRow.some(v => v) || userBorrowedTo.some(v => v))
      : problem.op === '×' && !problem.hasPartials
        ? topRowInputs.some(d => d !== '' && d !== undefined)
        : false;

  const opTheme = problem.op === '-'
    ? { main: '#FF4B4B', dark: '#CC0000', soft: '#FFEFEF', stripe: 'linear-gradient(90deg, #FFA8A8, #FF4B4B)' }
    : problem.op === '+'
      ? { main: '#58CC02', dark: '#46A302', soft: '#EEFCDD', stripe: 'linear-gradient(90deg, #9DE85C, #58CC02)' }
      : problem.op === '×'
        ? { main: '#CE82FF', dark: '#9C4DCC', soft: '#F5E5FF', stripe: 'linear-gradient(90deg, #E0B4FF, #CE82FF)' }
        : problem.op === '÷'
          ? { main: '#FF9600', dark: '#CC7700', soft: '#FFF4E6', stripe: 'linear-gradient(90deg, #FFB833, #FF9600)' }
          : { main: '#1CB0F6', dark: '#0E8FD0', soft: '#E1F4FF', stripe: 'linear-gradient(90deg, #7AD2FF, #1CB0F6)' };
  const displayOp = problem.op;
  const isMultiply = problem.op === '×';
  const isDivision = problem.op === '÷';
  const operationSubtitle = isMultiply
    ? (bm ? 'Darab' : 'Multiplication')
    : problem.op === '-'
      ? (bm ? 'Tolak Panjang' : 'Long Subtraction')
      : problem.op === '+'
        ? (bm ? 'Tambah Panjang' : 'Long Addition')
        : isDivision
          ? (bm ? 'Bahagi Panjang' : 'Long Division')
          : 'Matematik';
  const progressInGroup = showStreak && streak % STREAK_MILESTONE === 0 && streak > 0 ? STREAK_MILESTONE : streak % STREAK_MILESTONE;
  const questionNumber = Math.min(progressInGroup + 1, STREAK_MILESTONE);
  const correctCount = Math.floor(score / 10);
  const handleRewardPurchase = (newData) => {
    if (!newData) return;
    setHearts(newData.hearts);
    setGems(newData.gems);
    setStars(newData.stars);
  };

  return (
    <MathGameShell className="cmg-shell math-game-screen">
      <style>{`
        ${getColumnMathStyles()}
        @keyframes cmg-pop { 0%{transform:scale(0.92);opacity:0;} 60%{transform:scale(1.02);} 100%{transform:scale(1);opacity:1;} }
        @keyframes cmg-slide { from{opacity:0;transform:translateY(-6px);} to{opacity:1;transform:translateY(0);} }
        @keyframes cmg-shake { 0%,100%{transform:translateX(0);} 20%{transform:translateX(-6px);} 40%{transform:translateX(6px);} 60%{transform:translateX(-4px);} 80%{transform:translateX(4px);} }
        @keyframes cmg-bounce-in { 0%{transform:scale(0.7);opacity:0;} 70%{transform:scale(1.04);} 100%{transform:scale(1);opacity:1;} }
        @keyframes cmg-pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(88,204,2,0.4);} 50%{box-shadow:0 0 0 8px rgba(88,204,2,0);} }
        .cmg-btn { transition: transform 0.08s ease, filter 0.15s ease, background 0.15s ease; }
        .cmg-btn:hover:not(:disabled) { filter: brightness(1.06); }
        .cmg-btn:active:not(:disabled) { transform: translateY(2px); }
        .cmg-card { animation: cmg-pop 0.28s cubic-bezier(.2,.85,.3,1.15) both; width: 100%; max-width: 440px; }
        .cmg-banner { animation: cmg-slide 0.22s ease-out both; }
        .cmg-shake { animation: cmg-shake 0.42s ease-in-out; }
        .cmg-dialog { animation: cmg-bounce-in 0.32s cubic-bezier(.2,.9,.4,1.3) both; }
        .cmg-submit-ready { animation: cmg-pulse-glow 1.6s ease-in-out infinite; }
        .cmg-digit-cell:focus { transform: scale(1.04); }
      `}</style>

      {showStreak && <StreakPopup streak={streak} language={language} onClose={() => { setShowStreak(false); newProblem(); }} />}

      {showTutorial && <TutorialModal operation={problem?.op} language={language} onClose={() => setShowTutorial(false)} num1={problem?.num1} num2={problem?.num2} />}

      {/* Borrow confirmation dialog with math problem */}
      {confirmBorrowIdx !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(28, 32, 40, 0.55)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(2px)' }} onClick={() => { setConfirmBorrowIdx(null); setBorrowAnswerInput(''); setBorrowSubmitAttempted(false); setLockMessage(''); }}>
          <div className="cmg-dialog" style={{ background: '#fff', borderRadius: '24px', padding: '1.75rem 1.5rem 1.5rem', textAlign: 'center', maxWidth: '340px', width: '100%', boxShadow: '0 24px 60px rgba(0,0,0,0.25)', border: '3px solid #FFE0E0', position: 'relative', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => { setConfirmBorrowIdx(null); setBorrowAnswerInput(''); setBorrowSubmitAttempted(false); setLockMessage(''); }} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AFAFAF', zIndex: 10 }}>
              ✕
            </button>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #FFA8A8, #FF4B4B)' }} />
            <div style={{ fontSize: '2.75rem', marginBottom: '0.25rem' }}>🏠</div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#3C3C3C', marginBottom: '1rem' }}>
              {bm ? 'Pinjam dari Rumah Sebelah?' : 'Borrow from this neighbour?'}
            </div>

            <div style={{ background: '#FFF5F5', borderRadius: '16px', padding: '1.25rem', marginBottom: '1.25rem', border: '2px solid #FFE0E0', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ fontWeight: 700, fontSize: '1.15rem', color: '#3C3C3C', flex: 1 }}>
                  {bm ? `Berapa ${p1[confirmBorrowIdx]} - 1 = ?` : `What is ${p1[confirmBorrowIdx]} - 1 = ?`}
                </div>
                <div style={{ fontSize: '1.5rem', color: '#FF4B4B', fontWeight: 900, marginLeft: '0.5rem', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
                  i
                </div>
              </div>
              <input
                type="text"
                inputMode="numeric"
                value={borrowAnswerInput}
                maxLength="2"
                onChange={(e) => {
                  const match = e.target.value.match(/^-?\d{0,1}$/);
                  const newValue = match ? e.target.value : borrowAnswerInput;
                  setBorrowAnswerInput(newValue);
                  if (newValue !== borrowAnswerInput) {
                    setBorrowSubmitAttempted(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && /^-?\d$/.test(borrowAnswerInput)) {
                    setBorrowSubmitAttempted(true);
                    const digit = parseInt(p1[confirmBorrowIdx], 10);
                    const correct = parseInt(borrowAnswerInput) === digit - 1;
                    if (correct) {
                      const idx = confirmBorrowIdx;
                      const newStruck = [...userStruckRow];
                      newStruck[idx] = true;
                      newStruck[idx + 1] = true;
                      setUserStruckRow(newStruck);

                      const newBorrowedTo = [...userBorrowedTo];
                      newBorrowedTo[idx + 1] = true;
                      setUserBorrowedTo(newBorrowedTo);

                      const newTopInputs = [...topRowInputs];
                      if (p1[idx] && p1[idx] !== ' ') {
                        newTopInputs[idx] = String(parseInt(p1[idx], 10) - 1);
                      }
                      const currentTargetValue = newTopInputs[idx + 1] ? parseInt(newTopInputs[idx + 1], 10) : parseInt(p1[idx + 1], 10);
                      if (!isNaN(currentTargetValue)) {
                        newTopInputs[idx + 1] = String(currentTargetValue + 10);
                      }
                      setTopRowInputs(newTopInputs);

                      const nextIdx = inputDigits[idx + 1] !== '' ? idx : idx + 1;
                      setActiveIdx(nextIdx);
                      setActiveSection('answer');
                      setLockMessage('');
                      setConfirmBorrowIdx(null);
                      setBorrowAnswerInput('');
                      setBorrowSubmitAttempted(false);
                    }
                  }
                }}
                autoFocus
                style={{
                  width: '80px',
                  height: '60px',
                  fontSize: '2rem',
                  fontWeight: 900,
                  textAlign: 'center',
                  border: '3px solid #FF4B4B',
                  borderRadius: '12px',
                  fontFamily: '"Courier New", monospace',
                  color: '#FF4B4B',
                  padding: '0.5rem',
                  marginBottom: '0.75rem'
                }}
              />
              {borrowSubmitAttempted && borrowAnswerInput && parseInt(borrowAnswerInput) !== parseInt(p1[confirmBorrowIdx], 10) - 1 && (
                <div style={{ fontSize: '0.85rem', color: '#FF4B4B', fontWeight: 600 }}>
                  {bm ? 'Tidak betul, cuba lagi!' : 'Not correct, try again!'}
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setBorrowSubmitAttempted(true);
                const digit = parseInt(p1[confirmBorrowIdx], 10);
                const correct = /^-?\d$/.test(borrowAnswerInput) && parseInt(borrowAnswerInput) === digit - 1;
                if (correct) {
                  const idx = confirmBorrowIdx;
                  const newStruck = [...userStruckRow];
                  newStruck[idx] = true;
                  newStruck[idx + 1] = true;
                  setUserStruckRow(newStruck);

                  const newBorrowedTo = [...userBorrowedTo];
                  newBorrowedTo[idx + 1] = true;
                  setUserBorrowedTo(newBorrowedTo);

                  const newTopInputs = [...topRowInputs];
                  if (p1[idx] && p1[idx] !== ' ') {
                    newTopInputs[idx] = String(parseInt(p1[idx], 10) - 1);
                  }
                  const currentTargetValue = newTopInputs[idx + 1] ? parseInt(newTopInputs[idx + 1], 10) : parseInt(p1[idx + 1], 10);
                  if (!isNaN(currentTargetValue)) {
                    newTopInputs[idx + 1] = String(currentTargetValue + 10);
                  }
                  setTopRowInputs(newTopInputs);

                  const nextIdx = inputDigits[idx + 1] !== '' ? idx : idx + 1;
                  setActiveIdx(nextIdx);
                  setActiveSection('answer');
                  setLockMessage('');
                  setConfirmBorrowIdx(null);
                  setBorrowAnswerInput('');
                  setBorrowSubmitAttempted(false);
                }
              }}
              disabled={!/^-?\d$/.test(borrowAnswerInput)}
              className="cmg-btn"
              style={{
                width: '100%',
                padding: '0.95rem',
                background: borrowAnswerInput ? '#58CC02' : '#E5E5E5',
                color: borrowAnswerInput ? '#fff' : '#9A9A9A',
                fontWeight: 900,
                fontSize: '1rem',
                borderRadius: '14px',
                border: 'none',
                borderBottom: borrowAnswerInput ? '4px solid #46A302' : '2px solid #C0C0C0',
                cursor: borrowAnswerInput ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                letterSpacing: '0.02em'
              }}
            >
              {bm ? '✓ Hantar' : '✓ Submit'}
            </button>
          </div>
        </div>
      )}

      <MathGameHeader
        classPrefix="cmg"
        onBack={handleBack}
        language={language}
        subtitle={operationSubtitle}
        hearts={hearts}
        gems={gems}
        stars={stars}
        onRewardsClick={() => setIsHeartShopOpen(true)}
      />

      {isSettingsOpen && (
        <div className="cmg-settings-overlay" role="dialog" aria-modal="true" aria-label={bm ? 'Tetapan permainan' : 'Game settings'}>
          <div className="cmg-settings-modal">
            <div className="cmg-settings-modal-head">
              <div>
                <h2>{bm ? 'Tetapan Permainan' : 'Game Settings'}</h2>
                <p className="cmg-settings-subtitle">
                  {bm ? 'Laraskan pilihan mengikut tahap dan gaya pembelajaran anda.' : 'Adjust choices for your level and learning style.'}
                </p>
              </div>
              <button
                type="button"
                className="cmg-settings-close"
                onClick={() => setIsSettingsOpen(false)}
                aria-label={bm ? 'Tutup tetapan' : 'Close settings'}
              >
                <X size={22} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>

            <div className="cmg-settings-group">
              <div className="cmg-settings-section-head">
                <div className="cmg-settings-label">{bm ? 'Tahap' : 'Level'}</div>
                <p className="cmg-settings-help">{bm ? 'Pilih tahap kesukaran soalan.' : 'Choose question difficulty.'}</p>
              </div>
              <div className="cmg-settings-options">
                {[
                  { id: 'easy', label: bm ? 'Senang' : 'Easy' },
                  { id: 'medium', label: bm ? 'Sederhana' : 'Medium' },
                  { id: 'hard', label: bm ? 'Susah' : 'Hard' },
                ].map(d => (
                  <button
                    key={d.id}
                    type="button"
                    className={`cmg-settings-option ${difficulty === d.id ? 'is-active' : ''}`}
                    onClick={() => setDifficulty(d.id)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="cmg-settings-group">
              <div className="cmg-settings-section-head">
                <div className="cmg-settings-label">{bm ? 'Operasi' : 'Operation'}</div>
                <p className="cmg-settings-help">{bm ? 'Pilih operasi matematik.' : 'Choose a math operation.'}</p>
              </div>
              <div className="cmg-settings-options">
                {[
                  { id: 'random', label: bm ? 'Rawak' : 'Random' },
                  { id: '+', label: '+' },
                  { id: '-', label: '-' },
                  { id: '×', label: '×' },
                  { id: '÷', label: '÷' },
                ].map(o => (
                  <button
                    key={o.id}
                    type="button"
                    className={`cmg-settings-option ${op === o.id ? 'is-active' : ''}`}
                    onClick={() => setOp(o.id)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="cmg-settings-footer">
              <button type="button" className="cmg-settings-cancel" onClick={() => setIsSettingsOpen(false)}>
                {bm ? 'Batal' : 'Cancel'}
              </button>
              <button type="button" className="cmg-settings-option is-active cmg-settings-start" onClick={() => setIsSettingsOpen(false)}>
                {bm ? 'Mula Main!' : 'Start Playing!'}
              </button>
            </div>
          </div>
        </div>
      )}

      <MathGameBody className="cmg-main">

        {/* Settings panel — secondary, narrower than the question box */}
        <div className="cmg-settings-strip" style={{
          display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start',
          background: '#fff', borderRadius: '16px', padding: '0.65rem 0.9rem',
          border: '2px solid #E5E5E5', boxShadow: '0 3px 0 #E5E5E5',
          maxWidth: isDesktop ? '440px' : '480px', width: '100%',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 900, color: '#9A9A9A', letterSpacing: '0.1em' }}>
              {bm ? 'TAHAP' : 'LEVEL'}
            </div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {[
                { id: 'easy',   label: bm ? 'Senang'    : 'Easy',   emoji: '🌱', color: '#58CC02', dark: '#46A302' },
                { id: 'medium', label: bm ? 'Sederhana' : 'Medium', emoji: '⭐', color: '#FFC800', dark: '#C99800' },
                { id: 'hard',   label: bm ? 'Susah'     : 'Hard',   emoji: '🔥', color: '#FF4B4B', dark: '#CC0000' },
              ].map(d => {
                const sel = difficulty === d.id;
                return (
                  <button key={d.id} onClick={() => setDifficulty(d.id)} className="cmg-btn" style={{
                    padding: '0.35rem 0.65rem', borderRadius: '11px',
                    fontWeight: 800, fontSize: '0.76rem',
                    background: sel ? d.color : '#F4F4F4',
                    color: sel ? '#fff' : '#777',
                    border: 'none',
                    borderBottom: sel ? `3px solid ${d.dark}` : '3px solid #DCDCDC',
                    cursor: 'pointer',
                    display: 'inline-flex', gap: '4px', alignItems: 'center',
                  }}>
                    <span style={{ fontSize: '0.85rem' }}>{d.emoji}</span>
                    <span>{d.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ width: 1, alignSelf: 'stretch', background: '#E5E5E5' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 900, color: '#9A9A9A', letterSpacing: '0.1em' }}>
              {bm ? 'OPERASI' : 'OPERATION'}
            </div>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              {[
                { id: 'random', label: '🎲', title: bm ? 'Rawak' : 'Random' },
                { id: '+',      label: '➕', title: bm ? 'Tambah' : 'Add' },
                { id: '-',      label: '➖', title: bm ? 'Tolak' : 'Subtract' },
                { id: '×',      label: '✖️', title: bm ? 'Darab' : 'Multiply' },
                { id: '÷',      label: '➗', title: bm ? 'Bahagi' : 'Divide' },
              ].map(o => {
                const sel = op === o.id;
                return (
                  <button key={o.id} onClick={() => setOp(o.id)} title={o.title} className="cmg-btn" style={{
                    padding: '0.32rem 0.7rem', borderRadius: '11px',
                    fontWeight: 800, fontSize: '1rem',
                    background: sel ? '#1CB0F6' : '#F4F4F4',
                    border: 'none',
                    borderBottom: sel ? '3px solid #0E8FD0' : '3px solid #DCDCDC',
                    cursor: 'pointer',
                  }}>{o.label}</button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="math-unified-board">
        {/* Column problem card — main focus, dominant on desktop */}
        <div
          ref={cardRef}
          key={`${problem.num1}-${problem.num2}-${problem.op}`}
          className={`cmg-card ${isMultiply ? 'is-multiply' : ''} ${status === 'wrong' ? 'cmg-shake' : ''}`}
          style={{
            position: 'relative',
            background: '#fff',
            borderRadius: '24px',
            padding: isDesktop ? '1.5rem 2.5rem 1.75rem' : '2.2rem 3.25rem 2.4rem 1rem',
            border: '3px solid #E5E5E5',
            boxShadow: '0 6px 0 #E5E5E5',
            width: isDesktop ? '440px' : '100%',
            maxWidth: isDesktop ? '720px' : '100%',
            minWidth: isDesktop ? '380px' : 'auto',
            boxSizing: 'border-box',
          }}
        >
          {/* Top color stripe themed by operation */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: isDesktop ? '8px' : '6px', background: opTheme.stripe, borderTopLeftRadius: '21px', borderTopRightRadius: '21px' }} />

          <MathGameToolbar language={language} correctCount={correctCount} wrongCount={wrongCount}>
          <button
            type="button"
            className="cmg-card-settings"
            onClick={() => setIsSettingsOpen(true)}
            aria-label={bm ? 'Tetapan' : 'Settings'}
          >
            <Settings size={26} strokeWidth={2.8} aria-hidden="true" />
          </button>

          {/* Information icon button */}
          <button
            onClick={() => setShowTutorial(true)}
            className="cmg-card-info"
            title={bm ? 'Maklumat' : 'Information'}
            style={{
              position: 'absolute', top: isDesktop ? '18px' : '14px', right: isDesktop ? '18px' : '14px',
              width: isDesktop ? '42px' : '34px', height: isDesktop ? '42px' : '34px', borderRadius: '50%',
              background: '#fff', color: '#FF4B4B',
              fontWeight: 900, fontSize: isDesktop ? '1.8rem' : '1.6rem',
              fontFamily: 'Georgia, serif',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `3px solid #FF4B4B`,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              lineHeight: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FFE0E0';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fff';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            i
          </button>

          </MathGameToolbar>

          <div className="cmg-work-viewport">
          <div ref={workRef} className={`cmg-work-area ${isDivision ? 'is-division' : ''}`} style={{ display: 'flex', flexDirection: 'column', gap: '2px', width: totalW, margin: '0 auto' }}>

            {problem.partial3 !== undefined && partial3CarryInputs.some(Boolean) && (
              <div style={{ display: 'flex', alignItems: 'center', height: '38px' }}>
                <div style={{ width: OP_W }} />
                {partial3CarryInputs.map((carry, i) => (
                  <div key={i} style={{ width: CELL_W, display: 'flex', justifyContent: 'center' }}>
                    {carry && <div className="cmg-carry-field" style={{ width: TOP_W1, height: TOP_H, boxSizing: 'border-box', border: '2px solid #CE82FF', background: '#F3E5FF', color: '#9C4DCC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: TOP_FS, fontWeight: 900 }}>{carry}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Multiplication Carry Row 2 (Top-most) */}
            {problem.hasPartials && partial2CarryInputs.some((c, i) => c !== '' && partial2Submitted.has(i)) && (
              <div style={{ display: 'flex', alignItems: 'center', height: isDesktop ? '38px' : '30px', marginBottom: '2px' }}>
                <div style={{ width: OP_W }} />
                {Array.from({ length: maxLen }, (_, i) => {
                  const c = partial2CarryInputs[i] ?? '';
                  // Only show box if user submitted the answer at position i and there's a carry
                  const hasCarry = c !== '';
                  const isSubmitted = partial2Submitted.has(i);
                  if (!hasCarry || !isSubmitted) return <div key={i} style={{ width: CELL_W }} />;
                  return (
                    <div key={i} style={{ width: CELL_W, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div
                        className="cmg-carry-field"
                        style={{
                          width: TOP_W1, height: TOP_H, boxSizing: 'border-box',
                          border: `2px solid #1CB0F6`,
                          borderRadius: '6px', background: '#EAF7FF',
                          textAlign: 'center', fontSize: TOP_FS, fontWeight: 900, fontFamily: '"Courier New", monospace',
                          color: '#1CB0F6', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                      >
                        {c}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Multiplication Carry Row 1 */}
            {problem.hasPartials && partial1CarryInputs.some((c, i) => c !== '' && partial1Submitted.has(i)) && (
              <div style={{ display: 'flex', alignItems: 'center', height: isDesktop ? '38px' : '30px', marginBottom: '4px' }}>
                <div style={{ width: OP_W }} />
                {Array.from({ length: maxLen }, (_, i) => {
                  const c = partial1CarryInputs[i] ?? '';
                  // Only show box if user submitted the answer at position i and there's a carry
                  const hasCarry = c !== '';
                  const isSubmitted = partial1Submitted.has(i);
                  if (!hasCarry || !isSubmitted) return <div key={i} style={{ width: CELL_W }} />;
                  return (
                    <div key={i} style={{ width: CELL_W, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <div
                        className="cmg-carry-field"
                        style={{
                          width: TOP_W1, height: TOP_H, boxSizing: 'border-box',
                          border: `2px solid #CE82FF`,
                          borderRadius: '6px', background: '#F3E5FF',
                          textAlign: 'center', fontSize: TOP_FS, fontWeight: 900, fontFamily: '"Courier New", monospace',
                          color: '#CE82FF', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                      >
                        {c}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Carry / Borrow row for Addition / Subtraction / Multiplication */}
            {showTopRow && (
              <div style={{ display: 'flex', alignItems: 'center', height: isDesktop ? '50px' : '38px', minHeight: isDesktop ? '50px' : '38px', visibility: 'visible' }}>
                <div style={{ width: OP_W }} />
                {(problem.op === '×' && !problem.hasPartials ? topRowInputs : topRow).map((val, i) => {
                  const hide = p1[i] === ' ' && p2[i] === ' ';
                  const isSubBorrow = problem.op === '-' && (userStruckRow[i] || userBorrowedTo[i]);
                  const isMulCarry = problem.op === '×' && !problem.hasPartials && topRowInputs[i];
                  const isTwoDigit = (topRowInputs[i] ?? '').length >= 2;
                  const hasCarry = problem.op === '+'
                    ? ((val !== null && !hide) || topRowInputs[i])
                    : problem.op === '×' && !problem.hasPartials
                      ? isMulCarry
                      : isSubBorrow;
                  const isTopActive = activeSection === 'topRow' && activeTopIdx === i && status === 'playing' && problem.op === '+';
                  const isReadonly = status !== 'playing' || problem.op === '-' || (problem.op === '×' && !problem.hasPartials);
                  return (
                    <div key={i} style={{ width: CELL_W, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {hasCarry && (
                        <input
                          className="cmg-carry-field"
                          ref={el => topRowRefs.current[i] = el}
                          type="text" inputMode="numeric" maxLength={2}
                          value={topRowInputs[i] ?? ''} readOnly={isReadonly} tabIndex={isReadonly ? -1 : 0}
                          onChange={e => handleTopRowChange(i, e.target.value)}
                          onKeyDown={e => handleTopRowKeyDown(i, e)}
                          onFocus={() => { if (!isReadonly) { setActiveSection('topRow'); setActiveTopIdx(i); } }}
                          style={{
                            width: isTwoDigit ? TOP_W2 : TOP_W1, height: TOP_H, boxSizing: 'border-box',
                            border: `2px solid ${isTopActive ? '#1CB0F6' : problem.op === '×' ? '#FF4B4B' : '#C0C0C0'}`,
                            borderRadius: '8px',
                            background: isTopActive ? '#EAF7FF' : problem.op === '×' ? '#FFE6E6' : isReadonly ? '#F0F0F0' : '#fafafa',
                            textAlign: 'center', fontSize: TOP_FS, fontWeight: 900, fontFamily: '"Courier New", monospace',
                            color: problem.op === '+' ? '#58CC02' : problem.op === '×' ? '#FF4B4B' : '#FF4B4B',
                            outline: 'none', caretColor: 'transparent', cursor: isReadonly ? 'default' : 'pointer',
                            visibility: 'visible', display: 'block'
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Long Division Format (for division operations) */}
            {problem.op === '÷' ? (
              (() => {
                const divisorStr = String(problem.num2);
                const DIV_CELL_W = isDesktop ? 58 : 48;
                const DIV_BOX_W = DIV_CELL_W - 6;
                const DIV_BOX_H = isDesktop ? '3.3rem' : '2.9rem';
                const DIV_DIGIT_FS = isDesktop ? '2.35rem' : '2rem';
                const DIVISOR_COL_W = divisorStr.length * (isDesktop ? 34 : 28) + (isDesktop ? 28 : 24);
                const dividendWidth = DIV_CELL_W * String(problem.num1).length;

                const DivisorGutter = ({ visible }) => (
                  <div style={{ width: DIVISOR_COL_W, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexShrink: 0 }}>
                    <span style={{ fontSize: DIV_DIGIT_FS, fontWeight: 700, fontFamily: '"Courier New", monospace', marginRight: '2px', visibility: visible ? 'visible' : 'hidden', color: '#3C3C3C' }}>
                      {problem.num2}
                    </span>
                    <span style={{ fontSize: isDesktop ? '2.25rem' : '2rem', fontWeight: 900, color: opTheme.main, lineHeight: 0.8, visibility: visible ? 'visible' : 'hidden' }}>
                      )
                    </span>
                  </div>
                );

                // Build all working rows dynamically based on how many quotient digits the user has entered
                const dividendDigits = p1.replace(/ /g, '').split('').map(Number);
                // Collect working-step rows to render
                const workingRows = [];
                let currentValue = 0; // running value being divided

                for (let step = 0; step < dividendDigits.length; step++) {
                  const qDigitVal = inputDigits[step] !== '' && inputDigits[step] !== undefined
                    ? parseInt(inputDigits[step], 10) : null;

                  if (qDigitVal === null) break; // stop if user hasn't entered this quotient digit yet

                  const divisor = problem.num2;
                  currentValue = currentValue * 10 + dividendDigits[step];
                  const multiplyResult = qDigitVal * divisor;
                  const subtractResult = currentValue - multiplyResult;

                  // Brought-down number: subtractResult with next dividend digit appended
                  let broughtDown = subtractResult;
                  const hasNextDigit = step + 1 < dividendDigits.length;
                  if (hasNextDigit) {
                    broughtDown = subtractResult * 10 + dividendDigits[step + 1];
                  }

                  workingRows.push({
                    step,
                    multiplyStr: String(multiplyResult),
                    broughtDown,
                    broughtDownStr: String(broughtDown),
                    hasNextDigit,
                    subtractResult,
                  });

                  currentValue = subtractResult;
                }

                return (
                  <>
                    {/* Quotient row */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '6px', fontFamily: '"Courier New", monospace' }}>
                      <DivisorGutter visible={false} />
                      <DigitRow>
                        {Array.from({ length: maxLen }, (_, i) => {
                          const d = inputDigits[i] ?? '';
                          const isActive = status === 'playing' && activeIdx === i && activeSection === 'answer';
                          const isWrong = status === 'wrong';
                          const isCorrect = status === 'correct';
                          return (
                            <input
                              key={i} ref={el => inputRefs.current[i] = el}
                              type="text" inputMode="numeric" maxLength="2" enterKeyHint="done" value={d} readOnly={status !== 'playing'}
                              onChange={e => handleAnswerChange(i, e.target.value)}
                              onKeyDown={e => handleAnswerKeyDown(i, e)}
                              onBlur={e => processCarryLogic(i, e.target.value)}
                              onFocus={() => { if (status === 'playing') { setActiveSection('answer'); setActiveIdx(i); } }}
                              style={{
                                width: DIV_BOX_W, height: DIV_BOX_H, margin: '0 3px', boxSizing: 'border-box',
                                border: `3px solid ${isActive ? opTheme.main : isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#ADADAD'}`,
                                borderRadius: '10px', background: isActive ? opTheme.soft : isWrong ? '#FFEBEB' : isCorrect ? '#EFFFEA' : '#fafafa',
                                textAlign: 'center', fontSize: isDesktop ? '2rem' : '1.8rem', fontWeight: 700, fontFamily: '"Courier New", monospace',
                                color: isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#3C3C3C', outline: 'none', caretColor: 'transparent', cursor: 'pointer', transition: 'all 0.12s',
                              }}
                            />
                          );
                        })}
                      </DigitRow>
                    </div>

                    {/* Bracket line under quotient */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontFamily: '"Courier New", monospace' }}>
                      <DivisorGutter visible={false} />
                      <div style={{ width: dividendWidth, borderTop: `3px solid ${opTheme.main}` }} />
                    </div>

                    {/* Divisor ) Dividend row */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontFamily: '"Courier New", monospace' }}>
                      <DivisorGutter visible={true} />
                      <DigitRow>
                        {dividendDigits.map((d, i) => (
                          <div key={i} style={{ width: DIV_CELL_W, textAlign: 'center', fontSize: DIV_DIGIT_FS, fontWeight: 700, fontFamily: '"Courier New", monospace', color: '#3C3C3C' }}>
                            {d}
                          </div>
                        ))}
                      </DigitRow>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px', fontFamily: '"Courier New", monospace' }}>
                      <div style={{ width: DIVISOR_COL_W + dividendWidth, borderTop: '3px solid #3C3C3C' }} />
                    </div>

                    {/* Dynamic working rows */}
                    {workingRows.map((row, rIdx) => {
                      // Multiply is RIGHT-ALIGNED ending at column = step
                      const mulEndCol = row.step;
                      const mulStartCol = Math.max(0, row.step - row.multiplyStr.length + 1);

                      // Subtract+BD spans from mulStartCol to step+1 (or step if last)
                      const bdStartCol = mulStartCol;
                      const bdEndCol = row.hasNextDigit ? row.step + 1 : row.step;
                      const bdSpan = bdEndCol - bdStartCol + 1;
                      const bdStr = row.hasNextDigit
                        ? String(row.broughtDown).padStart(bdSpan, '0')
                        : String(row.subtractResult).padStart(bdSpan, '0');

                      return (
                        <React.Fragment key={rIdx}>
                          {/* Multiply result row */}
                          <div style={{ display: 'flex', alignItems: 'center', minHeight: DIV_BOX_H, fontFamily: '"Courier New", monospace' }}>
                            <DivisorGutter visible={false} />
                            <DigitRow>
                              {Array.from({ length: maxLen }, (_, i) => {
                                let digit = '';
                                if (i >= mulStartCol && i <= mulEndCol) {
                                  digit = row.multiplyStr[i - mulStartCol];
                                }
                                return (
                                  <div key={i} style={{ width: DIV_CELL_W, textAlign: 'center', fontSize: DIV_DIGIT_FS, fontWeight: 700, fontFamily: '"Courier New", monospace', color: digit ? opTheme.main : 'transparent', height: DIV_BOX_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {digit || '\u00A0'}
                                  </div>
                                );
                              })}
                            </DigitRow>
                          </div>

                          {/* Separator line */}
                          <div style={{ display: 'flex', alignItems: 'center', margin: '2px 0', fontFamily: '"Courier New", monospace' }}>
                            <DivisorGutter visible={false} />
                            <DigitRow>
                              {Array.from({ length: maxLen }, (_, i) => (
                                <div key={i} style={{ borderTop: '2px solid #3C3C3C', width: DIV_CELL_W }} />
                              ))}
                            </DigitRow>
                          </div>

                          {/* Subtract + Brought down row */}
                          <div style={{ display: 'flex', alignItems: 'center', minHeight: DIV_BOX_H, marginBottom: '4px', fontFamily: '"Courier New", monospace' }}>
                            <DivisorGutter visible={false} />
                            <DigitRow>
                              {Array.from({ length: maxLen }, (_, i) => {
                                let digit = '';
                                let color = 'transparent';
                                if (i >= bdStartCol && i <= bdEndCol) {
                                  digit = bdStr[i - bdStartCol];
                                  color = row.hasNextDigit ? '#999' : '#58CC02';
                                }
                                return (
                                  <div key={i} style={{ width: DIV_CELL_W, textAlign: 'center', fontSize: DIV_DIGIT_FS, fontWeight: 700, fontFamily: '"Courier New", monospace', color, height: DIV_BOX_H, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {digit || '\u00A0'}
                                  </div>
                                );
                              })}
                            </DigitRow>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </>
                );
              })()
            ) : (
              <>
                {/* Row 1 — num1 */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: OP_W }} />
                  {p1.split('').map((d, i) => {
                    const isStruck = userStruckRow[i];
                    const canBorrow = problem.op === '-' && status === 'playing' && d !== ' ' && !isStruck && i < maxLen - 1 && !userBorrowedTo[i] && needsBorrowAt(i + 1);
                    return (
                      <div key={i}
                        onClick={() => { if (canBorrow) setConfirmBorrowIdx(i); }}
                        title={canBorrow ? (bm ? 'Klik untuk pinjam' : 'Tap to borrow') : undefined}
                        style={{
                          width: CELL_W, textAlign: 'center', fontSize: DIGIT_FS, fontWeight: 700, fontFamily: '"Courier New", monospace',
                          color: isStruck ? '#C8C8C8' : '#3C3C3C', textDecoration: isStruck ? 'line-through' : 'none',
                          textDecorationThickness: isStruck ? '3px' : undefined, textDecorationColor: isStruck ? '#FF4B4B' : undefined,
                          cursor: canBorrow ? 'pointer' : 'default', borderRadius: '10px', transition: 'background 0.15s, transform 0.12s',
                          background: canBorrow ? 'rgba(255, 200, 0, 0.10)' : 'transparent',
                        }}>
                        {d === ' ' ? '' : d}
                      </div>
                    );
                  })}
                </div>

                {/* Row 2 — op + num2 */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: OP_W, textAlign: 'center', fontSize: DIGIT_FS, fontWeight: 900, fontFamily: '"Courier New", monospace', color: opTheme.main }}>
                    {displayOp}
                  </div>
                  {p2.split('').map((d, i) => (
                    <div key={i} style={{ width: CELL_W, textAlign: 'center', fontSize: DIGIT_FS, fontWeight: 700, fontFamily: '"Courier New", monospace', color: '#3C3C3C' }}>
                      {d === ' ' ? '' : d}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Top separator (skip for division) */}
            {problem?.op !== '÷' && (
              <div style={{ borderTop: '3px solid #3C3C3C', margin: '4px 0' }} />
            )}

            {/* Partial product rows (multiplication, medium/hard) / Carry rows (addition, subtraction) */}
            {problem.hasPartials && (
              <>
                {/* Addition Carry row for final sum */}
                {addCarries.some(v => v !== null) && topRowInputs.some(d => d !== '' && d !== undefined) && (
                  <div style={{ display: 'flex', alignItems: 'center', height: isDesktop ? '38px' : '30px', marginBottom: '4px' }}>
                    <div style={{ width: OP_W }} />
                    {Array.from({ length: maxLen }, (_, i) => {
                      const cInfo = addCarries[i];
                      const isP1P2Done = !partial1Inputs.slice(maxLen - String(problem.partial1).length).includes('') && !partial2Inputs.slice(maxLen - String(problem.partial2).length - 1, -1).includes('') && (problem.partial3 === undefined || !partial3Inputs.slice(maxLen - String(problem.partial3).length - 2, -2).includes(''));
                      const isVisible = cInfo !== null && isP1P2Done;

                      if (!isVisible) return <div key={i} style={{ width: CELL_W }} />;
                      const c = topRowInputs[i] ?? '';
                      const isActive = status === 'playing' && activeSection === 'topRow' && activeTopIdx === i;
                      return (
                        <div key={i} style={{ width: CELL_W, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <input
                            className="cmg-carry-field"
                            ref={el => topRowRefs.current[i] = el}
                            type="text" inputMode="numeric" maxLength={2}
                            value={c} readOnly={status !== 'playing'} tabIndex={status !== 'playing' ? -1 : 0}
                            onChange={e => handleTopRowChange(i, e.target.value)}
                            onKeyDown={e => handleTopRowKeyDown(i, e)}
                            onFocus={() => { if (status === 'playing') { setActiveSection('topRow'); setActiveTopIdx(i); } }}
                            style={{
                              width: TOP_W1, height: TOP_H, boxSizing: 'border-box',
                              border: `2px solid ${isActive ? '#58CC02' : '#C0C0C0'}`,
                              borderRadius: '6px', background: isActive ? '#EEFCDD' : '#fafafa',
                              textAlign: 'center', fontSize: TOP_FS, fontWeight: 900, fontFamily: '"Courier New", monospace',
                              color: '#58CC02', outline: 'none', caretColor: 'transparent', cursor: 'pointer'
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Partial 1 */}
                <div data-partial="1" style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: OP_W }} />
                  {Array.from({ length: maxLen }, (_, i) => {
                    const N1 = String(problem.partial1).length;
                    const inRange = i >= maxLen - N1;
                    if (!inRange) return <div key={i} style={{ width: CELL_W }} />;
                    const d = partial1Inputs[i] ?? '';
                    const isActive = status === 'playing' && activeSection === 'partial1' && activePartial1Idx === i;
                    const isWrong = status === 'wrong';
                    const isCorrect = status === 'correct';
                    return (
                      <input
                        key={i} ref={el => partial1Refs.current[i] = el}
                        type="text" inputMode="numeric" maxLength="2" enterKeyHint="next" value={d} readOnly={status !== 'playing'}
                        onChange={e => handlePartial1Change(i, e.target.value)} onKeyDown={e => handlePartial1KeyDown(i, e)}
                        onBlur={(e) => {
                          processPartial1CarryLogic(i, e.target.value);
                          // Mobile fix: if focus moved to answer row prematurely, redirect to next correct field
                          if (e.relatedTarget && inputRefs.current.includes(e.relatedTarget)) {
                            const N1 = String(problem.partial1).length;
                            const leftmostP1 = maxLen - N1;
                            if (i > leftmostP1) {
                              setTimeout(() => { setActivePartial1Idx(i - 1); partial1Refs.current[i - 1]?.focus({ preventScroll: true }); }, 50);
                            } else {
                              const updatedInputs = [...partial1Inputs];
                              updatedInputs[i] = e.target.value.replace(/[^0-9]/g, '').slice(0, 2);
                              const allFilled = !updatedInputs.slice(leftmostP1).some(d => d === '');
                              if (allFilled) {
                                const rightmostP2 = maxLen - 2;
                                setTimeout(() => {
                                  setActiveSection('partial2');
                                  setActivePartial2Idx(rightmostP2);
                                  partial2Refs.current[rightmostP2]?.focus({ preventScroll: true });
                                }, 80);
                              }
                            }
                          }
                        }}
                        onFocus={() => { if (status === 'playing') { setActiveSection('partial1'); setActivePartial1Idx(i); } }}
                        style={{
                          width: CELL_W - 6, height: ANS_H, margin: '0 3px', boxSizing: 'border-box',
                          border: `3px solid ${isActive ? '#1CB0F6' : isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#ADADAD'}`,
                          borderRadius: '12px', background: isActive ? '#EAF7FF' : isWrong ? '#FFEBEB' : isCorrect ? '#EFFFEA' : '#fafafa',
                          textAlign: 'center', fontSize: ANS_FS, fontWeight: 700, fontFamily: '"Courier New", monospace',
                          color: isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#3C3C3C', outline: 'none', caretColor: 'transparent', cursor: 'pointer', transition: 'all 0.12s',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Partial 2 — hidden until user finishes partial 1 (all filled & submitted via enter/blur) */}
                {(() => {
                  const N1 = String(problem.partial1).length;
                  const isP1Done = !partial1Inputs.slice(maxLen - N1).includes('');
                  const isP1Submitted = isP1Done && partial1Submitted.has(maxLen - N1);
                  return isP1Submitted;
                })() && (
                <div data-partial="2" style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                  {/* + sign appears when p1 is done */}
                  {(() => {
                    const isP1Done = !partial1Inputs.slice(maxLen - String(problem.partial1).length).includes('');
                    return (
                      <div style={{ width: OP_W, textAlign: 'center', fontSize: DIGIT_FS, fontWeight: 900, fontFamily: '"Courier New", monospace', color: isP1Done ? '#58CC02' : 'transparent' }}>+</div>
                    );
                  })()}
                  {Array.from({ length: maxLen }, (_, i) => {
                    const N2 = String(problem.partial2).length;
                    const isLastCol = i === maxLen - 1;
                    const inRange = i >= maxLen - N2 - 1 && i <= maxLen - 2;
                    if (!inRange && !isLastCol) return <div key={i} style={{ width: CELL_W }} />;

                    if (isLastCol) {
                      const isP1Done = !partial1Inputs.slice(maxLen - String(problem.partial1).length).includes('');
                      return (
                        <div key={i} style={{ width: CELL_W - 6, height: ANS_H, margin: '0 3px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: ANS_FS, fontWeight: 700, fontFamily: '"Courier New", monospace', color: isP1Done ? '#999' : 'transparent', background: isP1Done ? '#F5F5F5' : 'transparent', borderRadius: '12px', border: `3px solid ${isP1Done ? '#D0D0D0' : 'transparent'}` }}>
                          {isP1Done ? '0' : ''}
                        </div>
                      );
                    }

                    const d = partial2Inputs[i] ?? '';
                    const isActive = status === 'playing' && activeSection === 'partial2' && activePartial2Idx === i;
                    const isWrong = status === 'wrong';
                    const isCorrect = status === 'correct';
                    return (
                      <input
                        key={i} ref={el => partial2Refs.current[i] = el}
                        type="text" inputMode="numeric" maxLength="2" enterKeyHint="next" value={d} readOnly={status !== 'playing'}
                        onChange={e => handlePartial2Change(i, e.target.value)} onKeyDown={e => handlePartial2KeyDown(i, e)}
                        onBlur={(e) => {
                          processPartial2CarryLogic(i, e.target.value);
                          // Mobile fix: if focus moved to answer row prematurely while still in partial 2, redirect to left
                          if (e.relatedTarget && inputRefs.current.includes(e.relatedTarget)) {
                            const N2 = String(problem.partial2).length;
                            const leftmostP2 = maxLen - N2 - 1;
                            if (i > leftmostP2) {
                              setTimeout(() => { setActivePartial2Idx(i - 1); partial2Refs.current[i - 1]?.focus({ preventScroll: true }); }, 50);
                            }
                          }
                        }}
                        onFocus={() => { if (status === 'playing') { setActiveSection('partial2'); setActivePartial2Idx(i); } }}
                        style={{
                          width: CELL_W - 6, height: ANS_H, margin: '0 3px', boxSizing: 'border-box',
                          border: `3px solid ${isActive ? '#1CB0F6' : isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#ADADAD'}`,
                          borderRadius: '12px', background: isActive ? '#EAF7FF' : isWrong ? '#FFEBEB' : isCorrect ? '#EFFFEA' : '#fafafa',
                          textAlign: 'center', fontSize: ANS_FS, fontWeight: 700, fontFamily: '"Courier New", monospace',
                          color: isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#3C3C3C', outline: 'none', caretColor: 'transparent', cursor: 'pointer', transition: 'all 0.12s',
                        }}
                      />
                    );
                  })}
                </div>
                )}

                {problem.partial3 !== undefined && !partial2Inputs.slice(maxLen - String(problem.partial2).length - 1, -1).includes('') && partial2Submitted.has(maxLen - String(problem.partial2).length - 1) && (
                  <div data-partial="3" style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                    <div style={{ width: OP_W, textAlign: 'center', fontSize: DIGIT_FS, color: '#58CC02', fontWeight: 900 }}>+</div>
                    {Array.from({ length: maxLen }, (_, i) => {
                      const leftmost = maxLen - String(problem.partial3).length - 2;
                      if (i < leftmost) return <div key={i} style={{ width: CELL_W }} />;
                      if (i >= maxLen - 2) return <div key={i} style={{ width: CELL_W - 6, height: ANS_H, margin: '0 3px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: ANS_FS, color: '#999', background: '#F5F5F5', borderRadius: '12px', border: '3px solid #D0D0D0' }}>0</div>;
                      const active = status === 'playing' && activeSection === 'partial3' && activePartial3Idx === i;
                      const wrong = status === 'wrong';
                      return <input
                        key={i} ref={el => partial3Refs.current[i] = el}
                        type="text" inputMode="numeric" maxLength={2} enterKeyHint="next"
                        value={partial3Inputs[i] ?? ''} readOnly={status !== 'playing'}
                        onChange={e => { const digits = [...partial3Inputs]; digits[i] = e.target.value.replace(/[^0-9]/g, '').slice(0, 2); setPartial3Inputs(digits); }}
                        onBlur={e => processPartial3CarryLogic(i, e.target.value)}
                        onKeyDown={e => handlePartial3KeyDown(i, e)}
                        onFocus={() => { if (status === 'playing') { setActiveSection('partial3'); setActivePartial3Idx(i); } }}
                        style={{ width: CELL_W - 6, height: ANS_H, margin: '0 3px', boxSizing: 'border-box', border: `3px solid ${active ? '#1CB0F6' : wrong ? '#FF4B4B' : status === 'correct' ? '#58CC02' : '#ADADAD'}`, borderRadius: '12px', background: active ? '#EAF7FF' : wrong ? '#FFEBEB' : status === 'correct' ? '#EFFFEA' : '#fafafa', textAlign: 'center', fontSize: ANS_FS, fontWeight: 700, color: wrong ? '#FF4B4B' : status === 'correct' ? '#58CC02' : '#3C3C3C', outline: 'none', caretColor: 'transparent' }}
                      />;
                    })}
                  </div>
                )}

                {/* Separator between partials and final total */}
                <div style={{ borderTop: '3px solid #3C3C3C', margin: '4px 0' }} />
              </>
            )}

            {/* Row 3 — answer inputs (skip for division, answer is the quotient at top) */}
            {problem?.op !== '÷' && (
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: OP_W }} />
                  {inputDigits.map((d, i) => {
                    const isActive = status === 'playing' && i === activeIdx && activeSection === 'answer';
                    const isWrong = status === 'wrong';
                    const isCorrect = status === 'correct';
                    return (
                      <input
                        key={i} ref={el => inputRefs.current[i] = el}
                        type="text" inputMode="numeric" maxLength={2} enterKeyHint="next" value={d} readOnly={status !== 'playing'}
                        onChange={e => handleAnswerChange(i, e.target.value)}
                        onKeyDown={e => handleAnswerKeyDown(i, e)}
                        onBlur={e => processCarryLogic(i, e.target.value)}
                        onFocus={() => { if (status === 'playing') { setActiveSection('answer'); setActiveIdx(i); } }}
                        style={{
                          width: CELL_W - 6, height: ANS_H, margin: '0 3px', boxSizing: 'border-box',
                          border: `3px solid ${isActive ? '#1CB0F6' : isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#ADADAD'}`,
                          borderRadius: '12px', background: isActive ? '#EAF7FF' : isWrong ? '#FFEBEB' : isCorrect ? '#EFFFEA' : '#fafafa',
                          textAlign: 'center', fontSize: ANS_FS, fontWeight: 700, fontFamily: '"Courier New", monospace',
                          color: isWrong ? '#FF4B4B' : isCorrect ? '#58CC02' : '#3C3C3C', outline: 'none', caretColor: 'transparent', cursor: 'pointer', transition: 'all 0.12s',
                        }}
                      />
                    );
                  })}
                </div>
                {/* Bottom separator */}
                <div style={{ borderTop: '3px solid #3C3C3C', marginTop: '4px' }} />
              </>
            )}

          </div>
          </div>
        </div>

        {/* Borrow guidance message */}
        {lockMessage && status === 'playing' && (
          <div className="cmg-banner" style={{
            display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
            fontWeight: 700, fontSize: '0.92rem', padding: '0.7rem 1rem', borderRadius: '14px',
            color: '#7A4E00', background: '#FFF8E1',
            border: '2px solid #FFC800', borderBottom: '4px solid #E0A800',
            maxWidth: '440px', textAlign: 'left', lineHeight: 1.4,
            boxShadow: '0 3px 0 #F1D89A',
          }}>
            <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🏠</span>
            <span>{lockMessage}</span>
          </div>
        )}

        <div className="math-answer-footer cmg-answer-footer">
        {/* Submit button (while playing) */}
        {status === 'playing' && (() => {
          let ready = false;
          if (problem) {
            const ml = Math.max(String(problem.num1).length, String(problem.num2).length, String(problem.answer).length);
            ready = true;
            for (let i = 0; i < ml; i++) {
              if (inputDigits[i] === '') { ready = false; break; }
            }
            if (ready && problem.hasPartials) {
              const N1 = String(problem.partial1).length;
              const N2 = String(problem.partial2).length;
              for (let i = ml - N1; i <= ml - 1; i++) {
                if (!partial1Inputs[i]) { ready = false; break; }
              }
              if (ready) {
                for (let i = ml - N2 - 1; i <= ml - 2; i++) {
                  if (!partial2Inputs[i]) { ready = false; break; }
                }
              }
              if (ready && problem.partial3 !== undefined) ready = !partial3Inputs.slice(ml - String(problem.partial3).length - 2, ml - 2).includes('');
            }
          }
          return (
            <div className="cmg-action-area" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={resetFields}
                className="cmg-btn cmg-reset-btn"
                style={{
                  padding: isDesktop ? '0.7rem 2.5rem' : '0.95rem 3rem',
                  background: '#FF9500',
                  color: '#fff',
                  fontWeight: 900, fontSize: '1rem',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  borderRadius: '16px', border: 'none',
                  borderBottom: '4px solid #D97E00',
                  cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  minWidth: '180px', justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>↻</span>
                <span>{bm ? 'Semula' : 'Reset'}</span>
              </button>
              <button
                ref={submitBtnRef}
                onClick={submitAnswer}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitAnswer(); } }}
                disabled={!ready}
                className={`cmg-btn cmg-primary-btn ${ready ? 'cmg-submit-ready' : ''}`}
                style={{
                  padding: isDesktop ? '0.7rem 2.5rem' : '0.95rem 3rem',
                  background: ready ? '#58CC02' : '#E5E5E5',
                  color: ready ? '#fff' : '#AFAFAF',
                  fontWeight: 900, fontSize: '1rem',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  borderRadius: '16px', border: 'none',
                  borderBottom: ready ? '4px solid #46A302' : '4px solid #C0C0C0',
                  cursor: ready ? 'pointer' : 'not-allowed',
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  minWidth: '180px', justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '1.1rem' }}>✓</span>
                <span>{bm ? 'Hantar' : 'Submit'}</span>
              </button>
            </div>
          );
        })()}

        {/* Feedback banner (wrong answer only) */}
        {status === 'wrong' && (
          <>
            <div className="cmg-banner" style={{
              display: 'flex', alignItems: 'center', gap: '0.55rem',
              fontWeight: 800, fontSize: '1rem', padding: '0.7rem 1.4rem', borderRadius: '14px',
              color: '#c0392b',
              background: '#FFEBEB',
              border: '2px solid #FF4B4B',
              borderBottom: '4px solid #CC0000',
            }}>
              <span style={{ fontSize: '1.4rem' }}>😅</span>
              <span>{bm ? `Jawapan betul ialah ${problem.answer}` : `Correct answer is ${problem.answer}`}</span>
            </div>
            <button onClick={newProblem} className="cmg-btn cmg-next-btn" style={{
              padding: isDesktop ? '0.75rem 2.4rem' : '1rem 2.6rem', background: '#1CB0F6', color: '#fff',
              fontWeight: 900, fontSize: '1rem', letterSpacing: '0.04em', textTransform: 'uppercase',
              borderRadius: '16px', border: 'none', borderBottom: '4px solid #0E8FD0', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minWidth: '200px', justifyContent: 'center',
            }}>
              <span>{bm ? 'Cuba Lagi' : 'Try Again'}</span>
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </button>
          </>
        )}

        </div>
        <MathGameProgress language={language} progress={questionNumber} milestone={STREAK_MILESTONE} />
        </div>

      </MathGameBody>
      <HeartShopModal isOpen={isHeartShopOpen} onClose={() => setIsHeartShopOpen(false)} onPurchase={handleRewardPurchase} language={language} />
    </MathGameShell>
  );
}
