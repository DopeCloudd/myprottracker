import { useGetBrandsQuery } from "@/infrastructure/api/brand.api";
import { useGetCategoriesQuery } from "@/infrastructure/api/category.api";
import { useGetProductByIdQuery } from "@/infrastructure/api/product.api";
import AdminEditProductForm from "@/interface/components/form/admin.edit-product.form";
import { Box } from "@mui/material";
import React from "react";
import { Navigate, useParams } from "react-router-dom";

export const AdminEditProduct: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/categories" replace={true} />;
  }

  return <AdminEditProductQuery productId={Number(id)} />;
};

const AdminEditProductQuery: React.FC<{ productId: number }> = ({
  productId,
}) => {
  const { data: product, isLoading: productLoad } =
    useGetProductByIdQuery(productId);
  const { data: categories, isLoading: categoriesLoad } =
    useGetCategoriesQuery();
  const { data: brands, isLoading: brandsLoad } = useGetBrandsQuery();

  if (productLoad || categoriesLoad || brandsLoad) {
    return;
  }

  return (
    <Box
      sx={{
        px: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <AdminEditProductForm
          product={product}
          categories={categories}
          brands={brands}
        />
      </Box>
    </Box>
  );
};
