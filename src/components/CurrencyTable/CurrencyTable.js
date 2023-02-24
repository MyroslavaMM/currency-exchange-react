import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExchangeValues, selectExchangeValues } from "../../reducers/exchangeReducer/index";
import "./CurrencyTable.css";

function CurrencyTable() {
  const dispatch = useDispatch();
  const currency = useSelector(selectExchangeValues);

  const [newValue, setNewValue] = useState("");
  let [count, setCount] = useState(0);
  const increment = () => setCount(count++);

  useEffect(() => {
    dispatch(getExchangeValues());
    increment();
    window.localStorage.setItem("count", count);
  }, []);

  const handleClickEdit = (e) => {
    const child = e.currentTarget;
    const parent = child.parentNode;
    let input = parent.childNodes[0];

    child.style.display = "none";

    const span = document.createElement("span");
    span.innerHTML = "✕";
    span.classList.add("cross");
    span.classList.add("icon");

    parent.appendChild(span);

    span.addEventListener("click", () => {
      span.style.display = "none";
      child.style.display = "inline-block";
      input.disabled = true;
    });

    input.disabled = false;
  };

  const changeValue = (e) => {
    const currencyValue = e.target.value;
    setNewValue(currencyValue);
  };

  const resetStorageValues = () => {
    localStorage.clear();
  };

  const table = document.getElementsByClassName("table");

  if (localStorage.getItem("count") === "5") {
    if (table.length > 0) {
      table[0].style.display = "none";
    }
    return (
      <div className="error">
        <p className="error-message">The localStorage is full</p>
        <button className="reset" onClick={resetStorageValues}>
          Reset localStorage
        </button>
      </div>
    );
  }

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
          <td className="buy item">
            <input className="input_buy" defaultValue={buyNumber} onChange={changeValue} disabled />
            <span className="edit icon" onClick={handleClickEdit}>
              ✐
            </span>
          </td>
          <td className="sale item">
            <input className="input_sale" defaultValue={saleNumber} onChange={changeValue} disabled />
            <span className="edit icon" onClick={handleClickEdit}>
              ✐
            </span>
          </td>
        </tr>
      );
    });
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
