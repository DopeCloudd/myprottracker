import { Brand } from "@/domain/entities/brand.type";
import { BASEURL } from "@/infrastructure/api/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => `brands`,
    }),
    getBrand: builder.mutation<Brand, number>({
      query: (id) => `brands/${id}`,
    }),
  }),
});

export const { useGetBrandMutation, useGetBrandsQuery } = brandApi;
