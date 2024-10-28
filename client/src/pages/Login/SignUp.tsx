import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { notify, notifyError } from '../../utils/helper';

let baseURL = import.meta.env.VITE_BASE_URL;

export const SignUp = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    interface FormValues {
        name: string;
        gender: string;
        email: string;
        password: string;
        role: string;
        phoneNumber: string;
    }

    const signUp = async (values: FormValues) => {
        try {
            const response = await axios.post(`${baseURL}/user/register`, {
                name: values.name,
                gender: values.gender,
                email: values.email,
                password: values.password,
                phoneNumber: values.phoneNumber,
                role: values.role,
            });
            return response.data;
        } catch (error) {
            console.error("Error during sign up:", error);
            throw error;
        }
    };

    const formSubmitHandler = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        try {
            await signUp(values);
            notify('Signup Successful! Please check your email to confirm your account!')
            navigate('/login')
        } catch (error:any) {
            notify("Something went wrong")
            console.log('Something went wrong');
        } finally {
            setSubmitting(false);
            resetForm();
        }
    };

    const validateForm = (values: FormValues) => {
        const errors: Partial<Record<keyof FormValues, string>> = {};

        if (!values.name) {
            errors.name = "Required";
        }

        if (!values.gender) {
            errors.gender = "Required";
        }

        if (!values.email) {
            errors.email = "Required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }

        if (!values.password) {
            errors.password = "Required";
        }
         else if (values.password.length < 6) {
            errors.password = "Password must contain at least 6 characters";
        }
        

        if (!values.role) {
            errors.role = "Required";
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = "Required";
        } else if (!/^\d{10}$/.test(values.phoneNumber)) {
            errors.phoneNumber = "Invalid phone number";
        }

        return errors;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Register a new account
                </h1>
                <Formik
                    initialValues={{ name: "", gender: "", email: "", password: "", role: "", phoneNumber: "" }}
                    onSubmit={formSubmitHandler}
                    validate={validateForm}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-sm text-red-600 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                    Gender
                                </label>
                                <div className="mt-1">
                                    <label className="inline-flex items-center mr-4">
                                        <Field
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">Male</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <Field
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">Female</span>
                                    </label>
                                </div>
                                <ErrorMessage
                                    name="gender"
                                    component="div"
                                    className="text-sm text-red-600 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                    Role
                                </label>
                                <div className="mt-1">
                                    <label className="inline-flex items-center mr-4">
                                        <Field
                                            type="radio"
                                            name="role"
                                            value="admin"
                                            className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">Admin</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <Field
                                            type="radio"
                                            name="role"
                                            value="user"
                                            className="form-radio h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">User</span>
                                    </label>
                                </div>
                                <ErrorMessage
                                    name="role"
                                    component="div"
                                    className="text-sm text-red-600 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter email address"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-sm text-red-600 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <Field
                                    type="text"
                                    name="phoneNumber"
                                    placeholder="Enter your phone number"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                                <ErrorMessage
                                    name="phoneNumber"
                                    component="div"
                                    className="text-sm text-red-600 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                                <Link to="/login" className="w-full flex justify-center mt-4 py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Login
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignUp;
