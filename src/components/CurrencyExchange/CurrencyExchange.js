import React from "react";
import './CurrencyExchange.css';

function CurrencyExchange() {
    
    return (
        <form className="exchangeForm">
            <div className="exchangeBlock">
                <input className="exchangeInput" type="number" placeholder="Change" name="change"></input>
                <select className="select">
                    <option>Option1</option>
                </select>
            </div>
            <button className="exchangeButton">⇆</button>
            <div className="exchangeBlock">
                <input className="exchangeInput" type="number" placeholder="Get" name="get"></input>
                <select className="select">
                    <option>Option2</option>
                </select>
            </div>
        </form>
    )
}
export default CurrencyExchange;