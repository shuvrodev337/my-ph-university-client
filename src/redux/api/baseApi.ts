import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    credentials: "include", // if cookies sent by backend, this option sets cookie in the browser cookie
  }),
  endpoints: () => ({}), // endpoints Are being injected
});
