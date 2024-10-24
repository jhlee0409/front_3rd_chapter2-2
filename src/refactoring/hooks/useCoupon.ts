import { Coupon } from "@/types";
import { useCallback, useState } from "react";
import { addItem } from "../lib/array";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);

  // A 액션
  const addCoupon = useCallback((newCoupon: Coupon) => {
    setCoupons((prevCoupons) => addItem(prevCoupons, newCoupon));
  }, []);

  return { coupons, addCoupon };
};
