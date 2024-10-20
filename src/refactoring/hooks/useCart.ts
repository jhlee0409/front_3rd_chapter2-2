// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "./utils/cartUtils";

// A / C / D 구분
// 계층 구분

export const useCart = () => {
  // D 데이터
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  //  C 계산   product
  const getRemainingStock = (product: Product) => {
    const cartItem = findCartItem(cart, product);
    return product.stock - (cartItem?.quantity || 0);
  };

  //  C 계산  cart, product
  const findCartItem = (cart: CartItem[], product: Product) => {
    return cart.find((item) => item.product.id === product.id);
  };

  //  C 계산  cart, product
  const getUpdatedAddCart = (prevCart: CartItem[], product: Product) => {
    return prevCart.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: Math.max(0, Math.min(item.quantity + 1, product.stock)) }
        : item,
    );
  };

  // C 계산 cart, coupon
  const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);

  // A 액션 coupon
  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  // A 액션 cart
  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // A 액션 cart
  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity));
  };

  // A 액션 cart
  const addToCart = (product: Product) => {
    const remainingStock = getRemainingStock(product);
    if (remainingStock <= 0) {
      alert("재고가 부족합니다.");
      return;
    }

    setCart((prevCart) =>
      !!findCartItem(prevCart, product)
        ? getUpdatedAddCart(prevCart, product)
        : [...prevCart, { product, quantity: 1 }],
    );
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
