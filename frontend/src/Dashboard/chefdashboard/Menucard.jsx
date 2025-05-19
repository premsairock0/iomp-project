import React from "react";

function Menucard({ menu }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {menu.length > 0 ? (
        menu.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            {item.photo && (
              <img
                src={item.photo}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              {item.description && (
                <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">No menu items found</p>
      )}
    </div>
  );
}

export default Menucard;
