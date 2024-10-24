import { CartItem, Coupon, Product } from "@/types";

// A / C / D 구분
// 계층 구분

// coupon ================================================================================================

// C 계산  coupon
export const applyCouponDiscount = (total: number, coupon: Coupon) => {
  if (coupon.discountType === "amount") {
    return Math.max(0, total - coupon.discountValue);
  }
  return total * (1 - coupon.discountValue / 100);
};

// C 계산  coupon
export const calculateTotalCouponDiscount = (before: number, after: number, coupon: Coupon) => {
  const totalAfterDiscount = applyCouponDiscount(after, coupon);
  return {
    totalAfterDiscount,
    totalDiscount: before - totalAfterDiscount,
  };
};

// cart ================================================================================================

// C 계산  cart
export const calculateItemTotal = (item: CartItem) => {
  const { product, quantity } = item;
  const maxDiscount = getMaxApplicableDiscount(item);
  return product.price * quantity * (1 - maxDiscount);
};

export const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

// C 계산  cart
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { product, quantity } = item;
  return product.discounts.reduce((maxDiscount, current) => {
    return quantity >= current.quantity && current.rate > maxDiscount ? current.rate : maxDiscount;
  }, 0);
};

// C 계산 cart
export const calculateTotalItemDiscount = (cart: CartItem[]) => {
  return cart.reduce(
    ({ totalBefore, totalAfter }, current) => {
      const currentPrice = current.product.price * current.quantity;
      const maxDiscount = getMaxApplicableDiscount(current);
      return {
        totalBefore: totalBefore + currentPrice,
        totalAfter: totalAfter + currentPrice * (1 - maxDiscount),
      };
    },
    { totalBefore: 0, totalAfter: 0 },
  );
};

export const clamp = (min: number, value: number, max: number) => Math.max(min, Math.min(value, max));

// C 계산 cart
export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id !== productId) return item;
      return { ...item, quantity: clamp(0, newQuantity, item.product.stock) };
    })
    .filter((item) => item.quantity > 0);
};

// product ================================================================================================

// C 계산 product
export const findCartItem = (cart: CartItem[], product: Product) => cart.find((item) => item.product.id === product.id);

// C 계산 product
export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = findCartItem(cart, product);
  return product.stock - (cartItem?.quantity || 0);
};

// C 계산 product
export const isOutOfStock = (product: Product, cart: CartItem[]) => getRemainingStock(product, cart) <= 0;

// C 계산 product
export const getUpdatedQuantity = (item: CartItem, product: Product) => ({
  ...item,
  quantity: Math.max(0, Math.min(item.quantity + 1, product.stock)),
});

// C 계산 product
export const getUpdatedAddCarts = (prevCart: CartItem[], product: Product) =>
  prevCart.map((item) => (item.product.id === product.id ? getUpdatedQuantity(item, product) : item));

// C 계산 product
export const getAddedNewCarts = (prevCart: CartItem[], product: Product) => [...prevCart, { product, quantity: 1 }];

// C 계산 product
export const updatedCart = (prevCart: CartItem[], product: Product) =>
  findCartItem(prevCart, product) ? getUpdatedAddCarts(prevCart, product) : getAddedNewCarts(prevCart, product);

// cart, coupon ================================================================================================

// C 계산 cart, coupon
export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totals = calculateTotalItemDiscount(cart);
  const { totalBefore, totalAfter } = totals;

  // 쿠폰 적용
  if (selectedCoupon) {
    const { totalAfterDiscount, totalDiscount } = calculateTotalCouponDiscount(totalBefore, totalAfter, selectedCoupon);
    return {
      totalBeforeDiscount: Math.round(totalBefore),
      totalAfterDiscount: Math.round(totalAfterDiscount),
      totalDiscount: Math.round(totalDiscount),
    };
  }

  const totalDiscount = totalBefore - totalAfter;
  return {
    totalBeforeDiscount: Math.round(totalBefore),
    totalAfterDiscount: Math.round(totalAfter),
    totalDiscount: Math.round(totalDiscount),
  };
};
