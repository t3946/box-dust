import * as React from "react";
const crypto = require("crypto");

export const Payment: React.FC = function () {
  const amount = 100.5;
  const payment = 10000;
  const shop = 2630;
  const currency = "RUB";
  const desc = "Тестовый товар";
  const secret = "6b9c63d809e3f5fa1cc6a71ee1bed76b";
  const params = [amount, payment, shop, currency, desc, secret];
  const signPayload = params.join("|");
  const sign = crypto.createHash("md5").update(signPayload).digest("hex");
  const paymentMethods = [
    { name: "Банковская карта", code: "cd" },
    { name: "Qiwi", code: "qw" },
    { name: "Yoomoney", code: "ya" },
    { name: "Webmoney", code: "wm" },
    { name: "Payeer", code: "pr" },
    { name: "Perfect Money", code: "pm" },
    { name: "Advcash", code: "ad" },
    { name: "Мегафон", code: "mg" },
    { name: "Bitcoin", code: "bt" },
    { name: "Tether USDT", code: "th" },
    { name: "Litecoin", code: "lt" },
    { name: "Dogecoin", code: "dg" },
  ];
  const method = paymentMethods[1].code;

  return (
    <div>
      <form action="https://payok.io/pay" method="POST">
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="payment" value={payment} />
        <input type="hidden" name="shop" value={shop} />
        <input type="hidden" name="currency" value={currency} />
        <input type="hidden" name="desc" value={desc} />
        <input type="hidden" name="email" value="test@payok.io" />
        <input type="hidden" name="method" value={method} />
        <input type="hidden" name="sign" value={sign} />

        <input type="hidden" name="myparam" value="Параметр 1" />
        <input type="hidden" name="anotherparam" value="Параметр 2" />

        <input type="submit" value="Купить" />
      </form>
    </div>
  );
};

export default Payment;
