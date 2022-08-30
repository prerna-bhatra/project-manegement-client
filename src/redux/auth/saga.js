import { takeLatest, call, put } from "redux-saga/effects";

import { loginFailed, loginSuccess, loginUser } from "./action";

import { loginQuery } from "./query";

export function* loginSaga(payload) {
  try {
    const response = yield call(loginQuery, payload);
    yield put(loginSuccess(response.data));
  } catch (err) {
    yield put(loginFailed(err.ERROR));

  }
}

export default function* authManagerSaga() {
  yield takeLatest(loginUser, loginSaga);
}
