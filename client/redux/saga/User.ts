import { takeLatest, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import axios from "axios";

function* register(action: any): Generator {
  const { data, callback } = action.payload;

  const user = yield axios.post("/api/user/register", data).then((res) => {
    return res.data.user;
  });

  yield put({ type: "user/setUser", payload: { user } });

  if (callback) {
    yield callback();
  }
}

function* login(action: any): Generator {
  const { data, callback } = action.payload;
  const user = yield axios.post("/api/auth/login", data).then((res) => {
    return res.data.user;
  });

  yield put({ type: "user/setUser", payload: { user } });

  if (callback) {
    yield callback();
  }
}

function* update(action: any): Generator {
  const { data, callback } = action.payload;

  yield axios.post("/api/auth/update", data).then((res) => {
    return res.data.user;
  });

  // yield put({ type: "user/setUser", payload: { user } });

  if (callback) {
    yield callback();
  }
}

export default function* User(): SagaIterator {
  yield takeLatest("user/register", register);
  yield takeLatest("user/login", login);
  yield takeLatest("user/updateName", update);
}
