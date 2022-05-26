import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import useSelector from "@hooks/useSelector";
import NeonText from "@components/common/layout/neon-text/NeonText";
import MainHeader from "@components/common/layout/main-header/MainHeader";
import dynamic from "next/dynamic";
import axios from "axios";
import { NextPageContext } from "next";

const Game = dynamic(() => import("@components/pages/box/Game"), { ssr: false });

export async function getServerSideProps(context: NextPageContext) {
  const { box_id } = context.query;
  const box = await axios
    .get(`http://127.0.0.1:3001/api/box/${box_id}`)
    .then((res) => res.data.box);

  return { props: { box } };
}

export default function Page(props: any) {
  const { box } = props;

  console.log({ box });

  return (
    <>
      <Head>
        <title>Box Dust</title>
      </Head>

      <div className="row">
        <div className="col">
          <MainHeader>
            <NeonText text={box?.name} />
          </MainHeader>
        </div>
      </div>

      <Game items={box.items} />
    </>
  );
}
