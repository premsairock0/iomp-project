import React, { useEffect, useState } from 'react';

const Castvote = () => {
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/selectedstudents')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
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

  if (loading) return <div style={{ marginLeft: '250px', marginTop: '56px', padding: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ marginLeft: '250px', marginTop: '56px', padding: '2rem', color: 'red' }}>Error: {error}</div>;

  return (
    <div
      style={{
        marginLeft: '50px',
        marginTop: '56px',
        padding: '2rem',
        minHeight: 'calc(100vh - 56px)',
        // backgroundColor: '#28a745',
        color: 'white',
        boxSizing: 'border-box',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>Cast Your Vote</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {selectedStudents.length === 0 && <p>No students selected for voting.</p>}
        {selectedStudents.map((student) => (
          <div
            key={student._id}
            style={{
              backgroundColor: '#155724',
              padding: '1rem',
              borderRadius: '8px',
              width: '250px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <h3>{student.username}</h3>
            <p><strong>Roll No:</strong> {student.rollno}</p>
            <p><strong>Department:</strong> {student.department}</p>
            <button
              style={{
                backgroundColor: '#28a745',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
              onClick={() => alert(`Voted for ${student.username}`)} // Placeholder for voting logic
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