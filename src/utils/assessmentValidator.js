// Validate assessment object has all required fields
export const validateAssessment = (assessment) => {
  const requiredFields = [
    'id',
    'name',
    'topic',
    'level',
    'questionType',
    'totalQuestions',
    'duration',
    'scoreTarget'
  ];

  const missingFields = [];

  requiredFields.forEach(field => {
    if (assessment[field] === undefined || assessment[field] === null) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    console.error('Assessment validation failed. Missing fields:', missingFields);
    console.error('Assessment object:', assessment);
    return {
      valid: false,
      errors: missingFields,
      assessment
    };
  }

  // Validate field values
  const errors = [];

  const validTopics = ['addition', 'subtraction', 'multiplication', 'division'];
  if (!validTopics.includes(assessment.topic)) {
    errors.push(`Invalid topic: ${assessment.topic}. Must be one of: ${validTopics.join(', ')}`);
  }

  const validLevels = ['easy', 'medium', 'hard'];
  if (!validLevels.includes(assessment.level)) {
    errors.push(`Invalid level: ${assessment.level}. Must be one of: ${validLevels.join(', ')}`);
  }

  const validQuestionTypes = ['multiple-choice', 'text-input', 'long-method'];
  if (!validQuestionTypes.includes(assessment.questionType)) {
    errors.push(`Invalid questionType: ${assessment.questionType}. Must be one of: ${validQuestionTypes.join(', ')}`);
  }

  if (assessment.totalQuestions < 1 || !Number.isInteger(assessment.totalQuestions)) {
    errors.push(`Invalid totalQuestions: ${assessment.totalQuestions}. Must be a positive integer.`);
  }

  if (assessment.duration < 1 || !Number.isInteger(assessment.duration)) {
    errors.push(`Invalid duration: ${assessment.duration}. Must be a positive integer (minutes).`);
  }

  if (assessment.scoreTarget < 1 || !Number.isInteger(assessment.scoreTarget)) {
    errors.push(`Invalid scoreTarget: ${assessment.scoreTarget}. Must be a positive integer.`);
  }

  if (errors.length > 0) {
    console.error('Assessment validation errors:', errors);
    return {
      valid: false,
      errors,
      assessment
    };
  }

  return {
    valid: true,
    errors: [],
    assessment
  };
};

// Format assessment for logging
export const logAssessment = (assessment) => {
  return {
    id: assessment.id,
    name: assessment.name,
    topic: assessment.topic,
    level: assessment.level,
    questionType: assessment.questionType,
    totalQuestions: assessment.totalQuestions,
    duration: `${assessment.duration} min`,
    scoreTarget: assessment.scoreTarget
  };
};
