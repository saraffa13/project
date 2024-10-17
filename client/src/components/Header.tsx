import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { MdDarkMode, MdShoppingCart } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { changeLanguage, logout } from "../store/slicers/authSlicer";
import { getKeyWord } from "../utils/helper";


axios.defaults.withCredentials = true;
let baseURL = import.meta.env.VITE_BASE_URL;

const Header = () => {

    const [darkMode, setDarkMode] = useLocalStorage<boolean>('dark', false);
    const [signIn, setSignIn] = useLocalStorage<boolean>('loggedIn', false);


    const { loggedIn, languageKeyWords, language } = useSelector((state: any) => state.auth)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const response = await axios.get(`${baseURL}/user/logout`, { withCredentials: true });
            console.log(response.data);
            setSignIn(false);
            navigate('/login')
            dispatch(logout());
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
        document.documentElement.classList.toggle('dark', !darkMode);
    };
    const languageChangeHandler = async (language: string) => {
        dispatch(changeLanguage(language))
        await localStorage.setItem('language', language)
    };

    return (
        <div className="shadow-lg dark:border-b ">
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://images.vexels.com/content/136559/preview/pharmacy-logo-2cb66c.png" className="h-16" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MediMart</span>
                    </a>
                    <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse gap-5  ">

                        {/* Language Dropdown */}
                        {language === 'hindi' && <button onClick={() => languageChangeHandler('english')} type="button" data-dropdown-toggle="language-dropdown-menu" className=" inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg className="w-5 h-5 rounded-full me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3900 3900"><path fill="#b22234" d="M0 0h7410v3900H0z" /><path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" strokeWidth="300" /><path fill="#3c3b6e" d="M0 0h2964v2100H0z" /><g fill="#fff"> {/* Flag icons go here */} </g></svg>
                            English
                        </button>}
                        {language === 'english' && <button onClick={() => languageChangeHandler('hindi')} type="button" data-dropdown-toggle="language-dropdown-menu" className=" inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg className="w-5 h-5 rounded-full me-3" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
                                <rect width="600" height="400" fill="#FF9933" /> {/* Saffron */}
                                <rect width="600" height="133.33" y="133.33" fill="white" /> {/* White */}
                                <rect width="600" height="133.33" y="266.66" fill="#138808" /> {/* Green */}
                                <circle cx="300" cy="200" r="20" fill="#000080" /> {/* Center circle */}
                                <circle cx="300" cy="200" r="30" fill="none" stroke="#000080" strokeWidth="4" /> {/* Outer circle */}
                                <g fill="#000080">
                                    {/* Ashoka Chakra */}
                                    <path d="M300 170 L300 230 M300 230 L320 215 M300 230 L280 215 M300 230 L290 200 M300 230 L310 200" />
                                    <path d="M300 170 L300 230 M300 230 L320 215 M300 230 L280 215 M300 230 L290 200 M300 230 L310 200" />
                                    <path d="M300 170 L300 230 M300 230 L320 215 M300 230 L280 215 M300 230 L290 200 M300 230 L310 200" />
                                    <path d="M300 170 L300 230 M300 230 L320 215 M300 230 L280 215 M300 230 L290 200 M300 230 L310 200" />
                                    <path d="M300 170 L300 230 M300 230 L320 215 M300 230 L280 215 M300 230 L290 200 M300 230 L310 200" />
                                    <path d="M300 170 L300 230 M300 230 L320 215 M300 230 L280 215 M300 230 L290 200 M300 230 L310 200" />
                                </g>
                            </svg>
                            Hindi
                        </button>}



                        {/* Dark/Light Mode Toggle Button */}
                        <button
                            onClick={toggleDarkMode}
                            className="inline-flex items-center justify-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700">
                            {darkMode ? (
                                <CiLight className="text-white" />
                            ) : (
                                <MdDarkMode />
                            )}
                        </button>
                        
                        
                        
                        <Link to="/cart" >
                            <MdShoppingCart className="dark:text-white" />
                        </Link>



                        {loggedIn ?

                            <button onClick={logoutHandler} className="w-full flex justify-center mt-4 py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white">
                                {getKeyWord("APP_LOGOUT", languageKeyWords, language)}
                            </button>
                            :
                            <Link to="/login" className="w-full flex justify-center mt-4 py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white">
                                {getKeyWord("APP_LOGIN", languageKeyWords, language)}
                            </Link>
                        }



                        {/* Mobile Menu Toggle */}
                        <button data-collapse-toggle="navbar-language" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-language" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
                        <ul className="flex flex-col font-bold p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ">
                            <li>
                                <Link to="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">{getKeyWord("APP_HOME", languageKeyWords, language)}</Link>
                            </li>
                            <li>
                                <Link to="/about" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{getKeyWord("APP_ABOUT", languageKeyWords, language)}</Link>
                            </li>
                            <li>
                                <Link to="/medicines" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{getKeyWord("APP_MEDICINES", languageKeyWords, language)}</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{getKeyWord("APP_CONTACT", languageKeyWords, language)}</Link>
                            </li>
                            <li>
                                <Link to="/orders" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{getKeyWord("APP_ORDERS", languageKeyWords, language)}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;
