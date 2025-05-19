import React, { useState } from "react";

function Menucard({ menu }) {
  // Track expanded cards for Read More toggle
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      {menu.length > 0 ? (
        menu.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg border border-gray-300
                       transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-400/50
                       cursor-pointer flex flex-col overflow-hidden
                       animate-fadeInUp"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {item.photo && (
              <div className="relative overflow-hidden h-52">
                <img
                  src={item.photo}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110 hover:rotate-1"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                {/* Animated day badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-indigo-600 
                                text-white px-5 py-1 rounded-full font-bold text-xl 
                                animate-bounce-slow select-none shadow-lg">
                  {item.title}
                </div>
              </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              {item.description && (
                <>
                  <p
                    className={`text-gray-800 text-base leading-relaxed flex-grow transition-max-height duration-500 ease-in-out
                      ${expanded[index] ? "max-h-[500px]" : "max-h-[5.5rem] overflow-hidden text-ellipsis"}`}
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: expanded[index] ? "unset" : 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </p>
                  {item.description.length > 120 && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="mt-3 text-indigo-600 hover:text-indigo-800 font-semibold self-start"
                    >
                      {expanded[index] ? "Show Less ▲" : "Read More ▼"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-600 text-lg font-medium">
          No menu items found
        </p>
      )}

      {/* Add animation keyframes in global CSS or tailwind config */}
      <style>
        {`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.6s ease forwards;
          }
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 2.5s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
}

export default Menucard;
