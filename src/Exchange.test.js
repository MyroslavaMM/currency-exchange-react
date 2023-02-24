import { exchange } from "./components/CurrencyExchangeFunction/CurrencyExchangeFunction";

const getSale = document.getElementsByClassName("input_sale");

it("should exchange currencies", async () => {
  let n = exchange(2, "USD", "EUR", getSale);
  expect(n).toBe(1.9);
});
