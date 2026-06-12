import React, { useEffect, useState, useRef, useCallback } from 'react';
import BMHeader from '../../_shared/BMHeader';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundManager';

const ACCENT = '#EC4899';

const DIALOGUES = [
  {
    title: 'Di Kantin',
    lines: [
      { speaker: 'Ali', text: 'Selamat pagi, Cikgu!' },
      { speaker: 'Cikgu Siti', text: 'Selamat pagi, Ali. Dah sarapan?' },
      { speaker: 'Ali', text: 'Belum lagi, Cikgu. Saya nak beli nasi lemak.' },
      { speaker: 'Cikgu Siti', text: 'Bagus. Jangan lupa minum air ya.' },
      { speaker: 'Ali', text: 'Baik, Cikgu. Terima kasih!' },
    ],
  },
  {
    title: 'Di Perpustakaan',
    lines: [
      { speaker: 'Cikgu Rina', text: 'Murid-murid, jangan bising di perpustakaan.' },
      { speaker: 'Ani', text: 'Maaf, Cikgu. Kami nak pinjam buku.' },
      { speaker: 'Cikgu Rina', text: 'Boleh. Pilih buku yang kamu suka.' },
      { speaker: 'Adam', text: 'Saya nak pinjam buku cerita, Cikgu.' },
      { speaker: 'Cikgu Rina', text: 'Bagus, Adam. Rajin membaca ya.' },
    ],
  },
  {
    title: 'Di Kantin',
    lines: [
      { speaker: 'Aina', text: 'Selamat pagi, Mak Cik.' },
      { speaker: 'Mak Cik Kantin', text: 'Selamat pagi, Aina. Aina hendak beli apa?' },
      { speaker: 'Aina', text: 'Saya hendak beli roti dan susu.' },
      { speaker: 'Mak Cik Kantin', text: 'Baik. Ini roti dan susu kamu.' },
      { speaker: 'Aina', text: 'Terima kasih, Mak Cik.' },
      { speaker: 'Mak Cik Kantin', text: 'Sama-sama.' },
    ],
  },
  {
    title: 'Di Perpustakaan',
    lines: [
      { speaker: 'Cikgu Rina', text: 'Murid-murid, jangan buat bising di perpustakaan.' },
      { speaker: 'Iman', text: 'Maaf, Cikgu.' },
      { speaker: 'Cikgu Rina', text: 'Tidak mengapa. Kamu hendak buat apa di sini?' },
      { speaker: 'Iman', text: 'Kami hendak meminjam buku, Cikgu.' },
      { speaker: 'Cikgu Rina', text: 'Baik. Buku apa yang kamu mahu pinjam?' },
      { speaker: 'Adam', text: 'Saya mahu meminjam buku cerita, Cikgu.' },
      { speaker: 'Cikgu Rina', text: 'Bagus, Adam. Rajin membaca buku ya.' },
      { speaker: 'Adam', text: 'Baik, Cikgu. Terima kasih.' },
    ],
  },
  {
    title: 'Di Dalam Kelas',
    lines: [
      { speaker: 'Cikgu Farah', text: 'Murid-murid, adakah kerja rumah sudah siap?' },
      { speaker: 'Rizal', text: 'Ya, Cikgu. Saya sudah siap.' },
      { speaker: 'Cikgu Farah', text: 'Bagus, Rizal.' },
      { speaker: 'Rizal', text: 'Terima kasih, Cikgu.' },
      { speaker: 'Cikgu Farah', text: 'Teruskan usaha kamu.' },
      { speaker: 'Rizal', text: 'Baik, Cikgu.' },
    ],
  },
  {
    title: 'Di Taman Permainan',
    lines: [
      { speaker: 'Adam', text: 'Hai, Amir!' },
      { speaker: 'Amir', text: 'Hai, Adam.' },
      { speaker: 'Adam', text: 'Jom bermain bola.' },
      { speaker: 'Amir', text: 'Baik. Mari kita main bersama.' },
      { speaker: 'Adam', text: 'Saya suka bermain bola dengan awak.' },
      { speaker: 'Amir', text: 'Ya, saya juga.' },
    ],
  },
];

const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);

// The child plays the first non-adult speaker of the scene; every other
// character's lines are shown by the app.
function userRoleFor(d) {
  const child = d.lines.find(l => !isAdult(l.speaker));
  return child ? child.speaker : d.lines[0].speaker;
}
const getPlayerName = () => (localStorage.getItem('playerName') || '').trim();
// Computer lines address the child by their real name instead of the script's
// character name (e.g. "Selamat pagi, Ali" → "Selamat pagi, Iman").
function personalize(text, role, name) {
  if (!name) return text;
  return text.replace(new RegExp(`\\b${role}\\b`, 'g'), name);
}

