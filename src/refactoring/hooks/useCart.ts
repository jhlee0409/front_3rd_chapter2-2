// useCart.ts
import { CartItem, Coupon, Product } from "@/types";
import { useCallback, useState } from "react";
import { calculateCartTotal, updateCartItemQuantity } from "./utils/cartUtils";

// A / C / D 구분
// 계층 구분

export const useCart = () => {
  // D 데이터
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  //! C 계산 product 외부 의존
  const getRemainingStock = useCallback(
    (product: Product) => {
      const cartItem = findCartItem(cart, product);
      return product.stock - (cartItem?.quantity || 0);
    },
    [cart],
  );

  // C 계산 product
  const isOutOfStock = useCallback(
    (product: Product) => {
      return getRemainingStock(product) <= 0;
    },
    [getRemainingStock],
  );

  //  C 계산  cart, product
  const findCartItem = useCallback((cart: CartItem[], product: Product) => {
    return cart.find((item) => item.product.id === product.id);
  }, []);

  const getUpdatedQuantity = useCallback((item: CartItem, product: Product) => {
    return { ...item, quantity: Math.max(0, Math.min(item.quantity + 1, product.stock)) };
  }, []);

  //  C 계산  cart, product
  const getUpdatedAddCarts = useCallback(
    (prevCart: CartItem[], product: Product) => {
      return prevCart.map((item) => (item.product.id === product.id ? getUpdatedQuantity(item, product) : item));
    },
    [getUpdatedQuantity],
  );

  //! C 계산 cart, coupon, 외부 의존, 테스트가 아니었다면 파라미터를 추가해야 함. 뭘까....
  const calculateTotal = useCallback(() => calculateCartTotal(cart, selectedCoupon), [cart, selectedCoupon]);

  // C 계산 cart, product
  const getAddedNewCarts = useCallback((prevCart: CartItem[], product: Product) => {
    return [...prevCart, { product, quantity: 1 }];
  }, []);

  // C 계산 cart product
  const updatedCart = useCallback(
    (prevCart: CartItem[], product: Product) => {
      return !!findCartItem(prevCart, product)
        ? getUpdatedAddCarts(prevCart, product)
        : getAddedNewCarts(prevCart, product);
    },
    [findCartItem, getUpdatedAddCarts, getAddedNewCarts],
  );

  // A 액션 coupon
  const applyCoupon = useCallback((coupon: Coupon) => {
    setSelectedCoupon(coupon);
  }, []);

  // A 액션 cart
  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  }, []);

  // A 액션 cart
  const updateQuantity = useCallback(
    (productId: string, newQuantity: number) => {
      setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity));
    },
    [updateCartItemQuantity],
  );

  // A 액션 product
  const showWarningOutOfStock = useCallback(
    (product: Product, { message }: { message: string }) => {
      if (isOutOfStock(product)) {
        alert(message);
        return;
      }
    },
    [isOutOfStock],
  );

  // A 액션 cart
  const addToCart = useCallback(
    (product: Product) => {
      showWarningOutOfStock(product, { message: "재고가 부족합니다." });
      setCart((prevCart) => updatedCart(prevCart, product));
    },
    [isOutOfStock, updatedCart],
  );

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
    getRemainingStock,
  };
};
