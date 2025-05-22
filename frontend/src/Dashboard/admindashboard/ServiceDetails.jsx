import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/dashadmin/services/${id}`);
        setService(res.data.service);
      } catch (err) {
        console.error('Error fetching service details:', err);
      }
    };
    fetchService();
  }, [id]);

  if (!service) return <div className="p-10">Loading...</div>;

  return (
  <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-indigo-600 hover:underline mb-6"
    >
      <ArrowLeft className="w-5 h-5" />
      Back
    </button>

    <div className="bg-white rounded-xl shadow-md max-w-2xl mx-auto overflow-hidden">
      <div className="w-full h-52 sm:h-60 overflow-hidden">
        <img
          src={service.mainimageUrl}
          alt={service.imgtitle}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-5">
        <h1 className="text-xl font-bold text-gray-800 mb-1">{service.servicetitle}</h1>
        <h2 className="text-md text-gray-600 mb-3">{service.imgtitle}</h2>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
          {service.description}
        </p>
      </div>
    </div>
  </div>
);
}

export default ServiceDetails;
