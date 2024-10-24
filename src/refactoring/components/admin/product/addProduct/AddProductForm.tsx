import useForm, { InputProps } from "@/refactoring/hooks/useForm";
import { Product } from "@/types";
import { useCallback, useMemo } from "react";

type AddProductFormProps = {
  onSubmit: (newProduct: Product) => void;
};

const initialNewProduct: Omit<Product, "id"> = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

const AddProductForm = ({ onSubmit }: AddProductFormProps) => {
  const { data, handleSubmit, register } = useForm({ defaultValues: initialNewProduct });

  // C
  const createProductWithId = useCallback((product: Omit<Product, "id">, id: string) => {
    return { ...product, id };
  }, []);

  // C
  const inputs: InputProps<Omit<Product, "discounts">>[] = useMemo(
    () => [
      {
        label: "상품명",
        type: "text",
        id: "productName",
        value: data.name,
        ...register("name"),
      },
      {
        label: "가격",
        type: "number",
        id: "productPrice",
        value: data.price,
        ...register("price"),
      },
      {
        label: "재고",
        type: "number",
        id: "productStock",
        value: data.stock,
        ...register("stock"),
      },
    ],
    [data, register],
  );

  return (
    <form
      className="bg-white p-4 rounded shadow mb-4"
      onSubmit={handleSubmit((data) => onSubmit(createProductWithId(data, Date.now().toString())), {
        reset: true,
      })}
    >
      <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
      {inputs.map((input) => (
        <div className="mb-2" key={input.name}>
          <label htmlFor={input.id} className="block text-sm font-medium text-gray-700">
            {input.label}
          </label>
          <input className="w-full p-2 border rounded" {...input} />
        </div>
      ))}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        추가
      </button>
    </form>
  );
};

export default AddProductForm;
