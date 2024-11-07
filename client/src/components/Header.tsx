// @ts-nocheck
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
import { HiMenu, HiX } from "react-icons/hi";

axios.defaults.withCredentials = true;
let baseURL = import.meta.env.VITE_BASE_URL;

const Header = () => {
    const [numberOfUnReadNotifications, setNumberOfReadNotifications] = useState(0);
    const [darkMode, setDarkMode] = useLocalStorage<boolean>('dark', false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { loggedIn, languageKeyWords, language, role: admin, notification } = useSelector((state: any) => state.auth);
    const { cartItems } = useSelector((state: any) => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let count = 0;
        notification.forEach((notify: any) => {
            if (notify.read === false) {
                count++;
            }
        });
        setNumberOfReadNotifications(count);
    }, [notification]);

    const logoutHandler = async () => {
        try {
            const response = await axios.get(`${baseURL}/user/logout`, { withCredentials: true });
            localStorage.setItem('loggedIn', 'false');
            navigate('/login');
            dispatch(logout());
            dispatch(clearCart());
            return response.data;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const languageChangeHandler = async (language: string) => {
        dispatch(changeLanguage(language));
        localStorage.setItem('language', language);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="shadow-lg dark:border-b sticky top-0 z-50">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://images.vexels.com/content/136559/preview/pharmacy-logo-2cb66c.png" className="h-16" alt="Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MediMart</span>
                    </Link>

                    <div className="hidden md:flex space-x-8 font-bold text-gray-900 dark:text-white">
                        <Link to="/" className="hover:text-blue-700 dark:hover:text-blue-500">Home</Link>
                        <Link to="/about" className="hover:text-blue-700 dark:hover:text-blue-500">About</Link>
                        <Link to="/medicines" className="hover:text-blue-700 dark:hover:text-blue-500">Medicines</Link>
                        {admin === 'user' && (
                            <Link to="/contact" className="hover:text-blue-700 dark:hover:text-blue-500">Contact</Link>
                        )}
                        {loggedIn && (
                            <Link to={`${admin === 'user' ? '/orders' : '/admin/orders'}`} className="hover:text-blue-700 dark:hover:text-blue-500">
                                Orders
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-lg"
                        aria-expanded={menuOpen}
                        aria-label="Toggle navigation menu"
                    >
                        {menuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
                    </button>

                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        <button onClick={toggleDarkMode} className="p-2 text-gray-500 dark:text-gray-400">
                            {darkMode ? <CiLight className="text-white" /> : <MdDarkMode />}
                        </button>

                        <div className="relative">
                            <Link to="/notification">
                                <IoIosNotifications className="text-3xl dark:text-white" />
                                {numberOfUnReadNotifications > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                        {numberOfUnReadNotifications}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {loggedIn && loggedIn === true && admin === 'user' && (
                            <div className="relative">
                                <Link to="/cart">
                                    <MdShoppingCart className="text-3xl dark:text-white" />
                                    {cartItems.length > 0 && (
                                        <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        )}

                        {admin !== 'user' && (
                            <Link to="/admin" className="py-2 px-4 border border-indigo-600 rounded-md text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                Admin
                            </Link>
                        )}

                        {loggedIn ? (
                            <button onClick={logoutHandler} className="py-2 px-4 border border-indigo-600 rounded-md text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="py-2 px-4 border border-indigo-600 rounded-md text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Overlay and Mobile Menu */}
                {menuOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
                )}
                <div className={`${menuOpen ? 'block' : 'hidden'} fixed top-0 right-0 left-0 p-4 bg-gray-50 dark:bg-gray-800 z-50 transition-all duration-300 ease-in-out md:hidden`}>
                    <ul className="flex flex-col space-y-4">
                        <li><Link to="/" className="block text-gray-900 dark:text-white">Home</Link></li>
                        <li><Link to="/about" className="block text-gray-900 dark:text-white">About</Link></li>
                        <li><Link to="/medicines" className="block text-gray-900 dark:text-white">Medicines</Link></li>
                        {admin === 'user' && <li><Link to="/contact" className="block text-gray-900 dark:text-white">Contact</Link></li>}
                        {loggedIn && <li><Link to={`${admin === 'user' ? '/orders' : '/admin/orders'}`} className="block text-gray-900 dark:text-white">Orders</Link></li>}
                        {/* Dark mode and Logout/Login buttons */}
                        <li className="flex items-center space-x-2">
                            <button onClick={toggleDarkMode} className="p-2 rounded-full text-gray-500 dark:text-gray-400">
                                {darkMode ? <CiLight className="text-white" /> : <MdDarkMode />}
                            </button>
                            {loggedIn ? (
                                <button onClick={logoutHandler} className="py-2 px-4 border border-indigo-600 rounded-md text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    Logout
                                </button>
                            ) : (
                                <Link to="/login" className="py-2 px-4 border border-indigo-600 rounded-md text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
