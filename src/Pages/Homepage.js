// import React from "react";
// import Layout from "../Layout/Layout";
// import homePageMainImage from "../Assets/Images/homePageMainImage.png";
// import { Link } from "react-router-dom";

// const Homepage = () => {
//   return (
//     <Layout>
//       <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[90vh]">
//         {/* for platform details */}
//         <div className="w-1/2 space-y-6">
//           <h1 className="text-5xl font-semibold">
//             Find out best{" "}
//             <span className="text-yellow-500 font-bold">Online Courses</span>
//           </h1>
//           <p className="text-xl text-gray-200">
//             We have a large library of courses taught by highly skilled and
//             qualified faculities at a very affordable cost.
//           </p>

//           {/* for buttons */}
//           <div className="space-x-6">
//             <Link to={"/courses"}>
//               <button className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-yellow-600 transition-all ease-in-out duration-300">
//                 Explore Courses
//               </button>
//             </Link>
//             <Link to={"/contact"}>
//               <button className="border border-yellow-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:border-yellow-600 transition-all ease-in-out duration-300">
//                 Contact Us
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* right section for image */}
//         <div className="w-1/2 flex items-center justify-center">
//           <img src={homePageMainImage} alt="home page image" />
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Homepage;
import Layout from "../Layout/Layout"
import homePageMainImage from "../Assets/Images/homePageMainImage.png"
import { Link } from "react-router-dom"
import { BsArrowRight, BsStar, BsPeople, BsTrophy, BsClock } from "react-icons/bs"

const Homepage = () => {
  const features = [
    { icon: BsPeople, title: "Expert Instructors", desc: "Learn from industry professionals" },
    { icon: BsTrophy, title: "Certification", desc: "Earn recognized certificates" },
    { icon: BsClock, title: "Learn at Your Pace", desc: "Study whenever you want" },
    { icon: BsStar, title: "Quality Content", desc: "Structured, high-quality courses" },
  ]

  const topCourses = [
    { id: 1, title: "Advanced Web Development", level: "Intermediate", students: "2.5K", rating: 4.8 },
    { id: 2, title: "Data Science Fundamentals", level: "Beginner", students: "3.1K", rating: 4.9 },
    { id: 3, title: "UI/UX Design Mastery", level: "Advanced", students: "1.8K", rating: 4.7 },
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white pt-20 pb-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <BsStar className="w-4 h-4 mr-2 text-yellow-400" />
              xxxxxxxxxxxxxxxxxx
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Master New Skills with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-300">
                {" "}
                Premium Courses
              </span>
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed">
              Access a carefully curated selection of courses taught by industry experts. Learn coding, design,
              business, and more—all at your own pace.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/courses" className="w-full sm:w-auto">
                <button className="w-full bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  Explore Courses
                  <BsArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <button className="w-full border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                  Get in Touch
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8">
              <div>
                <p className="text-2xl sm:text-3xl font-bold">150+</p>
                <p className="text-blue-200 text-sm">Courses</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold">50K+</p>
                <p className="text-blue-200 text-sm">Students</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold">4.8★</p>
                <p className="text-blue-200 text-sm">Avg Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full h-96">
              <img
                src={homePageMainImage || "/placeholder.svg"}
                alt="Learning platform illustration"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 to-transparent rounded-2xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the best online learning platform with comprehensive features designed for your success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Popular Courses</h2>
              <p className="text-gray-600">Most sought-after courses this month</p>
            </div>
            <Link to="/courses">
              <button className="hidden sm:inline-block text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2">
                View All <BsArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {topCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1">
                      <BsStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{course.students} students</span>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold">Learn More →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Link to="/courses">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                View All Courses
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 sm:py-20 px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-blue-100 text-lg mb-8">Join thousands of students and accelerate your career today</p>
          <Link to="/courses">
            <button className="bg-gradient-to-r from-yellow-400 to-amber-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              Browse All Courses
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default Homepage
