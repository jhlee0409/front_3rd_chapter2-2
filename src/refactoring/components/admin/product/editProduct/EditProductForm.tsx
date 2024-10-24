import { useProductContext } from "@/refactoring/context/ProductContext";
import useForm from "@/refactoring/hooks/useForm";
import { Product } from "@/types";
import { useCallback } from "react";
import { EditDiscountSection } from "../editDiscount";
import AppliedCoupons from "./AppliedCoupons";
import EditFields from "./EditFields";

type EditProductFormProps = {
  product: Product;
};

const EditProductForm = ({ product }: EditProductFormProps) => {
  const { updateProduct } = useProductContext();
  const { data: editedProduct, reset, handleSubmit, register } = useForm<Product>();

  // A
  const handleProductUpdate = useCallback(
    (productId: string, updates: Partial<Product>) => {
      if (editedProduct && editedProduct.id === productId) {
        reset(updates, {
          keepValues: true,
        });
      }
    },
    [editedProduct, reset],
  );

  return (
    <div className="mt-2">
      {editedProduct && editedProduct.id === product.id ? (
        <div>
          <EditFields data={editedProduct} register={register} />
          <EditDiscountSection
            discounts={editedProduct.discounts}
            id={editedProduct.id}
            onSubmit={handleProductUpdate}
          />
          <button
            onClick={() =>
              handleSubmit(updateProduct, {
                reset: true,
              })()
            }
            type="button"
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
          >
            수정 완료
          </button>
        </div>
      ) : (
        <AppliedCoupons data={product} reset={reset} />
      )}
    </div>
  );
};

export default EditProductForm;
