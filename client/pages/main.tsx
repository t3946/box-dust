import Head from "next/head";
import React from "react";
import SelectCategory from "@components/pages/main/SelectCategory";
import useSelector from "@hooks/useSelector";
import SliderMain from "@components/pages/main/SliderMain";
import SliderLastTopPrize from "@components/pages/main/SliderLastTopPrize";
import dynamic from "next/dynamic";
import NeonText, { ITheme } from "@components/common/layout/neon-text/NeonText";

const DynamicHistoryLineWithNoSSR = dynamic(
  () => import("@components/pages/main/history-line/HistoryLine"),
  {
    ssr: false,
  }
);

export default function Main() {
  const catalog = useSelector((state) => state.catalog);
  const history = useSelector((state) => state.history);

  return (
    <>
      <Head>
        <title>Box Dust</title>
      </Head>

      <div>
        <NeonText theme={ITheme.pink} text={"Pink"} />
      </div>
      <br/>
      <div>
        <NeonText theme={ITheme.yellow} text={"Yellow"} />
      </div>

      <section className="events mt-4 row">
        <div className="col-9 lg:text-right pl-0 d-none d-lg-block">
          <SliderMain />
        </div>

        <div className="col col-lg-3 pr-0">
          {/*Коробка не указана в этой карточке*/}
          <div className="events-panel">
            {/*<LastTopPrize :lastTopPrizes="lastTopPrizes" />*/}
            <SliderLastTopPrize />
          </div>
        </div>

        <div className="col-12 mt-4 pl-0 pr-0">
          <DynamicHistoryLineWithNoSSR history={history} />
        </div>
      </section>

      <section className="row mt-4 categories">
        <SelectCategory catalog={catalog} />
      </section>

      <section className="row">
        <div className="col-12">
          <h2 className="text-center mt-10 mb-10 text-5xl">
            {/*<span className="neon" data-text={menu[selectedMenuItemId].name}>{menu[selectedMenuItemId].name}</span>*/}
          </h2>

          {/*<Catalog :category="menu[selectedMenuItemId]" />*/}
        </div>
      </section>

      <section className="row mt-5">
        <div className="col-12">{/*<delivery />*/}</div>
      </section>

      <section className="row mt-5">
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-start">
          {/*<Reviews :reviews="reviews" />*/}
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-center align-items-start">
          {/*<FAQ />*/}
        </div>
      </section>
    </>
  );
}
