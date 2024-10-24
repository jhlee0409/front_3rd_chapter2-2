import { useProductContext } from "@/refactoring/context/ProductContext";
import EditProductSection from "./EditProductSection";

const Products = () => {
  const { products, updateProduct } = useProductContext();
  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <div key={product.id} data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
          <EditProductSection product={product} onSubmit={updateProduct} />
        </div>
      ))}
    </div>
  );
};

export default Products;
