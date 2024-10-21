import { useState } from "react";
import { Product } from "../../../types";
import EditDiscountForm from "./EditDiscountForm";

type EditProductFormProps = {
  product: Product;
  onSubmit: (product: Product) => void;
};

const EditProductForm = ({ product, onSubmit }: EditProductFormProps) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // No Entity
  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleProductUpdate = (productId: string, newProduct: Partial<Product>) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({ ...editingProduct, ...newProduct });
    }
  };

  const handleEditComplete = () => {
    if (!editingProduct) return;
    onSubmit(editingProduct);
    setEditingProduct(null);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
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
              <div className="mb-4">
                <label className="block mb-1">상품명: </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  name="name"
                  onChange={(e) => handleProductUpdate(product.id, { name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">가격: </label>
                <input
                  type="number"
                  value={editingProduct.price}
                  name="price"
                  onChange={(e) => handleProductUpdate(product.id, { price: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">재고: </label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  name="stock"
                  onChange={(e) => handleProductUpdate(product.id, { stock: parseInt(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
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
    </div>
  );
};

export default EditProductForm;
