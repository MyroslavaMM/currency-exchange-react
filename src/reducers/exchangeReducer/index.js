import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getExchangeValues = createAsyncThunk("currency/getExchangeValues", async () => {
  const requestCount = parseInt(window.localStorage.getItem("requestCount")) || 0;

  if (requestCount >= 15) {
    throw new Error();
  }
  window.localStorage.setItem("requestCount", requestCount + 1);
  const response = await axios.get("http://localhost:8080/currency");
  return response.data;
});

const exchangeValuesSlice = createSlice({
  name: "exchangeValues",
  initialState: {
    exchangeValues: [],
    isError: false
  },
  reducers: {
    updateValue(state, action) {
      const { ccy, operation, rate } = action.payload;
      state.exchangeValues = state.exchangeValues.map((data) => {
        if (data.ccy === ccy) {
          data[operation] = rate;
        }
        return data;
      });
    },
    resetError(state, action) {
      state.isError = false;
      window.localStorage.setItem("requestCount", 0);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getExchangeValues.fulfilled, (state, action) => {
      state.exchangeValues = action.payload;
    });
    builder.addCase(getExchangeValues.rejected, (state, action) => {
      state.isError = true;
    });
  }
});

export const { updateValue, resetError } = exchangeValuesSlice.actions;

export default exchangeValuesSlice.reducer;

export const selectExchangeValues = (state) => {
  return state.exchangeValuesReducer.exchangeValues;
};

export const selectError = (state) => {
  return state.exchangeValuesReducer.isError;
};
