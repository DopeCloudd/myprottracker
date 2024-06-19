import { Category } from "@/domain/entities/category.types";
import { BASEURL } from "@/infrastructure/api/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: (builder) => ({
    getCategoryById: builder.query<Category, number>({
      query: (categoryId) => `category/id/${categoryId}`,
    }),
    getCategoryByName: builder.query<Category, string>({
      query: (categoryName) => `category/name/${categoryName}`,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => "categories",
    }),
  }),
});

export const {
  useGetCategoryByIdQuery,
  useGetCategoryByNameQuery,
  useGetCategoriesQuery,
} = categoryApi;
