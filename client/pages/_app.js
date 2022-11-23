import "@styles/globals.css";
import { Provider } from "react-redux";
import getStore from "@redux/Store";
import React from "react";
import { SSRProvider } from "react-bootstrap";
import axios from "axios";
import NextApp from "next/app";

function App({ Component, pageProps }) {
  return (
    <Provider store={getStore(pageProps.storeInitialData)}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </Provider>
  );
}

App.getInitialProps = async (appContext) => {
  const appProps = await NextApp.getInitialProps(appContext);

  if (typeof window !== "undefined") {
    appProps.pageProps.storeInitialData = {};
    return { ...appProps };
  }

  const baseUrl = "http://localhost:3080/api";
  const catalog = await axios.get(baseUrl + "/category").then((res) => {
    return res.data.catalog;
  });
  const headers = {
    cookie: `auth=${appContext.ctx.req?.cookies?.auth}`,
  };

  const historyPrizes = await axios
    .get(baseUrl + "/prizes-history/get?take=15")
    .then((res) => {
      return res.data.history;
    });

  const reviews = await axios.get(baseUrl + "/reviews/1").then((res) => {
    return res.data.reviews;
  });

  const stock = await axios
    .get(baseUrl + "/stock/get", {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data.stock)
    .catch(() => {
      return [];
    });

  const user = await axios
    .get(baseUrl + "/auth/info", {
      withCredentials: true,
      headers,
    })
    .then((res) => {
      return res.data.user;
    })
    .catch(() => {
      return null;
    });

  const partnerships = await axios
    .get(baseUrl + "/partnership/get-all", {
      withCredentials: true,
      headers,
    })
    .then((res) => {
      return res.data.partnerships;
    });

  appProps.pageProps.storeInitialData = {
    catalog,
    partnerships,
    categories: {
      selectedCategory: catalog.length && catalog[0],
    },
    historyPrizes: {
      prizes: historyPrizes,
    },
    reviews: {
      list: reviews,
      skip: 1,
    },
    user: {
      user,
    },
    stock: {
      stock,
    },
  };

  return { ...appProps };
};

export default App;
