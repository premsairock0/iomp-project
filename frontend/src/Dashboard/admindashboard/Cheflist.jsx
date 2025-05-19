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
        const response = await fetch('http://localhost:3000/api/dashadmin/chefs', {
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
    <div className="p-6">
      {loading ? (
        <p>Loading chefs...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid gap-4">
          {chefs.length === 0 ? (
            <p>No chefs found.</p>
          ) : (
            chefs.map((chef) => (
              <div
                key={chef._id}
                className="bg-white p-4 rounded shadow-md"
              >
                {console.log(chef)}
                <p><strong>ID:</strong> {chef._id}</p>
                <p><strong>Chef Name:</strong> {chef.chef_name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Chef;
