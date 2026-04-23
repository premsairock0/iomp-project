import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RoomRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [roomInputs, setRoomInputs] = useState({});

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/warden/room-requests');
      setRequests(response.data.requests || []);
    } catch (err) {
      console.error('Error fetching room requests:', err);
      setError('Failed to load room requests.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoomInputChange = (id, value) => {
    setRoomInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const payload = { status: newStatus };
      if (newStatus === 'Accepted') {
        const roomNo = roomInputs[id];
        if (!roomNo) {
          alert('Please enter a room number before accepting.');
          return;
        }
        payload.roomNo = roomNo;
      }

      await axios.put(`http://localhost:3000/api/warden/room-requests/${id}`, payload);
      fetchRequests(); // Refresh data to show changes
    } catch (err) {
      console.error('Error updating request status:', err);
      alert('Failed to update request status.');
    }
  };

  if (loading) {
    return <div className="p-6 md:p-10 bg-gray-100 min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 md:p-10 bg-gray-100 min-h-screen text-red-500">{error}</div>;
  }

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const reviewedRequests = requests.filter(r => r.status !== 'Pending');

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Hostel Room Requests</h1>

      <section>
        <h2 className="text-xl font-semibold text-yellow-600 mb-4">Pending Requests</h2>
        {pendingRequests.length === 0 ? (
          <p className="text-gray-600 bg-white p-4 rounded shadow-sm">No pending room requests.</p>
        ) : (
          pendingRequests.map((req) => (
            <div key={req._id} className="bg-white p-5 rounded shadow-md mb-4 border-l-4 border-yellow-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-2">Request Details</h3>
                  <p><strong>Roll No:</strong> {req.rollNo}</p>
                  <p><strong>Income Cert:</strong> {req.incomeCertificate}</p>
                  <p><strong>Native Place:</strong> {req.nativePlace}</p>
                  <p><strong>Distance:</strong> {req.distance} km</p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Student Details</h3>
                  {req.studentId ? (
                    <>
                      <p><strong>Name:</strong> {req.studentId.username}</p>
                      <p><strong>Email:</strong> {req.studentId.email}</p>
                    </>
                  ) : (
                    <p className="text-gray-500">Student data not available</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    <strong>Requested At:</strong> {new Date(req.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-3 bg-gray-50 p-3 rounded">
                <input
                  type="text"
                  placeholder="Enter Room No to Accept"
                  className="border p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={roomInputs[req._id] || ''}
                  onChange={(e) => handleRoomInputChange(req._id, e.target.value)}
                />
                <button
                  className="px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
                  onClick={() => handleStatusChange(req._id, 'Accepted')}
                >
                  Accept
                </button>
                <button
                  className="px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
                  onClick={() => handleStatusChange(req._id, 'Rejected')}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-green-600 mb-4">Reviewed Requests</h2>
        {reviewedRequests.length === 0 ? (
          <p className="text-gray-600 bg-white p-4 rounded shadow-sm">No reviewed requests.</p>
        ) : (
          reviewedRequests.map((req) => (
            <div key={req._id} className="bg-white p-5 rounded shadow-sm mb-4 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Roll No:</strong> {req.rollNo}</p>
                  <p><strong>Native Place:</strong> {req.nativePlace} ({req.distance} km)</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Requested At:</strong> {new Date(req.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-lg">
                    <strong>Status:</strong>{' '}
                    <span className={`font-bold ${req.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>
                      {req.status}
                    </span>
                  </p>
                  {req.status === 'Accepted' && (
                    <p className="text-lg text-blue-800 font-semibold mt-1">Room Alloted: {req.roomNo}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default RoomRequests;
