import {
  GET_SUBJECTS,
  GET_QUESTIONS,
  GET_SECTIONS,
  TEST_LOADING
} from "../actions/types";

const initialState = {
  subjects: null,
  sections: null,
  questions: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
        loading: false
      };
    case GET_SECTIONS:
      return {
        ...state,
        sections: action.payload,
        loading: false
      };
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    case TEST_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
