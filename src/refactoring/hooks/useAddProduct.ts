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

  // C 얕복
  const createProductWithId = useCallback((product: Omit<Product, "id">, id: string) => {
    return { ...product, id };
  }, []);

  // C 얕복
  const updateProduct = useCallback(
    (prev: Omit<Product, "id">, name: string, value: string | number): Omit<Product, "id"> => {
      return { ...prev, [name]: value };
    },
    [],
  );

  // A
  const initializeProduct = useCallback(() => {
    setNewProduct(initialNewProduct);
  }, []);

  // A
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNewProduct((prev) => updateProduct(prev, name, value));
    },
    [updateProduct],
  );

  return { newProduct, createProductWithId, handleChange, initializeProduct };
};
