import React, { useState, useEffect, useMemo } from 'react';
import './ReadingPage.css';
import { Play } from 'lucide-react';
import { playHoverSound } from '../../utils/soundManager';
import { useGameStateContext } from '../../App';
import { getGameData } from '../../utils/gameStatsManager';
import KVLearningPage from './KVLearningPage';
import KVKLearningPage from './KVKLearningPage';
import { OpenBookIcon } from '../icons/GameIcons';
import PageLayout from '../PageLayout';
import LearnWords from './LearnWords';
import LongSentences from './LongSentences';

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

// ── Level tile SVG illustrations ────────────────────────────────────────────
const getTileIllustration = (level, language) => {
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
              <stop offset="0%"  stopColor="#B8FFE0" />
              <stop offset="100%" stopColor="#00C875" />
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

            {/* Left and Right Arms */}
            <g className="rbt1-wave">
              {/* Left Arm */}
              <ellipse cx="60" cy="220" rx="18" ry="28" fill="url(#rbt1Body)" transform="rotate(-15 60 220)" filter="url(#rbt1Shadow)"/>
              <ellipse cx="60" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(-15 60 220)"/>

              {/* Right Arm */}
              <ellipse cx="260" cy="220" rx="18" ry="28" fill="url(#rbt1Body)" transform="rotate(15 260 220)" filter="url(#rbt1Shadow)"/>
              <ellipse cx="260" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(15 260 220)"/>
            </g>

            {/* Legs */}
            <rect x="118" y="286" width="24" height="36" rx="12" fill="#263238" />
            <rect x="178" y="286" width="24" height="36" rx="12" fill="#263238" />

            {/* Feet */}
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="url(#rbt1Body)" filter="url(#rbt1Shadow)"/>
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="none" stroke="#f0f0f0" strokeWidth="2"/>
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="url(#rbt1Body)" filter="url(#rbt1Shadow)"/>
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

            {/* Floating stars */}
            <g className="rbt1-glow">
              <polygon points="66,82 70,90 79,90 72,96 75,105 66,100 57,105 60,96 53,90 62,90" fill="#FFD93D" />
              <polygon points="252,94 256,102 265,102 258,108 261,117 252,112 243,117 246,108 239,102 248,102" fill="#FFD93D" />
            </g>

            {/* Label */}
            <text x="160" y="358" fontSize="22" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fill="#FFFFFF" textAnchor="middle" stroke="#15803D" strokeWidth="3" paintOrder="stroke" letterSpacing="1">{language === 'bm' ? 'BELAJAR KV' : 'LEARN KV'}</text>
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

            {/* Left and Right Arms */}
            <g className="rbt2-wave">
              {/* Left Arm */}
              <ellipse cx="60" cy="220" rx="18" ry="28" fill="url(#rbt2Body)" transform="rotate(-15 60 220)" filter="url(#rbt2Shadow)"/>
              <ellipse cx="60" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(-15 60 220)"/>

              {/* Right Arm */}
              <ellipse cx="260" cy="220" rx="18" ry="28" fill="url(#rbt2Body)" transform="rotate(15 260 220)" filter="url(#rbt2Shadow)"/>
              <ellipse cx="260" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(15 260 220)"/>
            </g>

            {/* Legs */}
            <rect x="118" y="286" width="24" height="36" rx="12" fill="#263238" />
            <rect x="178" y="286" width="24" height="36" rx="12" fill="#263238" />

            {/* Feet */}
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="url(#rbt2Body)" filter="url(#rbt2Shadow)"/>
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="none" stroke="#f0f0f0" strokeWidth="2"/>
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="url(#rbt2Body)" filter="url(#rbt2Shadow)"/>
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

            {/* Floating stars */}
            <g className="rbt2-glow">
              <polygon points="66,82 70,90 79,90 72,96 75,105 66,100 57,105 60,96 53,90 62,90" fill="#FFD93D" />
              <polygon points="252,94 256,102 265,102 258,108 261,117 252,112 243,117 246,108 239,102 248,102" fill="#FFD93D" />
            </g>

            {/* Label */}
            <text x="160" y="358" fontSize="22" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fill="#FFFFFF" textAnchor="middle" stroke="#9A3412" strokeWidth="3" paintOrder="stroke" letterSpacing="1">{language === 'bm' ? 'BELAJAR KVK' : 'LEARN KVK'}</text>
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
              <stop offset="0%"   stopColor="#B8F7FF" />
              <stop offset="100%" stopColor="#3CCBFF" />
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

            {/* Left and Right Arms */}
            <g className="rbt3-wave">
              {/* Left Arm */}
              <ellipse cx="60" cy="220" rx="18" ry="28" fill="url(#rbt3Body)" transform="rotate(-15 60 220)" filter="url(#rbt3Shadow)"/>
              <ellipse cx="60" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(-15 60 220)"/>

              {/* Right Arm */}
              <ellipse cx="260" cy="220" rx="18" ry="28" fill="url(#rbt3Body)" transform="rotate(15 260 220)" filter="url(#rbt3Shadow)"/>
              <ellipse cx="260" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(15 260 220)"/>
            </g>

            {/* Legs */}
            <rect x="118" y="286" width="24" height="36" rx="12" fill="#263238" />
            <rect x="178" y="286" width="24" height="36" rx="12" fill="#263238" />

            {/* Feet */}
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="url(#rbt3Body)" filter="url(#rbt3Shadow)"/>
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="none" stroke="#f0f0f0" strokeWidth="2"/>
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="url(#rbt3Body)" filter="url(#rbt3Shadow)"/>
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

            {/* Floating stars */}
            <g className="rbt3-glow">
              <polygon points="66,82 70,90 79,90 72,96 75,105 66,100 57,105 60,96 53,90 62,90" fill="#FFD93D" />
              <polygon points="252,94 256,102 265,102 258,108 261,117 252,112 243,117 246,108 239,102 248,102" fill="#FFD93D" />
            </g>

            {/* Label */}
            <text x="160" y="358" fontSize="22" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fill="#FFFFFF" textAnchor="middle" stroke="#0891B2" strokeWidth="3" paintOrder="stroke" letterSpacing="1">{language === 'bm' ? 'BELAJAR KATA' : 'LEARN WORDS'}</text>
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
              <stop offset="0%"  stopColor="#E0C7FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
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
            <text x="160" y="234" fontSize="13" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#FFFFFF" textAnchor="middle">{language === 'bm' ? 'cerita' : 'my'}</text>
            <text x="160" y="248" fontSize="13" fontFamily="Fredoka, sans-serif" fontWeight="700" fill="#6EE7FF" textAnchor="middle">{language === 'bm' ? 'saya' : 'story'}</text>

            {/* Buttons */}
            <circle cx="132" cy="266" r="6" fill="#FF5E7E" />
            <circle cx="160" cy="266" r="6" fill="#6EE7FF" />
            <circle cx="188" cy="266" r="6" fill="#6BFF95" />

            {/* Left and Right Arms */}
            <g className="rbt4-wave">
              {/* Left Arm */}
              <ellipse cx="60" cy="220" rx="18" ry="28" fill="url(#rbt4Body)" transform="rotate(-15 60 220)" filter="url(#rbt4Shadow)"/>
              <ellipse cx="60" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(-15 60 220)"/>

              {/* Right Arm */}
              <ellipse cx="260" cy="220" rx="18" ry="28" fill="url(#rbt4Body)" transform="rotate(15 260 220)" filter="url(#rbt4Shadow)"/>
              <ellipse cx="260" cy="220" rx="18" ry="28" fill="none" stroke="#f0f0f0" strokeWidth="2" transform="rotate(15 260 220)"/>
            </g>

            {/* Legs */}
            <rect x="118" y="286" width="24" height="36" rx="12" fill="#263238" />
            <rect x="178" y="286" width="24" height="36" rx="12" fill="#263238" />

            {/* Feet */}
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="url(#rbt4Body)" filter="url(#rbt4Shadow)"/>
            <ellipse cx="130" cy="322" rx="22" ry="10" fill="none" stroke="#f0f0f0" strokeWidth="2"/>
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="url(#rbt4Body)" filter="url(#rbt4Shadow)"/>
            <ellipse cx="190" cy="322" rx="22" ry="10" fill="none" stroke="#f0f0f0" strokeWidth="2"/>

            {/* Floating stars */}
            <g className="rbt4-glow">
              <polygon points="66,82 70,90 79,90 72,96 75,105 66,100 57,105 60,96 53,90 62,90" fill="#FFD93D" />
              <polygon points="252,94 256,102 265,102 258,108 261,117 252,112 243,117 246,108 239,102 248,102" fill="#FFD93D" />
            </g>

            {/* Label */}
            <text x="160" y="358" fontSize="22" fontFamily="'Baloo 2', sans-serif" fontWeight="800" fill="#FFFFFF" textAnchor="middle" stroke="#6D28D9" strokeWidth="3" paintOrder="stroke" letterSpacing="1">{language === 'bm' ? 'AYAT PANJANG' : 'LONG SENTENCES'}</text>
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

    /* Robot arm waving animations */
    svg .rbt1-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }
    svg .rbt2-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }
    svg .rbt3-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }
    svg .rbt4-wave { animation: nudge 0.8s ease-in-out infinite; transform-origin: 160px 220px; }

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

  // Memoize SVG illustrations — update when language changes
  const tileIllustrations = useMemo(() => ({
    1: getTileIllustration(1, language),
    2: getTileIllustration(2, language),
    3: getTileIllustration(3, language),
    4: getTileIllustration(4, language),
  }), [language]);

  // ── Route Tahap 1 → dedicated KV page ─────────────────────────────────
  if (selectedLevel === 1) {
    return <KVLearningPage onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Route Tahap 2 → dedicated KVK page ────────────────────────────────
  if (selectedLevel === 2) {
    return <KVKLearningPage onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Route Tahap 3 → dedicated Kata page ────────────────────────────────
  if (selectedLevel === 3) {
    return <LearnWords onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Route Tahap 4 → dedicated Ayat Panjang page ─────────────────────────
  if (selectedLevel === 4) {
    return <LongSentences onBack={() => setSelectedLevel(null)} language={language} />;
  }

  // ── Handler ───────────────────────────────────────────────────────────
  const handleSelectLevel = (level) => {
    playHoverSound();
    setSelectedLevel(level);
  };

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
}
