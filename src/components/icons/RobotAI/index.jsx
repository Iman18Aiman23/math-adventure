import { RobotReading } from './RobotReading';
import { RobotSpeaking } from './RobotSpeaking';
import { RobotABC } from './RobotABC';
import { RobotMath } from './RobotMath';
import { RobotArabic } from './RobotArabic';
import { RobotSuper } from './RobotSuper';
import { SVGDefs } from './SVGDefs';

export const RobotAIComponent = () => (
  <svg width="100%" height="auto" viewBox="0 0 900 800" xmlns="http://www.w3.org/2000/svg">
    <SVGDefs />
    <RobotReading />
    <RobotSpeaking />
    <RobotABC />
    <RobotMath />
    <RobotArabic />
    <RobotSuper />
  </svg>
);

export { RobotReading } from './RobotReading';
export { RobotSpeaking } from './RobotSpeaking';
export { RobotABC } from './RobotABC';
export { RobotMath } from './RobotMath';
export { RobotArabic } from './RobotArabic';
export { RobotSuper } from './RobotSuper';
export { SVGDefs } from './SVGDefs';
