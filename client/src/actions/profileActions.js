import {
  GET_PROFILE,
  GET_ERRORS,
  PROFILE_LOADING,
  GET_PROFILES
} from "./types";
import axios from "axios";

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/profil"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const profileLoading = () => dispatch => {
  dispatch({
    type: PROFILE_LOADING
  });
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(profileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Get user profiles
export const getUserProfiles = userId => dispatch => {
  dispatch(profileLoading());
  axios.get(`/api/profile/${userId}`).then(res =>
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  );
};

export const saveResult = (newResult, history) => dispatch => {
  axios
    .post("/api/profile/result", newResult)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .then(res => history.push("/profil"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
