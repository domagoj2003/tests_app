import {
  SELECTED_GRADE,
  SELECTED_SUBJECT,
  SELECTED_SECTION,
  CLEAR_SELECTION
} from "../actions/types";

const initialState = {
  selectedGrade: null,
  selectedSubject: null,
  selectedSection: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECTED_GRADE:
      return {
        ...state,
        selectedGrade: action.payload
      };
    case SELECTED_SUBJECT:
      return {
        ...state,
        selectedSubject: action.payload
      };
    case SELECTED_SECTION:
      return {
        ...state,
        selectedSection: action.payload
      };
    case CLEAR_SELECTION:
      return initialState;
    default:
      return state;
  }
}
