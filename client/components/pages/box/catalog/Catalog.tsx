import * as React from "react";
import Styles from "@components/pages/box/catalog/Catalog.module.scss";
import NeonText from "@components/common/layout/neon-text/NeonText";
import cn from "classnames";
import Card from "@components/pages/box/catalog/Card";

export interface IProps {
  items: Record<any, any>[];
  handleModalItemShow: any;
  setItemModal: any;
}

export const Catalog: React.FC<IProps> = function (props) {
  const { items, handleModalItemShow, setItemModal } = props;
  const cards = [];

  for (let i = 0; i < items.length; i++) {
    cards.push(
      <Card
        prize={items[i]}
        onClick={() => {
          setItemModal(i + 1);
          handleModalItemShow();
        }}
        key={`catalog-item-${i}`}
      />
    );
  }

  return (
    <div className={Styles.catalog}>
      <h2 className={cn("text-center", "mb-5")}>
        <NeonText text={"Призы"} className={Styles.header} />
      </h2>

      <div className={Styles.cardsContainer}>{cards}</div>
    </div>
  );
};

export default Catalog;
