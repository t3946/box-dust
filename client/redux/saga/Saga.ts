import { all } from "redux-saga/effects";
import Main from "@redux/saga/Main";
import User from "@redux/saga/User";
import Stock from "@redux/saga/Stock";
import HistoryPrizes from "@redux/saga/HistoryPrizes";

export default function* accountRootSaga(): Generator {
  yield all([Main(), User(), Stock(), HistoryPrizes()]);
}
