import { GET_PROFILE, GET_ERRORS, PROFILE_LOADING } from "./types";
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

// Retrieve current profile
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
