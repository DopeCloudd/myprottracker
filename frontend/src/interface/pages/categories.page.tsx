import { useGetCategoriesQuery } from "@/infrastructure/api/category.api";
import Card from "@/interface/components/card/card.component";
import TextTitle from "@/interface/components/text/text-title.component";
import { Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Categories: React.FC = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  const navigate = useNavigate();

  const handleCategoryClick = (id: number) => {
    navigate(`/categories/${id}/products`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        px: 6,
      }}
    >
      <TextTitle content="CHOISISSEZ UNE <span>CATEGORIES</span>" />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: "20px",
        }}
      >
        {data?.map((category) => (
          <Card
            key={category.id}
            title={category.name}
            description={category.description}
            onClick={() => handleCategoryClick(category.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Categories;
