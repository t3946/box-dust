import * as React from "react";
import Navigation from "@components/common/layout/hat/Navigation";
import Styles from "@components/common/layout/hat/Hat.module.scss";
import cn from "classnames";
import ConvexButton from "@components/common/ui/convex-button/ConvexButton";

export const Hat: React.FC = function () {
  return (
    <header className={cn(Styles.hat)}>
      <div className={cn([Styles.headerUiColumn, "col-12", "px-3"])}>
        <div className={Styles.hat__registration}>
          <a className={Styles.registrationButton} href="#">
            Регистрация
          </a>
        </div>

        <a className="" href="#">
          <ConvexButton classes={Styles.loginButton}>Войти</ConvexButton>
        </a>
      </div>

      <div
        className={cn([
          Styles.headerMenuPanel,
          "col-12",
          "d-none",
          "d-lg-block",
        ])}
      >
        <Navigation />
      </div>
    </header>
  );
};

export default Hat;
