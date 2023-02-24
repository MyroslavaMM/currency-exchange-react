import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getExchangeValues = createAsyncThunk("currency/getExchangeValues", async () => {
  try {
    const response = await axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5");
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExchangeValues.fulfilled, (state, action) => {
      state.exchangeValues = action.payload;
    });
  }
});

export default exchangeValuesSlice.reducer;

export const selectExchangeValues = (state) => {
  return state.exchangeValuesReducer.exchangeValues;
};
