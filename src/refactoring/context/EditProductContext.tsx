import useForm from "@/refactoring/hooks/useForm";
import { Product } from "@/types";

import { createContext, useContext, useMemo } from "react";

// Context Type
type EditProductContextContextType = ReturnType<typeof useForm<Product>>;

// Context
const EditProductContext = createContext<EditProductContextContextType | undefined>(undefined);

// Provider
export const EditProductContextProvider = ({ children }: { children: React.ReactNode }) => {
  const editProduct = useForm<Product>();
  const value = useMemo(() => ({ ...editProduct }), [editProduct]);
  return <EditProductContext.Provider value={value}>{children}</EditProductContext.Provider>;
};

// Hook
export const useEditProductContext = () => {
  const context = useContext(EditProductContext);
  if (!context) {
    throw new Error("useEditProductContext must be used within a EditProductContextProvider");
  }
  return context;
};
