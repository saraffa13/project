import { Link } from 'react-router-dom';

const NeedToLogin = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-white animate-bounce">Please Login</h1>
        <p className="text-2xl font-semibold text-white mt-4">Authentication Required</p>
        <p className="text-lg text-white mt-2">
          You need to be logged in to access this page.
        </p>
        <Link to="/login" className="mt-8 inline-block px-6 py-3 bg-white text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition duration-300">
          Go to Login Page
        </Link>
      </div>
    </div>
  );
};

export default NeedToLogin;
