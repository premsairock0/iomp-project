import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Studentmenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      navigate("/login/student");
      return;
    }

    fetch("http://localhost:3000/api/dashstudent/menu", {
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
          setMenu(data.Menu || []);
        } else {
          console.error("Failed to fetch menu:", data.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching menu:", err);
        setLoading(false);
      });
  }, [navigate]);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  if (loading) return <p className="text-center mt-10 text-xl">Loading menu...</p>;

  return (
    <div style={{ marginLeft: "0px", marginTop: "4px", padding: "20px" }}>
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b-4 border-indigo-500 pb-2">
        Mess Menu
      </h2>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
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
      </div>

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

export default Studentmenu;
