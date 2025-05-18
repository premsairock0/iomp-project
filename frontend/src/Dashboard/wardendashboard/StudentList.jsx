function StudentList({ students }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Email</th>
            <th>Department</th>
            <th>Year</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.username}</td>
              <td>{student.rollno}</td>
              <td>{student.email}</td>
              <td>{student.department}</td>
              <td>{student.year}</td>
              <td>{student.typeofstudent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
