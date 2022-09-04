import * as React from "react";
import Styles from "@components/pages/box/catalog/Catalog.module.scss";
import NeonText from "@components/common/layout/neon-text/NeonText";
import cn from "classnames";
import Card from "@components/pages/box/catalog/Card";

export interface IProps {
  items: Record<any, any>[];
}

export const Catalog: React.FC<IProps> = function (props) {
  const { items } = props;
  const cards = [];

  for (let i = 0; i < items.length; i++) {
    cards.push(
      <div
        className={cn(
          "col-xxl-3 col-lg-4 col-md-6 justify-content-center d-flex",
          Styles.cardColumn
        )}
      >
        <Card prize={items[i]} />
      </div>
    );
  }

  return (
    <div className={Styles.catalog}>
      <h2 className={cn("text-center", "mb-5")}>
        <NeonText text={"Призы"} className={Styles.header} />
      </h2>

      <div className={"row"}>{cards}</div>
    </div>
  );
};

export default Catalog;
