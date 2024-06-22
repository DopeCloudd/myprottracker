import { Product } from "@/domain/entities/product.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from ".";

export const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL }),
  endpoints: (builder) => ({
    addFavorite: builder.mutation<void, { userId: string; productId: string }>({
      query: ({ userId, productId }) => ({
        url: `/favorites`,
        method: "POST",
        body: { userId, productId },
      }),
    }),
    removeFavorite: builder.mutation<
      void,
      { userId: string; productId: string }
    >({
      query: ({ userId, productId }) => ({
        url: `/favorites`,
        method: "DELETE",
        body: { userId, productId },
      }),
    }),
    getFavorites: builder.query<{ products: Product[] }, string>({
      query: (userId) => `/favorites/${userId}`,
    }),
  }),
});

export const {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} = favoriteApi;
