import { useEditProductContext } from "@/refactoring/context/EditProductContext";
import { percentageToDecimal } from "@/refactoring/lib/math";
import { Product } from "@/types";

type AppliedCouponsProps = {
  data: Product;
};

const AppliedCoupons = ({ data }: AppliedCouponsProps) => {
  const { reset } = useEditProductContext();
  return (
    <div>
      {data.discounts.map((discount, index) => (
        <div key={index} className="mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {percentageToDecimal(discount.rate)}% 할인
          </span>
        </div>
      ))}
      <button
        data-testid="modify-button"
        type="button"
        onClick={() => reset(data)}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
      >
        수정
      </button>
    </div>
  );
};

export default AppliedCoupons;
