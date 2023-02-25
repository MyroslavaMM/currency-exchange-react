import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getExchangeValues = createAsyncThunk("currency/getExchangeValues", async () => {
  try {
    const response = await axios.get("https://vwovyp-8080.preview.csb.app/currency");
    return response.data;
  } catch (e) {
    console.error(e);
  }
});

const exchangeValuesSlice = createSlice({
  name: "exchangeValues",
  initialState: {
    exchangeValues: []
  },
  reducers: {
    valuesBuyUpdated(state, action) {
      const { ccy, base_ccy, buy } = action.payload;
      const existingValue = state.find((item) => item.ccy === ccy && item.base_ccy === base_ccy);
      if (existingValue) {
        existingValue = buy;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getExchangeValues.fulfilled, (state, action) => {
      state.exchangeValues = action.payload;
    });
  }
});

export const { valuesBuyUpdated } = exchangeValuesSlice.actions;

export default exchangeValuesSlice.reducer;

export const selectExchangeValues = (state) => {
  return state.exchangeValuesReducer.exchangeValues;
};
