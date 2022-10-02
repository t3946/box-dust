import "regenerator-runtime/runtime";
import { applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import Saga from "@redux/saga/Saga";
import Catalog from "@redux/reducer/Catalog";
import Categories from "@redux/reducer/Categories";
import HistoryPrizes from "@redux/reducer/HistoryPrizes";
import Reviews from "@redux/reducer/Reviews";
import Popup from "@redux/reducer/Popup";
import User from "@redux/reducer/User";
import Menu from "@redux/reducer/Menu";
import Stock from "@redux/reducer/Stock";
import { configureStore } from "@reduxjs/toolkit";

const getStore = (function () {
  let store: any;

  return (preloadedState = {}) => {
    if (!store) {
      const sagaMiddleware = createSagaMiddleware();

      store = configureStore({
        reducer: {
          catalog: Catalog,
          categories: Categories,
          historyPrizes: HistoryPrizes,
          reviews: Reviews,
          popup: Popup,
          user: User,
          stock: Stock,
          menu: Menu,
          accountMenu: Menu,
        },
        preloadedState,
        enhancers: [applyMiddleware(sagaMiddleware)],
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({ serializableCheck: false }),
      });

      sagaMiddleware.run(Saga);
    }

    return store;
  };
})();

export default getStore;
