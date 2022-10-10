export function balanceToString(balance: number, kopecks = false) {
  balance = parseFloat(balance.toFixed(2));

  const int = Math.floor(balance / 100);
  let float: number | string = balance % 100;

  if (float < 10) {
    float = "0" + float;
  }

  let result = int.toLocaleString("ru");

  if (kopecks) {
    result += "." + float;
  }

  return result;
}

export default balanceToString;
