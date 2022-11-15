import * as React from "react";
import Hat from "@components/common/layout/hat/Hat";
import HatAccount from "@components/common/layout/hat/HatAccount";
import Footer from "@components/common/layout/footer/Footer";
import Style from "@components/common/layout/page/Page.module.scss";
import cn from "classnames";

export interface IProps extends React.PropsWithChildren {
  isAccount?: boolean;
}

export const Page: React.FC<IProps> = function (props) {
  const { isAccount = false } = props;

  return (
    <div className={cn("d-flex flex-column", Style.wrapper)}>
      {isAccount ? <HatAccount /> : <Hat />}

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
