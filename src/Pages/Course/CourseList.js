// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import CourseCard from "../../Components/CourseCard";
// import Layout from "../../Layout/Layout";
// import { getAllCourses } from "../../Redux/courseSlice";

// const Courses = () => {
//   const dispatch = useDispatch();
//   const { coursesData } = useSelector((state) => state.course);

//   useEffect(() => {
//     (async () => {
//       await dispatch(getAllCourses());
//     })();
//   }, []);

//   return (
//     <Layout>
//       {/* courses container for displaying the cards */}
//       <div className="min-h-[90vh] pt-12 pl-20 flex flex-col flex-wrap gap-10 text-white">
//         <h1 className="text-center text-3xl font-semibold">
//           Explore the courses made by{" "}
//           <span className="font-bold text-yellow-500">Industry Experts</span>
//         </h1>

//         {/* wrapper for courses card */}
//         <div className="mb-10 flex flex-wrap gap-14">
//           {coursesData?.map((element) => {
//             return <CourseCard key={element._id} data={element} />;
//           })}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// // export default Courses;
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import CourseCard from "../../Components/CourseCard";
// import Layout from "../../Layout/Layout";
// import { getAllCourses } from "../../Redux/courseSlice";

// const Courses = () => {
//   const dispatch = useDispatch();
//   // CHANGED: state.course.coursesData to state.course.courseList
//   const { courseList } = useSelector((state) => state.course);

//   useEffect(() => {
//     (async () => {
//       await dispatch(getAllCourses());
//     })();
//   }, [dispatch]); // Added dispatch to dependency array

//   return (
//     <Layout>
//       {/* courses container for displaying the cards */}
//       <div className="min-h-[90vh] pt-12 pl-20 flex flex-col flex-wrap gap-10 text-white">
//         <h1 className="text-center text-3xl font-semibold">
//           Explore the courses made by{" "}
//           <span className="font-bold text-yellow-500">Industry Experts</span>
//         </h1>

//         {/* wrapper for courses card */}
//         <div className="mb-10 flex flex-wrap gap-14">
//           {/* CHANGED: coursesData?.map to courseList?.map */}
//           {courseList?.map((element) => {
//             return <CourseCard key={element._id} data={element} />;
//           })}
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Courses;
"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CourseCard from "../../Components/CourseCard"
import Layout from "../../Layout/Layout"
import { getAllCourses } from "../../Redux/courseSlice"

// ✅ Correct icon imports
import { FiSearch, FiX } from "react-icons/fi"

const Courses = () => {
  const dispatch = useDispatch()
  const { courseList } = useSelector((state) => state.course)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredCourses, setFilteredCourses] = useState([])

  useEffect(() => {
    ;(async () => {
      await dispatch(getAllCourses())
    })()
  }, [dispatch])

  // Filter courses based on search and category
  useEffect(() => {
    if (courseList) {
      let filtered = courseList

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(
          (course) =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      // Filter by category
      if (selectedCategory !== "All") {
        filtered = filtered.filter((course) => course.category === selectedCategory)
      }

      setFilteredCourses(filtered)
    }
  }, [courseList, searchTerm, selectedCategory])

  // Get unique categories
  const categories = courseList ? ["All", ...new Set(courseList.map((c) => c.category))] : ["All"]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">Explore All Courses</h1>
          <p className="text-blue-100 text-lg">Find the perfect course to advance your skills</p>
        </div>
      </section>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Section */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <FiSearch className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
              <span className="text-sm font-semibold text-gray-700 flex items-center">Filter by:</span>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <p className="font-medium">
                Showing {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}
              </p>
            </div>
          </div>

          {/* Courses Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course._id} data={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
                <FiSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Courses
