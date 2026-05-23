# Robot AI Icons - Reusable Components

A set of reusable React SVG components for animated robot characters used throughout the Math Adventure app.

## Components

### Main Component
- **`RobotAIComponent`** - Displays all 6 robots in a 900x800 SVG canvas

### Individual Robot Components
1. **`RobotReading`** - Purple theme, reading books
2. **`RobotSpeaking`** - Pink theme, speaking with waves
3. **`RobotABC`** - Blue theme, teaching alphabet
4. **`RobotMath`** - Green theme, teaching math
5. **`RobotArabic`** - Orange theme, teaching Arabic
6. **`RobotSuper`** - Red theme, master robot with all features

### Helper Components
- **`SVGDefs`** - SVG gradients and filters used by all robots
- **`RobotBase`** - Shared components (Head, Body, Hands, Eyes, Mouth, Eyebrows, Label, HoverStars)

## Usage

### Display All Robots
```jsx
import { RobotAIComponent } from './components/icons/RobotAI';

export default function App() {
  return <RobotAIComponent />;
}
```

### Display Individual Robot
```jsx
import { RobotReading, RobotMath, SVGDefs } from './components/icons/RobotAI';

export default function Component() {
  return (
    <svg width="400" height="400" viewBox="0 0 900 800" xmlns="http://www.w3.org/2000/svg">
      <SVGDefs />
      <RobotReading />
      <RobotMath />
    </svg>
  );
}
```

## Features

- **Animations**: Each robot has unique animations:
  - Floating effect on hover
  - Eye blinking
  - Hand movements (waving or moving)
  - Glowing aura
  - Floating subject elements (letters, numbers, symbols)
  - Hover stars effect

- **Modular**: Each robot is a separate component that can be used independently

- **Customizable**: Easy to modify colors, sizes, and animations by updating CSS modules

- **Responsive**: SVG viewBox ensures proper scaling on any screen size

## Animation Classes

All animations are defined in `animations.module.css`:
- `robotFloat` - Initial float-in animation
- `eyeBlink` / `eyeBlinkFast` - Eye blinking animations
- `handMoveLeft` / `handMoveRight` - Hand movement animations
- `handWaveLeft` / `handWaveRight` - Hand waving animations
- `glowPulse` - Pulsing glow effect
- `bookBounce` - Bouncing book animation (Reading Bot)
- `speakWave` - Speaking wave animation (Speaking Bot)
- `rotateSymbol` - Rotating symbol animation (Math Bot)
- `floatElem1-6` - Floating element animations
- `hoverStar1-5` - Hover star animations

## Structure

```
RobotAI/
├── index.jsx              # Main exports
├── animations.module.css  # All animation definitions
├── SVGDefs.jsx           # Shared SVG definitions
├── RobotBase.jsx         # Shared component building blocks
├── RobotReading.jsx      # Reading Bot component
├── RobotSpeaking.jsx     # Speaking Bot component
├── RobotABC.jsx          # ABC Bot component
├── RobotMath.jsx         # Math Bot component
├── RobotArabic.jsx       # Arabic Bot component
├── RobotSuper.jsx        # Super Bot component
└── README.md             # This file
```

## Color Themes

Each robot has a unique color scheme:

| Robot | Primary Color | Secondary Color | Eye Gradient |
|-------|---------------|-----------------|--------------|
| Reading | #AA46FF (Purple) | #B87BFF | eyePurple |
| Speaking | #FF46D8 (Pink) | #FF7BE7 | eyePink |
| ABC | #46D8FF (Blue) | #7BE7FF | eyeBlue |
| Math | #4CAF50 (Green) | #7BFF9E | eyeGreen |
| Arabic | #FF9800 (Orange) | #FFB87B | eyeOrange |
| Super | #FF4646 (Red) | #FF7B7B | eyeRed |

## Customization Examples

### Change Robot Colors
Modify the color values in individual robot components:
```jsx
<RobotHead eyeGradientId="eyePurple" glowColor="#B87BFF" />
```

### Add More Floating Elements
Edit the floating container in each robot:
```jsx
<g className={styles.floatContainer}>
  <g className={styles.floatElem1}>
    {/* Your element here */}
  </g>
</g>
```

### Modify Animation Speed
Adjust animation durations in `animations.module.css`:
```css
.bookBounce {
  animation: bookBounce 3s ease-in-out infinite; /* Changed from 2s to 3s */
}
```

## Performance Tips

- Use React.memo to prevent unnecessary re-renders if robots are static
- Combine multiple robots in a single SVG viewport for better performance
- Lazy load robot components if not immediately visible

## Browser Compatibility

These components use standard SVG features and CSS animations supported in all modern browsers.
