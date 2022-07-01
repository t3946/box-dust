import * as React from "react";
import StockItem from "@components/pages/account/stock/StockItem";
import ModalStockItem from "@components/pages/account/stock/ModalStockItem";
import { setData } from "@redux/reducer/Popup";
import { useDispatch } from "react-redux";
import useSelector from "@hooks/useSelector";
import PanelNoItems from "@components/common/layout/account/PanelNoItems";
import cn from "classnames";

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
      <StockItem
        stockItem={stockItem}
        key={`stock-item-${stockItem.stock_item_id}`}
        className={cn("col-12", "col-md-6", "col-lg-3", "mb-3")}
        onClick={() => openItemInModal(stockItem.stock_item_id)}
      />
    );
  }

  // useEffect(() => {
  //   openItemInModal(stock[0]);
  // });

  return (
    <div>
      <h1>{header}</h1>

      <div className="row">{stockItems}</div>

      {stock.length > 0 ? (
        <ModalStockItem />
      ) : (
        <PanelNoItems text={"Нет вещей на складе"} />
      )}
    </div>
  );
};

export default Stock;
