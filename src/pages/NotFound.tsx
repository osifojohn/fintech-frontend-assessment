import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-6xl font-extrabold text-red-500">404</h1>
        <p className="text-xl font-semibold text-gray-700 mb-4">
          Oops! Page not found.
        </p>
        <p className="text-gray-500 mb-6">
          The page you're looking for might have been moved or deleted.
        </p>
        <div>
          <button
            onClick={handleGoToDashboard}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
