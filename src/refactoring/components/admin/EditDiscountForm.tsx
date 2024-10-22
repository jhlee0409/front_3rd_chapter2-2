import { Discount, Product } from "../../../types";
import useForm from "../../hooks/useForm";
import { removedItemByIndex } from "../../lib/array";

const initialNewDiscount: Discount = { quantity: 0, rate: 0 };

type EditDiscountFormProps = {
  discounts: Discount[];
  id: string;
  onSubmit: (productId: string, newProduct: Partial<Product>) => void;
};

const EditDiscountForm = ({ discounts, id, onSubmit }: EditDiscountFormProps) => {
  const { handleSubmit, register, reset } = useForm({ defaultValues: initialNewDiscount });

  const handleAddDiscount = (productId: string, data: Discount) => {
    onSubmit(productId, { discounts: [...discounts, data] });
    reset();
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    onSubmit(productId, { discounts: removedItemByIndex(discounts, index) });
  };

  return (
    <>
      <div>
        <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
        {discounts.map((discount, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>
              {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
            </span>
            <button
              onClick={() => handleRemoveDiscount(id, index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        ))}
        <form className="flex space-x-2" onSubmit={(e) => handleSubmit((data) => handleAddDiscount(id, data), e)}>
          <input type="number" placeholder="수량" className="w-1/3 p-2 border rounded" {...register("quantity")} />
          <input
            type="number"
            placeholder="할인율 (%)"
            className="w-1/3 p-2 border rounded"
            {...register("rate", {
              setValueAs: (v) => parseInt(v) / 100,
            })}
          />
          <button type="submit" className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            할인 추가
          </button>
        </form>
      </div>
    </>
  );
};

export default EditDiscountForm;
