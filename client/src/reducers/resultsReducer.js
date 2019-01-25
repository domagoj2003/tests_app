import { GET_RESULTS, LOADING_RESULTS, DELETE_RESULT } from "../actions/types";

const initialState = {
  loading: false,
  resultList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_RESULTS:
      return {
        ...state,
        resultList: action.payload,
        loading: false
      };
    case DELETE_RESULT:
      return {
        ...state,
        resultList: state.resultList.filter(res => res._id !== action.payload),
        loading: false
      };
    case LOADING_RESULTS:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
