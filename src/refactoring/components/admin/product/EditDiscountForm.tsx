import useForm, { InputProps } from "@/refactoring/hooks/useForm";
import { Discount, Product } from "@/types";
import { useMemo } from "react";

const initialNewDiscount: Discount = { quantity: 0, rate: 0 };

type EditDiscountFormProps = {
  discounts: Discount[];
  id: string;
  onSubmit: (productId: string, newProduct: Partial<Product>) => void;
};

const preciseMultiply = (num: number) => Math.round(num * 100);

const EditDiscountForm = ({ discounts, id, onSubmit }: EditDiscountFormProps) => {
  const { data, handleSubmit, register } = useForm({ defaultValues: initialNewDiscount });

  const inputs: InputProps<Discount>[] = useMemo(
    () => [
      {
        type: "number",
        id: "quantity",
        value: data.quantity,
        placeholder: "수량",
        "data-testid": "quantity",
        ...register("quantity", { setValueAs: (v) => parseInt(v) }),
      },
      {
        type: "number",
        id: "rate",
        value: preciseMultiply(data.rate),
        placeholder: "할인율 (%)",
        ...register("rate", { setValueAs: (v) => parseInt(v) / 100 }),
      },
    ],
    [data, register],
  );

  return (
    <form
      className="flex space-x-2"
      onSubmit={handleSubmit((data) => onSubmit(id, { discounts: [...discounts, data] }), {
        reset: true,
      })}
    >
      {inputs.map((input) => (
        <input key={input.id} className="w-1/3 p-2 border rounded" {...input} />
      ))}
      <button type="submit" className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        할인 추가
      </button>
    </form>
  );
};

export default EditDiscountForm;
