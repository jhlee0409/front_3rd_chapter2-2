import { Discount } from "@/types";

type DiscountInfoProps = {
  discounts: Discount[];
  onDelete: (id: string, index: number) => void;
  id: string;
};

const DiscountInfo = ({ discounts, onDelete, id }: DiscountInfoProps) => {
  return (
    <>
      {discounts.map((discount, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
          <button
            onClick={() => onDelete(id, index)}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      ))}
    </>
  );
};

export default DiscountInfo;
