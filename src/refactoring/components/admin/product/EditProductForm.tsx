import useForm, { InputProps, UseFormReturn } from "@/refactoring/hooks/useForm";
import { Product } from "@/types";
import { forwardRef, useCallback, useMemo } from "react";
import EditDiscountSection from "./EditDiscountSection";

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
        <EditContent
          data={data}
          handleProductUpdate={handleProductUpdate}
          handleEditComplete={handleSubmit(onSubmit, {
            reset: true,
          })}
          register={register}
        />
      ) : (
        <ViewContent data={product} reset={reset} />
      )}
    </div>
  );
};

export default EditProductForm;

// ==========================================================================================

const EditField = forwardRef<HTMLInputElement, InputProps<Omit<Product, "discounts">>>((props, ref) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{props.label}: </label>
      <input {...props} className="w-full p-2 border rounded" ref={ref} />
    </div>
  );
});

// ==========================================================================================

type EditContentProps = {
  data: Product;
  handleProductUpdate: (productId: string, updates: Partial<Product>) => void;
  handleEditComplete: () => void;
  register: UseFormReturn<Product>["register"];
};

const EditContent = ({ data, handleProductUpdate, handleEditComplete, register }: EditContentProps) => {
  const inputs: InputProps<Omit<Product, "discounts">>[] = useMemo(
    () => [
      {
        label: "상품명",
        id: "name",
        type: "text",
        value: data?.name,
        ...register("name"),
      },
      {
        label: "가격",
        id: "price",
        type: "text",
        value: data?.price,
        ...register("price"),
      },
      {
        label: "재고",
        id: "stock",
        type: "text",
        value: data?.stock,
        ...register("stock"),
      },
    ],
    [data, register],
  );

  const EditFields = () => {
    return inputs.map((input) => <EditField {...input} key={input.name} />);
  };

  return (
    <div>
      <EditFields />
      <EditDiscountSection discounts={data.discounts} id={data.id} onSubmit={handleProductUpdate} />
      <button
        onClick={handleEditComplete}
        type="button"
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
};

// ==========================================================================================

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
