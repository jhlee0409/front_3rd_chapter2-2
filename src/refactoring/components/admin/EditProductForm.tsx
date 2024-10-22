import { forwardRef, useCallback, useMemo } from "react";
import { Product } from "../../../types";
import useForm, { InputProps } from "../../hooks/useForm";
import { createUpdatedObject } from "../../lib/object";
import { Accordion } from "../shared";
import EditDiscountForm from "./EditDiscountForm";

type EditProductFormProps = {
  product: Product;
  onSubmit: (product: Product) => void;
};

const EditProductForm = ({ product, onSubmit }: EditProductFormProps) => {
  const { data, reset, register, handleSubmit } = useForm<Product>();

  // A
  const handleEditComplete = () => {
    handleSubmit(onSubmit);
    reset();
  };

  const handleProductUpdate = useCallback(
    (productId: string, updates: Partial<Product>) => {
      if (data && data.id === productId) {
        const updatedProduct = createUpdatedObject(data, updates);
        reset(updatedProduct);
      }
    },
    [data, reset],
  );

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

  return (
    <Accordion.Container>
      {() => (
        <>
          <Accordion.Trigger>
            <button data-testid="toggle-button" className="w-full text-left font-semibold">
              {product.name} - {product.price}원 (재고: {product.stock})
            </button>
          </Accordion.Trigger>
          <Accordion.Content>
            <div className="mt-2">
              {data && data.id === product.id ? (
                <div>
                  {inputs.map((input) => (
                    <EditField {...input} key={input.name} />
                  ))}
                  {/* 할인 정보 수정 부분 */}
                  <EditDiscountForm discounts={data.discounts} id={data.id} onSubmit={handleProductUpdate} />
                  <button
                    onClick={handleEditComplete}
                    type="button"
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
                  >
                    수정 완료
                  </button>
                </div>
              ) : (
                <div>
                  {product.discounts.map((discount, index) => (
                    <div key={index} className="mb-2">
                      <span>
                        {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
                      </span>
                    </div>
                  ))}
                  <button
                    data-testid="modify-button"
                    type="button"
                    onClick={() => reset(product)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
                  >
                    수정
                  </button>
                </div>
              )}
            </div>
          </Accordion.Content>
        </>
      )}
    </Accordion.Container>
  );
};

export default EditProductForm;

// ==========================================================================================

const EditField = forwardRef<HTMLInputElement, InputProps<Omit<Product, "discounts">>>((props, ref) => {
  const { label } = props;
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}: </label>
      <input {...props} className="w-full p-2 border rounded" ref={ref} />
    </div>
  );
});
