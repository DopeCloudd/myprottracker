import { Product } from "@/domain/entities/product.type";
import { BASEURL } from "@/infrastructure/api/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  tagTypes: ["Product"] as const,
  endpoints: (builder) => ({
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
    }),
    getProductsByCategoryId: builder.query<Product[], number>({
      query: (categoryId) => `products/category/${categoryId}`,
    }),
    getProdcuts: builder.query<Product[], void>({
      query: () => "products",
      providesTags: [{ type: "Product", id: "LIST" }],
    }),
    addProduct: builder.mutation<Product, FormData>({
      query: (formData) => ({
        url: "product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `product/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductsByCategoryIdQuery,
  useGetProdcutsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = productApi;
