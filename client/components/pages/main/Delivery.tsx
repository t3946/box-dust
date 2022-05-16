import * as React from "react";
import Styles from "@components/pages/main/Delivery.module.scss";
import cn from "classnames";

export const Delivery: React.FC = function () {
  return (
    <div
      className={cn([
        "d-flex",
        "align-items-center",
        "justify-content-center",
        "flex-column",
        "text-center",
        "text-sm-left",
        "flex-sm-row",
      ])}
    >
      <img
        className={Styles.headerImage}
        src="/images/pages/main/delivery-box.png"
        alt=""
      />

      <div>
        <h2 className={cn([Styles.title1, "mb-2", "mb-xl-4"])}>
          Доставка по России и странам СНГ <b className="strong">бесплатно</b>
        </h2>

        <h3 className={cn([Styles.title2, "mb-0"])}>
          Доставим посылку или <b className="strong">вернём деньги!</b>
        </h3>
      </div>
    </div>
  );
};

export default Delivery;
