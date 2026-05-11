// Generate random number based on difficulty level
const getRandomNumber = (difficulty) => {
  const ranges = {
    easy: [1, 10],
    medium: [10, 50],
    hard: [100, 999]
  };

  const [min, max] = ranges[difficulty] || [1, 10];
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate unique random answers for multiple-choice
const generateUniqueAnswers = (correctAnswer, difficulty) => {
  const answers = new Set([correctAnswer]);
  const offsets = [1, 2, 3, 5, 7, 10];

  while (answers.size < 4) {
    const offset = offsets[Math.floor(Math.random() * offsets.length)] * (Math.random() > 0.5 ? 1 : -1);
    const wrongAnswer = Math.max(0, correctAnswer + offset);

    // Ensure it's different from all existing answers
    if (wrongAnswer !== correctAnswer && !answers.has(wrongAnswer)) {
      answers.add(wrongAnswer);
    }
  }

  return Array.from(answers).sort(() => Math.random() - 0.5);
};

// Generate a single math problem
export const generateProblem = (topic, difficulty, questionType) => {
  let num1 = getRandomNumber(difficulty);
  let num2 = getRandomNumber(difficulty);
  let answer;
  let question;
  let questionId = Math.random().toString(36).substr(2, 9);

  // Ensure num2 is smaller for subtraction to avoid negative results
  if (topic === 'subtraction' && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  // Generate answer based on topic
  switch (topic.toLowerCase()) {
    case 'addition':
      answer = num1 + num2;
      question = `${num1} + ${num2}`;
      break;
    case 'subtraction':
      answer = num1 - num2;
      question = `${num1} - ${num2}`;
      break;
    case 'multiplication':
      answer = num1 * num2;
      question = `${num1} × ${num2}`;
      break;
    case 'division':
      // Ensure divisible result
      answer = num1;
      num2 = Math.floor(Math.random() * 10) + 1;
      const dividend = answer * num2;
      question = `${dividend} ÷ ${num2}`;
      break;
    default:
      answer = num1 + num2;
      question = `${num1} + ${num2}`;
  }

  // Generate options for multiple-choice
  let options = [];
  if (questionType === 'multiple-choice') {
    options = generateUniqueAnswers(answer, difficulty);
  }

  return {
    id: questionId,
    question,
    answer: parseInt(answer),
    options: options.length > 0 ? options : undefined,
    topic,
    difficulty,
    questionType,
    num1,
    num2,
    symbol: topic === 'addition' ? '+' : topic === 'subtraction' ? '-' : topic === 'multiplication' ? '×' : '÷'
  };
};

// Generate all questions for an assessment
export const generateAssessmentQuestions = (config) => {
  const { totalQuestions = 30, topic, level, questionType } = config;

  // Validate config
  if (!topic) {
    console.error('Invalid assessment config: missing topic', config);
    return [];
  }
  if (!level) {
    console.error('Invalid assessment config: missing level', config);
    return [];
  }

  // Default to multiple-choice if questionType is not specified
  const finalQuestionType = questionType || 'multiple-choice';

  const questions = [];

  for (let i = 0; i < totalQuestions; i++) {
    const question = generateProblem(topic, level, finalQuestionType);
    // Ensure questionType is always set
    if (!question.questionType) {
      question.questionType = finalQuestionType;
    }
    questions.push(question);
  }

  console.log('Generated questions config:', {
    totalQuestions: questions.length,
    topic,
    level,
    questionType: finalQuestionType,
    sampleQuestion: questions[0]
  });

  return questions;
};

// Calculate score based on answers
export const calculateScore = (questions, userAnswers) => {
  let correctCount = 0;

  questions.forEach(question => {
    const userAnswer = userAnswers[question.id];
    if (userAnswer !== undefined && parseInt(userAnswer) === question.answer) {
      correctCount++;
    }
  });

  return {
    correct: correctCount,
    total: questions.length,
    percentage: Math.round((correctCount / questions.length) * 100),
    score: correctCount
  };
};
