import { Card } from "@/refactoring/components/shared";
import { useCartContext } from "@/refactoring/context/CartContext";

const OrderSummary = () => {
  const { calculateTotal } = useCartContext();
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();
  return (
    <Card.Container>
      <Card.Title>주문 요약</Card.Title>
      <div className="space-y-1">
        <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
        <p className="text-green-600">할인 금액: {totalDiscount.toLocaleString()}원</p>
        <p className="text-xl font-bold">최종 결제 금액: {totalAfterDiscount.toLocaleString()}원</p>
      </div>
    </Card.Container>
  );
};

export default OrderSummary;
