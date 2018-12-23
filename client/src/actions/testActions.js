import axios from "axios";
import {
  GET_SUBJECTS,
  GET_SUBJECT,
  GET_SECTIONS,
  GET_QUESTIONS,
  SELECTED_GRADE,
  SELECTED_SUBJECT,
  SELECTED_SECTION,
  TEST_LOADING,
  CLEAR_SELECTION,
  DELETE_QUESTION,
  GET_ERRORS
} from "./types";

export const createQuestion = (grade, subject, questionData) => dispatch => {
  dispatch(testLoading());
  axios
    .post(`/api/tests/${grade}/${subject}`, questionData)
    .then(res =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createSubject = (grade, subjectData) => dispatch => {
  dispatch(testLoading());
  axios
    .post(`/api/tests/${grade}`, subjectData)
    .then(res =>
      dispatch({
        type: GET_SUBJECT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SUBJECT,
        payload: []
      })
    );
};

export const getSubjects = grade => dispatch => {
  dispatch(testLoading());
  axios
    .get(`/api/tests/${grade}`)
    .then(res =>
      dispatch({
        type: GET_SUBJECTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SUBJECTS,
        payload: []
      })
    );
};

export const getSections = (grade, subject) => dispatch => {
  dispatch(testLoading());
  axios
    .get(`/api/tests/${grade}/${subject}`)
    .then(res =>
      dispatch({
        type: GET_SECTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_SECTIONS,
        payload: []
      })
    );
};

export const getQuestions = (grade, subject, section, history) => dispatch => {
  dispatch(testLoading());
  axios
    .get(`/api/tests/${grade}/${subject}/${section}`)
    .then(res =>
      dispatch({
        type: GET_QUESTIONS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_QUESTIONS,
        payload: []
      })
    );
  if (history) {
    history.push("/test");
  }
};

export const selectGrade = grade => dispatch => {
  dispatch({
    type: SELECTED_GRADE,
    payload: grade
  });
};

export const selectSubject = subject => dispatch => {
  dispatch({
    type: SELECTED_SUBJECT,
    payload: subject
  });
};

export const selectSection = section => dispatch => {
  dispatch({
    type: SELECTED_SECTION,
    payload: section
  });
};

export const clearSelections = () => dispatch => {
  dispatch({
    type: CLEAR_SELECTION
  });
};

export const deleteQuestion = (grade, subject, questionId) => dispatch => {
  dispatch(testLoading());
  axios
    .delete(`/api/tests/${grade}/${subject}/${questionId}`)
    .then(res =>
      dispatch({
        type: DELETE_QUESTION,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const testLoading = () => dispatch => {
  dispatch({
    type: TEST_LOADING
  });
};
