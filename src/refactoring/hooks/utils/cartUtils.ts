import { CartItem, Coupon } from "../../../types";

// A / C / D 구분
// 계층 구분

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

// C 계산 cart
export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id !== productId) return item;
      return { ...item, quantity: Math.max(0, Math.min(newQuantity, item.product.stock)) };
    })
    .filter((item) => item.quantity > 0);
};
