import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      navigate("/login/student");
      return;
    }

    fetch("http://localhost:3000/api/student/notifications", {
      headers: {
        Authorization: token,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("Authorization");
          navigate("/login/student");
        } else if (res.ok) {
          setNotifications(data.notifications || []);
        } else {
          console.error("Failed to fetch notifications:", data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading notifications...</p>;
  }

  return (
    <div className="ml-[250px] mt-[56px] p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No active notifications available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {notifications.map((note, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-300 p-6 transition transform hover:scale-105 hover:shadow-purple-400/50"
            >
              <h3 className="text-xl font-semibold text-purple-700 mb-2">{note.headline}</h3>
              <p className="text-gray-700">
                Posted by <span className="font-medium">{note.postedBy}</span> ({note.role})
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notifications;
