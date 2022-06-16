import * as React from "react";
import StockItem from "@components/pages/account/stock/StockItem";

export interface IProps {
  stock: any[];
  header: string;
}

export const Stock: React.FC<IProps> = function (props) {
  const { stock, header } = props;
  const stockItems = [];

  for (const stockItem of stock) {
    stockItems.push(
      <StockItem
        stockItem={stockItem}
        key={`stock-item-${stockItem.stock_item_id}`}
        className={"col-3 mb-3"}
      />
    );
  }

  return (
    <div>
      <h1>{header}</h1>

      <div className="row">{stockItems}</div>
    </div>
  );
};

export default Stock;
