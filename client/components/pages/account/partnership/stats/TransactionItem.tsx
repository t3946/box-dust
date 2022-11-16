import * as React from "react";
import Style from "@components/pages/account/partnership/stats/TransactionItem.module.scss";
import balanceToString from "@utils/balanceToString";
import cn from "classnames";

export interface IProps {
  transaction: Record<any, any>;
}

export const TransactionItem: React.FC<IProps> = function (props) {
  const { transaction } = props;

  return (
    <div className={Style.container}>
      <div className={cn(Style.item, Style.number)}>{transaction.number}</div>

      <div className={cn(Style.item, "justify-content-center")}>
        {transaction.date.toLocaleDateString("en-US")}
      </div>

      <div
        className={cn(
          Style.item,
          Style.status,
          Style[`status_theme_${transaction.status_slug}`],
          "justify-content-center"
        )}
      >
        <i>{transaction.status_title}</i>
      </div>

      <div className={cn(Style.item, "justify-content-end")}>
        <span className={cn(Style.sum, "rouble")}>
          {balanceToString(transaction.sum)}
        </span>
      </div>
    </div>
  );
};

export default TransactionItem;
