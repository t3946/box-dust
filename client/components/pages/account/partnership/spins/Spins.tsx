import * as React from "react";
import Panel from "@components/common/layout/account/Panel";
import Style from "@components/pages/account/partnership/spins/Spins.module.scss";
import cn from "classnames";
import GamesList from "@components/pages/account/partnership/dashboard/GamesList";

export const Spins: React.FC = function () {
  return (
    <div className={Style.container}>
      <Panel className={[Style.areaHeader, "py-2", Style.containerHeader]}>
        <h1 className={cn("m-0")}>
          <span>Спины</span>
        </h1>
      </Panel>

      <Panel className={Style.areaTable}>
        <GamesList />
      </Panel>
    </div>
  );
};

export default Spins;
