import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentTable from "./StudentTable";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("Authorization");

  useEffect(() => {
    if (!token) {
      navigate("/login/warden");
      return;
    }

    fetch("http://localhost:3000/api/dashwarden/students", {
      headers: {
        Authorization: token,
      },
    })
      .then(async (res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("Authorization");
          navigate("/login/warden");
          return;
        }
        const data = await res.json();
        if (res.ok) {
          setStudents(data.students);
          setFilteredStudents(data.students);
        } else {
          console.error("Failed to fetch students:", data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  }, [navigate, token]);

  const handleFilter = () => {
    if (yearFilter.trim() === "") {
      setFilteredStudents(students);
      return;
    }
    const yearNumber = parseInt(yearFilter);
    const filtered = students.filter((stu) => stu.year === yearNumber);
    setFilteredStudents(filtered);
  };

  const handleReset = () => {
    setYearFilter("");
    setFilteredStudents(students);
  };

  return (
    <div style={{ padding: "1.5rem 2rem", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <h1
        style={{
          textAlign: "center",
          fontWeight: "800",
          fontSize: "2.2rem",
          marginBottom: "1.8rem",
          color: "#1f2937",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        Students Information
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="number"
          placeholder="Filter by Year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          min={1}
          max={5}
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
            fontSize: "1rem",
            width: "140px",
          }}
        />

        <button
          onClick={handleFilter}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Filter
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid #2563eb",
            backgroundColor: "white",
            color: "#2563eb",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      <StudentTable students={filteredStudents} />
    </div>
  );
}

export default StudentList;
