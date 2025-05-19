import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Adminstudent() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('Authorization');

      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/admin/students', {
          method: 'GET',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || 'Failed to fetch students');
        } else {
          setStudents(data.students);
        }
      } catch (err) {
        setError('Something went wrong');
        console.error('Fetch error:', err);
      }

      setLoading(false);
    };

    fetchStudents();
  }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('Authorization');
//     navigate('/'); // Adjust this path based on your route setup
//   };

  return (
    <div className="p-6">
      {/* <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div> */}

      {loading ? (
        <p>Loading students...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid gap-4">
          {students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            students.map((student) => (
              <div
                key={student._id}
                className="bg-white p-4 rounded shadow-md"
              >
                <p><strong>ID:</strong> {student._id}</p>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Email:</strong> {student.email}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Adminstudent;
