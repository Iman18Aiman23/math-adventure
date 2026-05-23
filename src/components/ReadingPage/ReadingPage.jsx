import React, { useState, useEffect, useMemo } from 'react';
import './ReadingPage.css';
import { readingData } from '../../data/curriculum/readingData';
import { Volume2, ArrowLeft, Play } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import SpeechManager from '../../services/SpeechManager';
import { useGameStateContext } from '../../App';
import { getGameData } from '../../utils/gameStatsManager';
import KVLearningPage from './KVLearningPage';
import KVKLearningPage from './KVKLearningPage';
import { OpenBookIcon } from '../icons/GameIcons';
import PageLayout from '../PageLayout';

// ── Design System ────────────────────────────────────────────────────────────
const DESIGN_SYSTEM = {
  colors: {
    bg: '#FFFDF8',
    surface: '#FFFFFF',
    ink: '#111827',
    ink2: '#374151',
    muted: '#6B7280',
    hair: '#E5E7EB',
  },
  bezel: {
    1: '#FFFFFF',
    2: '#F4EFE6',
    3: '#D9D0BD',
  },
  levels: {
    1: { c1: '#FFF0CC', c2: '#FF9600', c3: '#D47A00', cd: '#8F5300' },
    2: { c1: '#D0F0FF', c2: '#1CB0F6', c3: '#0B8DC0', cd: '#06628A' },
    3: { c1: '#EDD9FF', c2: '#CE82FF', c3: '#9B59B6', cd: '#6E3B85' },
    4: { c1: '#E6FFD4', c2: '#58CC02', c3: '#46A302', cd: '#2E6B00' },
  },
  stats: {
    star: '#FFC800',
    heart: '#FF4B4B',
    gem: '#1CB0F6',
  },
};

// ── Script button config ──────────────────────────────────────────────────────
const SCRIPTS = [
  { key: 'RUMI', label: 'RUMI', color: '#1CB0F6', bg: '#D0F0FF' },
  { key: 'ENG',  label: 'ENG',  color: '#FF9600', bg: '#FFF0CC' },
  { key: 'JAWI', label: 'JAWI', color: '#CE82FF', bg: '#EDD9FF' },
];

// ── Level color themes ────────────────────────────────────────────────────────
const LEVEL_THEMES = {
  1: { color: '#FF9600', bg: '#FFF0CC', shadow: '#FFD699', darkColor: '#D47A00' },
  2: { color: '#1CB0F6', bg: '#D0F0FF', shadow: '#98D8FF', darkColor: '#0B8DC0' },
  3: { color: '#CE82FF', bg: '#EDD9FF', shadow: '#E6B3FF', darkColor: '#9B59B6' },
  4: { color: '#58CC02', bg: '#E6FFD4', shadow: '#B3E080', darkColor: '#46A302' },
};

const getTheme = (level) => LEVEL_THEMES[level] || LEVEL_THEMES[1];

