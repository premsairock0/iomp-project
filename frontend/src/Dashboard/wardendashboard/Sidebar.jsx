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
          onClick={() => navigate("/warden/dashboard/students")}
        >
          Students
        </button>
        <button
          className="btn btn-outline-primary mb-2"
          onClick={() => navigate("/warden/dashboard/voting")}
        >
          Voting
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/warden/dashboard/letters")}
        >
          Student Letters
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
