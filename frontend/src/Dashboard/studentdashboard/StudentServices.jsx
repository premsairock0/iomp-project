
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function StudentServices() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/dashstudent/services');
        setServices(res.data.services);
      } catch (err) {
        console.error('Error fetching services:', err);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Available Services</h1>
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
