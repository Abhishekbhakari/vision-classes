// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import Layout from '../../Layout/Layout';
// // import { cancelCourseBundle } from '../../Redux/razorpaySlice'; // <-- REMOVED
// import { getUserData } from '../../Redux/authSlice';
// import { BsPersonCircle } from 'react-icons/bs';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // getting user data from slice
//   const { data } = useSelector((state) => state.auth);

//   // function to handle subscription cancel
//   // const handleSubscriptionCancel = async () => {   // <-- REMOVED
//   //   toast('Initiating cancellation...');
//   //   await dispatch(cancelCourseBundle());
//   //   await dispatch(getUserData());
//   //   toast.success('Cancellation complete');
//   //   navigate('/');
//   // };

//   useEffect(() => {
//     // getting user details
//     dispatch(getUserData());
//   }, [dispatch]);

//   return (
//     <Layout>
//       <div className="min-h-[90vh] flex items-center justify-center">
//         <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
//           {data?.avatar?.secure_url ? (
//             <img
//               src={data?.avatar?.secure_url}
//               alt="user profile"
//               className="w-40 h-40 m-auto rounded-full border border-black"
//             />
//           ) : (
//             <BsPersonCircle className="w-40 h-40 m-auto rounded-full border border-black" />
//           )}

//           <h3 className="text-xl font-semibold text-center capitalize">
//             {data.fullName}
//           </h3>

//           <div className="grid grid-cols-2">
//             <p>Email : </p>
//             <p className="overflow-hidden truncate">{data?.email}</p>
//             <p>Role : </p>
//             <p>{data?.role}</p>

//             {/* We are no longer using subscriptions */}
//             {/* <p>Subscription : </p> */}
//             {/* <p> */}
//             {/* {data?.subscription?.status === 'active' ? 'Active' : 'Inactive'} */}
//             {/* </p> */}
//           </div>

//           <div className="flex items-center justify-between gap-2">
//             <Link
//               to={'/changepassword'}
//               className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
//             >
//               Change Password
//             </Link>
//             <Link
//               to={'/user/editprofile'}
//               className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
//             >
//               Edit Profile
//             </Link>
//           </div>

//           {/* We are no longer using subscriptions, so remove button */}
//           {/* {data?.subscription?.status === 'active' && (
//             <button
//               onClick={handleSubscriptionCancel}
//               className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
//             >
//               Cancel Subscription
//             </button>
//           )} */}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Profile;
"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import Layout from "../../Layout/Layout"
import { getUserData } from "../../Redux/authSlice"
import { getMyCourses } from "../../Redux/courseSlice"
import {
  FiUser as User,
  FiMail as Mail,
  FiShield as Shield,
  FiBookOpen as BookOpen,
  FiCheckCircle as CheckCircle2,
  FiClock as Clock,
  FiAward as Award,
  FiEdit3 as Edit3,
  FiLogOut as LogOut,
  FiArrowRight as ArrowRight,
  FiBarChart2 as BarChart3,
  FiTrendingUp as TrendingUp,
  FiPlayCircle as PlayCircle,
} from "react-icons/fi"


