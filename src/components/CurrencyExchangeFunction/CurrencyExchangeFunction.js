export const exchange = (input, ccy, base_ccy, getSale) => {
  let amount = 0;
  if (ccy === base_ccy) {
    amount = input;
  } else if (ccy === "USD" && base_ccy === "UAH") {
    amount = input * getSale[1].value;
    amount = Math.round(amount * 100) / 100;
  } else if (ccy === "USD" && base_ccy === "EUR") {
    amount = input * (getSale[1].value / getSale[0].value);
    amount = Math.round(amount * 100) / 100;
  } else if (ccy === "EUR" && base_ccy === "UAH") {
    amount = input * getSale[0].value;
    amount = Math.round(amount * 100) / 100;
  } else if (ccy === "EUR" && base_ccy === "USD") {
    amount = input * (getSale[0].value / getSale[1].value);
    amount = Math.round(amount * 100) / 100;
  } else if (ccy === "UAH" && base_ccy === "USD") {
    amount = input / getSale[1].value;
    amount = Math.round(amount * 100) / 100;
  } else if (ccy === "UAH" && base_ccy === "EUR") {
    amount = input / getSale[0].value;
    amount = Math.round(amount * 100) / 100;
  }
  return amount;
};
