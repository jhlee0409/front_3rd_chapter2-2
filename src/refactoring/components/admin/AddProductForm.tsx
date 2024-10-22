import { useCallback, useMemo } from "react";
import { Product } from "../../../types";
import useForm, { InputProps } from "../../hooks/useForm";
import { Accordion } from "../shared";

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
  const { data, handleSubmit, register, reset } = useForm({ defaultValues: initialNewProduct });

  const createProductWithId = useCallback((product: Omit<Product, "id">, id: string) => {
    return { ...product, id };
  }, []);

  const handleAddNewProduct = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit((data) => onSubmit(createProductWithId(data, Date.now().toString())), e);
    reset();
  };

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
    [],
  );

  return (
    <Accordion.Container>
      {({ open, toggle }) => (
        <>
          <Accordion.Trigger>
            <button className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600">
              {open ? "취소" : "새 상품 추가"}
            </button>
          </Accordion.Trigger>
          <Accordion.Content>
            <form
              className="bg-white p-4 rounded shadow mb-4"
              onSubmit={(e) => {
                handleAddNewProduct(e);
                toggle();
              }}
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
          </Accordion.Content>
        </>
      )}
    </Accordion.Container>
  );
};

export default AddProductForm;
