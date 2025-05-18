import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StudentList from "./StudentList";
import { useNavigate } from "react-router-dom";

function WardenDashboard() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  // Fetch JWT token from localStorage or wherever you store it
  const token = localStorage.getItem("Authorization"); // <-- Changed key to match your login storage format

  // ===================== REFACTORED: FETCH STUDENT DATA WITH AUTH AND REDIRECT =====================
  useEffect(() => {
    if (!token) {
      // If no token, redirect to login page
      navigate("/login/warden");
      return;
    }

    // Fetch student data from backend
    fetch("http://localhost:3000/api/dashwarden/students", {
      headers: {
        Authorization: token, // Use token exactly as stored ("Bearer <token>")
      },
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          // Unauthorized or token expired
          localStorage.removeItem("Authorization"); // Clear stored token
          navigate("/login/warden"); // Redirect to login
          return;
        }
        const data = await res.json();
        if (res.ok) {
          setStudents(data.students);
        } else {
          console.error("Failed to fetch students:", data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  }, [navigate, token]);
  // ===================== END OF REFACTORED FETCH LOGIC =====================

  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        {/* Main content area */}
        <main
          style={{
            marginLeft: "250px", // sidebar width
            padding: "20px",
            width: "100%",
          }}
        >
          <h2>Students Information</h2>
          <StudentList students={students} />
        </main>
      </div>
    </div>
  );
}

export default WardenDashboard;
