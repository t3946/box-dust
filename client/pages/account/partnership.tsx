import Head from "next/head";
import React, { useEffect } from "react";
import useSelector from "@hooks/useSelector";
import { useRouter } from "next/router";
import PageAccount from "@components/common/layout/page/account/Page";
import Partnership from "@components/pages/account/partnership/Partnership";

export default function PartnershipPage() {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user && router) {
      router.push("/main");
    }
  });

  return (
    <>
      <Head>
        <title>Партнёрство</title>
      </Head>

      <PageAccount>
        <Partnership />
      </PageAccount>
    </>
  );
}
