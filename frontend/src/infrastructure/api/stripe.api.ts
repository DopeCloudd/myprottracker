import { BASEURL } from "@/infrastructure/api/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type CreateCheckoutSessionBody = {
  userId: string;
};

export const stripeApi = createApi({
  reducerPath: "stripeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<
      { url: string },
      CreateCheckoutSessionBody
    >({
      query: (body) => ({
        url: "stripe/checkout-session",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateCheckoutSessionMutation } = stripeApi;
