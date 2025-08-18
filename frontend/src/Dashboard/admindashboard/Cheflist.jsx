import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Chef() {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChefs = async () => {
      const token = localStorage.getItem('Authorization');

      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://jntuh-hostel-management.onrender.com/api/dashadmin/chefs', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Failed to fetch chefs');
        } else {
          setChefs(data.chefs);
        }
      } catch (err) {
        setError('Something went wrong');
        console.error('Fetch error:', err);
      }

      setLoading(false);
    };

    fetchChefs();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Chef List
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading chefs...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-medium">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {chefs.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No chefs found.</p>
          ) : (
            chefs.map((chef) => (
              <div
                key={chef._id}
                className="bg-white rounded-xl shadow-sm p-4 border hover:shadow-lg transition duration-200"
              >
                <h4 className="text-lg font-bold text-green-700 mb-2">
                  {chef.chef_name}
                </h4>
                <p className="text-sm text-gray-700"><strong>ID:</strong> {chef._id}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Chef;
