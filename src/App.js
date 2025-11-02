// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import About from "./Pages/About";
// import Contact from "./Pages/Contact";
// import CourseList from "./Pages/Course/CourseList";
// import NotFound from "./Pages/NotFound";
// import HomePage from "./Pages/Homepage";
// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";
// import Checkout from "./Pages/Payment/Checkout";
// import CheckoutSuccess from "./Pages/Payment/CheckoutSuccess";
// import CheckoutFail from "./Pages/Payment/CheckoutFail";
// import ForgetPassword from "./Pages/Password/ForgetPassword";
// import ResetPassword from "./Pages/Password/ResetPassword";
// import AdminDashboard from "./Pages/Dashboard/AdminDashboard";
// import CourseDescription from "./Pages/Course/CourseDescription";
// import Profile from "./Pages/User/Profile";
// import ChangePassword from "./Pages/Password/ChangePassword";
// import EditProfile from "./Pages/User/EditProfile";
// import CreateCourse from "./Pages/Course/CreateCourse";
// import AddLecture from "./Pages/Dashboard/AddLecture";
// import DisplayLectures from "./Pages/Dashboard/DisplayLectures";
// import RequireAuth from "./Components/Auth/RequireAuth";
// import NotRequireAuth from "./Components/Auth/NotRequireAuth";
// import Denied from "./Pages/Denied";

// const App = () => {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/courses" element={<CourseList />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/denied" element={<Denied />} />
//         <Route path="/forgetpassword" element={<ForgetPassword />} />
//         <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

//         <Route element={<NotRequireAuth />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//         </Route>

//         <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
//           <Route path="/course/description" element={<CourseDescription />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/checkout/success" element={<CheckoutSuccess />} />
//           <Route path="/checkout/fail" element={<CheckoutFail />} />
//           <Route path="/changepassword" element={<ChangePassword />} />
//           <Route path="/user/profile" element={<Profile />} />
//           <Route path="/user/editprofile" element={<EditProfile />} />
//           <Route path="/course/displaylectures" element={<DisplayLectures />} />
//         </Route>

//         <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
//           <Route path="/admin/dashboard" element={<AdminDashboard />} />
//           <Route path="/course/addlecture" element={<AddLecture />} />
//           <Route path="/course/create" element={<CreateCourse />} />
//         </Route>

//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </>
//   );
// };

// export default App;

// --- FIX: Removed import './App.css'; ---
// import './App.css'; 

import { Route, Routes } from 'react-router-dom';

// --- FIX: Changed .js to .jsx ---
import RequireAuth from './Components/Auth/RequireAuth.jsx';
import NotRequireAuth from './Components/Auth/NotRequireAuth.jsx';
// --- END OF FIX ---

import About from './Pages/About.js';
import Contact from './Pages/Contact.js';
import CourseDescription from './Pages/Course/CourseDescription.js';
import CourseList from './Pages/Course/CourseList.js';
import CreateCourse from './Pages/Course/CreateCourse.js';
import AddLecture from './Pages/Dashboard/AddLecture.js';
import AdminDashboard from './Pages/Dashboard/AdminDashboard.js';
import DisplayLectures from './Pages/Dashboard/DisplayLectures.js';
import Denied from './Pages/Denied.js';
import Homepage from './Pages/Homepage.js';
import Login from './Pages/Login.js';
import NotFound from './Pages/NotFound.js';
import ChangePassword from './Pages/Password/ChangePassword.js';
import ForgetPassword from './Pages/Password/ForgetPassword.js';
import ResetPassword from './Pages/Password/ResetPassword.js';
import CheckoutFail from './Pages/Payment/CheckoutFail.js';
import CheckoutSuccess from './Pages/Payment/CheckoutSuccess.js';
import Signup from './Pages/Signup.js';
import EditProfile from './Pages/User/EditProfile.js';
import Profile from './Pages/User/Profile.js';
import MyCourses from './Pages/User/MyCourses.js';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/denied" element={<Denied />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/description" element={<CourseDescription />} />

        <Route element={<NotRequireAuth />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPassword />}
          />
        </Route>

        <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']} />}>
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/editprofile" element={<EditProfile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
          <Route
            path="/course/displaylectures"
            element={<DisplayLectures />}
          />

          {/* ADDED: "My Courses" Route */}
          <Route path="/my-courses" element={<MyCourses />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/course/addlecture" element={<AddLecture />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
