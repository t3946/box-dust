import { takeLatest, put } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import axios from "axios";
import getStore from "@redux/Store";

function* sell(action: any): Generator {
  const state = getStore().getState();
  const { data, callback } = action.payload;

  const stockItem = state.stock.stock.find(
    (e: any) => e.stock_item_id === data.stock_item_id
  );

  yield put({
    type: "user/balanceAdd",
    payload: { count: (stockItem.item.list_price * 100) / 2 },
  });

  yield put({ type: "stock/remove", payload: data });

  yield axios.post("/api/stock/sell", data).then((res) => {
    return res.data.user;
  });

  if (callback) {
    yield callback();
  }
}

function* get(action: any): Generator {
  const { callback } = action;
  const stock = yield axios.get("/stock/get").then((res) => res.data.stock);

  yield put({ type: "stock/setState", payload: { stock } });

  if (callback) {
    yield callback();
  }
}

export default function* User(): SagaIterator {
  yield takeLatest("stock/sell", sell);
  yield takeLatest("stock/get", get);
}
