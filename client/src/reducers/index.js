import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import testsReducer from "./testsReducer";
import testReducer from "./testReducer";
import selectReducer from "./selectReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  tests: testsReducer,
  selected: selectReducer,
  test: testReducer
});
