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
        // Only keep pending letters
        const pendingLetters = data.filter(letter => letter.status === "pending");
        setLetters(pendingLetters);
      }
    } catch (error) {
      setError("Something went wrong while fetching letters");
    }

    setLoading(false);
  };

  const handleAction = async (id, status) => {
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
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update letter");

      fetchLetters(); // Refresh after update
    } catch (err) {
      setError("Error updating letter");
    }
  };

  return (
    <div>
      <h2>Pending Student Letters</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {letters.length === 0 && !loading ? (
          <p>No pending letters found.</p>
        ) : (
          letters.map((letter) => (
            <div key={letter._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              <p><strong>Roll No:</strong> {letter.rollno}</p>
              <p><strong>Description:</strong> {letter.description}</p>
              <p><strong>Submitted:</strong> {new Date(letter.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> Pending</p>

              <div>
                <button onClick={() => handleAction(letter._id, "approved")}>Approve</button>{" "}
                <button onClick={() => handleAction(letter._id, "rejected")}>Reject</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default StudentLetters;