const RP_READY    = 'ready';  // waiting for the child to pick their reply
const RP_TYPING   = 'typing'; // the computer's line is appearing
const RP_CORRECT  = 'correct';
const RP_WRONG    = 'wrong';
const RP_COMPLETE = 'complete';

const RP_C = {
  primary: ACCENT, primaryDark: '#C2186B',
  correct: '#4CAF50', correctDark: '#388E3C',
  wrong: '#FF6B6B', wrongDark: '#D32F2F',
};

const ROLEPLAY_STYLE = `
  .drp-root {
    --sp-1: clamp(4px, 0.8vh, 8px);
    --sp-2: clamp(8px, 1.6vh, 14px);
    height: 100dvh; overflow: hidden;
    background:
      radial-gradient(ellipse 75% 55% at 12% 0%, ${ACCENT}1c 0%, transparent 58%),
      radial-gradient(ellipse 65% 48% at 90% 100%, ${ACCENT}14 0%, transparent 62%),
      linear-gradient(180deg, #FEF6FA 0%, #FCEEF5 55%, #F9E2EE 100%);
    font-family: 'Fredoka', system-ui, sans-serif;
    display: flex; flex-direction: column;
  }
  .drp-body {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column;
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: var(--sp-2) clamp(14px, 3.5vw, 24px) 0;
  }
  .drp-stats {
    flex-shrink: 0; width: 100%;
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px; margin-bottom: var(--sp-1);
  }
  .drp-pill {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(11px, 2vh, 13px);
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
    min-width: 0; overflow: hidden; text-overflow: ellipsis;
  }
  .drp-pill.prog { background: #fff; color: ${RP_C.primaryDark}; border: 1.5px solid ${RP_C.primary}44; }
  .drp-pill.star { background: #FFF6D6; color: #B58800; border: 1.5px solid #FFE08A; }
  .drp-pill.fire { background: #FFEAD0; color: #D9610B; border: 1.5px solid #FFC081; }
  .drp-bar-wrap {
    flex-shrink: 0; width: 100%;
    background: #FBCFE8; border-radius: 999px;
    height: clamp(6px, 1.2vh, 9px); overflow: hidden;
    margin-bottom: var(--sp-2);
  }
  .drp-bar-fill {
    background: linear-gradient(90deg, ${RP_C.primary}, #F472B6);
    height: 100%; border-radius: 999px;
    transition: width 0.3s;
  }

  .drp-chat-card {
    flex: 1; min-height: 0; width: 100%;
    display: flex; flex-direction: column;
    background: #fff;
    border: 2.5px solid ${ACCENT}33;
    border-radius: clamp(18px, 3vh, 26px);
    box-shadow: 0 4px 0 ${ACCENT}2e, 0 16px 34px -18px rgba(0,0,0,.18);
    overflow: hidden;
  }
  .drp-chat-head {
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: space-between;
    gap: 10px;
    padding: clamp(8px, 1.6vh, 12px) clamp(12px, 3vw, 18px);
    border-bottom: 1.5px solid #FCE7F3;
    background: linear-gradient(180deg, #FDF2F8, #fff);
  }
  .drp-chat-title {
    min-width: 0;
    display: flex; align-items: center; gap: 8px;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(12px, 2.4vh, 15px);
    color: #9D174D;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .drp-role-pill {
    flex-shrink: 0;
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(10px, 1.9vh, 12px);
    color: #fff;
    background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
    border-radius: 999px;
    padding: clamp(3px, 0.7vh, 5px) clamp(10px, 2.4vw, 14px);
    white-space: nowrap;
  }
  .drp-chat {
    flex: 1; min-height: 0;
    overflow-y: auto;
    padding: clamp(10px, 2vh, 16px) clamp(10px, 2.6vw, 16px);
    display: flex; flex-direction: column;
    gap: clamp(8px, 1.6vh, 12px);
    background: linear-gradient(180deg, #FFFBFD, #FDF5F9);
  }
  .drp-msg {
    display: flex; align-items: flex-end; gap: 8px;
    max-width: 88%;
  }
  .drp-msg.left  { align-self: flex-start; }
  .drp-msg.right { align-self: flex-end; flex-direction: row-reverse; }
  .drp-avatar {
    flex-shrink: 0;
    width: clamp(28px, 5vh, 36px); height: clamp(28px, 5vh, 36px);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: clamp(14px, 2.6vh, 18px);
    background: #FDF2F8;
    border: 1.5px solid ${ACCENT}2a;
  }
  .drp-msg.right .drp-avatar { background: ${ACCENT}14; }
  .drp-bubble-wrap { min-width: 0; }
  .drp-name {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(9px, 1.8vh, 11px);
    color: #94A3B8;
    margin: 0 6px 2px;
  }
  .drp-msg.right .drp-name { text-align: right; color: ${ACCENT}; }
  .drp-typing {
    display: inline-flex; gap: 4px; align-items: center;
    padding: 3px 2px;
  }
  .drp-typing i {
    width: clamp(6px, 1.1vh, 8px); height: clamp(6px, 1.1vh, 8px);
    border-radius: 50%; background: #D8A7C2;
    animation: drp-dot 1.1s ease-in-out infinite;
  }
  .drp-typing i:nth-child(2) { animation-delay: .18s; }
  .drp-typing i:nth-child(3) { animation-delay: .36s; }
  @keyframes drp-dot {
    0%, 60%, 100% { transform: translateY(0); opacity: .45; }
    30% { transform: translateY(-3px); opacity: 1; }
  }
  .drp-bubble {
    display: block;
    text-align: left;
    font-weight: 600;
    font-size: clamp(12px, 2.4vh, 15px);
    line-height: 1.45;
    border-radius: 16px;
    padding: clamp(7px, 1.4vh, 10px) clamp(11px, 2.6vw, 14px);
  }
  .drp-msg.left .drp-bubble {
    background: #fff; color: #334155;
    border: 1.5px solid #F3E0EB;
    border-bottom-left-radius: 6px;
    box-shadow: 0 2px 6px -2px rgba(0,0,0,.08);
  }
  .drp-msg.right .drp-bubble {
    background: linear-gradient(180deg, ${ACCENT}d9, ${ACCENT});
    color: #fff; border: 1.5px solid transparent;
    border-bottom-right-radius: 6px;
    box-shadow: 0 3px 8px -3px ${ACCENT}80;
  }
  .drp-msg.right.missed .drp-bubble {
    background: #F1F5F9; color: #94A3B8;
    border-color: #E2E8F0; box-shadow: none;
  }
  .drp-mark { font-size: .85em; margin-left: 6px; }

  .drp-dock {
    flex-shrink: 0;
    width: 100%; max-width: 560px;
    margin: 0 auto;
    padding: var(--sp-1) clamp(14px, 3.5vw, 24px) clamp(10px, 2vh, 16px);
    display: flex; flex-direction: column;
    gap: var(--sp-1);
  }
  .drp-turn {
    background: #fff;
    border: 2.5px solid ${ACCENT}55;
    border-radius: clamp(14px, 2.4vh, 20px);
    box-shadow: 0 3px 0 ${ACCENT}2e;
    padding: clamp(8px, 1.6vh, 12px) clamp(12px, 3vw, 18px);
    text-align: center;
    transition: background 0.3s, border-color 0.3s;
  }
  .drp-turn.correct { border-color: ${RP_C.correct}; background: #F0FFF0; }
  .drp-turn.wrong   { border-color: ${RP_C.wrong};   background: #FFF0F0; }
  .drp-turn-label {
    font-family: 'Baloo 2', sans-serif; font-weight: 800;
    font-size: clamp(9px, 1.8vh, 11px); letter-spacing: 0.12em;
    color: ${RP_C.primaryDark};
    margin-bottom: 2px;
  }
  .drp-opts {
    display: flex; flex-direction: column;
    gap: clamp(6px, 1.2vh, 9px);
    margin-top: clamp(6px, 1.2vh, 9px);
  }
  .drp-opt {
    font-family: 'Baloo 2', sans-serif; font-weight: 700;
    font-size: clamp(12px, 2.4vh, 15px);
    text-align: left; line-height: 1.35;
    padding: clamp(8px, 1.6vh, 11px) clamp(12px, 2.8vw, 16px);
    border: 2px solid #E2E8F0; border-radius: 12px;
    background: #F8FAFC; color: #334155;
    cursor: pointer;
    box-shadow: 0 2px 0 #E2E8F0;
    transition: transform .12s ease, background .2s, border-color .2s, color .2s;
  }
  .drp-opt:active { transform: translateY(1px); }
  .drp-opt:disabled { cursor: default; }
  @media (hover: hover) {
    .drp-opt:not(:disabled):hover { border-color: ${ACCENT}; background: #FDF2F8; }
  }
  .drp-opt.correct { background: #F0FFF0; border-color: ${RP_C.correct}; color: ${RP_C.correctDark}; box-shadow: 0 2px 0 ${RP_C.correct}55; }
  .drp-opt.wrong   { background: #FFF0F0; border-color: ${RP_C.wrong};   color: ${RP_C.wrongDark}; box-shadow: 0 2px 0 ${RP_C.wrong}55; }
  .drp-status {
    min-height: clamp(22px, 4vh, 30px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 4px; text-align: center;
  }
  .drp-status-text {
    font-weight: 700; font-size: clamp(12px, 2.4vh, 15px);
    color: #8A7860; max-width: 360px; line-height: 1.4; margin: 0;
  }
  .drp-status-text.warn { color: #D9610B; }
  .drp-status-text.live { color: ${RP_C.primary}; font-family: 'Baloo 2', sans-serif; font-weight: 800; }
  .drp-center {
    flex: 1; min-height: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: var(--sp-2); padding: 16px; text-align: center;
  }

  /* ── Desktop / laptop scale-up ─────────────────────────────── */
  @media (min-width: 900px) {
    .drp-body, .drp-dock { max-width: 760px; }
    .drp-pill { font-size: min(14px, 2.2vh); }
    .drp-chat-head { padding: min(14px, 1.8vh) 22px; }
    .drp-chat-title { font-size: min(17px, 2.7vh); }
    .drp-role-pill { font-size: min(13px, 2.1vh); }
    .drp-chat { padding: min(20px, 2.4vh) 22px; gap: min(14px, 1.8vh); }
    .drp-msg { max-width: 75%; }
    .drp-avatar { width: min(42px, 6vh); height: min(42px, 6vh); font-size: min(21px, 3vh); }
    .drp-name { font-size: min(12px, 2vh); }
    .drp-bubble { font-size: min(16px, 2.6vh); padding: min(11px, 1.6vh) 16px; border-radius: 18px; }
    .drp-opt { font-size: min(16px, 2.6vh); }
  }
`;

