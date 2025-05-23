import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dashwarden/service-requests');
        setRequests(response.data.requests || []);
      } catch (err) {
        console.error('Error fetching service requests:', err);
        setError('Failed to load service requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/api/dashwarden/service-requests/${id}`, {
        status: newStatus
      });

      setRequests(prev =>
        prev.map(req =>
          req._id === id ? { ...req, status: newStatus } : req
        )
      );
    } catch (err) {
      console.error('Error updating request status:', err);
      alert('Failed to update request status.');
    }
  };

  if (loading) {
    return (
      <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Student Service Requests</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Student Service Requests</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const pendingRequests = requests.filter(r => r.status === 'Pending');
  const reviewedRequests = requests.filter(r => r.status !== 'Pending');

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Student Service Requests</h1>

      <section>
        <h2 className="text-xl font-semibold text-yellow-600 mb-4">🕒 Pending Requests</h2>
        {pendingRequests.length === 0 ? (
          <p className="text-gray-600">No pending requests.</p>
        ) : (
          pendingRequests.map((req) => (
            <div key={req._id} className="bg-white p-4 rounded shadow-md mb-4">
              <h3 className="text-lg font-semibold">{req.servicetitle}</h3>
              <p><strong>Room No:</strong> {req.roomNo}</p>
              <p><strong>Description:</strong> {req.description}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className="font-medium text-yellow-600">{req.status}</span>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Requested At:</strong> {new Date(req.createdAt).toLocaleString()}
              </p>
              {req.studentId && (
                <div className="mt-2 text-sm text-gray-700">
                  <p><strong>Student Name:</strong> {req.studentId.username}</p>
                  <p><strong>Student Email:</strong> {req.studentId.email}</p>
                </div>
              )}

              <div className="mt-3 space-x-2">
                <button
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => handleStatusChange(req._id, 'Approved')}
                  disabled={req.status === 'Approved'}
                >
                  Approve
                </button>
                <button
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleStatusChange(req._id, 'Not Available')}
                  disabled={req.status === 'Not Available'}
                >
                  Not Available
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-green-600 mb-4">✅ Reviewed Requests</h2>
        {reviewedRequests.length === 0 ? (
          <p className="text-gray-600">No reviewed requests.</p>
        ) : (
          reviewedRequests.map((req) => (
            <div key={req._id} className="bg-white p-4 rounded shadow-md mb-4 border border-gray-300">
              <h3 className="text-lg font-semibold">{req.servicetitle}</h3>
              <p><strong>Room No:</strong> {req.roomNo}</p>
              <p><strong>Description:</strong> {req.description}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={`font-medium ${
                    req.status === 'Approved' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {req.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                <strong>Requested At:</strong> {new Date(req.createdAt).toLocaleString()}
              </p>
              {req.studentId && (
                <div className="mt-2 text-sm text-gray-700">
                  <p><strong>Student Name:</strong> {req.studentId.username}</p>
                  <p><strong>Student Email:</strong> {req.studentId.email}</p>
                </div>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default StudentRequests;
