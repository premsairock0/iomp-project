import React, { useState, useEffect } from "react";
import axios from "axios";

function Events() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventtitle: "",
    eventimageurl: "",
    insidetitle: "",
    description: "",
    mainimageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/event/getevent");
      if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else {
        setEvents([]);
        console.error("Expected array, got:", res.data);
      }
    } catch (err) {
      setError("Failed to fetch events.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:3000/api/event/addevent", formData);
      console.log("Submitted:", res.data);
      setFormData({
        eventtitle: "",
        eventimageurl: "",
        insidetitle: "",
        description: "",
        mainimageUrl: "",
      });
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      setError("Failed to add event.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Add Event Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition font-semibold"
        >
          {showForm ? "Cancel" : "Add an Event"}
        </button>
      </div>

      {/* Event Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-white p-6 rounded shadow space-y-4"
        >
          {error && (
            <div className="text-red-600 font-semibold">{error}</div>
          )}
          <input
            name="eventtitle"
            value={formData.eventtitle}
            onChange={handleInputChange}
            placeholder="Event Title"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="eventimageurl"
            value={formData.eventimageurl}
            onChange={handleInputChange}
            placeholder="Event Image URL"
            required
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="insidetitle"
            value={formData.insidetitle}
            onChange={handleInputChange}
            placeholder="Inside Title"
            required
            className="w-full border rounded px-3 py-2"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            rows={4}
            className="w-full border rounded px-3 py-2"
          />
          <input
            name="mainimageUrl"
            value={formData.mainimageUrl}
            onChange={handleInputChange}
            placeholder="Main Image URL"
            required
            className="w-full border rounded px-3 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Submitting..." : "Submit Event"}
          </button>
        </form>
      )}

      {/* Events Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.length === 0 ? (
          <p className="text-center col-span-full text-gray-600">
            No events to show.
          </p>
        ) : (
          events.map((ev) => (
            <div
              key={ev._id}
              className="bg-white rounded shadow overflow-hidden"
            >
              <img
                src={ev.eventimageurl}
                alt={ev.eventtitle}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{ev.eventtitle}</h3>
                <h4 className="text-md text-gray-600">{ev.insidetitle}</h4>
                <p className="mt-2 text-gray-700">{ev.description}</p>
                {ev.mainimageUrl && (
                  <img
                    src={ev.mainimageUrl}
                    alt="Main visual"
                    className="mt-4 w-full h-40 object-cover rounded"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Events;
