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
      percent: 50,
      theme: ETheme.PURPLE1,
      description: "Начальный статус. Выдаётся бесплатно. Ни каких требований.",
      cost: "бесплатно",
    },
    {
      name: "Известный",
      percent: 60,
      theme: ETheme.PURPLE2,
      requirements: ["50 спинов", "3 активных рефералов", "«Местный»"],
      description:
        "Для получения нужно выполнить тербования или можно сразу купить",
      cost: 1200,
    },
    {
      name: "Звезда",
      percent: 70,
      theme: ETheme.PURPLE3,
      requirements: ["150 спинов", "9 активных рефералов", "«Известный»"],
      description:
        "Для получения нужно выполнить тербования. Можно купить если есть «Известный»",
      cost: 2000,
    },
    {
      name: "Легенда",
      percent: 80,
      theme: ETheme.PURPLE4,
      requirements: ["350 спинов", "25 активных рефералов", "«Звезда»"],
      description:
        "Для получения нужно выполнить тербования. Можно купить если есть «Звезда»",
      cost: 3000,
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
      <p>
        Партнёрская программа позволяет поднять бабла на рефералак – привёл
        реферала, уговорил его сыграть в игру, получил свой процент с его слива.
      </p>
      <h2>Повышение статуса</h2>
      <p>
        Для получения нового, улучшенного статуса нужно либо выполнить ряд
        требований, которые представлены в описании статуса, либо можно сразу
        купить статус желаемый статус. Для покупки статуса требуется обладать
        предыдущим статусом. Так для покупки «Звезда» требуется чтобы у вас уже
        был «Известный».
      </p>
      <h2>Выплаты</h2>
      <p>
        Выплаты партнёру-рефоводу происходят с партнёрского счёта, который можно
        увидеть в ЛК во вкладке Партнёрство.
      </p>
      <h2>Доход партнёра</h2>
      <p>
        Мультипликатор статуса(указан в процетнах у каждого статуса) применяется
        в момент начисления прибыли на счёт рефовода.
      </p>
      <div className={"row"}>{offerItems}</div>
    </Panel>
  );
};

export default About;
