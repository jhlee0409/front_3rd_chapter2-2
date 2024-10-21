import { useCallback, useMemo, useState } from "react";
import { Product } from "../../../types";

const initialNewProduct: Omit<Product, "id"> = {
  name: "",
  price: 0,
  stock: 0,
  discounts: [],
};

type AddProductFormProps = {
  onSubmit: (newProduct: Product) => void;
};

const AddProductForm = ({ onSubmit }: AddProductFormProps) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>(initialNewProduct);

  const initializeProduct = () => {
    setNewProduct(initialNewProduct);
  };

  const createProductWithId = (product: Omit<Product, "id">) => {
    return { ...product, id: Date.now().toString() };
  };

  const handleAddNewProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // C
    const productWithId = createProductWithId(newProduct);

    // A
    onSubmit(productWithId);
    initializeProduct();
    setShowNewProductForm(false);
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  }, []);

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
    [],
  );

  return (
    <>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <form className="bg-white p-4 rounded shadow mb-4" onSubmit={handleAddNewProduct}>
          <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
          {inputs.map((input) => (
            <div className="mb-2">
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
      )}
    </>
  );
};

export default AddProductForm;
