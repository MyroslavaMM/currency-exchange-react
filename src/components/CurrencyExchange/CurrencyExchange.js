import React, { useState } from "react";
import './CurrencyExchange.css';

function CurrencyExchange() {    
    const [changeFrom, setChangeFrom] = useState("");
    const [changeTo, setChangeTo] = useState("");
    const [fromOption, setFromOption] = useState("USD");
    const [toOption, setToOption] = useState("USD");

    const getSale = document.getElementsByClassName("sale");

    const handleChangeFromValue = (event) => {
        const fromValue = event.target.value;
        setChangeFrom(fromValue);
        exchange(fromValue, fromOption, toOption);
    }

    const handleChangeToValue = (event) => {
        const toValue = event.target.value;
        setChangeTo(toValue);
    }

    const handlerGetFromOption = (e) => {
        const fromOptionValue = e.target.value;
        setFromOption(fromOptionValue);
    }

    const handlerGetToOption = (e) => {
        const toOptionValue = e.target.value;
        setToOption(toOptionValue);
    }

    const exchange = (input, ccy, base_ccy) => {
        let amount = 0;
        if (ccy === base_ccy) {
            amount = input;
        } else if (ccy === 'USD' && base_ccy === 'UAH') {
            amount = input * getSale[1].innerHTML;
            amount = Math.round(amount * 100) / 100;
        } else if (ccy === 'USD' && base_ccy === 'EUR') {
            amount = input * (getSale[0].innerHTML / getSale[1].innerHTML);
            amount = Math.round(amount * 100) / 100;
        } else if (ccy === 'EUR' && base_ccy === 'UAH') {
            amount = input * getSale[0].innerHTML;
            amount = Math.round(amount * 100) / 100;
        } else if (ccy === 'EUR' && base_ccy === 'USD') {
            amount = input * (getSale[1].innerHTML / getSale[0].innerHTML);
            amount = Math.round(amount * 100) / 100;
        } else if (ccy === 'UAH' && base_ccy === 'USD') {
            amount = input / getSale[1].innerHTML;
            amount = Math.round(amount * 100) / 100;
        } else if (ccy === 'UAH' && base_ccy === 'EUR') {
            amount = input / getSale[0].innerHTML;
            amount = Math.round(amount * 100) / 100;
        }
        return setChangeTo(amount);
    }

    const reverceInput = (e) => {
        e.preventDefault();
        setChangeFrom(changeTo);
        setChangeTo(changeFrom);
        setFromOption(toOption);
        setToOption(fromOption);
    }

    return (
        <form className="exchangeForm">
            <div className="exchangeBlock">
                <input className="exchangeInput" onChange={handleChangeFromValue} value={changeFrom} type="number" placeholder="Change" name="change"></input>
                <select value={fromOption} onChange={handlerGetFromOption} className="select">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UAH">UAH</option>
                </select>
            </div>
            <button className="exchangeButton" onClick={reverceInput}>⇆</button>
            <div className="exchangeBlock">
                <input className="exchangeInput" onChange={handleChangeToValue} value={changeTo} type="number" placeholder="Get" name="get"></input>
                <select value={toOption} onChange={handlerGetToOption} className="select">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UAH">UAH</option>
                </select>
            </div>
        </form>
    )
}
export default CurrencyExchange;