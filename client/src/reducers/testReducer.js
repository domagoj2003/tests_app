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
  ACTION_STATUS,
  COUNT_QUESTION,
  TOTAL_QUESTIONS,
  SET_TIMER,
  RESET_TEST
} from "../actions/types";

const initialState = {
  questions: null,
  currentQuestion: null,
  actionStatus: undefined,
  maxPoints: 100,
  points: 0,
  timer: 15,
  answerStatus: null,
  helpStatus: null,
  questionsTotal: null,
  questionCounter: 0,
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
    case COUNT_QUESTION:
      return {
        ...state,
        questionCounter: state.questionCounter + action.payload
      };
    case TOTAL_QUESTIONS:
      return {
        ...state,
        questionsTotal: action.payload
      };
    case SET_TIMER:
      return {
        ...state,
        timer: state.timer - action.payload
      };

    case CLEAR_FIELDS:
      return {
        ...state,
        timer: initialState.timer,
        answerStatus: initialState.answerStatus,
        helpStatus: initialState.helpStatus,
        actionStatus: initialState.actionStatus
      };
    case RESET_TEST:
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
