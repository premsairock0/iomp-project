import React from "react";

function SelectVoters({ students }) {
  const handleSelect = async (student) => {
    try {
      const response = await fetch("http://localhost:3000/api/selectedstudents", {
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
        alert("Student selected successfully!");
      } else {
        alert(data.message || "Failed to select student");
      }
    } catch (error) {
      console.error("Error selecting student:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {students.map((student, idx) => (
          <div className="col-md-4 mb-4" key={idx}>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">{student.username}</h5>
                <p className="card-text">
                  <strong>Roll No:</strong> {student.rollno}<br />
                  <strong>Department:</strong> {student.department}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleSelect(student)}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectVoters;