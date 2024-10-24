import { CouponPanel, ProductPanel } from "./admin";

import { Layout } from "@/refactoring/components/shared";

export const AdminPage = () => {
  return (
    <Layout.Container>
      <Layout.Title>관리자 페이지</Layout.Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductPanel />
        <CouponPanel />
      </div>
    </Layout.Container>
  );
};
