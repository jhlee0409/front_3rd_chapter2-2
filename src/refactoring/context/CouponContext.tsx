import { Coupon } from "@/types";
import { createContext, useContext, useMemo } from "react";
import { useCoupons } from "../hooks";

// Context Type
type CouponContextType = ReturnType<typeof useCoupons>;

// Context
const CouponContext = createContext<CouponContextType | undefined>(undefined);

// Provider
export const CouponContextProvider = ({
  children,
  initialCoupons,
}: {
  children: React.ReactNode;
  initialCoupons: Coupon[];
}) => {
  const coupons = useCoupons(initialCoupons);
  const value = useMemo(() => ({ ...coupons }), [coupons]);
  return <CouponContext.Provider value={value}>{children}</CouponContext.Provider>;
};

// Hook
export const useCouponContext = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error("useCouponContext must be used within a CouponContextProvider");
  }
  return context;
};
