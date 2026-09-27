import { useId } from 'react';
const sources = {
 mobile: ['mobile-reference.png', 1312, 1199],
 badges: ['badges-reference.png', 1584, 993],
};
const windows = {
 clipboard: ['mobile', 59, 116, 95, 115], assessmentRobot: ['mobile', 438, 101, 173, 151],
 medal: ['mobile', 715, 108, 93, 126], badgeRobot: ['mobile', 1102, 98, 180, 155],
 trophy: ['badges', 354, 89, 85, 83], trophyRobot: ['badges', 1180, 75, 339, 140],
 subtraction: ['mobile', 129, 356, 113, 102], multiplication: ['mobile', 433, 356, 108, 102],
 division: ['mobile', 125, 786, 119, 107], scholar: ['mobile', 431, 786, 116, 107],
 gems: ['badges', 846, 563, 58, 52],
 fire: ['mobile', 706, 355, 98, 107], ice: ['mobile', 1011, 355, 97, 107],
 goldFire: ['mobile', 706, 558, 99, 113], target: ['mobile', 1013, 563, 101, 106],
 purpleTarget: ['mobile', 709, 775, 102, 101], greenTarget: ['mobile', 1014, 775, 103, 101],
 blueGem: ['mobile', 710, 984, 94, 97], purpleGem: ['mobile', 1014, 984, 99, 98],
};
export default function AchievementArt({ name, className = '' }) {
 const id = useId();
 const [source, x, y, width, height] = windows[name] || windows.scholar;
 const [file, sourceWidth, sourceHeight] = sources[source];
 return <svg className={`ac-art ac-art-${name} ${className}`} viewBox={`${x} ${y} ${width} ${height}`} aria-hidden="true" focusable="false">
  <defs><clipPath id={id}><rect x={x} y={y} width={width} height={height} /></clipPath></defs>
  <image href={`${import.meta.env.BASE_URL}images/achievement/${file}`} width={sourceWidth} height={sourceHeight} clipPath={`url(#${id})`} />
 </svg>;
}
