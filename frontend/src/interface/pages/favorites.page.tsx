import { useAuth } from "@/application/hooks/useAuth";
import useFetchUserFavorites from "@/application/hooks/useFetchUserFavorites";
import { selectFavorites } from "@/application/redux/slices/favorites.slice";
import { useTypedSelector } from "@/application/redux/store";
import { bufferToImageSrc } from "@/infrastructure/helpers/buffer-to-image-src.helper";
import FlexCenter from "@/interface/components/box/flex-center.component";
import CardSkeleton from "@/interface/components/card/card-skeleton.component";
import Card from "@/interface/components/card/card.component";
import TextTitle from "@/interface/components/text/text-title.component";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Favorites: React.FC = () => {
  const { user, loading } = useAuth();
  const { favoriteLoading } = useFetchUserFavorites(user?.id || null);

  const favorites = useTypedSelector((state) => selectFavorites(state)) || [];

  const navigate = useNavigate();

  if (loading) {
    return (
      <FlexCenter flex={1}>
        <CircularProgress />
      </FlexCenter>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gridColumn: "span 2",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Vous n'avez pas encore de favoris pour l'instant.
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/categories");
              }}
            >
              Comparer des produits
            </Button>
          </Box>
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
