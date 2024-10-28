import axios from "axios";
import { useEffect } from "react";
import { GrFormSubtract } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, deleteFromCart, updateQuantity } from "../store/slicers/cartSlicer";
import { AiFillDelete } from "react-icons/ai";
import { notify, notifyError } from "../utils/helper";
import { deleteMedicine } from "../store/slicers/medicineSlicer";

let baseURL = import.meta.env.VITE_BASE_URL;

const MedicineCard = ({specialOffer, medicine, type, inventory_quantity, quantity, price, priceOff }: any) => {
	
	console.log(medicine);

	const dispatch = useDispatch();
	const { cartItems } = useSelector((state: any) => state.cart);
	const { loggedIn, role } = useSelector((state: any) => state.auth);


	const addMedicineToCart = async (medicineId: string, name: string, price: number) => {
		console.log(medicineId);
		try {
			await axios.post(
				`${baseURL}/cart/add-to-cart`,
				{ medicineId, name, price },
				{ withCredentials: true }
			);
			dispatch(addToCart({ medicine, price }));
		} catch (error) {
			notifyError("Failed to add medicine to cart");
		}
	};

	const updateQty = async (medicineId: string, type: string, price: number) => {
		if (type === 'increment') {
			if (quantity >= inventory_quantity) {
				notifyError("Maximum available stock reached. You cannot add more of this item.");
				return;
			}
		}
		try {
			await axios.post(
				`${baseURL}/cart/update-quantity`,
				{ medicineId, type, price },
				{ withCredentials: true }
			);
			dispatch(updateQuantity({ id: medicineId, type, price }));
		} catch (error) {
			notifyError("Failed to update quantity");
		}
	};

	const deleteMedicineFromCart = async (medicineId: string, price: number, quantity: number) => {
		try {
			await axios.post(`${baseURL}/cart/delete/`, {
				medicineId,
				price,
				quantity
			}, {
				withCredentials: true,
			});
			dispatch(deleteFromCart({ id: medicineId, price, quantity }));
		} catch (error) {
			notifyError("Failed to remove medicine from cart");
		}
	};

	const deleteMedicineFromDb = async (medicineId: string) => {
		console.log(medicineId);
		try {
			await axios.post(`${baseURL}/medicine/delete-medicine/`, {
				medicineId,
			}, {
				withCredentials: true,
			});
			dispatch(deleteMedicine({ medicineId }));
			notify("Deleted Successfully!")
		} catch (error) {
			notifyError("Failed to delete medicine");
		}
	};

	const displayedPrice = price || 0;
	const discountedPrice = priceOff > 0 ? (displayedPrice - (displayedPrice * priceOff / 100)).toFixed(2) : displayedPrice.toFixed(2);

	const totalDisplayedPrice = quantity > 0 ? (displayedPrice * quantity).toFixed(2) : displayedPrice.toFixed(2);
	const totalDiscountedPrice = quantity > 0 ? (discountedPrice * quantity).toFixed(2) : discountedPrice;

	return (
		<div className={`${type === "cart" ? "w-full" : "w-full"} sm:w-1/2 md:w-1/3 lg:w-1/4 p-4`}>
			<div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col relative">

				{priceOff > 0 && <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold shadow-lg z-10">
					{priceOff}% Off
				</span>}

				<Link to={(specialOffer===false )?`details/${medicine._id}`:`medicines/details/${medicine._id}`} className="relative">
					<img
						src={medicine.image_url}
						alt={medicine.name}
						className="w-full h-56 object-cover"
					/>
					<span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold shadow">
						{medicine.category}
					</span>
				</Link>

				<div className="p-6 flex flex-col justify-between flex-grow">
					<div>
						<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
							{medicine.name}
						</h2>
						<p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
							{medicine.composition || "No detailed description available"}
						</p>

						{loggedIn && role !== 'user' && (
							<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
								Inventory: <span className="font-semibold">{medicine.inventory_quantity}</span>
							</p>
						)}

						{loggedIn && role === 'user' && medicine.inventory_quantity === 0 && (
							<p className="mt-2 text-sm text-red-500 font-semibold">
								Out of Stock
							</p>
						)}
					</div>

					<div className="mt-6 flex justify-between items-center">
						<div>
							{priceOff > 0 && (
								<div className="text-lg text-gray-500 dark:text-gray-400 line-through">
									${totalDisplayedPrice}
								</div>
							)}
							<div className="text-xl font-bold text-blue-500 dark:text-blue-400">
								${totalDiscountedPrice}
							</div>
						</div>

						{specialOffer === false && loggedIn && role === 'user' && medicine.inventory_quantity > 0 && quantity === 0 && (
							<button
								onClick={(e) => {
									e.preventDefault();
									addMedicineToCart(medicine._id, medicine.name, discountedPrice);
								}}
								className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
							>
								Add to Cart
							</button>
						)}

						{specialOffer === false && loggedIn && quantity > 0 && (
							<div className="flex items-center space-x-2">
								<div className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md">
									<button
										disabled={quantity <= 1}
										onClick={() => updateQty(medicine._id, "decrement", discountedPrice)}
										className={`p-2 bg-gray-300 text-gray-700 rounded-full ${quantity <= 1
											? "opacity-50 cursor-not-allowed"
											: "hover:bg-gray-400"
											} transition-colors duration-200`}
									>
										<GrFormSubtract size={18} onClick={(e) => { e.preventDefault(); }} />
									</button>
									<span className="mx-3 text-lg">{quantity}</span>
									<button
										onClick={() => updateQty(medicine._id, "increment", discountedPrice)}
										className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors duration-200"
									>
										<IoMdAdd onClick={(e) => { e.preventDefault(); }} size={18} />
									</button>
								</div>

								<button
									onClick={(e) => {
										e.preventDefault();
										deleteMedicineFromCart(medicine._id, discountedPrice, quantity);
									}}
									className="p-2 bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200"
								>
									<AiFillDelete size={18} />
								</button>
							</div>
						)}

						{specialOffer === false && loggedIn && role !== 'user' && (
							<button
								onClick={(e) => {
									e.preventDefault();
									deleteMedicineFromDb(medicine._id);
								}}
								className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 ml-2"
							>
								Delete Medicine
							</button>
						)}

					</div>
				</div>
			</div>
		</div>
	);
};

export default MedicineCard;