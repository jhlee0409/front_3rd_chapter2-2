import { useState } from "react";
import { Coupon } from "../../../types";

const initialNewCoupon: Coupon = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
};

type CouponFormProps = {
  onSubmit: (coupon: Coupon) => void;
};

const CouponForm = ({ onSubmit }: CouponFormProps) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(initialNewCoupon);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(newCoupon);
    initializeCoupon();
  };

  const initializeCoupon = () => {
    setNewCoupon(initialNewCoupon);
  };

  return (
    <form className="space-y-2 mb-4" onSubmit={handleAddCoupon}>
      <input
        type="text"
        placeholder="쿠폰 이름"
        value={newCoupon.name}
        name="name"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="쿠폰 코드"
        value={newCoupon.code}
        name="code"
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <select
          value={newCoupon.discountType}
          name="discountType"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <input
          type="number"
          placeholder="할인 값"
          value={newCoupon.discountValue}
          name="discountValue"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        쿠폰 추가
      </button>
    </form>
  );
};

export default CouponForm;
