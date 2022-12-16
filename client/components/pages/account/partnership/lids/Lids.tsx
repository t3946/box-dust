import * as React from "react";
import Panel from "@components/common/layout/account/Panel";
import Style from "@components/pages/account/partnership/lids/Lids.module.scss";
import cn from "classnames";
import ReferralsList from "@components/pages/account/partnership/dashboard/ReferalsList";

export const Lids: React.FC = function () {
  return (
    <div className={Style.container}>
      <Panel className={[Style.areaHeader, "py-2", Style.containerHeader]}>
        <h1 className={cn("m-0")}>
          <span>Лиды</span>
        </h1>
      </Panel>

      <Panel className={Style.areaTable}>
        <ReferralsList />
      </Panel>
    </div>
  );
};

export default Lids;
