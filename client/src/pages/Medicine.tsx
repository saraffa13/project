import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMedicines } from "../store/slicers/medicineSlicer";
import MedicineCard from "../components/MedicineCard";
import { Link, useNavigate, useParams } from "react-router-dom";

const Medicine = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<any>('All');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMedicines());
  }, [dispatch]);

  const params = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    if ('type' in params) {
      console.log(params.type);
      setSelectedCategory(params.type);
    }
  }, [])

  const { medicines } = useSelector((state: any) => state.medicine);
  const { cartItems } = useSelector((state: any) => state.cart);
  const { role } = useSelector((state: any) => state.auth);


  const categories = ['All', ...new Set(medicines.map((medicine: any) => medicine.category))];

  const filteredMedicines = medicines.filter((medicine: any) => {
    const matchesCategory = selectedCategory === 'All' || medicine.category === selectedCategory;
    const matchesSearchTerm = medicine.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  const clearFilters = () => {
    navigate('/medicines')
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <section className="p-8">
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search medicines..."
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-1/2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category:any) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        {role === 'admin' && <div className="flex justify-end mb-6">
          <Link to="/admin/addMedicine"
            onClick={clearFilters}
            className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded hover:bg-blue-600"
          >
            Add Medicines
          </Link>
        </div>}
        <div className="flex justify-end mb-6">
          <button
            onClick={clearFilters}
            className="bg-red-500 text-white font-bold py-2 px-4 mt-4 rounded hover:bg-red-600"
          >
            Clear Filters
          </button>
        </div>

      </div>

      <div className="flex flex-wrap">
        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine: any) => (
            <MedicineCard
              key={medicine._id}
              medicine={medicine}
              type="notCart"
              price={medicine.price}
              quantity={
                cartItems.find((cartItem: any) => medicine._id === cartItem.item._id)
                  ? cartItems.find((cartItem: any) => medicine._id === cartItem.item._id).quantity
                  : 0
              }
            />
          ))
        ) : (
          <p className="text-gray-600 text-lg">No medicines found.</p>
        )}
      </div>
    </section>
  );
};

export default Medicine;
