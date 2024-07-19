import { BASEURL } from "@/infrastructure/api/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scrapingApi = createApi({
  reducerPath: "scrapingApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: (builder) => ({
    startScraping: builder.mutation<void, void>({
      query: () => `scraping/start`,
    }),
  }),
});

export const { useStartScrapingMutation } = scrapingApi;
