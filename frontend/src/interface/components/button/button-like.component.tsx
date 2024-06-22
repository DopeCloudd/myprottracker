import { useAuth } from "@/application/hooks/useAuth";
import useFavorite from "@/application/hooks/useFavorite";
import { selectFavorites } from "@/application/redux/slices/favorites.slice";
import { useTypedSelector } from "@/application/redux/store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from "react";

export const ButtonLike: React.FC<{ productId: number }> = ({ productId }) => {
  const { user } = useAuth();

  const { handleAddFavorite, handleRemoveFavorite } = useFavorite();

  const favorites = useTypedSelector((state) => selectFavorites(state));

  const isFavorite = favorites.includes(String(productId));

  if (!user) return null;

  return (
    <FavoriteIcon
      onClick={
        isFavorite
          ? () => handleRemoveFavorite(user?.id, String(productId))
          : () => handleAddFavorite(user?.id, String(productId))
      }
      sx={{
        marginRight: "8px",
        padding: "10px",
        backgroundColor: "#171717",
        border: "1px solid",
        borderRadius: "6px",
        borderColor: "#00A656",
        cursor: "pointer",
        fontSize: "40px",
        fill: isFavorite ? "red" : "white",
        "&:hover": {
          fill: "gold",
        },
      }}
    />
  );
};
