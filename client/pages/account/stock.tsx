import Head from "next/head";
import React, { useEffect } from "react";
import useSelector from "@hooks/useSelector";
import { useRouter } from "next/router";
import PageAccount from "@components/common/layout/page/PageAccount";
import { NextPageContext } from "next";
import axios from "axios";
import Stock from "@components/pages/account/stock/Stock";
import { setState } from "@redux/reducer/Stock";
import { useDispatch } from "react-redux";

export async function getServerSideProps(context: NextPageContext) {
  const stock = await axios
    .get(`http://127.0.0.1:3080/api/stock/get`, {
      withCredentials: true,
      headers: {
        cookie: `auth=${context.req?.cookies?.auth}`,
      },
    })
    .then((res) => res.data.stock);

  return { props: { stock } };
}

export default function Page(props: any) {
  const { stock } = props;
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user && router) {
      router.push("/main");
    }
  });

  useEffect(() => {
    dispatch(setState({ stock }));
  }, []);

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
