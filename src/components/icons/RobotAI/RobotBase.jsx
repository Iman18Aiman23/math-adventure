import styles from './animations.module.css';

export const RobotHead = ({ eyeGradientId, glowColor, glowOpacity = 0.12 }) => (
  <>
    <circle cx="160" cy="118" r="95" fill={glowColor} opacity={glowOpacity} className={styles.glowPulse} />

    <g filter="url(#shadow)">
      <path
        d="M95 76 Q95 44 126 42 Q138 18 152 38 Q160 42 168 38 Q182 18 194 42 Q225 44 225 76 L225 154 Q225 182 198 184 L122 184 Q95 182 95 154 Z"
        fill="url(#headGradient)"
      />
      <rect x="108" y="58" width="104" height="104" rx="30" fill="url(#screenGradient)" />
      <path d="M120 70 Q154 56 196 74 L196 86 Q154 70 120 82 Z" fill="#FFFFFF" opacity="0.12" />
    </g>
  </>
);

export const RobotBody = () => (
  <>
    <path d="M120 205 Q160 185 200 205 L208 270 Q208 300 160 306 Q112 300 112 270 Z" fill="url(#bodyGradient)" filter="url(#shadow)" />
    <ellipse cx="148" cy="228" rx="26" ry="40" fill="#FFFFFF" opacity="0.5" />
  </>
);

export const RobotHands = ({ leftAnimation = 'handMoveLeft', rightAnimation = 'handMoveRight' }) => (
  <>
    <g className={styles[leftAnimation]}>
      <ellipse
        cx="76"
        cy="194"
        rx="20"
        ry="36"
        fill="url(#bodyGradient)"
        filter="url(#shadow)"
        transform="rotate(-18 76 194)"
      />
    </g>
    <g className={styles[rightAnimation]}>
      <ellipse
        cx="244"
        cy="194"
        rx="20"
        ry="36"
        fill="url(#bodyGradient)"
        filter="url(#shadow)"
        transform="rotate(18 244 194)"
      />
    </g>
  </>
);

export const RobotEyes = ({ eyeGradientId, eyeAnimationClass = 'eyeBlink', isFast = false }) => {
  const animClass = isFast ? styles.eyeBlinkFast : styles[eyeAnimationClass];
  const eyeLightColor = getEyeLightColor(eyeGradientId);

  return (
    <g className={animClass}>
      <ellipse cx="138" cy="108" rx="14" ry="14" fill={`url(#${eyeGradientId})`} filter="url(#glow)" />
      <ellipse cx="138" cy="108" rx="8" ry="8" fill="#FFFFFF" opacity="0.9" />

      <ellipse cx="182" cy="108" rx="14" ry="14" fill={`url(#${eyeGradientId})`} filter="url(#glow)" />
      <ellipse cx="182" cy="108" rx="8" ry="8" fill="#FFFFFF" opacity="0.9" />
    </g>
  );
};

export const RobotMouth = ({ gradientId, color }) => (
  <>
    <path d="M140 138 Q160 156 180 138" stroke={`url(#${gradientId})`} strokeWidth="8" strokeLinecap="round" fill="none" filter="url(#glow)" />
    <circle cx="124" cy="138" r="5" fill={color} opacity="0.5" />
    <circle cx="196" cy="138" r="5" fill={color} opacity="0.5" />
  </>
);

export const RobotEyebrows = ({ color }) => (
  <>
    <ellipse cx="138" cy="95" rx="18" ry="8" fill="none" stroke={color} strokeWidth="2" />
    <ellipse cx="182" cy="95" rx="18" ry="8" fill="none" stroke={color} strokeWidth="2" />
    <line x1="156" y1="95" x2="164" y2="95" stroke={color} strokeWidth="2" />
  </>
);

export const RobotLabel = ({ title, subtitle, titleColor, subtitleColor }) => (
  <>
    <text x="160" y="325" fontSize="14" fontFamily="Fredoka, Arial, sans-serif" fontWeight="700" fill={titleColor} textAnchor="middle">
      {title}
    </text>
    <text x="160" y="340" fontSize="8" fontFamily="Fredoka, Arial, sans-serif" fontWeight="600" fill={subtitleColor} textAnchor="middle">
      {subtitle}
    </text>
  </>
);

export const HoverStars = () => (
  <g className={styles.hoverStars}>
    <text className={styles.hoverStar1} x="80" y="50" fontSize="18" fill="#FFD93D">
      ★
    </text>
    <text className={styles.hoverStar2} x="240" y="40" fontSize="14" fill="#FFD93D">
      ✦
    </text>
    <text className={styles.hoverStar3} x="60" y="180" fontSize="12" fill="#FFD93D">
      ☆
    </text>
    <text className={styles.hoverStar4} x="260" y="200" fontSize="16" fill="#FFD93D">
      ★
    </text>
    <text className={styles.hoverStar5} x="100" y="30" fontSize="10" fill="#FFD93D">
      ✧
    </text>
  </g>
);

function getEyeLightColor(gradientId) {
  const map = {
    eyeBlue: '#B8F7FF',
    eyeGreen: '#B8FFC7',
    eyeOrange: '#FFD4B3',
    eyePink: '#FFB8F7',
    eyePurple: '#D8B8FF',
    eyeRed: '#FFB8B8',
  };
  return map[gradientId] || '#FFFFFF';
}
