import { useParams, useNavigate } from 'react-router-dom';

const MedicineDetails = ({ medicines }: any) => {
  const { id } = useParams(); 
  const medicine = medicines.find((med: any) => med.id === parseInt(id)); 
  const navigate = useNavigate(); 

  if (!medicine) {
    return <div>Medicine not found!</div>;
  }

  return (
    <div className="container mx-auto p-6">
     
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-6"
      >
        Go Back
      </button>

      <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        
        <div className="lg:w-1/2 p-6">
          <img
            src={medicine.image_url}
            alt={medicine.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        
        <div className="lg:w-1/2 p-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {medicine.name}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            {medicine.composition || 'No detailed composition available'}
          </p>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Usage: {medicine.usage || 'Not specified'}
          </p>

        
          <div className="mt-6">
            <span className="text-2xl font-bold text-blue-500 dark:text-blue-400">
              ${medicine.price.toFixed(2)}
            </span>
            <button className="ml-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
              Add to Cart
            </button>
          </div>

         
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              Other Information:
            </h3>
            <ul className="mt-2 text-gray-600 dark:text-gray-300">
              <li>Category: {medicine.category || 'General'}</li>
              <li>Manufacturer: {medicine.manufacturer || 'Not available'}</li>
              <li>Expiry Date: {medicine.expiry_date || 'Not specified'}</li>
              <li>Dosage: {medicine.dosage || 'Follow doctor’s instructions'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
