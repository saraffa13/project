import { Link } from "react-router-dom";

const MedicineCard = ({ medicine }: any) => {
    return (
      <Link to='' className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
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
              {medicine.composition || 'No detailed description available'}
            </p>
  
            <div className="mt-6 flex justify-between items-center">
              <span className="text-lg font-bold text-blue-500 dark:text-blue-400">
                ${medicine.price.toFixed(2)}
              </span>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link >
    );
  };
  
  export default MedicineCard;
  