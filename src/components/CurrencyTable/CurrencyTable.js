import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getExchangeValues, selectExchangeValues } from "../../reducers/exchangeReducer/index";
import './CurrencyTable.css';

function CurrencyTable() {
    const dispatch = useDispatch();
    const currency = useSelector(selectExchangeValues);

    useEffect(() => {
        dispatch(getExchangeValues());
    }, []);

    if (currency.length === 0) {
        return <p>Loading...</p>
    }

    const renderValues = () => {
        return currency.map(({buy, sale, ccy, base_ccy}) => {
            return(
                <tr className="row" key={ccy}>
                    <td className="headlines-item item">{ccy}/{base_ccy}</td>
                    <td className="buy item">{Number(buy).toFixed(2)}</td>
                    <td className="sale item">{Number(sale).toFixed(2)}</td>
                </tr>
            )
        })
    }
    return (
        <table className="table">
            <thead className="headlines">
                <tr className="row">
                    <td className="headlines-item item">Currency/Current Date</td>
                    <td className="headlines-item item">Buy</td>
                    <td className="headlines-item item">Sale</td>
                </tr>
            </thead>
            <tbody>
                {renderValues()}
            </tbody>
        </table>
    )
}

export default CurrencyTable;