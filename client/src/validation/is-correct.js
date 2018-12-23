const isCorrect = (answer, userInput) => {
  let correctAnswer = answer
    .trim()
    .replace(/\s/g, "")
    .toLowerCase();

  let userAnswer = userInput
    .trim()
    .replace(/\s/g, "")
    .toLowerCase();
  const removeIndex = userAnswer.length - 2;
  userAnswer = userAnswer.substring(0, removeIndex);

  return correctAnswer.includes(userAnswer);
};

export default isCorrect;
