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
        const response = await fetch('http://localhost:3000/api/admin/wardens', {
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

  // const handleLogout = () => {
  //   localStorage.removeItem('Authorization');
  //   navigate('/');
  // };

  return (
    <div className="p-6">
      {/* <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Warden Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div> */}

      {loading ? (
        <p>Loading wardens...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid gap-4">
          {wardens.length === 0 ? (
            <p>No wardens found.</p>
          ) : (
            wardens.map((warden) => (
              <div
                key={warden._id}
                className="bg-white p-4 rounded shadow-md"
              >
               {console.log(warden)} 
                <p><strong>ID:</strong> {warden._id}</p>
                <p><strong>Warden_name:</strong> {warden.warden_name}</p>
              </div>
            ))
            
          )}
        </div>
      )}
    </div>
  );
}

export default Warden;
