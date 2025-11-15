// import React from "react";
// import { useNavigate } from "react-router-dom";

// const CourseCard = ({ data }) => {
//   const navigate = useNavigate();

//   return (
//     <div
//       onClick={() => navigate("/course/description", { state: { ...data } })}
//       className="text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700"
//     >
//       <div className="overflow-hidden">
//         <img
//           className="h-48 w-full rounded-tl-lg rounded-tr-lg  group-hover:scale-[1.2]  transition-all ease-in-out duration-300 "
//           src={data?.thumbnail?.secure_url}
//           alt="course thumbnail"
//         />
//       </div>

//       {/* course details */}
//       <div className="p-3 space-y-1 text-white">
//         <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
//           {data?.title}
//         </h2>
//         <p className="line-clamp-2">{data?.description}</p>
//         <p className="font-semibold">
//           <span className="text-yellow-500 font-bold">Category : </span>
//           {data?.category}
//         </p>
//         <p className="font-semibold">
//           <span className="text-yellow-500 font-bold">Total Lectures : </span>
//           {data?.numberOfLectures}
//         </p>
//         <p className="font-semibold">
//           <span className="text-yellow-500 font-bold">Instructor : </span>
//           {data?.createdBy}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;"use client"
import { useNavigate } from "react-router-dom"
// Importing icons from their correct packs
import { BsBook, BsArrowRight } from "react-icons/bs"
import { AiFillStar } from "react-icons/ai"
import { FiUsers } from "react-icons/fi"

const CourseCard = ({ data }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate("/course/description", { state: { ...data } })}
      className="group h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden h-48 bg-gradient-to-br from-blue-400 to-indigo-600">
        {data?.thumbnail?.secure_url ? (
          <img
            src={data.thumbnail.secure_url || "/placeholder.svg"}
            alt="course thumbnail"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600">
            <BsBook className="w-12 h-12 text-white opacity-50" />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
          {data?.category || "Course"}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Title */}
        <h2 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {data?.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
          {data?.description}
        </p>

        {/* Instructor */}
        <p className="text-sm text-gray-700 font-medium mb-4">
          By <span className="text-blue-600 font-semibold">{data?.createdBy || "Expert Instructor"}</span>
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <BsBook className="w-4 h-4 text-blue-600" />
            <span>{data?.numberOfLectures || 0} lectures</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <AiFillStar className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>4.8 rating</span>
          </div>
        </div>

        {/* Enrollment and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-600 text-xs">
            <FiUsers className="w-4 h-4" />
            <span>2.5K students</span>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg hover:shadow-lg transition-all duration-300 group-hover:translate-x-1">
            <BsArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
