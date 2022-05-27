import * as React from "react";
import MainHeader from "@components/common/layout/main-header/MainHeader";
import NeonText from "@components/common/layout/neon-text/NeonText";
import dynamic from "next/dynamic";
import PrizeModal from "@components/pages/box/PrizeModal";

const Game = dynamic(() => import("@components/pages/box/Game"), {
  ssr: false,
});

export interface IProps {
  box: any;
}

export const Box: React.FC<IProps> = function (props) {
  const { box } = props;

  return (
    <>
      <div className="row">
        <div className="col">
          <MainHeader>
            <NeonText text={box?.name} />
          </MainHeader>
        </div>
      </div>

      <Game items={box.items} />

      <PrizeModal prize={box.items[0]} />
    </>
  );
};

export default Box;
