import { Coupon } from "@/types";
import { useCallback, useState } from "react";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  // C 계산
  const addedCoupons = useCallback((prevCoupons: Coupon[], newCoupon: Coupon) => {
    return [...prevCoupons, newCoupon];
  }, []);

  // A 액션
  const addCoupon = useCallback(
    (newCoupon: Coupon) => {
      setCoupons((prevCoupons) => addedCoupons(prevCoupons, newCoupon));
    },
    [addedCoupons],
  );

  return { coupons, addCoupon };
};
