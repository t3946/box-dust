import * as React from "react";
import TransactionItem from "@components/pages/account/partnership/stats/TransactionItem";
import Style from "@components/pages/account/partnership/stats/Transactions.module.scss";

export const Transactions: React.FC = function () {
  const transactionsList = [
    {
      number: "9df93kiv89s",
      sum: 100000,
      date: new Date("01/01/2020"),
      status_slug: "pending",
      status_title: "обрабатывается",
    },
    {
      number: "9df93kiv89s",
      sum: 100000,
      date: new Date("01/01/2020"),
      status_slug: "declined",
      status_title: "отклонено",
    },
    {
      number: "9df93kiv89s",
      sum: 100000,
      date: new Date("01/01/2020"),
      status_slug: "completed",
      status_title: "исполнено",
    },
  ];
  const items = [];

  for (let i = 0; i < transactionsList.length; i++) {
    const transaction = transactionsList[i];
    items.push(
      <TransactionItem transaction={transaction} key={`transaction-${i}`} />
    );
  }

  return <div className={Style.transactionsList}>{items}</div>;
};

export default Transactions;
