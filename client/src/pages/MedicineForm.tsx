import axios from 'axios';
import React, { useState } from 'react';
import { notify, notifyError } from '../utils/helper';
let baseURL = import.meta.env.VITE_BASE_URL;


interface MedicineFormProps {
  onSubmit: (data: MedicineFormData) => void;
}

interface MedicineFormData {
  name: string;
  composition: string;
  price: number;
  category: string;
  image_url: string;
  exp_date: string;
  inventory_quantity: number;
}

const MedicineForm: React.FC<MedicineFormProps> = () => {
  const [formData, setFormData] = useState<MedicineFormData>({
    name: '',
    composition: '',
    price: 0,
    category: '',
    image_url: '',
    exp_date: '',
    inventory_quantity: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newFormData = [];
    newFormData.push(formData)
    try {
      const response = await axios.post(`${baseURL}/medicine/create-medicine`, {
        medicineList:newFormData
      }, {withCredentials:true});
      notify("Added Successfully!");
    } catch (error) {
      console.error("Error:", error);
      notifyError("Something went Wrong! Can't add the medicine")
      throw error;
    }

    // console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black dark:text-white p-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium mb-2">Medicine Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded bg-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="composition" className="block font-medium mb-2">Composition:</label>
          <textarea
            id="composition"
            name="composition"
            value={formData.composition}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded bg-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium mb-2">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded bg-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium mb-2">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded bg-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="image_url" className="block font-medium mb-2">Image URL:</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full p-3 border rounded bg-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="exp_date" className="block font-medium mb-2">Expiry Date:</label>
          <input
            type="date"
            id="exp_date"
            name="exp_date"
            value={formData.exp_date}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded bg-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label htmlFor="inventory_quantity" className="block font-medium mb-2">Inventory Quantity:</label>
          <input
            type="number"
            id="inventory_quantity"
            name="inventory_quantity"
            value={formData.inventory_quantity}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded bg-gray-200 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Add Medicine
        </button>
      </form>
    </div>
  );
};

export default MedicineForm;
