import Head from "next/head";
import React, { useEffect } from "react";
import useSelector from "@hooks/useSelector";
import { useRouter } from "next/router";
import PageAccount from "@components/common/layout/page/account/Page";
import Payment from "@components/pages/account/payment/Payment";

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
        <title>Оплата</title>
      </Head>

      <PageAccount>
        <Payment />
      </PageAccount>
    </>
  );
}
