import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menucard from "./Menucard";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      navigate("/login/chef");
      return;
    }

    fetch("http://localhost:3000/api/dashchef/menu", {
      headers: {
        Authorization: token,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data)

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

  const handleDelete = async (day) => {
    const token = localStorage.getItem("Authorization");
    if (!window.confirm(`Are you sure you want to delete the menu for ${day}?`)) return;

    try {
      const res = await fetch(`http://localhost:3000/api/dashchef/menu/${day}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      if (res.ok) {
        setMenu(menu.filter((item) => item.title !== day));
      } else {
        const data = await res.json();
        alert(`Failed to delete: ${data.message}`);
      }
    } catch (err) {
      console.error("Error deleting menu:", err);
    }
  };

  const handleEdit = async (day, updatedData) => {
    const token = localStorage.getItem("Authorization");
    try {
      const res = await fetch(`http://localhost:3000/api/dashchef/menu/${day}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        const data = await res.json();
        setMenu(menu.map((item) => (item.title === day ? data.menu : item)));
        return true;
      } else {
        const data = await res.json();
        alert(`Failed to update: ${data.message}`);
        return false;
      }
    } catch (err) {
      console.error("Error updating menu:", err);
      return false;
    }
  };

  if (loading) return <p>Loading menu...</p>;

  return (
    <div style={{ marginLeft: "0px", marginTop: "64px", padding: "10px" }}>
    <h2 className="text-3xl font-bold text-indigo-700 mb-6 border-b-4 border-indigo-500 pb-2">
      Mess Menu
    </h2>
    <Menucard menu={menu} onDelete={handleDelete} onEdit={handleEdit} />
  </div>
  );
}

export default Menu;
