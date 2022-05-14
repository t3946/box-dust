import * as React from "react";
import Box, { ETheme } from "@components/common/Box/Box";
import Styles from "@components/pages/main/Catalog.module.scss";

interface IProps {
  boxes: Record<any, any>[];
}

export const Catalog: React.FC<IProps> = function (props) {
  const { boxes } = props;
  const items = [];

  for (const i in boxes) {
    const box = boxes[i];

    items.push(
      <Box box={box} type={ETheme.basic} key={`catalog-box-item-${i}`} />
    );
  }

  return (
    <div className={"d-flex justify-content-center"}>
      <div className={Styles.container}>{items}</div>
    </div>
  );
};

export default Catalog;
