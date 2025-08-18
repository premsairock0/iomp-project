import React from "react";

function SelectVoters({ students }) {
  const handleSelect = async (student) => {
    try {
      const response = await fetch("https://jntuh-hostel-management.onrender.com/api/selectedstudents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: student.username,
          rollno: student.rollno,
          department: student.department,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Student selected successfully!");
      } else {
        alert(data.message || "❌ Failed to select student");
      }
    } catch (error) {
      console.error("Error selecting student:", error);
      alert("❌ Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          fontWeight: "700",
          color: "#2c3e50",
          fontSize: "2rem",
        }}
      >
        Select Contestants
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem",
          maxHeight: "75vh",
          overflowY: "auto",
          padding: "0 0.5rem",
        }}
      >
        {students.map((student, idx) => (
          <div
            key={idx}
            style={{
              width: "180px",
              borderRadius: "10px",
              backgroundColor: "#f8f9fa",
              border: "1px solid #dee2e6",
              padding: "1rem",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              transition: "transform 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.05)";
            }}
          >
            <h6 style={{ color: "#007bff", fontWeight: "600", marginBottom: "0.5rem" }}>
              {student.username}
            </h6>
            <div style={{ fontSize: "14px" }}>
              <div><strong>Roll No:</strong> {student.rollno}</div>
              <div><strong>Dept:</strong> {student.department}</div>
            </div>
            <button
              onClick={() => handleSelect(student)}
              style={{
                marginTop: "0.75rem",
                width: "100%",
                background: "linear-gradient(to right, #20c997, #38d9a9)",
                color: "#fff",
                fontWeight: "600",
                border: "none",
                borderRadius: "6px",
                padding: "6px 0",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "linear-gradient(to right, #1eae88, #30c395)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "linear-gradient(to right, #20c997, #38d9a9)";
              }}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectVoters;
