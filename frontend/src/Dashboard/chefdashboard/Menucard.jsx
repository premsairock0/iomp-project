import React, { useState } from "react";

function Menucard({ menu, onDelete, onEdit }) {
  // Track expanded cards for Read More toggle
  const [expanded, setExpanded] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ description: "", photo: "" });

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const startEditing = (index, item) => {
    setEditingItem(index);
    setEditForm({ description: item.description || "", photo: item.photo || "" });
  };

  const handleSave = async (index, item) => {
    if (onEdit) {
      const success = await onEdit(item.title, editForm);
      if (success) {
        setEditingItem(null);
      }
    }
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
              {editingItem === index ? (
                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    value={editForm.photo}
                    onChange={(e) => setEditForm({...editForm, photo: e.target.value})}
                    placeholder="Photo URL"
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    placeholder="Description"
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button
                      onClick={() => setEditingItem(null)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSave(index, item)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700 transition"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
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
                  {/* Action buttons */}
                  {(onEdit || onDelete) && (
                    <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                      {onEdit && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(index, item);
                          }}
                          className="px-4 py-2 bg-indigo-100 text-indigo-700 font-semibold rounded hover:bg-indigo-200 transition duration-300"
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item.title);
                          }}
                          className="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded hover:bg-red-200 transition duration-300"
                        >
                          Delete
                        </button>
                      )}
                    </div>
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
