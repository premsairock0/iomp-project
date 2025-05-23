import React from "react";

function StudentTable({ students }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "1.5rem",
        maxHeight: "80vh",
        overflowY: "auto",
        padding: "1rem",
        backgroundColor: "#f9fafb",
      }}
    >
      {students.map((student, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            padding: "1.25rem 1.5rem",
            transition: "box-shadow 0.3s ease",
            cursor: "default",
            userSelect: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
          }}
        >
          <h3
            style={{
              margin: 0,
              fontWeight: "700",
              fontSize: "1.25rem",
              color: "#111827",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            {student.username}
          </h3>
          <p style={{ margin: 0, color: "#4b5563", fontSize: "0.95rem" }}>
            <strong>Email:</strong> {student.email}
          </p>
          <p style={{ margin: 0, color: "#4b5563", fontSize: "0.95rem" }}>
            <strong>Department:</strong> {student.department}
          </p>
          <p style={{ margin: 0, color: "#4b5563", fontSize: "0.95rem" }}>
            <strong>Year:</strong> {student.year}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StudentTable;
