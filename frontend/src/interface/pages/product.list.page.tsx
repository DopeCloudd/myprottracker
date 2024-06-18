import { useGetProductsByCategoryIdQuery } from "@/infrastructure/api/product.api";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate("/categories");
    }
  }, [id, navigate]);

  if (!id) {
    return null;
  }

  return <ProductListWithQuery categoryId={Number(id)} />;
};

const ProductListWithQuery: React.FC<{ categoryId: number }> = ({
  categoryId,
}) => {
  const { data, isLoading } = useGetProductsByCategoryIdQuery(categoryId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No products found.</div>;
  }

  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
};

export default ProductList;
