import Head from "next/head";
import React from "react";
import UserAgreement from "@components/pages/user-agreement/UserAgreement";
import Page from "@components/common/layout/page/Page";

export default function PageUserAgreement() {
  return (
    <Page>
      <Head>
        <title>Пользовательское соглашение</title>
      </Head>

      <UserAgreement />
    </Page>
  );
}
