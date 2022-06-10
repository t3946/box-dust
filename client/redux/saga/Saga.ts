import { all } from "redux-saga/effects";
import Main from "@redux/saga/Main";
import Reviews from "@redux/saga/Reviews";
import User from "@redux/saga/User";

export default function* accountRootSaga(): Generator {
  yield all([Main(), Reviews(), User()]);
}
