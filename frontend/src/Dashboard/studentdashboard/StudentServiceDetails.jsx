import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function StudentServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [roomNo, setRoomNo] = useState('');
  const [description, setDescription] = useState('');
  const [studentId, setStudentId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch service details
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/dashstudent/services/${id}`);
        setService(res.data.service);
      } catch (err) {
        console.error('Error fetching service details:', err);
      }
    };

    fetchService();

    // Fetch studentId from localStorage or from a JWT token if you store one
    const sid = localStorage.getItem('studentId');
    if (sid) {
      setStudentId(sid);
    } else {
      // If you use JWT and store it, you might decode token here and get studentId
      // Or redirect user to login if no studentId is found
      alert('Student ID not found. Please login.');
      navigate('/student/dashboard/services'); // adjust route as per your app
    }
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId) {
      alert('Student ID not found. Please login again.');
      return;
    }

    if (!roomNo.trim() || !description.trim()) {
      alert('Please fill all the fields.');
      return;
    }

    setSubmitting(true);

    try {
      await axios.post('http://localhost:3000/api/dashstudent/service-requests', {
        servicetitle: service.servicetitle,
        description: description.trim(),
        roomNo: roomNo.trim(),
        studentId,
      });
      alert('Service request submitted successfully.');
      navigate('/student/dashboard/services/your-requests');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!service) return <div>Loading...</div>;

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <button onClick={() => navigate(-1)} className="text-blue-600 mb-4">
        ← Back
      </button>
      <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto">
        <img
          src={service.mainimageUrl}
          alt={service.imgtitle}
          className="w-full h-64 object-cover rounded"
        />
        <h2 className="text-2xl font-bold mt-4 mb-4">Request for {service.servicetitle}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Service Title:</label>
            <input
              type="text"
              value={service.servicetitle}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Room Number:</label>
            <input
              type="text"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your room number"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Describe your request"
              rows={4}
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 rounded text-white ${
              submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {submitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentServiceDetails;
