import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart, fetchOrders } from '../store/slicers/cartSlicer';
import { notify } from '../utils/helper';

let baseURL = import.meta.env.VITE_BASE_URL;

// Cart Item Component
const CartItem = ({ item }: any) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4">
      <div className="flex items-center space-x-4">
        <img
          src={item.item.image_url}
          alt={item.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
          <p className="text-gray-600">Composition: {item.item.composition}</p>
          <p className="text-gray-600">Price: ${item.item.price.toFixed(2)}</p>
          <p className="text-gray-600">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-gray-800 font-semibold">
          ${ (item.item.price * item.quantity).toFixed(2) }
        </p>
      </div>
    </div>
  );
};

// Order Summary Component
const OrderSummary = ({ cartItems, calculateTotalPrice, deliveryDate }: any) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Order Summary</h2>

      {/* Cart Items */}
      <div>
        {cartItems.map((item: any) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>

      {/* Total Price */}
      <div className="flex justify-between items-center border-t border-gray-200 mt-6 pt-4">
        <h3 className="text-xl font-semibold text-gray-700">Total Price:</h3>
        <p className="text-2xl font-bold text-gray-900">${calculateTotalPrice().toFixed(2)}</p>
      </div>

      {/* Delivery Date Notification */}
      <div className="mt-6 text-center text-gray-600">
        <p>Estimated Delivery: {deliveryDate}</p>
        <p>3 days from today!</p>
      </div>
    </div>
  );
};

// Checkout Form Component
const CheckoutForm = ({ handleSubmit, paymentMethod, setPaymentMethod, name, setName, email, setEmail, phone, setPhone, address, setAddress }: any) => {
  return (
    <form className="bg-white p-6 shadow-lg rounded-lg" onSubmit={handleSubmit}>
      {/* Payment Method Dropdown */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-semibold">Payment Method:</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="Credit Card" disabled>Credit Card</option>
          <option value="Debit Card" disabled>Debit Card</option>
          <option value="PayPal" disabled>PayPal</option>
          <option value="Net Banking" disabled>Net Banking</option>
        </select>
      </div>

      {/* User Details Form */}
      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-semibold">Name:</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-semibold">Email:</label>
        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-semibold">Phone:</label>
        <input
          type="tel"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-gray-700 font-semibold">Address:</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300 w-full"
      >
        Place Order
      </button>
    </form>
  );
};

// Main Checkout Component
const Checkout = () => {
  const { cartItems } = useSelector((state: any) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState('');

  // Calculate the delivery date (3 days from now)
  useEffect(() => {
    const estimatedDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString();
    setDeliveryDate(estimatedDate);
  }, []);

  // Check if cartItems is undefined or empty
  if (!cartItems || cartItems.length === 0) {
    return (
      <section className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h1>
        <p className="text-center text-gray-600">Your cart is empty.</p>
      </section>
    );
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total: number, item: any) => {
      return total + item.item.price * item.quantity;
    }, 0);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseURL}/order/post-order`, {
        name,
        email,
        phone,
        address,
        paymentMethod,
        deliveryDate  
      }, { withCredentials: true });
      navigate('/orders');
      dispatch(clearCart());
      dispatch(fetchOrders());
      notify('Order Placed Successfully');
    } catch (error) {
      console.error("Error during order submission:", error);
      throw error;
    }
  };

  return (
    <section className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <OrderSummary cartItems={cartItems} calculateTotalPrice={calculateTotalPrice} deliveryDate={deliveryDate} />

        {/* Checkout Form */}
        <CheckoutForm
          handleSubmit={handleSubmit}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          address={address}
          setAddress={setAddress}
        />
      </div>
    </section>
  );
};

export default Checkout;
