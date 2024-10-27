import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import axios from 'axios';
import { notify } from '../../utils/helper';
import { useNavigate, useParams } from 'react-router-dom';

let baseURL = import.meta.env.VITE_BASE_URL;

interface FormValues {
    newPassword: string;
    confirmPassword: string;
}

const ChangePassword = () => {
    const initialValues: FormValues = { newPassword: '', confirmPassword: '' };

    const navigate = useNavigate();

    const { confirmationToken } = useParams();
    console.log(confirmationToken);

    const validateForm = (values: FormValues) => {
        const errors: Partial<FormValues> = {};

        if (!values.newPassword) {
            errors.newPassword = 'New password is required';
        } else if (values.newPassword.length < 6) {
            errors.newPassword = 'New password must be at least 6 characters long';
        }

        if (!values.confirmPassword) {
            errors.confirmPassword = 'Please confirm your new password';
        } else if (values.confirmPassword !== values.newPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        try {
            const response = await axios.post(`${baseURL}/user/change-password`, {
                newPassword: values.newPassword,
                confirmationToken,
            });
            notify("Password changed successfully!");
            navigate('/login')
            resetForm();
        } catch (error) {
            console.error("Error changing password:", error);
            notify("An error occurred while changing the password.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
                    Change Password
                </h1>
                <Formik
                    initialValues={initialValues}
                    validate={validateForm}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    New Password
                                </label>
                                <Field
                                    type="password"
                                    name="newPassword"
                                    placeholder="Enter new password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                />
                                <ErrorMessage
                                    name="newPassword"
                                    component="div"
                                    className="text-sm text-red-600 mt-1"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Confirm New Password
                                </label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm new password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
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
                                    {isSubmitting ? "Changing..." : "Change Password"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ChangePassword;
