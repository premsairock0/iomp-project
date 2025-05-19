import React, { useEffect, useState } from "react";

function StudentLetters() {
  const [letters, setLetters] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      setError("No token found");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/studentletters", {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to fetch letters");
      } else {
        setLetters(data);
      }
    } catch (error) {
      console.error("Failed to fetch letters:", error);
      setError("Something went wrong while fetching letters");
    }

    setLoading(false);
  };

  const handleAction = async (id, approved) => {
    const token = localStorage.getItem("Authorization");

    if (!token) {
      setError("No token found");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/studentletters/${id}`, {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved }),
      });

      if (!res.ok) throw new Error("Failed to update letter");

      fetchLetters(); // Refresh after update
    } catch (err) {
      console.error("Failed to update letter:", err);
      setError("Error updating letter");
    }
  };

  return (
    <div style={{ marginLeft: "260px", padding: "1rem" }}>
      <h2>Student Letters</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {letters.map((letter) => (
          <div
            key={letter._id}
            className="card col-md-4 m-2 p-3 shadow-sm"
            style={{ minHeight: "auto" }}
          >
            <div className="card-body">
              <h5 className="card-title">Roll No: {letter.rollno}</h5>
              <p className="card-text">{letter.description}</p>
              <p className="card-text text-muted">
                Submitted: {new Date(letter.createdAt).toLocaleString()}
              </p>
              <p>
                Status: <strong>{letter.approved ? "Approved" : "Pending"}</strong>
              </p>
              {!letter.approved && (
                <>
                  <button
                    className="btn btn-sm me-2"
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      borderRadius: "8px",
                    }}
                    onClick={() => handleAction(letter._id, true)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      borderRadius: "8px",
                    }}
                    onClick={() => handleAction(letter._id, false)}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentLetters;
