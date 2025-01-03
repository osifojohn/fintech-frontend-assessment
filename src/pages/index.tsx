import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const targetUrl = '/dashboard';
  const delay = 2000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      navigate(targetUrl);
    }, delay);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetUrl, delay]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {loading ? (
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 rounded-full">
          <span className="sr-only">Loading...</span>
        </div>
      ) : null}
    </div>
  );
};

export default Landing;
