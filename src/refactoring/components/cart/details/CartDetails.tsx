import { Coupon } from "@/types";
import ApplyCoupon from "./ApplyCoupon";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";

type CartDetailsProps = {
  coupons: Coupon[];
};

const CartDetails = ({ coupons }: CartDetailsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <CartItems />
      <ApplyCoupon coupons={coupons} />
      <OrderSummary />
    </div>
  );
};

export default CartDetails;
