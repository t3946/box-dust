import Head from "next/head";
import React, { useEffect } from "react";
import Account from "@components/pages/account/Account";
import useSelector from "@hooks/useSelector";
import { useRouter } from "next/router";
import PageAccount from "@components/common/layout/page/account/Page";

export default function Page() {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user && router) {
      router.push("/");
    }
  });

  return (
    <>
      <Head>
        <title>Профиль</title>
      </Head>

      <PageAccount>
        <Account />
      </PageAccount>
    </>
  );
}
