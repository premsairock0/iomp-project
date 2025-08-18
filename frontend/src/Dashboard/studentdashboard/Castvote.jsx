import React, { useEffect, useState } from "react";

const Castvote = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jntuh-hostel-management.onrender.com/api/selectedstudents")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setSelectedStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleVote = async (candidateId) => {
    try {
      const token = localStorage.getItem("Authorization");
      const response = await fetch("https://jntuh-hostel-management.onrender.com/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ candidateId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to vote");
      }

      alert(data.message);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading)
    return <div style={{ marginLeft: "250px", marginTop: "56px", padding: "2rem" }}>Loading...</div>;
  if (error)
    return (
      <div style={{ marginLeft: "250px", marginTop: "56px", padding: "2rem", color: "red" }}>
        Error: {error}
      </div>
    );

  return (
    <div
      style={{
        marginLeft: "50px",
        marginTop: "56px",
        padding: "2rem",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "1.5rem", fontSize: "2rem", color: "#333" }}>
        Cast Your Vote
      </h1>
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {selectedStudents.length === 0 && <p>No students selected for voting.</p>}
        {selectedStudents.map((student) => (
          <div
  key={student._id}
  style={{
    background: "linear-gradient(135deg, #e0f7fa, #80deea)", // ✅ Gradient background
    color: "#003344",
    padding: "1.5rem",
    borderRadius: "12px",
    width: "280px",
    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.1)",
    border: "1px solid #b2ebf2",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-6px)";
    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 6px 14px rgba(0, 0, 0, 0.1)";
  }}
>
  <h2
    style={{
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#006064",
      marginBottom: "0.75rem",
      textTransform: "uppercase",
    }}
  >
    {student.username}
  </h2>
  <p style={{ margin: "0.5rem 0", fontSize: "0.95rem" }}>
    <strong>Roll No:</strong> {student.rollno}
  </p>
  <p style={{ margin: "0.5rem 0 1.25rem", fontSize: "0.95rem" }}>
    <strong>Department:</strong> {student.department}
  </p>
  <button
    style={{
      backgroundColor: "#00796b",
      border: "none",
      padding: "0.6rem 1.2rem",
      borderRadius: "6px",
      color: "white",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1rem",
      width: "100%",
      transition: "background-color 0.2s ease",
    }}
    onMouseEnter={(e) => (e.target.style.backgroundColor = "#004d40")}
    onMouseLeave={(e) => (e.target.style.backgroundColor = "#00796b")}
    onClick={() => handleVote(student._id)}
  >
    Vote
  </button>
</div>

        ))}
      </div>
    </div>
  );
};

export default Castvote;
