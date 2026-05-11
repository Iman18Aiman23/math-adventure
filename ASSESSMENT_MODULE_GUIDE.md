# Math Assessment Module - Implementation Guide

## 📋 Overview
A complete Math Assessment system for the ImanCore Learning Hub with random problem generation, multi-format question types, 30-minute timer, and result tracking.

---

## 📁 File Structure Created

```
src/
├── utils/
│   └── mathGenerator.js              # Problem generation & scoring logic
├── components/
│   ├── QuestionRenderer.jsx          # Format switcher component
│   ├── QuestionPalette.jsx          # Sidebar navigator (1-30 grid)
│   ├── Certificate.jsx              # Results/completion view
│   └── Formats/
│       ├── MultipleChoice.jsx       # 2x2 button grid
│       ├── TextInput.jsx            # Single input + submit
│       └── LongMethod.jsx           # Workbook-style math
└── pages/
    ├── AssessmentPage.jsx           # Main orchestrator
    └── AssessmentSelector.jsx       # Assessment selection UI
```

---

## 🎯 How It Works

### 1. **User Flow**
```
Click "Take Assessment" (AchievementPage)
    ↓
AssessmentSelector (choose assessment)
    ↓
AssessmentPage (main assessment interface)
    ↓
Certificate (results screen)
```

### 2. **Question Generation** (`mathGenerator.js`)
- **Difficulty Levels:**
  - Easy: Numbers 1-10
  - Medium: Numbers 10-50
  - Hard: Numbers 100-999

- **Topics Supported:**
  - Addition: `num1 + num2`
  - Subtraction: `num1 - num2` (always positive)
  - Multiplication: `num1 × num2`
  - Division: Results are whole numbers (no remainders)

- **Multiple-Choice Logic:**
  - Generates 1 correct answer + 3 plausible wrong answers
  - Answers shuffled randomly

### 3. **Question Formats**

#### MultipleChoice.jsx
- 2×2 grid of button options
- Selected option highlighted in green
- Auto-marks as answered and moves to next

#### TextInput.jsx
- Standard input field
- Submit button
- Enter key triggers submission
- Auto-focus on next question navigation

#### LongMethod.jsx
- Simulates a math workbook layout
- Numbers aligned vertically
- Input box below the line (like real math)
- Workbook-style aesthetics

---

## 🎮 Main Features

### Timer System
- 30-minute countdown (configurable per assessment)
- Displays in MM:SS format
- Color changes:
  - Green: > 5 minutes
  - Orange: 5 minutes remaining
  - Red: Time's up
- Auto-submits when time reaches 00:00
- Disables all inputs when time is up

### Question Navigator (Sidebar)
- **Mobile Responsive:** Hides on screens < 768px
- **Color Coding:**
  - Blue: Current question
  - Green: Answered questions
  - White/Grey: Unvisited questions
- **Grid Layout:** 3 columns for questions 1-30
- **Progress Bar:** Shows percentage answered

