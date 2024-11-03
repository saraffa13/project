// @ts-nocheck
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import axios from 'axios';
import { notify } from '../../utils/helper';

let baseURL = import.meta.env.VITE_BASE_URL;

interface FormValues {
    email: string;
}

const ForgotPassword = () => {
    const initialValues: FormValues = { email: '' };

    const validateForm = (values: FormValues) => {
        const errors: Partial<FormValues> = {};
        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    };

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        try {
            const response = await axios.post(`${baseURL}/user/forgot-password`, {
                email: values.email,
            });
            notify("Password reset link sent to your email!");
            resetForm();
        } catch (error) {
            console.error("Error during password reset request:", error);
            notify("An error occurred while sending the reset link.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
                    Forgot Password
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                    Enter your email to receive a password reset link.
                </p>
                <Formik
                    initialValues={initialValues}
                    validate={validateForm}
                    onSubmit={handleSubmit}
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
                                    placeholder="Enter your email address"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                />
                                <ErrorMessage
                                    name="email"
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
                                    {isSubmitting ? "Sending..." : "Send"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgotPassword;
