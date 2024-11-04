import { Link } from 'react-router-dom';

const UnAuthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-red-500 to-orange-500">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white animate-bounce">403</h1>
        <p className="text-2xl font-semibold text-white mt-4">Unauthorized Access</p>
        <p className="text-lg text-white mt-2">
          You do not have permission to view this page.
        </p>
        <Link to="/" className="mt-8 inline-block px-6 py-3 bg-white text-red-500 font-semibold rounded-lg shadow-md hover:bg-red-500 hover:text-white transition duration-300">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default UnAuthorized;
