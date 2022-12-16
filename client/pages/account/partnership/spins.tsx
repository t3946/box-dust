import Head from "next/head";
import React from "react";
import PageAccount from "@components/common/layout/page/account/Page";
import Spins from "@components/pages/account/partnership/spins/Spins";

export default function SpinsPage() {
  return (
    <>
      <Head>
        <title>Спины</title>
      </Head>

      <PageAccount isPartnership={true}>
        <Spins />
      </PageAccount>
    </>
  );
}
