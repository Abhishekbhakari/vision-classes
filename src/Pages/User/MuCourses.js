import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import CourseCard from '../../Components/CourseCard'; // Assuming this component exists
import { getMyCourses } from '../../Redux/courseSlice'; // Update path if needed

const MyCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the list of purchased courses from the slice
  const { myCourses } = useSelector((state) => state.course);
  const { role } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch the courses when the component mounts
    dispatch(getMyCourses());
  }, [dispatch]);

  return (
    <Layout>
      <div className="min-h-[90vh] pt-20 px-4 md:px-20 flex flex-col items-center text-white">
        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-10">
          My Purchased Courses
        </h1>

        {/* Display courses grid */}
        {myCourses?.length > 0 ? (
          <div className="mb-10 flex flex-wrap justify-center gap-10 w-full">
            {myCourses.map((course) => (
              // Assuming CourseCard takes 'data' prop and handles navigation
              <CourseCard key={course._id} data={course} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold">
              You haven't purchased any courses yet.
            </h2>
            <button
              onClick={() => navigate('/courses')}
              className="mt-4 bg-yellow-600 text-lg rounded-md font-bold px-5 py-3 hover:bg-yellow-500 transition-all ease-in-out duration-300"
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyCourses;
