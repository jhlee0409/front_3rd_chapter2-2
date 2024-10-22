import { useMemo } from "react";
import { Coupon } from "../../../../types";
import useForm, { InputProps } from "../../../hooks/useForm";

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

  const inputs: InputProps<Coupon>[] = useMemo(
    () => [
      {
        label: "쿠폰 이름",
        type: "text",
        id: "name",
        value: data.name,
        ...register("name"),
      },
      {
        label: "쿠폰 코드",
        type: "text",
        id: "code",
        value: data.code,
        ...register("code"),
      },
      {
        label: "할인 유형",
        type: "select",
        id: "discountType",
        value: data.discountType,
        ...register("discountType"),
        options: [
          {
            label: "금액(원)",
            value: "amount",
          },
          {
            label: "할인율(%)",
            value: "percentage",
          },
        ],
      },
      {
        label: "할인 값",
        type: "number",
        id: "discountValue",
        value: data.discountValue,
        ...register("discountValue"),
      },
    ],
    [data, register],
  );

  return (
    <form className="space-y-2 mb-4" onSubmit={handleAddCoupon}>
      {inputs.map((input) =>
        "options" in input && input.type === "select" ? (
          <select key={input.id} className="w-full p-2 border rounded" {...input}>
            {input.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input key={input.id} placeholder={input.label} className="w-full p-2 border rounded" {...input} />
        ),
      )}
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        쿠폰 추가
      </button>
    </form>
  );
};

export default AddCouponForm;
