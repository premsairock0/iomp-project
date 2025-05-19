import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Studentmembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem('Authorization');

      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/dashstudent/members', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Failed to fetch members');
        } else {
          setMembers(data.members);
        }
      } catch (err) {
        setError('Something went wrong');
        console.error('Fetch error:', err);
      }

      setLoading(false);
    };

    fetchMembers();
  }, []);

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading members...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.length === 0 ? (
            <p>No members found.</p>
          ) : (
            members.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 text-center transition-all duration-200"
              >
                <img
                  src={member.image || 'https://via.placeholder.com/150'}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                />
                <h2 className="text-xl font-semibold text-blue-800">{member.name}</h2>
                <p className="text-gray-600">{member.designation}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Studentmembers;
