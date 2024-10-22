import { Coupon, Product } from "../../types.ts";
import { CartDetails, ProductList } from "./cart";

import Layout from "./shared/Layout.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  return (
    <Layout.Container>
      <Layout.Title>장바구니</Layout.Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList products={products} />
        <CartDetails coupons={coupons} />
      </div>
    </Layout.Container>
  );
};
