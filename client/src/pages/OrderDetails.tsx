// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    FaCalendarAlt,
    FaBoxOpen,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaDollarSign,
} from "react-icons/fa";
import { changeStatusOfOrder } from "../store/slicers/cartSlicer";


let baseURL = import.meta.env.VITE_BASE_URL;

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState<any>(null);
    const [status, setStatus] = useState("");

    const { orders } = useSelector((state: any) => state.cart);
    const { role } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const getOrder = orders.find((order: any) => order._id === orderId);
        if (getOrder) {
            setOrder(getOrder);
            setStatus(getOrder.status);
        }
    }, [orderId, orders]);

    const handleStatusChange = async () => {
        try {
            await axios.post(`${baseURL}order/change-status`, { orderId, status, });
            dispatch(changeStatusOfOrder({ orderId, status }));
            navigate("/admin/orders")
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    if (!order) return <p>Loading order details...</p>;

    return (
        <section className="p-8 bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
            <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-gray-100">
                Order Details
            </h1>
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="mb-6 space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
                        <FaBoxOpen className="mr-2" />
                        Order ID: {order._id}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p className="text-gray-600 dark:text-gray-400 flex items-center">
                            <FaUser className="mr-2 text-blue-500" /> Name:{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100 ml-1">{order.name}</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center">
                            <FaEnvelope className="mr-2 text-blue-500" /> Email:{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100 ml-1">{order.email}</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center">
                            <FaPhone className="mr-2 text-green-500" /> Phone:{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100 ml-1">{order.phone}</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-red-500" /> Address:{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100 ml-1">{order.address}</span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center">
                            <FaCalendarAlt className="mr-2 text-blue-500" /> Delivery Date:{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100 ml-1">
                                {new Date(order.deliveryDate).toLocaleDateString()}
                            </span>
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 flex items-center">
                            <FaDollarSign className="mr-2 text-green-500" /> Total Price:{" "}
                            <span className="font-medium text-gray-900 dark:text-gray-100 ml-1">
                                ${order.orders.totalPrice.toFixed(2)}
                            </span>
                        </p>
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                    Cart Items
                </h3>
                <div className="space-y-4">
                    {order.orders.cartItems.map((item: any) => (
                        <div key={item._id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-md">
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {item.name} - Quantity: {item.quantity}
                            </p>
                        </div>
                    ))}
                </div>

                {role !== 'user' && <div className="mt-8 flex items-center space-x-4">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="p-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-200"
                    >
                        <option value="pending">Pending</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                        onClick={handleStatusChange}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 shadow-lg"
                    >
                        Update Status
                    </button>
                </div>}
            </div>
        </section>
    );
};

export default OrderDetails;
