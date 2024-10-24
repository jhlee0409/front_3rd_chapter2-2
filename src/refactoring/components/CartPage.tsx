import { Layout } from "@/refactoring/components/shared";
import ProductList from "./cart/ProductList";
import CartDetails from "./cart/details/CartDetails";

export const CartPage = () => {
  return (
    <Layout.Container>
      <Layout.Title>장바구니</Layout.Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList />
        <CartDetails />
      </div>
    </Layout.Container>
  );
};
