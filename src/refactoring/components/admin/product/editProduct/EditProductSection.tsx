import { Accordion } from "@/refactoring/components/shared";
import { EditProductContextProvider } from "@/refactoring/context/EditProductContext";
import { useProductContext } from "@/refactoring/context/ProductContext";
import EditProductForm from "./EditProductForm";

const EditProductSection = () => {
  const { products } = useProductContext();
  return (
    <EditProductContextProvider>
      <div className="space-y-2">
        {products.map((product, index) => (
          <div key={product.id} data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
            <Accordion.Container>
              <>
                <Accordion.Trigger>
                  <button data-testid="toggle-button" className="w-full text-left font-semibold">
                    {product.name} - {product.price}원 (재고: {product.stock})
                  </button>
                </Accordion.Trigger>
                <Accordion.Content>
                  <EditProductForm product={product} />
                </Accordion.Content>
              </>
            </Accordion.Container>
          </div>
        ))}
      </div>
    </EditProductContextProvider>
  );
};

export default EditProductSection;