const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { data } = useSelector((state) => state.auth)
  const { myCourses } = useSelector((state) => state.course)
  const [activeTab, setActiveTab] = useState("overview")
  const [courseProgress, setCourseProgress] = useState({})

  useEffect(() => {
    dispatch(getUserData())
    dispatch(getMyCourses())
  }, [dispatch])

  useEffect(() => {
    // Calculate progress for each course
    if (myCourses && myCourses.length > 0) {
      const progress = {}
      myCourses.forEach((course) => {
        const completedLectures = course.lectures?.filter((l) => l.completed)?.length || 0
        const totalLectures = course.lectures?.length || 0
        progress[course._id] = totalLectures > 0 ? (completedLectures / totalLectures) * 100 : 0
      })
      setCourseProgress(progress)
    }
  }, [myCourses])

  const handleLogout = () => {
    toast.success("Logged out successfully")
    navigate("/login")
  }

  // Calculate overall stats
  const totalCoursesEnrolled = myCourses?.length || 0
  const totalLecturesCompleted = myCourses?.reduce(
    (sum, course) => sum + (course.lectures?.filter((l) => l.completed)?.length || 0),
    0,
  )
  const completedCourses = myCourses?.filter((course) => courseProgress[course._id] === 100)?.length || 0
  const averageProgress =
    totalCoursesEnrolled > 0
      ? Math.round(myCourses.reduce((sum, course) => sum + (courseProgress[course._id] || 0), 0) / totalCoursesEnrolled)
      : 0

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            {/* Hero Background */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />

            <div className="px-6 pb-6">
              {/* Profile Info */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4 -mt-16 mb-6">
                {/* Avatar */}
                <div className="flex-shrink-0 mb-4 sm:mb-0">
                  {data?.avatar?.secure_url ? (
                    <img
                      src={data.avatar.secure_url || "/placeholder.svg"}
                      alt={data.fullName}
                      className="w-32 h-32 rounded-lg border-4 border-white shadow-lg object-cover"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-lg border-4 border-white shadow-lg bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                      <User className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 mb-4 sm:mb-0">
                  <h1 className="text-3xl font-bold text-gray-900 capitalize">{data?.fullName || "User"}</h1>
                  <p className="text-gray-600 mt-1 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {data?.email || "No email"}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {data?.role || "User"}
                    </span>
                    {data?.role === "ADMIN" && (
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                        Admin Access
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("/user/editprofile")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                  <button
                    onClick={() => navigate("/changepassword")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    <Shield className="w-4 h-4" /> Change Password
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <div className="text-sm text-blue-600 font-semibold">Courses Enrolled</div>
                  <div className="text-3xl font-bold text-blue-900 mt-2">{totalCoursesEnrolled}</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <div className="text-sm text-green-600 font-semibold">Completed</div>
                  <div className="text-3xl font-bold text-green-900 mt-2">{completedCourses}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                  <div className="text-sm text-purple-600 font-semibold">Lectures Done</div>
                  <div className="text-3xl font-bold text-purple-900 mt-2">{totalLecturesCompleted}</div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                  <div className="text-sm text-amber-600 font-semibold">Avg Progress</div>
                  <div className="text-3xl font-bold text-amber-900 mt-2">{averageProgress}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-lg mb-8 border-b border-gray-200">
            <div className="flex gap-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "courses", label: "My Courses", icon: BookOpen },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Learning Stats */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Learning Statistics</h2>
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border-l-4 border-blue-600 pl-4">
                    <div className="text-sm text-gray-600 font-medium">Total Study Time</div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">
                      {Math.round((totalLecturesCompleted * 45) / 60)}h
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Approximately {totalLecturesCompleted * 45} minutes</p>
                  </div>

                  <div className="border-l-4 border-green-600 pl-4">
                    <div className="text-sm text-gray-600 font-medium">Completion Rate</div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">{averageProgress}%</div>
                    <p className="text-xs text-gray-500 mt-1">Across all courses</p>
                  </div>

                  <div className="border-l-4 border-purple-600 pl-4">
                    <div className="text-sm text-gray-600 font-medium">Courses in Progress</div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">
                      {totalCoursesEnrolled - completedCourses}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Out of {totalCoursesEnrolled} total</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate("/courses")}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <BookOpen className="w-5 h-5" /> Browse All Courses
                  </button>
                  <button
                    onClick={() => setActiveTab("courses")}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    <Award className="w-5 h-5" /> View My Courses
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6">
              {totalCoursesEnrolled === 0 ? (
                <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                  <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Courses Yet</h3>
                  <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet. Start learning today!</p>
                  <button
                    onClick={() => navigate("/courses")}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Browse Courses
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {myCourses.map((course) => {
                    const progress = courseProgress[course._id] || 0
                    const lecturesCompleted = course.lectures?.filter((l) => l.completed)?.length || 0
                    const totalLectures = course.lectures?.length || 0

                    return (
                      <div
                        key={course._id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                      >
                        {/* Course Image */}
                        <div className="relative h-40 bg-gradient-to-br from-blue-400 to-indigo-600 overflow-hidden">
                          {course.thumbnail?.secure_url ? (
                            <img
                              src={course.thumbnail.secure_url || "/placeholder.svg"}
                              alt={course.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="w-12 h-12 text-white opacity-50" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/20" />
                        </div>

                        {/* Course Info */}
                        <div className="p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                              <p className="text-sm text-gray-600 mt-1">by {course.createdBy}</p>
                            </div>
                            {progress === 100 && (
                              <div className="flex-shrink-0 ml-2">
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              </div>
                            )}
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-600">Progress</span>
                              <span className="text-sm font-bold text-gray-900">{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              {lecturesCompleted} of {totalLectures} lectures completed
                            </p>
                          </div>

                          {/* Course Meta */}
                          <div className="flex items-center gap-4 py-3 border-t border-gray-200 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {totalLectures} lectures
                            </div>
                            <div className="flex items-center gap-1">
                              <Award className="w-4 h-4" />
                              {course.category}
                            </div>
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() =>
                              navigate("/course/displaylectures", {
                                state: course,
                              })
                            }
                            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                          >
                            {progress === 100 ? (
                              <>
                                <CheckCircle2 className="w-4 h-4" /> Review Course
                              </>
                            ) : progress > 0 ? (
                              <>
                                <ArrowRight className="w-4 h-4" /> Continue Learning
                              </>
                            ) : (
                              <>
                                <PlayCircle className="w-4 h-4" /> Start Course
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Profile
