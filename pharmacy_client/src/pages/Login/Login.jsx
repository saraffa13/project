
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { notify } from '../../utils/helper';
import { login } from '../../store/slicers/authSlicer';
import useLocalStorage from '../../hooks/useLocalStorage';

let baseURL = import.meta.env.VITE_BASE_URL;

export const Login = () => {

    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const apiLogin = async (values) => {
        try {
            const response = await axios.post(`${baseURL}/user/login`, {
                email: values.email,
                password: values.password,
            });
            console.log(response.data);
            setLoggedIn(true);
            return response.data;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    };

    const formSubmitHandler = async (values, { setSubmitting, resetForm }) => {
        console.log(values);
        try {
            await apiLogin(values);
            dispatch(login({
                email: values.email,
                password: values.password
            }));
            navigate('/');
            notify('Login Successful!');
        } catch (error) {
            console.log(error);
            notify(error?.response?.data?.message);
        } finally {
            setSubmitting(false);
            resetForm();
        }
    };

    const validateForm = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }

        if (!values.password) {
            errors.password = "Required";
        }

        return errors;
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
                    Login to your account
                </h1>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={formSubmitHandler}
                    validate={validateForm}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email Address
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-sm text-red-600 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-sm text-red-600 mt-1"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                                <Link to="/signup" className="w-full flex justify-center mt-4 py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-indigo-600 dark:hover:text-white">
                                    Signup
                                </Link>
                            </div>

                            <div className="text-center mt-4">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
