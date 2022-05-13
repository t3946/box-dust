import { takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import axios from "axios";

function* get(): Generator {
    yield axios.get<any>(`/api`);
}

export default function* Main(): SagaIterator {
    yield takeLatest("GET_ADDRESSES", get);
}