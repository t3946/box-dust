import Head from "next/head";
import React, { useEffect } from "react";
import Account from "@components/pages/account/Account";
import useSelector from "@hooks/useSelector";
import { useRouter } from "next/router";

export default function Page() {
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
        <title>Профиль</title>
      </Head>

      <Account />
    </>
  );
}
