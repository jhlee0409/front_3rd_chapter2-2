import { createContext, useContext, useMemo } from "react";
import { useCart } from "../hooks";

// Context Type
type CartContextType = ReturnType<typeof useCart>;

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const cart = useCart();
  const value = useMemo(() => ({ ...cart }), [cart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};
