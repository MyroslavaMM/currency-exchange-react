import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectExchangeValues, udateExchangeRate } from "../../reducers/exchangeReducer/index";
import { OPERATION } from "../CurrencyExchange/CurrencyExchange";
import "./CurrencyTable.css";

function CurrencyTable() {
  const dispatch = useDispatch();
  const currency = useSelector(selectExchangeValues);

  const [activeCCY, setActiveCCY] = useState("");
  const [activeType, setActiveType] = useState("");
  const [activeRate, setActiveRate] = useState("");

  const handleClickEdit = (rate, type, ccy) => {
    setActiveCCY(ccy);
    setActiveType(type);
    setActiveRate(rate);
  };

  const handleRateChange = (event) => {
    setActiveRate(parseFloat(event.target.value));
  };

  const handleSave = () => {
    setActiveCCY("");
    setActiveRate("");
    setActiveType("");
    dispatch(
      udateExchangeRate({
        ccy: activeCCY,
        type: activeType,
        rate: activeRate
      })
    );
  };

  const table = document.getElementsByClassName("table");

  if (currency.length === 0) {
    return <p>Loading...</p>;
  }

  const renderValues = () => {
    return currency.map(({ buy, sale, ccy, base_ccy }) => {
      let buyNumber = Number(buy).toFixed(2);
      let saleNumber = Number(sale).toFixed(2);
      return (
        <tr className="row-item" key={ccy}>
          <td className="headlines-item item">
            {ccy}/{base_ccy}
          </td>
          <td className="buy item">{renderOption(buyNumber, OPERATION.BUY, ccy)}</td>
          <td className="sale item">{renderOption(saleNumber, OPERATION.SALE, ccy)}</td>
        </tr>
      );
    });
  };

  const renderOption = (rate, type, ccy) => {
    if (activeCCY === ccy && activeType === type) {
      return (
        <>
          <input className="input_buy" value={activeRate} onChange={handleRateChange} />
          <span className="edit icon" onClick={handleSave}>
            ✕
          </span>
        </>
      );
    } else {
      return (
        <>
          <input className="input_buy" value={rate} disabled />
          <span className="edit icon" onClick={() => handleClickEdit(rate, type, ccy)}>
            ✐
          </span>
        </>
      );
    }
  };

  return (
    <table className="table-item ">
      <thead className="headlines">
        <tr className="row-item">
          <th className="headlines-item item">Currency/Current Date</th>
          <th className="headlines-item item">Buy</th>
          <th className="headlines-item item">Sale</th>
        </tr>
      </thead>
      <tbody>{renderValues()}</tbody>
    </table>
  );
}

export default CurrencyTable;
