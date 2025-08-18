import React, { useState } from "react";
import axios from "axios";

function EventForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    eventtitle: "",
    eventimageurl: "",
    insidetitle: "",
    description: "",
    mainimageUrl: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Basic validation (you can expand)
    if (
      !formData.eventtitle ||
      !formData.eventimageurl ||
      !formData.insidetitle ||
      !formData.description ||
      !formData.mainimageUrl
    ) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post("https://jntuh-hostel-management.onrender.com/api/event/addevent", formData);
      setLoading(false);
      onSuccess(); // notify parent to refresh list & hide form
      setFormData({
        eventtitle: "",
        eventimageurl: "",
        insidetitle: "",
        description: "",
        mainimageUrl: ""
      });
    } catch (err) {
      console.error(err);
      setError("Failed to add event");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow-md">
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <input
        type="text"
        name="eventtitle"
        placeholder="Event Title"
        value={formData.eventtitle}
        onChange={handleChange}
        className="mb-3 w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        name="eventimageurl"
        placeholder="Event Image URL (thumbnail)"
        value={formData.eventimageurl}
        onChange={handleChange}
        className="mb-3 w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        name="insidetitle"
        placeholder="Inside Title"
        value={formData.insidetitle}
        onChange={handleChange}
        className="mb-3 w-full px-3 py-2 border rounded"
      />
      <input
        type="text"
        name="mainimageUrl"
        placeholder="Main Image URL"
        value={formData.mainimageUrl}
        onChange={handleChange}
        className="mb-3 w-full px-3 py-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="mb-3 w-full px-3 py-2 border rounded"
        rows={4}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Adding..." : "Add Event"}
      </button>
    </form>
  );
}

export default EventForm;
