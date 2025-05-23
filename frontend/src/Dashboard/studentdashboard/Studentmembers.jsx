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
            Authorization: token,
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
    <div className="p-8 min-h-screen bg-gray-50 mt-16">
      <h1 className="text-3xl font-semibold text-gray-800 mb-10 text-center">
        College Committee Members
      </h1>

      {loading ? (
        <p className="text-gray-600 text-center">Loading members...</p>
      ) : error ? (
        <p className="text-red-600 text-center font-medium">{error}</p>
      ) : members.length === 0 ? (
        <p className="text-gray-600 text-center">No members found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, index) => (
            <div
              key={member._id}
              className="bg-white rounded-xl shadow-md border border-gray-200
                         hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300"
              style={{ animationDelay: `${index * 100}ms`, height: '300px' }}
            >
              <div className="h-44 overflow-hidden rounded-t-xl">
                <img
                  src={member.image || 'https://via.placeholder.com/300'}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-1">{member.name}</h2>
                <p className="text-sm text-gray-500">{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.5s ease forwards;
          }
        `}
      </style>
    </div>
  );
}

export default Studentmembers;
