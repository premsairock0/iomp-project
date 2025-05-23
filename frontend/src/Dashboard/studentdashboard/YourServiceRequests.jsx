import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';



function YourServiceRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      setError('Student ID not found. Please login again.');
      setLoading(false);
      return;
    }

          const decoded = jwtDecode(token);
          console.log('Decoded token:', decoded);
    
          const studentId = decoded?.id; 
          setStudentId(studentId)// assuming your JWT payload has student object with an id
          console.log('Student ID:', studentId);

    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/dashstudent/service-requests?studentId=${studentId}`);
        setRequests(res.data.requests);
      } catch (err) {
        console.error('Error fetching service requests:', err);
        setError('Failed to load service requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Your Service Requests</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Your Service Requests</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Service Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-600">You have not submitted any service requests yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-lg font-semibold">{req.servicetitle}</h2>
              <p><strong>Room:</strong> {req.roomNo}</p>
              <p><strong>Status:</strong> <span className={`font-medium ${req.status === 'Pending' ? 'text-yellow-600' : req.status === 'Approved' ? 'text-green-600' : 'text-red-600'}`}>{req.status}</span></p>
              <p className="text-gray-600"><strong>Description:</strong> {req.description}</p>
              <p className="text-sm text-gray-500"><strong>Requested on:</strong> {new Date(req.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YourServiceRequests;