/* ── Learn page: chat-style dialog reader ──────────────────────────────────── */
const SCENE_EMOJI = {
  'Di Kantin': '🍽️',
  'Di Perpustakaan': '📚',
  'Di Dalam Kelas': '🏫',
  'Di Taman Permainan': '⚽',
};
const AVATARS = {
  'Cikgu Siti': '👩‍🏫', 'Cikgu Rina': '👩‍🏫', 'Cikgu Farah': '👩‍🏫',
  'Mak Cik Kantin': '👵',
  'Ali': '👦', 'Adam': '👦', 'Amir': '👦', 'Iman': '👦', 'Rizal': '👦',
  'Ani': '👧', 'Aina': '👧',
};
const isAdult = (name) => /cikgu|mak cik/i.test(name);
// Adults sit on the left like a chat partner; children (the reader's side)
// on the right. In an all-children dialogue the speakers alternate sides.
function sceneSides(d) {
  const map = {};
  const hasAdult = d.lines.some(l => isAdult(l.speaker));
  let childIdx = 0;
  d.lines.forEach(l => {
    if (map[l.speaker]) return;
    if (isAdult(l.speaker)) { map[l.speaker] = 'left'; return; }
    map[l.speaker] = hasAdult ? 'right' : (childIdx % 2 === 0 ? 'right' : 'left');
    childIdx++;
  });
  return map;
}
const SCENES = (() => {
  const totals = {};
  DIALOGUES.forEach(d => { totals[d.title] = (totals[d.title] || 0) + 1; });
  const seen = {};
  return DIALOGUES.map(d => {
    seen[d.title] = (seen[d.title] || 0) + 1;
    return {
      emoji: SCENE_EMOJI[d.title] || '💬',
      label: totals[d.title] > 1 ? `${d.title} ${seen[d.title]}` : d.title,
    };
  });
})();

