import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { selectError, resetError, getExchangeValues } from "./reducers/exchangeReducer/index";
import Header from "./components/Header/Header";
import CurrencyTable from "./components/CurrencyTable/CurrencyTable";
import CurrencyExchange from "./components/CurrencyExchange/CurrencyExchange";
import Footer from "./components/Footer/Footer";

function App() {
  const isError = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getExchangeValues());
  }, []);

  const resetErrorHandler = () => {
    dispatch(resetError());
    dispatch(getExchangeValues());
  };

  const renderContent = () => {
    if (isError) {
      return (
        <div className="error">
          <p className="error-message">The localStorage is full</p>
          <button className="reset" onClick={resetErrorHandler}>
            Reset localStorage
          </button>
        </div>
      );
    } else {
      return (
        <>
          <CurrencyTable />
          <CurrencyExchange />
        </>
      );
    }
  };

  return (
    <div>
      <Header />
      {renderContent()}
      <Footer />
    </div>
  );
}

export default App;
