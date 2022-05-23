import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import useSelector from "@hooks/useSelector";
import NeonText from "@components/common/layout/neon-text/NeonText";
import MainHeader from "@components/common/layout/main-header/MainHeader";

export default function Page() {
  const router = useRouter();
  const catalog = useSelector((state) => state.catalog);
  const box_id = parseInt(router.query.box_id as string);
  let box;

  for (const category of catalog) {
    for (const boxItem of category.boxes) {
      if (boxItem.box_id === box_id) {
        box = boxItem;
        break;
      }
    }

    if (box) break;
  }

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
    </>
  );
}
