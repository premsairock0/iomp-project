import React, { useEffect, useState } from 'react';
import axios from 'axios';

function YourServiceRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('studentToken');
        const res = await axios.get('http://localhost:3000/api/dashstudent/service-requests/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data.requests);
      } catch (err) {
        console.error('Error fetching service requests:', err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Service Requests</h1>
      <div className="space-y-4">
        {requests.map((req) => (
          <div key={req._id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold">{req.servicetitle}</h2>
            <p><strong>Room:</strong> {req.roomNo}</p>
            <p><strong>Status:</strong> {req.status}</p>
            <p className="text-gray-600"><strong>Description:</strong> {req.description}</p>
            <p className="text-sm text-gray-500"><strong>Requested on:</strong> {new Date(req.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourServiceRequests;
