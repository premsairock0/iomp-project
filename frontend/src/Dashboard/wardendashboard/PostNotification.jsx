import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PostNotification() {
  const [headline, setHeadline] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    if (!token) {
      navigate("/login/warden");
      return;
    }

    const fetchNotifications = async () => {
      try {
        const res = await fetch("https://jntuh-hostel-management.onrender.com/api/warden/notifications", {
          headers: {
            Authorization: token,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setNotifications(
            data.notifications.filter((note) => note.role === "Warden")
          );
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchNotifications();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return navigate("/login/warden");

    if (!headline.trim()) {
      setError("Headline is required");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("https://jntuh-hostel-management.onrender.com/api/warden/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ headline }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      setMessage("✅ Notification posted");
      setHeadline("");
      setNotifications((prev) => [data.notification, ...prev]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="p-8 min-h-screen bg-gray-50"
      style={{ marginLeft: "250px", paddingTop: "56px" }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Post a Notification</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-10 max-w-2xl"
      >
        <div className="mb-4">
          <label
            htmlFor="headline"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Notification Headline
          </label>
          <input
            id="headline"
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            placeholder="Write something important to inform students..."
          />
        </div>

        {message && <p className="text-green-600 font-medium mb-2">{message}</p>}
        {error && <p className="text-red-600 font-medium mb-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Notification"}
        </button>
      </form>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Previously Posted Notifications
        </h3>
        {notifications.length === 0 ? (
          <p className="text-gray-500">You haven't posted any notifications yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notifications.map((note, index) => (
              <div
                key={index}
                className="bg-gray-100 border border-gray-300 p-5 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <h4 className="text-md font-semibold text-gray-800 mb-2">
                  {note.headline}
                </h4>
                <p className="text-sm text-gray-600">
                  Posted on{" "}
                  <span className="text-gray-700 font-medium">
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostNotification;
