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
// import Services from './Dashboard/studentdashboard/Services';
import Notifications from './Dashboard/studentdashboard/Notifications';
import Castvote from './Dashboard/studentdashboard/Castvote';
import StudentHolidays from './Dashboard/studentdashboard/StudentHolidays';
import MessBill from "./Dashboard/studentdashboard/MessBill";
import AdminHolidays from './Dashboard/admindashboard/Adminholidays';
import Changepassword from './Dashboard/admindashboard/Changepassword';
import Events from './Dashboard/admindashboard/Events';
import EventDetail from './Dashboard/admindashboard/Eventdetails';
import VotingResults from './Dashboard/wardendashboard/VotingResults';
import Studentpassword from './Dashboard/studentdashboard/Studentpassword';
import Chefpassword from './Dashboard/chefdashboard/Chefpassword';
import Wardenpassword from './Dashboard/wardendashboard/Wardenpassword'
import LatestUpdate from './Dashboard/studentdashboard/LatestUpdate'
import Studentevents from './Dashboard/studentdashboard/Studentevents';
import Studenteventdetails from './Dashboard/studentdashboard/Studenteventdetails';
import AdminServices from './Dashboard/admindashboard/AdminServices';
import ServiceDetails from './Dashboard/admindashboard/ServiceDetails';
import StudentServices from './Dashboard/studentdashboard/StudentServices';
import StudentServiceDetails from './Dashboard/studentdashboard/StudentServiceDetails';
import YourServiceRequests from './Dashboard/studentdashboard/YourServiceRequests';
import StudentRequests from './Dashboard/wardendashboard/StudentRequests';


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
          <Route path="calender" element={<AdminHolidays/>}/>
      <Route path="password" element={<Changepassword/>}/>
            <Route path="services" element={<AdminServices/>}/>
            <Route path="/admin/dashboard/services/:id" element={<ServiceDetails />} />



       <Route path="events" element={<Events/>} >
        <Route path=":id" element={<EventDetail/>} />
       </Route>
      </Route>


      <Route path="/student/dashboard" element={<StudentDashboard />} >
            <Route path="latest-update" element={<LatestUpdate/>} />
       <Route path="profile" element={<Profile/>} />
         <Route path="members" element={<Studentmembers/>} /> 
          <Route path="menu" element={<Studentmenu/>} />
            <Route path="notifications" element={<Notifications/>} />
              <Route path="vote" element={<Castvote/>} />
                <Route path="leave" element={<Studentleave/>} />
                
                  <Route path='holidays' element={<StudentHolidays />} />
                  <Route path="/student/dashboard/mess-bill" element={<MessBill />} />
                   <Route path="password" element={<Studentpassword/>}/>
                    <Route path="events" element={<Studentevents/>} >
        <Route path=":id" element={<Studenteventdetails/>} />
        </Route>
        <Route path="services" element={<StudentServices />} />
<Route path="services/:id" element={<StudentServiceDetails />} />
<Route path="your-requests" element={<YourServiceRequests />} />

      </Route>


      <Route path="/chef/dashboard" element={<ChefDashboard />}>
         <Route path="menu" element={<Menu/>} />
         <Route path="members" element={<Studentmembers/>} />
         <Route path="calender" element={<StudentHolidays/>}/>
                    <Route path="password" element={<Chefpassword/>}/>

      </Route>

      <Route path="/warden/dashboard" element={<WardenDashboard />}>
          <Route path="students" element={<StudentList />} />
          <Route path="letters" element={<StudentLetters />} />
          <Route path="voting" element={<Voting />} />
           <Route path="voting-results" element={<VotingResults />} />
           <Route path="password" element={<Wardenpassword/>}/>
           <Route path="requests" element={<StudentRequests/>}/>

        </Route>

      <Route path="*" element={<h1 className="text-center mt-10 text-red-500 text-xl">404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
