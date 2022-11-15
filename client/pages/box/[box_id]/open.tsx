import Head from "next/head";
import React from "react";
import axios from "axios";
import { NextPageContext } from "next";
import Box from "@components/pages/box/Box";
import Page from "@components/common/layout/page/Page";

export async function getServerSideProps(context: NextPageContext) {
  const { box_id } = context.query;
  const box = await axios
    .get(`http://127.0.0.1:3080/api/box/${box_id}`)
    .then((res) => res.data.box);

  return { props: { box } };
}

export default function PageBoxOpen(props: any) {
  const { box } = props;

  return (
    <Page>
      <Head>
        <title>Box Dust</title>
      </Head>

      <Box box={box} />
    </Page>
  );
}
