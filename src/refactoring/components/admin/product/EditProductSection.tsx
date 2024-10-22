import { Product } from "../../../../types";
import { Accordion } from "../../shared";
import EditProductForm from "./EditProductForm";

type EditDiscountSectionProps = {
  product: Product;
  onSubmit: (product: Product) => void;
};

const EditProductSection = ({ product, onSubmit }: EditDiscountSectionProps) => {
  return (
    <Accordion.Container>
      <>
        <Accordion.Trigger>
          <button data-testid="toggle-button" className="w-full text-left font-semibold">
            {product.name} - {product.price}원 (재고: {product.stock})
          </button>
        </Accordion.Trigger>
        <Accordion.Content>
          <EditProductForm product={product} onSubmit={onSubmit} />
        </Accordion.Content>
      </>
    </Accordion.Container>
  );
};

export default EditProductSection;
