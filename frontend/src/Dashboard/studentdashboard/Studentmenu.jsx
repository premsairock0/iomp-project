import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Studentmenu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
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
        console.log(data);

        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("Authorization");
          navigate("/login/chef");
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

  if (loading) return <p>Loading menu...</p>;

  return (
    <div style={{ marginLeft: "250px", marginTop: "56px", padding: "20px" }}>
      <h2>Mess Menu</h2>
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
    </div>
  );
}

export default Studentmenu;
