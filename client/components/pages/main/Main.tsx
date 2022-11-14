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
import Style from "@components/pages/main/Main.module.scss";
import Reviews from "@components/pages/main/reviews/Reviews";
import Faq from "@components/pages/main/faq/Faq";

const DynamicHistoryLineWithNoSSR = dynamic(
  () => import("@components/pages/main/history-line/HistoryLine"),
  {
    ssr: false,
  }
);

export const Main: React.FC = function () {
  const catalog = useSelector((state) => state.catalog);
  const history = useSelector((state) => state.historyPrizes);
  const reviews = useSelector((state) => state.reviews.list);
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
    <div className={"container"}>
      <section>
        <div className={cn(Style.events, Style.main__events)}>
          <SliderMain />

          {/*Коробка не указана в этой карточке*/}
          <div className={"d-none d-md-block"}>
            <SliderLastTopPrize />
          </div>
        </div>

        <div className={Style.main__history}>
          <DynamicHistoryLineWithNoSSR history={history} />
        </div>
      </section>

      <section className={cn("categories")}>
        <SelectCategory catalog={catalog} />
      </section>

      <section className={Style.main__section}>
        <h2 className={cn("text-center", Style.catalogHeader)}>
          <NeonText theme={ETheme.pink} text={selectedCategory.name} />
        </h2>

        <Catalog boxes={getCurrentBoxes()} />
      </section>

      <section className={Style.main__section}>
        <Reviews reviews={reviews} />
      </section>

      <section className={Style.main__section}>
        <Faq />
      </section>

      <section className={Style.main__section}>
        <Delivery />
      </section>
    </div>
  );
};

export default Main;
