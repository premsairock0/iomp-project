import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function StudentServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [roomNo, setRoomNo] = useState('');
  const [description, setDescription] = useState('');
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/dashstudent/services/${id}`);
        setService(res.data.service);
      } catch (err) {
        console.error('Error fetching service details:', err);
      }
    };

    const sid = localStorage.getItem('studentId');
    if (sid) setStudentId(sid);

    fetchService();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/dashstudent/service-requests/', {
        servicetitle: service.servicetitle,
        description,
        roomNo,
        studentId,
      });
      alert('Service request submitted');
      navigate('/student/dashboard/services/your-requests');
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  if (!service) return <div>Loading...</div>;

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <button onClick={() => navigate(-1)} className="text-blue-600 mb-4">← Back</button>
      <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto">
        <img src={service.mainimageUrl} alt={service.imgtitle} className="w-full h-64 object-cover rounded" />
        <h2 className="text-2xl font-bold mt-4">Request for {service.servicetitle}</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block font-semibold">Room Number:</label>
            <input
              type="text"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentServiceDetails;
