import { useCallback, useState } from "react";
import { Product } from "../../types";

const initialNewProduct: Omit<Product, "id"> = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

export const useAddProduct = () => {
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(initialNewProduct);

  // A
  const initializeProduct = () => {
    setNewProduct(initialNewProduct);
  };

  // C 흠
  const createProductWithId = (product: Omit<Product, "id">, id: string) => {
    return { ...product, id };
  };

  // C
  const updateProduct = (prev: Omit<Product, "id">, name: string, value: string | number): Omit<Product, "id"> => {
    return { ...prev, [name]: value };
  };

  // A
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => updateProduct(prev, name, value));
  }, []);

  return { newProduct, createProductWithId, handleChange, initializeProduct };
};
