import { Coupon } from "@/types";
import { AddCouponForm, Coupons } from "./coupon";

type CouponPanelProps = {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
};

const CouponPanel = ({ coupons, onCouponAdd }: CouponPanelProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <AddCouponForm onSubmit={onCouponAdd} />
        <Coupons coupons={coupons} />
      </div>
    </div>
  );
};

export default CouponPanel;
