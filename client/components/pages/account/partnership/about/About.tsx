import * as React from "react";
import Panel from "@components/common/layout/account/Panel";
import OfferCard, {
  ETheme,
} from "@components/pages/account/partnership/about/OfferCard";
import Style from "@components/pages/account/partnership/About.module.scss";

export const About: React.FC = function () {
  const offers = [
    {
      name: "Местный",
      percent: 60,
      theme: ETheme.PURPLE1,
      description: "Начальный статус. Выдаётся бесплатно. Ни каких требований.",
      cost: "бесплатно",
    },
    {
      name: "Известный",
      percent: 70,
      theme: ETheme.PURPLE2,
      requirements: ["8 000 индекс", "3 клиента"],
      description:
        "Для получения нужно выполнить тербования или можно сразу купить",
      cost: 500,
    },
    {
      name: "Звезда",
      percent: 80,
      theme: ETheme.PURPLE3,
      requirements: ["16 000 индекс", "5 клиентов", "Известный"],
      description:
        "Для получения нужно выполнить тербования. Можно купить если есть «Известный»",
      cost: 2000,
    },
    {
      name: "Легенда",
      percent: 90,
      theme: ETheme.PURPLE4,
      requirements: ["32 000 индекс", "10 клиентов", "Звезда"],
      description:
        "Для получения нужно выполнить тербования. Можно купить если есть «Звезда»",
      cost: 5000,
    },
  ];
  const offerItems = [];

  for (const offer of offers) {
    const { name, percent, theme, requirements, description, cost } = offer;
    offerItems.push(
      <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4 mb-xl-0">
        <OfferCard
          name={name}
          percent={percent}
          theme={theme}
          requirements={requirements}
          description={description}
          className={"h-100"}
          cost={cost}
        />
      </div>
    );
  }

  return (
    <Panel>
      <h1>О партнёрской программе</h1>

      <div className={"row"}>{offerItems}</div>
    </Panel>
  );
};

export default About;
