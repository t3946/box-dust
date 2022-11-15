import * as React from "react";
import OfferCard, {
  ETheme,
} from "@components/pages/account/partnership/about/OfferCard";
import Style from "@components/pages/account/partnership/about/About.module.scss";

export const About: React.FC = function () {
  const offers = [
    {
      partnership_id: 1,
      name: "Местный",
      percent: 50,
      theme: ETheme.PURPLE1,
      description: "Начальный статус. Выдаётся бесплатно. Ни каких требований.",
      cost: "бесплатно",
    },
    {
      partnership_id: 2,
      name: "Известный",
      percent: 60,
      theme: ETheme.PURPLE2,
      requirements: ["50 спинов", "3 активных рефералов", "«Местный»"],
      description:
        "Для получения нужно выполнить тербования или можно сразу купить",
      cost: 1200,
    },
    {
      partnership_id: 3,
      name: "Звезда",
      percent: 70,
      theme: ETheme.PURPLE3,
      requirements: ["150 спинов", "9 активных рефералов", "«Известный»"],
      description:
        "Для получения нужно выполнить тербования. Можно купить если есть «Известный»",
      cost: 2000,
    },
    {
      partnership_id: 4,
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
      <div
        className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-4 mb-xl-0"
        key={`partnership-${offer.partnership_id}`}
      >
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
    <>
      <div className={Style.page__block}>
        <h2>О партнёрской программе</h2>

        <p className={Style.paragraph} style={{ color: "red" }}>
          Партнёрская программа позволяет поднять бабла на рефералак – привёл
          реферала, уговорил его сыграть в игру, получил свой процент с его
          слива.
        </p>
      </div>

      <div className={Style.page__block}>
        <h2>Повышение статуса</h2>

        <p className={Style.paragraph}>
          Для получения нового, улучшенного статуса нужно либо выполнить ряд
          требований, которые представлены в описании статуса, либо можно сразу
          купить статус желаемый статус. Для повышения статуса требуется
          обладать предыдущим статусом. Так например для преобретения «Звезда»
          требуется чтобы у вас уже был «Известный».
        </p>
      </div>

      <div className={Style.page__block}>
        <h2>Выплаты</h2>

        <p className={Style.paragraph}>
          Выплаты партнёру проводятся через систему вывода срадеств во вкладке
          баланс.
        </p>
      </div>

      <div className={Style.page__block}>
        <h2>Доход партнёра</h2>

        <p className={Style.paragraph}>
          Мультипликатор статуса(указан в процетнах у каждого статуса)
          применяется в момент начисления прибыли на счёт рефовода.
        </p>
      </div>
      <div className={"row my-5"}>{offerItems}</div>
    </>
  );
};

export default About;
