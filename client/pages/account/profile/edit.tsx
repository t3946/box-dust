import Head from "next/head";
import React, { useEffect } from "react";
import useSelector from "@hooks/useSelector";
import { useRouter } from "next/router";
import PageAccount from "@components/common/layout/page/PageAccount";
import Edit from "@components/pages/account/edit/Edit";

export default function PageEdit() {
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
        <title>Редактировать профиль</title>
      </Head>

      <PageAccount>
        <Edit />
      </PageAccount>
    </>
  );
}