### Navigation
- Previous/Next buttons
- Skip button (doesn't require answer)
- Submit Assessment button (finalizes answers)
- Question palette for direct navigation

### State Management
- Answers stored in object: `{ questionId: answer }`
- Doesn't lose answers when navigating
- Tracking of visited/answered questions

---

## 🔧 Integration with AchievementPage

### Updated Props
```javascript
<AchievementPage
  onBack={handleBack}
  onHome={handleHome}
  language="eng"
  gameState={gameState}
  onTakeAssessment={(achievement) => {
    // Navigate to AssessmentSelector
    // Or directly to specific assessment
  }}
/>
```

### Button Action
When user clicks "📋 Take Assessment" on a locked achievement:
```javascript
onTakeAssessment?.(achievement);
```

---

## 📊 Assessment Configuration Format

```javascript
{
  id: 1,
  slug: "math-add-lvl1",
  name: "Math Additional Test",
  description: "Level 1 : Age 4-6",
  scoreTarget: 25,          // Points needed to pass
  totalQuestions: 30,       // Total questions in assessment
  duration: 30,             // Minutes
  topic: "addition",        // 'addition', 'subtraction', 'multiplication', 'division'
  level: "easy",            // 'easy', 'medium', 'hard'
  questionType: "multiple-choice", // 'multiple-choice', 'text-input', 'long-method'
  status: "Completed"       // 'Completed', 'Pending', 'Failed'
}
```

---

## ✅ Scoring System

### Calculation
- Compares each user answer with the correct answer
- Score = Number of correct answers
- Percentage = (correct / total) × 100

### Results
- **Pass:** `score >= scoreTarget` → Show Certificate with celebration
- **Fail:** `score < scoreTarget` → Show "Try Again" with Retry button
- Confetti animation on success
- Attempts counter tracking

---

## 🎨 UI/UX Features

### Color Scheme
- Primary: #4A90E2 (Blue)
- Success: #58CC02 (Green)
- Warning: #FF9800 (Orange)
- Error: #F44336 (Red)
- Neutral: #F5F5F5 (Light Grey)

### Responsive Design
- Sidebar hides on mobile (< 768px)
- Touch-friendly button sizes
- Stack layout on mobile devices
- Adaptive grid layout

### Accessibility
- Clear visual feedback on hover
- Disabled state styling
- Large, readable fonts
- High contrast colors
- Keyboard support (Enter to submit)

---

## 🚀 Usage Example

### Basic Setup
```javascript
import AssessmentSelector from './pages/AssessmentSelector';
import AssessmentPage from './pages/AssessmentPage';

// In your main app or routing
function App() {
  const handleTakeAssessment = (achievement) => {
    // Navigate to assessment selector
    // You can pre-filter by topic or pass directly to AssessmentPage
  };

  return (
    <AchievementPage
      onTakeAssessment={handleTakeAssessment}
      {...otherProps}
    />
  );
}
```

### Direct Assessment Launch
```javascript
<AssessmentPage
  assessment={assessment}
  onBack={handleBack}
  language="eng"
  gameState={gameState}
/>
```

### Assessment Selection
```javascript
<AssessmentSelector
  onBack={handleBack}
  language="eng"
  gameState={gameState}
/>
```

---

## 📱 Data Persistence

Currently uses local state. To persist data:

1. **Save Assessment Progress:**
```javascript
localStorage.setItem('assessmentAnswers', JSON.stringify(userAnswers));
localStorage.setItem('currentQuestion', currentQuestionIndex);
```

2. **Update Assessment Status:**
```javascript
// In baseAssessments
const updatedAssessment = {
  ...assessment,
  status: score >= assessment.scoreTarget ? 'Completed' : 'Failed',
  score: result.score,
  percentage: result.percentage,
  completedDate: new Date().toISOString()
};
```

3. **Track in Game State:**
```javascript
const updatedGameState = {
  ...gameState,
  completedAssessments: [...(gameState.completedAssessments || []), assessment.id],
  totalScore: gameState.totalScore + score
};
```

---

## 🔄 Future Enhancements

1. **Question Pool Variations**
   - Different question sets on retry
   - Spaced repetition algorithm
   - Difficulty adjustment based on performance

2. **Analytics & Reporting**
   - Time spent per question
   - Question difficulty analysis
   - Student performance tracking
   - Weak areas identification

3. **Gamification**
   - Streaks & badges for assessments
   - Leaderboards
   - Daily challenges
   - Achievement unlocks

4. **Advanced Features**
   - Custom assessments
   - Image-based math problems
   - Drawing/handwriting recognition
   - Multi-step problem solutions

---

## 📝 Notes

- Math generator creates problems on-the-fly (no database needed)
- Each assessment gets unique questions
- Retry creates new question set
- All styling is inline (no external CSS files required)
- Uses modern React Hooks (useState, useEffect, useCallback, useRef)
- Fully responsive and mobile-friendly

---

## 🐛 Troubleshooting

### Questions not loading
- Check assessment config has `totalQuestions` field
- Verify `topic` and `level` are lowercase

### Timer not stopping
- Ensure `duration` is a number in minutes
- Check browser console for errors

### Answers not saving
- Verify question ID generation is unique
- Check Redux/state management integration

### Mobile issues
- Test viewport is < 768px for sidebar hide
- Check padding/margin on smaller screens

---

Created: May 11, 2026
