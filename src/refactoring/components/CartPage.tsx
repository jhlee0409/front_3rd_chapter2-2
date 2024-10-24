import { CartDetails, ProductList } from "@/refactoring/components/cart";

import { Layout } from "@/refactoring/components/shared";

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
