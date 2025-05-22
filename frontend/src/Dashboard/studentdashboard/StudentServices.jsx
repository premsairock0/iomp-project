import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentServices() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        if (!token) {
          setError('You must be logged in to view services.');
          return;
        }

        const res = await axios.get('http://localhost:3000/api/dashstudent/services', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setServices(res.data.services);
        setError(null);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized access. Please log in again.');
          // Optionally, redirect to login page:
          // navigate('/login');
        } else {
          setError('Failed to fetch services.');
        }
        console.error('Error fetching services:', err);
      }
    };

    fetchServices();
  }, [navigate]);

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Available Services</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-200 text-red-800 rounded">{error}</div>
      )}

      {!error && services.length === 0 && (
        <p>No services available at the moment.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
            onClick={() => navigate(`/student/dashboard/services/${service._id}`)}
          >
            <img
              src={service.mainimageUrl}
              alt={service.imgtitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{service.servicetitle}</h2>
              <p className="text-gray-600">{service.imgtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentServices;
