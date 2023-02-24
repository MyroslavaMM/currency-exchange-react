import React, { useState } from "react";
import "./CurrencyExchange.css";

function CurrencyExchange() {
  const [changeFrom, setChangeFrom] = useState("");
  const [changeTo, setChangeTo] = useState("");
  const [fromOption, setFromOption] = useState("USD");
  const [toOption, setToOption] = useState("USD");

  const getSale = document.getElementsByClassName("input_sale");

  const handleChangeFromValue = (event) => {
    const fromValue = event.target.value;
    setChangeFrom(fromValue);
    exchange(fromValue, fromOption, toOption);
  };

  const handleChangeToValue = (event) => {
    const toValue = event.target.value;
    setChangeTo(toValue);
  };

  const handlerGetFromOption = (e) => {
    const fromOptionValue = e.target.value;
    setFromOption(fromOptionValue);
  };

  const handlerGetToOption = (e) => {
    const toOptionValue = e.target.value;
    setToOption(toOptionValue);
  };

  const exchange = (input, ccy, base_ccy) => {
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
    return setChangeTo(amount);
  };

  const reverceInput = (e) => {
    e.preventDefault();
    setChangeFrom(changeTo);
    setChangeTo(changeFrom);
    setFromOption(toOption);
    setToOption(fromOption);
  };

  return (
    <form className="exchangeForm">
      <div className="exchangeBlock">
        <input
          className="exchangeInput form-control"
          onChange={handleChangeFromValue}
          value={changeFrom}
          type="number"
          placeholder="Change"
          name="change"
        ></input>
        <select value={fromOption} onChange={handlerGetFromOption} className="select form-select form-select-sm" aria-label=".form-select-sm example">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
      </div>
      <button className="exchangeButton btn btn-info" onClick={reverceInput}>
        ⇆
      </button>
      <div className="exchangeBlock">
        <input className="exchangeInput form-control" onChange={handleChangeToValue} value={changeTo} type="number" placeholder="Get" name="get"></input>
        <select value={toOption} onChange={handlerGetToOption} className="select form-select form-select-sm" aria-label=".form-select-sm example">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
      </div>
    </form>
  );
}
export default CurrencyExchange;
