import ApplyCoupon from "./ApplyCoupon";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";

const CartDetails = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <CartItems />
      <ApplyCoupon />
      <OrderSummary />
    </div>
  );
};

export default CartDetails;
