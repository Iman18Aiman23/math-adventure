import styles from './animations.module.css';
import { RobotHead, RobotBody, RobotHands, RobotEyes, RobotLabel, HoverStars } from './RobotBase';

export const RobotSpeaking = () => (
  <g className={styles.robotWrapper} transform="translate(300, 0)">
    <g className={styles.robotFloat}>
      <RobotHead eyeGradientId="eyePink" glowColor="#FF7BE7" />

      <g className={styles.glowPulse}>
        <circle cx="72" cy="84" r="5" fill="#FFD93D" />
        <circle cx="248" cy="92" r="5" fill="#FFD93D" />
      </g>

      <RobotHands leftAnimation="handWaveLeft" rightAnimation="handWaveRight" />
      <RobotBody />

      {/* Speaking Waves */}
      <g className={styles.speakWave} transform="translate(0, 5)">
        <rect x="153" y="240" width="14" height="22" rx="7" fill="#FF46D8" />
        <rect x="148" y="262" width="24" height="6" rx="3" fill="#FF46D8" />
        <circle cx="160" cy="251" r="4" fill="#FFFFFF" opacity="0.8" />
        <path d="M172 248 Q176 251 172 254" stroke="#FF46D8" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M176 245 Q182 251 176 257" stroke="#FF46D8" strokeWidth="2" fill="none" opacity="0.4" />
      </g>

      <RobotEyes eyeGradientId="eyePink" eyeAnimationClass="eyeBlink" isFast={true} />

      {/* Speaking mouth */}
      <ellipse cx="160" cy="148" rx="18" ry="10" fill="#FF46D8" opacity="0.8" />
      <ellipse cx="160" cy="145" rx="14" ry="5" fill="#FFB8F7" opacity="0.6" />
      <circle cx="124" cy="138" r="5" fill="#FFB8F7" opacity="0.5" />
      <circle cx="196" cy="138" r="5" fill="#FFB8F7" opacity="0.5" />

      <RobotLabel title="SPEAKING BOT" subtitle="PRONUNCIATION • TALKING" titleColor="#FF46D8" subtitleColor="#FF7BE7" />
    </g>

    {/* Floating Speech Bubbles */}
    <g className={styles.floatContainer}>
      <g className={styles.floatElem1}>
        <ellipse cx="55" cy="85" rx="28" ry="18" fill="white" stroke="#FF46D8" strokeWidth="2.5" />
        <text x="55" y="90" fontSize="16" fill="#FF46D8" textAnchor="middle" fontWeight="bold">
          Hi!
        </text>
      </g>

      <g className={styles.floatElem2}>
        <ellipse cx="265" cy="65" rx="32" ry="18" fill="white" stroke="#FF46D8" strokeWidth="2.5" />
        <text x="265" y="70" fontSize="15" fill="#FF46D8" textAnchor="middle" fontWeight="bold">
          Hello!
        </text>
      </g>

      <g className={styles.floatElem3}>
        <ellipse cx="280" cy="160" rx="26" ry="15" fill="white" stroke="#FF46D8" strokeWidth="2.5" />
        <text x="280" y="164" fontSize="13" fill="#FF46D8" textAnchor="middle" fontWeight="bold">
          Speak
        </text>
      </g>

      <g className={styles.floatElem5}>
        <text x="65" y="55" fontSize="32" fill="#FF46D8" opacity="0.7">
          🔊
        </text>
      </g>

      <g className={styles.floatElem6}>
        <ellipse cx="50" cy="140" rx="24" ry="14" fill="white" stroke="#FF46D8" strokeWidth="2.5" />
        <text x="50" y="144" fontSize="13" fill="#FF46D8" textAnchor="middle" fontWeight="bold">
          Wow!
        </text>
      </g>
    </g>

    <HoverStars />
  </g>
);
