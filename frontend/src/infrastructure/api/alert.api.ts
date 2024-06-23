import { Product } from "@/domain/entities/product.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from ".";

export const alertApi = createApi({
  reducerPath: "alertApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: (builder) => ({
    addAlert: builder.mutation<Product, { userId: string; productId: number }>({
      query: ({ userId, productId }) => ({
        url: `/alerts`,
        method: "POST",
        body: { userId, productId },
      }),
    }),
    removeAlert: builder.mutation<
      Product[],
      { userId: string; productId: number }
    >({
      query: ({ userId, productId }) => ({
        url: `/alerts`,
        method: "DELETE",
        body: { userId, productId },
      }),
    }),
    getAlerts: builder.query<Product[], string>({
      query: (userId) => `/alerts/${userId}`,
    }),
  }),
});

export const {
  useAddAlertMutation,
  useRemoveAlertMutation,
  useGetAlertsQuery,
} = alertApi;
