import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from ".";

export const newsletterApi = createApi({
  reducerPath: "newsletterApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: (builder) => ({
    addEmailNewsletter: builder.mutation<void, { email: string }>({
      query: ({ email }) => ({
        url: `/newsletter`,
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

export const { useAddEmailNewsletterMutation } = newsletterApi;