function DialogLearnPage({ onBack, onStartRoleplay, topicTitle, language, scene, onSceneChange }) {
  const d = DIALOGUES[scene];
  const sides = sceneSides(d);

  return (
    <>
      <style>{`
        .dlg-learn-root {
          --sp-1: clamp(4px, 0.8vh, 8px);
          --sp-2: clamp(8px, 1.6vh, 14px);
          height: 100dvh; overflow: hidden;
          background:
            radial-gradient(ellipse 75% 55% at 12% 0%, ${ACCENT}1c 0%, transparent 58%),
            radial-gradient(ellipse 65% 48% at 90% 100%, ${ACCENT}14 0%, transparent 62%),
            linear-gradient(180deg, #FEF6FA 0%, #FCEEF5 55%, #F9E2EE 100%);
          font-family: 'Fredoka', system-ui, sans-serif;
          display: flex; flex-direction: column;
        }
        .dlg-learn-body {
          flex: 1; min-height: 0;
          display: flex; flex-direction: column;
          align-items: center;
          width: 100%; max-width: 560px;
          margin: 0 auto;
          padding: var(--sp-2) clamp(14px, 3.5vw, 24px) 0;
        }

        .dlg-chat-card {
          flex: 1; min-height: 0; width: 100%;
          display: flex; flex-direction: column;
          background: #fff;
          border: 2.5px solid ${ACCENT}33;
          border-radius: clamp(18px, 3vh, 26px);
          box-shadow: 0 4px 0 ${ACCENT}2e, 0 16px 34px -18px rgba(0,0,0,.18);
          overflow: hidden;
        }
        .dlg-chat-head {
          flex-shrink: 0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px;
          padding: clamp(10px, 1.8vh, 14px) clamp(12px, 3vw, 18px);
          border-bottom: 1.5px solid #FCE7F3;
          background: linear-gradient(180deg, #FDF2F8, #fff);
        }
        .dlg-head-label {
          flex-shrink: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 2.4vh, 15px);
          color: #9D174D;
        }
        .dlg-select-wrap {
          position: relative;
          flex: 1; min-width: 0; max-width: 320px;
        }
        .dlg-select {
          width: 100%;
          appearance: none; -webkit-appearance: none;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(12px, 2.3vh, 14px);
          color: #9D174D;
          background: #fff;
          border: 1.5px solid ${ACCENT}44;
          border-radius: 999px;
          padding: clamp(6px, 1.2vh, 9px) 34px clamp(6px, 1.2vh, 9px) clamp(12px, 2.8vw, 16px);
          box-shadow: 0 2px 0 ${ACCENT}22;
          cursor: pointer;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          transition: border-color .15s;
        }
        .dlg-select:focus { outline: none; border-color: ${ACCENT}; }
        .dlg-select-arrow {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: ${ACCENT};
          font-size: clamp(12px, 2.2vh, 14px);
        }

        .dlg-chat {
          flex: 1; min-height: 0;
          overflow-y: auto;
          padding: clamp(10px, 2vh, 16px) clamp(10px, 2.6vw, 16px);
          display: flex; flex-direction: column;
          gap: clamp(8px, 1.6vh, 12px);
          background: linear-gradient(180deg, #FFFBFD, #FDF5F9);
        }
        .dlg-msg {
          display: flex; align-items: flex-end; gap: 8px;
          max-width: 88%;
        }
        .dlg-msg.left  { align-self: flex-start; }
        .dlg-msg.right { align-self: flex-end; flex-direction: row-reverse; }
        .dlg-avatar {
          flex-shrink: 0;
          width: clamp(30px, 5.4vh, 38px); height: clamp(30px, 5.4vh, 38px);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: clamp(15px, 2.8vh, 19px);
          background: #FDF2F8;
          border: 1.5px solid ${ACCENT}2a;
        }
        .dlg-msg.right .dlg-avatar { background: ${ACCENT}14; }
        .dlg-bubble-wrap { min-width: 0; }
        .dlg-name {
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(9px, 1.8vh, 11px);
          color: #94A3B8;
          margin: 0 6px 2px;
        }
        .dlg-msg.right .dlg-name { text-align: right; color: ${ACCENT}; }
        .dlg-bubble {
          display: block;
          text-align: left;
          font-family: 'Fredoka', sans-serif; font-weight: 600;
          font-size: clamp(12px, 2.4vh, 15px);
          line-height: 1.45;
          border-radius: 16px;
          padding: clamp(7px, 1.4vh, 10px) clamp(11px, 2.6vw, 14px);
        }
        .dlg-msg.left .dlg-bubble {
          background: #fff; color: #334155;
          border: 1.5px solid #F3E0EB;
          border-bottom-left-radius: 6px;
          box-shadow: 0 2px 6px -2px rgba(0,0,0,.08);
        }
        .dlg-msg.right .dlg-bubble {
          background: linear-gradient(180deg, ${ACCENT}d9, ${ACCENT});
          color: #fff; border: 1.5px solid transparent;
          border-bottom-right-radius: 6px;
          box-shadow: 0 3px 8px -3px ${ACCENT}80;
        }
        .dlg-cta {
          flex-shrink: 0; display: flex; justify-content: center;
          width: 100%; max-width: 420px;
          padding: clamp(8px, 1.6vh, 12px) 0 clamp(8px, 1.6vh, 12px);
        }
        .dlg-cta-btn {
          flex: 1; min-width: 0;
          font-family: 'Baloo 2', sans-serif; font-weight: 800;
          font-size: clamp(14px, 2.6vh, 17px);
          cursor: pointer; border: none; border-radius: 999px;
          padding: clamp(10px, 2vh, 13px) clamp(10px, 3vw, 28px);
          color: #fff;
          background: linear-gradient(180deg, ${ACCENT}cc, ${ACCENT});
          box-shadow: 0 4px 0 ${RP_C.primaryDark}, 0 10px 20px -10px ${ACCENT}80;
          transition: transform .12s ease, box-shadow .12s;
        }
        .dlg-cta-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 ${RP_C.primaryDark}; }
        .dlg-footer {
          flex-shrink: 0; text-align: center;
          padding: 0 16px clamp(4px, 1vh, 10px);
          font-size: 10px; font-weight: 500; color: #94A3B8;
        }
        @media (max-height: 480px) {
          .dlg-footer { display: none; }
        }

        /* ── Desktop / laptop scale-up ─────────────────────────────── */
        @media (min-width: 900px) {
          .dlg-learn-body { max-width: 760px; }
          .dlg-chat-head { padding: min(16px, 2vh) 22px; }
          .dlg-head-label { font-size: min(17px, 2.7vh); }
          .dlg-select { font-size: min(15px, 2.4vh); padding-top: min(9px, 1.4vh); padding-bottom: min(9px, 1.4vh); }
          .dlg-chat { padding: min(20px, 2.4vh) 22px; gap: min(14px, 1.8vh); }
          .dlg-msg { max-width: 75%; }
          .dlg-avatar { width: min(44px, 6.2vh); height: min(44px, 6.2vh); font-size: min(22px, 3.2vh); }
          .dlg-name { font-size: min(12px, 2vh); }
          .dlg-bubble { font-size: min(16px, 2.6vh); padding: min(11px, 1.6vh) 16px; border-radius: 18px; }
          .dlg-cta { max-width: 480px; }
          .dlg-cta-btn { font-size: min(18px, 2.8vh); padding: min(14px, 2vh) 32px; }
          .dlg-footer { font-size: 12px; }
        }
      `}</style>

      <div className="dlg-learn-root">
        <BMHeader onBack={onBack} language={language} title={topicTitle} />

        <div className="dlg-learn-body">
          <div className="dlg-chat-card">
            <div className="dlg-chat-head">
              <span className="dlg-head-label">
                🎭 {language === 'bm' ? 'Situasi' : 'Scene'}
              </span>
              <div className="dlg-select-wrap">
                <select
                  className="dlg-select"
                  value={scene}
                  onChange={(e) => onSceneChange(Number(e.target.value))}
                  aria-label={language === 'bm' ? 'Pilih situasi dialog' : 'Choose a dialogue scene'}
                >
                  {SCENES.map((s, i) => (
                    <option key={i} value={i}>{s.emoji} {s.label}</option>
                  ))}
                </select>
                <span className="dlg-select-arrow">▾</span>
              </div>
            </div>

            <div className="dlg-chat" key={scene}>
              {d.lines.map((l, j) => (
                <div key={j} className={`dlg-msg ${sides[l.speaker]}`}>
                  <div className="dlg-avatar">{AVATARS[l.speaker] || (isAdult(l.speaker) ? '👩‍🏫' : '👦')}</div>
                  <div className="dlg-bubble-wrap">
                    <div className="dlg-name">{l.speaker}</div>
                    <div className="dlg-bubble">{l.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dlg-cta">
            <button className="dlg-cta-btn" onClick={onStartRoleplay}>
              🎤 {language === 'bm' ? 'Main Watak' : 'Role-play'}
            </button>
          </div>
        </div>

        <div className="dlg-footer">
          Bahasa Melayu KSSR · {topicTitle}
        </div>
      </div>
    </>
  );
}

function DialogRoleplayPage({ onBack, language, scene, onNextScene }) {
  const d = DIALOGUES[scene];
  const userRole = userRoleFor(d);
  const playerName = getPlayerName();

  const [lineIdx, setLineIdx] = useState(0);
  const [phase,   setPhase]   = useState(() => (d.lines[0].speaker === userRole ? RP_READY : RP_TYPING));
  const [typingShown, setTypingShown] = useState(false);
  const [marks,   setMarks]   = useState({}); // lineIdx -> true / false (first pick correct?)
  const [picked,  setPicked]  = useState(null);
  const [streak,  setStreak]  = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const lineIdxRef = useRef(0);
  const streakRef  = useRef(0);
  const tokenRef   = useRef(0);
  const chatRef    = useRef(null);

  // One option set per user line: the real reply + 2 lines borrowed from other scenes.
  const [optionsMap] = useState(() => {
    const pool = [...new Set(
      DIALOGUES.flatMap(dd => dd.lines.filter(l => !isAdult(l.speaker)).map(l => l.text))
    )];
    const map = {};
    d.lines.forEach((l, i) => {
      if (l.speaker !== userRole) return;
      const distractors = shuffleArr(pool.filter(t => t !== l.text)).slice(0, 2);
      map[i] = shuffleArr([l.text, ...distractors]);
    });
    return map;
  });

  useEffect(() => { lineIdxRef.current = lineIdx; }, [lineIdx]);
  useEffect(() => { streakRef.current  = streak;  }, [streak]);
  useEffect(() => () => { tokenRef.current++; }, []);

  const line = d.lines[lineIdx] ?? null;
  const isUserTurn = !!line && line.speaker === userRole;
  const userLineCount = d.lines.filter(l => l.speaker === userRole).length;
  const score = Object.values(marks).filter(Boolean).length;

  // Keep the newest message in view as the conversation grows.
  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [lineIdx, phase, typingShown]);

  const advance = useCallback(() => {
    setPicked(null);
    setTypingShown(false);
    const ni = lineIdxRef.current + 1;
    if (ni >= d.lines.length) {
      setPhase(RP_COMPLETE);
      confetti({ particleCount: 200, spread: 160, origin: { y: 0.4 } });
      return;
    }
    setLineIdx(ni);
    setPhase(d.lines[ni].speaker === userRole ? RP_READY : RP_TYPING);
  }, [d, userRole]);

  // Computer lines appear like a chat: a short "typing…" pause, then the text
  // stays on screen long enough to be read before the conversation moves on.
  useEffect(() => {
    if (phase !== RP_TYPING || !line) return;
    const token = ++tokenRef.current;
    const t = setTimeout(() => {
      if (tokenRef.current !== token) return;
      setTypingShown(true);
      const readMs = Math.max(1500, line.text.length * 65);
      setTimeout(() => { if (tokenRef.current === token) advance(); }, readMs);
    }, 800);
    return () => clearTimeout(t);
  }, [phase, lineIdx, line, advance]);

  const handlePick = (opt, i) => {
    if (phase !== RP_READY || !line) return;
    setPicked(i);
    const correct = opt === line.text;
    setMarks(m => ({ ...m, [lineIdxRef.current]: correct }));
    if (correct) {
      const next = streakRef.current + 1;
      setStreak(next);
      setBestStreak(b => Math.max(b, next));
      if (next % 3 === 0) {
        playSound('streak');
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      } else {
        playSound('correct');
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 }, scalar: 0.8 });
      }
      setPhase(RP_CORRECT);
      setTimeout(() => advance(), 1300);
    } else {
      setStreak(0);
      setPhase(RP_WRONG);
      setTimeout(() => advance(), 2400);
    }
  };

  const handleRestart = () => {
    tokenRef.current++;
    setLineIdx(0);
    setMarks({});
    setPicked(null);
    setStreak(0);
    setBestStreak(0);
    setTypingShown(false);
    setPhase(d.lines[0].speaker === userRole ? RP_READY : RP_TYPING);
  };

  const isCorrect = phase === RP_CORRECT;
  const isWrong   = phase === RP_WRONG;
  const roleplayTitle = language === 'bm' ? 'Main Watak' : 'Role-play';

  // ── Complete screen ──────────────────────────────────────────────────────
  if (phase === RP_COMPLETE) {
    return (
      <>
        <style>{ROLEPLAY_STYLE}</style>
        <div className="drp-root">
          <BMHeader onBack={onBack} language={language} title={roleplayTitle} />
          <div className="drp-center">
            <div style={{ fontSize: 'clamp(56px, 12vh, 90px)', lineHeight: 1 }}>🎭</div>
            <h2 style={{ fontFamily: "'Baloo 2', sans-serif", color: RP_C.primary, fontSize: 'clamp(24px, 5vh, 36px)', fontWeight: 800, margin: 0 }}>
              {language === 'bm' ? 'Bagus Sekali!' : 'Well Done!'}
            </h2>
            <p style={{ fontSize: 'clamp(13px, 2.4vh, 16px)', color: '#9D174D', fontWeight: 700, margin: 0 }}>
              {SCENES[scene].emoji} {SCENES[scene].label}
            </p>
            <p style={{ fontSize: 'clamp(14px, 2.6vh, 18px)', color: '#555', fontWeight: 600, margin: '0.6rem 0' }}>
              {language === 'bm' ? 'Ayat disebut: ' : 'Lines spoken: '}<strong>{score}</strong>/{userLineCount}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#FFF6D6', borderRadius: 999, padding: '0.5rem 1.2rem', border: '1.5px solid #FFE08A' }}>
              <span style={{ fontSize: '1.1rem' }}>🔥</span>
              <span style={{ fontWeight: 800, fontFamily: "'Baloo 2', sans-serif", color: '#B58800', fontSize: 'clamp(13px, 2.4vh, 16px)' }}>
                {language === 'bm' ? 'Streak terbaik:' : 'Best streak:'} {bestStreak}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: 'var(--sp-2)' }}>
              <button onClick={handleRestart} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: '#fff', color: '#475569', border: '2px solid #E2E8F0', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800 }}>
                🔄 {language === 'bm' ? 'Main Semula' : 'Play Again'}
              </button>
              <button onClick={onNextScene} style={{ fontFamily: "'Baloo 2', sans-serif", padding: '0.8rem 1.5rem', background: `linear-gradient(180deg, ${RP_C.primary}cc, ${RP_C.primary})`, color: '#fff', border: 'none', borderRadius: 999, fontSize: '1rem', cursor: 'pointer', fontWeight: 800, boxShadow: `0 4px 0 ${RP_C.primaryDark}` }}>
                {language === 'bm' ? 'Seterusnya ➡️' : 'Next ➡️'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Lines already played stay in the chat; the current line joins them while
  // it is being "typed" or once the child's pick is resolved.
  const visibleCount = lineIdx + ((phase === RP_TYPING || isCorrect || isWrong) ? 1 : 0);

  return (
    <>
      <style>{ROLEPLAY_STYLE}</style>
      <div className="drp-root">
        <BMHeader onBack={onBack} language={language} title={roleplayTitle} />

        <div className="drp-body">
          <div className="drp-stats">
            <span className="drp-pill prog">{SCENES[scene].emoji} {SCENES[scene].label}</span>
            <span style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <span className="drp-pill star">⭐ {score}</span>
              <span className="drp-pill fire">🔥 {streak}</span>
            </span>
          </div>

          <div className="drp-bar-wrap">
            <div className="drp-bar-fill" style={{ width: `${(lineIdx / d.lines.length) * 100}%` }} />
          </div>

          <div className="drp-chat-card">
            <div className="drp-chat-head">
              <div className="drp-chat-title">
                🎭 {language === 'bm' ? 'Lakonkan dialog ini' : 'Act out this dialogue'}
              </div>
              <span className="drp-role-pill">
                {language === 'bm' ? 'Watak kamu:' : 'Your role:'} {playerName || userRole}
              </span>
            </div>

            <div className="drp-chat" ref={chatRef}>
              {d.lines.slice(0, visibleCount).map((l, j) => {
                const mine = l.speaker === userRole;
                const missed = mine && marks[j] === false;
                const typing = j === lineIdx && phase === RP_TYPING && !typingShown;
                return (
                  <div key={j} className={`drp-msg ${mine ? 'right' : 'left'}${missed ? ' missed' : ''}`}>
                    <div className="drp-avatar">{AVATARS[l.speaker] || (isAdult(l.speaker) ? '👩‍🏫' : '👦')}</div>
                    <div className="drp-bubble-wrap">
                      <div className="drp-name">{mine && playerName ? playerName : l.speaker}</div>
                      <div className="drp-bubble">
                        {typing ? (
                          <span className="drp-typing"><i /><i /><i /></span>
                        ) : (
                          <>
                            {mine ? l.text : personalize(l.text, userRole, playerName)}
                            {mine && marks[j] === true && <span className="drp-mark">✅</span>}
                            {missed && <span className="drp-mark">❌</span>}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="drp-dock">
          {isUserTurn && optionsMap[lineIdx] && (
            <div className={`drp-turn${isCorrect ? ' correct' : isWrong ? ' wrong' : ''}`}>
              <div className="drp-turn-label">
                💬 {language === 'bm' ? 'GILIRAN KAMU — PILIH JAWAPAN:' : 'YOUR TURN — PICK YOUR LINE:'}
              </div>
              <div className="drp-opts">
                {optionsMap[lineIdx].map((opt, i) => {
                  const isAnswer = opt === line.text;
                  let cls = 'drp-opt';
                  if ((isCorrect || isWrong) && isAnswer) cls += ' correct';
                  else if (isWrong && i === picked) cls += ' wrong';
                  return (
                    <button key={i} className={cls} disabled={phase !== RP_READY}
                      onClick={() => handlePick(opt, i)}>
                      {(isCorrect || isWrong) && isAnswer && '✅ '}
                      {isWrong && i === picked && !isAnswer && '❌ '}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="drp-status">
            {phase === RP_TYPING && line && (
              <p className="drp-status-text live">
                ✍️ {line.speaker} {language === 'bm' ? 'sedang menaip…' : 'is typing…'}
              </p>
            )}
            {phase === RP_READY && (
              <p className="drp-status-text">
                {language === 'bm' ? 'Pilih ayat yang sesuai untuk watak kamu 👇' : 'Pick the line that fits your role 👇'}
              </p>
            )}
            {isCorrect && (
              <p className="drp-status-text live" style={{ fontSize: 'clamp(15px, 3vh, 19px)' }}>
                ✅ {language === 'bm' ? 'Betul! Hebat!' : 'Correct! Great!'}
              </p>
            )}
            {isWrong && (
              <p className="drp-status-text warn">
                {language === 'bm' ? 'Tak mengapa — ayat yang betul ditanda hijau.' : "It's okay — the right line is marked green."}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Dialog({ onBack, language = 'bm' }) {
  const [page, setPage] = useState('learn');
  const [scene, setScene] = useState(0);

  const topicTitle = language === 'bm' ? 'Dialog' : 'Dialogues';

  const handleBack = () => {
    onBack?.();
  };

  const handleNextScene = () => setScene((s) => (s + 1) % DIALOGUES.length);

  if (page === 'learn') {
    return (
      <DialogLearnPage
        onBack={handleBack}
        onStartRoleplay={() => setPage('roleplay')}
        topicTitle={topicTitle}
        language={language}
        scene={scene}
        onSceneChange={setScene}
      />
    );
  }

  return (
    <DialogRoleplayPage
      onBack={() => setPage('learn')}
      onNextScene={handleNextScene}
      language={language}
      scene={scene}
      key={scene}
    />
  );
}
