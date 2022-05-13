import { all } from "redux-saga/effects";
import Main from "@redux/saga/Main";

export default function* accountRootSaga(): Generator {
    yield all([
        Main(),
    ]);
}