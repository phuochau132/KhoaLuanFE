import { configureStore } from "@reduxjs/toolkit";
import { PredictApi, ProductApi } from "../api";
import productReducer from "../slice/productSlice";

export const store = configureStore({
  reducer: {
    [PredictApi.reducerPath]: PredictApi.reducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
    product: productReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(PredictApi.middleware)
      .concat(ProductApi.middleware),
});
