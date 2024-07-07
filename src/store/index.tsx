import { configureStore } from "@reduxjs/toolkit";
import { PredictApi } from "../api";

export const store = configureStore({
  reducer: {
    [PredictApi.reducerPath]: PredictApi.reducer,
  },

  // Thêm cấu hình middleware để dùng được các chức năng của RTK Query như caching, invalidation, polling, ...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(PredictApi.middleware),
});
