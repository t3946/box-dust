import Head from "next/head";
import React, { useEffect } from "react";
import useSelector from "@hooks/useSelector";
import { useRouter } from "next/router";
import PageAccount from "@components/common/layout/page/account/Page";
import Stock from "@components/pages/account/stock/Stock";

export default function Page() {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user && router) {
      router.push("/main");
    }
  });

  const header = "Склад";

  return (
    <>
      <Head>
        <title>{header}</title>
      </Head>

      <PageAccount>
        <Stock header={header} />
      </PageAccount>
    </>
  );
}
