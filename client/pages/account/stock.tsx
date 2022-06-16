import Head from "next/head";
import React, { useEffect } from "react";
import useSelector from "@hooks/useSelector";
import { useRouter } from "next/router";
import PageAccount from "@components/common/layout/page/PageAccount";
import { NextPageContext } from "next";
import axios from "axios";
import Stock from "@components/pages/account/stock/Stock";

export async function getServerSideProps(context: NextPageContext) {
  const stock = await axios
    .get(`http://127.0.0.1:3080/api/user/stock`, {
      withCredentials: true,
      headers: {
        cookie: `auth=${context.req?.cookies?.auth}`,
      },
    })
    .then((res) => res.data.stock);

  return { props: { stock } };
}

export default function Page(props) {
  const { stock } = props;
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
        <Stock stock={stock} header={header} />
      </PageAccount>
    </>
  );
}
