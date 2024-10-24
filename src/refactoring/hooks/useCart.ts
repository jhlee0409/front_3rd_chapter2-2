// useCart.ts
import { CartItem, Coupon, Product } from "@/types";
import { useCallback, useState } from "react";
import { calculateCartTotal, isOutOfStock, updateCartItemQuantity, updatedCart } from "./utils/cartUtils";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  // A 액션
  const calculateTotal = useCallback(() => calculateCartTotal(cart, selectedCoupon), [cart, selectedCoupon]);

  // A 액션
  const applyCoupon = useCallback((coupon: Coupon) => {
    setSelectedCoupon(coupon);
  }, []);

  // A 액션
  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  }, []);

  // A 액션
  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity));
  }, []);

  // A 액션
  const showWarningOutOfStock = useCallback((product: Product, cart: CartItem[], { message }: { message: string }) => {
    if (isOutOfStock(product, cart)) {
      alert(message);
    }
  }, []);

  // A 액션
  const addToCart = useCallback((product: Product) => {
    setCart((prevCart) => updatedCart(prevCart, product));
  }, []);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
    showWarningOutOfStock,
  };
};
