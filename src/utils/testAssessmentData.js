// Quick test to verify assessment data is valid
import { baseAssessments } from '../data/curriculum/assessment';
import { validateAssessment } from './assessmentValidator';

export const testAssessmentData = () => {
  console.log('=== ASSESSMENT DATA TEST ===');
  console.log('Total assessments:', baseAssessments.length);

  baseAssessments.forEach((assessment, index) => {
    console.log(`\nAssessment ${index + 1}:`);
    console.log('  ID:', assessment.id);
    console.log('  Name:', assessment.name);
    console.log('  Topic:', assessment.topic);
    console.log('  Level:', assessment.level);
    console.log('  QuestionType:', assessment.questionType);
    console.log('  TotalQuestions:', assessment.totalQuestions);
    console.log('  Duration:', assessment.duration);
    console.log('  Status:', assessment.status);

    const validation = validateAssessment(assessment);
    if (validation.valid) {
      console.log('  ✓ Valid');
    } else {
      console.error('  ✗ Invalid - Errors:', validation.errors);
    }
  });

  const completedAssessments = baseAssessments.filter(a => a.status === 'Completed');
  console.log('\n=== SUMMARY ===');
  console.log('Completed assessments:', completedAssessments.length);
  console.log('Clickable assessments:', completedAssessments.map(a => `${a.id}:${a.name}`));
};

// Run test on import
if (typeof window !== 'undefined') {
  window.testAssessmentData = testAssessmentData;
  console.log('✓ testAssessmentData() available in console');
}
