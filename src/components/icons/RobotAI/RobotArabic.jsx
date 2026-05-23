import styles from './animations.module.css';
import { RobotHead, RobotBody, RobotHands, RobotEyes, RobotMouth, RobotLabel, HoverStars } from './RobotBase';

export const RobotArabic = () => (
  <g className={styles.robotWrapper} transform="translate(300, 370)">
    <g className={styles.robotFloat}>
      <RobotHead eyeGradientId="eyeOrange" glowColor="#FFB87B" />

      <g className={styles.glowPulse}>
        <circle cx="72" cy="84" r="5" fill="#FFD93D" />
        <circle cx="248" cy="92" r="5" fill="#FFD93D" />
      </g>

      <RobotHands leftAnimation="handMoveLeft" rightAnimation="handMoveRight" />
      <RobotBody />

      {/* Arabic Letters */}
      <g transform="translate(0, 5)">
        <rect x="138" y="232" width="44" height="34" rx="8" fill="#FF9800" />
        <text x="150" y="250" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
          أ
        </text>
        <text x="160" y="250" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
          ب
        </text>
        <text x="170" y="250" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
          ت
        </text>
      </g>

      <g className={styles.glowPulse}>
        <text x="198" y="245" fontSize="14" fill="#FFD93D" textAnchor="middle">
          ★
        </text>
        <text x="122" y="270" fontSize="10" fill="#FFD93D" textAnchor="middle">
          ☪
        </text>
      </g>

      <RobotEyes eyeGradientId="eyeOrange" />
      <RobotMouth gradientId="eyeOrange" color="#FFD4B3" />

      {/* Crown */}
      <rect x="130" y="40" width="60" height="20" rx="10" fill="#FF5722" />

      <RobotLabel title="ARABIC BOT" subtitle="ALIF • BA • TA • THA • JEEM • HAA" titleColor="#FF9800" subtitleColor="#FFB87B" />
    </g>

    {/* Floating Arabic Letters */}
    <g className={styles.floatContainer}>
      <g className={styles.floatElem1}>
        <text x="50" y="85" fontSize="40" fill="#FF9800" opacity="0.9" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          أ
        </text>
      </g>

      <g className={styles.floatElem2}>
        <text x="265" y="70" fontSize="36" fill="#FF9800" opacity="0.8" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          ب
        </text>
      </g>

      <g className={styles.floatElem3}>
        <text x="285" y="150" fontSize="34" fill="#FF9800" opacity="0.7" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          ت
        </text>
      </g>

      <g className={styles.floatElem4}>
        <text x="40" y="170" fontSize="32" fill="#FFB87B" opacity="0.8" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          ث
        </text>
      </g>

      <g className={styles.floatElem5}>
        <text x="65" y="55" fontSize="30" fill="#FF9800" opacity="0.9" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          ج
        </text>
      </g>

      <g className={styles.floatElem6}>
        <text x="250" y="215" fontSize="32" fill="#FFB87B" opacity="0.7" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          ح
        </text>
      </g>
    </g>

    <HoverStars />
  </g>
);
