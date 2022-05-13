import * as React from "react";
import Hat from "@components/common/layout/hat/Hat";

export const Page: React.FC = function (props: any) {
  return (
    <div className={"container"}>
      <div className="row">
        <div className="col">
          <Hat />
        </div>
      </div>

      {props.children}
    </div>
  );
};

export default Page;
