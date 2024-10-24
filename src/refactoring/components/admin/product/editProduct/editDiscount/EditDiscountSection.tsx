import DiscountInfo from "./DiscountInfo";
import EditDiscountForm from "./EditDiscountForm";


const EditDiscountSection = () => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      <DiscountInfo />
      <EditDiscountForm />
    </div>
  );
};

export default EditDiscountSection;
