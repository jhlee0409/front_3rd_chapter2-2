import { AddCouponForm, Coupons } from "./coupon";

const CouponPanel = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <AddCouponForm />
        <Coupons />
      </div>
    </div>
  );
};

export default CouponPanel;
