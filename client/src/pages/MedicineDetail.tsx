import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { notify, notifyError } from "../utils/helper";

let baseURL = import.meta.env.VITE_BASE_URL;

const MedicineDetail = () => {
    
  const { medicines } = useSelector((state: any) => state.medicine);
  const { role } = useSelector((state: any) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [medicine, setMedicine] = useState(() => {
    return medicines?.find((medicine: any) => medicine._id === id);
  });




  useEffect(() => {
    if (!medicine) {
      setIsLoading(true);
      axios
        .get(`${baseURL}/medicine/details/${id}`)
        .then((response) => {
          setMedicine(response.data);
        })
        .catch((error) => {
          console.error("Error fetching medicine:", error);
          notifyError("Failed to fetch medicine details.");
          navigate("/medicines");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id, medicine, navigate]);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const editMedicineHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${baseURL}/medicine/edit-medicine`,
        { medicine: formData },
        { withCredentials: true }
      );
      setIsEditing(false);
      notify("Edited Successfully!");
      navigate("/medicines");
    } catch (error) {
      console.error("Couldn't edit the medicine:", error);
      notifyError("Couldn't edit the medicine!");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price" || name === "priceOff" || name === "inventory_quantity"
          ? Number(value) 
          : value,
    });
  };

  
  const discountedPrice =
    formData.priceOff > 0
      ? (formData.price - (formData.price * formData.priceOff) / 100).toFixed(2)
      : formData.price.toFixed(2); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!medicine) {
    return <div>Medicine not found.</div>;
  }

  return (
    <section className="container mx-auto p-6">
      {!isEditing ? (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
              {medicine.name}
            </h2>
            {role === "admin" && (
              <button
                onClick={handleEditClick}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
              >
                Edit
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src={medicine.image_url}
              alt={medicine.name}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="flex flex-col justify-between">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Composition: </strong> {medicine.composition}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Original Price: </strong> ${medicine.price}
              </p>
              {medicine.priceOff > 0 && (
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  <strong>Discounted Price: </strong> ${discountedPrice}
                </p>
              )}
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Discounted % (Price Off): </strong>{" "}
                {medicine.priceOff || "N/A"}%
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Category: </strong> {medicine.category}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Inventory: </strong> {medicine.inventory_quantity}
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                <strong>Expiration Date: </strong> {new Date(medicine.exp_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={editMedicineHandler}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-4xl mx-auto"
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
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
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
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
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
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Discount Price (Price Off):
              </label>
              <input
                type="number"
                name="priceOff"
                value={formData.priceOff}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
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
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
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
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-gray-300 focus:ring focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300 w-full"
          >
            Save Changes
          </button>
        </form>
      )}
    </section>
  );
};

export default MedicineDetail;
