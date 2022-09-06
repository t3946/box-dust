import Head from "next/head";
import React from "react";
import UserAgreement from "@components/pages/user-agreement/UserAgreement";

export default function Page() {
  return (
    <>
      <Head>
        <title>Пользовательское соглашение</title>
      </Head>

      <UserAgreement />
    </>
  );
}
