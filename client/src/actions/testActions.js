import axios from "axios";
import {
  GET_SUBJECTS,
  GET_ERRORS,
  GET_SECTIONS,
  GET_QUESTIONS,
  SELECTED_GRADE,
  SELECTED_SUBJECT,
  SELECTED_SECTION,
  TEST_LOADING
} from "./types";

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

export const getQuestions = (grade, subject, section) => dispatch => {
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

export const testLoading = () => dispatch => {
  dispatch({
    type: TEST_LOADING
  });
};
