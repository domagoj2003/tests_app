const isCorrect = (answer, userInput) => {
  let correctAnswer = answer
    .trim()
    .replace(/\s/g, "")
    .toLowerCase();

  let userAnswer = userInput
    .trim()
    .replace(/\s/g, "")
    .toLowerCase();
  const removeIndex = correctAnswer.length - 3;
  correctAnswer = correctAnswer.substring(0, removeIndex);

  return userAnswer.includes(correctAnswer);
};

export default isCorrect;
