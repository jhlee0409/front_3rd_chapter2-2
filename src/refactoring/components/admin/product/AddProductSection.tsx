import { Accordion } from "@/refactoring/components/shared";
import { Product } from "@/types";
import AddProductForm from "./AddProductForm";

type AddProductFormProps = {
  onSubmit: (newProduct: Product) => void;
};

const AddProductSection = ({ onSubmit }: AddProductFormProps) => {
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
            <AddProductForm
              onSubmit={(newProduct) => {
                onSubmit(newProduct);
                toggle();
              }}
            />
          </Accordion.Content>
        </>
      )}
    </Accordion.Container>
  );
};

export default AddProductSection;
