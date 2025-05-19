// src/routes.jsx
import { Routes, Route } from 'react-router-dom';

import IndexPage from './Pages/IndexPage';
import LoginOptions from './Pages/LoginOptions';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

import AdminDashboard from './Dashboard/admindashboard/AdminDashboard';
import StudentDashboard from './Dashboard/studentdashboard/StudentDashboard';
import WardenDashboard from './Dashboard/wardendashboard/WardenDashboard';
import ChefDashboard from './Dashboard/chefdashboard/ChefDashboard';

import StudentList from './Dashboard/wardendashboard/StudentList';
import StudentLetters from './Dashboard/wardendashboard/StudentLetters';
import Voting from './Dashboard/wardendashboard/Voting';
import Menu from './Dashboard/chefdashboard/Menu';
import Adminstudent from './Dashboard/admindashboard/Adminstudent';
import Wardenslist from './Dashboard/admindashboard/Wardenslist' ;
import Cheflist from './Dashboard/admindashboard/Cheflist' ;
import Memberslist from './Dashboard/admindashboard/Memberslist';
import UploadPhoto from './Dashboard/admindashboard/UploadPhoto';

import Profile from './Dashboard/studentdashboard/Profile';
import Studentleave from './Dashboard/studentdashboard/Studentleave';
import Studentmembers from './Dashboard/studentdashboard/Studentmembers';
import Studentmenu from './Dashboard/studentdashboard/Studentmenu';
import Services from './Dashboard/studentdashboard/Services';
import Notifications from './Dashboard/studentdashboard/Notifications';
import Castvote from './Dashboard/studentdashboard/Castvote';

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<IndexPage />} />
      <Route path="/login-options" element={<LoginOptions />} />
      <Route path="/login/:role" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} >
      <Route path="studentlist" element={<Adminstudent/>} />
       <Route path="wardenlist" element={<Wardenslist/>} />
        <Route path="cheflist" element={<Cheflist/>} />
         <Route path="members" element={<Memberslist/>} />
         <Route path="uploadPhoto" element={<UploadPhoto/>} />
      </Route>


      <Route path="/student/dashboard" element={<StudentDashboard />} >
       <Route path="profile" element={<Profile/>} />
         <Route path="members" element={<Studentmembers/>} /> 
          <Route path="menu" element={<Studentmenu/>} />
            <Route path="notifications" element={<Notifications/>} />
              <Route path="vote" element={<Castvote/>} />
                <Route path="leave" element={<Studentleave/>} />
                  <Route path="services" element={<Services/>} />
      </Route>


      <Route path="/chef/dashboard" element={<ChefDashboard />}>
         <Route path="menu" element={<Menu/>} />
      </Route>

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
