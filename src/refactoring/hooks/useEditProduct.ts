import { useState } from "react";
import { Product } from "../../types";
import { createUpdatedObject } from "../lib/object";

export const useEditProduct = () => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // A
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // A editingProduct 어디서 가져올까나
  const handleProductUpdate = (productId: string, updates: Partial<Product>) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = createUpdatedObject(editingProduct, updates);
      setEditingProduct(updatedProduct);
    }
  };

  // A
  const resetEditingProduct = () => {
    setEditingProduct(null);
  };

  return {
    editingProduct,
    handleProductUpdate,
    resetEditingProduct,
    handleEditProduct,
  };
};
