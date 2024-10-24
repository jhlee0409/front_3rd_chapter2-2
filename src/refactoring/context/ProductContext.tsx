import { useProducts } from "@/refactoring/hooks";
import { Product } from "@/types";
import { createContext, useContext, useMemo } from "react";

// Context Type
type ProductContextType = ReturnType<typeof useProducts>;

// Context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Provider
export const ProductContextProvider = ({
  children,
  initialProducts,
}: {
  children: React.ReactNode;
  initialProducts: Product[];
}) => {
  const products = useProducts(initialProducts);
  const value = useMemo(() => ({ ...products }), [products]);
  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

// Hook
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductContextProvider");
  }
  return context;
};
