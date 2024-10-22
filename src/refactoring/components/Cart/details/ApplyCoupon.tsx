import { Coupon } from "../../../../types";
import { useCartContext } from "../../../context/CartContext";
import { Card } from "../../shared";

type ApplyCouponProps = {
  coupons: Coupon[];
};

const ApplyCoupon = ({ coupons }: ApplyCouponProps) => {
  const { applyCoupon, selectedCoupon } = useCartContext();

  return (
    <Card.Container>
      <Card.Title>쿠폰 적용</Card.Title>
      <select
        onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">쿠폰 선택</option>
        {coupons.map((coupon, index) => (
          <option key={coupon.code} value={index}>
            {coupon.name} -{" "}
            {coupon.discountType === "amount" ? `${coupon.discountValue}원` : `${coupon.discountValue}%`}
          </option>
        ))}
      </select>
      {selectedCoupon && (
        <p className="text-green-600">
          적용된 쿠폰: {selectedCoupon.name}(
          {selectedCoupon.discountType === "amount"
            ? `${selectedCoupon.discountValue}원`
            : `${selectedCoupon.discountValue}%`}{" "}
          할인)
        </p>
      )}
    </Card.Container>
  );
};

export default ApplyCoupon;
