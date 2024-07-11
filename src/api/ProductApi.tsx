import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../base/BaseQuery";

const ProductApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    product: builder.query({
      query: () => ({
        url: `/product`,
        method: "Get",
      }),
    }),
  }),
});

export const useProductQuery: typeof ProductApi.useProductQuery =
  ProductApi.useProductQuery;
export default ProductApi;
