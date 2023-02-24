import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "axios";
import CurrencyTable from "./components/CurrencyTable/CurrencyTable";

jest.mock("axios");

describe("CurrencyTable with Redux", () => {
  it("should get info from redux", async () => {
    axios.get.mockResolvedValue([
      { ccy: "EUR", base_ccy: "UAH", buy: "fakePrice1", sale: "fakePrice2" },
      { ccy: "USD", base_ccy: "UAH", buy: "fakePrice1", sale: "fakePrice2" }
    ]);
    render(
      <Provider store={store}>
        <CurrencyTable />
      </Provider>
    );
    await screen.findByText("EUR/UAH");
    expect(screen.getByText("fakePrice1")).toBeInTheDocument();
    expect(screen.getByText("fakePrice2")).toBeInTheDocument();
  });
});
