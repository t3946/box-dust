import Head from "next/head";
import React from "react";
import PageAccount from "@components/common/layout/page/account/Page";
import Lids from "@components/pages/account/partnership/lids/Lids";

export default function ChartsPage() {
  return (
    <>
      <Head>
        <title>Лиды</title>
      </Head>

      <PageAccount isPartnership={true}>
        <Lids />
      </PageAccount>
    </>
  );
}
