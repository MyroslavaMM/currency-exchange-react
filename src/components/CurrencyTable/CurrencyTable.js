import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExchangeValues, selectExchangeValues, updateValue } from "../../reducers/exchangeReducer/index";
import { OPERATION } from "../CurrencyExchange/CurrencyExchange";
import "./CurrencyTable.css";

function CurrencyTable() {
  const dispatch = useDispatch();
  const currency = useSelector(selectExchangeValues);

  const [activeValue, setActiveNewValue] = useState("");
  const [activeCCY, setActiveCCY] = useState("");
  const [activeType, setActiveType] = useState("");
  const [activeInput, setActiveInput] = useState(false);

  useEffect(() => {
    dispatch(getExchangeValues());
  }, []);

  const handleClickEdit = (rate, ccy, operation) => {
    setActiveInput(true);
    setActiveCCY(ccy);
    setActiveType(operation);
    setActiveNewValue(rate);
  };

  const handleSave = () => {
    setActiveInput(false);
    dispatch(updateValue({ ccy: activeCCY, operation: activeType, rate: activeValue }));
  };

  const handleClose = () => {
    setActiveInput(false);
    setActiveCCY("");
    setActiveType("");
    setActiveNewValue("");
  };

  const changeValue = (event) => {
    const currencyValue = event.target.value;
    setActiveNewValue(currencyValue);
  };

  const renderButtons = () => {
    return (
      <>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="check-mark" onClick={handleSave}>
          <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="cross-icon" onClick={handleClose}>
          <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
        </svg>
      </>
    );
  };

  const renderOptions = (rate, operation, ccy) => {
    if (activeInput === true && activeCCY === ccy && activeType === operation) {
      return (
        <>
          <input className="input" value={activeValue} onChange={changeValue} />
          {renderButtons()}
        </>
      );
    } else {
      return (
        <>
          <input className="input" value={rate} disabled />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="edit-icon" onClick={() => handleClickEdit(rate, ccy, operation)}>
            <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
          </svg>
        </>
      );
    }
  };

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
          <td className="buy item">{renderOptions(buyNumber, OPERATION.BUY, ccy)}</td>
          <td className="sale item">{renderOptions(saleNumber, OPERATION.SALE, ccy)}</td>
        </tr>
      );
    });
  };

  return (
    <>
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
    </>
  );
}

export default CurrencyTable;
