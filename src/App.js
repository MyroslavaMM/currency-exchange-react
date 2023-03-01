import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CurrencyTable from "./components/CurrencyTable/CurrencyTable";
import CurrencyExchange from "./components/CurrencyExchange/CurrencyExchange";
import Footer from "./components/Footer/Footer";
import Error from "./components/StorageError";

function App() {
  return (
    <div className="main-block">
      <Header />
      <CurrencyTable />
      <Error />
      <CurrencyExchange />
      <Footer />
    </div>
  );
}

export default App;
