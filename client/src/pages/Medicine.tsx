import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

import { fetchMedicines } from "../store/slicers/medicineSlicer";
import MedicineCard from "../components/MedicineCard";

const Medicine = () => {

	const { medicines } = useSelector((state: any) => state.medicine);
	const { cartItems } = useSelector((state: any) => state.cart);
	const { role } = useSelector((state: any) => state.auth);
	
	const params = useParams();
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<any>('All');
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMedicines());
	}, [dispatch]);
	
	
	useEffect(() => {
		if ('type' in params) {
			setSelectedCategory(params.type);
		}
	}, [])



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
		<section className="p-8 dark:bg-gray-900">
			<div className="flex gap-4 mb-6">
				<div className="w-1/2 ">
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Search medicines..."
						className=" dark:bg-gray-600 dark:text-white p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="w-1/2">
					<select
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
						className="dark:bg-gray-600 dark:text-white p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						{categories.map((category: any) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="flex justify-between">
				{role !== 'user' && <div className="flex justify-end mb-6">
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
							priceOff={medicine.priceOff}
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
