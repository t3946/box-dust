import "@styles/globals.css";
import { Provider } from "react-redux";
import getStore from "@redux/Store";
import React from "react";
import { SSRProvider } from "react-bootstrap";
import axios from "axios";
import NextApp from "next/app";

async function loadCatalogData(baseUrl) {
  return await axios.get(baseUrl + "/category").then((res) => {
    return res.data.catalog;
  });
}

async function loadStockData(baseUrl, headers) {
  return await axios
    .get(baseUrl + "/stock/get", {
      withCredentials: true,
      headers,
    })
    .then((res) => res.data.stock)
    .catch(() => {
      return [];
    });
}

async function loadReviewsData(baseUrl) {
  return await axios.get(baseUrl + "/reviews/1").then((res) => {
    return res.data.reviews;
  });
}

async function loadHistoryPrizesData(baseUrl) {
  return await axios
    .get(baseUrl + "/prizes-history/get?take=15")
    .then((res) => {
      return res.data.history;
    });
}

async function loadUserData(baseUrl, headers) {
  return await axios
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
}

async function loadPartnershipData(baseUrl, headers) {
  return await axios
    .get(baseUrl + "/partnership/get-all", {
      withCredentials: true,
      headers,
    })
    .then((res) => {
      return res.data.partnerships;
    });
}

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
  const headers = {
    cookie: `auth=${appContext.ctx.req?.cookies?.auth}`,
  };

  const [user, stock, reviews, historyPrizes, partnerships, catalog] =
    await Promise.all([
      loadUserData(baseUrl, headers),
      loadStockData(baseUrl),
      loadReviewsData(baseUrl),
      loadHistoryPrizesData(baseUrl, headers),
      loadPartnershipData(baseUrl, headers),
      loadCatalogData(baseUrl),
    ]);

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
