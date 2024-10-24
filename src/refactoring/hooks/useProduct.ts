import { Product } from "@/types";
import { useCallback, useState } from "react";
import { addItem, updateItem } from "../lib/array";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // A 액션
  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts((prevProducts) => updateItem(prevProducts, updatedProduct));
  }, []);

  // A 액션
  const addProduct = useCallback((newProduct: Product) => {
    setProducts((prevProducts) => addItem(prevProducts, newProduct));
  }, []);

  return {
    products,
    updateProduct,
    addProduct,
  };
};
