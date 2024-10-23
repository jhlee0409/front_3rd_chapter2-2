import { Product } from "@/types";
import { AddProductSection, Products } from "./product";

type ProductPanelProps = {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
};

const ProductPanel = ({ products, onProductUpdate, onProductAdd }: ProductPanelProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <AddProductSection onSubmit={onProductAdd} />
      <Products products={products} onProductUpdate={onProductUpdate} />
    </div>
  );
};

export default ProductPanel;
