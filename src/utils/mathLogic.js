export const generateProblem = (operation, difficulty, availableNumbers = []) => {
  if (operation === 'random') {
    const ops = ['add', 'subtract', 'multiply', 'divide'];
    const randomOp = ops[Math.floor(Math.random() * ops.length)];
    return generateProblem(randomOp, difficulty, availableNumbers);
  }

  let min, max;

  // Define range based on difficulty
  // Easy: 1-9 (Single digit)
  // Medium: 1-12 (Multiplication table range)
  // Define range based on difficulty (Digits)
  // Easy: Single digit (1-9)
  // Medium: Two digits (10-99)
  // Hard: Three digits (100-999)
  switch (difficulty) {
    case 'easy':
      min = 1;
      max = 9;
      break;
    case 'hard':
      min = 10; // Allow mixing, but focus on higher numbers
      max = 999;
      break;
    case 'medium':
    default:
      min = 5; // Start slightly higher to encourage 2-digit usage
      max = 99;
      break;
  }

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  let num1, num2, answer, symbol;

  switch (operation) {
    case 'add':
      symbol = '+';
      num1 = getRandomInt(min, max);
      num2 = getRandomInt(min, max);
      answer = num1 + num2;
      break;
    case 'subtract':
      symbol = '-';
      num1 = getRandomInt(min, max);
      num2 = getRandomInt(min, max);
      // Ensure positive result for younger kids (swap if needed)
      if (num1 < num2) [num1, num2] = [num2, num1];
      answer = num1 - num2;
      break;
    case 'multiply':
      symbol = '×';
      // If specific numbers are selected, force num1 using them
      if (availableNumbers && availableNumbers.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableNumbers.length);
        num1 = availableNumbers[randomIndex];

        // num2 scales with difficulty
        if (difficulty === 'easy') {
          num2 = getRandomInt(0, 12); // User requested 0-12 range for easy focus
        } else {
          num2 = getRandomInt(min, max);
        }
      } else {
        // Standard random multiplication
        num1 = getRandomInt(min, max);
        if (difficulty === 'easy') {
          num2 = getRandomInt(1, 9);
        } else if (difficulty === 'medium') {
          num2 = getRandomInt(2, 12); // Limit multiplier for mental math
        } else { // hard
          num2 = getRandomInt(2, 20); // Harder but solvable
        }
      }
      answer = num1 * num2;
      break;
    case 'divide':
      symbol = '÷';
      const divisorMax = difficulty === 'easy' ? 9 : 12;
      num2 = getRandomInt(2, divisorMax); // Divisor (2-9 or 2-12)

      // Quotient (Answer) comes from the difficulty range
      const quotient = getRandomInt(min, max);

      num1 = num2 * quotient; // Dividend is guaranteed multiple
      answer = quotient;
      break;
    default:
      symbol = '?';
      num1 = 0;
      num2 = 0;
      answer = 0;
  }

  // Generate strict wrong options (unique and close to answer)
  const options = new Set([answer]);
  while (options.size < 4) {
    // Generate a wrong answer within a reasonable range of the correct answer
    // e.g. answer +/- 5 or 10
    const variance = Math.max(5, Math.floor(answer * 0.5));
    const wrong = getRandomInt(Math.max(0, answer - variance), answer + variance);
    if (wrong !== answer) options.add(wrong);
  }

  return {
    num1,
    num2,
    symbol,
    answer,
    options: Array.from(options).sort(() => Math.random() - 0.5) // Shuffle options
  };
};