// ── Level tile SVG illustrations ────────────────────────────────────────────
const getTileIllustration = (level) => {
  switch (level) {
    case 1:
      return (
        <svg width="100%" height="100%" viewBox="-50 -40 420 448" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rbt1Head" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"  stopColor="#B8FFE0" />
              <stop offset="100%" stopColor="#00C875" />
            </linearGradient>
            <linearGradient id="rbt1Body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"  stopColor="#FFBB52" />
              <stop offset="100%" stopColor="#FF6A00" />
            </linearGradient>
            <linearGradient id="rbt1Screen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"  stopColor="#263238" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <filter id="rbt1Shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.18" />
            </filter>
            <filter id="rbt1Glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <g className="rbt1-float">
            {/* Background glow */}
            <circle cx="160" cy="120" r="100" fill="#86EFAC" opacity="0.14" className="rbt1-glow" />

            {/* Antenna */}
            <line x1="160" y1="28" x2="160" y2="52" stroke="#FFD93D" strokeWidth="6" strokeLinecap="round" />
            <circle cx="160" cy="20" r="12" fill="#FFD93D" filter="url(#rbt1Glow)" className="rbt1-glow" />

            {/* Head */}
            <rect x="95" y="58" width="130" height="108" rx="34"
              fill="url(#rbt1Head)" stroke="#FFFFFF" strokeWidth="5" filter="url(#rbt1Shadow)" />
            <rect x="108" y="70" width="96" height="12" rx="6" fill="#FFFFFF" opacity="0.3" />

            {/* Ear pods */}
            <circle cx="82"  cy="112" r="16" fill="#FF9A00" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="238" cy="112" r="16" fill="#FF9A00" stroke="#FFFFFF" strokeWidth="4" />

            {/* Face screen */}
            <rect x="115" y="88" width="90" height="58" rx="22" fill="url(#rbt1Screen)" />

            {/* Eyes */}
            <g className="rbt1-blink">
              <path d="M 128 118 Q 140 102 152 118" stroke="#6BFF95" strokeWidth="7" fill="none" strokeLinecap="round" />
              <path d="M 168 118 Q 180 102 192 118" stroke="#6BFF95" strokeWidth="7" fill="none" strokeLinecap="round" />
            </g>

            {/* Smile */}
            <path d="M 142 136 Q 160 148 178 136" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round" />

            {/* Cheeks */}
            <circle cx="123" cy="134" r="6" fill="#FF9DBB" opacity="0.45" />
            <circle cx="197" cy="134" r="6" fill="#FF9DBB" opacity="0.45" />

            {/* Neck */}
            <rect x="146" y="166" width="28" height="18" rx="8" fill="#263238" />

            {/* Body */}
            <rect x="88" y="184" width="144" height="102" rx="28"
              fill="url(#rbt1Body)" stroke="#FFFFFF" strokeWidth="5" filter="url(#rbt1Shadow)" />
            <rect x="104" y="198" width="105" height="10" rx="5" fill="#FFFFFF" opacity="0.22" />

            {/* Chest screen */}
            <rect x="122" y="216" width="76" height="38" rx="14" fill="#1E293B" />
            <text x="150" y="242" fontSize="23" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#FFD93D" textAnchor="middle">K</text>
            <text x="170" y="238" fontSize="26" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#6BFF95" textAnchor="middle">V</text>

            {/* Buttons */}
            <circle cx="132" cy="266" r="6" fill="#FF5E7E" />
            <circle cx="160" cy="266" r="6" fill="#6EE7FF" />
            <circle cx="188" cy="266" r="6" fill="#6BFF95" />

            {/* Left arm (waving) */}
            <g className="rbt1-wave">
              <circle cx="88"  cy="218" r="14" fill="#00C875" />
              <rect   x="38"   y="208" width="52" height="20" rx="10" fill="#00C875" />
              <circle cx="34"  cy="218" r="12" fill="#B8FFE0" />
            </g>

            {/* Right arm */}
            <circle cx="232" cy="218" r="14" fill="#00C875" />
            <rect   x="230"  y="208" width="52" height="20" rx="10" fill="#00C875" />
            <circle cx="286" cy="218" r="12" fill="#B8FFE0" />

            {/* Legs */}
            <rect x="118" y="286" width="24" height="36" rx="12" fill="#263238" />
            <rect x="178" y="286" width="24" height="36" rx="12" fill="#263238" />

            {/* Feet */}
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="#00C875" />
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="#00C875" />

            {/* Floating stars */}
            <g className="rbt1-glow">
              <polygon points="66,82 70,90 79,90 72,96 75,105 66,100 57,105 60,96 53,90 62,90" fill="#FFD93D" />
              <polygon points="252,94 256,102 265,102 258,108 261,117 252,112 243,117 246,108 239,102 248,102" fill="#FFD93D" />
            </g>

            {/* Label */}
            <text x="160" y="358" fontSize="20" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#FFFFFF" textAnchor="middle" stroke="#15803D" strokeWidth="3" paintOrder="stroke">BELAJAR KV</text>
          </g>
        </svg>
      );
    case 2:
      return (
        <svg width="100%" height="100%" viewBox="-50 -40 420 448" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rbt2Head" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"  stopColor="#FFD9A8" />
              <stop offset="100%" stopColor="#FF8A00" />
            </linearGradient>
            <linearGradient id="rbt2Body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"  stopColor="#FFBB52" />
              <stop offset="100%" stopColor="#FF6A00" />
            </linearGradient>
            <linearGradient id="rbt2Screen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"  stopColor="#263238" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="rbt2Eye" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"  stopColor="#FFE66D" />
              <stop offset="100%" stopColor="#FFB800" />
            </linearGradient>
            <filter id="rbt2Shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.18" />
            </filter>
            <filter id="rbt2Glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <g className="rbt2-float">
            {/* Background glow */}
            <circle cx="160" cy="110" r="90" fill="#FFB86B" opacity="0.14" className="rbt2-glow" />

            {/* Antenna */}
            <line x1="160" y1="28" x2="160" y2="52" stroke="#FFD93D" strokeWidth="6" strokeLinecap="round" />
            <circle cx="160" cy="20" r="12" fill="#FFD93D" filter="url(#rbt2Glow)" className="rbt2-glow" />

            {/* Head */}
            <rect x="95" y="58" width="130" height="108" rx="34"
              fill="url(#rbt2Head)" stroke="#FFFFFF" strokeWidth="5" filter="url(#rbt2Shadow)" />
            <rect x="108" y="70" width="96" height="12" rx="6" fill="#FFFFFF" opacity="0.28" />

            {/* Ear pods */}
            <circle cx="82"  cy="112" r="16" fill="#FF9A00" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="238" cy="112" r="16" fill="#FF9A00" stroke="#FFFFFF" strokeWidth="4" />

            {/* Face screen */}
            <rect x="115" y="88" width="90" height="58" rx="22" fill="url(#rbt2Screen)" />

            {/* Eyes */}
            <g className="rbt2-blink">
              <rect x="128" y="108" width="24" height="16" rx="5" fill="url(#rbt2Eye)" filter="url(#rbt2Glow)" />
              <rect x="133" y="112" width="14" height="8"  rx="3" fill="#FFF8CC" />
              <rect x="168" y="108" width="24" height="16" rx="5" fill="url(#rbt2Eye)" filter="url(#rbt2Glow)" />
              <rect x="173" y="112" width="14" height="8"  rx="3" fill="#FFF8CC" />
            </g>

            {/* Eyebrows */}
            <line x1="128" y1="102" x2="152" y2="102" stroke="#FFDD55" strokeWidth="3" strokeLinecap="round" />
            <line x1="168" y1="102" x2="192" y2="102" stroke="#FFDD55" strokeWidth="3" strokeLinecap="round" />

            {/* Mouth */}
            <path d="M 140 132 Q 160 150 180 132" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round" />

            {/* Cheeks */}
            <circle cx="123" cy="134" r="6" fill="#FFD0B0" opacity="0.45" />
            <circle cx="197" cy="134" r="6" fill="#FFD0B0" opacity="0.45" />

            {/* Neck */}
            <rect x="146" y="166" width="28" height="18" rx="8" fill="#263238" />

            {/* Body */}
            <rect x="88" y="184" width="144" height="102" rx="28"
              fill="url(#rbt2Body)" stroke="#FFFFFF" strokeWidth="5" filter="url(#rbt2Shadow)" />
            <rect x="104" y="198" width="105" height="10" rx="5" fill="#FFFFFF" opacity="0.22" />

            {/* Chest screen */}
            <rect x="122" y="216" width="76" height="38" rx="14" fill="#1E293B" />
            <text x="141" y="242" fontSize="23" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#FF5E7E" textAnchor="middle">K</text>
            <text x="160" y="238" fontSize="26" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#FFD93D" textAnchor="middle">V</text>
            <text x="179" y="242" fontSize="23" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#6BFF95" textAnchor="middle">K</text>

            {/* Buttons */}
            <circle cx="132" cy="266" r="6" fill="#FF5E7E" />
            <circle cx="160" cy="266" r="6" fill="#6EE7FF" />
            <circle cx="188" cy="266" r="6" fill="#6BFF95" />

            {/* Left arm (waving) */}
            <g className="rbt2-wave">
              <circle cx="88"  cy="218" r="14" fill="#FF8A00" />
              <rect   x="38"   y="208" width="52" height="20" rx="10" fill="#FF8A00" />
              <circle cx="34"  cy="218" r="12" fill="#FFBB52" />
            </g>

            {/* Right arm */}
            <circle cx="232" cy="218" r="14" fill="#FF8A00" />
            <rect   x="230"  y="208" width="52" height="20" rx="10" fill="#FF8A00" />
            <circle cx="286" cy="218" r="12" fill="#FFBB52" />

            {/* Legs */}
            <rect x="118" y="286" width="24" height="36" rx="12" fill="#263238" />
            <rect x="178" y="286" width="24" height="36" rx="12" fill="#263238" />

            {/* Feet */}
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="#FF8A00" />
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="#FF8A00" />

            {/* Floating stars */}
            <g className="rbt2-glow">
              <polygon points="66,82 70,90 79,90 72,96 75,105 66,100 57,105 60,96 53,90 62,90" fill="#FFD93D" />
              <polygon points="252,94 256,102 265,102 258,108 261,117 252,112 243,117 246,108 239,102 248,102" fill="#FFD93D" />
            </g>

            {/* Label */}
            <text x="160" y="358" fontSize="20" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#FFFFFF" textAnchor="middle" stroke="#9A3412" strokeWidth="3" paintOrder="stroke">BELAJAR KVK</text>
          </g>
        </svg>
      );

    case 3:
      /* ── New Robot — matches tile level-3 teal (#0D9488) ── */
      return (
        <svg width="100%" height="100%" viewBox="-50 -40 420 448" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rbt3Head" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#B8F7FF" />
              <stop offset="100%" stopColor="#3CCBFF" />
            </linearGradient>
            <linearGradient id="rbt3Body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#FFBB52" />
              <stop offset="100%" stopColor="#FF7A00" />
            </linearGradient>
            <linearGradient id="rbt3Screen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#263238" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <filter id="rbt3Shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.18" />
            </filter>
            <filter id="rbt3Glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <g className="rbt3-float">
            {/* Background glow */}
            <circle cx="160" cy="120" r="100" fill="#6EE7FF" opacity="0.12" className="rbt3-glow" />

            {/* Antenna */}
            <line x1="160" y1="28" x2="160" y2="52" stroke="#FFD93D" strokeWidth="6" strokeLinecap="round" />
            <circle cx="160" cy="20" r="12" fill="#FFD93D" filter="url(#rbt3Glow)" className="rbt3-glow" />

            {/* Head */}
            <rect x="95" y="58" width="130" height="108" rx="34"
              fill="url(#rbt3Head)" stroke="#FFFFFF" strokeWidth="5" filter="url(#rbt3Shadow)" />
            <rect x="108" y="70" width="96" height="12" rx="6" fill="#FFFFFF" opacity="0.3" />

            {/* Ear pods */}
            <circle cx="82"  cy="112" r="16" fill="#FF9A00" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="238" cy="112" r="16" fill="#FF9A00" stroke="#FFFFFF" strokeWidth="4" />

            {/* Face screen */}
            <rect x="115" y="88" width="90" height="58" rx="22" fill="url(#rbt3Screen)" />

            {/* Eyes */}
            <g className="rbt3-blink">
              <ellipse cx="140" cy="116" rx="12" ry="14" fill="#FFFFFF" />
              <circle  cx="140" cy="118" r="6"            fill="#33C7FF" />
              <circle  cx="143" cy="115" r="2"            fill="#FFFFFF" />
              <ellipse cx="180" cy="116" rx="12" ry="14" fill="#FFFFFF" />
              <circle  cx="180" cy="118" r="6"            fill="#33C7FF" />
              <circle  cx="183" cy="115" r="2"            fill="#FFFFFF" />
            </g>

            {/* Smile */}
            <path d="M 142 136 Q 160 148 178 136" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round" />

            {/* Cheeks */}
            <circle cx="123" cy="134" r="6" fill="#FF9DBB" opacity="0.45" />
            <circle cx="197" cy="134" r="6" fill="#FF9DBB" opacity="0.45" />

            {/* Neck */}
            <rect x="146" y="166" width="28" height="18" rx="8" fill="#263238" />

            {/* Body */}
            <rect x="88" y="184" width="144" height="102" rx="28"
              fill="url(#rbt3Body)" stroke="#FFFFFF" strokeWidth="5" filter="url(#rbt3Shadow)" />
            <rect x="104" y="198" width="105" height="10" rx="5" fill="#FFFFFF" opacity="0.22" />

            {/* Chest screen */}
            <rect x="122" y="216" width="76" height="38" rx="14" fill="#1E293B" />
            <circle cx="160" cy="235" r="12" fill="#6EE7FF" />
            <text x="160" y="240" fontSize="14" fontFamily="Arial" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">3</text>

            {/* Buttons */}
            <circle cx="132" cy="266" r="6" fill="#FF5E7E" />
            <circle cx="160" cy="266" r="6" fill="#6EE7FF" />
            <circle cx="188" cy="266" r="6" fill="#6BFF95" />

            {/* Left arm (waving) */}
            <g className="rbt3-wave">
              <circle cx="88"  cy="218" r="14" fill="#3CCBFF" />
              <rect   x="38"   y="208" width="52" height="20" rx="10" fill="#3CCBFF" />
              <circle cx="34"  cy="218" r="12" fill="#FFBB52" />
            </g>

            {/* Right arm */}
            <circle cx="232" cy="218" r="14" fill="#3CCBFF" />
            <rect   x="230"  y="208" width="52" height="20" rx="10" fill="#3CCBFF" />
            <circle cx="286" cy="218" r="12" fill="#FFBB52" />

            {/* Legs */}
            <rect x="118" y="286" width="24" height="36" rx="12" fill="#263238" />
            <rect x="178" y="286" width="24" height="36" rx="12" fill="#263238" />

            {/* Feet */}
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="#3CCBFF" />
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="#3CCBFF" />

            {/* Floating stars */}
            <g className="rbt3-glow">
              <polygon points="66,82 70,90 79,90 72,96 75,105 66,100 57,105 60,96 53,90 62,90" fill="#FFD93D" />
              <polygon points="252,94 256,102 265,102 258,108 261,117 252,112 243,117 246,108 239,102 248,102" fill="#FFD93D" />
            </g>

            {/* Label */}
            <text x="160" y="358" fontSize="20" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#FFFFFF" textAnchor="middle" stroke="#0891B2" strokeWidth="3" paintOrder="stroke">BELAJAR KATA</text>
          </g>
        </svg>
      );

    case 4:
      return (
        <svg width="100%" height="100%" viewBox="-50 -40 420 448" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="rbt4Head" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"  stopColor="#E0C7FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="rbt4Body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"  stopColor="#FFBB52" />
              <stop offset="100%" stopColor="#FF7A00" />
            </linearGradient>
            <linearGradient id="rbt4Screen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"  stopColor="#263238" />
              <stop offset="100%" stopColor="#111827" />
            </linearGradient>
            <filter id="rbt4Shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodOpacity="0.18" />
            </filter>
            <filter id="rbt4Glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <g className="rbt4-float">
            {/* Background glow */}
            <circle cx="160" cy="110" r="90" fill="#B98CFF" opacity="0.12" className="rbt4-glow" />

            {/* Antenna */}
            <line x1="160" y1="28" x2="160" y2="52" stroke="#FFD93D" strokeWidth="6" strokeLinecap="round" />
            <circle cx="160" cy="20" r="12" fill="#FFD93D" filter="url(#rbt4Glow)" className="rbt4-glow" />

            {/* Head */}
            <rect x="95" y="58" width="130" height="108" rx="34"
              fill="url(#rbt4Head)" stroke="#FFFFFF" strokeWidth="5" filter="url(#rbt4Shadow)" />
            <rect x="108" y="70" width="96" height="12" rx="6" fill="#FFFFFF" opacity="0.3" />

            {/* Ear pods */}
            <circle cx="82"  cy="112" r="16" fill="#FF9A00" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx="238" cy="112" r="16" fill="#FF9A00" stroke="#FFFFFF" strokeWidth="4" />

            {/* Face screen */}
            <rect x="115" y="88" width="90" height="58" rx="22" fill="url(#rbt4Screen)" />

            {/* Eyes */}
            <g className="rbt4-blink">
              <circle cx="140" cy="116" r="14" fill="#FFFFFF" />
              <circle cx="180" cy="116" r="14" fill="#FFFFFF" />
              <circle cx="140" cy="118" r="7"  fill="#8B5CF6" />
              <circle cx="180" cy="118" r="7"  fill="#8B5CF6" />
              <circle cx="143" cy="114" r="2"  fill="#FFFFFF" />
              <circle cx="183" cy="114" r="2"  fill="#FFFFFF" />
            </g>

            {/* UWU mouth */}
            <path d="M 146 138 Q 152 146 160 138 Q 168 146 174 138" stroke="#FFFFFF" strokeWidth="5" fill="none" strokeLinecap="round" />

            {/* Cheeks */}
            <circle cx="123" cy="134" r="6" fill="#FF9DBB" opacity="0.45" />
            <circle cx="197" cy="134" r="6" fill="#FF9DBB" opacity="0.45" />

            {/* Neck */}
            <rect x="146" y="166" width="28" height="18" rx="8" fill="#263238" />

            {/* Body */}
            <rect x="88" y="184" width="144" height="102" rx="28"
              fill="url(#rbt4Body)" stroke="#FFFFFF" strokeWidth="5" filter="url(#rbt4Shadow)" />
            <rect x="104" y="198" width="105" height="10" rx="5" fill="#FFFFFF" opacity="0.22" />

            {/* Chest screen */}
            <rect x="122" y="216" width="76" height="38" rx="14" fill="#1E293B" />
            <text x="160" y="234" fontSize="13" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#FFFFFF" textAnchor="middle">cerita</text>
            <text x="160" y="248" fontSize="13" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#6EE7FF" textAnchor="middle">saya</text>

            {/* Buttons */}
            <circle cx="132" cy="266" r="6" fill="#FF5E7E" />
            <circle cx="160" cy="266" r="6" fill="#6EE7FF" />
            <circle cx="188" cy="266" r="6" fill="#6BFF95" />

            {/* Left arm */}
            <circle cx="88"  cy="218" r="14" fill="#8B5CF6" />
            <rect   x="38"   y="208" width="52" height="20" rx="10" fill="#8B5CF6" />
            <circle cx="34"  cy="218" r="12" fill="#FFBB52" />

            {/* Right arm */}
            <circle cx="232" cy="218" r="14" fill="#8B5CF6" />
            <rect   x="230"  y="208" width="52" height="20" rx="10" fill="#8B5CF6" />
            <circle cx="286" cy="218" r="12" fill="#FFBB52" />

            {/* Legs */}
            <rect x="118" y="286" width="24" height="36" rx="12" fill="#263238" />
            <rect x="178" y="286" width="24" height="36" rx="12" fill="#263238" />

            {/* Feet */}
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="#8B5CF6" />
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="#8B5CF6" />

            {/* Floating stars */}
            <g className="rbt4-glow">
              <polygon points="66,82 70,90 79,90 72,96 75,105 66,100 57,105 60,96 53,90 62,90" fill="#FFD93D" />
              <polygon points="252,94 256,102 265,102 258,108 261,117 252,112 243,117 246,108 239,102 248,102" fill="#FFD93D" />
            </g>

            {/* Label */}
            <text x="160" y="358" fontSize="20" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#FFFFFF" textAnchor="middle" stroke="#6D28D9" strokeWidth="3" paintOrder="stroke">AYAT PANJANG</text>
          </g>
        </svg>
      );
    default:
      return null;
  }
};

