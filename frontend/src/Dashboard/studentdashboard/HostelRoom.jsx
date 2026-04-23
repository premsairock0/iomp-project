import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function HostelRoom() {
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    rollNo: '',
    incomeCertificate: '',
    nativePlace: '',
    distance: ''
  });

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      setError('Student ID not found. Please login again.');
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const id = decoded?.id; 
      setStudentId(id);

      const fetchRequest = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/dashstudent/room-requests?studentId=${id}`);
          if (res.data.requests && res.data.requests.length > 0) {
            setRequest(res.data.requests[0]);
          }
        } catch (err) {
          console.error('Error fetching room request:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchRequest();
    } catch (e) {
      setError('Invalid session. Please login again.');
      setLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/dashstudent/room-requests', {
        ...formData,
        studentId
      });
      setRequest(res.data.request);
      alert('Room request submitted successfully!');
    } catch (err) {
      console.error('Error submitting room request:', err);
      alert(err.response?.data?.message || 'Failed to submit room request');
    }
  };

  if (loading) {
    return <div className="p-6 md:p-10 bg-gray-100 min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 md:p-10 bg-gray-100 min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Hostel Room Allotment</h1>

      {request ? (
        <div className="bg-white p-6 rounded shadow-md max-w-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Your Room Request Status</h2>
          <div className="space-y-3">
            <p><strong>Roll No:</strong> {request.rollNo}</p>
            <p><strong>Income Cert:</strong> {request.incomeCertificate}</p>
            <p><strong>Native Place:</strong> {request.nativePlace} ({request.distance} km)</p>
            <div className="border-t pt-3 mt-3">
              <p className="text-lg">
                <strong>Status:</strong>{' '}
                <span className={`font-bold ${
                  request.status === 'Pending' ? 'text-yellow-600' :
                  request.status === 'Accepted' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {request.status}
                </span>
              </p>
              {request.status === 'Accepted' && (
                <p className="text-xl text-green-700 mt-2 font-bold">Room Alloted: {request.roomNo}</p>
              )}
              {request.status === 'Rejected' && (
                <p className="text-red-600 mt-2">Your request has been rejected. Please contact the warden.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded shadow-md max-w-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Request a Hostel Room</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Roll No</label>
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Income Certificate No. / Details</label>
              <input
                type="text"
                name="incomeCertificate"
                value={formData.incomeCertificate}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Native Place</label>
              <input
                type="text"
                name="nativePlace"
                value={formData.nativePlace}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">Distance from Native Place (in km)</label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                min="0"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded font-bold hover:bg-blue-700 transition duration-200"
            >
              Submit Request
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default HostelRoom;
