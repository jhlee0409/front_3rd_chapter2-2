import { Product } from "../../../../types";
import EditProductSection from "./EditProductSection";

type ProductsProps = {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
};

const Products = ({ products, onProductUpdate }: ProductsProps) => {
  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <div key={product.id} data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
          <EditProductSection product={product} onSubmit={onProductUpdate} />
        </div>
      ))}
    </div>
  );
};

export default Products;
