# Blank Page Debug Guide

If you're seeing a blank page after clicking "Take Assessment", follow these steps to find the error.

## Step 1: Open Browser Console

1. **Press F12** to open Developer Tools
2. **Click "Console" tab** at the top
3. **Look for any RED ERROR messages**

The error message will tell you exactly what's wrong.

---

## Step 2: Check for Common Errors

### Error: "Cannot find module..."
**Cause:** Missing import file  
**Solution:** Check that all files exist in src/pages/ and src/components/

### Error: "assessment is null" or "assessment is undefined"
**Cause:** Assessment not being passed correctly  
**Solution:** Check that assessment.totalQuestions exists

### Error: "questions is not iterable"
**Cause:** generateAssessmentQuestions() returned an error  
**Solution:** Check console logs for question generation errors

### Error: ".questionType is not a function"
**Cause:** question.questionType is being called as function  
**Solution:** Check QuestionRenderer.jsx - questionType should be a string, not a function

---

## Step 3: Run the Assessment Data Test

1. **Open Browser Console** (F12)
2. **Type:** `testAssessmentData()`
3. **Press Enter**
4. **Check the output** - it will show:
   - All 8 assessments and their properties
   - Whether each is valid or not
   - How many can be clicked (status = "Completed")

You should see something like:
```
=== ASSESSMENT DATA TEST ===
Total assessments: 8

Assessment 1:
  ID: 1
  Name: Math Addition Test
  Topic: addition
  Level: easy
  QuestionType: multiple-choice
  TotalQuestions: 30
  Duration: 30
  Status: Completed
  ✓ Valid
```

---

## Step 4: Test Taking an Assessment

1. **Open Console** (F12)
2. **Clear previous logs** (click the trash icon)
3. **Go to Achievement Tab**
4. **Click "Take Assessment"** on a locked item (only id:1 or id:2 work - they have status "Completed")
5. **Watch Console** - you should see:
   ```
   Taking assessment: { id: 1, name: "Math Addition Test", ... }
   ✓ Assessment has required fields, using directly: { ... }
   ✓ Assessment is valid: { ... }
   Generated questions config: { ... }
   ```

---

## Step 5: Common Fixes

### Issue: Only seeing "Loading assessment..." forever
**Check:**
- Does assessment have `totalQuestions: 30`? (should be a number)
- Does assessment have `duration: 30`? (should be a number)
- Does assessment have `topic`? (should be: addition, subtraction, multiplication, division)
- Does assessment have `level`? (should be: easy, medium, hard)
- Does assessment have `questionType`? (should be: multiple-choice, text-input, long-method)

### Issue: Questions not generating
**Check console for:**
- "Generated questions config:" - if not there, questions didn't generate
- "First question with type:" - if not there, something failed

### Issue: Blank page with no errors in console
**Try:**
1. Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. Clear cache: Go to console → Application → Clear site data
3. Close and reopen the browser

---

## Step 6: Screenshot the Console

If still stuck:
1. **Take a screenshot of the console errors**
2. **Copy the error messages**
3. **Share them** so I can help you fix it

The error text is the key to fixing the issue.

---

## Test Checklist

- [ ] Console shows no red errors
- [ ] `testAssessmentData()` shows 8 assessments
- [ ] All 8 assessments show "✓ Valid"
- [ ] At least 2 assessments have status "Completed"
- [ ] Can click "Take Assessment" on a completed assessment
- [ ] Console shows "Taking assessment: ..."
- [ ] Console shows "✓ Assessment has required fields..."
- [ ] Questions start loading
- [ ] Assessment page displays (not blank)

---

## Files Created for Debugging

- `src/utils/testAssessmentData.js` - Run `testAssessmentData()` in console
- `src/utils/assessmentValidator.js` - Validates assessment objects
- `ASSESSMENT_TROUBLESHOOTING.md` - Complete troubleshooting guide

---

## Quick Reference: Assessment Requirements

Every assessment MUST have:

```javascript
{
  id: 1,                          // number
  slug: "math-add-lvl1",         // string
  name: "Math Addition Test",    // string
  description: "Level 1...",     // string
  scoreTarget: 25,               // number
  totalQuestions: 30,            // number ← REQUIRED
  duration: 30,                  // number (minutes) ← REQUIRED
  topic: "addition",             // 'addition'|'subtraction'|'multiplication'|'division'
  level: "easy",                 // 'easy'|'medium'|'hard'
  questionType: "multiple-choice", // 'multiple-choice'|'text-input'|'long-method'
  status: "Completed"            // 'Completed'|'Pending'|'Failed'
}
```

Only assessments with `status: "Completed"` can be clicked to take the assessment.

---

Still having issues? Run these in console:
```javascript
// Check if assessment module imports correctly
import { baseAssessments } from './src/data/curriculum/assessment';

// Check if validator works
import { validateAssessment } from './src/utils/assessmentValidator';

// Test the first assessment
console.log(validateAssessment(baseAssessments[0]));
```

