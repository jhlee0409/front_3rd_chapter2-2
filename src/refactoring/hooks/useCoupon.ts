import { useCallback, useState } from "react";
import { Coupon } from "../../types.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  // C 계산
  const addedCoupons = useCallback((prevCoupons: Coupon[], newCoupon: Coupon) => {
    return [...prevCoupons, newCoupon];
  }, []);

  // A 액션
  const addCoupon = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => addedCoupons(prevCoupons, newCoupon));
  };

  return { coupons, addCoupon };
};
