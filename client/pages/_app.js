import "@styles/globals.css";
import { Provider } from "react-redux";
import getStore from "../redux/Store";
import React from "react";
import { SSRProvider } from "react-bootstrap";
import axios from "axios";
import App from "next/app";
import Page from "@components/common/layout/page/Page";

function MyApp({ Component, pageProps }) {
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

MyApp.getInitialProps = async (appContext) => {
  const catalog = await axios
    .get("http://localhost:3001/api/get-catalog")
    .then((res) => {
      return res.data.catalog;
    });

  const historyPrizes = await axios
    .get("http://localhost:3001/api/f-history/get")
    .then((res) => {
      return res.data.history;
    });

  const appProps = await App.getInitialProps(appContext);

  appProps.pageProps.storeInitialData = {
    catalog,
    categories: {
      selectedCategory: catalog.length && catalog[0],
    },
    history: {
      prizes: historyPrizes,
    },
  };

  return { ...appProps };
};

export default MyApp;
