import { Coupon, Product } from "../../types.ts";
import { AddProductForm, CouponForm, Coupons, Products } from "./admin";
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
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <AddProductForm onSubmit={onProductAdd} />
          <Products products={products} onProductUpdate={onProductUpdate} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <CouponForm onSubmit={onCouponAdd} />
            <Coupons coupons={coupons} />
          </div>
        </div>
      </div>
    </Layout.Container>
  );
};
