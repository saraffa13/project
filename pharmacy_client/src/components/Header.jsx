import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode, MdShoppingCart } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage, logout } from "../store/slicers/authSlicer";
import { clearCart } from "../store/slicers/cartSlicer";
import { IoIosNotifications } from "react-icons/io";

axios.defaults.withCredentials = true;
let baseURL = import.meta.env.VITE_BASE_URL;


const Header = () => {

    const [numberOfUnReadNotifications, setNumberOfReadNotifications] = useState(0);
    const [darkMode, setDarkMode] = useLocalStorage('dark', false);

    const { loggedIn, role: admin, notification } = useSelector((state) => state.auth);

    useEffect(() => {
        let count = 0;
        notification.forEach((notify) => {
            if (notify.read === false) {
                count++;
            }
        })
        setNumberOfReadNotifications(count);
    }, [notification])

    const { cartItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const response = await axios.get(`${baseURL}/user/logout`, { withCredentials: true });
            localStorage.setItem('loggedIn', 'false')
            navigate('/login');
            dispatch(logout());
            dispatch(clearCart());
            return response.data;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

   
    return (
        <div className="shadow-lg dark:border-b sticky top-0 z-50">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://images.vexels.com/content/136559/preview/pharmacy-logo-2cb66c.png" className="h-16" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MediMart</span>
                    </Link>
                    <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse gap-5  ">

                        <button
                            onClick={toggleDarkMode}
                            className="inline-flex items-center justify-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700">
                            {darkMode ? (
                                <CiLight className="text-white" />
                            ) : (
                                <MdDarkMode />
                            )}
                        </button>
                        <div className="relative">
                            <Link to="/notification" >
                                <IoIosNotifications className="dark:text-white text-3xl" />
                                {numberOfUnReadNotifications > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                        {numberOfUnReadNotifications}
                                    </span>
                                )}

                            </Link>
                        </div>

                        {loggedIn && admin === 'user' && (
                            <div className="relative">
                                <Link to="/cart" >
                                    <MdShoppingCart className="dark:text-white text-3xl" />
                                    {cartItems.length > 0 && (
                                        <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                            {cartItems.length}
                                        </span>
                                    )}

                                </Link>
                            </div>
                        )}

                        {(admin !== 'user') && <Link to="/admin" className="w-full flex justify-center mt-4 py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white">
                            Admin
                        </Link>}

                        {loggedIn ? (
                            <button onClick={logoutHandler} className="w-full flex justify-center mt-4 py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white">
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="w-full flex justify-center mt-4 py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white">
                                Login
                            </Link>
                        )}


                    </div>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
                        <ul className="flex flex-col font-bold p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ">
                            <li>
                                <Link to="/" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
                            </li>
                            <li>
                                <Link to="/medicines" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Medicines</Link>
                            </li>
                            {admin === 'user' && <li>
                                <Link to="/contact" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
                            </li>}
                            {loggedIn && <li>
                                <Link to={`${admin === 'user' ? '/orders' : '/admin/orders'}`} className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Orders</Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
