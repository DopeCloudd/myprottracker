import { Product } from "@/domain/entities/product.type";
import { BASEURL } from "@/infrastructure/api/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: (builder) => ({
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
    getProductsByCategoryId: builder.query<Product[], number>({
      query: (categoryId) => `products/category/${categoryId}`,
    }),
  }),
});

export const { useGetProductByIdQuery, useGetProductsByCategoryIdQuery } =
  productApi;
