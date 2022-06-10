import "@styles/globals.css";
import { Provider } from "react-redux";
import getStore from "../redux/Store";
import React from "react";
import { SSRProvider } from "react-bootstrap";
import axios from "axios";
import NextApp from "next/app";
import Page from "@components/common/layout/page/Page";

function App({ Component, pageProps }) {
  return (
    <Provider store={getStore(pageProps.storeInitialData)}>
      <SSRProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </SSRProvider>
    </Provider>
  );
}

App.getInitialProps = async (appContext) => {
  const baseUrl = "http://localhost:3080/api";
  const catalog = await axios.get(baseUrl + "/category").then((res) => {
    return res.data.catalog;
  });

  const historyPrizes = await axios
    .get(baseUrl + "/f-history/get")
    .then((res) => {
      return res.data.history;
    });

  const reviews = await axios.get(baseUrl + "/reviews/1").then((res) => {
    return res.data.reviews;
  });

  const appProps = await NextApp.getInitialProps(appContext);

  appProps.pageProps.storeInitialData = {
    catalog,
    categories: {
      selectedCategory: catalog.length && catalog[0],
    },
    history: {
      prizes: historyPrizes,
    },
    reviews: {
      list: reviews,
      skip: 1,
    },
  };

  return { ...appProps };
};

export default App;
