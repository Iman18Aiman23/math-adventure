import '../SubjectRobots/robots.css';

export default function LeaderboardRobot({ className = '', style = {}, ...props }) {
  return (
    <svg viewBox="0 0 360 400" className={className} style={style} {...props}>
      <defs>
        <linearGradient id="lbRobotBoard" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#27C45A" />
          <stop offset="100%" stopColor="#0D8541" />
        </linearGradient>
        <linearGradient id="lbRobotPodium" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B8F18E" />
          <stop offset="100%" stopColor="#39B94F" />
        </linearGradient>
        <linearGradient id="lbRobotGold" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFF3A1" />
          <stop offset="45%" stopColor="#FFD54A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      <circle cx="180" cy="190" r="148" fill="#E6F8DF" opacity=".72" />
      <path d="M45 276h36v-34h38v-42h38" fill="none" stroke="#27B94F" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity=".1" />

      <g className="rb-pulseGlow">
        <path d="M54 95l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#FFD54A" />
        <path d="M306 82l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#22C55E" />
        <rect x="71" y="155" width="9" height="20" rx="3" fill="#58D68D" transform="rotate(-18 75 165)" />
        <rect x="294" y="172" width="9" height="20" rx="3" fill="#FFD54A" transform="rotate(20 299 182)" />
      </g>

      <g filter="url(#fShadowSoft)">
        <ellipse cx="180" cy="386" rx="80" ry="10" fill="#168A40" opacity=".22" />
        <rect x="112" y="364" width="136" height="22" rx="11" fill="url(#lbRobotPodium)" stroke="#169343" strokeWidth="2" />
        <ellipse cx="180" cy="364" rx="68" ry="9" fill="#D7F8BF" stroke="#5DCE62" strokeWidth="2" />
        <path d="M130 374h100" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity=".55" />
      </g>

      <g filter="url(#fShadow)">
        <circle cx="124" cy="264" r="14" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5" />
        <rect x="93" y="269" width="47" height="27" rx="13.5" fill="url(#gBody)" transform="rotate(-24 116 282)" />
        <rect x="72" y="293" width="38" height="25" rx="12.5" fill="url(#gBody)" transform="rotate(-42 91 306)" />
        <use href="#rHand" transform="translate(72 322) rotate(46)" />

        <circle cx="236" cy="264" r="14" fill="url(#gChrome)" stroke="#7C8A9E" strokeWidth="1.5" />
        <rect x="220" y="269" width="47" height="27" rx="13.5" fill="url(#gBody)" transform="rotate(24 244 282)" />
        <rect x="252" y="287" width="38" height="25" rx="12.5" fill="url(#gBody)" transform="rotate(35 271 300)" />
        <use href="#rHand" transform="translate(288 315) rotate(-38)" />
      </g>

      <use href="#robotBase" width="360" height="400" />

      <g transform="translate(180 65) rotate(-4)" filter="url(#fShadowSoft)">
        <path d="M-37 8L-30-17-12 0 0-24 13 0 31-17 38 8z" fill="url(#lbRobotGold)" stroke="#C98308" strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="-39" y="7" width="78" height="13" rx="6.5" fill="#F6B918" stroke="#B97706" strokeWidth="2" />
        <circle cx="0" cy="9" r="4" fill="#FFFFFF" opacity=".88" />
      </g>

      <g>
        <use href="#eyesHappy" x="120" y="130" width="120" height="60" />
        <path d="M151 196q29 27 58 0" fill="none" stroke="url(#gEye)" strokeWidth="6.5" strokeLinecap="round" filter="url(#fGlow)" />
        <ellipse cx="136" cy="196" rx="8" ry="5" fill="#FFB3C7" opacity=".48" />
        <ellipse cx="224" cy="196" rx="8" ry="5" fill="#FFB3C7" opacity=".48" />
      </g>

      <g transform="translate(180 310)" filter="url(#fShadowSoft)">
        <circle r="25" fill="#20B857" stroke="#0B7B38" strokeWidth="2" />
        <path d="M-10-10h20v7q0 12-10 15Q-10 9-10-3zm-1 2h-7v5q0 8 9 9M11-8h7v5q0 8-9 9M0 12v7M-8 20H8" fill="none" stroke="#FFF3A1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g transform="translate(64 316) rotate(-7)" filter="url(#fShadow)">
        <rect x="-38" y="-34" width="76" height="66" rx="11" fill="url(#lbRobotBoard)" stroke="#08713A" strokeWidth="3" />
        <path d="M-29-23h58" stroke="#B9F7C9" strokeWidth="3" strokeLinecap="round" opacity=".7" />
        <rect x="-27" y="5" width="17" height="17" rx="4" fill="#D9E4EA" />
        <rect x="-8" y="-7" width="17" height="29" rx="4" fill="url(#lbRobotGold)" />
        <rect x="11" y="10" width="17" height="12" rx="4" fill="#E89B62" />
        <g fill="#23402C" fontFamily="Baloo 2,sans-serif" fontWeight="800" fontSize="12" textAnchor="middle">
          <text x="-18.5" y="17">2</text>
          <text x=".5" y="8">1</text>
          <text x="19.5" y="20">3</text>
        </g>
      </g>

      <g transform="translate(300 303) rotate(7)" filter="url(#fShadow)">
        <path d="M-15-22h30v12q0 18-15 23-15-5-15-23z" fill="url(#lbRobotGold)" stroke="#B97706" strokeWidth="2" />
        <path d="M-15-16h-10v7q0 12 13 12M15-16h10v7q0 12-13 12" fill="none" stroke="#F6B918" strokeWidth="5" strokeLinecap="round" />
        <path d="M0 13v12M-11 27h22" stroke="#B97706" strokeWidth="4" strokeLinecap="round" />
        <path d="M-8-13h16" stroke="#FFF5B8" strokeWidth="3" strokeLinecap="round" opacity=".85" />
      </g>
    </svg>
  );
}
