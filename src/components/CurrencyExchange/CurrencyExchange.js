import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectExchangeValues } from "../../reducers/exchangeReducer/index";
import "./CurrencyExchange.css";

export const CURRENCY = {
  USD: "USD",
  EUR: "EUR",
  UAH: "UAH"
};

export const OPERATION = {
  BUY: "buy",
  SALE: "sale"
};

function CurrencyExchange() {
  const currencyData = useSelector(selectExchangeValues);

  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("UAH");

  useEffect(() => {
    if (currencyData && currencyData.length) {
      setToAmount(exchange(fromAmount));
    }
  }, [currencyData]);

  const handleChangeFromAmount = (event) => {
    const fromAmountValue = parseFloat(event.target.value);
    if (isNaN(fromAmountValue)) {
      setFromAmount("");
      return;
    }
    setFromAmount(fromAmountValue);
    setToAmount(exchange(fromAmountValue));
  };

  const handleChangeToAmout = (event) => {
    const toAmountValue = parseFloat(event.target.value);
    if (isNaN(toAmountValue)) {
      setToAmount("");
      return;
    }
    setToAmount(toAmountValue);
    setFromAmount(exchange(toAmountValue, toCurrency, fromCurrency, true));
  };

  const handleChangeFromCurrency = (event) => {
    const fromCurrencyValue = event.target.value;
    setFromCurrency(fromCurrencyValue);
    setToAmount(exchange(fromAmount, fromCurrencyValue));
  };

  const handleChangeToCurrency = (event) => {
    const toCurrencyValue = event.target.value;
    setToCurrency(toCurrencyValue);
    setToAmount(exchange(fromAmount, fromCurrency, toCurrencyValue));
  };

  const reverseInput = (event) => {
    event.preventDefault();
    setFromAmount(toAmount);
    setToAmount(exchange(toAmount, toCurrency, fromCurrency));
    setToCurrency(fromCurrency);
    setFromCurrency(toCurrency);
  };

  const exchange = (amount, fromCurrencyParameter, toCurrencyParameter, inverse = false) => {
    fromCurrencyParameter = fromCurrencyParameter || fromCurrency;
    toCurrencyParameter = toCurrencyParameter || toCurrency;

    if (fromCurrencyParameter === toCurrencyParameter) {
      return amount;
    }

    if (fromCurrencyParameter === CURRENCY.UAH) {
      const rate = currencyData.find((currencyObject) => currencyObject.ccy === toCurrencyParameter)[inverse ? OPERATION.BUY : OPERATION.SALE];
      return amount / rate;
    } else {
      const rate = currencyData.find((currencyObject) => currencyObject.ccy === fromCurrencyParameter)[inverse ? OPERATION.SALE : OPERATION.BUY];
      const result = amount * rate;
      if (toCurrencyParameter === CURRENCY.UAH) {
        return result;
      } else {
        return exchange(result, CURRENCY.UAH, toCurrencyParameter);
      }
    }
  };

  const renderCurrencyOptions = () => {
    return Object.keys(CURRENCY).map((currencyISO) => (
      <option key={currencyISO} value={currencyISO}>
        {currencyISO}
      </option>
    ));
  };

  return (
    <form className="exchangeForm">
      <div className="exchangeBlock">
        <input className="exchangeInput form-control" onChange={handleChangeFromAmount} value={fromAmount} type="text" placeholder="Change" name="change" />
        <select value={fromCurrency} onChange={handleChangeFromCurrency} className="select form-select form-select-sm" aria-label=".form-select-sm example">
          {renderCurrencyOptions()}
        </select>
      </div>
      <button className="exchangeButton btn btn-info" onClick={reverseInput}>
        ⇆
      </button>
      <div className="exchangeBlock">
        <input className="exchangeInput form-control" onChange={handleChangeToAmout} value={toAmount} type="text" placeholder="Get" name="get" />
        <select value={toCurrency} onChange={handleChangeToCurrency} className="select form-select form-select-sm" aria-label=".form-select-sm example">
          {renderCurrencyOptions()}
        </select>
      </div>
    </form>
  );
}
export default CurrencyExchange;
