import { useState } from "react";
import AdminOrders from "./AdminOrders";
import UsersList from "./AdminUsers";
import MedicineSalesCharts from "./MedicinesSalesChart";

const Admin = () => {
    const [activeSection, setActiveSection] = useState("orders");

    const renderContent = () => {
        switch (activeSection) {
            case "orders":
                return <div className="p-4"><AdminOrders /></div>;
            case "users":
                return <div className="p-4"><UsersList /></div>;
            case "sales":
                return <div className="p-4"><MedicineSalesCharts /></div>;
            default:
                return <div className="p-4">Select a section</div>;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100 text-black dark:bg-gray-900 dark:text-white">
            <div className="fixed top-24 left-0 w-1/5 h-full bg-gray-200 text-black dark:bg-gray-800 dark:text-white flex flex-col space-y-4 p-6">
                <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
                
                <button
                    onClick={() => setActiveSection("orders")}
                    className={`p-3 text-left rounded-lg ${
                        activeSection === "orders"
                            ? "bg-gray-500 dark:bg-gray-700"
                            : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                    }`}
                >
                    Orders
                </button>
                <button
                    onClick={() => setActiveSection("users")}
                    className={`p-3 text-left rounded-lg ${
                        activeSection === "users"
                            ? "bg-gray-500 dark:bg-gray-700"
                            : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                    }`}
                >
                    Users
                </button>
                <button
                    onClick={() => setActiveSection("sales")}
                    className={`p-3 text-left rounded-lg ${
                        activeSection === "sales"
                            ? "bg-gray-500 dark:bg-gray-700"
                            : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                    }`}
                >
                    Sales
                </button>
            </div>

            <div className="flex-1 ml-[20%] p-6 overflow-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default Admin;
