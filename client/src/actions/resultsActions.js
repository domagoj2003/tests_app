import axios from "axios";
import { GET_RESULTS, GET_ERRORS, LOADING_RESULTS } from "./types";

export const saveResult = (newResult, history) => dispatch => {
  axios
    .post("/api/results", newResult)
    .then(history.push("/rezultati"))
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

export const loadingResults = () => dispatch => {
  dispatch({
    type: LOADING_RESULTS
  });
};
