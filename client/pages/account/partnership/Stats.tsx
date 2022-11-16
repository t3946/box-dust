import Head from "next/head";
import React, { useEffect } from "react";
import useSelector from "@hooks/useSelector";
import { useRouter } from "next/router";
import PageAccount from "@components/common/layout/page/account/Page";
import About from "@components/pages/account/partnership/about/About";

export default function AboutPage() {
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
        <title>Статистика</title>
      </Head>

      <PageAccount isPartnership={true}>
        <About />
      </PageAccount>
    </>
  );
}
