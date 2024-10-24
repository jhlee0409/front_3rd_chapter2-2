import { removedItemByIndex } from "@/refactoring/lib/array";
import { Discount, Product } from "@/types";
import DiscountInfo from "./DiscountInfo";
import EditDiscountForm from "./EditDiscountForm";

type EditDiscountSectionProps = {
  discounts: Discount[];
  id: string;
  onSubmit: (productId: string, newProduct: Partial<Product>) => void;
};

const EditDiscountSection = ({ discounts, id, onSubmit }: EditDiscountSectionProps) => {
  const handleRemoveDiscount = (productId: string, index: number) => {
    onSubmit(productId, { discounts: removedItemByIndex(discounts, index) });
  };

  return (
    <>
      <div>
        <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
        <DiscountInfo discounts={discounts} id={id} onDelete={handleRemoveDiscount} />
        <EditDiscountForm discounts={discounts} id={id} onSubmit={onSubmit} />
      </div>
    </>
  );
};

export default EditDiscountSection;
