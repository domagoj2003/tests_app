import {
  GET_TEST_QUESTIONS,
  TEST_LOADING,
  GET_CURRENT_QUESTION,
  REMOVE_CURRENT_QUESTION,
  HELP_GET,
  ADD_POINTS,
  CLEAR_FIELDS,
  ACTION_STATUS,
  COUNT_QUESTION,
  TOTAL_QUESTIONS,
  SHUFFLE_OPTIONS,
  SET_TIMER,
  RESET_TEST,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  SET_MAXPOINTS,
  NO_HELP
} from "./types";
import axios from "axios";

import shuffle from "shuffle-array";

export const getTestQuestions = (
  grade,
  subject,
  section,
  history
) => dispatch => {
  dispatch(testLoading());
  axios
    .get(`/api/tests/${grade}/${subject}/${section}`)
    .then(res =>
      dispatch({
        type: GET_TEST_QUESTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_TEST_QUESTIONS,
        payload: []
      })
    );
  history.push("/test");
};

export const newQuestion = questions => dispatch => {
  dispatch(clearFields());
  dispatch(questionCounter());
  dispatch(actionStatus());
  const currentIndex = Math.floor(Math.random() * questions.length);
  const currentQuestion = questions[currentIndex];
  const id = currentQuestion._id;
  dispatch({
    type: GET_CURRENT_QUESTION,
    payload: currentQuestion
  });
  dispatch({
    type: REMOVE_CURRENT_QUESTION,
    payload: id
  });
  if (currentQuestion.sort === "B") {
    dispatch(
      answerOptions(currentQuestion.correctanswer, currentQuestion.options)
    );
  }
};

export const answerOptions = (answer, options) => dispatch => {
  let correctAnswer = new Array(answer);
  let wrongAnswers = options.split(",").filter(option => option !== false);
  let answerArr = shuffle(correctAnswer.concat(wrongAnswers));
  dispatch({
    type: SHUFFLE_OPTIONS,
    payload: answerArr
  });
};

export const setTimer = () => dispatch => {
  dispatch({
    type: SET_TIMER,
    payload: 1
  });
};
export const answerStatus = isCorrect => dispatch => {
  if (isCorrect) {
    dispatch({
      type: CORRECT_ANSWER
    });
  } else {
    dispatch({
      type: WRONG_ANSWER
    });
  }
};

export const helpStatus = () => dispatch => {
  dispatch({
    type: HELP_GET
  });
};

export const noHelp = () => dispatch => {
  dispatch({
    type: NO_HELP
  });
};

export const addPoints = points => dispatch => {
  dispatch({
    type: ADD_POINTS,
    payload: points
  });
};
export const setTotalQuestions = questionsNum => dispatch => {
  dispatch({
    type: TOTAL_QUESTIONS,
    payload: questionsNum
  });
};
export const setMaxPoints = points => dispatch => {
  dispatch({
    type: SET_MAXPOINTS,
    payload: points
  });
};

export const questionCounter = () => dispatch => {
  dispatch({
    type: COUNT_QUESTION,
    payload: 1
  });
};

export const actionStatus = () => dispatch => {
  dispatch({
    type: ACTION_STATUS
  });
};
export const clearFields = () => dispatch => {
  dispatch({
    type: CLEAR_FIELDS
  });
};
export const resetTest = () => dispatch => {
  dispatch({
    type: RESET_TEST
  });
};
export const testLoading = () => dispatch => {
  dispatch({
    type: TEST_LOADING
  });
};
