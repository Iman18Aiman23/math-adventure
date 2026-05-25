import { RobotReading, RobotSpeaking, RobotABC, RobotMath, RobotArabic, RobotSuper, SVGDefs } from './index';

// Each robot is positioned at a specific offset within the 900x800 canvas.
// The viewBox crops to just that robot's 300x380 slice so it fills the icon.
const ROBOT_VIEWBOXES = {
  reading:  '0 0 310 370',
  speaking: '290 0 310 370',
  abc:      '580 0 320 370',
  math:     '0 360 310 370',
  arabic:   '290 360 310 370',
  super:    '580 360 320 370',
};

const createRobotIcon = (RobotComponent, viewBox) => {
  return function RobotIcon({ size = 48 }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        <SVGDefs />
        <RobotComponent />
      </svg>
    );
  };
};

export const RobotReadingIcon  = createRobotIcon(RobotReading,  ROBOT_VIEWBOXES.reading);
export const RobotSpeakingIcon = createRobotIcon(RobotSpeaking, ROBOT_VIEWBOXES.speaking);
export const RobotABCIcon      = createRobotIcon(RobotABC,      ROBOT_VIEWBOXES.abc);
export const RobotMathIcon     = createRobotIcon(RobotMath,     ROBOT_VIEWBOXES.math);
export const RobotArabicIcon   = createRobotIcon(RobotArabic,   ROBOT_VIEWBOXES.arabic);
export const RobotSuperIcon    = createRobotIcon(RobotSuper,    ROBOT_VIEWBOXES.super);
