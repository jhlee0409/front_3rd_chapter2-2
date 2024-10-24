import { useEditProductContext } from "@/refactoring/context/EditProductContext";
import { useProductContext } from "@/refactoring/context/ProductContext";
import { Product } from "@/types";
import AppliedCoupons from "./AppliedCoupons";
import { EditDiscountSection } from "./editDiscount";
import EditFields from "./EditFields";

type EditProductFormProps = {
  product: Product;
};

const EditProductForm = ({ product }: EditProductFormProps) => {
  const { updateProduct } = useProductContext();
  const { data: editedProduct, handleSubmit } = useEditProductContext();

  return (
    <div className="mt-2">
      {editedProduct && editedProduct.id === product.id ? (
        <div>
          <EditFields />
          <EditDiscountSection />
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
        <AppliedCoupons data={product} />
      )}
    </div>
  );
};

export default EditProductForm;
