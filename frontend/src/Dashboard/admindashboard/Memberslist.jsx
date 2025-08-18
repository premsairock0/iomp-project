import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Members() {
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
        const response = await fetch('https://jntuh-hostel-management.onrender.com/api/dashadmin/members', {
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
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen ml-0 mt-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-wide">
        Hostel Committee Members
      </h1>

      {loading ? (
        <p className="text-gray-600 text-center">Loading members...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold text-center">{error}</p>
      ) : members.length === 0 ? (
        <p className="text-gray-600 text-center">No members found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {members.map((member) => (
            <div
              key={member._id}
              className="bg-white rounded-3xl shadow-md border border-gray-300
                         transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-400/40
                         cursor-pointer flex flex-col overflow-hidden"
            >
              <div className="overflow-hidden h-64 rounded-t-3xl">
                <img
                  src={member.image || 'https://via.placeholder.com/300'}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110 hover:rotate-1"
                />
              </div>
              <div className="p-6 text-center">
                <h2 className="text-xl font-extrabold text-indigo-700 uppercase mb-2 tracking-wide leading-tight">
                  {member.name}
                </h2>
                <p className="text-sm text-indigo-400 italic">{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Members;
