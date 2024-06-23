import { useAuth } from "@/application/hooks/useAuth";
import useFetchUserFavorites from "@/application/hooks/useFetchUserFavorites";
import { selectFavorites } from "@/application/redux/slices/favorites.slice";
import { useTypedSelector } from "@/application/redux/store";
import { bufferToImageSrc } from "@/infrastructure/helpers/buffer-to-image-src.helper";
import CardSkeleton from "@/interface/components/card/card-skeleton.component";
import Card from "@/interface/components/card/card.component";
import TextTitle from "@/interface/components/text/text-title.component";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

const Favorites: React.FC = () => {
  const { user } = useAuth();
  const { favoriteLoading } = useFetchUserFavorites(user?.id || null);

  const favorites = useTypedSelector((state) => selectFavorites(state)) || [];

  const navigate = useNavigate();

  if (!user) return null;

  return (
    <Box
      sx={{
        px: 6,
      }}
    >
      <TextTitle content="Favoris" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          },
          gap: "20px",
        }}
      >
        {favoriteLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <CardSkeleton key={index} image={true} />
          ))
        ) : !favorites || favorites.length === 0 ? (
          <div>No products found.</div>
        ) : (
          favorites.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
              rating={product.rating}
              image={bufferToImageSrc(product.image.data)}
              description={product.description}
              onClick={() => {
                navigate(`/product/${product.id}`);
              }}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default Favorites;
