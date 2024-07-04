import {
  useDeleteProductMutation,
  useGetProdcutsQuery,
} from "@/infrastructure/api/product.api";
import { useSnackbar } from "notistack";
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

const useProducts = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: products, isLoading: productsLoading } = useGetProdcutsQuery();
  const [deleteProduct] = useDeleteProductMutation();

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

  const handleProductDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      enqueueSnackbar("Produit supprimé.", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Erreur lors de la suppression du produit.", {
        variant: "error",
      });
    }
  };

  return {
    rows,
    productsLoading,
    handleProductDelete,
  };
};

export default useProducts;
