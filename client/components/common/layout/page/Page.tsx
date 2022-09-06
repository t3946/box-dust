import * as React from "react";
import Hat from "@components/common/layout/hat/Hat";
import Footer from "@components/common/layout/footer/Footer";

export const Page: React.FC = function (props: any) {
  return (
    <div className={"container-lg"} id={"main-container"}>
      <Hat />

      {props.children}

      <Footer />
    </div>
  );
};

export default Page;
