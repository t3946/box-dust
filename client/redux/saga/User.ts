import { takeLatest, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import axios from "axios";

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

  if (callback) {
    yield callback();
  }
}

function* play(action: any): Generator {
  const { data, callback } = action.payload;
  const res: any = yield axios.get("/api/game/play", { params: data });

  yield put({
    type: "user/updateUser",
    payload: { balance: res.data.newBalance },
  });

  yield put({ type: "stock/setState", payload: { stock: res.data.stock } });

  if (callback) {
    yield callback(res);
  }
}

function* acceptPartnership(action: any): Generator {
  const { callback } = action.payload;
  const res: any = yield axios.get("/api/user/accept-partnership");

  yield put({
    type: "user/updateUser",
    payload: {
      partnership_id: res.data.partnership_id,
      partnership: res.data.partnership,
    },
  });

  if (callback) {
    yield callback(res);
  }
}

export default function* User(): SagaIterator {
  //user not registered
  yield takeLatest("user/register", register);
  yield takeLatest("user/register/send-confirm-email", sendConfirmEmail);
  yield takeLatest("user/register/confirm-email", confirmEmail);

  //user registered
  yield takeLatest("user/login", login);
  yield takeLatest("user/updateName", update);
  yield takeLatest("user/play", play);
  yield takeLatest("user/accept-partnership", acceptPartnership);
}
