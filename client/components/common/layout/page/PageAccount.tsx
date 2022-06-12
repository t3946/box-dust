import * as React from "react";
import Sidebar from "@components/pages/account/Sidebar";
import { PropsWithChildren } from "react";

export const PageAccount: React.FC<PropsWithChildren<any>> = function (props) {
  return (
    <div className={"mt-3"}>
      <div className="row">
        <div className="col-2 pe-1">
          <Sidebar />
        </div>

        <div className="col-10">{props.children}</div>
      </div>
    </div>
  );
};

export default PageAccount;
