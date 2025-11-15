// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import Layout from "../../Layout/Layout";

// const CourseDescription = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { role, data } = useSelector((state) => state.auth);

//   useEffect(() => {
//     // scroll to the top on page render
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <Layout>
//       {/* wrapper for course description */}
//       <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
//         {/* displaying the course details */}
//         <div className="grid grid-cols-2 gap-10 py-10 relative">
//           {/* creating the left side of description box */}
//           <div className="space-y-5">
//             <img
//               className="w-full h-64"
//               src={state?.thumbnail?.secure_url}
//               alt="thumbnail"
//             />

//             {/* course details */}
//             <div className="space-y-4">
//               <div className="flex items-center justify-between text-xl">
//                 <p className="font-semibold">
//                   <span className="text-yellow-500 font-bold">
//                     Total Lectures :{" "}
//                   </span>
//                   {state.numberOfLectures}
//                 </p>
//                 <p className="font-semibold">
//                   <span className="text-yellow-500 font-bold">
//                     Instructor :{" "}
//                   </span>
//                   {state.createdBy}
//                 </p>
//               </div>

//               {/* adding the subscribe button */}
//               {role === "ADMIN" || data?.subscription?.status === "active" ? (
//                 <button
//                   onClick={() =>
//                     navigate("/course/displaylectures", {
//                       state: { ...state },
//                     })
//                   }
//                   className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
//                 >
//                   Watch Lectures
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => navigate("/checkout")}
//                   className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
//                 >
//                   Subscribe to Course
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* creating the right section of description box */}
//           <div className="space-y-2 text-xl">
//             <h1 className="text-3xl font-bold text-yellow-500 text-center mb-4">
//               {state.title}
//             </h1>

//             <p className="text-yellow-500 font-bold">Course Description :</p>

//             <p>{state.description}</p>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// // export default CourseDescription;
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Layout from '../../Layout/Layout';
// import { enrollFreeCourse } from '../../Redux/razorpaySlice'; // Import free course thunk

// const CourseDescription = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { role, data } = useSelector((state) => state.auth);

//   // Check if user has purchased this course
//   const courseId = state?._id;
//   const hasPurchased = data?.purchasedCourses?.includes(courseId);

//   useEffect(() => {
//     // scroll to the top on page render
//     window.scrollTo(0, 0);
//   }, [state]);

//   // Handler for "Get for Free" button
//   const handleFreeEnrollment = async () => {
//     const res = await dispatch(enrollFreeCourse(courseId));
//     // If successful, the authSlice will update and 'hasPurchased' will become true
//     // This will cause the component to re-render, showing "Watch Lectures"
//     if (res?.payload?.success) {
//         // We can navigate to lectures, or let the re-render handle it
//         navigate('/course/displaylectures', { state: { ...state } });
//     }
//   };

//   // Renders the correct button based on state
//   const renderEnrollButton = () => {
//     if (role === 'ADMIN' || hasPurchased) {
//       return (
//         <button
//           onClick={() =>
//             navigate('/course/displaylectures', {
//               state: { ...state },
//             })
//           }
//           className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
//         >
//           Watch Lectures
//         </button>
//       );
//     }

//     // PAID Course Button
//     if (state.price > 0) {
//       return (
//         <button
//           onClick={() => navigate('/checkout', { state: { ...state } })}
//           className="bg-yellow-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-500 transition-all ease-in-out duration-300"
//         >
//           Buy Course for ₹{state.price}
//         </button>
//       );
//     }

//     // FREE Course Button
//     return (
//       <button
//         onClick={handleFreeEnrollment}
//         className="bg-green-600 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-green-500 transition-all ease-in-out duration-300"
//       >
//         Enroll for Free
//       </button>
//     );
//   };

//   return (
//     <Layout>
//       {/* wrapper for course description */}
//       <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
//         {/* displaying the course details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 relative">
//           {/* creating the left side of description box */}
//           <div className="space-y-5">
//             <img
//               className="w-full h-64 object-cover"
//               src={state?.thumbnail?.secure_url}
//               alt="thumbnail"
//             />

//             {/* course details */}
//             <div className="space-y-4">
//               <div className="flex items-center justify-between text-xl">
//                 <p className="font-semibold">
//                   <span className="text-yellow-500 font-bold">
//                     Total Lectures :{' '}
//                   </span>
//                   {state.numberOfLectures}
//                 </p>
//                 <p className="font-semibold">
//                   <span className="text-yellow-500 font-bold">
//                     Instructor :{' '}
//                   </span>
//                   {state.createdBy}
//                 </p>
//               </div>

//               {/* Render the correct button */}
//               {renderEnrollButton()}
//             </div>
//           </div>

