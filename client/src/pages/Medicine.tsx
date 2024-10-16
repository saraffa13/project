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

  return (
    <section className="flex flex-wrap p-8">
      {medicines.map((medicine: any) => (
        <MedicineCard key={medicine._id} medicine={medicine} />
      ))}
    </section>
  );
};

export default Medicine;
