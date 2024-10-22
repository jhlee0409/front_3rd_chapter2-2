import { Coupon, Product } from "../../types.ts";
import { CouponPanel, ProductPanel } from "./admin";

import { Layout } from "./shared";

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({ products, coupons, onProductUpdate, onProductAdd, onCouponAdd }: Props) => {
  return (
    <Layout.Container>
      <Layout.Title>관리자 페이지</Layout.Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductPanel products={products} onProductUpdate={onProductUpdate} onProductAdd={onProductAdd} />
        <CouponPanel coupons={coupons} onCouponAdd={onCouponAdd} />
      </div>
    </Layout.Container>
  );
};
