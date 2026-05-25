import styles from './animations.module.css';
import { RobotHead, RobotBody, RobotHands, RobotEyes, RobotMouth, RobotLabel, HoverStars } from './RobotBase';

export const RobotMath = () => (
  <g className={styles.robotWrapper} transform="translate(10, 370)">
    <g className={styles.robotFloat}>
      <RobotHead eyeGradientId="eyeGreen" glowColor="#7BFF9E" />

      <g className={styles.glowPulse}>
        <circle cx="72" cy="84" r="5" fill="#FFD93D" />
        <circle cx="248" cy="92" r="5" fill="#FFD93D" />
      </g>

      <RobotHands leftAnimation="handMoveLeft" rightAnimation="handMoveRight" />
      <RobotBody />

      {/* Math Display */}
      <g transform="translate(0, 5)">
        <g className={styles.rotateSymbol}>
          <text x="160" y="255" fontSize="20" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#4CAF50" textAnchor="middle">
            +
          </text>
        </g>
        <text x="142" y="248" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#4CAF50" textAnchor="middle">
          1
        </text>
        <text x="178" y="248" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#4CAF50" textAnchor="middle">
          2
        </text>
        <text x="142" y="268" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#4CAF50" textAnchor="middle">
          3
        </text>
        <text x="178" y="268" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#4CAF50" textAnchor="middle">
          =
        </text>
      </g>

      <RobotEyes eyeGradientId="eyeGreen" />
      <RobotMouth gradientId="eyeGreen" color="#B8FFC7" />

      <RobotLabel title="MATH BOT" subtitle="COUNTING • ADD • SUBTRACT • MULTIPLY" titleColor="#4CAF50" subtitleColor="#7BFF9E" />
    </g>

    {/* Floating Math Symbols */}
    <g className={styles.floatContainer}>
      <g className={styles.floatElem1}>
        <text x="50" y="85" fontSize="38" fill="#4CAF50" opacity="0.9" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          +
        </text>
      </g>

      <g className={styles.floatElem2}>
        <text x="265" y="70" fontSize="34" fill="#4CAF50" opacity="0.8" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          −
        </text>
      </g>

      <g className={styles.floatElem3}>
        <text x="285" y="150" fontSize="36" fill="#4CAF50" opacity="0.7" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          ×
        </text>
      </g>

      <g className={styles.floatElem4}>
        <text x="40" y="165" fontSize="34" fill="#7BFF9E" opacity="0.8" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          ÷
        </text>
      </g>

      <g className={styles.floatElem5}>
        <text x="65" y="55" fontSize="30" fill="#4CAF50" opacity="0.9" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          =
        </text>
      </g>

      <g className={styles.floatElem6}>
        <text x="250" y="215" fontSize="28" fill="#4CAF50" opacity="0.7" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          1 2 3
        </text>
      </g>
    </g>

    <HoverStars />
  </g>
);
