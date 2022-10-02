import { put, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import axios from "axios";

function* getLast(data: any): Generator {
  const res: any = yield axios
    .get<any>(`/api/prizes-history/get-last`)
    .then((res) => res);

  yield put({
    type: "historyPrizes/addOne",
    payload: { prize: res.data.lastPrize },
  });

  if (data.options.success) {
    data.options.success();
  }
}

export default function* HistoryPrizes(): SagaIterator {
  yield takeLatest("GET_LAST", getLast);
}
