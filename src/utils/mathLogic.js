export const generateProblem = (operation, difficulty, availableNumbers = []) => {
  if (operation === 'random') {
    const ops = ['add', 'subtract', 'multiply', 'divide'];
    const randomOp = ops[Math.floor(Math.random() * ops.length)];
    return generateProblem(randomOp, difficulty, availableNumbers);
  }

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Determine if a specific base number was selected
  let baseNum = null;
  if (Array.isArray(availableNumbers) && availableNumbers.length > 0 && !availableNumbers.includes('random')) {
    baseNum = parseInt(availableNumbers[Math.floor(Math.random() * availableNumbers.length)], 10);
  }

  let num1, num2, answer, symbol;

  switch (operation) {
    case 'add': {
      symbol = '+';
      if (difficulty === 'easy') {
        num1 = baseNum !== null ? baseNum : getRandomInt(1, 9);
        num2 = getRandomInt(1, 9);
      } else if (difficulty === 'medium') {
        num1 = baseNum !== null ? baseNum : getRandomInt(10, 99);
        num2 = getRandomInt(10, 99);
      } else {
        num1 = baseNum !== null ? baseNum : getRandomInt(100, 999);
        num2 = getRandomInt(100, 999);
      }
      answer = num1 + num2;
      break;
    }
    case 'subtract': {
      symbol = '-';
      if (difficulty === 'easy') {
        num2 = baseNum !== null ? baseNum : getRandomInt(1, 8);
        num1 = num2 + getRandomInt(1, 9); 
      } else if (difficulty === 'medium') {
        num2 = baseNum !== null ? baseNum : getRandomInt(10, 98);
        num1 = num2 + getRandomInt(10, 89);
      } else {
        num2 = baseNum !== null ? baseNum : getRandomInt(100, 998);
        num1 = num2 + getRandomInt(100, 899);
      }
      answer = num1 - num2;
      break;
    }
    case 'multiply': {
      symbol = '×';
      if (difficulty === 'easy') {
        num1 = baseNum !== null ? baseNum : getRandomInt(1, 9);
        num2 = getRandomInt(1, 9);
      } else if (difficulty === 'medium') {
        if (baseNum !== null) {
          num1 = baseNum;
          num2 = getRandomInt(10, 99);
        } else {
          num1 = getRandomInt(10, 99);
          num2 = getRandomInt(2, 9);
        }
      } else {
        if (baseNum !== null) {
          num1 = baseNum;
          num2 = getRandomInt(100, 999);
        } else {
          num1 = getRandomInt(100, 999);
          num2 = getRandomInt(10, 12);
        }
      }
      answer = num1 * num2;
      break;
    }
    case 'divide': {
      symbol = '÷';
      let safeDivisor = baseNum !== null ? baseNum : null;
      if (safeDivisor === 0) safeDivisor = getRandomInt(1, 9); // Prevent divide by 0

      if (difficulty === 'easy') {
        num2 = safeDivisor !== null ? safeDivisor : getRandomInt(1, 9);
        const quotient = getRandomInt(1, 9);
        num1 = num2 * quotient;
        answer = quotient;
      } else if (difficulty === 'medium') {
        num2 = safeDivisor !== null ? safeDivisor : getRandomInt(2, 9);
        const quotient = getRandomInt(10, 99);
        num1 = num2 * quotient;
        answer = quotient;
      } else {
        num2 = safeDivisor !== null ? safeDivisor : getRandomInt(2, 12);
        const quotient = getRandomInt(100, 999);
        num1 = num2 * quotient;
        answer = quotient;
      }
      break;
    }
    default:
      symbol = '?'; num1 = 0; num2 = 0; answer = 0;
  }

  // Generate 3 unique wrong options close to the correct answer
  const options = new Set([answer]);
  let attempts = 0;
  while (options.size < 4 && attempts < 200) {
    attempts++;
    const variance = Math.max(3, Math.floor(answer * 0.25));
    const wrong = getRandomInt(Math.max(0, answer - variance), answer + variance);
    if (wrong !== answer) options.add(wrong);
  }
  // Safety: fill remaining with guaranteed-distinct values
  let fill = 1;
  while (options.size < 4) { if (!options.has(answer + fill)) options.add(answer + fill); fill++; }

  return {
    num1,
    num2,
    symbol,
    answer,
    options: Array.from(options).sort(() => Math.random() - 0.5),
  };
};
