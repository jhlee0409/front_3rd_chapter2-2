import { useCallback, useState } from "react";
import { Product } from "../../types";
import { createUpdatedObject } from "../lib/object";

export const useEditProduct = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // A
  const handleEditProduct = useCallback((product: Product) => {
    setEditingProduct({ ...product });
  }, []);

  // A editingProduct 어디서 가져올까나
  const handleProductUpdate = useCallback(
    (productId: string, updates: Partial<Product>) => {
      if (editingProduct && editingProduct.id === productId) {
        const updatedProduct = createUpdatedObject(editingProduct, updates);
        setEditingProduct(updatedProduct);
      }
    },
    [editingProduct],
  );

  // A
  const resetEditingProduct = useCallback(() => {
    setEditingProduct(null);
  }, []);

  return {
    editingProduct,
    handleProductUpdate,
    resetEditingProduct,
    handleEditProduct,
  };
};
