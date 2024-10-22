import { useCallback, useState } from "react";
import { Coupon } from "../../types";

const initialNewCoupon: Coupon = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
};

export const useAddCoupon = () => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(initialNewCoupon);

  // C 얕복
  const updateCoupon = useCallback((prev: Coupon, name: string, value: string | number): Coupon => {
    return { ...prev, [name]: value };
  }, []);

  // A
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setNewCoupon((prev) => updateCoupon(prev, name, value));
    },
    [updateCoupon],
  );

  // A
  const initializeCoupon = useCallback(() => {
    setNewCoupon(initialNewCoupon);
  }, []);

  return { newCoupon, handleChange, initializeCoupon };
};
