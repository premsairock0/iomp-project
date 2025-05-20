import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#000", // Black background
        paddingTop: "56px",
        position: "fixed",
        top: 0,
        left: 0,
        borderRight: "1px solid #333",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          gap: "12px", // spacing between buttons
        }}
      >
        {[
          { label: "Menu", path: "/chef/dashboard/menu" },
          { label: "Members", path: "/chef/dashboard/members" },
           { label: "Calender", path: "/chef/dashboard/calender" },
        ].map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #fff",
              color: "#fff",
              padding: "10px",
              borderRadius: "5px",
              textAlign: "left",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#222";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
