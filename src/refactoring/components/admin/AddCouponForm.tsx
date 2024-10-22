import { Coupon } from "../../../types";
import useForm from "../../hooks/useForm";

const initialNewCoupon: Coupon = {
  name: "",
  code: "",
  discountType: "percentage",
  discountValue: 0,
};

type AddCouponFormProps = {
  onSubmit: (coupon: Coupon) => void;
};

const AddCouponForm = ({ onSubmit }: AddCouponFormProps) => {
  const { data, handleSubmit, register, reset } = useForm({ defaultValues: initialNewCoupon });

  const handleAddCoupon = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit((data) => onSubmit(data), e);
    reset();
  };

  return (
    <form className="space-y-2 mb-4" onSubmit={handleAddCoupon}>
      <input type="text" placeholder="쿠폰 이름" className="w-full p-2 border rounded" {...register("name")} />
      <input
        type="text"
        placeholder="쿠폰 코드"
        value={data.code}
        className="w-full p-2 border rounded"
        {...register("code")}
      />
      <div className="flex gap-2">
        <select value={data.discountType} className="w-full p-2 border rounded" {...register("discountType")}>
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <input
          type="number"
          placeholder="할인 값"
          value={data.discountValue}
          className="w-full p-2 border rounded"
          {...register("discountValue")}
        />
      </div>
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        쿠폰 추가
      </button>
    </form>
  );
};

export default AddCouponForm;
