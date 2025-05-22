import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function AdminServices() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    imgtitle: '',
    serviceimageurl: '',
    mainimageUrl: '',
    servicetitle: 'Plumbing',
    description: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/dashadmin/services');
      setServices(res.data.services);
    } catch (err) {
      console.error('Error fetching services:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/dashadmin/services', formData);
      fetchServices();
      setFormData({
        imgtitle: '',
        serviceimageurl: '',
        mainimageUrl: '',
        servicetitle: 'Plumbing',
        description: ''
      });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding service:', err);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 mt-12 bg-gray-100 min-h-screen">
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        {showForm ? 'Cancel' : 'Add Service'}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <input
            type="text"
            placeholder="Image Title"
            value={formData.imgtitle}
            onChange={(e) => setFormData({ ...formData, imgtitle: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Thumbnail Image URL"
            value={formData.serviceimageurl}
            onChange={(e) => setFormData({ ...formData, serviceimageurl: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Main Image URL"
            value={formData.mainimageUrl}
            onChange={(e) => setFormData({ ...formData, mainimageUrl: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
          <label className="block font-medium">Service Type</label>
          <select
            value={formData.servicetitle}
            onChange={(e) => setFormData({ ...formData, servicetitle: e.target.value })}
            required
            className="w-full p-2 border rounded"
          >
            {['Plumbing', 'Electricity', 'Cleaning', 'Carpentry', 'Internet', 'Laundry', 'Catering'].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Submit
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(service => (
          <div
            key={service._id}
            onClick={() => navigate(`/admin/dashboard/services/${service._id}`)}
            className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden relative"
          >
            <img
              src={service.serviceimageurl}
              alt={service.imgtitle}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{service.servicetitle}</h3>
              <p className="text-sm text-gray-500">{service.imgtitle}</p>
            </div>
            <div className="absolute bottom-4 right-4 text-indigo-600">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminServices;
