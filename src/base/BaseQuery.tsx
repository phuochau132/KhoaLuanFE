import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

const baseURL = import.meta.env.VITE_SERVER_NAME;

export const axiosBaseQuery: BaseQueryFn<
  AxiosRequestConfig,
  unknown,
  { data: any }
> = async ({ url, method, data }) => {
  try {
    const result = await axios({
      url: baseURL + url,
      method,
      data,
    });
    return { data: result.data };
  } catch (error) {
    console.log("error", error);

    const err = error as AxiosError;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};
