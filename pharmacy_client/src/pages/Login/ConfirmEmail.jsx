import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { notify, notifyError } from "../../utils/helper";

let baseURL = import.meta.env.VITE_BASE_URL;

const ConfirmEmail = () => {

    const { token } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    useEffect(() => {
        const confirmEmail = async () => {
            try {
                const response = await axios.get(`${baseURL}/user/confirm-email/${token}`);
                notify(response.data.message || "Email confirmed successfully!");
                setError(false);
                setTimeout(() => navigate("/login"), 3000);
            } catch (err) {
                notifyError(err.response?.data.message || "Confirmation failed. The token may be invalid or expired.");
                setError(true);
            }
        };
        confirmEmail();
    }, [token, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-300 dark:from-gray-800 dark:to-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-md w-full p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Email Confirmation</h2>
                {error ? (
                    <button
                        onClick={() => navigate("/signup")}
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 text-white py-2 px-6 rounded transition duration-200"
                    >
                        Sign-up
                    </button>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Redirecting to login...</p>
                )}
            </div>
        </div>
    );
};

export default ConfirmEmail;
