// src/routes.jsx
import { Routes, Route } from 'react-router-dom';

import IndexPage from './Pages/IndexPage';
import LoginOptions from './Pages/LoginOptions';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

import AdminDashboard from './Dashboard/AdminDashboard/AdminDashboard';
import StudentDashboard from './Dashboard/StudentDashboard/StudentDashboard';
import WardenDashboard from './Dashboard/wardendashboard/WardenDashboard';
import ChefDashboard from './Dashboard/ChefDashboard/ChefDashboard';

import StudentList from './Dashboard/wardendashboard/StudentList';
import StudentLetters from './Dashboard/wardendashboard/StudentLetters';
import Voting from './Dashboard/wardendashboard/Voting';

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<IndexPage />} />
      <Route path="/login-options" element={<LoginOptions />} />
      <Route path="/login/:role" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/chef/dashboard" element={<ChefDashboard />} />

      <Route path="/warden/dashboard" element={<WardenDashboard />}>
          <Route path="students" element={<StudentList />} />
          <Route path="letters" element={<StudentLetters />} />
          <Route path="voting" element={<Voting />} />
        </Route>

      <Route path="*" element={<h1 className="text-center mt-10 text-red-500 text-xl">404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
