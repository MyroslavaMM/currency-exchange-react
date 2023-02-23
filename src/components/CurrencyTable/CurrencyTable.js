import React from "react";
import './CurrencyTable.css';

function CurrencyTable() {
    return (
        <table className="table">
            <thead className="headlines">
                <tr className="row">
                    <td className="headlines-item item">Currency/Current Date</td>
                    <td className="headlines-item item">Buy</td>
                    <td className="headlines-item item">Sell</td>
                </tr>
            </thead>
            <tbody>
                <tr className="row">
                    <td className="headlines-item item">USD/UAH</td>
                    <td className="buy item">22</td>
                    <td className="sell item">24</td>
                </tr>
                <tr className="row">
                    <td className="headlines-item item">EUR/UEA</td>
                    <td className="buy item">32</td>
                    <td className="sell item">34</td>
                </tr>
                <tr className="row">
                    <td className="headlines-item item">BTC/USD</td>
                    <td className="buy item">11111</td>
                    <td className="sell item">11700</td>
                </tr>
            </tbody>
        </table>
    )
}

export default CurrencyTable;