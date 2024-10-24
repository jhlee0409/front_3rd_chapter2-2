import { useEditProductContext } from "@/refactoring/context/EditProductContext";
import useForm, { InputProps } from "@/refactoring/hooks/useForm";
import { preciseMultiply } from "@/refactoring/lib/math";
import { Discount } from "@/types";
import { useMemo } from "react";

const initialNewDiscount: Discount = { quantity: 0, rate: 0 };

const EditDiscountForm = () => {
  const { reset, data: editedData } = useEditProductContext();
  const { discounts: editedDiscounts } = editedData;
  const { data, handleSubmit, register } = useForm({ defaultValues: initialNewDiscount });

  const handleAddDiscount = () => {
    reset({ discounts: [...editedDiscounts, data] }, { keepValues: true });
  };

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
      onSubmit={handleSubmit(handleAddDiscount, {
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
