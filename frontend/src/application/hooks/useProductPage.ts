import { Product } from "@/domain/entities/product.type";
import {
  useGetProductByIdQuery,
  useRandomProductsByCategoryIdMutation,
} from "@/infrastructure/api/product.api";
import { useEffect } from "react";

type productId = Pick<Product, "id">;

const useProductPage = (productId: productId) => {
  const { data: product, isLoading: productLoading } = useGetProductByIdQuery(
    productId.id
  );
  const [
    getRandomProducts,
    { data: randomProducts, isLoading: randomProductsLoading },
  ] = useRandomProductsByCategoryIdMutation();

  useEffect(() => {
    if (product) {
      getRandomProducts({ categoryId: product.category.id, limit: 4 });
    }
  }, [product, getRandomProducts]);

  return { product, productLoading, randomProducts, randomProductsLoading };
};

export default useProductPage;
