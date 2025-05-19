import React from "react";
import Navbar from "../wardendashboard/Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function StudentDashboard() {
  return (
    <div>
      <Navbar role={"Student Dashboard"} />
      <Sidebar />
      <main
        style={{
          marginLeft: "250px", // same as sidebar width
          marginTop: "56px", // same as navbar height
          padding: "20px",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default StudentDashboard;