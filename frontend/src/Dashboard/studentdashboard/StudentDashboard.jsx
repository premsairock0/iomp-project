import React from "react";
import Navbar from "../wardendashboard/Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function StudentDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar role={"Student Dashboard"} />

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />

        <main
          style={{
            marginLeft: "250px",
            flex: 1,
            padding: "20px",
            backgroundColor: "#f8f9fa",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
