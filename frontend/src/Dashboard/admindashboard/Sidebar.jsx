import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "250px",
        minHeight: "100vh",
        backgroundColor: "#f1f1f1",
        paddingTop: "56px", // leave space for fixed navbar
        position: "fixed",
        top: 0,
        left: 0,
        borderRight: "1px solid #ccc",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
        }}
      >
        <button
          className="btn btn-outline-primary mb-2"
          onClick={() => navigate("/admin/dashboard/studentlist")}
        >
          Students List
        </button>
         <button
          className="btn btn-outline-primary mb-2"
          onClick={() => navigate("/admin/dashboard/wardenlist")}
        >
          Warden List
        </button>
         <button
          className="btn btn-outline-primary mb-2"
          onClick={() => navigate("/admin/dashboard/cheflist")}
        >
          Chef List
        </button>
        <button
          className="btn btn-outline-primary mb-2"
          onClick={() => navigate("/admin/dashboard/members")}
        >
          Members
        </button>
        <button
          className="btn btn-outline-primary mb-2"
          onClick={() => navigate("/admin/dashboard/uploadPhoto")}
        >
          upload photo
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
