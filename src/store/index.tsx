import { configureStore } from "@reduxjs/toolkit";
import { PredictApi, ProductApi } from "../api";
import tabReducer from "../slice/tabSlice";

export const store = configureStore({
  reducer: {
    [PredictApi.reducerPath]: PredictApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    tabAdmin: tabReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PredictApi.middleware),
});
