import { combineReducers } from "redux";
import postsReducer from "./posts/reducer";
import loginReducer from "./auth/reducer";

export default combineReducers({
  posts: postsReducer,
  login: loginReducer,
});
