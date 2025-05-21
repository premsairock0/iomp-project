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
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen ml-[0px] mt-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Hostel Committee Members</h1>

      {loading ? (
        <p className="text-gray-600">Loading members...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold">{error}</p>
      ) : members.length === 0 ? (
        <p className="text-gray-600">No members found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {members.map((member, index) => (
            <div
              key={member._id}
              className="bg-white rounded-2xl shadow-lg border border-gray-300
                         transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-400/50
                         cursor-pointer flex flex-col overflow-hidden animate-fadeInUp"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="overflow-hidden h-64">
                <img
                  src={member.image || 'https://via.placeholder.com/300'}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110 hover:rotate-1"
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold text-gray-800 mb-1">{member.name}</h2>
                <p className="text-sm text-gray-600">{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Animation styles */}
      <style>
        {`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease forwards;
          }
        `}
      </style>
    </div>
  );
}

export default Studentmembers;
