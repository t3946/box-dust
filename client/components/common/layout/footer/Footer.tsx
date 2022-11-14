import * as React from "react";
import Styles from "@components/common/layout/footer/Footer.module.scss";
import cn from "classnames";
import PaymentIcons from "@components/common/layout/footer/PaymentIcons";

export const Footer: React.FC = function () {
  return (
    <div className={cn(Styles.footer)}>
      <div
        className={cn(
          "d-flex",
          "align-items-center",
          "justify-content-center",
          "container-lg",
          "flex-column"
        )}
      >
        <PaymentIcons />
        <div>Email для связи с администрацией: admin@boxdust.ru</div>
        <div>© 2022</div>
      </div>
    </div>
  );
};

export default Footer;
