import * as React from "react";
import Invitation from "@components/pages/account/partnership/Invitation";
import useSelector from "@hooks/useSelector";
import Stats from "@components/pages/account/partnership/Stats";
import dynamic from "next/dynamic";
import StatusUpgrade from "@components/pages/account/partnership/dashboard/StatusUpgrade";
import ReferralsList from "@components/pages/account/partnership/dashboard/ReferalsList";
import GamesList from "@components/pages/account/partnership/dashboard/GamesList";

export interface IProps {
  className?: any;
}

const Chart = dynamic(
  () => import("@components/pages/account/partnership/Chart"),
  {
    ssr: false,
  }
);

export const Partnership: React.FC<IProps> = function (props) {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <h1>Партнёрство – Панель управления</h1>

      {/*invite to partnership*/}
      {user.partnership === null && <Invitation />}

      <Chart className={"mb-4 d-none d-lg-block"} />

      <div className="row mb-4">
        <div className="col-12 mb-4 col-md-6 mb-md-0">
          <Stats />
        </div>
        <div className={"col-12 col-md-6"}>
          <StatusUpgrade />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <ReferralsList />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <GamesList />
        </div>
      </div>
    </>
  );
};

export default Partnership;
