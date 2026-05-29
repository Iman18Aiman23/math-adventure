import './robots.css';

/**
 * Renders shared SVG gradients, filters, and reusable symbols used by all robot components.
 * Must be rendered once somewhere in the app (e.g. at root level) before using any robot.
 */
export default function RobotDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        {/* ── Gradients ── */}
        <linearGradient id="gHead" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="55%" stopColor="#F0F4F9"/>
          <stop offset="100%" stopColor="#C9D4E0"/>
        </linearGradient>
        <linearGradient id="gBody" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="60%" stopColor="#EAF0F7"/>
          <stop offset="100%" stopColor="#B6C5D6"/>
        </linearGradient>
        <linearGradient id="gBodyDark" x1="0%" y1="50%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(16,36,58,.3)"/>
        </linearGradient>
        <radialGradient id="gScreen" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#2B3344"/>
          <stop offset="55%" stopColor="#141A26"/>
          <stop offset="100%" stopColor="#070A12"/>
        </radialGradient>
        <linearGradient id="gChrome" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5F7FA"/>
          <stop offset="40%" stopColor="#D5DCE6"/>
          <stop offset="100%" stopColor="#7C8A9E"/>
        </linearGradient>
        <radialGradient id="gEye" cx="38%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#E4FBFF"/>
          <stop offset="40%" stopColor="#7BE7FF"/>
          <stop offset="100%" stopColor="#1FB0E4"/>
        </radialGradient>
        <radialGradient id="gCyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7BE7FF"/>
          <stop offset="100%" stopColor="rgba(123,231,255,0)"/>
        </radialGradient>
        <linearGradient id="gGold" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF1A8"/>
          <stop offset="50%" stopColor="#FFC107"/>
          <stop offset="100%" stopColor="#8F5300"/>
        </linearGradient>
        <radialGradient id="gBulb" cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFFFFF"/>
          <stop offset="55%" stopColor="#FFE066"/>
          <stop offset="100%" stopColor="#E89A1A"/>
        </radialGradient>
        <linearGradient id="gBookL" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF8B95"/><stop offset="100%" stopColor="#D32A2A"/>
        </linearGradient>
        <linearGradient id="gBookR" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#86E0BA"/><stop offset="100%" stopColor="#1F8A5B"/>
        </linearGradient>
        <linearGradient id="gPage" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFEF4"/><stop offset="100%" stopColor="#FFE5A6"/>
        </linearGradient>
        <linearGradient id="gCape" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6FB5"/><stop offset="100%" stopColor="#9013FE"/>
        </linearGradient>
        <linearGradient id="gTablet" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A3A5C"/><stop offset="100%" stopColor="#06192C"/>
        </linearGradient>
        <linearGradient id="gFlame" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE066"/>
          <stop offset="40%" stopColor="#FF8A1F"/>
          <stop offset="100%" stopColor="#FF3C2F"/>
        </linearGradient>
        <linearGradient id="gObL" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF1D2"/><stop offset="100%" stopColor="#FFD699"/>
        </linearGradient>
        <linearGradient id="gObR" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE2A6"/><stop offset="100%" stopColor="#FF9600"/>
        </linearGradient>

        {/* ── Filters ── */}
        <filter id="fShadow" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity="0.18" floodColor="#10243A"/>
        </filter>
        <filter id="fShadowSoft" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.15" floodColor="#10243A"/>
        </filter>
        <filter id="fGlow" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="1.8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="fBigGlow" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        {/* ── Reusable robot HEAD only (head shape + antenna + ears, NO body) ── */}
        <symbol id="robotHead" viewBox="0 0 360 240">
          {/* Antenna */}
          <g>
            <line x1="180" y1="58" x2="180" y2="34" stroke="#A8B5C5" strokeWidth="5" strokeLinecap="round"/>
            <circle cx="180" cy="28" r="9" fill="url(#gCyan)" opacity=".55"/>
            <circle cx="180" cy="28" r="6" fill="#7BE7FF"/>
            <circle cx="178" cy="26" r="2.5" fill="#fff"/>
          </g>
          {/* Left ear */}
          <g filter="url(#fShadowSoft)">
            <rect x="84" y="135" width="14" height="32" rx="6" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
            <circle cx="91" cy="151" r="4" fill="#46D8FF"/>
            <circle cx="91" cy="151" r="1.5" fill="#fff"/>
          </g>
          {/* Right ear */}
          <g filter="url(#fShadowSoft)">
            <rect x="262" y="135" width="14" height="32" rx="6" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
            <circle cx="269" cy="151" r="4" fill="#46D8FF"/>
            <circle cx="269" cy="151" r="1.5" fill="#fff"/>
          </g>
          {/* Head shape with screen */}
          <g filter="url(#fShadow)">
            <path d="M98 110 Q98 64 138 60 Q150 38 164 56 Q180 60 196 56 Q210 38 222 60 Q262 64 262 110 L262 200 Q262 232 222 234 L138 234 Q98 232 98 200 Z" fill="url(#gHead)"/>
            <path d="M108 110q0-38 32-42 q12-18 22-2 q18 6 36 0 q10-16 22 2 q32 4 32 42 q-50 -22 -144 0z" fill="#FFFFFF" opacity=".55"/>
            <path d="M108 210q14 22 72 22 t72 -22 q-72 18 -144 0z" fill="rgba(16,36,58,.18)"/>
            <rect x="118" y="92" width="124" height="124" rx="34" fill="url(#gScreen)"/>
            <path d="M130 102 Q180 86 230 104 L230 116 Q180 100 130 116 Z" fill="#FFFFFF" opacity="0.12"/>
            <ellipse cx="226" cy="200" rx="12" ry="6" fill="#fff" opacity=".08"/>
          </g>
        </symbol>

        {/* ── Reusable robot base (head + neck + body + antenna + ears) ── */}
        <symbol id="robotBase" viewBox="0 0 360 400">
          <ellipse cx="180" cy="378" rx="90" ry="10" fill="rgba(16,36,58,.35)"/>
          <g>
            <line x1="180" y1="58" x2="180" y2="34" stroke="#A8B5C5" strokeWidth="5" strokeLinecap="round"/>
            <circle cx="180" cy="28" r="9" fill="url(#gCyan)" opacity=".55"/>
            <circle cx="180" cy="28" r="6" fill="#7BE7FF"/>
            <circle cx="178" cy="26" r="2.5" fill="#fff"/>
          </g>
          <g filter="url(#fShadowSoft)">
            <rect x="84" y="135" width="14" height="32" rx="6" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
            <circle cx="91" cy="151" r="4" fill="#46D8FF"/>
            <circle cx="91" cy="151" r="1.5" fill="#fff"/>
          </g>
          <g filter="url(#fShadowSoft)">
            <rect x="262" y="135" width="14" height="32" rx="6" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5"/>
            <circle cx="269" cy="151" r="4" fill="#46D8FF"/>
            <circle cx="269" cy="151" r="1.5" fill="#fff"/>
          </g>
          <g filter="url(#fShadow)">
            <path d="M98 110 Q98 64 138 60 Q150 38 164 56 Q180 60 196 56 Q210 38 222 60 Q262 64 262 110 L262 200 Q262 232 222 234 L138 234 Q98 232 98 200 Z" fill="url(#gHead)"/>
            <path d="M108 110q0-38 32-42 q12-18 22-2 q18 6 36 0 q10-16 22 2 q32 4 32 42 q-50 -22 -144 0z" fill="#FFFFFF" opacity=".55"/>
            <path d="M108 210q14 22 72 22 t72 -22 q-72 18 -144 0z" fill="rgba(16,36,58,.18)"/>
            <rect x="118" y="92" width="124" height="124" rx="34" fill="url(#gScreen)"/>
            <path d="M130 102 Q180 86 230 104 L230 116 Q180 100 130 116 Z" fill="#FFFFFF" opacity="0.12"/>
            <ellipse cx="226" cy="200" rx="12" ry="6" fill="#fff" opacity=".08"/>
          </g>
          <g>
            <rect x="148" y="232" width="64" height="14" rx="6" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.2"/>
            <rect x="148" y="234" width="64" height="3" fill="#fff" opacity=".7"/>
          </g>
          <g filter="url(#fShadow)">
            <path d="M132 246 Q180 224 228 246 L238 332 Q238 366 180 372 Q122 366 122 332 Z" fill="url(#gBody)"/>
            <ellipse cx="158" cy="276" rx="20" ry="40" fill="#fff" opacity=".5"/>
            <path d="M122 332 Q180 372 238 332 L238 360 Q180 378 122 360 Z" fill="url(#gBodyDark)"/>
            <path d="M180 246 v122" stroke="#fff" strokeWidth="1.2" opacity=".4"/>
          </g>
        </symbol>

        {/* ── Reusable sparkly eyes ── */}
        <symbol id="eyesHappy" viewBox="-60 -30 120 60">
          <g className="rb-blink">
            <circle cx="-26" cy="0" r="18" fill="url(#gCyan)" opacity=".55"/>
            <ellipse cx="-26" cy="0" rx="15" ry="16" fill="url(#gEye)" filter="url(#fGlow)"/>
            <ellipse cx="-26" cy="0" rx="9" ry="9" fill="#0E2A3D"/>
            <circle cx="-29" cy="-4" r="4" fill="#fff"/>
            <circle cx="-22" cy="4" r="1.8" fill="#fff" opacity=".8"/>
            <path d="M-19 -8l.8 2 2 .4-2 .8-.8 2-.8-2-2-.8 2-.4z" fill="#fff"/>
            <circle cx="26" cy="0" r="18" fill="url(#gCyan)" opacity=".55"/>
            <ellipse cx="26" cy="0" rx="15" ry="16" fill="url(#gEye)" filter="url(#fGlow)"/>
            <ellipse cx="26" cy="0" rx="9" ry="9" fill="#0E2A3D"/>
            <circle cx="23" cy="-4" r="4" fill="#fff"/>
            <circle cx="30" cy="4" r="1.8" fill="#fff" opacity=".8"/>
            <path d="M33 -8l.8 2 2 .4-2 .8-.8 2-.8-2-2-.8 2-.4z" fill="#fff"/>
          </g>
        </symbol>

        {/* ── Mechanical mitten hand ── */}
        <g id="rHand">
          <ellipse cx="0" cy="-15" rx="10" ry="4.5" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.3"/>
          <rect x="-8" y="-16.5" width="16" height="2.5" fill="#fff" opacity=".55"/>
          <circle cx="-7" cy="-15" r="1" fill="#46D8FF"/>
          <circle cx="7" cy="-15" r="1" fill="#46D8FF"/>
          <ellipse cx="-13" cy="-2" rx="4.5" ry="6.5" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1.3" transform="rotate(-30 -13 -2)"/>
          <ellipse cx="-15" cy="-4" rx="1.4" ry="3.5" fill="#fff" opacity=".55" transform="rotate(-30 -15 -4)"/>
          <path d="M-12 -11 Q-14 0 -11 9 Q-5 14 0 14 Q5 14 11 9 Q14 0 12 -11 Q0 -14 -12 -11 Z" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1.5"/>
          <g stroke="#C9D4E0" strokeWidth="1" fill="none" opacity=".55">
            <path d="M-6 4 Q-7 9 -7 12"/>
            <path d="M-2 5 Q-2 10 -2 13"/>
            <path d="M3 5 Q3 10 3 13"/>
            <path d="M7 4 Q8 9 8 12"/>
          </g>
          <path d="M-9 3 Q0 0 9 3" stroke="#C9D4E0" strokeWidth="1" fill="none" opacity=".55"/>
          <ellipse cx="-4" cy="-4" rx="3.5" ry="6" fill="#fff" opacity=".6"/>
          <circle cx="1" cy="-2" r="2.2" fill="#46D8FF" opacity=".85"/>
          <circle cx="1" cy="-2" r=".9" fill="#fff" opacity=".7"/>
          <circle cx="-6" cy="-1" r=".9" fill="#0E2A3D" opacity=".4"/>
          <circle cx="-1" cy="-1" r=".9" fill="#0E2A3D" opacity=".4"/>
          <circle cx="4" cy="-1" r=".9" fill="#0E2A3D" opacity=".4"/>
          <circle cx="9" cy="-1" r=".9" fill="#0E2A3D" opacity=".4"/>
        </g>

        {/* ── Mechanical thumbs-up hand ── */}
        <g id="rThumbsUp">
          <ellipse cy="15" rx="10" ry="4.5" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.3"/>
          <rect x="-8" y="13.5" width="16" height="2.5" fill="#fff" opacity=".55"/>
          <circle cx="-8" cy="15" r="1" fill="#46D8FF"/>
          <circle cx="8" cy="15" r="1" fill="#46D8FF"/>
          <ellipse cx="-11" cy="-1" rx="3" ry="5" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1"/>
          <ellipse cx="-3" cy="-2" rx="3" ry="5" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1"/>
          <ellipse cx="5" cy="-2" rx="3" ry="5" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1"/>
          <ellipse cx="12" cy="-1" rx="3" ry="5" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1"/>
          <path d="M-13 -6 q13 -3 26 0 v15 q-13 3 -26 0 z" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1.4"/>
          <path d="M-11 -2q11 -2 22 0M-11 4q11 -2 22 0" stroke="#C9D4E0" strokeWidth="1" fill="none" opacity=".7"/>
          <ellipse cx="-5" cy="2" rx="3" ry="5" fill="#fff" opacity=".55"/>
          <circle cx="0" cy="3" r="1.6" fill="#46D8FF" opacity=".7"/>
          <rect x="-4.5" y="-13" width="9" height="9" rx="4" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1.3"/>
          <rect x="-4.5" y="-24" width="9" height="13" rx="4.5" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1.3"/>
          <circle cy="-12" r="1.2" fill="#0E2A3D" opacity=".5"/>
          <ellipse cx="-2" cy="-17" rx="1.5" ry="6" fill="#fff" opacity=".6"/>
          <ellipse cy="-22" rx="3" ry="1.4" fill="#fff" opacity=".55"/>
        </g>

        {/* ── Mechanical pointing hand ── */}
        <g id="rPoint">
          <ellipse cx="0" cy="-14" rx="10" ry="4.5" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.3"/>
          <rect x="-8" y="-15.5" width="16" height="2.5" fill="#fff" opacity=".55"/>
          <circle cx="-8" cy="-14" r="1" fill="#46D8FF"/>
          <circle cx="8" cy="-14" r="1" fill="#46D8FF"/>
          <ellipse cx="-9" cy="7" rx="3.2" ry="5" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1"/>
          <ellipse cx="-2" cy="9" rx="3.2" ry="5" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1"/>
          <ellipse cx="9" cy="7" rx="3.2" ry="5" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1"/>
          <ellipse cx="-12" cy="0" rx="3.5" ry="5" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1" transform="rotate(-20 -12 0)"/>
          <circle r="10.5" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1.4"/>
          <ellipse cx="-3" cy="-2" rx="3" ry="5" fill="#fff" opacity=".6"/>
          <circle r="1.8" fill="#46D8FF" opacity=".8"/>
          <circle r=".8" fill="#fff" opacity=".6"/>
          <rect x="-3" y="9" width="6" height="11" rx="3" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1.3"/>
          <rect x="-3" y="19" width="6" height="13" rx="3" fill="url(#gBody)" stroke="#C9D4E0" strokeWidth="1.3"/>
          <circle cy="18" r="1.2" fill="#0E2A3D" opacity=".5"/>
          <circle cy="26" r="1" fill="#0E2A3D" opacity=".4"/>
          <ellipse cx="-1.5" cy="24" rx="1.4" ry="8" fill="#fff" opacity=".55"/>
          <ellipse cy="31" rx="2.5" ry="1.2" fill="#fff" opacity=".55"/>
        </g>
      </defs>
    </svg>
  );
}
