import styles from './animations.module.css';
import { RobotHead, RobotBody, RobotHands, RobotEyes, RobotMouth, RobotLabel, HoverStars } from './RobotBase';

export const RobotSuper = () => (
  <g className={styles.robotWrapper} transform="translate(590, 370)">
    <g className={styles.robotFloat}>
      {/* Head with Crown */}
      <circle cx="160" cy="118" r="95" fill="#FF7B7B" opacity="0.12" className={styles.glowPulse} />

      <g className={styles.glowPulse}>
        <circle cx="72" cy="84" r="5" fill="#FFD93D" />
        <circle cx="248" cy="92" r="5" fill="#FFD93D" />
      </g>

      <RobotHands leftAnimation="handWaveLeft" rightAnimation="handWaveRight" />
      <RobotBody />

      {/* Multi-feature Display */}
      <g transform="translate(0, 5)">
        <rect x="140" y="232" width="40" height="34" rx="8" fill="#FF4646" />
        <text x="153" y="248" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
          ABC
        </text>
        <text x="153" y="260" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
          123
        </text>
        <text x="168" y="252" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
          أ
        </text>
      </g>

      {/* Head with crown star */}
      <g filter="url(#shadow)">
        <path
          d="M95 76 Q95 44 126 42 Q138 18 152 38 Q160 42 168 38 Q182 18 194 42 Q225 44 225 76 L225 154 Q225 182 198 184 L122 184 Q95 182 95 154 Z"
          fill="url(#headGradient)"
        />
        <rect x="108" y="58" width="104" height="104" rx="30" fill="url(#screenGradient)" />
        <path d="M120 70 Q154 56 196 74 L196 86 Q154 70 120 82 Z" fill="#FFFFFF" opacity="0.12" />
        <path d="M140 42 L145 25 L152 38 L160 22 L168 38 L175 25 L180 42 Z" fill="#FFD93D" stroke="#FF9800" strokeWidth="1" />
      </g>

      <RobotEyes eyeGradientId="eyeRed" />
      <RobotMouth gradientId="eyeRed" color="#FFB8B8" />

      <RobotLabel title="SUPER BOT" subtitle="READ • SPEAK • MATH • ARABIC" titleColor="#FF4646" subtitleColor="#FF7B7B" />
    </g>

    {/* Floating Multi-feature Elements */}
    <g className={styles.floatContainer}>
      <g className={styles.floatElem1}>
        <text x="50" y="85" fontSize="30" fill="#FF4646" opacity="0.9" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          ABC
        </text>
      </g>

      <g className={styles.floatElem2}>
        <text x="260" y="70" fontSize="32" fill="#FF4646" opacity="0.8" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          123
        </text>
      </g>

      <g className={styles.floatElem3}>
        <text x="285" y="150" fontSize="36" fill="#FF4646" opacity="0.7" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          أ
        </text>
      </g>

      <g className={styles.floatElem4}>
        <text x="40" y="170" fontSize="30" fill="#FF7B7B" opacity="0.8" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          + −
        </text>
      </g>

      <g className={styles.floatElem5}>
        <text x="65" y="55" fontSize="28" fill="#FFD93D" opacity="0.9">
          ★
        </text>
      </g>
    </g>

    <HoverStars />
  </g>
);
