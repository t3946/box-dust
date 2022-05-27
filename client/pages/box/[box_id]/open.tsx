import Head from "next/head";
import React from "react";
import axios from "axios";
import { NextPageContext } from "next";
import Box from "@components/pages/box/Box";

export async function getServerSideProps(context: NextPageContext) {
  const { box_id } = context.query;
  const box = await axios
    .get(`http://127.0.0.1:3001/api/box/${box_id}`)
    .then((res) => res.data.box);

  return { props: { box } };
}

export default function Page(props: any) {
  const { box } = props;

  return (
    <>
      <Head>
        <title>Box Dust</title>
      </Head>

      <Box box={box} />
    </>
  );
}
