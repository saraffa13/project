import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { notify, notifyError } from "../utils/helper";
import { GrFormSubtract } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { addToCart, deleteFromCart, updateQuantity } from "../store/slicers/cartSlicer";

let baseURL = import.meta.env.VITE_BASE_URL;

const MedicineDetail = () => {
    const dispatch = useDispatch();

    const { medicines } = useSelector((state) => state.medicine);
    const { role, loggedIn } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [medicine, setMedicine] = useState (null);
    const [quantity, setQuantity] = useState (0);

    useEffect(() => {
        const medicine = medicines?.find((medicine) => medicine._id === id);
        const medicineInCart = cartItems.find((item) => item.item._id === id);
        if (medicineInCart) setQuantity(medicineInCart.quantity);
        else setQuantity(0);
        setMedicine(medicine);
    }, [id, medicines, cartItems, quantity]);

    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState ({
        _id: medicine?._id || "",
        name: medicine?.name || "",
        composition: medicine?.composition || "",
        price: Number(medicine?.price) || 0,
        priceOff: Number(medicine?.priceOff) || 0,
        category: medicine?.category || "",
        inventory_quantity: Number(medicine?.inventory_quantity) || 0,
    });

    useEffect(() => {
        if (medicine) {
            setFormData({
                _id: medicine._id,
                name: medicine.name,
                composition: medicine.composition,
                price: Number(medicine.price),
                priceOff: Number(medicine.priceOff) || 0,
                category: medicine.category,
                inventory_quantity: Number(medicine.inventory_quantity),
            });
        }
    }, [medicine]);

    const handleEditClick = () => setIsEditing(true);

    const editMedicineHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${baseURL}/medicine/edit-medicine`, { medicine: formData }, { withCredentials: true });
            setIsEditing(false);
            notify("Edited Successfully!");
            navigate("/medicines");
        } catch (error) {
            console.error("Couldn't edit the medicine:", error);
            notifyError("Couldn't edit the medicine!");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "price" || name === "priceOff" || name === "inventory_quantity" ? Number(value) : value,
        });
    };

    const addMedicineToCart = async (medicineId, name, price) => {
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

    const updateQty = async (medicineId, type, price) => {
        if (type === 'increment') {
            if (quantity >= medicine.inventory_quantity) {
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

    const deleteMedicineFromCart = async (medicineId, price, quantity) => {
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

    const discountedPrice =
        formData.priceOff > 0 ? (formData.price - (formData.price * formData.priceOff) / 100).toFixed(2) : formData.price.toFixed(2);

    if (isLoading) return <div className="text-center text-gray-600">Loading...</div>;

    if (!medicine) return <div className="text-center text-gray-600">Medicine not found.</div>;

    return (
        <section className="container mx-auto p-8 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-lg relative">
            {medicine.priceOff > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm shadow-lg">
                    {formData.priceOff}% OFF
                </div>
            )}
            {!isEditing ? (
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white">
                            {medicine.name}
                        </h2>
                        {role !== "user" && (
                            <button
                                onClick={handleEditClick}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                Edit
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <img
                            src={medicine.image_url}
                            alt={medicine.name}
                            className="w-full h-72 object-cover rounded-lg shadow-lg"
                        />
                        <div className="flex flex-col space-y-4">
                            <p className="text-lg font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-800 px-2 py-1 rounded-md">
                                <strong>Composition:</strong> {medicine.composition}
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                <strong>Original Price:</strong> ${medicine.price}
                            </p>
                            {medicine.priceOff > 0 && (
                                <p className="text-lg text-red-500 dark:text-red-400 font-semibold">
                                    <strong>Discounted Price:</strong> ${discountedPrice}
                                </p>
                            )}
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                <strong>Category:</strong> {medicine.category}
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                <strong>Inventory:</strong> {medicine.inventory_quantity}
                            </p>
                            <p className="text-lg text-gray-700 dark:text-gray-300">
                                <strong>Expiration Date:</strong> {new Date(medicine.exp_date).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                    {loggedIn && role === 'user' && medicine.inventory_quantity > 0 && quantity === 0 && (
                        <button
                            onClick={(e) => addMedicineToCart(medicine._id, medicine.name, discountedPrice)}
                            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-3 mt-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                        >
                            Add to Cart
                        </button>
                    )}
                    {loggedIn && quantity > 0 && (
                        <div className="flex items-center space-x-4 mt-6">
                            <div className="flex items-center bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-4 py-2 rounded-lg shadow-md">
                                <button
                                    disabled={quantity <= 1}
                                    onClick={() => updateQty(medicine._id, "decrement", discountedPrice)}
                                    className={`p-2 rounded-full ${quantity <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 dark:hover:bg-gray-600"} transition-colors duration-200`}
                                >
                                    <GrFormSubtract size={18} />
                                </button>
                                <span className="mx-3 text-xl font-semibold">{quantity}</span>
                                <button
                                    onClick={() => updateQty(medicine._id, "increment", discountedPrice)}
                                    className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    <IoMdAdd size={18} />
                                </button>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteMedicineFromCart(medicine._id, discountedPrice, quantity);
                                }}
                                className="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200"
                            >
                                <AiFillDelete size={20} />
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <form
                    onSubmit={editMedicineHandler}
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-4xl mx-auto mt-8"
                >
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
                        Edit Medicine Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                Name:
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                Composition:
                            </label>
                            <input
                                type="text"
                                name="composition"
                                value={formData.composition}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                Price:
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                Discount %:
                            </label>
                            <input
                                type="number"
                                name="priceOff"
                                value={formData.priceOff}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                Category:
                            </label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                Inventory Quantity:
                            </label>
                            <input
                                type="number"
                                name="inventory_quantity"
                                value={formData.inventory_quantity}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300 w-full mt-4 shadow-lg"
                    >
                        Save Changes
                    </button>
                </form>
            )}
        </section>
    );
};

export default MedicineDetail;
