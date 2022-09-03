import { takeLatest, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import axios, { AxiosResponse } from "axios";

function* register(action: any): Generator {
  const { data, callback } = action.payload;
  const res: any = yield axios.post("/api/user/register", data);

  if (callback) {
    yield callback(res.data);
  }
}

function* sendConfirmEmail(action: any): Generator {
  const { data, callback } = action.payload;
  const res: any = yield axios.get("/api/user/register/send-confirm-email", {
    params: data,
  });

  if (callback) {
    yield callback(res.data);
  }
}

function* confirmEmail(action: any): Generator {
  const { data, callback } = action.payload;
  const res: any = yield axios.get("/api/user/register/confirm-email", {
    params: data,
  });
  const { user } = res.data;

  if (user) {
    yield put({ type: "user/setUser", payload: { user } });
  }

  if (callback) {
    yield callback(res.data);
  }
}

function* login(action: any): Generator {
  const { data, callback } = action.payload;
  const res: any = yield axios.post("/api/auth/login", data);
  const { user, stock, errors } = res.data;

  if (!errors) {
    yield put({ type: "user/setUser", payload: { user } });
    yield put({ type: "stock/setState", payload: { stock } });
  }

  if (callback) {
    yield callback(res.data);
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
  yield takeLatest("user/register/send-confirm-email", sendConfirmEmail);
  yield takeLatest("user/register/confirm-email", confirmEmail);

  yield takeLatest("user/login", login);
  yield takeLatest("user/updateName", update);
}
