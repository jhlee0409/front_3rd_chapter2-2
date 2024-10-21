import { useMemo } from "react";
import { Product } from "../../../types";
import { useAddProduct } from "../../hooks";
import { Accordion } from "../shared";

type AddProductFormProps = {
  onSubmit: (newProduct: Product) => void;
};

const AddProductForm = ({ onSubmit }: AddProductFormProps) => {
  const { newProduct, createProductWithId, handleChange, initializeProduct } = useAddProduct();

  const handleAddNewProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // C
    const productWithId = createProductWithId(newProduct, Date.now().toString());
    // A
    onSubmit(productWithId);
    initializeProduct();
  };

  // C
  const inputs = useMemo(
    () => [
      {
        label: "상품명",
        name: "name",
        type: "text",
        id: "productName",
        value: newProduct.name,
        onChange: handleChange,
      },
      {
        label: "가격",
        name: "price",
        type: "number",
        id: "productPrice",
        value: newProduct.price,
        onChange: handleChange,
      },
      {
        label: "재고",
        name: "stock",
        type: "number",
        id: "productStock",
        value: newProduct.stock,
        onChange: handleChange,
      },
    ],
    [newProduct, handleChange],
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
                  <input
                    id={input.id}
                    type={input.type}
                    value={input.value}
                    name={input.name}
                    onChange={input.onChange}
                    className="w-full p-2 border rounded"
                  />
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
