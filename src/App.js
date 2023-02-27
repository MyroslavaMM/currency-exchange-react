import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CurrencyTable from "./components/CurrencyTable/CurrencyTable";
import CurrencyExchange from "./components/CurrencyExchange/CurrencyExchange";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="main-block">
      <Header />
      <CurrencyTable />
      <CurrencyExchange />
      <Footer />
    </div>
  );
}

export default App;
