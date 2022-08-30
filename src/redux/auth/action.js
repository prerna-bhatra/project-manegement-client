import { createAction } from "redux-actions";

export const loginUser = createAction("LOGIN_USER");
export const loginSuccess = createAction("LOGIN_SUCCESS");
export const loginFailed = createAction("LOGIN_FAILED");
export const logoutAction = createAction("LOGOUT")
// export const loginCancel= createAction("LOGIN_CANCEL");