import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Eventdetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/event/getevent/${id}`)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <p className="text-gray-600 text-lg">Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <p className="text-red-600 text-lg">Event not found.</p>
      </div>
    );
  }

  return (
    <div
      className="fixed top-0 right-0 bottom-0 overflow-auto bg-white z-50"
      style={{ left: "250px" }} // leave space for sidebar width
    >
      <div className="p-4 sm:p-6 md:p-10 mt-11">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 sm:mb-6 flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
          {event.eventtitle}
        </h2>

        {/* Image */}
        <div className="overflow-hidden rounded-lg shadow-md mb-4 sm:mb-6">
          <img
            src={event.mainimageUrl || event.eventimageurl}
            alt={event.eventtitle}
            className="w-full max-h-72 sm:max-h-96 object-cover"
          />
        </div>

        {/* Inside Title */}
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
          {event.insidetitle}
        </h3>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {event.description}
        </p>
      </div>
    </div>
  );
}

export default Eventdetails;
