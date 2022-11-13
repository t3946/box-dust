import * as React from "react";
import Style from "@components/pages/main/Faq.module.scss";
import cn from "classnames";
import Accordion from "react-bootstrap/Accordion";
import IconHeart from "@components/common/icons/heart/Heart";
import IconYoutube from "@components/common/icons/youtube/Youtube";
import IconTruck from "@components/common/icons/truck/duotone/Truck";
import IconGamepad from "@components/common/icons/gamepad/duotone/Gamepad";
import IconCoins from "@components/common/icons/coins/duotone/Coins";
import IconUser from "@components/common/icons/user/duotone/User";
import AccordionHat from "@components/pages/main/faq/AccordionHat";


//todo: чтобы кастомизировать стили нужно перейти на компонент Card https://react-bootstrap.netlify.app/components/accordion/#custom-toggle-with-expansion-awareness
//тогда можно будет влепить и стрелку кастомную тоже
export const Faq: React.FC = function () {
  return (
    <div className={"w-100"}>
      <div
        className={cn(
          "d-flex",
          "align-items-center",
          "mb-4",
          "justify-content-center"
        )}
      >
        <img
          src="/images/pages/main/faq.png"
          alt=""
          height={120}
          className={Style.icon}
        />

        <h2 className={cn(["mb-0", "ms-3"])}>О проекте</h2>
      </div>

      <Accordion>
        <Accordion.Item eventKey="account" className={Style.accordionItem}>
          <Accordion.Header className={Style.accordionHeader}>
            <AccordionHat
              Icon={IconUser}
              title={"Авторизуйся чтобы играть"}
              classes={{ icon: Style.icon_user }}
            />
          </Accordion.Header>
          <Accordion.Body className={Style.accordionBody}>
            Чтобы играть и выигрывать, тебе понадобиться авторизоваться.
            Зарегистироваться(ссылка) или войти(ссылка).
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="how-to-play" className={Style.accordionItem}>
          <Accordion.Header className={Style.accordionHeader}>
            <AccordionHat
              Icon={IconGamepad}
              title={"Как играть?"}
              classes={{ icon: Style.icon_gamepad }}
            />
          </Accordion.Header>
          <Accordion.Body className={Style.accordionBody}>
            Регнись. Залей бабла. Выигрывай.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="payment" className={Style.accordionItem}>
          <Accordion.Header className={Style.accordionHeader}>
            <AccordionHat
              Icon={IconCoins}
              title={"Оплата"}
              classes={{ icon: Style.icon_coins }}
            />
          </Accordion.Header>
          <Accordion.Body className={Style.accordionBody}>
            Оплачивай через робокассу
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="delivery" className={Style.accordionItem}>
          <Accordion.Header className={Style.accordionHeader}>
            <AccordionHat
              Icon={IconTruck}
              title={"Доставка"}
              classes={{ icon: Style.icon_truck }}
            />
          </Accordion.Header>
          <Accordion.Body className={Style.accordionBody}>
            Доставка по России и странам СНГ
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="collaboration" className={Style.accordionItem}>
          <Accordion.Header className={Style.accordionHeader}>
            <AccordionHat
              Icon={IconYoutube}
              title={"Заработать"}
              classes={{ icon: Style.icon_youtube }}
            />
          </Accordion.Header>
          <Accordion.Body className={Style.accordionBody}>
            Хочешь тоже заработать на лохах. Тогда тебе сюда!!!
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="thanks" className={Style.accordionItem}>
          <Accordion.Header className={Style.accordionHeader}>
            <AccordionHat
              Icon={IconHeart}
              title={"Благодарность"}
              classes={{ icon: Style.icon_heart }}
            />
          </Accordion.Header>
          <Accordion.Body className={Style.accordionBody}>
            Если вы хотите выразить авторам проекта свою благодарность, вы
            можете отправить донат на патреон(ссылка). Спасибо что вы с нами.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Faq;