export default function ReadingPage({ onBack, language }) {
  // ── State ─────────────────────────────────────────────────────────────
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scriptType, setScriptType] = useState('RUMI'); // 'RUMI', 'JAWI', or 'ENG'
  const [showHelp, setShowHelp] = useState(false);
  const [activeSyllable, setActiveSyllable] = useState(null);
  const [displayHearts, setDisplayHearts] = useState(3);
  const [displayGems, setDisplayGems] = useState(0);
  const [displayStars, setDisplayStars] = useState(0);

  const gameState = useGameStateContext();

  // Load game stats
  useEffect(() => {
    const gameData = getGameData();
    setDisplayHearts(gameData.hearts);
    setDisplayGems(gameData.gems);
    setDisplayStars(gameData.stars);
  }, []);

  // Global Styles — must be declared before any early returns to obey Rules of Hooks
  const globalStyles = useMemo(() => `
    @keyframes floaty { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(-6px) rotate(2deg); } }
    @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
    @keyframes nudge { 0%,90%,100% { transform: rotate(-1deg); } 45% { transform: rotate(1deg); } }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.15); opacity: 0.8; } }

    svg .bob1 { animation: bob 2.2s ease-in-out infinite; }
    svg .bob2 { animation: bob 2.2s ease-in-out infinite 0.6s; }

    * { box-sizing: border-box; }

    /* Tile illustration container (sized to fit inside .rp-illo band) */
    .tile-illustration {
      width: 110px;
      height: 90px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 560px) {
      .tile-illustration {
        width: 95px;
        height: 80px;
      }
    }

    /* Illustration blocks (Ba, Ca, Ma, kan) */
    .tile-block-lg { width: 45px; height: 45px; }
    .tile-block-md { width: 42px; height: 42px; }

    @media (max-width: 560px) {
      .tile-block-lg { width: 38px; height: 38px; }
      .tile-block-md { width: 36px; height: 36px; }
    }

    /* Responsive Flashcard */
    .flashcard-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .flashcard-box {
      width: 100%;
      max-width: 500px;
      border-radius: 28px;
      padding: 3rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 380px;
      justify-content: center;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      .flashcard-box {
        max-width: 100%;
        padding: 2rem 1.5rem;
        min-height: 320px;
      }
    }

    @media (max-width: 480px) {
      .flashcard-box {
        padding: 1.5rem 1rem;
        min-height: 280px;
      }
    }

    /* Responsive Controls */
    .nav-controls {
      display: flex;
      gap: 0.75rem;
      margin-top: 1rem;
      align-items: center;
      flex-wrap: wrap;
    }

    @media (max-width: 480px) {
      .nav-controls {
        gap: 0.5rem;
      }
    }

    /* Mobile: Full width, no side padding */
    @media (max-width: 768px) {
      body, html {
        overflow-x: hidden;
      }
    }

    /* Landscape orientation on mobile */
    @media (orientation: landscape) and (max-height: 500px) {
      body, html {
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden;
        width: 100% !important;
      }
      .reading-page-wrapper {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .landscape-content {
        padding: 0 !important;
        width: 100% !important;
        margin: 0 !important;
      }
    }
  `, []);

  // ── Route Tahap 1 → dedicated KV page ─────────────────────────────────
  if (selectedLevel === 1) {
    return <KVLearningPage onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Route Tahap 2 → dedicated KVK page ────────────────────────────────
  if (selectedLevel === 2) {
    return <KVKLearningPage onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Derived Data ──────────────────────────────────────────────────────
  const currentLevelData = selectedLevel
    ? readingData.filter(item => item.level === selectedLevel)
    : [];

  const currentItem = currentLevelData[currentIndex] || null;

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleSelectLevel = (level) => {
    playHoverSound();
    setSelectedLevel(level);
    setCurrentIndex(0);
    setScriptType('RUMI');
    setShowHelp(false);
    setActiveSyllable(null);
  };

  const handleNext = () => {
    if (currentIndex < currentLevelData.length - 1) {
      playHoverSound();
      setCurrentIndex(prev => prev + 1);
      setShowHelp(false);
      setActiveSyllable(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playHoverSound();
      setCurrentIndex(prev => prev - 1);
      setShowHelp(false);
      setActiveSyllable(null);
    }
  };

  const handleVolumeClick = () => {
    playHoverSound();
    const speakText = scriptType === 'ENG' ? currentItem?.eng : currentItem?.rumi.replace(/-/g, '');
    const lang = scriptType === 'ENG' ? 'en-US' : 'ms-MY';
    SpeechManager.speak(speakText, lang);
    setShowHelp(true);
  };

  const handleSyllableClick = (index, text) => {
    playHoverSound();
    SpeechManager.speak(text, 'ms-MY');
    setActiveSyllable(index);
  };

  // Memoize SVG illustrations — each is ~100 React elements; never needs to change
  const tileIllustrations = useMemo(() => ({
    1: getTileIllustration(1),
    2: getTileIllustration(2),
    3: getTileIllustration(3),
    4: getTileIllustration(4),
  }), []);

  // View: Level Selection
  if (!selectedLevel) {
    const levelData = [
      { level: 1, num: 1, capTitle: language === 'bm' ? 'Suku Kata KV'  : 'KV Syllables'   },
      { level: 2, num: 2, capTitle: language === 'bm' ? 'Suku Kata KVK' : 'KVK Syllables'  },
      { level: 3, num: 3, capTitle: language === 'bm' ? 'Baca Perkataan': 'Read Words'     },
      { level: 4, num: 4, capTitle: language === 'bm' ? 'Baca Ayat'     : 'Read Sentences' },
    ];

    const heroSubtitle = language === 'bm'
      ? 'Dari suku kata ke ayat penuh — satu langkah pada satu masa!'
      : 'From syllables to full sentences — one step at a time!';

    const hintContent = (
      <>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFD60A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
        {language === 'bm' ? 'Pilih tahap untuk mula belajar!' : 'Pick a level to start learning!'}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF1F7A"><path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>
      </>
    );

    const gridTiles = levelData.map((lvl) => (
      <button
        key={lvl.level}
        className={`rp-tile level-${lvl.level}`}
        onClick={() => handleSelectLevel(lvl.level)}
        onMouseEnter={playHoverSound}
        type="button"
      >
        <span className="rp-tile-num">{lvl.num}</span>

        <span className="rp-spark s1" style={{ top:'24%', left:'14%' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z"/></svg>
        </span>
        <span className="rp-spark s2" style={{ top:'30%', right:'14%' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="10"/></svg>
        </span>
        <span className="rp-spark s3" style={{ bottom:'38%', right:'14%' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,.7)"><circle cx="12" cy="12" r="10"/></svg>
        </span>

        <div className="rp-illo">
          {tileIllustrations[lvl.level]}
        </div>

      </button>
    ));

    return (
      <>
        <style>{globalStyles}</style>
        <PageLayout
          classPrefix="rp"
          heroIcon={<OpenBookIcon size={72} />}
          heroTitle={language === 'bm' ? 'Belajar Membaca' : 'Learn to Read'}
          heroSubtitle={heroSubtitle}
          sectionLabel={language === 'bm' ? 'Pilih Tahap' : 'Choose Level'}
          hintText={hintContent}
          onBack={onBack}
        >
          {gridTiles}
        </PageLayout>
      </>
    );
  }

  // View: Flashcard Interface
  const theme = getTheme(selectedLevel);
  return (
    <div className="reading-page-wrapper" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: DESIGN_SYSTEM.colors.bg, position: 'relative' }}>
      <style>{globalStyles}</style>

      {/* Back Button - Top Left */}
      <button
        type="button"
        onClick={() => setSelectedLevel(null)}
        style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#fff', border: `2px solid ${DESIGN_SYSTEM.colors.hair}`, borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: DESIGN_SYSTEM.colors.muted, cursor: 'pointer', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`, transition: 'transform .12s', zIndex: 10 }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        <ArrowLeft size={24} />
      </button>

      {/* Main Content - Single Scrollable Container */}
      <div className="landscape-content" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: 'clamp(0.5rem, 2vw, 1rem)', width: '100%', boxSizing: 'border-box', maxWidth: '100%' }}>

        {/* Script Buttons - Inside Content */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '2rem' }}>
          {SCRIPTS.map(script => (
            <button
              type="button"
              key={script.key}
              onClick={() => { playHoverSound(); setScriptType(script.key); setActiveSyllable(null); setShowHelp(false); }}
              style={{
                background: scriptType === script.key ? script.color : '#fff',
                color: scriptType === script.key ? '#fff' : script.color,
                border: `2px solid ${script.color}`,
                borderRadius: '12px',
                padding: '6px 16px',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: scriptType === script.key ? `0 4px 0 ${script.color}` : 'none',
              }}
            >
              {script.label}
            </button>
          ))}
        </div>

        {/* Flashcard Box */}
        <div className="flashcard-box" style={{
          background: '#fff',
          boxShadow: `0 12px 0 ${theme.shadow}, 0 22px 28px -10px rgba(0,0,0,.22)`, position: 'relative',
        }}>

          {/* Sound Button */}
          <button
            type="button"
            onClick={handleVolumeClick}
            title="Read Full Text"
            style={{ position: 'absolute', top: 16, right: 16, background: '#f0f0f0', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.color, cursor: 'pointer', transition: 'transform 0.1s', boxShadow: `0 3px 0 ${DESIGN_SYSTEM.colors.hair}` }}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.9)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Volume2 size={24} />
          </button>

          <span style={{ fontSize: '5rem', marginBottom: '1.5rem', animation: 'floaty 3.6s ease-in-out infinite' }}>
            {currentItem?.emoji}
          </span>

          {/* Rumi / Syllables Display */}
          {scriptType === 'RUMI' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px' }}>
              {currentItem?.syllables.map((syl, i) => {
                const cleanSyl = syl.trim();
                const isActive = activeSyllable === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSyllableClick(i, cleanSyl)}
                    style={{
                      background: isActive ? theme.color : '#fff',
                      color: isActive ? '#fff' : DESIGN_SYSTEM.colors.ink,
                      border: `2px solid ${theme.color}`,
                      borderRadius: '18px',
                      padding: '14px 24px',
                      fontSize: '1.8rem',
                      fontWeight: 900,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: isActive ? `0 6px 12px ${theme.color}40` : `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`,
                    }}
                  >
                    {cleanSyl}
                  </button>
                )
              })}
            </div>
          )}

          {/* Jawi Display */}
          {scriptType === 'JAWI' && (
            <button
              type="button"
              onClick={() => {
                playHoverSound();
                SpeechManager.speak(currentItem?.rumi.replace(/-/g, ''), 'ms-MY');
                setActiveSyllable(0);
              }}
              style={{
                fontSize: '3.5rem', fontWeight: 900,
                color: activeSyllable === 0 ? '#fff' : DESIGN_SYSTEM.colors.ink,
                direction: 'rtl', fontFamily: '"Lateef", serif', lineHeight: 1.5,
                textAlign: 'center',
                background: activeSyllable === 0 ? theme.color : '#fff',
                border: `2px solid ${theme.color}`,
                borderRadius: '20px', padding: '16px 28px', cursor: 'pointer', width: '100%',
                transition: 'all 0.15s ease',
                transform: activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeSyllable === 0 ? `0 6px 12px ${theme.color}40` : `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)'}
            >
              {currentItem?.jawi}
            </button>
          )}

          {/* English Display */}
          {scriptType === 'ENG' && (
            <button
              type="button"
              onClick={() => {
                playHoverSound();
                SpeechManager.speak(currentItem?.eng, 'en-US');
                setActiveSyllable(0);
              }}
              style={{
                fontSize: '2.8rem', fontWeight: 900,
                color: activeSyllable === 0 ? '#fff' : DESIGN_SYSTEM.colors.ink,
                textAlign: 'center', lineHeight: 1.3,
                background: activeSyllable === 0 ? theme.color : '#fff',
                border: `2px solid ${theme.color}`,
                borderRadius: '20px', padding: '16px 28px', cursor: 'pointer', width: '100%',
                transition: 'all 0.15s ease',
                transform: activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)',
                boxShadow: activeSyllable === 0 ? `0 6px 12px ${theme.color}40` : `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`
              }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={e => e.currentTarget.style.transform = activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)'}
              onMouseLeave={e => e.currentTarget.style.transform = activeSyllable === 0 ? 'scale(1.05)' : 'scale(1)'}
            >
              {currentItem?.eng}
            </button>
          )}

          {/* Helper Drawer (Translation + Phonetics) */}
          {showHelp && (
            <div style={{ marginTop: '2rem', width: '100%', background: theme.bg, borderRadius: '18px', border: `2px solid ${theme.color}`, padding: '1.2rem', textAlign: 'center', animation: 'modalFadeIn 0.2s ease-out' }}>
              <div style={{ color: theme.color, fontWeight: 900, fontSize: '1.2rem', marginBottom: '6px' }}>
                {currentItem?.eng}
              </div>
              <div style={{ color: DESIGN_SYSTEM.colors.muted, fontWeight: 700, fontSize: '0.95rem' }}>
                🗣️ "{currentItem?.phonetic}"
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="nav-controls">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            width: '44px', height: '44px', borderRadius: '14px', border: '0',
            background: currentIndex === 0 ? '#E5E5E5' : '#fff',
            color: DESIGN_SYSTEM.colors.muted,
            fontWeight: 900, fontSize: '1.2rem', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            boxShadow: currentIndex === 0 ? 'none' : `0 3px 0 ${DESIGN_SYSTEM.colors.hair}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            transition: 'transform .12s'
          }}
          onMouseEnter={(e) => { if (currentIndex > 0) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {'<'}
        </button>

        {/* Listen Button */}
        <button
          type="button"
          onClick={handleVolumeClick}
          style={{
            flex: 1, padding: '0.9rem 1.2rem', borderRadius: '16px',
            border: `2px solid ${theme.color}`,
            background: '#fff', color: theme.color, fontWeight: 900, fontSize: '1rem',
            cursor: 'pointer', boxShadow: `0 4px 0 ${theme.shadow}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            transition: 'transform .12s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          <Volume2 size={20} />
          {language === 'bm' ? 'Dengar' : 'Listen'}
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === currentLevelData.length - 1}
          style={{
            flex: 1, padding: '0.9rem 1.2rem', borderRadius: '16px', border: 'none',
            background: currentIndex === currentLevelData.length - 1 ? '#E5E5E5' : theme.color,
            color: '#fff', fontWeight: 900, fontSize: '1rem',
            cursor: currentIndex === currentLevelData.length - 1 ? 'not-allowed' : 'pointer',
            boxShadow: currentIndex === currentLevelData.length - 1 ? 'none' : `0 4px 0 ${theme.darkColor}`,
            transition: 'transform .12s'
          }}
          onMouseEnter={(e) => { if (currentIndex < currentLevelData.length - 1) e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          {language === 'bm' ? 'Seterusnya' : 'Next'} {'>'}
        </button>
      </div>

    </div>
  );
}
