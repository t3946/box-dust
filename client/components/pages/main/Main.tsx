import React from "react";
import SelectCategory from "@components/pages/main/SelectCategory";
import useSelector from "@hooks/useSelector";
import SliderMain from "@components/pages/main/SliderMain";
import SliderLastTopPrize from "@components/pages/main/SliderLastTopPrize";
import dynamic from "next/dynamic";
import Catalog from "@components/pages/main/Catalog";
import NeonText, { ETheme } from "@components/common/layout/neon-text/NeonText";
import cn from "classnames";
import Delivery from "@components/pages/main/Delivery";
import Styles from "@components/pages/main/Main.module.scss";

const DynamicHistoryLineWithNoSSR = dynamic(
  () => import("@components/pages/main/history-line/HistoryLine"),
  {
    ssr: false,
  }
);

export const Main: React.FC = function () {
  const catalog = useSelector((state) => state.catalog);
  const history = useSelector((state) => state.history);
  const selectedCategory = useSelector(
    (state) => state.categories.selectedCategory
  );

  function getCurrentBoxes() {
    if (selectedCategory.name === "Все") {
      const boxes = [];

      for (const category of catalog) {
        boxes.push(...category.boxes);
      }

      return boxes;
    }

    return selectedCategory.boxes;
  }

  return (
    <>
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
          <h2 className={cn("text-center", Styles.catalogHeader)}>
            <NeonText theme={ETheme.pink} text={selectedCategory.name} />
          </h2>

          <Catalog boxes={getCurrentBoxes()} />
        </div>
      </section>

      <section className="row mt-5">
        <div className="col-12">
          <Delivery />
        </div>
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
};

export default Main;
