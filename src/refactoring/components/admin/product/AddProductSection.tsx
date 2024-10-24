import { Accordion } from "@/refactoring/components/shared";
import { useProductContext } from "@/refactoring/context/ProductContext";
import AddProductForm from "./AddProductForm";

const AddProductSection = () => {
  const { addProduct } = useProductContext();
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
                addProduct(newProduct);
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
