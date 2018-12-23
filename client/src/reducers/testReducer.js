import {
  GET_TEST_QUESTIONS,
  TEST_LOADING,
  GET_CURRENT_QUESTION,
  REMOVE_CURRENT_QUESTION,
  ANSWER_CORRECT,
  ANSWER_WRONG,
  HELP_GET,
  ADD_POINTS,
  CLEAR_FIELDS,
  ACTION_STATUS
} from "../actions/types";

const initialState = {
  questions: null,
  currentQuestion: null,
  actionStatus: false,
  maxPoints: 100,
  points: 0,
  time: 20,
  answerStatus: null,
  helpStatus: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TEST_QUESTIONS:
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
    case GET_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload,
        loading: false
      };
    case ANSWER_CORRECT:
      return {
        ...state,
        answerStatus: true
      };
    case ANSWER_WRONG:
      return {
        ...state,
        answerStatus: false
      };
    case HELP_GET:
      return {
        ...state,
        helpStatus: true
      };
    case ADD_POINTS:
      return {
        ...state,
        points: state.points + action.payload
      };
    case ACTION_STATUS:
      return {
        ...state,
        actionStatus: !state.actionStatus
      };
    case CLEAR_FIELDS:
      return initialState;
    case REMOVE_CURRENT_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(
          question => question._id !== action.payload
        )
      };

    default:
      return state;
  }
}
