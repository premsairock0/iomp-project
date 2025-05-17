export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-600">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Student Registration</h2>
        <form className="grid grid-cols-2 gap-4">
          <input placeholder="Username" className="col-span-2 p-3 border rounded" />
          <input placeholder="Email" className="col-span-2 p-3 border rounded" />
          <input placeholder="Phone" className="col-span-2 p-3 border rounded" />
          <input placeholder="Password" type="password" className="col-span-2 p-3 border rounded" />
          <select className="col-span-2 p-3 border rounded">
            <option value="">Type of Student</option>
            <option>Dayscholar</option>
            <option>Hosteller</option>
            <option>International</option>
          </select>
          <input placeholder="Address" className="col-span-2 p-3 border rounded" />
          <input placeholder="Roll No" className="col-span-1 p-3 border rounded" />
          <input placeholder="Department" className="col-span-1 p-3 border rounded" />
          <input placeholder="Room No (optional)" className="col-span-1 p-3 border rounded" />
          <div className="col-span-1 flex items-center">
            <input type="checkbox" className="mr-2" /> Mess Opted
          </div>
          <input value="1" readOnly className="col-span-2 p-3 border rounded bg-gray-100" />
          <button className="col-span-2 mt-4 p-3 bg-purple-600 text-white rounded hover:bg-purple-700">Register</button>
        </form>
      </div>
    </div>
  );
}
