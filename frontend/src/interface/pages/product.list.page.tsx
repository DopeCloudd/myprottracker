import { useGetCategoryByIdQuery } from "@/infrastructure/api/category.api";
import { useGetProductsByCategoryIdQuery } from "@/infrastructure/api/product.api";
import CardSkeleton from "@/interface/components/card/card-skeleton.component";
import TextTitle from "@/interface/components/text/text-title.component";
import { Box } from "@mui/material";
import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Card from "../components/card/card.component";

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

  return (
    <Box
      sx={{
        px: 6,
      }}
    >
      <TextTitle content={category.data?.name ?? ""} />
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
        {products.isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <CardSkeleton key={index} image={true} />
          ))
        ) : !products.data || products.data.length === 0 ? (
          <div>No products found.</div>
        ) : (
          products.data.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              price={product.price}
              quantity={product.quantity}
              rating={product.rating}
              image={product.image}
              description={product.description}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default ProductList;
