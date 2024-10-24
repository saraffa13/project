import axios from 'axios';
import React, { useState } from 'react';
import { notify, notifyError } from '../utils/helper';
import { useNavigate } from 'react-router-dom';

let baseURL = import.meta.env.VITE_BASE_URL;

interface MedicineFormData {
  name: string;
  composition: string;
  price: number;
  priceOff: number; // Added priceOff field
  category: string;
  image_url: File | null;
  exp_date: string;
  inventory_quantity: number;
}

const MedicineForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<MedicineFormData>({
    name: '',
    composition: '',
    price: 0,
    priceOff: 0, // Initialize priceOff
    category: '',
    image_url: null,
    exp_date: '',
    inventory_quantity: 0
  });

  // Handling input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === 'image_url' && files && files.length > 0) {
      setFormData({ ...formData, image_url: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare form data for multipart upload
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('composition', formData.composition);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('priceOff', formData.priceOff.toString()); // Append priceOff
    formDataToSend.append('category', formData.category);
    formDataToSend.append('exp_date', formData.exp_date);
    formDataToSend.append('inventory_quantity', formData.inventory_quantity.toString());
    
    if (formData.image_url) {
      formDataToSend.append('image_url', formData.image_url);
    }

    try {
      await axios.post(`${baseURL}/medicine/create-medicine`, formDataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      notify('Added Successfully!');
    } catch (error) {
      console.error('Error:', error);
      notifyError("Something went wrong! Can't add the medicine.");
      throw error;
    } finally {
      navigate('/medicines');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center p-8 transition-colors duration-500">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-10 max-w-lg w-full space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">Add New Medicine</h2>

        <div>
          <label htmlFor="name" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Medicine Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="composition" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Composition:</label>
          <textarea
            id="composition"
            name="composition"
            value={formData.composition}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="priceOff" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Discount Price (Price Off):</label>
          <input
            type="number"
            id="priceOff"
            name="priceOff"
            value={formData.priceOff}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="image_url" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Image URL:</label>
          <input
            type="file"
            id="image_url"
            name="image_url"
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="exp_date" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Expiry Date:</label>
          <input
            type="date"
            id="exp_date"
            name="exp_date"
            value={formData.exp_date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label htmlFor="inventory_quantity" className="block text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Inventory Quantity:</label>
          <input
            type="number"
            id="inventory_quantity"
            name="inventory_quantity"
            value={formData.inventory_quantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-transform transform hover:scale-105 duration-300 font-semibold"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default MedicineForm;
