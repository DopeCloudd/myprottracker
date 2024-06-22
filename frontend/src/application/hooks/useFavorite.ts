// hooks/useFavorite.ts
import {
  addFavorite,
  removeFavorite,
} from "@/application/redux/slices/favorites.slice";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/infrastructure/api/favorite.api";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";

const useFavorite = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [addFavoriteMutation] = useAddFavoriteMutation();
  const [removeFavoriteMutation] = useRemoveFavoriteMutation();

  const handleAddFavorite = async (userId: string, productId: string) => {
    try {
      await addFavoriteMutation({ userId, productId }).unwrap();
      dispatch(addFavorite(productId));
      enqueueSnackbar("Produit ajouté aux favoris", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Erreur lors de l'ajout aux favoris", {
        variant: "error",
      });
    }
  };

  const handleRemoveFavorite = async (userId: string, productId: string) => {
    try {
      await removeFavoriteMutation({ userId, productId }).unwrap();
      dispatch(removeFavorite(productId));
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
