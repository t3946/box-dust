import Head from "next/head";
import React, { useEffect } from "react";
import useSelector from "@hooks/useSelector";
import { useRouter } from "next/router";
import PageAccount from "@components/common/layout/page/account/Page";
import Invitation from "@components/pages/account/partnership/Invitation";
import Panel from "@components/common/layout/account/Panel";
import Stats from "@components/pages/account/partnership/stats/Stats";

export async function getServerSideProps(ctx: any) {
  return {
    props: { referer: ctx.req.headers.referer || "" }, // will be passed to the page component as props
  };
}

export default function PartnershipPage(props) {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  const referer = props.referer;

  useEffect(() => {
    if (!user && router) {
      router.push("/");
    }
  });

  if (user.partnership_id) {
    return (
      <>
        <Head>
          <title>Статистика</title>
        </Head>

        <PageAccount isPartnership={true}>
          <Stats />
        </PageAccount>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Партнёрство</title>
      </Head>

      <PageAccount isPartnership={true} referer={referer}>
        <Panel>
          <Invitation />
        </Panel>
      </PageAccount>
    </>
  );
}
