import { InputProps, UseFormReturn } from "@/refactoring/hooks";
import { Product } from "@/types";
import { useMemo } from "react";

const EditFields = ({ data, register }: { data: Product; register: UseFormReturn<Product>["register"] }) => {
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
    <>
      {inputs.map((input) => (
        <div className="mb-4" key={input.id}>
          <label className="block mb-1">{input.label}: </label>
          <input {...input} className="w-full p-2 border rounded" />
        </div>
      ))}
    </>
  );
};
export default EditFields;
