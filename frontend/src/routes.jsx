// src/routes.jsx
import { Routes, Route } from 'react-router-dom';

import IndexPage from './Pages/IndexPage';
import LoginOptions from './Pages/LoginOptions';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

import AdminDashboard from './Dashboard/AdminDashboard';
import StudentDashboard from './Dashboard/StudentDashboard';
import WardenDashboard from './Dashboard/WardenDashboard';
import ChefDashboard from './Dashboard/ChefDashboard';

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<IndexPage />} />
      <Route path="/login-options" element={<LoginOptions />} />
      <Route path="/login/:role" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/warden/dashboard" element={<WardenDashboard />} />
      <Route path="/chef/dashboard" element={<ChefDashboard />} />

      <Route path="*" element={<h1 className="text-center mt-10 text-red-500 text-xl">404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
