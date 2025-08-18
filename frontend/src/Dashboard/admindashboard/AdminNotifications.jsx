import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminNotifications() {
  const [headline, setHeadline] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("active"); // 'active' or 'all'

  const navigate = useNavigate();
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    if (!token) {
      navigate("/login/admin");
      return;
    }

    fetch("https://jntuh-hostel-management.onrender.com/api/admin/notifications", {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        setLoading(false);
      });
  }, [token, navigate]);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!headline.trim()) {
      setError("Please enter a notification headline");
      return;
    }

    setPosting(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("https://jntuh-hostel-management.onrender.com/api/admin/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ headline }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to post notification");

      setMessage("Notification posted successfully");
      setHeadline("");
      setNotifications((prev) => [data.notification, ...prev]);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 5000);
    } finally {
      setPosting(false);
    }
  };

  const handleClose = async (id) => {
    if (!window.confirm("Are you sure you want to close this notification?")) return;
    
    try {
      const res = await fetch(`https://jntuh-hostel-management.onrender.com/api/admin/notifications/${id}/close`, {
        method: "PUT",
        headers: { Authorization: token },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isActive: false } : n))
      );
    } catch (err) {
      alert("Error closing notification: " + err.message);
    }
  };

  const getBadgeColor = (role) => {
    return role === "Admin" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800";
  };

  const filteredNotifications = activeTab === "active" 
    ? notifications.filter(note => note.isActive)
    : notifications;

  return (
    <div className="px-4 sm:px-6 py-8 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Management</h1>
          <p className="text-gray-600">
            Create and manage notifications for students and faculty
          </p>
        </div>

        {/* Notification Creation Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Create New Notification</h2>
          <form onSubmit={handlePost}>
            <div className="mb-4">
              <label htmlFor="headline" className="block text-sm font-medium text-gray-700 mb-1">
                Notification Headline
              </label>
              <input
                id="headline"
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Enter notification content..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={120}
              />
              <p className="text-xs text-gray-500 mt-1">
                {headline.length}/120 characters
              </p>
            </div>

            {(message || error) && (
              <div className={`mb-4 p-3 rounded-lg ${message ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                {message || error}
              </div>
            )}

            <button
              type="submit"
              disabled={posting || !headline.trim()}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {posting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </span>
              ) : "Post Notification"}
            </button>
          </form>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("active")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "active" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
              >
                Active Notifications
              </button>
              <button
                onClick={() => setActiveTab("all")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === "all" ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
              >
                All Notifications
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="text-center py-10">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeTab === "active" ? "active" : ""} notifications</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activeTab === "active" ? "All caught up! No active notifications." : "No notifications have been created yet."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotifications.map((note) => (
                  <div
                    key={note._id}
                    className={`p-4 rounded-lg border ${note.isActive ? "border-gray-200 bg-white" : "border-gray-100 bg-gray-50"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`text-base font-medium ${note.isActive ? "text-gray-900" : "text-gray-500"}`}>
                            {note.headline}
                          </h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeColor(note.role)}`}>
                            {note.role}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Posted by {note.postedBy} • {new Date(note.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="ml-4">
                        {note.isActive ? (
                          <button
                            onClick={() => handleClose(note._id)}
                            className="text-sm text-red-600 hover:text-red-800 font-medium"
                            title="Close notification"
                          >
                            Close
                          </button>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Closed</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNotifications;