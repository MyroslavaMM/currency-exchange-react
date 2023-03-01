import React, { useState, useEffect } from "react";
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
    const fromValue = parseFloat(event.target.value);
    if (isNaN(fromValue)) {
      setFromAmount("");
      return;
    }
    setFromAmount(fromValue);
    setToAmount(exchange(fromValue));
  };

  const handleChangeToAmount = (event) => {
    const toValue = parseFloat(event.target.value);
    if (isNaN(toValue)) {
      setFromAmount("");
      return;
    }
    setToAmount(toValue);
    setFromAmount(toValue, toCurrency, fromCurrency, true);
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
      const rate = currencyData.find((currency) => currency.ccy === toCurrencyParameter)[inverse ? OPERATION.BUY : OPERATION.SALE];
      return amount / rate;
    } else {
      const rate = currencyData.find((currency) => currency.ccy === fromCurrencyParameter)[inverse ? OPERATION.SALE : OPERATION.BUY];
      const result = amount * rate;
      if (toCurrencyParameter === CURRENCY.UAH) {
        return result;
      } else {
        return exchange(result, CURRENCY.UAH, toCurrencyParameter);
      }
    }
  };

  const renderCurrencyOptions = () => {
    return Object.keys(CURRENCY).map((curencyItem) => (
      <option key={curencyItem} value={curencyItem}>
        {curencyItem}
      </option>
    ));
  };

  return (
    <form className="exchange-form">
      <div className="exchange-block">
        <input className="exchange-input form-control" onChange={handleChangeFromAmount} value={fromAmount} type="number" placeholder="Change" name="change" />
        <select value={fromCurrency} onChange={handleChangeFromCurrency} className="select form-select form-select-sm" aria-label=".form-select-sm example">
          {renderCurrencyOptions()}
        </select>
      </div>
      <button className="exchange-button btn btn-info" onClick={reverseInput}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="arrow-icon">
          <path d="M438.6 150.6c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.7 96 32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l306.7 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l96-96zm-333.3 352c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 416 416 416c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96z" />
        </svg>
      </button>
      <div className="exchange-block">
        <input className="exchange-input form-control" onChange={handleChangeToAmount} value={toAmount} type="number" placeholder="Get" name="get" />
        <select value={toCurrency} onChange={handleChangeToCurrency} className="select form-select form-select-sm" aria-label=".form-select-sm example">
          {renderCurrencyOptions()}
        </select>
      </div>
    </form>
  );
}
export default CurrencyExchange;
