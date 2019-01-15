import {
  GET_SUBJECTS,
  GET_QUESTIONS,
  GET_SECTIONS,
  LOADING_TESTS,
  CLEAR_SELECTION,
  DELETE_QUESTION,
  GET_SUBJECT
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
    case GET_SUBJECT:
      return {
        ...state,
        subjects: [action.payload, ...state.subjects],
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
    case CLEAR_SELECTION:
      return initialState;

    case DELETE_QUESTION:
      return {
        ...state,
        questions: action.payload,
        loading: false
      };
    case LOADING_TESTS:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
