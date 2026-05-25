import styles from './animations.module.css';
import { RobotHead, RobotBody, RobotHands, RobotEyes, RobotMouth, RobotLabel, HoverStars } from './RobotBase';

export const RobotABC = () => (
  <g className={styles.robotWrapper} transform="translate(590, 0)">
    <g className={styles.robotFloat}>
      <RobotHead eyeGradientId="eyeBlue" glowColor="#7BE7FF" />

      <g className={styles.glowPulse}>
        <circle cx="72" cy="84" r="5" fill="#FFD93D" />
        <circle cx="248" cy="92" r="5" fill="#FFD93D" />
      </g>

      <RobotHands leftAnimation="handMoveLeft" rightAnimation="handMoveRight" />
      <RobotBody />

      {/* ABC Boxes */}
      <g transform="translate(0, 5)">
        <rect x="140" y="232" width="18" height="18" rx="3" fill="#46D8FF" />
        <text x="145" y="245" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
          A
        </text>

        <rect x="158" y="232" width="18" height="18" rx="3" fill="#7BE7FF" />
        <text x="163" y="245" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
          B
        </text>

        <rect x="149" y="250" width="18" height="18" rx="3" fill="#46D8FF" />
        <text x="154" y="263" fontSize="10" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
          C
        </text>
      </g>

      <RobotEyes eyeGradientId="eyeBlue" />
      <RobotMouth gradientId="eyeBlue" color="#B8F7FF" />

      <RobotLabel title="ABC BOT" subtitle="ALPHABET • KV • KVK • READING" titleColor="#46D8FF" subtitleColor="#7BE7FF" />
    </g>

    {/* Floating Letters */}
    <g className={styles.floatContainer}>
      <g className={styles.floatElem1}>
        <text x="50" y="90" fontSize="36" fill="#46D8FF" opacity="0.9" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          A
        </text>
      </g>

      <g className={styles.floatElem2}>
        <text x="265" y="70" fontSize="32" fill="#46D8FF" opacity="0.8" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          B
        </text>
      </g>

      <g className={styles.floatElem3}>
        <text x="285" y="150" fontSize="34" fill="#46D8FF" opacity="0.7" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          C
        </text>
      </g>

      <g className={styles.floatElem4}>
        <text x="40" y="160" fontSize="30" fill="#7BE7FF" opacity="0.8" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          D
        </text>
      </g>

      <g className={styles.floatElem5}>
        <text x="65" y="55" fontSize="28" fill="#46D8FF" opacity="0.9" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          E
        </text>
      </g>

      <g className={styles.floatElem6}>
        <text x="255" y="210" fontSize="30" fill="#7BE7FF" opacity="0.7" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          F
        </text>
      </g>
    </g>

    <HoverStars />
  </g>
);
