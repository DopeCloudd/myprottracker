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
    getRandomPorducts,
    { data: randomProducts, isLoading: randomProductsLoading },
  ] = useRandomProductsByCategoryIdMutation();

  useEffect(() => {
    if (product) {
      getRandomPorducts({ categoryId: product.category.id, limit: 4 });
    }
  }, [product, getRandomPorducts]);

  return { product, productLoading, randomProducts, randomProductsLoading };
};

export default useProductPage;
