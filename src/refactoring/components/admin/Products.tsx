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
        <EditProductForm
          product={product}
          onSubmit={onProductUpdate}
          key={product.id}
          data-testid={`product-${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Products;
