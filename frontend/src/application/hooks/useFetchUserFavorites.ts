// hooks/useFetchUserData.ts
import { useGetFavoritesQuery } from "@/infrastructure/api/favorite.api";
import { useEffect } from "react";
import { setFavorites } from "../redux/slices/favorites.slice";
import { useAppDispatch } from "../redux/store";

const useFetchUserFavorites = (userId: string | null) => {
  const dispatch = useAppDispatch();

  const skip = !userId;
  const {
    data: favoriteData,
    error: favoriteError,
    isLoading: favoriteLoading,
  } = useGetFavoritesQuery(userId!, { skip });

  useEffect(() => {
    if (skip) return;

    if (favoriteData) {
      dispatch(setFavorites(favoriteData));
    }
  }, [skip, favoriteData, dispatch]);

  return {
    favoriteLoading,
    favoriteError,
  };
};

export default useFetchUserFavorites;
