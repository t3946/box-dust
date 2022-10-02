import Head from "next/head";
import React from "react";
import Main from "@components/pages/main/Main";

export default function Page() {
  return (
    <>
      <Head>
        <title>Box Dust</title>
        <meta name="payok" content="payok_verification"/>
      </Head>

      <Main />
    </>
  );
}
