import * as React from "react";
import ModalStockItem from "@components/pages/account/stock/ModalStockItem";
import { setData } from "@redux/reducer/Popup";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";
import PanelNoItems from "@components/common/layout/account/PanelNoItems";
import Style from "@components/pages/account/stock/Stock.module.scss";
import Card from "@components/pages/box/catalog/Card";

export interface IProps {
  header: string;
}

export const Stock: React.FC<IProps> = function (props) {
  const { header } = props;
  const stockItems = [];
  const dispatch = useDispatch();
  const stock = useSelector((state) => state.stock.stock);

  if (!stock) {
    return null;
  }

  function openItemInModal(stock_item_id: any) {
    dispatch(
      setData({
        modal: "stockItem",
        data: {
          stock_item_id: stock_item_id,
          show: true,
        },
      })
    );
  }

  for (const stockItem of stock) {
    stockItems.push(
      <Card
        counter={stockItem.total}
        prize={stockItem.item}
        key={`stock-item-${stockItem.stock_item_id}`}
        onClick={() => openItemInModal(stockItem.stock_item_id)}
      />
    );
  }

  return (
    <div>
      <h1>{header}</h1>

      <div className={Style.catalog}>{stockItems}</div>

      {stock.length > 0 ? (
        <ModalStockItem />
      ) : (
        <PanelNoItems text={"Нет вещей на складе"} />
      )}
    </div>
  );
};

export default Stock;
