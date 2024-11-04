import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white animate-bounce">404</h1>
        <p className="text-2xl font-semibold text-white mt-4">Page Not Found</p>
        <p className="text-lg text-white mt-2">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="mt-8 inline-block px-6 py-3 bg-white text-purple-500 font-semibold rounded-lg shadow-md hover:bg-purple-500 hover:text-white transition duration-300">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
