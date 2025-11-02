import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from '../../Components/CourseCard';
import Layout from '../../Layout/Layout';
import { getMyPurchasedCourses } from '../../Redux/courseSlice';

function MyCourses() {
  const dispatch = useDispatch();
  const { purchasedCourses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getMyPurchasedCourses());
  }, [dispatch]);

  return (
    <Layout>
      <div className="min-h-[90vh] pt-20 px-4 sm:px-20 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-10">
          My Purchased Courses
        </h1>

        {purchasedCourses.length > 0 ? (
          <div className="mb-10 flex flex-wrap justify-center gap-10">
            {purchasedCourses.map((course) => (
              <CourseCard key={course._id} data={course} />
            ))}
          </div>
        ) : (
          <div className="text-center text-white text-xl">
            <p>You have not purchased any courses yet.</p>
            <p>
              Browse our{' '}
              <a href="/courses" className="text-yellow-500 hover:underline">
                course catalog
              </a>{' '}
              to get started.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MyCourses;
