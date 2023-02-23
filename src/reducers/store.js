import { configureStore } from '@reduxjs/toolkit';
import exchangeValuesReducer from "../reducers/exchangeReducer/index";

export const store = configureStore({
    reducer: {
        exchangeValuesReducer,
    },
});
