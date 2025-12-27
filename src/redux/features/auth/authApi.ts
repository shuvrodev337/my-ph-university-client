import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userCredentials) => ({
        url: "/auth/login",
        method: "POST",
        body: userCredentials,
      }),
    }),
    passwordChange: builder.mutation({
      query: (userCredentials) => ({
        url: "/auth/change-password",
        method: "POST",
        body: userCredentials,
      }),
    }),
  }),
});

export const { useLoginMutation, usePasswordChangeMutation } = authApi;
