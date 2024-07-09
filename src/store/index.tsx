import { configureStore } from "@reduxjs/toolkit";
import { PredictApi } from "../api";
import tabReducer from "../slice/tabSlice";

export const store = configureStore({
  reducer: {
    [PredictApi.reducerPath]: PredictApi.reducer,
    tabAdmin: tabReducer,
  },

  // Thêm cấu hình middleware để dùng được các chức năng của RTK Query như caching, invalidation, polling, ...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PredictApi.middleware),
});
