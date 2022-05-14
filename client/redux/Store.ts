import "regenerator-runtime/runtime";
import { applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import Saga from "@redux/saga/Saga";
import Catalog from "@redux/reducer/Catalog";
import Categories from "@redux/reducer/Categories";
import History from "@redux/reducer/History";
import { configureStore } from "@reduxjs/toolkit";

function getStore(preloadedState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    reducer: {
      catalog: Catalog,
      categories: Categories,
      history: History,
    },
    preloadedState,
    enhancers: [applyMiddleware(sagaMiddleware)],
  });

  sagaMiddleware.run(Saga);

  return store;
}

export default getStore;
