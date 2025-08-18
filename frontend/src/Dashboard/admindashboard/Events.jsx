import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import EventForm from "./EventForm"; // import your form component

function Events() {
  const [events, setEvents] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get("https://jntuh-hostel-management.onrender.com/api/event/getevent")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  };

  const handleAddEventSuccess = () => {
    setShowAddForm(false);
    fetchEvents(); // refresh the event list
  };

  const isDetailPage = location.pathname !== "/admin/dashboard/events";

  return (
    <div className="p-6">
      {!isDetailPage && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Events</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              {showAddForm ? "Cancel" : "Add Event"}
            </button>
          </div>

          {showAddForm && <EventForm onSuccess={handleAddEventSuccess} />}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
              <div
                key={event._id}
                className="flex flex-col justify-between bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-200 group"
                onClick={() => navigate(`${event._id}`)}
              >
                <div>
                  <img
                    src={event.eventimageurl}
                    alt={event.eventtitle}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.eventtitle}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{event.insidetitle}</p>
                  </div>
                </div>

                <div className="p-4 flex justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400 group-hover:text-gray-700 transition-colors duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
}

export default Events;
