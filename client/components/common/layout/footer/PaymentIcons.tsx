import * as React from "react";
import cn from "classnames";
import Style from "@components/common/layout/footer/PaymentIcons.module.scss";

export const PaymentIcons: React.FC = function () {
  const payments = [
    {
      name: "Халва",
      slug: "halva",
    },
    {
      name: "Маестро",
      slug: "maestro",
    },
    {
      name: "Мастеркард",
      slug: "mastercard",
    },
    {
      name: "Мир",
      slug: "mir",
    },
    {
      name: "Qiwi",
      slug: "qiwi",
    },
    {
      name: "Visa",
      slug: "visa",
    },
    {
      name: "Я Pay",
      slug: "yapay",
    },
    {
      name: "Ю Money",
      slug: "yoomoney",
    },
  ];
  const paymentItems = [];

  for (const payment of payments) {
    const { slug, name } = payment;
    paymentItems.push(
      <img
        className={cn(
          "user-drag-none",
          "user-select-none",
          Style.icon,
          Style[`icon_${slug}`],
          "m-2"
        )}
        src={`/images/payment/${slug}.svg`}
        title={name}
        alt={name}
        key={`payment-icon-${slug}`}
      />
    );
  }

  return (
    <div>
      <div className={"text-center"}>{paymentItems}</div>
    </div>
  );
};

export default PaymentIcons;
