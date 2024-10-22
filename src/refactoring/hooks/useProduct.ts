import { useCallback, useState } from "react";
import { Product } from "../../types.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // C 계산
  const updatedProducts = useCallback((prevProducts: Product[], updatedProduct: Product) => {
    return prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
  }, []);

  // C 계산
  const addedProducts = useCallback((prevProducts: Product[], newProduct: Product) => {
    return [...prevProducts, newProduct];
  }, []);

  // A 액션
  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) => updatedProducts(prevProducts, updatedProduct));
  };

  // A 액션
  const addProduct = (newProduct: Product) => {
    setProducts((prevProducts) => addedProducts(prevProducts, newProduct));
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
