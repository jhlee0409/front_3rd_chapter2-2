import { CartDetails, ProductList } from "@/refactoring/components/cart";
import { Coupon } from "@/types";

import { Layout } from "@/refactoring/components/shared";

interface Props {
  coupons: Coupon[];
}

export const CartPage = ({ coupons }: Props) => {
  return (
    <Layout.Container>
      <Layout.Title>장바구니</Layout.Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList />
        <CartDetails coupons={coupons} />
      </div>
    </Layout.Container>
  );
};
