export function balanceToString(balance: number) {
  balance = parseFloat(balance.toFixed(2));

  const int = Math.floor(balance / 100);
  let float: number | string = balance % 100;

  if (float < 10) {
    float = "0" + float;
  }

  return int.toLocaleString("ru") + "." + float;
}

export default balanceToString;
