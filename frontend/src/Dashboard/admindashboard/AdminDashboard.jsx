import React from 'react';
import Navbar from '../wardendashboard/Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div>
      <Navbar role={"Admin Dashboard"} />
      <Sidebar />
      <main
        style={{
          marginLeft: "250px",
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AdminDashboard;
