import axios from "axios";
import { useEffect } from "react";
import { GrFormSubtract } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, deleteFromCart, updateQuantity } from "../store/slicers/cartSlicer";
import { AiFillDelete } from "react-icons/ai";
import { notify } from "../utils/helper";

let baseURL = import.meta.env.VITE_BASE_URL;

const MedicineCard = ({ medicine, type, quantity }: any) => {
  const { cartItems } = useSelector((state: any) => state.cart);
  const { loggedIn } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const item = cartItems.find((item: any) => item.item === medicine._id);
    if (item) {
      console.log(item);
    }
  }, [cartItems, medicine._id]);

  const addMedicineToCart = async (medicineId: string, name: string) => {
    try {
      const response = await axios.post(
        `${baseURL}/cart/add-to-cart`,
        { medicineId, name },
        { withCredentials: true }
      );

      dispatch(addToCart({ medicine }));
    } catch (error) {
      alert("Failed to add medicine to cart");
    }
  };

  const updateQty = async (medicineId: string, type: string) => {
    try {
      const response = await axios.post(
        `${baseURL}/cart/update-quantity`,
        { medicineId, type },
        { withCredentials: true }
      );
      dispatch(updateQuantity({ id: medicineId, type }));
    } catch (error) {
      alert("Failed to update quantity");
    }
  };

  // Delete medicine from cart
  const deleteMedicine = async (medicineId: string) => {
    try {
      const response = await axios.post(`${baseURL}/cart/delete/`,{
        medicineId,
      }, {
        withCredentials: true,
      });
      dispatch(deleteFromCart({ id: medicineId }));
      notify('Item deleted Successfully');
    } catch (error) {
      alert("Failed to remove medicine from cart");
    }
  };

  return (
    <Link to="" className={`${type === "cart" ? "w-full" : "w-full"}  sm:w-1/2 md:w-1/3 lg:w-1/4 p-4`}>
      <div className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="relative">
          <img
            src={medicine.image_url}
            alt={medicine.name}
            className="w-full h-56 object-cover"
          />
          <span className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold shadow">
            {medicine.category}
          </span>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {medicine.name}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
            {medicine.composition || "No detailed description available"}
          </p>

          <div className="mt-6 flex justify-between items-center">
            <span className="text-lg font-bold text-blue-500 dark:text-blue-400">
              ${quantity > 0 ? quantity * medicine.price : medicine.price}
            </span>

            {loggedIn && quantity === 0 && (
              <button
                onClick={() => addMedicineToCart(medicine._id, medicine.name)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
              >
                Add to Cart
              </button>
            )}

            {loggedIn && quantity > 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-md">
                  <button
                    disabled={quantity <= 1}
                    onClick={() => updateQty(medicine._id, "decrement")}
                    className={`p-2 bg-gray-300 text-gray-700 rounded-full ${
                      quantity <= 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-400"
                    } transition-colors duration-200`}
                  >
                    <GrFormSubtract size={18} />
                  </button>
                  <span className="mx-3 text-lg">{quantity}</span>
                  <button
                    onClick={() => updateQty(medicine._id, "increment")}
                    className="p-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors duration-200"
                  >
                    <IoMdAdd size={18} />
                  </button>
                </div>

                {/* Styled Delete button */}
                <button
                  onClick={() => deleteMedicine(medicine._id)}
                  className="p-2 bg-transparent border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                  <AiFillDelete size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MedicineCard;
