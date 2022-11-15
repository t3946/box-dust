import * as React from "react";
import Style from "@components/pages/account/partnership/Invitation.module.scss";
import cn from "classnames";
import FormButton from "@components/common/form/button/Button";
import About from "@components/pages/account/partnership/about/About";

export const Invitation: React.FC = function () {
  return (
    <div>
      <h1>Партнёрская программа</h1>
      <p className={Style.info}>
        Ищите <span className={"fw-semibold"}>стабильный способ заработка</span>{" "}
        в интернете? Тогда вам повезло. Наш игровой проект предлагает широкий
        спектр возможностей по заработку. Для этого вам потребуется немного
        свободного времени, наличие интернета и желание!
      </p>

      <About />

      <div
        className={cn("d-flex", "flex-column", "align-items-center", "mt-5")}
      >
        <p className={cn(Style.info, "mb-0", "text-center", "fw-semibold")}>
          Вы не участвуете в программе партнёрства. Нажмите «Начать» и
          зарабатывайте вместе с нами.
        </p>
        <FormButton className={cn("mt-2", "w-auto")}>начать</FormButton>
      </div>
    </div>
  );
};

export default Invitation;
