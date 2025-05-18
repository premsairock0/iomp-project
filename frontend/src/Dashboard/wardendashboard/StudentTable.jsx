import React from "react";

function StudentTable({ students }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          {/* Add other columns if needed */}
        </tr>
      </thead>
      <tbody>
        {students.map((student, idx) => (
          <tr key={idx}>
            <td>{student.name}</td>
            <td>{student.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StudentTable;
