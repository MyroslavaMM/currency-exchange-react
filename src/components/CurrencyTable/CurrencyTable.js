import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExchangeValues, selectExchangeValues, updateValue } from "../../reducers/exchangeReducer/index";
import { OPERATION } from "../CurrencyExchange/CurrencyExchange";
import { ReactComponent as CheckMark } from "../../images/CheckMark.svg";
import { ReactComponent as CrossIcon } from "../../images/CrossIcon.svg";
import { ReactComponent as EditIcon } from "../../images/EditIcon.svg";
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
        <CheckMark onClick={handleSave} />
        <CrossIcon onClick={handleClose} />
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
          <EditIcon onClick={() => handleClickEdit(rate, ccy, operation)} />
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
