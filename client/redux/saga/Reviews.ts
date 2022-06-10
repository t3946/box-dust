import { takeLatest, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import axios from "axios";

function* get(action: any): Generator {
  const { data, callback } = action.payload;

  const reviews = yield axios.get("/api/reviews/" + data.page).then((res) => {
    return res.data.reviews;
  });

  yield put({ type: "REVIEWS_ADD", data: { reviews } });

  yield callback();
}

export default function* Reviews(): SagaIterator {
  yield takeLatest("REVIEWS_LOAD", get);
}
