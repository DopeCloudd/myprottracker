import { BASEURL } from "@/infrastructure/api/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Statistics {
  count_products: number;
  count_categories: number;
  count_brands: number;
  count_requests: number;
  count_users: number;
}

export const statisticsApi = createApi({
  reducerPath: "statisticsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
  }),
  endpoints: (builder) => ({
    getStatistics: builder.query<Statistics, void>({
      query: () => "/statistics",
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsApi;
