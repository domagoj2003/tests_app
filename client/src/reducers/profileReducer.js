import { GET_PROFILE } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        currentProfile: action.payload
      };

    default:
      return state;
  }
}
