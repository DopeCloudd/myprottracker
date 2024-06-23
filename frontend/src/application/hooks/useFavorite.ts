// hooks/useFavorite.ts
import {
  addFavorite,
  removeFavorite,
} from "@/application/redux/slices/favorites.slice";
import { useAppDispatch } from "@/application/redux/store";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/infrastructure/api/favorite.api";
import { useSnackbar } from "notistack";

const useFavorite = () => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [addFavoriteMutation] = useAddFavoriteMutation();
  const [removeFavoriteMutation] = useRemoveFavoriteMutation();

  const handleAddFavorite = async (userId: string, productId: number) => {
    try {
      const product = await addFavoriteMutation({ userId, productId }).unwrap();
      dispatch(addFavorite(product));
      enqueueSnackbar("Produit ajouté aux favoris", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Erreur lors de l'ajout aux favoris", {
        variant: "error",
      });
    }
  };

  const handleRemoveFavorite = async (userId: string, productId: number) => {
    try {
      const product = await removeFavoriteMutation({
        userId,
        productId,
      }).unwrap();
      dispatch(removeFavorite(product));
      enqueueSnackbar("Produit retiré des favoris", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Erreur lors du retrait des favoris", {
        variant: "error",
      });
    }
  };

  return {
    handleAddFavorite,
    handleRemoveFavorite,
  };
};

export default useFavorite;
