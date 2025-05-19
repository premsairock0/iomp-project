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
          // === Changed this line ===
          // Previously you used: setMenu(data.Menu || []);
          // Now using data directly because backend sends array, not { Menu: [...] }
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
      <Menucard menu={menu} />
    </div>
  );
}

export default Menu;
