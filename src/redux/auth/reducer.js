import { handleActions } from "redux-actions";
import { loginUser, loginSuccess, loginFailed, logoutAction } from "./action";

const DEFAULT_STATE = {
  isLoggedIn: !!localStorage.getItem("token"),
  status: "",
  user: {
    id: localStorage.getItem("id"),
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
  },
  token: "",
};

const handlers = {
  [loginUser]: (state) => ({ ...state, status: "PENDING" }),

  [loginSuccess]: (state, action) => {
    if (action.error) {
      return { ...state, status: "ERROR" };
    } else {
      const token = action.payload.token;
      return { ...state, status: "SUCCESS", token, isLoggedIn: true };
    }
  },
  [loginFailed]: (state, action) => {
    return { ...state, status: "ERROR", token: "" };
  },
  [logoutAction]: (state, action) => {
    return {
      ...state,
      isLoggedIn: false,
      user: {
        name: "",
        id: "",
        email: "",
      },
    };
  },
};

export default handleActions(handlers, DEFAULT_STATE);
