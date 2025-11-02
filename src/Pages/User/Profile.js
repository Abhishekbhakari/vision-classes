// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Layout from "../../Layout/Layout";
// import { getUserData } from "../../Redux/authSlice";
// import { cancelCourseBundle } from "../../Redux/razorpaySlice";

// const Profile = () => {
//   const dispatch = useDispatch();

//   const userData = useSelector((state) => state?.auth?.data);

//   // function to handle the cancel subscription of course
//   const handleCourseCancelSubscription = async () => {
//     await dispatch(cancelCourseBundle());
//     await dispatch(getUserData());
//   };

//   useEffect(() => {
//     // getting user details
//     dispatch(getUserData());
//   }, []);
//   return (
//     <Layout>
//       <div className="min-h-[90vh] flex items-center justify-center">
//         <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]">
//           <img
//             className="w-40 m-auto rounded-full border border-black"
//             src={userData?.avatar?.secure_url}
//             alt="user profile image"
//           />

//           <h3 className="text-xl font-semibold text-center capitalize">
//             {userData.fullName}
//           </h3>

//           <div className="grid grid-cols-2">
//             <p>Email :</p>
//             <p>{userData?.email}</p>
//             <p>Role :</p>
//             <p>{userData?.role}</p>
//             <p>Subscription :</p>
//             <p>
//               {userData?.subscription?.status === "active"
//                 ? "Active"
//                 : "Inactive"}
//             </p>
//           </div>

//           {/* button to change the password */}
//           <div className="flex items-center justify-between gap-2">
//             <Link
//               to={
//                 userData?.email === "test@gmail.com"
//                   ? "/denied"
//                   : "/changepassword"
//               }
//               className="w-1/2 bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
//             >
//               <button>Change Password</button>
//             </Link>

//             <Link
//               to={
//                 userData?.email === "test@gmail.com"
//                   ? "/denied"
//                   : "/user/editprofile"
//               }
//               className="w-1/2 border border-yellow-600 hover:border-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
//             >
//               <button>Edit Profile</button>
//             </Link>
//           </div>

//           {userData?.subscription?.status === "active" && (
//             <button
//               onClick={handleCourseCancelSubscription}
//               className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold cursor-pointer text-center"
//             >
//               Cancel Subscription
//             </button>
//           )}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Profile;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Layout from '../../Layout/Layout';
import { getUserData } from '../../Redux/authSlice';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  // Fetch user data if it's not available (e.g., on page refresh)
  useEffect(() => {
    if (!userData.email) {
      dispatch(getUserData());
    }
  }, [dispatch, userData.email]);


  return (
    <Layout>
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
          <img
            src={userData?.avatar?.secure_url}
            className="w-40 m-auto rounded-full border border-black"
            alt="profile"
          />
          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>
          <div className="grid grid-cols-2">
            <p>Email:</p>
            <p>{userData?.email}</p>
            <p>Role:</p>
            <p>{userData?.role}</p>

            {/* REMOVED: Subscription Status */}
            {/* <p>Subscription:</p>
            <p>
              {userData?.subscription?.status === 'active'
                ? 'Active'
                : 'Inactive'}
            </p>
            */}
          </div>

          {/* ADDED: "My Courses" Button */}
          <div className="flex flex-col gap-2">
            <Link
              to="/my-courses"
              className="w-full text-center py-2 rounded-sm font-semibold bg-blue-600 hover:bg-blue-700 transition-all ease-in-out duration-300"
            >
              My Courses
            </Link>
            <Link
              to="/user/editprofile"
              className="w-full text-center py-2 rounded-sm font-semibold bg-yellow-600 hover:bg-yellow-700 transition-all ease-in-out duration-300"
            >
              Edit Profile
            </Link>
          </div>

          {userData?.role === 'ADMIN' && (
            <Link
              to="/admin/dashboard"
              className="w-full text-center py-2 rounded-sm font-semibold bg-pink-600 hover:bg-pink-700 transition-all ease-in-out duration-300"
            >
              Admin Dashboard
            </Link>
          )}

          <Link
            to="/changepassword"
            className="w-full text-center py-2 rounded-sm font-semibold bg-red-600 hover:bg-red-700 transition-all ease-in-out duration-300"
          >
            Change Password
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
