import { Routes, Route } from 'react-router-dom';
import IndexPage from './Pages/IndexPage';
import LoginOptions from './Pages/LoginOptions';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/login-options" element={<LoginOptions />} />
      <Route path="/login/:role" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default AppRoutes;
