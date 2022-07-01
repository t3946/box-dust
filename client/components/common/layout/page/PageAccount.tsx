import * as React from "react";
import Sidebar from "@components/pages/account/Sidebar";
import { PropsWithChildren } from "react";
import SelectPage from "@components/common/layout/page/SelectPage";
import Style from "@components/common/layout/page/PageAccount.module.scss";

export const PageAccount: React.FC<PropsWithChildren<any>> = function (props) {
  return (
    <div className={"mt-3"}>
      <div className="row">
        <div className="col-2 pe-1 d-none d-lg-block">
          <Sidebar />
        </div>

        <div className="col-lg-10">
          <SelectPage className={[Style.page__mobilMenu, "d-lg-none"]} />
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default PageAccount;
