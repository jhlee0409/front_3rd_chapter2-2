import { ChangeEvent, useMemo, useState } from "react";
import { Product } from "../../../types";
import { createUpdatedObject } from "../../lib/object";
import EditDiscountForm from "./EditDiscountForm";

type EditProductFormProps = {
  product: Product;
  onSubmit: (product: Product) => void;
};

const EditProductForm = ({ product, onSubmit }: EditProductFormProps) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // C
  const toggleProductSet = (productId: string, prevSet: Set<string>) => {
    const newSet = new Set(prevSet);
    if (newSet.has(productId)) {
      newSet.delete(productId);
    } else {
      newSet.add(productId);
    }
    return newSet;
  };

  // A
  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => toggleProductSet(productId, prev));
  };

  // A
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // A
  const handleProductUpdate = (productId: string, updates: Partial<Product>) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct((prev) => {
        if (!prev) return null;
        return createUpdatedObject(prev, updates);
      });
    }
  };

  // A
  const resetEditingProduct = () => {
    setEditingProduct(null);
  };

  // A
  const handleEditComplete = () => {
    if (!editingProduct) return;
    onSubmit(editingProduct);
    resetEditingProduct();
  };

  const inputs = useMemo(
    () => [
      {
        label: "상품명",
        name: "name",
        value: editingProduct?.name,
        onChange: (e: ChangeEvent<HTMLInputElement>) => handleProductUpdate(product.id, { name: e.target.value }),
      },
      {
        label: "가격",
        name: "price",
        value: editingProduct?.price,
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          handleProductUpdate(product.id, { price: parseInt(e.target.value) }),
      },
      {
        label: "재고",
        name: "stock",
        value: editingProduct?.stock,
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          handleProductUpdate(product.id, { stock: parseInt(e.target.value) }),
      },
    ],
    [editingProduct, product.id],
  );

  return (
    <>
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {openProductIds.has(product.id) && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === product.id ? (
            <div>
              {inputs.map((input) => (
                <EditField {...input} />
              ))}
              {/* 할인 정보 수정 부분 */}
              <EditDiscountForm
                discounts={editingProduct.discounts}
                id={editingProduct.id}
                onSubmit={handleProductUpdate}
              />
              <button
                onClick={handleEditComplete}
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
                onClick={() => handleEditProduct(product)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                수정
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EditProductForm;

// ==========================================================================================

type EditFieldProps = {
  label: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const EditField = ({ label, name, value, onChange }: EditFieldProps) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label}: </label>
      <input type="text" value={value} name={name} onChange={onChange} className="w-full p-2 border rounded" />
    </div>
  );
};
