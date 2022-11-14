import * as React from "react";
import Hat from "@components/common/layout/hat/Hat";
import Footer from "@components/common/layout/footer/Footer";
import Style from "@components/common/layout/page/Page.module.scss";
import cn from "classnames";

export const Page: React.FC = function (props: any) {
  return (
    <div className={cn("d-flex flex-column", Style.wrapper)}>
      <Hat />

      <div id={"main-container"} className={"flex-grow-1"}>
        {props.children}
      </div>

      <div className={Style.wrapper__footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
