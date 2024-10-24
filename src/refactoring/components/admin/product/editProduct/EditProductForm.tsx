import useForm, { UseFormReturn } from "@/refactoring/hooks/useForm";
import { Product } from "@/types";
import { useCallback } from "react";
import { EditDiscountSection } from "../editDiscount";
import EditFields from "./EditFields";

type EditProductFormProps = {
  product: Product;
  onSubmit: (product: Product) => void;
};

const EditProductForm = ({ product, onSubmit }: EditProductFormProps) => {
  const { data, reset, handleSubmit, register } = useForm<Product>();

  // A
  const handleProductUpdate = useCallback(
    (productId: string, updates: Partial<Product>) => {
      if (data && data.id === productId) {
        reset(updates, {
          keepValues: true,
        });
      }
    },
    [data, reset],
  );

  return (
    <div className="mt-2">
      {data && data.id === product.id ? (
        <div>
          <EditFields data={data} register={register} />
          <EditDiscountSection discounts={data.discounts} id={data.id} onSubmit={handleProductUpdate} />
          <button
            onClick={() =>
              handleSubmit(onSubmit, {
                reset: true,
              })()
            }
            type="button"
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
          >
            수정 완료
          </button>
        </div>
      ) : (
        <ViewContent data={product} reset={reset} />
      )}
    </div>
  );
};

export default EditProductForm;

type ViewContentProps = {
  data: Product;
  reset: UseFormReturn<Product>["reset"];
};

const ViewContent = ({ data, reset }: ViewContentProps) => {
  return (
    <div>
      {data.discounts.map((discount, index) => (
        <div key={index} className="mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
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
