# Assessment Module - Troubleshooting Guide

## 🔍 Validation & Debugging

The system now includes comprehensive validation to ensure the `questionType` and other assessment properties are correctly used.

### How to Debug

1. **Open Browser Console** (F12 or Dev Tools)
2. **Go to Achievement Tab** → **Click "Take Assessment"**
3. **Check Console Logs** for messages like:
   - ✓ Assessment validation passed
   - Generated questions config (shows questionType)
   - Rendering question type: (shows what format is being used)

---

## ✅ Required Assessment Fields

Every assessment in `baseAssessments` MUST have these fields:

```javascript
{
  id: 1,                              // Unique identifier
  slug: "math-add-lvl1",             // Unique slug
  name: "Math Additional Test",       // Display name
  description: "Level 1 : Age 4-6",  // Description
  topic: "addition",                  // REQUIRED: 'addition', 'subtraction', 'multiplication', 'division'
  level: "easy",                      // REQUIRED: 'easy', 'medium', 'hard'
  questionType: "multiple-choice",   // REQUIRED: 'multiple-choice', 'text-input', 'long-method'
  totalQuestions: 30,                // REQUIRED: Number of questions
  duration: 30,                       // REQUIRED: Minutes
  scoreTarget: 25,                    // REQUIRED: Points needed to pass
  status: "Completed"                 // Optional: Status badge
}
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "All questions show as Multiple Choice"
**Cause:** questionType is not set or is invalid  
**Solution:**
1. Check `assessment.json` - ensure `questionType` field exists for all assessments
2. Look at browser console - should show the questionType being used
3. Verify `questionType` value is exactly one of:
   - `"multiple-choice"`
   - `"text-input"`
   - `"long-method"`

### Issue 2: "Assessment validation failed"
**Cause:** Missing required fields  
**Solution:**
1. Check browser console for error message listing missing fields
2. Update assessment object in `assessment.js` to include all required fields
3. Ensure field values are valid (see "Valid Values" section below)

### Issue 3: "Questions not loading"
**Cause:** Assessment properties are invalid  
**Solution:**
1. Open console and look for validation errors
2. Check that:
   - `topic` is lowercase (e.g., `"addition"` not `"Addition"`)
   - `level` is lowercase (e.g., `"easy"` not `"Easy"`)
   - `questionType` is exact match (e.g., `"multiple-choice"` not `"multipleChoice"`)
   - Numbers are integers (30, not "30")

### Issue 4: "Buttons not working or showing wrong format"
**Cause:** Question type mismatch  
**Solution:**
1. Check console logs show correct questionType
2. Verify QuestionRenderer can recognize the type
3. If still broken, check:
   - TextInput format needs `onSubmit` callback (Enter to submit)
   - LongMethod format needs `onSubmit` callback (workbook layout)
   - MultipleChoice auto-submits after selection

---

## 🔧 Valid Values Reference

### Topic (must be lowercase)
```javascript
"addition"      // 1 + 2
"subtraction"   // 5 - 2
"multiplication"// 3 × 4
"division"      // 8 ÷ 2
```

### Level (must be lowercase)
```javascript
"easy"          // Numbers 1-10
"medium"        // Numbers 10-50
"hard"          // Numbers 100-999
```

### Question Type (must be exact match)
```javascript
"multiple-choice" // 2×2 grid of buttons
"text-input"      // Single text input + submit
"long-method"     // Workbook-style vertical layout
```

---

## 📊 Validation Flow

```
Assessment Object
      ↓
validateAssessment()
      ↓
[Check all fields exist]
      ↓
[Check field values are valid]
      ↓
generateAssessmentQuestions()
      ↓
[Creates questions with matching questionType]
      ↓
QuestionRenderer
      ↓
[Renders correct component based on questionType]
```

---

## 🧪 Testing the Fix

### Test 1: Verify Validation
1. Open DevTools Console
2. Go to Achievement Tab → Click "Take Assessment"
3. Look for message: "✓ Assessment is valid: { topic, level, questionType, ... }"

### Test 2: Verify Question Type is Used
1. Check console log: "Generated questions config: { questionType: '...' }"
2. Check: "First question with type: { questionType: '...' }"
3. Check: "Rendering question type: ..." (repeats for each question)

### Test 3: Verify Correct Format Shows
1. **Multiple Choice:** Should show 2×2 grid of buttons
2. **Text Input:** Should show input field + submit button
3. **Long Method:** Should show workbook-style vertical math layout

---

## 🔍 Debug Checklist

- [ ] Assessment object has all required fields
- [ ] Field values are exact matches (case-sensitive)
- [ ] topic is one of: addition, subtraction, multiplication, division
- [ ] level is one of: easy, medium, hard
- [ ] questionType is one of: multiple-choice, text-input, long-method
- [ ] Browser console shows validation passed
- [ ] Console shows correct questionType in logs
- [ ] Correct question format displays (buttons, input, or workbook)
- [ ] Questions are interactive (can click/type/submit)
- [ ] Timer starts at 30:00
- [ ] Question navigator sidebar shows (desktop only)

---

## 📋 Example Assessment Objects

### Multiple Choice Assessment
```javascript
{
  id: 1,
  slug: "math-add-lvl1",
  name: "Math Additional Test",
  description: "Level 1 : Age 4-6",
  topic: "addition",
  level: "easy",
  questionType: "multiple-choice",
  totalQuestions: 30,
  duration: 30,
  scoreTarget: 25,
  status: "Completed"
}
```

### Text Input Assessment
```javascript
{
  id: 2,
  slug: "math-mul-lvl2",
  name: "Multiplication Speed Test",
  description: "Level 2 : Age 7-8",
  topic: "multiplication",
  level: "medium",
  questionType: "text-input",
  totalQuestions: 30,
  duration: 30,
  scoreTarget: 20,
  status: "Pending"
}
```

### Long Method Assessment
```javascript
{
  id: 3,
  slug: "math-div-lvl3",
  name: "Division Workbook",
  description: "Level 3 : Age 8-9",
  topic: "division",
  level: "hard",
  questionType: "long-method",
  totalQuestions: 30,
  duration: 30,
  scoreTarget: 18,
  status: "Pending"
}
```

---

## 🚀 Console Commands (for testing)

```javascript
// Check if assessment is valid (in console)
import { validateAssessment } from './utils/assessmentValidator';
const result = validateAssessment(yourAssessmentObject);
console.log(result);

// Generate sample questions to test
import { generateAssessmentQuestions } from './utils/mathGenerator';
const questions = generateAssessmentQuestions({
  totalQuestions: 5,
  topic: 'addition',
  level: 'easy',
  questionType: 'multiple-choice'
});
console.log(questions);
```

---

## 📞 Still Having Issues?

1. **Check the logs** - Console logs are the main debugging tool
2. **Verify assessment.js** - Make sure all assessments have required fields
3. **Use the validator** - Run `validateAssessment()` on suspect assessment objects
4. **Test with sample data** - Create a simple test assessment and verify it works
5. **Check field names** - Ensure they match exactly (case-sensitive)

---

Created: May 11, 2026
