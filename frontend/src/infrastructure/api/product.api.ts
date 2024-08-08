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
    getProducts: builder.query<Product[], void>({
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
    updateProduct: builder.mutation<
      Product,
      { id: number; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `product/${id}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    randomProductsByCategoryId: builder.mutation<
      Product[],
      { categoryId: number; limit: number }
    >({
      query: ({ categoryId, limit }) => ({
        url: `products/random`,
        method: "POST",
        body: { categoryId, limit },
      }),
    }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductsByCategoryIdQuery,
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useRandomProductsByCategoryIdMutation,
} = productApi;
