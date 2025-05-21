import React from 'react';
import Navbar from '../wardendashboard/Navbar';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function ChefDashboard() {
  return (
    <div>
      <Navbar role={"Chef Dashboard"} />
      <Sidebar />
      <main
        style={{
          marginLeft: "250px",
          marginTop: "0px",
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

export default ChefDashboard;
