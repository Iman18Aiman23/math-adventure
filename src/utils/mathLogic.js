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

  let num1 = getRandomInt(min, max);
  let num2 = getRandomInt(min, max);
  let answer;
  let symbol;

  switch (operation) {
    case 'add':
      symbol = '+';
      answer = num1 + num2;
      break;
    case 'subtract':
      symbol = '-';
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
        // To keep it mental-math friendly:
        // Easy: 1-digit x 1-digit
        // Medium: 2-digit x 1-digit (mostly)
        // Hard: 3-digit x 1-digit
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
      // Inverse of multiplication logic
      // Answer (quotient) should be the "difficulty" size? 
      // Or Dividend should be? Usually Dividend is the large number.
      // Let's make the Answer (Quotient) the size of the difficulty range, 
      // and the Divisor relatively small (1-12) so it's a "division by X" drill.

      const divisorMax = difficulty === 'easy' ? 9 : 12;
      num2 = getRandomInt(2, divisorMax); // Divisor

      // Quotient (Answer) comes from the difficulty range
      // e.g. Hard: Quotient 100-999. Problem: 5000 / 5 = 1000? 
      // Let's stick to the requested "using 3 digits" -> Quotient is 3 digits.
      const quotient = getRandomInt(min, max);

      num1 = num2 * quotient; // Dividend
      answer = quotient;
      break;
    default:
      symbol = '?';
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
