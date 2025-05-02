import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include", // if cookies sent by backend, this option sets cookie in the browser cookie
  prepareHeaders: (headers, { getState }) => {
    // method to attach token with every request
    const token = (getState() as RootState).auth.token; // get the token from auth state

    if (token) {
      headers.set("authorization", token); // set token with headers
    }
    return headers;
  },
});
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}), // endpoints Are being injected
});
