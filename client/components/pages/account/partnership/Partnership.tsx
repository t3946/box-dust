import * as React from "react";
import Panel from "@components/common/layout/account/Panel";
import Style from "@components/pages/account/partnership/Partnership.module.scss";
import Link from "next/link";
import FormButton from "@components/common/form/button/Button";
import cn from "classnames";

export const Partnership: React.FC = function () {
  return (
    <Panel>
      <h1>Партнёрство</h1>

      <p className={Style.info}>
        Ищите стабильный способ заработка в интернете? Тогда вам повезло. Наш
        игровой проект предлагает широкий спектр возможностей по заработку. Для
        этого вам потребуется немного свободного времени, наличие интернета и
        желание!
        <div className={"text-end"}>
          <Link href={"#"}>
            <a>Подробнее</a>
          </Link>
        </div>
      </p>

      <div className={cn("d-flex", "flex-column", "align-items-center")}>
        <p className={cn(Style.info, "mb-0", "text-center")}>
          Вы не участвуете в программе партнёрства. <br /> Нажмите «Начать» и
          зарабатывайте вместе с нами.
        </p>
        <FormButton className={cn("mt-2", "w-auto")}>начать</FormButton>
      </div>
    </Panel>
  );
};

export default Partnership;
