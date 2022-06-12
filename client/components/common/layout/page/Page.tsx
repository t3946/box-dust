import * as React from "react";
import Hat from "@components/common/layout/hat/Hat";

export const Page: React.FC = function (props: any) {
  return (
    <div className={"container"} id={"main-container"}>
      <Hat />

      {props.children}
    </div>
  );
};

export default Page;
