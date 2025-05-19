import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function WardenDashboard() {
  return (
    <div>
      <Navbar role={"Warden Dashboard"} />
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

export default WardenDashboard;
