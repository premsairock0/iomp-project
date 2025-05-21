import React, { useState } from 'react';

const Chefpassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match');
      return;
    }

    try {
      const token = localStorage.getItem('Authorization');

      const response = await fetch('http://localhost:3000/api/dashwarden/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Password change failed');
      } else {
        setMessage('Password updated successfully');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (error) {
      console.error('Change password error:', error);
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleChangePassword}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">Change Password</h2>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Change Password
        </button>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </form>
    </div>
  );
};

export default Chefpassword;
