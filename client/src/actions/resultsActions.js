import axios from "axios";
import {
  GET_RESULTS,
  GET_ERRORS,
  LOADING_RESULTS,
  DELETE_RESULT
} from "./types";

export const saveResult = (newResult, history) => dispatch => {
  axios
    .post("/api/results", newResult)
    .then(res => history.push("/rezultati"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getResults = () => dispatch => {
  dispatch(loadingResults());
  axios.get("/api/results").then(res =>
    dispatch({
      type: GET_RESULTS,
      payload: res.data
    })
  );
};

export const deleteResult = resultId => dispatch => {
  dispatch(loadingResults());
  if (window.confirm("Da li si siguran da želiš obrisati podatke?")) {
    axios.delete(`/api/results/${resultId}`).then(res =>
      dispatch({
        type: DELETE_RESULT,
        payload: resultId
      })
    );
  }
};

export const loadingResults = () => dispatch => {
  dispatch({
    type: LOADING_RESULTS
  });
};
