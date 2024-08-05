import { useGetCategoryByIdQuery } from "@/infrastructure/api/category.api";
import { useGetProductsByCategoryIdQuery } from "@/infrastructure/api/product.api";
import { bufferToImageSrc } from "@/infrastructure/helpers/buffer-to-image-src.helper";
import CardSkeleton from "@/interface/components/card/card-skeleton.component";
import Card from "@/interface/components/card/card.component";
import TextTitle from "@/interface/components/text/text-title.component";
import { truncateString } from "@/interface/utils/index";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const ProductList: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/categories" replace={true} />;
  }

  return <ProductListWithQuery categoryId={Number(id)} />;
};

const ProductListWithQuery: React.FC<{ categoryId: number }> = ({
  categoryId,
}) => {
  const products = useGetProductsByCategoryIdQuery(categoryId);
  const category = useGetCategoryByIdQuery(categoryId);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        pt: 4,
        px: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" color="secondary">
          Ajouter un produit
        </Button>
      </Box>
      <TextTitle content={category.data?.name ?? ""} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          },
          gap: "20px",
          pb: 6,
        }}
      >
        {products.isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <CardSkeleton key={index} image={true} />
          ))
        ) : !products.data || products.data.length === 0 ? (
          <Box
            sx={{
              gridColumn: "span 2",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography fontSize={"1.5rem"}>
              Aucun produit pour l'instant, reviens après ta séance. 🏋️
            </Typography>
          </Box>
        ) : (
          products.data.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
              rating={product.rating}
              image={bufferToImageSrc(product.image.data)}
              description={truncateString(product.description, 160)}
              brand={product.brand.name}
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

export default ProductList;
