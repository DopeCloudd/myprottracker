import { RootState } from "@/application/redux/store";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from "@/domain/entities/user.type";
import { BASEURL } from "@/infrastructure/api/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<{ success: boolean }, RegisterRequest>({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.mutation<LoginResponse, string>({
      query: (token) => ({
        url: "auth/refresh-token",
        method: "POST",
        body: { token },
      }),
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
    resetPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (credentials) => ({
        url: "auth/reset-password",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useProtectedMutation,
  useResetPasswordMutation,
} = authApi;
