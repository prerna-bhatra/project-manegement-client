import { all ,fork} from "redux-saga/effects";
import posts from "./posts/saga";
import authManagerSaga from "./auth/saga";

function* rootSaga() {
  // yield all([posts()]);
  yield fork(authManagerSaga);
}

export default rootSaga;
