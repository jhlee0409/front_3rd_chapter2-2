import { Product } from "../../../types";
import EditProductForm from "./EditProductForm";

type ProductsProps = {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
};

const Products = ({ products, onProductUpdate }: ProductsProps) => {
  return (
    <div className="space-y-2">
      {products.map((product, index) => (
        <div key={product.id} data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
          <EditProductForm product={product} onSubmit={onProductUpdate} />
        </div>
      ))}
    </div>
  );
};

export default Products;
