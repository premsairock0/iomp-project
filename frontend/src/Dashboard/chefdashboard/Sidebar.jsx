import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      className="fixed top-0 left-0 w-[200px] min-h-screen pt-14 border-r border-gray-300 shadow-md"
      style={{ backgroundColor: "#f1f1f1" }} // light gray sidebar background
    >
      <div className="flex flex-col p-4 space-y-3">
        <button
          className="font-medium py-2 px-4 rounded border border-transparent text-white transition duration-200"
          style={{ backgroundColor: "#111" }}  // dark background
          onClick={() => navigate("/chef/dashboard/menu")}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#38bdf8"; // sky blue bg on hover
            e.target.style.color = "#000";              // black text on hover
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#111"; // dark bg normal
            e.target.style.color = "white";          // white text normal
          }}
        >
          Menu
        </button>

        <button
          className="font-medium py-2 px-4 rounded border border-transparent text-white transition duration-200"
          style={{ backgroundColor: "#111" }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#38bdf8";
            e.target.style.color = "#000";
          }}
          onClick={() => navigate("/chef/dashboard/members")}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#111";
            e.target.style.color = "white";
          }}
        >
          Members
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
