import React, { useEffect, useState } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

function Studentevents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:3000/api/event/getevent")
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  const isDetailPage = location.pathname !== "/student/dashboard/events";

  return (
    <div className="p-6">
      {!isDetailPage && (
        <>
          <h2 className="text-2xl font-bold mb-6 mt-6">Events</h2>
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

                {/* Arrow icon container below content */}
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

export default Studentevents;

/* 
Add this CSS somewhere in your global stylesheet if you don’t have Tailwind’s line-clamp plugin:

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
*/
