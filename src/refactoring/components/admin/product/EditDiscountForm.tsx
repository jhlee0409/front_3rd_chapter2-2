import { useMemo } from "react";
import { Discount, Product } from "../../../../types";
import useForm, { InputProps } from "../../../hooks/useForm";

const initialNewDiscount: Discount = { quantity: 0, rate: 0 };

type EditDiscountFormProps = {
  discounts: Discount[];
  id: string;
  onSubmit: (productId: string, newProduct: Partial<Product>) => void;
};

const EditDiscountForm = ({ discounts, id, onSubmit }: EditDiscountFormProps) => {
  const { data, handleSubmit, register, reset } = useForm({ defaultValues: initialNewDiscount });

  const handleAddDiscount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((data) => onSubmit(id, { discounts: [...discounts, data] }));
    reset();
  };

  const Inputs: InputProps<Discount>[] = useMemo(
    () => [
      { type: "number", id: "quantity", value: data.quantity, placeholder: "수량", ...register("quantity") },
      {
        type: "number",
        id: "rate",
        value: data.rate,
        placeholder: "할인율 (%)",
        ...register("rate", { setValueAs: (v) => parseInt(v) / 100 }),
      },
    ],
    [data, register],
  );

  return (
    <form className="flex space-x-2" onSubmit={handleAddDiscount}>
      {Inputs.map((input) => (
        <input key={input.id} className="w-1/3 p-2 border rounded" {...input} />
      ))}
      <button type="submit" className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        할인 추가
      </button>
    </form>
  );
};

export default EditDiscountForm;
