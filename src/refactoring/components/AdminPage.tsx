import { Coupon } from "@/types";
import { CouponPanel, ProductPanel } from "./admin";

import { Layout } from "@/refactoring/components/shared";

interface Props {
  coupons: Coupon[];

  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({ coupons, onCouponAdd }: Props) => {
  return (
    <Layout.Container>
      <Layout.Title>관리자 페이지</Layout.Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductPanel />
        <CouponPanel coupons={coupons} onCouponAdd={onCouponAdd} />
      </div>
    </Layout.Container>
  );
};
