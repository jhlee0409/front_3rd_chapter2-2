import { Accordion } from "@/refactoring/components/shared";
import { useProductContext } from "@/refactoring/context/ProductContext";
import EditProductForm from "./EditProductForm";

const EditProductSection = () => {
  const { products, updateProduct } = useProductContext();
  return (
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
                <EditProductForm product={product} onSubmit={updateProduct} />
              </Accordion.Content>
            </>
          </Accordion.Container>
        </div>
      ))}
    </div>
  );
};

export default EditProductSection;
