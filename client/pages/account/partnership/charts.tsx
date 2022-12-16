import Head from "next/head";
import React from "react";
import PageAccount from "@components/common/layout/page/account/Page";
import Charts from "@components/pages/account/partnership/charts/Charts";

export default function ChartsPage() {
  return (
    <>
      <Head>
        <title>Чарты</title>
      </Head>

      <PageAccount isPartnership={true}>
        <Charts />
      </PageAccount>
    </>
  );
}
