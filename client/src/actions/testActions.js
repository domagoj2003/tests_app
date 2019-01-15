import {
  GET_TEST_QUESTIONS,
  TEST_LOADING,
  GET_CURRENT_QUESTION,
  REMOVE_CURRENT_QUESTION,
  ANSWER_CORRECT,
  ANSWER_WRONG,
  HELP_GET,
  ADD_POINTS,
  CLEAR_FIELDS,
  ACTION_STATUS,
  COUNT_QUESTION,
  TOTAL_QUESTIONS,
  SET_TIMER,
  RESET_TEST
} from "./types";
import axios from "axios";

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
      type: ANSWER_CORRECT
    });
  } else {
    dispatch({
      type: ANSWER_WRONG
    });
  }
};

export const helpStatus = () => dispatch => {
  dispatch({
    type: HELP_GET
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
