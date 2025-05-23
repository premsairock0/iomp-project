import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Adminstudent() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [yearFilter, setYearFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      setError("No token found");
      setLoading(false);
      navigate("/login/admin");
      return;
    }

    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/students", {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to fetch students");
        } else {
          setStudents(data.students);
          setFilteredStudents(data.students);
        }
      } catch (err) {
        setError("Something went wrong");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [navigate]);

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
        All Students (Admin View)
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

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading students...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : filteredStudents.length === 0 ? (
        <p style={{ textAlign: "center" }}>No students found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white" }}>
            <thead>
              <tr style={{ backgroundColor: "#e5e7eb" }}>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Year</th>
                <th style={thStyle}>Department</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={tdStyle}>{student.email}</td>
                  <td style={tdStyle}>{student.username}</td>
                  <td style={tdStyle}>{student.year}</td>
                  <td style={tdStyle}>{student.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  padding: "0.75rem",
  textAlign: "left",
  fontWeight: "600",
  color: "#374151",
  fontSize: "1rem",
  borderBottom: "2px solid #d1d5db",
};

const tdStyle = {
  padding: "0.75rem",
  fontSize: "0.95rem",
  color: "#4b5563",
};

export default Adminstudent;
