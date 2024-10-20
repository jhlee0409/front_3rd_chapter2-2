import { Coupon } from "../../../types";
import { useCartContext } from "../../context/CartContex";
import { getMaxDiscount } from "../../hooks/utils/cartUtils";
import { Card } from "../shared";

type CartDetailsProps = {
  coupons: Coupon[];
};

const CartDetails = ({ coupons }: CartDetailsProps) => {
  const { cart, removeFromCart, updateQuantity, applyCoupon, selectedCoupon, calculateTotal } = useCartContext();
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
      <div className="space-y-2">
        {cart.map((item) => {
          const appliedDiscount = getMaxDiscount(item.product.discounts);
          return (
            <div key={item.product.id} className="flex justify-between items-center bg-white p-3 rounded shadow">
              <div>
                <span className="font-semibold">{item.product.name}</span>
                <br />
                <span className="text-sm text-gray-600">
                  {item.product.price}원 x {item.quantity}
                  {appliedDiscount > 0 && (
                    <span className="text-green-600 ml-1">({(appliedDiscount * 100).toFixed(0)}% 할인 적용)</span>
                  )}
                </span>
              </div>
              <div>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
                >
                  -
                </button>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
      </div>

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

      <Card.Container>
        <Card.Title>주문 요약</Card.Title>
        <div className="space-y-1">
          <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
          <p className="text-green-600">할인 금액: {totalDiscount.toLocaleString()}원</p>
          <p className="text-xl font-bold">최종 결제 금액: {totalAfterDiscount.toLocaleString()}원</p>
        </div>
      </Card.Container>
    </div>
  );
};

export default CartDetails;
