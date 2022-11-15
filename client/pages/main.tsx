import Head from "next/head";
import React from "react";
import Main from "@components/pages/main/Main";
import Page from "@components/common/layout/page/Page";

export default function PageMain() {
  return (
    <Page>
      <Head>
        <title>Box Dust</title>
        <meta name="payok" content="payok_verification"/>
      </Head>

      <Main />
    </Page>
  );
}
