import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Admin Dashboard</h1>
            
            <div className="flex flex-col space-y-6">
                <Link to="/admin/orders" className="w-64 p-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700">
                    Orders
                </Link>

                <Link to="/admin/users" className="w-64 p-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700">
                    Users
                </Link>

                <Link to="/admin/sales" className="w-64 p-4 bg-red-500 text-white rounded-lg shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700">
                    Data
                </Link>
            </div>
        </div>
    );
};

export default Admin;
