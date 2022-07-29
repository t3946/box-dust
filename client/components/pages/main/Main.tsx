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
import Reviews from "@components/pages/main/reviews/Reviews";
import ModalLogin from "@components/pages/main/modal-login/ModalLogin";
import ModalRegister from "@components/pages/main/modal-register/ModalRegister";
import Faq from "@components/pages/main/faq/Faq";

const DynamicHistoryLineWithNoSSR = dynamic(
  () => import("@components/pages/main/history-line/HistoryLine"),
  {
    ssr: false,
  }
);

export const Main: React.FC = function () {
  const catalog = useSelector((state) => state.catalog);
  const history = useSelector((state) => state.history);
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
    <>
      <section className="events mt-4 row">
        <div className="col-12 d-flex flex-row">
          <div className={cn(Styles.mainSlider)}>
            <SliderMain />
          </div>

          {/*Коробка не указана в этой карточке*/}
          <div className={cn(Styles.eventsPanel, "ms-3 d-none d-lg-block")}>
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

      <section className="row mt-2 mt-xl-5">
        <div className="col-12">
          <Delivery />
        </div>
      </section>

      <section className="row mt-3 mt-xl-5">
        <div className="col-12 col-md-6">
          <Reviews reviews={reviews} />
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-center align-items-start">
          <Faq />
        </div>
      </section>

      <ModalLogin />
      <ModalRegister />
    </>
  );
};

export default Main;
