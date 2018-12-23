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
  ACTION_STATUS
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

export const testLoading = () => dispatch => {
  dispatch({
    type: TEST_LOADING
  });
};
