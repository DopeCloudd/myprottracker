import { useGetProductsQuery } from "@/infrastructure/api/product.api";
import { useEffect, useState } from "react";

interface Data {
  id: number;
  title: string;
  url: string;
  brand: string;
  category: string;
}

function createData(
  id: number,
  title: string,
  url: string,
  brand: string,
  category: string
): Data {
  return { id, url, title, brand, category };
}

const useStats = () => {
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();

  const [rows, setRows] = useState(
    () =>
      products?.map((product) =>
        createData(
          product.id,
          product.title,
          product.url,
          product.brand.name,
          product.category.name
        )
      ) ?? []
  );

  useEffect(() => {
    if (products) {
      const updatedRows = products.map((product) =>
        createData(
          product.id,
          product.title,
          product.url,
          product.brand.name,
          product.category.name
        )
      );
      setRows(updatedRows);
    }
  }, [products]);

  return {
    rows,
    productsLoading,
  };
};

export default useStats;
