import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Warden() {
  const [wardens, setWardens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWardens = async () => {
      const token = localStorage.getItem('Authorization');

      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://jntuh-hostel-management.onrender.com/api/admin/wardens', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Failed to fetch wardens');
        } else {
          setWardens(data.wardens);
        }
      } catch (err) {
        setError('Something went wrong');
        console.error('Fetch error:', err);
      }

      setLoading(false);
    };

    fetchWardens();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Warden List
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading wardens...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-medium">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wardens.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No wardens found.</p>
          ) : (
            wardens.map((warden) => (
              <div
                key={warden._id}
                className="bg-white rounded-xl shadow-sm p-4 border hover:shadow-lg transition duration-200"
              >
                <h4 className="text-lg font-bold text-blue-700 mb-2">
                  {warden.warden_name}
                </h4>
                <p className="text-sm text-gray-700"><strong>ID:</strong> {warden._id}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Warden;
