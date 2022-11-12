import * as React from "react";
import Hat from "@components/common/layout/hat/Hat";
import Footer from "@components/common/layout/footer/Footer";

export const Page: React.FC = function (props: any) {
  return (
    <>
      <Hat />

      <div className={"container"} id={"main-container"}>
        {props.children}
      </div>

      <Footer />
    </>
  );
};

export default Page;
