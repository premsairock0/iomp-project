import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    typeofstudent: '',
    address: '',
    rollno: '',
    department: '',
    roomno: '',
    messopted: false,
    year: '1',
  });

  const navigate = useNavigate(); // 👈 hook to redirect

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      username,
      email,
      phone,
      password,
      typeofstudent,
      address,
      rollno,
      department,
      year,
    } = formData;

    if (
      !username || !email || !phone || !password ||
      !typeofstudent || !address || !rollno || !department || !year
    ) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/student/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          messopted: formData.typeofstudent === 'Hosteller'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Registration failed');
        return;
      }

      alert('Student registered successfully');
      navigate('/'); // 👈 redirect to homepage

    } catch (error) {
      console.error('Registration error:', error);
      alert('Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-indigo-600">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">Student Registration</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="col-span-2 p-3 border rounded" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="col-span-2 p-3 border rounded" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="col-span-2 p-3 border rounded" />
          <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" className="col-span-2 p-3 border rounded" />
          <select name="typeofstudent" value={formData.typeofstudent} onChange={handleChange} className="col-span-2 p-3 border rounded">
            <option value="">Type of Student</option>
            <option>Dayscholar</option>
            <option>Hosteller</option>
            <option>International</option>
          </select>
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="col-span-2 p-3 border rounded" />
          <input name="rollno" value={formData.rollno} onChange={handleChange} placeholder="Roll No" className="col-span-1 p-3 border rounded" />
          <input name="department" value={formData.department} onChange={handleChange} placeholder="Department" className="col-span-1 p-3 border rounded" />
          {/* <input name="roomno" value={formData.roomno} onChange={handleChange} placeholder="Room No (optional)" className="col-span-1 p-3 border rounded" /> */}
          <div className="col-span-1 flex items-center">
            <input name="messopted" type="checkbox" checked={formData.messopted} onChange={handleChange} className="mr-2" /> Mess Opted
          </div>
          <input name="year" value={formData.year} onChange={handleChange} placeholder="Year" className="col-span-2 p-3 border rounded" />
          <button type="submit" className="col-span-2 mt-4 p-3 bg-purple-600 text-white rounded hover:bg-purple-700">Register</button>
        </form>
      </div>
    </div>
  );
}