//           {/* creating the right section of description box */}
//           <div className="space-y-2 text-xl">
//             <h1 className="text-3xl font-bold text-yellow-500 text-center mb-4">
//               {state.title}
//             </h1>

//             <p className="text-yellow-500 font-bold">Course Description :</p>
//             <p>{state.description}</p>
            
//             <p className="text-2xl font-bold text-yellow-500 text-center mt-4">
//               Price: {state.price > 0 ? `₹${state.price}` : 'Free'}
//             </p>

//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CourseDescription;
"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import Layout from "../../Layout/Layout"
import { enrollFreeCourse } from "../../Redux/razorpaySlice"
import {
  BsStar as Star,
  BsPeople as Users,
  BsBook as BookOpen,
  BsClock as Clock,
  BsAward as Award,
  BsCheckCircle as CheckCircle,
  BsArrowRight as ArrowRight,
} from "react-icons/bs"


const CourseDescription = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { role, data } = useSelector((state) => state.auth)

  const courseId = state?._id
  const hasPurchased = data?.purchasedCourses?.includes(courseId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [state])

  const handleFreeEnrollment = async () => {
    const res = await dispatch(enrollFreeCourse(courseId))
    if (res?.payload?.success) {
      navigate("/course/displaylectures", { state: { ...state } })
    }
  }

  const renderEnrollButton = () => {
    if (role === "ADMIN" || hasPurchased) {
      return (
        <button
          onClick={() => navigate("/course/displaylectures", { state: { ...state } })}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Start Learning Now
        </button>
      )
    }

    if (state.price > 0) {
      return (
        <button
          onClick={() => navigate("/checkout", { state: { ...state } })}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ArrowRight className="w-5 h-5" />
          Enroll Now - ₹{state.price}
        </button>
      )
    }

    return (
      <button
        onClick={handleFreeEnrollment}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <CheckCircle className="w-5 h-5" />
        Enroll for Free
      </button>
    )
  }

  const highlights = [
    { icon: BookOpen, label: "Lectures", value: state?.numberOfLectures || "0" },
    { icon: Clock, label: "Duration", value: "8-12 weeks" },
    { icon: Users, label: "Students", value: "2.5K+" },
    { icon: Star, label: "Rating", value: "4.8★" },
  ]

  const learningPoints = [
    "Master the fundamentals and advanced concepts",
    "Access lifetime course materials and updates",
    "Get certificates upon course completion",
    "Learn from industry-leading instructors",
    "Join an active community of learners",
    "Work on real-world projects and assignments",
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">{state?.title}</h1>
          <p className="text-blue-100 text-lg">Taught by {state?.createdBy}</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content - 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              {/* Course Image */}
              <div className="rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                  {state?.thumbnail?.secure_url ? (
                    <img
                      src={state.thumbnail.secure_url || "/placeholder.svg"}
                      alt={state?.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="w-24 h-24 text-white opacity-50" />
                  )}
                </div>
              </div>

              {/* Course Description */}
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{state?.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {highlights.map((item, idx) => (
                    <div key={idx} className="text-center p-4 bg-gray-50 rounded-lg">
                      <item.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-gray-600 text-sm">{item.label}</p>
                      <p className="text-lg font-bold text-gray-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {learningPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Details */}
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-gray-600 font-medium">Category</span>
                    <span className="text-gray-900 font-semibold">{state?.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-gray-600 font-medium">Instructor</span>
                    <span className="text-gray-900 font-semibold">{state?.createdBy}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-3">
                    <span className="text-gray-600 font-medium">Total Lectures</span>
                    <span className="text-gray-900 font-semibold">{state?.numberOfLectures}</span>
                  </div>
                  <div className="flex justify-between pb-3">
                    <span className="text-gray-600 font-medium">Difficulty Level</span>
                    <span className="text-gray-900 font-semibold">Intermediate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 sticky top-24 space-y-6">
                {/* Price */}
                <div className="text-center">
                  {state?.price > 0 ? (
                    <>
                      <p className="text-gray-600 text-sm mb-2">Course Price</p>
                      <p className="text-4xl font-bold text-gray-900">₹{state.price}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-3xl font-bold text-green-600">FREE</p>
                      <p className="text-gray-600 text-sm mt-2">No payment required</p>
                    </>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Enrollment Button */}
                {renderEnrollButton()}

                {/* Trust Indicators */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Lifetime access to materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Certificate of completion</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200"></div>

                {/* Info Box */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <Award className="w-5 h-5 text-blue-600 mb-2" />
                  <p className="text-sm text-gray-700 font-medium">
                    <strong>Popular Course:</strong> Join 2,500+ students already learning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CourseDescription
