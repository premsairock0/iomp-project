import React from "react";
import Navbar from "../wardendashboard/Navbar";
import Sidebar from "./Sidebar";
import WelcomeStudent from "./WelcomeStudent"; // <-- Import your component
import { Outlet } from "react-router-dom";

function StudentDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar role={"Student Dashboard"} />

      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#f8f9fa",
            overflowY: "auto",
          }}
        >
          {/* <h1 style={{ marginBottom: "10px", color: "#212529" }}>
            Student Dashboard
          </h1> */}

          {/* <WelcomeStudent /> Renders below the h1 */}

          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
