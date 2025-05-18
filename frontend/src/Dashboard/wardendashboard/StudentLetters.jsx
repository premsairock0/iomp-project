import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentLetters() {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    fetchLetters();
  }, []);

  const fetchLetters = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/studentletters");
      setLetters(res.data);
    } catch (error) {
      console.error("Failed to fetch letters:", error);
    }
  };

  const handleAction = async (id, approved) => {
    try {
      await axios.put(`http://localhost:3000/api/studentletters/${id}`, { approved });
      fetchLetters(); // refresh after update
    } catch (err) {
      console.error("Failed to update letter:", err);
    }
  };

  return (
    <div style={{ marginLeft: "260px", padding: "1rem" }}>
      <h2>Student Letters</h2>
      <div className="row">
        {letters.map((letter) => (
          <div key={letter._id} className="card col-md-4 m-2 p-3 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Roll No: {letter.rollno}</h5>
              <p className="card-text">{letter.description}</p>
              <p className="card-text text-muted">
                Submitted: {new Date(letter.createdAt).toLocaleString()}
              </p>
              <p>Status: <strong>{letter.approved ? "Approved" : "Pending"}</strong></p>
              {!letter.approved && (
                <>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => handleAction(letter._id, true)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
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
