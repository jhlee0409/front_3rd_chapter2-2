import { AddProductSection, Products } from "./product";

const ProductPanel = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <AddProductSection />
      <Products />
    </div>
  );
};

export default ProductPanel;
