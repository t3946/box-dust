import * as React from "react";
import Styles from "@components/common/layout/footer/Footer.module.scss";
import cn from "classnames";

export const Footer: React.FC = function () {
  return (
    <div
      className={cn(
        "d-flex",
        "align-items-center",
        "justify-content-center",
        Styles.footer,
        "mt-5",
        "flex-column"
      )}
    >
      <div>Email для связи с администрацией: admin@boxdust.ru</div>
      <div>ИНН: 434587939091</div>
      <div>ОГРНИП: 322435000009905</div>
      <div>© 2022</div>
    </div>
  );
};

export default Footer;
