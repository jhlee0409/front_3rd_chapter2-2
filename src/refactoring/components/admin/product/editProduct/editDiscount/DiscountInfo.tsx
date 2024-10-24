import { useEditProductContext } from "@/refactoring/context/EditProductContext";
import { removedItemByIndex } from "@/refactoring/lib/array";

const DiscountInfo = () => {
  const { reset, data } = useEditProductContext();
  const { discounts } = data;

  const handleRemoveDiscount = (index: number) => {
    reset({ discounts: removedItemByIndex(discounts, index) }, { keepValues: true });
  };

  return (
    <>
      {discounts.map((discount, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
          <button
            onClick={() => handleRemoveDiscount(index)}
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
