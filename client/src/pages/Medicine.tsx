import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicines } from "../store/slicers/medicineSlicer";
import MedicineCard from "../components/MedicineCard";

const Medicine = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  const { medicines } = useSelector((state: any) => state.medicine);
  const { cartItems } = useSelector((state: any) => state.cart);

  return (
    <section className="flex flex-wrap p-8">
      {medicines.map((medicine: any) => (
        <MedicineCard key={medicine._id} medicine={medicine} type="notCart" quantity={cartItems.find((cartItem: any) => medicine._id === cartItem.item._id) ? cartItems.find((cartItem: any) => medicine._id === cartItem.item._id).quantity : 0} />
      ))}
    </section>
  );
};

export default Medicine;
