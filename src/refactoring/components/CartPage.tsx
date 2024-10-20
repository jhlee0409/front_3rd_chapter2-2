import { Coupon, Product } from "../../types.ts";
import { CartDetails, ProductList } from "./Cart";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductList products={products} />
        <CartDetails coupons={coupons} />
      </div>
    </div>
  );
};
