import styles from './animations.module.css';
import { RobotHead, RobotBody, RobotHands, RobotEyes, RobotMouth, RobotEyebrows, RobotLabel, HoverStars } from './RobotBase';

export const RobotReading = ({ size = 100 }) => (
  <g className={styles.robotWrapper} transform="translate(10, 0)">
    <g className={styles.robotFloat}>
      <RobotHead eyeGradientId="eyePurple" glowColor="#B87BFF" />

      <g className={styles.glowPulse}>
        <circle cx="72" cy="84" r="5" fill="#FFD93D" />
        <circle cx="248" cy="92" r="5" fill="#FFD93D" />
      </g>

      <RobotHands leftAnimation="handMoveLeft" rightAnimation="handMoveRight" />
      <RobotBody />

      {/* Book */}
      <g className={styles.bookBounce} transform="translate(0, 5)">
        <rect x="142" y="233" width="36" height="28" rx="4" fill="#AA46FF" />
        <rect x="145" y="235" width="15" height="24" rx="2" fill="#D8B8FF" />
        <rect x="160" y="235" width="15" height="24" rx="2" fill="#D8B8FF" />
        <line x1="152" y1="240" x2="152" y2="256" stroke="#AA46FF" strokeWidth="1" />
        <line x1="167" y1="240" x2="167" y2="256" stroke="#AA46FF" strokeWidth="1" />
      </g>

      <RobotEyes eyeGradientId="eyePurple" />
      <RobotMouth gradientId="eyePurple" color="#D8B8FF" />
      <RobotEyebrows color="#AA46FF" />

      <RobotLabel title="READING BOT" subtitle="BOOKS • STORIES • PHONICS" titleColor="#AA46FF" subtitleColor="#B87BFF" />
    </g>

    {/* Floating Letters */}
    <g className={styles.floatContainer}>
      <g className={styles.floatElem1}>
        <text x="55" y="90" fontSize="32" fill="#AA46FF" opacity="0.9" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          A
        </text>
      </g>
      <g className={styles.floatElem2}>
        <text x="260" y="70" fontSize="28" fill="#AA46FF" opacity="0.8" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          B
        </text>
      </g>
      <g className={styles.floatElem3}>
        <text x="280" y="150" fontSize="26" fill="#AA46FF" opacity="0.7" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 3px white)' }}>
          C
        </text>
      </g>
      <g className={styles.floatElem5}>
        <text x="70" y="50" fontSize="24" fill="#FFD93D" opacity="0.9">
          ★
        </text>
      </g>
    </g>

    <HoverStars />
  </g>
);
